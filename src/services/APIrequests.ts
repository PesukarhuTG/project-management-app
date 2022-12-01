import axiosApi from '../http';
import { AxiosResponse } from 'axios';
import { BoardResponse, LoginResponse, RegistrationResponse, TaskResponse } from '../types';
import { ColumnCreateData, ColumnResponse } from '../types/ColumnModel';
import { TaskCreateData } from '../types/TaskModel';

export const registrationUser = async (
  name: string,
  login: string,
  password: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  console.log('запрос singup');
  return axiosApi.post<RegistrationResponse>('/auth/signup', { name, login, password });
};

export const loginUser = async (login: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  console.log('запрос singin');
  return axiosApi.post<LoginResponse>('/auth/signin', { login, password });
};

export const fetchUsers = async (): Promise<AxiosResponse<RegistrationResponse[]>> => {
  console.log('запрос получение списка пользователей');
  return axiosApi.get<RegistrationResponse[]>('/users');
};

export const deleteUser = async () => {
  console.log('запрос удаление user');
  return axiosApi.delete(`/users/${localStorage.getItem('idUser')}`);
};

export const getUserById = async (): Promise<AxiosResponse<RegistrationResponse>> => {
  console.log('запрос получения user');
  return axiosApi.get<RegistrationResponse>(`/users/${localStorage.getItem('idUser')}`);
};

export const editUserById = async (
  name: string,
  login: string,
  password: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  console.log('запрос изменения данных user');
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
  console.log('запрос на создание board');
  return axiosApi.post('/boards', { title, owner, users });
};

export const fetchBoards = async (): Promise<AxiosResponse<BoardResponse[]>> => {
  console.log('запрос на получение board');
  return axiosApi.get('/boards');
};

export const deleteBoard = async (id: string) => {
  console.log('запрос на удаление board');
  return axiosApi.delete(`/boards/${id}`);
};

export const editBoard = async (
  id: string,
  title: string,
  owner: string,
  users: string[]
): Promise<AxiosResponse<BoardResponse>> => {
  console.log('запрос на изменение board');
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
  console.log('createTask');
  const res = await axiosApi.post<TaskResponse>(`/boards/${boardId}/columns/${columnId}/tasks`, data);
  // console.log(res);
  return res;
};

export const getTasksInColumn = async (boardId: string, columnId: string): Promise<AxiosResponse<TaskResponse[]>> => {
  console.log('getAllTask');
  const res = await axiosApi.get<TaskResponse[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
  // console.log(res);
  return res;
};

export const getResponsibleUser = async (id: string): Promise<AxiosResponse<RegistrationResponse>> => {
  console.log('запрос получения ResponsibleUser');
  return axiosApi.get<RegistrationResponse>(`/users/${id}`);
};
