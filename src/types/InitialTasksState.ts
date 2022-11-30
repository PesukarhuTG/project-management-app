import { OptionsProps } from './ModalProps';
import TaskResponse from './TaskModel';

interface InitialTasksState {
  taskModalVisible: boolean;
  taskLoading: boolean;
  title: string;
  description: string;
  order: number;
  tasks: TaskResponse[];
  options: OptionsProps[];
  //   search: string;
  //   filteredBoards: BoardProps[];
  //   currentBoard: BoardInfo | null;
}

export default InitialTasksState;
