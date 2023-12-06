import { Input } from '@/components/common/Input';
import { useFetchDiaries } from '@/hooks/queries/diary/useFetchList';
import { Suspense } from 'react';
import { DiaryItem } from './diaryItem';
import { useSetRecoilState } from 'recoil';
import { diaryState } from '@/recoil/diaryState/atom';
import { DiaryWithDraft } from '@/types/diary';

export const Diaries = () => {
  const { data: diaries } = useFetchDiaries();
  const setSelectedDiary = useSetRecoilState(diaryState.selectedDiary);

  const handleClick = (diary: DiaryWithDraft) => {
    setSelectedDiary(diary);
  };

  return (
    <section className="w-64 h-full overflow-y-scroll border-r block max-md:hidden">
      <Input className="mx-auto w-60 mt-4" placeholder="単語やタイトルで検索" />
      <div className="px-2 py-4">
        <Suspense fallback={<div>loading...</div>}>
          {diaries?.map((diary) => (
            <DiaryItem key={diary.id} diary={diary} onClick={handleClick} />
          ))}
        </Suspense>
      </div>
    </section>
  );
};
