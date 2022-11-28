import ColumnModel from './ColumnModel';

interface InitialColumnsState {
  columns: ColumnModel[];
  createModalVisible: boolean;
  orderCounter: number;
}

export default InitialColumnsState;
