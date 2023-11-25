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
import { ACCESS_TOKEN } from '@/constants/auth';
import { useSignIn } from '@/hooks/mutation/auth/useSignIn';
import * as z from 'zod';
import { signInFormSchema, useValiate } from './useValidate';

export const SignInDialog = () => {
  const form = useValiate();
  const signIn = useSignIn();

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    const accessToken = await signIn.mutateAsync({
      email: values.email,
      password: values.password,
    });
    window.localStorage.setItem(ACCESS_TOKEN, accessToken);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" color="" variant="link">
          ログイン
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
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
                    <FormLabel className="w-[130px]">メールアドレス</FormLabel>
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
                    <FormLabel className="w-[130px]">パスワード</FormLabel>
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
              <Button type="submit" onSubmit={form.handleSubmit(onSubmit)}>
                ログインしてはじめる
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
