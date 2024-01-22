import { useMutation, useQueryClient } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { fetchDiariesKey } from '@/hooks/queries/diary/useFetchList';
import { DiaryWithDraft, SaveReqParams } from '@/types/diary';
import { useUser } from '@/hooks/queries/useUser';

export const useSave = () => {
  const { api } = useAxiosWrapper();
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  return useMutation({
    mutationFn: async (params: SaveReqParams) => {
      const { diaryId, ...reqParams } = params;
      const response = await api.put<DiaryWithDraft>(
        `/diary/save/${diaryId}`,
        reqParams,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([fetchDiariesKey(user?.id)]);
    },
  });
};
