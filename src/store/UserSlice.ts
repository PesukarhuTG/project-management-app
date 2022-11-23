import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialUserState } from '../types';

interface userDataProps {
  [key: string]: string;
}

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
    changeUserData(state, action: PayloadAction<userDataProps>) {
      const { name, login, password, id } = action.payload;

      state.name = name;
      state.login = login;
      state.password = password;
      state.id = id;
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

export const { changeUserData, removeUserData, changeAuthStatus } = userSlice.actions;
export default userSlice.reducer;
