import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { BasePage, Button, Column, ColumnModal } from '../components';

import checkTokenExpired from '../services/checkTokenExpired';
import { showNotification } from '../services/notification.service';
import { createColumn, getBoardById, getColumnsInBoard } from '../services/APIrequests';
import { mapperColumn, mapperColumns } from '../services/mappers';
import { useLocaleMessage } from '../hooks';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { setCurrentBoard } from '../store/BoardsSlice';
import { changeAuthStatus, removeUserData } from '../store/UserSlice';
import { setColumns, setNewColumn } from '../store/ColumnsSlice';

const BoardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useSelector((state: RootState) => state.boards.currentBoard?.title) ?? '';
  const newOrder = useSelector((state: RootState) => state.columns.orderCounter) + 1;
  const columns = useSelector((state: RootState) => state.columns.columns);

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
        try {
          await getBoardInfo(idParam);
          await getColumnsData(idParam);
        } catch (e) {
          showNotification('error', message('errorTitle'), (e as Error).message);
        }
      }
    };

    fetchData();
  }, [idParam, getBoardInfo, getColumnsData, message]);

  const addColumn = async () => {
    const newColumnTitle = 'New title'; // TODO забирать данные из модала

    if (idParam) {
      setIsLoading(true);

      try {
        const newColumn = await createColumn(idParam, { title: newColumnTitle, order: newOrder }).then(
          (res) => res.data
        );
        dispatch(setNewColumn(mapperColumn(newColumn)));
      } catch (e) {
        showNotification('error', message('errorTitle'), (e as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
    setIsShowColumnModal(false);
  };

  const onDragEnd = (res: DropResult) => {
    // TODO определять что и куда перетащили, обновлять данные в соответствии с действием
    console.log('Drag end');
    console.log(res);
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
    } else {
      const authStatus = checkTokenExpired();

      if (!authStatus) {
        logout();
      }
    }

    dispatch(setCurrentBoard(null)); // clear previous data
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
            <Droppable droppableId="board" direction="horizontal" type="column">
              {(provided) => (
                <ColumnsPanel ref={provided.innerRef} {...provided.droppableProps}>
                  {columns.map((col) => (
                    <Column {...col} key={col.id} />
                  ))}
                </ColumnsPanel>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Container>

      <ColumnModal
        title={message('addColumnModalTitle')}
        isVisible={isShowColumnModal}
        onOk={addColumn}
        onCancel={() => setIsShowColumnModal(false)}
      />
    </BasePage>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ControlPanel = styled.div`
  padding: 0 var(--page-gutter);
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const HideXs = styled.div`
  @media (max-width: 480px) {
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
