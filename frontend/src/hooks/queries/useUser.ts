import { useQuery } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { User } from '@/types/prisma';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/authState/atom';

export const userKey = 'userKey';

export const useUser = () => {
  const accessToken = useRecoilValue(authState.accessToken);
  const { api } = useAxiosWrapper();

  return useQuery([userKey, accessToken], {
    queryFn: async () => {
      const response = await api.get<User>('/auth/me');
      return response.data;
    },
    staleTime: 1000 * 60 /* sec */ * 60 /* min */ * 1 /* hour */ * 1 /* day */, // TODO: 本番環境ではもっと長くするべき
    enabled: !!accessToken,
  });
};
