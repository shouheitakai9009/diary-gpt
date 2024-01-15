import { Diary, DiaryDraft } from './prisma';

export type DiaryWithDraft = Diary & { drafts: DiaryDraft[] };
export type SaveReqParams = { diaryId: number; title: string; content: string };
