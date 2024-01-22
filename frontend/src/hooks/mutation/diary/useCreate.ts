import { useMutation, useQueryClient } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { fetchDiariesKey } from '@/hooks/queries/diary/useFetchList';
import { DiaryWithDraft } from '@/types/diary';
import { useUser } from '@/hooks/queries/useUser';

export const useCreate = () => {
  const { api } = useAxiosWrapper();
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post<DiaryWithDraft>('/diary/create');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([fetchDiariesKey(user?.id)]);
    },
  });
};
