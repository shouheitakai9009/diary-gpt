import { useToast } from '@/hooks/common/useToast';
import { useFeedback } from '@/hooks/mutation/chat/useFeedback';
import { useCreate } from '@/hooks/mutation/diary/useCreate';
import { useSave as useSaveMutation } from '@/hooks/mutation/diary/useSave';
import { useSaveDraft } from '@/hooks/mutation/diary/useSaveDraft';
import { diaryState } from '@/recoil/diaryState/atom';
import { DiaryWithDraft, SaveReqParams } from '@/types/diary';
import { useRecoilState } from 'recoil';

export const useSave = () => {
  const { toast } = useToast();
  const createDiaryMutation = useCreate();
  const saveMutation = useSaveMutation();
  const saveDraftMutation = useSaveDraft();
  const firstFeedbackMutation = useFeedback();
  const [selectedDiary, setSelectedDiary] = useRecoilState(
    diaryState.selectedDiary,
  );

  const onClickCreateDiary = async () => {
    const response = await createDiaryMutation.mutateAsync();
    if (response) {
      setSelectedDiary(response);
      toast('success', '新しい日記を作成しました、英語力を鍛えましょう💪');
    }
  };

  const onClickSaveDraft = async () => {
    validateAndSave('draft');
  };

  const onClickSave = async () => {
    validateAndSave('save');
  };

  const onClickFirstFeedback = async () => {
    await validateAndSave('save');
    if (!selectedDiary) return;

    await firstFeedbackMutation.mutateAsync({
      diaryId: selectedDiary.id,
      title: selectedDiary.drafts[0].title,
      content: selectedDiary.drafts[0].content,
    });
  };

  const validateAndSave = async (type: 'draft' | 'save') => {
    if (
      selectedDiary &&
      selectedDiary.drafts.length > 0 &&
      selectedDiary.drafts[0].title !== '' &&
      selectedDiary.drafts[0].content !== ''
    ) {
      const params: SaveReqParams = {
        diaryId: selectedDiary.id,
        title: selectedDiary.drafts[0].title,
        content: selectedDiary.drafts[0].content,
      };
      let response: DiaryWithDraft | undefined;
      if (type === 'draft')
        response = await saveDraftMutation.mutateAsync(params);
      else if (type === 'save')
        response = await saveMutation.mutateAsync(params);

      if (response) {
        switch (type) {
          case 'draft':
            toast(
              'success',
              '下書きを保存しました、間違って消しても安心ですね！',
            );
            break;
          case 'save':
            toast('success', '日記を保存しました、お疲れ様でした！');
            break;
        }
      }
      return;
    }
    toast('error', 'タイトルと本文は必須です！');
  };

  return {
    onClickFirstFeedback,
    onClickCreateDiary,
    onClickSaveDraft,
    onClickSave,
  };
};
