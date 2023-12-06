import { useQuery } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { Diary, DiaryDraft } from '@/types/prisma';

export const fetchDiarysKey = 'fetchDiarysKey';

export type FetchDiaryResponse = Array<Diary & { drafts: DiaryDraft[] }>;

export const useFetchDiary = (diaryId: number) => {
  const { api } = useAxiosWrapper();

  return useQuery([fetchDiarysKey], {
    queryFn: async () => {
      const response = await api.get<FetchDiaryResponse>(
        `/diary/get/${diaryId}`,
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });
};
