import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialTasksState } from '../types';
import { OptionsProps } from '../types/ModalProps';
import { Tasks } from '../types/InitialTasksState';

const initialState: InitialTasksState = {
  title: '',
  description: '',
  order: 0,
  tasks: { id: [] },
  options: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setTaskDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setTaskOrder(state, action: PayloadAction<number>) {
      state.order = action.payload;
    },
    setTasks(state, action: PayloadAction<Tasks>) {
      state.tasks = { ...state.tasks, ...action.payload };
    },
    setOptions(state, action: PayloadAction<OptionsProps[]>) {
      state.options = action.payload;
    },
  },
});

export const { setTaskTitle, setTaskDescription, setTaskOrder, setTasks, setOptions } = tasksSlice.actions;
export default tasksSlice.reducer;
