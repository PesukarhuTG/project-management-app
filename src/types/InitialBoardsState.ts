import { BoardInfo, BoardProps } from './SingleBoardProps';

interface InitialBoardsState {
  createModalVisible: boolean;
  title: string;
  description: string;
  fetchLoading: boolean;
  boards: BoardProps[];
  search: string;
  filteredBoards: BoardProps[];
  currentBoard: BoardInfo | null;
}

export default InitialBoardsState;
