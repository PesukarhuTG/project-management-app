import axiosApi from '../http';
import { AxiosResponse } from 'axios';
import { LoginResponse, RegistrationResponse } from '../types';
import createUrl from './createUrl';

export const registrationUser = async (
  name: string,
  login: string,
  password: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  console.log('запрос singup');
  return axiosApi.post<RegistrationResponse>(createUrl('/auth/signup'), { name, login, password });
};

export const loginUser = async (login: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  console.log('запрос singin');
  return axiosApi.post<LoginResponse>(createUrl('/auth/signin'), { login, password });
};

export const fetchUsers = async (): Promise<AxiosResponse<RegistrationResponse[]>> => {
  console.log('запрос получение списка пользователей');
  return axiosApi.get<RegistrationResponse[]>(createUrl('/users'));
};

export const deleteUser = async () => {
  console.log('запрос удаление user');
  return axiosApi.delete(createUrl(`/users/${localStorage.getItem('idUser')}`));
};

export const getUserById = async (): Promise<AxiosResponse<RegistrationResponse>> => {
  console.log('запрос получения user');
  return axiosApi.get<RegistrationResponse>(createUrl(`/users/${localStorage.getItem('idUser')}`));
};

export const editUserById = async (
  name: string,
  login: string,
  password: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  console.log('запрос изменения данных user');
  return axiosApi.put<RegistrationResponse>(createUrl(`/users/${localStorage.getItem('idUser')}`), {
    name,
    login,
    password,
  });
};
