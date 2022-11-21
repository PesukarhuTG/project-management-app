import { DB_LINK } from '../types/constants';

export interface Options {
  [key: string]: string | number;
}

const createUrl = (endpoint: string, options?: Partial<Options>): string => {
  let querryUrl: string = '';

  if (options) {
    const querryKeys: string[] = Object.keys(options);
    querryUrl = '?' + querryKeys.map((key) => `${key}=${options[key]}`).join('&');
  }

  const fullUrl: string = `${DB_LINK}${endpoint}${querryUrl}`;

  return fullUrl;
};

export default createUrl;
