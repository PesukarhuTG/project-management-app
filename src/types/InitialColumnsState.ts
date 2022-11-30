import ColumnModel from './ColumnModel';

interface InitialColumnsState {
  columns: ColumnModel[];
  newColumnTitle: string;
  orderCounter: number;
}

export default InitialColumnsState;
