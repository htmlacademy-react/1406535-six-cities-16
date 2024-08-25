import axios, { AxiosInstance } from 'axios';
import { BACKEND_ROOT, REQUEST_TIMEOUT } from '../const';

export const createAPI = () : AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_ROOT,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
