export type PlayEngine =
  | 'read-stretch'
  | 'write-stretch'
  | 'research'
  | 'question-tools'
  | 'presence'
  | 'people'
  | 'agency';

export type PlayKind = 'read' | 'write' | 'research' | 'question' | 'presence' | 'people' | 'agency';

export interface Play {
  id: string;
  dayIndex: number;
  order: number;
  engine: PlayEngine;
  kind: PlayKind;
  title: string;
  tagline: string;
  roomName: string;
  skill: string;
  doAction: string;
  proofHint: string;
  durationMinutes: number;
  storyParagraphs?: string[];
  writePrompt?: string;
  writeWordGoal?: number;
  researchSpark?: string;
  initiative?: string;
  toolLink?: string;
  peoplePrompt?: string;
  agencyPrompt?: string;
  presencePrompt?: string;
}

export interface PlayView extends Play {}

export interface PlayCompleted {
  dayId: string;
  playId: string;
}

export interface SessionState {
  lastRoute: string;
  lastPlayId: string | null;
  lastStep: number;
}

export interface PlaysPorts {
  commands: {
    complete(dayId: string, playId: string): Promise<void>;
    saveSession(dayId: string, session: SessionState): Promise<void>;
    saveDraft(dayId: string, playId: string, field: string, value: string): Promise<void>;
  };
  queries: {
    forDay(dayId: string): Promise<PlayView[]>;
    getPlay(playId: string): PlayView | undefined;
    isComplete(dayId: string, playId: string): Promise<boolean>;
    getSession(dayId: string): Promise<SessionState | null>;
    getDraft(dayId: string, playId: string, field: string): Promise<string>;
    dayTheme(dayId: string): string;
    dayGradient(dayId: string): string;
    unlockTease(): string;
    completedIds(dayId: string): Promise<string[]>;
    isRoomUnlocked(dayId: string, playId: string): Promise<boolean>;
  };
  events: {
    subscribePlayCompleted(fn: (e: PlayCompleted) => void): () => void;
  };
}
