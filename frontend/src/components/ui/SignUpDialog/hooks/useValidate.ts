import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const step1Schema = z
  .object({
    username: z.string().min(1, 'ユーザー名は必須です'),
    email: z
      .string()
      .min(1, 'メールアドレスは必須です')
      .email('メールアドレスの形式で入力してください'),
    password: z
      .string()
      .min(1, 'パスワードは必須です')
      .min(8, 'パスワードは8文字以上です')
      .refine((val) => /[a-z]/.test(val), {
        message: '小文字を1文字以上含める必要があります',
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: '大文字を1文字以上含める必要があります',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: '数値を1文字以上含める必要があります',
      }),
    confirmPassword: z.string().min(1, 'パスワード（確認用）は必須です'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: 'custom',
        message: 'パスワードと一致しません',
      });
    }
  });

export const step2Schema = z.object({
  ageGroup: z.string().min(1, '年齢層は必須です'),
});

export const step3Schema = z.object({
  level: z.string().min(1, '英語レベルは必須です'),
});

export const useValiateForStep1 = () =>
  useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

export const useValiateForStep2 = () =>
  useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      ageGroup: '',
    },
    mode: 'onChange',
  });

export const useValiateForStep3 = () =>
  useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      level: '',
    },
    mode: 'onChange',
  });
