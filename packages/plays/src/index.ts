import { getPlay, getPlaysForDay } from './catalog';
import { isComplete, markComplete } from './store';
import { dayIndexFor, themeForDay } from './themes';
import type { PlayCompleted, PlayView, PlaysPorts } from './types';

function toView(p: NonNullable<ReturnType<typeof getPlay>>): PlayView {
  return {
    id: p.id,
    title: p.title,
    tagline: p.tagline,
    doAction: p.doAction,
    steps: p.steps,
    openQuest: p.openQuest,
    proofHint: p.proofHint,
    durationMinutes: p.durationMinutes,
    slot: p.slot,
    aesthetic: p.aesthetic,
  };
}

export function createPlays(): PlaysPorts {
  const listeners = new Set<(e: PlayCompleted) => void>();

  return {
    commands: {
      async complete(dayId, playId) {
        await markComplete(dayId, playId);
        listeners.forEach((fn) => fn({ dayId, playId }));
      },
    },
    queries: {
      async forDay(dayId) {
        return getPlaysForDay(dayIndexFor(dayId)).map(toView);
      },
      isComplete,
      dayTheme(dayId) {
        return themeForDay(dayId).name;
      },
      dayGradient(dayId) {
        return themeForDay(dayId).gradient;
      },
      unlockTease() {
        return "Tomorrow's trio unlocks at 3:00 AM Seoul";
      },
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
  version: '0.1.0',
  commands: ['complete'],
  queries: ['forDay', 'isComplete', 'dayTheme'],
  events: ['PlayCompleted'],
} as const;

export function health(): { ok: boolean } {
  return { ok: getPlaysForDay(0).length === 3 };
}

export type { PlayCompleted, PlayView, PlaysPorts } from './types';
export { PlaysScreen } from './ui/PlaysScreen';
export { PlayDetail } from './ui/PlayDetail';
