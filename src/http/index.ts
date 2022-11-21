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
    if (parseInt(error.response.data.statusCode) === 400) {
      throw new Error('Bad Request: ' + error.response.status);
    }
    if (parseInt(error.response.data.statusCode) === 401) {
      throw new Error('Authorization error: ' + error.response.status);
    }
    if (parseInt(error.response.data.statusCode) === 402) {
      throw new Error('File already exist: ' + error.response.status);
    }
    if (parseInt(error.response.data.statusCode) === 403) {
      throw new Error('You need to be logged: ' + error.response.status);
    }
    if (parseInt(error.response.data.statusCode) === 404) {
      throw new Error('Requested data was not founded: ' + error.response.status);
    }
    if (parseInt(error.response.data.statusCode) === 409) {
      throw new Error('Login already exist: ' + error.response.status);
    }
    throw error;
  }
);

export default axiosApi;
