import axiosApi from '../http';
import { AxiosResponse } from 'axios';
import { LoginResponse, RegistrationResponse } from '../types';

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