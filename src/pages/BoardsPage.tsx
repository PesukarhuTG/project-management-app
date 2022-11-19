import React, { useState } from 'react';
import { BasePage, BoardsList } from '../components';
import { BoardProps } from '../types/SingleBoardProps';

const BoardsPage: React.FC = () => {
  const [boards, setBoards] = useState<BoardProps[]>([
    {
      boardTitle: 'boardTitle_1',
      boardDescription: 'boardDescription_1',
      id: 1,
    },
    {
      boardTitle: 'boardTitle_2',
      boardDescription: 'boardDescription_2',
      id: 2,
    },
    {
      boardTitle: 'boardTitle_3',
      boardDescription: 'boardDescription_3',
      id: 3,
    },
    {
      boardTitle: 'boardTitle_4',
      boardDescription: 'boardDescription_4',
      id: 4,
    },
    {
      boardTitle: 'boardTitle_5',
      boardDescription: 'boardDescription_5',
      id: 5,
    },
    {
      boardTitle: 'boardTitle_6',
      boardDescription: 'boardDescription_6',
      id: 6,
    },
    {
      boardTitle: 'boardTitle_7',
      boardDescription: 'boardDescription_7',
      id: 7,
    },
  ]);

  const deleteBoard = (id: number) => {
    setBoards(boards.filter((item) => item.id !== id));
  };

  return (
    <BasePage>
      <BoardsList boards={boards} remove={deleteBoard} />
    </BasePage>
  );
};

export default BoardsPage;
