import api from './baseUrl';
import { endpoints } from 'src/utils/axios';

export const registerUser = (data) =>
  api.post(endpoints.auth.register, data, { withCredentials: true }).then((res) => res);

export const loginUser = (data) =>
  api.post(endpoints.auth.login, data, { withCredentials: true }).then((res) => res);

export const retriveTokenWithGoogleCode = (data) =>
  api.post(endpoints.auth.google, data, { withCredentials: true }).then((res) => res);

export const getUserInfoByRefreshToken = () =>
  api.post(endpoints.auth.me, {}, { withCredentials: true });
