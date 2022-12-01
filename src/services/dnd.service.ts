import ColumnModel, { ColumnReorderData } from '../types/ColumnModel';

type ReorderFn<D, R> = (data: D[], start: number, end: number) => { data: D[]; request: R[] };

/** сортировка колонок после перетаскивания */
export const reorderColumn: ReorderFn<ColumnModel, ColumnReorderData> = (data, start, end) => {
  const orderedData = [...data];
  const [removedItem] = orderedData.splice(start, 1);
  orderedData.splice(end, 0, removedItem);

  const resultData = orderedData.map((item, i) => ({ ...item, order: i }));

  const resultRequest = resultData.map((item) => {
    const res: ColumnReorderData = {
      _id: item.id,
      order: item.order,
    };

    return res;
  });

  return {
    data: resultData,
    request: resultRequest,
  };
};
