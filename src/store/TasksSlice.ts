import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialTasksState } from '../types';
import { OptionsProps } from '../types/ModalProps';
import { Tasks } from '../types/InitialTasksState';

const initialState: InitialTasksState = {
  taskModalVisible: false,
  taskLoading: false,
  title: '',
  description: '',
  order: 0,
  tasks: { id: [] },
  options: [],
  responsibleUserName: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskModalVisible(state, action: PayloadAction<boolean>) {
      state.taskModalVisible = action.payload;
    },
    setTaskLoading(state, action: PayloadAction<boolean>) {
      state.taskLoading = action.payload;
    },
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

      // const ordersArr = Object.values(state.tasks);
      // let orders: number[] = [];
      // ordersArr.forEach((el) =>
      //   el.forEach((elem) => {
      //     orders.push(elem.order);
      //   })
      // );
      // state.order = Math.max(...orders);
    },
    setOptions(state, action: PayloadAction<OptionsProps[]>) {
      state.options = action.payload;
    },
    setResponsibleUserName(state, action: PayloadAction<string>) {
      state.responsibleUserName = action.payload;
    },
  },
});

export const {
  setTaskModalVisible,
  setTaskLoading,
  setTaskTitle,
  setTaskDescription,
  setTaskOrder,
  setTasks,
  setOptions,
  setResponsibleUserName,
} = tasksSlice.actions;
export default tasksSlice.reducer;
