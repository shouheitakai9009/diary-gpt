import { useMutation } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';

type SignInReqParams = { email: string; password: string };
type SignInResponse = { accessToken: string; userId: number };

export const useSignIn = () => {
  const { api } = useAxiosWrapper();

  return useMutation({
    mutationFn: async (params: SignInReqParams) => {
      const response = await api.post<SignInResponse>('/auth/login', params);
      return response.data.accessToken;
    },
  });
};
