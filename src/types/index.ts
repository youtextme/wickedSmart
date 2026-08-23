export type ChildMode = 'practice' | 'play';

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  grade?: string;
  teacher?: string;
  mode: ChildMode;
  mentorText?: string;
  tagline: string;
  greeting: string;
}

export type MissionCategory =
  | 'feelings'
  | 'courage'
  | 'friendship'
  | 'writing'
  | 'reflection'
  | 'play';

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  doAction: string;
  steps: string[];
  reflectionPrompts: string[];
  durationMinutes: number;
  category: MissionCategory;
  childIds: string[];
  writingType?: 'narrative' | 'opinion' | 'informational';
  bookConnection?: string;
}

export interface MissionCompletion {
  missionId: string;
  childId: string;
  completedAt: string;
}

export interface MissionFeedback {
  id: string;
  missionId: string;
  childId: string;
  createdAt: string;
  howItFelt: number;
  whatWasHard: string;
  whatWasFun: string;
  freeText: string;
  moreLikeThis: boolean;
  lessLikeThis: boolean;
  source: 'mission' | 'general';
}

export interface AppState {
  activeChildId: string;
  completions: MissionCompletion[];
  feedback: MissionFeedback[];
  lastPracticeDate: string | null;
  practiceStreak: number;
  totalPowerPractices: number;
}

export type FeelingLevel = 1 | 2 | 3 | 4 | 5;
