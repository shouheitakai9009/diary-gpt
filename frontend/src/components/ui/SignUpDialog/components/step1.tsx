import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/Form';
import { Input } from '@/components/common/Input';
import { useValiateForStep1, step1Schema } from '../hooks/useValidate';
import { Button } from '@/components/common/Button';
import { z } from 'zod';
import { UserField } from '../types/field';
import { useEffect } from 'react';

interface Props {
  defaultValues: UserField;
  onNextStep: (values: z.infer<typeof step1Schema>) => void;
}

export const Step1 = ({ defaultValues, onNextStep }: Props) => {
  const form = useValiateForStep1();

  const onSubmit = (values: z.infer<typeof step1Schema>) => {
    onNextStep(values);
  };

  useEffect(() => {
    form.setValue('username', defaultValues.username ?? '');
    form.setValue('email', defaultValues.email ?? '');
    form.setValue('password', defaultValues.password ?? '');
    form.setValue('confirmPassword', defaultValues.password ?? '');
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2 items-center">
                <FormLabel className="w-[220px]">ユーザ名</FormLabel>
                <FormControl>
                  <Input placeholder="あだ名やニックネームを入力" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2 items-center">
                <FormLabel className="w-[220px]">メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="メールアドレスを入力"
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
                <FormLabel className="w-[220px]">パスワード</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="パスワードを入力"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2 items-center">
                <FormLabel className="w-[220px]">パスワード (確認用)</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="パスワード（確認用）を入力"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            type="submit"
            disabled={Object.keys(form.formState.errors).length > 0}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            次へ進む
          </Button>
        </div>
      </form>
    </Form>
  );
};
