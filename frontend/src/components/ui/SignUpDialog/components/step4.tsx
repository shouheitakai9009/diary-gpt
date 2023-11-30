import { Label } from '@/components/common/Label';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Text';
import { Input } from '@/components/common/Input';
import { ImagePlus } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/common/Avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/common/AlertDialog';

interface Props {
  onBackStep: () => void;
  onRegistration: (uploadImage: File | null) => void;
}

export const Step4 = ({ onBackStep, onRegistration }: Props) => {
  const [openedAlert, setOpenedAlert] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit = () => {
    onRegistration(image);
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file && file.type.match('image.*')) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result ?? null;
        if (!(result instanceof ArrayBuffer)) {
          setPreviewImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      <Label
        htmlFor="image"
        className="h-72 w-full border-4 border-dotted border-border rounded-lg cursor-pointer flex flex-col items-center justify-center"
      >
        {previewImage !== null ? (
          <>
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={previewImage} />
            </Avatar>
            <Text className="text-gray-400 leading-5">
              変更したい場合はクリックして
              <br />
              もう一度アップロードしてください。
            </Text>
          </>
        ) : (
          <>
            <ImagePlus size={60} className="text-border mb-4" />
            <Text className="text-gray-400 leading-5">
              アイコン画像をアップロードしてください。
              <br />
              必須でないので、スキップしてもOKです。
            </Text>
          </>
        )}
      </Label>
      <Input
        type="file"
        id="image"
        className="hidden"
        onChange={onChangeImage}
      />
      <div className="mt-4 flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            previewImage === null ? onBackStep() : setOpenedAlert(true)
          }
        >
          前へ戻る
        </Button>
        <Button type="submit" onSubmit={onSubmit}>
          メンバー登録する
        </Button>
      </div>
      <AlertDialog open={openedAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に前画面に戻りますか？</AlertDialogTitle>
            <AlertDialogDescription>
              前画面へ戻るとアップロードされた画像が消えてしまいます。本当に戻ってもよろしいですか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenedAlert(false)}>
              戻らない
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpenedAlert(false);
                onBackStep();
              }}
            >
              前画面へ戻る
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};
