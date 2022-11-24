import React, { FC } from 'react';
import styled from 'styled-components';
import { BoardProps } from '../types/SingleBoardProps';
import EmptyBoard from './EmptyBoard';
import SingleBoard from './SingleBoard';

interface BoardsListProps {
  boards: BoardProps[];
  remove: (id: string) => void;
}

const BoardsList: FC<BoardsListProps> = ({ boards, remove }) => {
  if (!boards.length)
    return (
      <BoardsContainer>
        <EmptyBoard />
      </BoardsContainer>
    );
  return (
    <BoardsContainer>
      {boards.map((board) => (
        <SingleBoard {...board} remove={remove} key={board.id} />
      ))}
    </BoardsContainer>
  );
};

const BoardsContainer = styled.div`
  max-width: 1358px;
  margin: 30px auto 60px;
  gap: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;

  @media (max-width: 1100px) {
    max-width: 892px;
    margin: 0 auto 30px;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 750px) {
    max-width: 426px;
    grid-template-columns: 1fr;
  }
`;

export default BoardsList;
