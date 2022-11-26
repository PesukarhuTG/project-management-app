import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialBoardsState } from '../types';
import { BoardProps } from '../types/SingleBoardProps';

const initialState: InitialBoardsState = {
  createModalVisible: false,
  title: '',
  description: '',
  fetchLoading: false,
  boards: [],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCreateModalVisible(state, action: PayloadAction<boolean>) {
      state.createModalVisible = action.payload;
    },
    setBoardName(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setBoardDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setFetchLoading(state, action: PayloadAction<boolean>) {
      state.fetchLoading = action.payload;
    },
    setBoards(state, action: PayloadAction<BoardProps[]>) {
      state.boards = action.payload;
    },
  },
});

export const { setCreateModalVisible, setBoardName, setBoardDescription, setFetchLoading, setBoards } =
  boardsSlice.actions;
export default boardsSlice.reducer;
