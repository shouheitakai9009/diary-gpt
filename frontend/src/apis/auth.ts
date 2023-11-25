import { AxiosResponse } from 'axios';
import { api } from './base';
import { User } from '@/types/prisma';

export type SignInReqParams = { email: string; password: string };
export type SignInResponse = { accessToken: string };

export const auth = {
  me: async (): Promise<AxiosResponse<User>> => api.get('/auth/me'),
  signIn: async (
    params: SignInReqParams,
  ): Promise<AxiosResponse<SignInResponse>> => api.post('/auth/login', params),
};
