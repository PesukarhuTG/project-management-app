import React, { FC } from 'react';
import styled from 'styled-components';
import { BoardProps } from '../types/SingleBoardProps';
import EmptyBoard from './EmptyBoard';
import SingleBoard from './SingleBoard';

interface BoardsListProps {
  boards: BoardProps[];
  remove: (id: number) => void;
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
      {boards.map((board) => {
        return <SingleBoard {...board} remove={remove} />;
      })}
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
`;

export default BoardsList;
