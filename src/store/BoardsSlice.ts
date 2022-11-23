import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialBoardsState } from '../types';

const initialState: InitialBoardsState = {
  createModalVisible: false,
};

const userSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCreateModalVisible(state, action: PayloadAction<boolean>) {
      state.createModalVisible = action.payload;
    },
  },
});

export const { setCreateModalVisible } = userSlice.actions;
export default userSlice.reducer;
