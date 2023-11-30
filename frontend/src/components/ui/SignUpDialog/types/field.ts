import { User } from '@/types/prisma';

export type UserField = Partial<
  Pick<User, 'email' | 'password' | 'username' | 'ageGroup' | 'level'>
>;
