import { useMutation, useQueryClient } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';
import { SaveReqParams } from '@/types/diary';
import { useSetRecoilState } from 'recoil';
import { chatState } from '@/recoil/chatState/atom';
import { fetchChatsKey } from '@/hooks/queries/chat/useFetch';
import { DiaryFeedback } from '@/types/prisma';

export const useFeedback = () => {
  const queryClient = useQueryClient();
  const { api } = useAxiosWrapper();
  const setIsLoading = useSetRecoilState(chatState.isLoadingOfFirstFeedback);

  return useMutation<DiaryFeedback[], unknown, SaveReqParams>({
    mutationFn: async (params: SaveReqParams) => {
      const { diaryId, ...reqParams } = params;
      const response = await api.post<DiaryFeedback[]>(
        `/chat/feedback/${diaryId}`,
        reqParams,
      );
      return response.data;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries([fetchChatsKey(variables.diaryId)]);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });
};
