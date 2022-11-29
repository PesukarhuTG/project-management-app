import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialColumnsState } from '../types';
import ColumnModel from '../types/ColumnModel';

const initialState: InitialColumnsState = {
  columns: [],
  newColumnTitle: '',
  orderCounter: 0, // largest current order
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<ColumnModel[]>) {
      state.columns = [...action.payload].sort((a, b) => a.order - b.order);
      state.orderCounter = Math.max(...action.payload.map((column) => column.order), 0);
    },
    setNewColumn(state, action: PayloadAction<ColumnModel>) {
      state.columns = [...state.columns, action.payload].sort((a, b) => a.order - b.order);
      state.orderCounter = action.payload.order;
    },
    setNewColumnTitle(state, action: PayloadAction<string>) {
      state.newColumnTitle = action.payload;
    },
    updateColumnData(state, action: PayloadAction<ColumnModel>) {
      state.columns = state.columns.map((column) => (action.payload.id === column.id ? action.payload : column));
    },
  },
});

export const { setColumns, setNewColumn, setNewColumnTitle, updateColumnData } = columnsSlice.actions;
export default columnsSlice.reducer;
