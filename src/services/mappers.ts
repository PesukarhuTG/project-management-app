import ColumnModel, { ColumnResponse } from '../types/ColumnModel';

export const mapperColumn = (column: ColumnResponse): ColumnModel => ({
  id: column._id,
  boardId: column.boardId,
  order: column.order,
  title: column.title,
});

export const mapperColumns = (columns: ColumnResponse[]): ColumnModel[] => {
  return columns.map((column) => ({
    id: column._id,
    boardId: column.boardId,
    order: column.order,
    title: column.title,
  }));
};
