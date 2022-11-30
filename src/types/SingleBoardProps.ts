interface SingleBoardProps {
  title: string;
  description: string;
  id: string;
  remove: (id: string) => void;
  edit: (id: string) => void;
}

export type BoardProps = Omit<SingleBoardProps, 'remove' | 'edit'>;
export type BoardTitle = Omit<BoardProps, 'id'>;
export type BoardInfo = Omit<BoardProps, 'description'>;

export default SingleBoardProps;
