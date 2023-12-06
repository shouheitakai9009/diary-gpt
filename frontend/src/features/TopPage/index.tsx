import { Diaries } from './components/Diaries';
import { Navigation } from '@/components/ui/Navigation';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Chat } from './components/Chat';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { diaryState } from '@/recoil/diaryState/atom';
import { useFetchDiaries } from '@/hooks/queries/diary/useFetchList';

export const TopPage = () => {
  const { data: diaries } = useFetchDiaries();
  const [selectedDiary, setSelectedDiary] = useRecoilState(
    diaryState.selectedDiary,
  );

  useEffect(() => {
    if (!diaries) return;
    if (selectedDiary === null && diaries.length > 0) {
      setSelectedDiary(diaries[0]);
    }
  }, [selectedDiary, diaries]);

  return (
    <article className="h-[100vh]">
      <main className="h-full md:flex">
        <Navigation />
        <div className="h-full md:flex">
          <Diaries />
          <section className="h-full md:w-[calc(100vw-21rem)] md:min-w-[600px]">
            <Header />
            <div className="h-[calc(100vh-2.75rem)] md:flex">
              <Content />
              <Chat />
            </div>
          </section>
        </div>
      </main>
    </article>
  );
};
