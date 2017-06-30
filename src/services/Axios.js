import axios from 'axios';
import Config from '@/services/Config';
import { instance } from '@/router';

const Axios = axios.create({
  baseURL: Config.server.url,
  timeout: Config.server.timeout,
});

Axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  console.error('Error : ', error.response.status);
  if (error.response.status === 403) instance.push('/login');
  return Promise.reject(error);
});

export default Axios;
