import { getPlay, getPlaysForDay } from './catalog';
import {
  getCompletionsForDay,
  getDraft,
  getSession,
  isComplete,
  markComplete,
  saveDraft,
  saveSession,
} from './store';
import { dayIndexFor, themeForDay } from './themes';
import type { PlayCompleted, PlayView, PlaysPorts } from './types';

function toView(p: NonNullable<ReturnType<typeof getPlay>>): PlayView {
  return { ...p };
}

export function createPlays(): PlaysPorts {
  const listeners = new Set<(e: PlayCompleted) => void>();

  async function isRoomUnlocked(dayId: string, playId: string): Promise<boolean> {
    const dayPlays = getPlaysForDay(dayIndexFor(dayId));
    const play = dayPlays.find((p) => p.id === playId);
    if (!play) return false;
    if (play.order === 0) return true;
    const prev = dayPlays.find((p) => p.order === play.order - 1);
    if (!prev) return true;
    return isComplete(dayId, prev.id);
  }

  return {
    commands: {
      complete: async (dayId, playId) => {
        await markComplete(dayId, playId);
        listeners.forEach((fn) => fn({ dayId, playId }));
      },
      saveSession: async (dayId, session) => {
        await saveSession(dayId, session);
      },
      saveDraft: async (dayId, playId, field, value) => {
        await saveDraft(dayId, playId, field, value);
      },
    },
    queries: {
      forDay: async (dayId) => getPlaysForDay(dayIndexFor(dayId)).map(toView),
      playsForDay: (dayId) => getPlaysForDay(dayIndexFor(dayId)).map(toView),
      getPlay: (playId) => {
        const p = getPlay(playId);
        return p ? toView(p) : undefined;
      },
      isComplete,
      getSession: async (dayId) => {
        const s = await getSession(dayId);
        if (!s) return null;
        return {
          lastRoute: s.lastRoute,
          lastPlayId: s.lastPlayId,
          lastStep: s.lastStep,
        };
      },
      getDraft,
      dayTheme: (dayId) => themeForDay(dayId).name,
      dayGradient: (dayId) => themeForDay(dayId).gradient,
      unlockTease: () => "Tomorrow's rooms unlock at 3:00 AM Seoul",
      completedIds: getCompletionsForDay,
      isRoomUnlocked,
    },
    events: {
      subscribePlayCompleted(fn) {
        listeners.add(fn);
        return () => listeners.delete(fn);
      },
    },
  };
}

export const schema = {
  name: 'plays',
  version: '0.2.0',
  commands: ['complete', 'saveSession', 'saveDraft'],
  queries: ['forDay', 'isComplete', 'getSession', 'isRoomUnlocked'],
  events: ['PlayCompleted'],
} as const;

export function health(): { ok: boolean } {
  const day0 = getPlaysForDay(0);
  return { ok: day0.length >= 6 };
}

export type { PlayCompleted, PlayView, PlaysPorts, SessionState } from './types';
export { QuestMap } from './ui/QuestMap';
export { PlayRunner } from './ui/PlayRunner';
