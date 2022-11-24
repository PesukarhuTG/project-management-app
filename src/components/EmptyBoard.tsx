import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setCreateModalVisible } from '../store/BoardsSlice';
import { AppDispatch } from '../store/Store';
import { BoardWrapper, BoardTitle } from './styled-components';

const EmptyBoard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const openCreateBoardModal = () => {
    dispatch(setCreateModalVisible(true));
  };

  return (
    <BoardBody onClick={openCreateBoardModal}>
      <BoardTitle> + Create new board</BoardTitle>
    </BoardBody>
  );
};

const BoardBody = styled(BoardWrapper)`
  justify-content: center;
  align-items: center;
  background: var(--board-background);
`;

export default EmptyBoard;
