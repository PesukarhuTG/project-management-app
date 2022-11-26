import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import boardsReducer from './boardsSlice';

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
