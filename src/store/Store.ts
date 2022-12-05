import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import boardsReducer from './BoardsSlice';
import columnsReducer from './ColumnsSlice';
import tasksReducer from './TasksSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
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
