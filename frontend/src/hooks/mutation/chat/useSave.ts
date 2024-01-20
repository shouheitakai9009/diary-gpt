import { useMutation, useQueryClient } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { fetchDiariesKey } from '@/hooks/queries/diary/useFetchList';
import { SaveReqParams } from '@/types/diary';

export const useFirstFeedback = () => {
  const { api } = useAxiosWrapper();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SaveReqParams) => {
      const { diaryId, ...reqParams } = params;
      const response = await api.put(
        `/chat/first-feedback/${diaryId}`,
        reqParams,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([fetchDiariesKey]);
    },
  });
};
