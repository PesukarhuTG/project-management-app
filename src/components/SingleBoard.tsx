import React, { FC } from 'react';
import styled from 'styled-components';
import boardEditIco from '../assets/ico/icon-edit.svg';
import boardDeleteIco from '../assets/ico/icon-trush.svg';

interface SingleBoardProps {
  boardTitle?: string;
  boardDescription?: string;
}

const SingleBoard: FC<SingleBoardProps> = ({ boardTitle = 'Board title', boardDescription = 'Board description' }) => {
  return (
    <BoardBody>
      <BoardContent>
        <BoardTitle>{boardTitle}</BoardTitle>
        <BoardDescription>{boardDescription}</BoardDescription>
      </BoardContent>
      <BoardTools>
        <BoardLink href="/">Open board</BoardLink>
        <BoardEdit onClick={() => console.log('open modal window for edit')} />
        <BoardDelete onClick={() => console.log('open modal window for delete')} />
      </BoardTools>
    </BoardBody>
  );
};

const BoardBody = styled.div`
  max-width: 426px;
  min-height: 290px;
  display: flex;
  flex-direction: column;
  color: var(--primary-dark);
  border: 2px solid var(--primary-dark);
  border-radius: 30px;
`;

const BoardContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  background-color: var(--board-background);
  border-radius: 30px 30px 0 0;
`;

const BoardTitle = styled.p`
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 26px;
  line-height: 35px;
`;

const BoardDescription = styled.p`
  line-height: 25px;
`;

const BoardTools = styled.div`
  height: 65px;
  display: flex;
  justify-content: end;
  gap: 20px;
  padding: 20px;
  background-color: var(--light-font);
  border-radius: 0 0 30px 30px;
`;

const BoardLink = styled.a`
  color: var(--primary-dark);
  font-weight: 700;
  line-height: 25px;

  &:hover {
    color: var(--btn-primary-hover);
  }
`;

const BoardEdit = styled.div`
  width: 30px;
  height: 30px;
  margin-left: auto;
  background: url(${boardEditIco});
  cursor: pointer;

  &:hover {
    filter: invert(48%) sepia(79%) saturate(2898%) hue-rotate(189deg) brightness(97%) contrast(108%);
  }
`;

const BoardDelete = styled.div`
  width: 30px;
  height: 30px;
  background: url(${boardDeleteIco});
  cursor: pointer;

  &:hover {
    filter: invert(48%) sepia(79%) saturate(2898%) hue-rotate(189deg) brightness(97%) contrast(108%);
  }
`;

export default SingleBoard;
