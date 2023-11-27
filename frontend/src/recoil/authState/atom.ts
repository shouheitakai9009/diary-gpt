import { atom } from 'recoil';
import { getRecoilKeyHash } from '../../utils/getRecoilKeyHash';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const originAuthStateKey = ['accessToken'] as const;
export const authStateKey = getRecoilKeyHash(originAuthStateKey);

export const authState = {
  accessToken: atom<string | null>({
    key: authStateKey.accessToken,
    default: null,
    effects_UNSTABLE: [persistAtom],
  }),
};
