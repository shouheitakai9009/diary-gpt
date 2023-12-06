import { atom } from 'recoil';
import { getRecoilKeyHash } from '../../utils/getRecoilKeyHash';
import { recoilPersist } from 'recoil-persist';
import { DiaryWithDraft } from '@/types/diary';

const { persistAtom } = recoilPersist();

const originDiaryStateKey = ['selectedDiary'] as const;
export const diaryStateKey = getRecoilKeyHash(originDiaryStateKey);

export const diaryState = {
  selectedDiary: atom<DiaryWithDraft | null>({
    key: diaryStateKey.selectedDiary,
    default: null,
    effects_UNSTABLE: [persistAtom],
  }),
};
