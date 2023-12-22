import axiosClient from '../config/axiosClient.ts';

export const authService = {
  login: async (email: string, password: string): Promise<any> => {
    const url = 'auth/login';
    return await axiosClient.post(url, {email, password});
  },
  me: async (): Promise<any> => {
    const url = 'auth/me';
    return await axiosClient.get(url);
  },
};
