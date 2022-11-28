import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { BasePage, Button, Column, ColumnModal } from '../components';
import { useLocaleMessage } from '../hooks';
import checkTokenExpired from '../services/checkTokenExpired';
import { AppDispatch } from '../store/Store';
import { useDispatch } from 'react-redux';
import { changeAuthStatus, removeUserData } from '../store/UserSlice';

interface ColumnData {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

interface BoardData {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

const boardMock: BoardData = {
  _id: '01',
  title: 'Board title',
  owner: '001',
  users: ['002', '003'],
};

const columnsMock: ColumnData[] = [
  {
    _id: '01',
    title: 'Column 1',
    order: 1,
    boardId: 'Id of boards',
  },
  {
    _id: '02',
    title: 'Column 2',
    order: 2,
    boardId: 'Id of boards',
  },
  {
    _id: '03',
    title: 'Column 3',
    order: 3,
    boardId: 'Id of boards',
  },
];

const BoardPage: React.FC = () => {
  const navigate = useNavigate();
  const [isShowColumnModal, setIsShowColumnModal] = useState<boolean>(false);
  const [board] = useState<BoardData>(boardMock); //TODO get real board data
  const [columns] = useState<ColumnData[]>(columnsMock); //TODO get real columns list (sorted by order)
  const message = useLocaleMessage();
  const dispatch = useDispatch<AppDispatch>();

  const addColumn = () => {
    /*TODO add column*/
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
          {message('board')}: {board.title}
        </Title>
        {!!columns.length && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="column">
              {(provided) => (
                <ColumnsPanel ref={provided.innerRef} {...provided.droppableProps}>
                  {columns.map((col) => (
                    <Column id={col._id} title={col.title} order={col.order} boardId={col.boardId} key={col._id} />
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
