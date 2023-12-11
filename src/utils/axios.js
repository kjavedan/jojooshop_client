import axios from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: HOST_API });
const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: '/user/login',
    register: '/user/add',
    me: '/user/auto-login',
    google: '/user/google-login',
    refreshToken: '/user/refresh-token',
  },
  product: {
    list: '/product/',
    details: '/product/',
    search: '/api/product/search',
  },
  category: {
    list: '/category/',
  },
  user: {
    update: (id) => `/user/update/${id}`,
  },
};
