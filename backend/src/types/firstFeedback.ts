export type FirstFeedbackResponse = Partial<{
  文法: string[];
  語彙: string[];
  文章の流れ: string[];
  修正例: string;
  日本語訳: string;
}>;

export const firstFeedbackKeys = [
  '文法',
  '語彙',
  '文章の流れ',
  '修正例',
  '日本語訳',
] as const;
