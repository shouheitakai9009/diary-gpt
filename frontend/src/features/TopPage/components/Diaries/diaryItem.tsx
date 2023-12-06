import { Badge } from '@/components/common/Badge';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Separator } from '@/components/common/Separator';
import { FetchDiariesResponse } from '@/hooks/queries/diary/useFetchList';
import { cn } from '@/utils/classnames';
import dayjs from 'dayjs';
import { DiaryWithDraft } from '@/types/diary';
import { useRecoilValue } from 'recoil';
import { diaryState } from '@/recoil/diaryState/atom';

interface Props {
  diary: FetchDiariesResponse[0];
  onClick: (diary: DiaryWithDraft) => void;
}

export const DiaryItem = ({ diary, onClick }: Props) => {
  const selectedDiary = useRecoilValue(diaryState.selectedDiary);

  const isSelected = selectedDiary?.id === diary.id;

  if (diary.drafts.length === 0) return null;
  return (
    <>
      <button
        type="button"
        className={cn(
          isSelected && 'bg-border',
          'w-full px-4 py-4 rounded-lg hover:bg-border duration-75 flex flex-col',
        )}
        aria-label={diary.drafts[0].title}
        onClick={() => onClick(diary)}
      >
        <Heading
          as="h4"
          className="leading-tight tracking-normal font-bold mb-2"
        >
          {diary.drafts[0].title}
        </Heading>
        <Text className="text-gray-600 text-xs tracking-wider">
          {dayjs(diary.createdAt).format('YYYY年MM月DD日')}
        </Text>
        <div>
          {diary.status === 'DRAFT' && (
            <Badge variant="secondary">下書き</Badge>
          )}
        </div>
      </button>
      <Separator />
    </>
  );
};
