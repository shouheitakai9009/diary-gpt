import { useQuery } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { Diary, DiaryDraft } from '@/types/prisma';

export const fetchDiariesKey = 'useFetchDiaries';

export type FetchDiariesResponse = Array<Diary & { drafts: DiaryDraft[] }>;

export const useFetchDiaries = () => {
  const { api } = useAxiosWrapper();

  return useQuery([fetchDiariesKey], {
    queryFn: async () => {
      const response = await api.get<FetchDiariesResponse>('/diary/list');
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
