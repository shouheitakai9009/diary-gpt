export const level = {
  BEGINNER: '初心者 - 基本的な挨拶や非常に簡単な日常会話のみ理解可能',
  ELEMENTARY: '基礎 - 簡単な会話や日常的な表現に対応できるが、限定的',
  INTERMEDIATE: '中級 - 様々な状況での会話が可能だが複雑なトピックには苦労する',
  ADVANCED: '上級 - 時折ネイティブレベルの微妙なニュアンスには追いつけない',
  PROFICIENT: '達人 - あらゆる状況での会話や複雑なトピックを自然に理解できる',
} as const;

export type Level = keyof typeof level;
