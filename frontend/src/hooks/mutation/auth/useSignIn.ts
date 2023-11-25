import { useMutation } from 'react-query';
import { API } from '../../../apis';
import { SignInReqParams } from '@/apis/auth';

export const useSignIn = () =>
  useMutation({
    mutationFn: async (params: SignInReqParams) => {
      const response = await API.signIn(params);
      return response.data.accessToken;
    },
  });
