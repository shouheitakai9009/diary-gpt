import { atom } from 'recoil';
import { getRecoilKeyHash } from '../../utils/getRecoilKeyHash';

// const { persistAtom } = recoilPersist();

const originChatStateKey = ['isLoadingOfFirstFeedback'] as const;
export const chatStateKey = getRecoilKeyHash(originChatStateKey);

export const chatState = {
  isLoadingOfFirstFeedback: atom<boolean>({
    key: chatStateKey.isLoadingOfFirstFeedback,
    default: false,
  }),
};
