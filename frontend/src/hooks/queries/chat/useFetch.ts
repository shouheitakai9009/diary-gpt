import { useQuery } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { DiaryFeedback } from '@/types/prisma';

export const fetchChatsKey = (diaryId?: number) => ['fetchChatsKey', diaryId];

export const useFetchChats = (diaryId?: number) => {
  const { api } = useAxiosWrapper();

  return useQuery([fetchChatsKey(diaryId)], {
    queryFn: async () => {
      const response = await api.get<DiaryFeedback[]>(`/chat/all/${diaryId}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
    enabled: !!diaryId,
  });
};
