import { BoardProps, BoardTitle } from './SingleBoardProps';

interface InitialBoardsState {
  createModalVisible: boolean;
  title: string;
  description: string;
  fetchLoading: boolean;
  boards: BoardProps[];
}

export default InitialBoardsState;
