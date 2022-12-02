import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setCreateModalVisible } from '../store/BoardsSlice';
import { AppDispatch } from '../store/Store';
import { BoardWrapper, BoardTitle } from './styled-components';
import { useLocaleMessage } from '../hooks';

const EmptyBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const message = useLocaleMessage();

  return (
    <BoardBody onClick={() => dispatch(setCreateModalVisible(true))}>
      <BoardText> + {message('boardModalTitle')}</BoardText>
    </BoardBody>
  );
};

const BoardBody = styled(BoardWrapper)`
  justify-content: center;
  align-items: center;
  background: var(--primary-light);
`;

const BoardText = styled(BoardTitle)`
  text-align: center;

  @media (max-width: 610px) {
    padding: 20px 10px;
    line-height: 1.3;
  }
`;

export default EmptyBoard;
