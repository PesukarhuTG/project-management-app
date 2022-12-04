import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialColumnsState } from '../types';
import ColumnModel from '../types/ColumnModel';

const initialState: InitialColumnsState = {
  columns: [],
  newColumnTitle: '',
  orderCounter: 0,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setInitialColumns(state) {
      state.columns = [...initialState.columns];
      state.orderCounter = initialState.orderCounter;
    },
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
    deleteColumnById(state, action: PayloadAction<string>) {
      state.columns = state.columns.filter((column) => column.id !== action.payload);
      state.orderCounter = Math.max(...state.columns.map((column) => column.order), 0);
    },
  },
});

export const { setInitialColumns, setColumns, setNewColumn, setNewColumnTitle, updateColumnData, deleteColumnById } =
  columnsSlice.actions;
export default columnsSlice.reducer;
