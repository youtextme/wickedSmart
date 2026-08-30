export type DayId = string;

/**
 * kid-day = Seoul calendar date of (instant − 3h).
 * Intl.DateTimeFormat only — no +9 hack, no cron, no plays import.
 */
export function today(now = new Date()): DayId {
  const shifted = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(shifted);
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? '01';
  return `${g('year')}-${g('month')}-${g('day')}`;
}

export interface ClockPorts {
  queries: { today: () => DayId };
}

export function createClock(): ClockPorts {
  return { queries: { today: () => today() } };
}

export const schema = {
  name: 'clock',
  version: '0.1.0',
  queries: ['today'],
  returns: { today: 'DayId (YYYY-MM-DD)' },
} as const;

export function health(): { ok: boolean } {
  return { ok: /^\d{4}-\d{2}-\d{2}$/.test(today()) };
}
