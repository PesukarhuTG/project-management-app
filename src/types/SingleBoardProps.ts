interface SingleBoardProps {
  boardTitle: string;
  boardDescription: string;
  id: number;
  remove: (id: number) => void;
}

export type BoardProps = Omit<SingleBoardProps, 'remove'>;

export default SingleBoardProps;
