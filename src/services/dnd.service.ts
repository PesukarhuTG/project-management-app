type ReorderData = {
  _id?: string;
  id?: string;
  order: number;
  columnId?: string;
};

type ReorderRequest = {
  _id: string;
  order: number;
  columnId?: string;
};

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
    const res: ReorderRequest = {
      _id: (item.id ?? item._id) as string,
      order: item.order,
    };

    if (item.columnId) {
      res.columnId = item.columnId;
    }

    return res;
  });

  return {
    data: resultData,
    request: resultRequest,
  };
};
