import axios from 'axios';
import queryString from 'query-string';

const AxiosClient = axios.create({
  baseURL: 'https://6385a825875ca3273d41aa9e.mockapi.io/api/v1',
  responseType: 'json',
  timeout: 50000,
  paramsSerializer: params => queryString.stringify(params),
});

AxiosClient.interceptors.request.use(
  async config => {
    const newConfig = config;
    return newConfig;
  },
  error => {
    console.log(error.response.data);
    return Promise.reject(error);
  },
);

export default AxiosClient;
