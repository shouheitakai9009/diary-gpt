import { atom } from 'recoil';
import { getRecoilKeyHash } from '../../utils/getRecoilKeyHash';
import { recoilPersist } from 'recoil-persist';
import { FontSize } from '@/types/fontSize';
import { Layout } from '@/types/layout';

const { persistAtom } = recoilPersist();

const originsettingStateKey = ['fontSize', 'layout'] as const;
export const settingStateKey = getRecoilKeyHash(originsettingStateKey);

export const settingState = {
  fontSize: atom<FontSize>({
    key: settingStateKey.fontSize,
    default: 'medium',
    effects_UNSTABLE: [persistAtom],
  }),
  layout: atom<Layout>({
    key: settingStateKey.layout,
    default: 'default',
    effects_UNSTABLE: [persistAtom],
  }),
};
