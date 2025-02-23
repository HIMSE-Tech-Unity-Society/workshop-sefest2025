import axios, { AxiosInstance } from 'axios';

export const createNewClient: () => AxiosInstance = () => {
  const BASE_API =
    import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:3000/api/';

  return axios.create({
    baseURL: BASE_API,
    headers: {
      Accept: 'application/json',
    }
  });
};

export const client: AxiosInstance = createNewClient();

type HookType = (accessToken?: string) => AxiosInstance;

export const useAxios: HookType = (accessToken) => {
  client.interceptors.request.use((config) => {
    const newConfig = { ...config };

    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return newConfig;
  });

  return client;
};

export const { isAxiosError } = axios;
