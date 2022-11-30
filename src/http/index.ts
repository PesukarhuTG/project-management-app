import axios from 'axios';
import { BACKEND_URL } from '../types/constants';
import messages from '../localization/messages';
const { ru, en } = messages;

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
      throw new Error(lang === 'en' ? en.error400 : ru.error400);
    }
    if (parseInt(error.response.data.statusCode) === 401) {
      throw new Error(lang === 'en' ? en.error401 : ru.error401);
    }
    if (parseInt(error.response.data.statusCode) === 402) {
      throw new Error(lang === 'en' ? en.error402 : ru.error402);
    }
    if (parseInt(error.response.data.statusCode) === 403) {
      throw new Error(lang === 'en' ? en.error403 : ru.error403);
    }
    if (parseInt(error.response.data.statusCode) === 404) {
      throw new Error(lang === 'en' ? en.error404 : ru.error404);
    }
    if (parseInt(error.response.data.statusCode) === 409) {
      throw new Error(lang === 'en' ? en.error409 : ru.error409);
    }

    throw new Error(lang === 'en' ? en.commonError : ru.commonError);
  }
);

export default axiosApi;
