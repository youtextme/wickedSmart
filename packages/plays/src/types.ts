export type PlaySlot = 'body' | 'mind' | 'people';

export interface Play {
  id: string;
  dayIndex: number;
  slot: PlaySlot;
  title: string;
  tagline: string;
  doAction: string;
  steps: string[];
  openQuest: string;
  proofHint: string;
  durationMinutes: number;
  aesthetic: string;
  audioCue?: string;
  engine?: string;
}

export interface PlayView {
  id: string;
  title: string;
  tagline: string;
  doAction: string;
  steps: string[];
  openQuest: string;
  proofHint: string;
  durationMinutes: number;
  slot: PlaySlot;
  aesthetic: string;
}

export interface PlayCompleted {
  dayId: string;
  playId: string;
}

export interface PlaysPorts {
  commands: {
    complete(dayId: string, playId: string): Promise<void>;
  };
  queries: {
    forDay(dayId: string): Promise<PlayView[]>;
    isComplete(dayId: string, playId: string): Promise<boolean>;
    dayTheme(dayId: string): string;
    dayGradient(dayId: string): string;
    unlockTease(): string;
  };
  events: {
    subscribePlayCompleted(fn: (e: PlayCompleted) => void): () => void;
  };
}
