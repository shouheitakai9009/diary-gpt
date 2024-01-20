import { settingState } from '@/recoil/settingState/atom';
import { useEffect } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';
import { useRecoilValue } from 'recoil';

type UseChangeLayout = {
  leftRef: React.RefObject<ImperativePanelHandle>;
  midRef: React.RefObject<ImperativePanelHandle>;
  rightRef: React.RefObject<ImperativePanelHandle>;
};

export const useChangeLayout = ({
  leftRef,
  midRef,
  rightRef,
}: UseChangeLayout) => {
  const layout = useRecoilValue(settingState.layout);

  useEffect(() => {
    switch (layout) {
      case 'default':
        leftRef.current?.resize(20);
        midRef.current?.resize(70);
        break;
      case 'write':
        leftRef.current?.collapse();
        rightRef.current?.collapse();
        break;
      case 'chat':
        leftRef.current?.collapse();
        midRef.current?.resize(50);
        rightRef.current?.resize(50);
        break;
    }
  }, [layout]);
};
