import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialTasksState, TaskResponse } from '../types';
import { OptionsProps } from '../types/ModalProps';

const initialState: InitialTasksState = {
  taskModalVisible: false,
  taskLoading: false,
  title: '',
  description: '',
  order: 0,
  tasks: [],
  options: [],
};

//  const newOrder = useSelector((state: RootState) => state.columns.orderCounter) + 1;

// setNewColumn(state, action: PayloadAction<ColumnModel>) {
//       state.columns = [...state.columns, action.payload].sort((a, b) => a.order - b.order);
//       state.orderCounter = action.payload.order;
//     },

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
    setTasks(state, action: PayloadAction<TaskResponse[]>) {
      state.tasks = action.payload;
    },
    setOptions(state, action: PayloadAction<OptionsProps[]>) {
      state.options = action.payload;
    },

    // setSearch(state, action: PayloadAction<string>) {
    //   state.search = action.payload;
    // },
    // setFilteredBoards(state, action: PayloadAction<BoardProps[]>) {
    //   state.filteredBoards = action.payload;
    // },
    // setCurrentBoard(state, action: PayloadAction<BoardInfo | null>) {
    //   state.currentBoard = action.payload;
    // },
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
} = tasksSlice.actions;
export default tasksSlice.reducer;
