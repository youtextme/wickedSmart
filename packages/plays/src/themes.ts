export const dayThemes = [
  { dayIndex: 0, name: 'The Quiet Superpower', gradient: 'linear-gradient(135deg,#1e3a5f,#2d6a7a)' },
  { dayIndex: 1, name: 'Break It Then Build It', gradient: 'linear-gradient(135deg,#4a3728,#b8860b)' },
  { dayIndex: 2, name: 'People Radar', gradient: 'linear-gradient(135deg,#5c2d5c,#c97b84)' },
  { dayIndex: 3, name: 'Cage or Door', gradient: 'linear-gradient(135deg,#1a2332,#e07a5f)' },
  { dayIndex: 4, name: 'The 80/20 Game', gradient: 'linear-gradient(135deg,#2d6a4f,#95d5b2)' },
  { dayIndex: 5, name: 'Pressure Bridge', gradient: 'linear-gradient(135deg,#3d405b,#81b29a)' },
  { dayIndex: 6, name: 'One Honest Move', gradient: 'linear-gradient(135deg,#1e3a5f,#9b5de5)' },
] as const;

const ANCHOR = '2026-08-30';

export function dayIndexFor(dayId: string): number {
  const a = new Date(`${ANCHOR}T12:00:00Z`).getTime();
  const c = new Date(`${dayId}T12:00:00Z`).getTime();
  const diff = Math.floor((c - a) / 86_400_000);
  return ((diff % 7) + 7) % 7;
}

export function themeForDay(dayId: string) {
  const idx = dayIndexFor(dayId);
  return dayThemes[idx] ?? dayThemes[0];
}
