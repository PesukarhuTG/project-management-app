import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialUserState } from '../types';

const initialState: InitialUserState = {
  name: '',
  login: '',
  password: '',
  id: '',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    changeUserLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    changeUserPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    changeUserId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    removeUserData(state) {
      state.name = '';
      state.login = '';
      state.password = '';
      state.id = '';
    },
    changeAuthStatus(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { changeUserName, changeUserLogin, changeUserPassword, changeUserId, removeUserData, changeAuthStatus } =
  userSlice.actions;
export default userSlice.reducer;
