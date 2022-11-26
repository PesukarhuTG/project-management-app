import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import boardsReducer from './BoardsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
