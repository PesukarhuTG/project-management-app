import axios from 'axios';
import { BACKEND_URL } from '../types/constants';

const axiosApi = axios.create({
  baseURL: BACKEND_URL,
});

axiosApi.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem('tokenUser')) {
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tokenUser')}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const lang = localStorage.getItem('currentLang');

    if (parseInt(error.response.data.statusCode) === 400) {
      if (lang === 'en') {
        throw new Error('Bad Request');
      } else {
        throw new Error('Ошибка запроса данных');
      }
    }
    if (parseInt(error.response.data.statusCode) === 401) {
      if (lang === 'en') {
        throw new Error('Authorization error: check your login and password');
      } else {
        throw new Error('Ошибка авторизации: проверьте логин и пароль');
      }
    }
    if (parseInt(error.response.data.statusCode) === 402) {
      if (lang === 'en') {
        throw new Error('File already exist');
      } else {
        throw new Error('Файл уже существует');
      }
    }
    if (parseInt(error.response.data.statusCode) === 403) {
      if (lang === 'en') {
        throw new Error('You need to be logged');
      } else {
        throw new Error('Пожалуйста, войдите в систему');
      }
    }
    if (parseInt(error.response.data.statusCode) === 404) {
      if (lang === 'en') {
        throw new Error('Requested data was not founded');
      } else {
        throw new Error('Запрашиваемые данные не найдены');
      }
    }
    if (parseInt(error.response.data.statusCode) === 409) {
      if (lang === 'en') {
        throw new Error('Login already exist');
      } else {
        throw new Error('Такой логин уже существует');
      }
    }

    if (lang === 'en') {
      throw new Error('Something went wrong. Try again');
    } else {
      throw new Error('Что-то пошло не так, попробуйте снова');
    }
  }
);

export default axiosApi;
