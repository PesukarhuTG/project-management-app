import { OptionsProps } from './ModalProps';
import TaskResponse from './TaskModel';

export interface Tasks {
  [id: string]: TaskResponse[];
}

interface InitialTasksState {
  taskModalVisible: boolean;
  taskLoading: boolean;
  title: string;
  description: string;
  order: number;
  // tasks: TaskResponse[];
  tasks: Tasks;
  options: OptionsProps[];
  responsibleUserName: string;
}

export default InitialTasksState;
