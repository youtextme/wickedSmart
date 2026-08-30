export const dayThemes = [
  { dayIndex: 0, name: 'Signal Fortress', gradient: 'linear-gradient(135deg,#0f1419,#1e3a5f)' },
  { dayIndex: 1, name: 'Cipher Break', gradient: 'linear-gradient(135deg,#4a3728,#b8860b)' },
  { dayIndex: 2, name: 'People Radar', gradient: 'linear-gradient(135deg,#5c2d5c,#c97b84)' },
  { dayIndex: 3, name: 'Cage or Door', gradient: 'linear-gradient(135deg,#1a2332,#e07a5f)' },
  { dayIndex: 4, name: 'The 80/20 Game', gradient: 'linear-gradient(135deg,#2d6a4f,#95d5b2)' },
  { dayIndex: 5, name: 'Pressure Bridge', gradient: 'linear-gradient(135deg,#3d405b,#81b29a)' },
  { dayIndex: 6, name: 'Honest Move', gradient: 'linear-gradient(135deg,#1e3a5f,#9b5de5)' },
] as const;

const ANCHOR = '2026-08-30';

export function dayIndexFor(dayId: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayId)) return 0;
  const a = Date.parse(`${ANCHOR}T12:00:00.000Z`);
  const c = Date.parse(`${dayId}T12:00:00.000Z`);
  if (!Number.isFinite(a) || !Number.isFinite(c)) return 0;
  const diff = Math.floor((c - a) / 86_400_000);
  const idx = ((diff % 7) + 7) % 7;
  return Number.isFinite(idx) ? idx : 0;
}

export function themeForDay(dayId: string) {
  const idx = dayIndexFor(dayId);
  return dayThemes[idx] ?? dayThemes[0];
}
