import { useQuery } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { Diary, DiaryDraft } from '@/types/prisma';

export const fetchDiariesKey = (userId?: number) => ['useFetchDiaries', userId];

export type FetchDiariesResponse = Array<Diary & { drafts: DiaryDraft[] }>;

export const useFetchDiaries = (userId?: number) => {
  const { api } = useAxiosWrapper();

  return useQuery([fetchDiariesKey(userId)], {
    queryFn: async () => {
      const response = await api.get<FetchDiariesResponse>('/diary/list');
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
};
