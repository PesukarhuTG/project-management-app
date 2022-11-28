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
  search: '',
  filteredBoards: [],
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
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilteredBoards(state, action: PayloadAction<BoardProps[]>) {
      state.filteredBoards = action.payload;
    },
  },
});

export const {
  setCreateModalVisible,
  setBoardName,
  setBoardDescription,
  setFetchLoading,
  setBoards,
  setSearch,
  setFilteredBoards,
} = boardsSlice.actions;
export default boardsSlice.reducer;
