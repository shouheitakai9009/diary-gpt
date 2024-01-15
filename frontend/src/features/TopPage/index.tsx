import { Diaries } from './components/Diaries';
import { Navigation } from '@/components/ui/Navigation';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Chat } from './components/Chat';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { diaryState } from '@/recoil/diaryState/atom';
import { useFetchDiaries } from '@/hooks/queries/diary/useFetchList';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/common/Resizable';

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
        <ResizablePanelGroup direction="horizontal" className="">
          <ResizablePanel defaultSize={20}>
            <Diaries />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <>
              <Header />
              <ResizablePanelGroup
                direction="horizontal"
                className="!h-[calc(100%-2.75rem)]"
              >
                <ResizablePanel defaultSize={70}>
                  <Content />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                  <Chat />
                </ResizablePanel>
              </ResizablePanelGroup>
            </>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </article>
  );
};
