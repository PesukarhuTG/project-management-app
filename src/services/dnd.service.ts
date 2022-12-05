import { ColumnReorderData } from '../types/ColumnModel';
import TaskResponse, { TaskReorderData } from '../types/TaskModel';

type ReorderData = {
  _id?: string;
  id?: string;
  order: number;
  columnId?: string;
};

type ReorderRequest = ColumnReorderData | TaskReorderData;

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

export const reorderDroppableBetweenZone = (
  sourceData: TaskResponse[],
  destinationData: TaskResponse[],
  destinationId: string,
  start: number,
  end: number
): { source: TaskResponse[]; destination: TaskResponse[]; request: TaskReorderData[] } => {
  const setOrderData = (tasks: TaskResponse[]): TaskResponse[] => {
    return tasks.map((task, i) => ({
      ...task,
      order: i,
    }));
  };

  const setOrderResult = (tasks: TaskResponse[]): TaskReorderData[] => {
    return tasks.map((task) => ({
      _id: task._id,
      order: task.order,
      columnId: task.columnId,
    }));
  };

  let source = [...sourceData];
  let destination = [...destinationData];

  const [sourceRemoverItem] = source.splice(start, 1);

  destination.splice(end, 0, { ...sourceRemoverItem, columnId: destinationId });
  const sourceResult = setOrderData(source);
  const destinationResult = setOrderData(destination);

  return {
    source: sourceResult,
    destination: destinationResult,
    request: [...setOrderResult(sourceResult), ...setOrderResult(destinationResult)],
  };
};
