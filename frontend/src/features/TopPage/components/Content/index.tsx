import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { diaryState } from '@/recoil/diaryState/atom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const Content = () => {
  const selectedDiary = useRecoilValue(diaryState.selectedDiary);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedDiary === null) return;

    setTitle(selectedDiary.drafts[0].title);
    setContent(selectedDiary.drafts[0].content);
  }, [selectedDiary]);

  return (
    <section className="h-full md:min-w-[500px] md:w-2/3">
      <Input
        placeholder="日記のタイトルを入力"
        className="h-14 border-0 text-xl font-bold !ring-0 !ring-offset-0"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="日記の本文を入力"
        className="h-[calc(100%-3.5rem)] border-0 !ring-0 !ring-offset-0"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </section>
  );
};
