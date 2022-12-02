import { ColumnReorderData } from '../types/ColumnModel';
import { TaskReorderData } from '../types/TaskModel';

type ReorderData = {
  _id?: string;
  id?: string;
  order: number;
  columnId?: string;
};

type ReorderRequest = ColumnReorderData | TaskReorderData;

/** сортировка после перетаскивания в пределах одной зоны */
export const reorderDroppableZone = <D extends ReorderData>(
  data: D[],
  start: number,
  end: number
): { data: D[]; request: ReorderRequest[] } => {
  const orderedData = [...data];
  const [removedItem] = orderedData.splice(start, 1);
  orderedData.splice(end, 0, removedItem);

  const resultData = orderedData.map((item, i) => {
    const newItem: D = { ...item, order: i };
    return newItem;
  });

  const resultRequest = resultData.map((item) => {
    if (item._id && item.columnId) {
      const res: TaskReorderData = {
        _id: item._id as string,
        order: item.order,
        columnId: item.columnId,
      };

      return res;
    }

    const res: ColumnReorderData = {
      _id: (item.id ?? item._id) as string,
      order: item.order,
    };

    return res;
  });

  return {
    data: resultData,
    request: resultRequest,
  };
};
