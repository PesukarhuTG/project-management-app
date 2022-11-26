import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setCreateModalVisible } from '../store/boardsSlice';
import { AppDispatch } from '../store/store';
import { BoardWrapper, BoardTitle } from './styled-components';
import { useLocaleMessage } from '../hooks';

const EmptyBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const message = useLocaleMessage();

  return (
    <BoardBody onClick={() => dispatch(setCreateModalVisible(true))}>
      <BoardTitle> + {message('boardModalTitle')}</BoardTitle>
    </BoardBody>
  );
};

const BoardBody = styled(BoardWrapper)`
  justify-content: center;
  align-items: center;
  background: var(--board-background);
`;

export default EmptyBoard;
