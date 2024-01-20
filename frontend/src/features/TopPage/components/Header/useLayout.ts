import { settingState } from '@/recoil/settingState/atom';
import { Layout } from '@/types/layout';
import { useSetRecoilState } from 'recoil';

export const useLayout = () => {
  const setLayout = useSetRecoilState(settingState.layout);

  const onChangeLayout = (layout: Layout) => setLayout(layout);

  return {
    onChangeLayout,
  };
};
