import { Button } from '@/components/common/Button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/common/Menubar';
import { useToast } from '@/hooks/common/useToast';
import { useCreate } from '@/hooks/mutation/diary/useCreate';
import { diaryState } from '@/recoil/diaryState/atom';
import { FilePlus } from 'lucide-react';
import { useSetRecoilState } from 'recoil';

export const Header = () => {
  const { toast } = useToast();
  const createDiaryMutation = useCreate();
  const setSelectedDiary = useSetRecoilState(diaryState.selectedDiary);

  const onClickCreateDiary = async () => {
    const response = await createDiaryMutation.mutateAsync();
    if (response) {
      setSelectedDiary(response);
      toast('success', '新しい日記を作成しました、英語力を鍛えましょう💪');
    }
  };

  return (
    <div className="flex w-full h-11 items-center justify-between px-2 border-b">
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onClickCreateDiary}
      >
        <FilePlus size={22} className="mr-2" />
        日記を作る
      </Button>
      <img src="/images/icon.png" className="w-7 h-7" />
      <Menubar className="border-0">
        <MenubarMenu>
          <MenubarTrigger>日記設定</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              フォントを拡大
              <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>フォントを縮小</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>テンプレート</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>買い物</MenubarItem>
            <MenubarItem>旅行</MenubarItem>
            <MenubarItem>趣味</MenubarItem>
            <MenubarItem>仕事</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>AI設定</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>下書き保存</MenubarItem>
            <MenubarItem>保存</MenubarItem>
            <MenubarItem>保存してフィードバック</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>保存</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>下書き保存</MenubarItem>
            <MenubarItem>保存</MenubarItem>
            <MenubarItem>保存してフィードバック</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
