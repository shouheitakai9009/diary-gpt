export const ageGroup = {
  U20: '19歳まで',
  U30: '20歳から29歳',
  U40: '30歳から39歳',
  U50: '40歳から49歳',
  U60: '50歳から59歳',
  U70: '60歳から69歳',
  U80: '70歳から79歳',
  U90: '80歳から89歳',
} as const;

export type AgeGroup = keyof typeof ageGroup;
