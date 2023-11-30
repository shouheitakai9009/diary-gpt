import { useMutation } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { UserField } from '@/components/ui/SignUpDialog/types/field';
import { User } from '@/types/prisma';

type SignUpReqParams = UserField;
type SignUpResponse = Omit<User, 'password'>;

export const useSignUp = () => {
  const { api } = useAxiosWrapper();

  return useMutation({
    mutationFn: async (params: SignUpReqParams) => {
      const response = await api.post<SignUpResponse>('/auth/signup', params);
      return response.data;
    },
  });
};
