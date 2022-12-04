import axiosApi from '../http';
import { AxiosResponse } from 'axios';
import { BoardResponse, LoginResponse, RegistrationResponse, TaskResponse } from '../types';
import { ColumnCreateData, ColumnReorderData, ColumnResponse } from '../types/ColumnModel';
import { TaskCreateData, TaskUpdateData, TaskReorderData } from '../types/TaskModel';

export const registrationUser = async (
  name: string,
  login: string,
  password: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  return axiosApi.post<RegistrationResponse>('/auth/signup', { name, login, password });
};

export const loginUser = async (login: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  return axiosApi.post<LoginResponse>('/auth/signin', { login, password });
};

export const fetchUsers = async (): Promise<AxiosResponse<RegistrationResponse[]>> => {
  return axiosApi.get<RegistrationResponse[]>('/users');
};

export const deleteUser = async () => {
  return axiosApi.delete(`/users/${localStorage.getItem('idUser')}`);
};

export const getUserById = async (): Promise<AxiosResponse<RegistrationResponse>> => {
  return axiosApi.get<RegistrationResponse>(`/users/${localStorage.getItem('idUser')}`);
};

export const editUserById = async (
  name: string,
  login: string,
  password: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  return axiosApi.put<RegistrationResponse>(`/users/${localStorage.getItem('idUser')}`, {
    name,
    login,
    password,
  });
};

export const createBoard = async (
  title: string,
  owner: string,
  users: string[]
): Promise<AxiosResponse<BoardResponse>> => {
  return axiosApi.post('/boards', { title, owner, users });
};

export const fetchBoards = async (): Promise<AxiosResponse<BoardResponse[]>> => {
  return axiosApi.get('/boards');
};

export const deleteBoard = async (id: string) => {
  return axiosApi.delete(`/boards/${id}`);
};

export const editBoard = async (
  id: string,
  title: string,
  owner: string,
  users: string[]
): Promise<AxiosResponse<BoardResponse>> => {
  return axiosApi.put<BoardResponse>(`/boards/${id}`, {
    title,
    owner,
    users,
  });
};

export const getUserIds = async (): Promise<string[]> => {
  const usersList = await fetchUsers().then((res) => res.data);
  const usersId = usersList.map((user) => user._id);
  return usersId;
};

export const getUserNames = async (): Promise<string[]> => {
  const usersList = await fetchUsers().then((res) => res.data);
  const userNames = usersList.map((user) => user.name);
  return userNames;
};

export const getBoardById = async (id: string): Promise<AxiosResponse<BoardResponse>> => {
  return axiosApi.get<BoardResponse>(`/boards/${id}`);
};

export const getColumnsInBoard = async (id: string): Promise<AxiosResponse<ColumnResponse[]>> => {
  return axiosApi.get<ColumnResponse[]>(`/boards/${id}/columns`);
};

export const createColumn = async (id: string, data: ColumnCreateData): Promise<AxiosResponse<ColumnResponse>> => {
  return axiosApi.post<ColumnResponse>(`/boards/${id}/columns`, data);
};

export const updateColumn = async (
  idBoard: string,
  idColumn: string,
  data: ColumnCreateData
): Promise<AxiosResponse<ColumnResponse>> => {
  return axiosApi.put<ColumnResponse>(`/boards/${idBoard}/columns/${idColumn}`, data);
};

export const createTask = async (
  boardId: string,
  columnId: string,
  data: TaskCreateData
): Promise<AxiosResponse<TaskResponse>> => {
  return axiosApi.post<TaskResponse>(`/boards/${boardId}/columns/${columnId}/tasks`, data);
};

export const updateTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  data: TaskUpdateData
): Promise<AxiosResponse<TaskResponse>> => {
  return axiosApi.put<TaskResponse>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, data);
};

export const getTasksInColumn = async (boardId: string, columnId: string): Promise<AxiosResponse<TaskResponse[]>> => {
  return axiosApi.get<TaskResponse[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
};

export const deleteTask = async (
  boardId: string,
  columnId: string,
  taskId: string
): Promise<AxiosResponse<TaskResponse>> => {
  return axiosApi.delete<TaskResponse>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
};

export const deleteColumn = async (idBoard: string, idColumn: string): Promise<AxiosResponse<ColumnResponse>> => {
  return axiosApi.delete<ColumnResponse>(`/boards/${idBoard}/columns/${idColumn}`);
};

export const reorderColumns = async (data: ColumnReorderData[]): Promise<AxiosResponse<ColumnResponse[]>> => {
  return axiosApi.patch<ColumnResponse[]>(`/columnsSet`, data);
};

export const reorderTasks = async (data: TaskReorderData[]): Promise<AxiosResponse<TaskResponse[]>> => {
  return axiosApi.patch<TaskResponse[]>(`/tasksSet`, data);
};
