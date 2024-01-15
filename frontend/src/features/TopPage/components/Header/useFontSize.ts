import { settingState } from '@/recoil/settingState/atom';
import { useRecoilState } from 'recoil';

export const useFontSize = () => {
  const [fontSize, setFontSize] = useRecoilState(settingState.fontSize);

  const changeLargeSize = async () => {
    if (fontSize === 'largest') return;
    switch (fontSize) {
      case 'tiny':
        setFontSize('small');
        break;
      case 'small':
        setFontSize('medium');
        break;
      case 'medium':
        setFontSize('large');
        break;
      case 'large':
        setFontSize('largest');
        break;
    }
  };

  const changeSmallSize = async () => {
    if (fontSize === 'tiny') return;
    switch (fontSize) {
      case 'small':
        setFontSize('tiny');
        break;
      case 'medium':
        setFontSize('small');
        break;
      case 'large':
        setFontSize('medium');
        break;
      case 'largest':
        setFontSize('large');
        break;
    }
  };

  const onClickForLargeSize = async () => {
    changeLargeSize();
  };

  const onClickForSmallSize = async () => {
    changeSmallSize();
  };

  return {
    onClickForLargeSize,
    onClickForSmallSize,
  };
};
