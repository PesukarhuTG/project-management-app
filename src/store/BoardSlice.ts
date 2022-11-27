import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import InitialBoardState from '../types/InitialBoardState';
import { BoardProps } from '../types/SingleBoardProps';

const initialState: InitialBoardState = {
  id: null,
  title: null,
  columns: [],
};

type BoardInfo = Omit<BoardProps, 'description'>;

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardInfo(state, action: PayloadAction<BoardInfo>) {
      const { id, title } = action.payload;

      state.id = id;
      state.title = title;
    },
  },
});

export const { setBoardInfo } = boardSlice.actions;
export default boardSlice.reducer;
