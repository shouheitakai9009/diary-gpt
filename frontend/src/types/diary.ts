import { Diary, DiaryDraft } from './prisma';

export type DiaryWithDraft = Diary & { drafts: DiaryDraft[] };
