import { useQuery } from 'react-query';
import { API } from '../../apis';

export const userKey = 'userKey';

export const useUser = () =>
  useQuery([userKey], {
    queryFn: async () => {
      const response = await API.me();
      return response.data;
    },
  });
