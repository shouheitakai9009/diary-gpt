import { useMutation, useQueryClient } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { DiaryDraft } from '@/types/prisma';
import { fetchDiariesKey } from '@/hooks/queries/diary/useFetchList';
import { useToast } from '@/hooks/common/useToast';

type NewDiaryResponse = DiaryDraft;

export const useCreate = () => {
  const { api } = useAxiosWrapper();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post<NewDiaryResponse>('/diary/create');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([fetchDiariesKey]);
      toast({ title: '新しい日記を作成しました' });
    },
  });
};
