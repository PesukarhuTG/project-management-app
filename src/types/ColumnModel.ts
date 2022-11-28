interface ColumnModel {
  id: string;
  title: string;
  order: number;
  boardId: string;
}

export type Column = Omit<ColumnModel, 'boardId'>;

export default ColumnModel;
