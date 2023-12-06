import { Button } from '@/components/common/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/Form';
import { Input } from '@/components/common/Input';
import { useSignIn } from '@/hooks/mutation/auth/useSignIn';
import * as z from 'zod';
import { signInFormSchema, useValiate } from './useValidate';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/recoil/authState/atom';
import { useQueryClient } from 'react-query';
import { userKey } from '@/hooks/queries/useUser';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/common/useToast';

export const SignInDialog = () => {
  const [loading, setLoading] = useState(false);
  const form = useValiate();
  const signIn = useSignIn();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAccessToken = useSetRecoilState(authState.accessToken);
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    setLoading(true);
    try {
      const newAccessToken = await signIn.mutateAsync({
        email: values.email,
        password: values.password,
      });
      setAccessToken(newAccessToken);
      queryClient.invalidateQueries([userKey]);
      navigate('/top');
      setLoading(false);
      toast('success', 'おかえりなさい、今日の日記を作りましょう！');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" color="" variant="link">
          ログイン
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="mb-1">ログイン</DialogTitle>
          <DialogDescription>
            登録時のメールアドレス/パスワードを入力して英日記を始めましょう
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <FormLabel className="w-[150px]">メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="登録時に設定したメールアドレスを入力"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <FormLabel className="w-[150px]">パスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="登録時に設定したパスワードを入力"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {loading ? <Loader2 /> : 'ログインしてはじめる'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
