import { OptionsProps } from './ModalProps';
import TaskResponse from './TaskModel';

export interface Tasks {
  [id: string]: TaskResponse[];
}

interface InitialTasksState {
  title: string;
  description: string;
  order: number;
  tasks: Tasks;
  options: OptionsProps[];
}

export default InitialTasksState;
