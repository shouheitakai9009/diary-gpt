export type FirstFeedbackResponse = Partial<{
  positive: string[];
  negative: string[];
  suggestions: string[];
}>;

export const firstFeedbackKeys = [
  'positive',
  'negative',
  'suggestions',
] as const;
