import React from 'react';
import styled from 'styled-components';
import { BoardWrapper, BoardTitle } from './styled-components';

const EmptyBoard = () => {
  return (
    <BoardBody onClick={() => console.log('create new board')}>
      <BoardTitle> + Create new board</BoardTitle>
    </BoardBody>
  );
};

const BoardBody = styled(BoardWrapper)`
  justify-content: center;
  align-items: center;
  background: var(--board-background);
  cursor: pointer;
`;

export default EmptyBoard;
