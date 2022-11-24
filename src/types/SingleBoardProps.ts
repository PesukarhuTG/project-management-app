interface SingleBoardProps {
  boardName: string;
  boardDescription: string;
  id: string;
  remove: (id: string) => void;
}

export type BoardProps = Omit<SingleBoardProps, 'remove'>;
export type BoardTitle = Omit<BoardProps, 'id'>;

export default SingleBoardProps;
