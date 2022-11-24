import { BoardProps, BoardTitle } from './SingleBoardProps';

interface InitialBoardsState {
  createModalVisible: boolean;
  boardTitle: BoardTitle;
  fetchLoading: boolean;
  boards: BoardProps[];
}

export default InitialBoardsState;
