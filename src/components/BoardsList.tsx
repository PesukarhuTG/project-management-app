import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/Store';
import { BoardProps } from '../types/SingleBoardProps';
import EmptyBoard from './EmptyBoard';
import SingleBoard from './SingleBoard';

interface BoardsListProps {
  boards: BoardProps[];
  remove: (id: string) => void;
  edit: (id: string) => void;
}

const BoardsList: FC<BoardsListProps> = ({ boards, remove, edit }) => {
  const { search } = useSelector((state: RootState) => state.boards);

  if (!boards.length) return <NothingFound>Nothing found</NothingFound>;

  return (
    <BoardsContainer>
      {boards.map((board) => (
        <SingleBoard {...board} remove={remove} edit={edit} key={board.id} />
      ))}
      {!search && <EmptyBoard />}
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

const NothingFound = styled.h2`
  margin-top: 40px;
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  line-height: 54px;
  color: var(--primary-dark);

  @media (max-width: 1100px) {
    margin-top: 20px;
  }
`;

export default BoardsList;
