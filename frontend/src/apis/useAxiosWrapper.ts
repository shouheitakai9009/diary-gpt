import { authState } from '@/recoil/authState/atom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

export const useAxiosWrapper = () => {
  const accessToken = useRecoilValue(authState.accessToken);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_ENDPOINT,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return { api: axiosInstance };
};
