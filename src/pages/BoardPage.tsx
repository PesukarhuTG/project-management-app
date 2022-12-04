import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { BasePage, Button, Column, ColumnModal, InitialColumn, Spinner } from '../components';

import checkTokenExpired from '../services/checkTokenExpired';
import { showNotification } from '../services/notification.service';
import { createColumn, getBoardById, getColumnsInBoard, reorderColumns, reorderTasks } from '../services/APIrequests';
import { mapperColumn, mapperColumns } from '../services/mappers';
import { useLocaleMessage } from '../hooks';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { setCurrentBoard } from '../store/BoardsSlice';
import { changeAuthStatus, removeUserData } from '../store/UserSlice';
import { setColumns, setInitialColumns, setNewColumn, setNewColumnTitle } from '../store/ColumnsSlice';
import { reorderDroppableBetweenZone, reorderDroppableZone } from '../services/dnd.service';
import ColumnModel from '../types/ColumnModel';
import { TaskResponse } from '../types';
import { setTasks } from '../store/TasksSlice';
import { TaskReorderData } from '../types/TaskModel';

const BoardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useSelector((state: RootState) => state.boards.currentBoard?.title) ?? '';
  const newOrder = useSelector((state: RootState) => state.columns.orderCounter) + 1;
  const { columns, newColumnTitle } = useSelector((state: RootState) => state.columns);
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const { id: idParam } = useParams();
  const navigate = useNavigate();

  const message = useLocaleMessage();
  const [isShowColumnModal, setIsShowColumnModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = () => {
    dispatch(changeAuthStatus(false));
    dispatch(removeUserData());
    localStorage.clear();
    navigate('/');
  };

  const getBoardInfo = useCallback(
    async (id: string) => {
      const board = await getBoardById(id).then((res) => res.data);
      const boardInfo = {
        id: board._id,
        title: JSON.parse(board.title).title,
      };
      dispatch(setCurrentBoard(boardInfo));
    },
    [dispatch]
  );

  const getColumnsData = useCallback(
    async (id: string) => {
      const columns = await getColumnsInBoard(id).then((res) => res.data);

      dispatch(setColumns(mapperColumns(columns)));
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (idParam) {
        setIsLoading(true);
        try {
          await getBoardInfo(idParam);
          await getColumnsData(idParam);
        } catch (e) {
          showNotification('error', message('errorTitle'), (e as Error).message);
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idParam, getBoardInfo, getColumnsData, message]);

  const closeColumnModal = () => {
    dispatch(setNewColumnTitle(''));
    setIsShowColumnModal(false);
  };

  const addColumn = async () => {
    const authStatus = checkTokenExpired();

    if (authStatus) {
      if (idParam) {
        setIsShowColumnModal(false);
        setIsLoading(true);

        try {
          const newColumn = await createColumn(idParam, { title: newColumnTitle, order: newOrder }).then(
            (res) => res.data
          );
          dispatch(setNewColumn(mapperColumn(newColumn)));
        } catch (e) {
          showNotification('error', message('errorTitle'), (e as Error).message);
        }

        dispatch(setNewColumnTitle(''));
        setIsLoading(false);
      }
    } else {
      logout();
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (source.droppableId === idParam) {
      if (columns.length < 2) {
        return;
      }

      const columnsBeforeOrder = [...columns];
      const reorder = reorderDroppableZone<ColumnModel>(columns, source.index, destination.index);

      setIsLoading(true);
      try {
        dispatch(setColumns(reorder.data));
        await reorderColumns(reorder.request).then((res) => res.data);
      } catch (e) {
        dispatch(setColumns(columnsBeforeOrder));
        showNotification('error', message('errorTitle'), (e as Error).message);
      }
      setIsLoading(false);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const currentColumn = source.droppableId;
      const currentTasks = tasks[currentColumn];

      const tasksBeforeOrder = [...currentTasks];
      const reorder = reorderDroppableZone<TaskResponse>(currentTasks, source.index, destination.index);

      setIsLoading(true);
      try {
        dispatch(setTasks({ [currentColumn]: reorder.data }));
        await reorderTasks(reorder.request as TaskReorderData[]).then((res) => res.data);
      } catch (e) {
        dispatch(setTasks({ [currentColumn]: tasksBeforeOrder }));
        showNotification('error', message('errorTitle'), (e as Error).message);
      }
      setIsLoading(false);
      return;
    }

    const sourceColumn = source.droppableId;
    const sourceTasks = tasks[sourceColumn] ? tasks[sourceColumn] : [];
    const sourceTasksBeforeOrder = [...sourceTasks];

    const destinationColumn = destination.droppableId;
    const destinationTasks = tasks[destinationColumn] ? tasks[destinationColumn] : [];
    const destinationTasksBeforeOrder = [...destinationTasks];

    const reorder = reorderDroppableBetweenZone(
      sourceTasks,
      destinationTasks,
      destinationColumn,
      source.index,
      destination.index
    );

    setIsLoading(true);
    try {
      dispatch(setTasks({ [sourceColumn]: reorder.source }));
      dispatch(setTasks({ [destinationColumn]: reorder.destination }));
      await reorderTasks(reorder.request).then((res) => res.data);
    } catch (e) {
      dispatch(setTasks({ [sourceColumn]: sourceTasksBeforeOrder }));
      dispatch(setTasks({ [destinationColumn]: destinationTasksBeforeOrder }));
      showNotification('error', message('errorTitle'), (e as Error).message);
    }
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    if (!localStorage.getItem('tokenUser')) {
      navigate('/');
      showNotification('info', message('pageAccessTitle'), message('pageBoardAccessMessage'));
    }

    const authStatus = checkTokenExpired();
    if (!authStatus) {
      logout();
    }

    dispatch(setCurrentBoard(null));
    dispatch(setInitialColumns());
  }, []); //eslint-disable-line

  return (
    <BasePage noScroll>
      <Container>
        <ControlPanel>
          <HideXs>
            <Button label={message('btnBack')} onClick={() => navigate('/boards')} />
          </HideXs>
          <Button label={message('btnCreateNewColumn')} onClick={() => setIsShowColumnModal(true)} />
        </ControlPanel>
        <Title>
          {message('board')}: {title}
        </Title>
        {!!columns.length && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={idParam as string} direction="horizontal" type="column">
              {(provided) => (
                <ColumnsPanel ref={provided.innerRef} {...provided.droppableProps}>
                  {columns.map((col, i) => (
                    <Column {...col} key={col.id} dndIndex={i} />
                  ))}
                  {provided.placeholder}
                </ColumnsPanel>
              )}
            </Droppable>
          </DragDropContext>
        )}
        {!columns.length && <InitialColumn onClick={() => setIsShowColumnModal(true)} />}
      </Container>

      {isLoading && <Spinner type="fullscreen" />}

      <ColumnModal
        title={message('addColumnModalTitle')}
        isVisible={isShowColumnModal}
        onOk={addColumn}
        onCancel={closeColumnModal}
        okButtonProps={{
          disabled: !newColumnTitle.trim(),
        }}
      />
    </BasePage>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ControlPanel = styled.div`
  padding: 0 var(--page-gutter);
  display: flex;
  justify-content: space-between;

  @media (max-width: 700px) {
    padding: 0 20px;
  }

  @media (max-width: 540px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const HideXs = styled.div`
  @media (max-width: 300px) {
    display: none;
  }
`;

const Title = styled.h2`
  padding: 0 var(--page-gutter);
  color: var(--primary-dark);
  font-size: 26px;
  font-weight: 700;

  @media (max-width: 700px) {
    font-size: 22px;
  }
`;

const ColumnsPanel = styled.div`
  padding: 0 var(--page-gutter) 0 0;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(426px, 1fr));
  grid-auto-columns: minmax(426px, 1fr);
  justify-content: start;
  align-items: start;

  grid-auto-flow: column;
  overflow-x: auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(340px, 426px));
    grid-auto-columns: minmax(340px, 426px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 426px));
    grid-auto-columns: minmax(300px, 426px);
  }
`;

export default BoardPage;
