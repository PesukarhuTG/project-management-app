interface ColumnModel {
  id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface ColumnResponse extends Omit<ColumnModel, 'id'> {
  _id: string;
}

export type ColumnCreateData = Pick<ColumnModel, 'title' | 'order'>;

export default ColumnModel;
