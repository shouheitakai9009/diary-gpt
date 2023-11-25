import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('メールアドレスの形式で入力してください'),
  password: z.string().min(1, 'パスワードは必須です'),
});

export const useValiate = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return form;
};
