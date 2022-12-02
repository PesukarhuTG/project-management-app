import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { BasePage, Button, Column, ColumnModal, Spinner } from '../components';

import checkTokenExpired from '../services/checkTokenExpired';
import { showNotification } from '../services/notification.service';
import { createColumn, getBoardById, getColumnsInBoard, reorderColumns } from '../services/APIrequests';
import { mapperColumn, mapperColumns } from '../services/mappers';
import { useLocaleMessage } from '../hooks';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { setCurrentBoard } from '../store/BoardsSlice';
import { changeAuthStatus, removeUserData } from '../store/UserSlice';
import { setColumns, setInitialColumns, setNewColumn, setNewColumnTitle } from '../store/ColumnsSlice';
import { reorderDroppableZone } from '../services/dnd.service';
import ColumnModel from '../types/ColumnModel';

const DEFAULT_COLUMN_TITLE = 'Column';

const BoardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useSelector((state: RootState) => state.boards.currentBoard?.title) ?? '';
  const newOrder = useSelector((state: RootState) => state.columns.orderCounter) + 1;
  const { columns, newColumnTitle } = useSelector((state: RootState) => state.columns);

  const { id: idParam } = useParams();
  const navigate = useNavigate();

  const message = useLocaleMessage();
  const [isShowColumnModal, setIsShowColumnModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // TODO добавить лоадер на загрузку формы

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
    const titleColumn = newColumnTitle || DEFAULT_COLUMN_TITLE;

    if (idParam) {
      setIsShowColumnModal(false);
      setIsLoading(true);

      try {
        const newColumn = await createColumn(idParam, { title: titleColumn, order: newOrder }).then((res) => res.data);
        dispatch(setNewColumn(mapperColumn(newColumn)));
      } catch (e) {
        showNotification('error', message('errorTitle'), (e as Error).message);
      }

      dispatch(setNewColumnTitle(''));
      setIsLoading(false);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // перетаскивание за пределы зоны
    if (!destination) {
      return;
    }

    // перетаскивание в пределах одной зоны без изменения положения
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // перетаскивание колонки
    if (source.droppableId === idParam) {
      // если всего одна колонка
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

    // перетаскивание таски внутри одной колонки
    if (source.droppableId === destination.droppableId) {
      // TODO ждет реализации
      return;
    }

    // перетаскивание таски между колонок
    // TODO ждет реализации

    // result.draggableId = id таска, который перетаскивали
    // source.droppableId = id колонки откуда таск забрали
    // source.index = стартовая позиция элемента (атрибут у <Draggable> - сейчас передаю индекс массива)
    // destination.droppableId = id колонки куда таск бросили
    // destination.index = конечная позиция элемента (в новой колонке)
    return;
  };

  const logout = () => {
    dispatch(changeAuthStatus(false));
    dispatch(removeUserData());
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    if (!localStorage.getItem('tokenUser')) {
      navigate('/');
      showNotification('info', message('pageAccessTitle'), message('pageBoardAccessMessage'));
    }

    const authStatus = checkTokenExpired();
    if (!authStatus) {
      logout();
      showNotification('warning', message('expiredTokenTitle'), message('expiredTokenMessage'));
    }

    // clear previous data
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
      </Container>

      {isLoading && <Spinner type="fullscreen" />}

      <ColumnModal
        title={message('addColumnModalTitle')}
        isVisible={isShowColumnModal}
        onOk={addColumn}
        onCancel={closeColumnModal}
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
  font-weight: 800;
`;

// TODO протестировать после реализации,
/* возможно нужно будет убрать "резину", т. к. при перетаскивании иногда меняются размеры столбцов
 * рассмотреть вариант замены minmax(426px, 1fr) и 1fr на конктреные размеры в % или wv
 * условно 5 столбцов на больших экранах, 3/4 на средних, 1 на мобильных)
 */
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
