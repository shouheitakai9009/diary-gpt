import { Diaries } from './components/Diaries';
import { Navigation } from '@/components/ui/Navigation';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Chat } from './components/Chat';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { diaryState } from '@/recoil/diaryState/atom';
import { useFetchDiaries } from '@/hooks/queries/diary/useFetchList';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/common/Resizable';
import { ImperativePanelHandle } from 'react-resizable-panels';
import { useChangeLayout } from './hooks/useChangeLayout';

export const TopPage = () => {
  const diariesRef = useRef<ImperativePanelHandle>(null);
  const contentRef = useRef<ImperativePanelHandle>(null);
  const chatRef = useRef<ImperativePanelHandle>(null);

  const { data: diaries } = useFetchDiaries();
  useChangeLayout({
    leftRef: diariesRef,
    midRef: contentRef,
    rightRef: chatRef,
  });

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
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={20}
            minSize={14}
            maxSize={40}
            ref={diariesRef}
            collapsible
          >
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
                <ResizablePanel
                  defaultSize={70}
                  minSize={30}
                  ref={contentRef}
                  collapsible
                >
                  <Content />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                  defaultSize={30}
                  minSize={24}
                  ref={chatRef}
                  collapsible
                >
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
