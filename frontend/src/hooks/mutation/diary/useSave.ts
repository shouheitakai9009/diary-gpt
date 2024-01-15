import { useMutation, useQueryClient } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { fetchDiariesKey } from '@/hooks/queries/diary/useFetchList';
import { DiaryWithDraft, SaveReqParams } from '@/types/diary';

export const useSave = () => {
  const { api } = useAxiosWrapper();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries([fetchDiariesKey]);
    },
  });
};
