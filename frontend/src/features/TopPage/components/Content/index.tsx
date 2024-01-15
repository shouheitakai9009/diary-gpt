import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { diaryState } from '@/recoil/diaryState/atom';
import { settingState } from '@/recoil/settingState/atom';
import { cn } from '@/utils/classnames';
import { useRecoilState, useRecoilValue } from 'recoil';

export const Content = () => {
  const [selectedDiary, setSelectedDiary] = useRecoilState(
    diaryState.selectedDiary,
  );

  const fontSize = useRecoilValue(settingState.fontSize);

  if (selectedDiary === null) return null;

  return (
    <section className="h-full">
      <Input
        placeholder="日記のタイトルを入力"
        className={cn(
          'h-14 border-0 font-bold !ring-0 !ring-offset-0',
          fontSize === 'tiny' && 'text-sm',
          fontSize === 'small' && 'text-base',
          fontSize === 'medium' && 'text-xl',
          fontSize === 'large' && 'text-2xl',
          fontSize === 'largest' && 'text-4xl',
        )}
        value={selectedDiary?.drafts[0].title ?? ''}
        onChange={(e) =>
          setSelectedDiary({
            ...selectedDiary,
            drafts: [
              {
                ...selectedDiary.drafts[0],
                title: e.target.value,
              },
            ],
          })
        }
      />
      <Textarea
        placeholder="日記の本文を入力"
        className={cn(
          'h-[calc(100%-3.5rem)] border-0 !ring-0 !ring-offset-0',
          fontSize === 'tiny' && 'text-xs',
          fontSize === 'small' && 'text-sm',
          fontSize === 'medium' && 'text-base',
          fontSize === 'large' && 'text-lg',
          fontSize === 'largest' && 'text-3xl',
        )}
        value={selectedDiary?.drafts[0].content ?? ''}
        onChange={(e) =>
          setSelectedDiary({
            ...selectedDiary,
            drafts: [
              {
                ...selectedDiary.drafts[0],
                content: e.target.value,
              },
            ],
          })
        }
      />
    </section>
  );
};
