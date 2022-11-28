import { Column } from './ColumnModel';

interface InitialBoardState {
  id: string | null;
  title: string | null;
  columns: Column[];
}

export default InitialBoardState;
