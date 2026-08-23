import type { ChildProfile } from '../types';

export const children: ChildProfile[] = [
  {
    id: 'ayaan',
    name: 'Ayaan',
    age: 10,
    grade: '4th',
    teacher: 'Ms. Luz',
    mode: 'practice',
    mentorText: 'The Tiger Rising by Kate DiCamillo',
    tagline: 'Reader. Writer. Builder of courage.',
    greeting: 'You notice what others miss. That is power.',
  },
  {
    id: 'younger-sibling',
    name: 'Little Explorer',
    age: 3,
    mode: 'play',
    tagline: 'Play. Breathe. Grow strong.',
    greeting: 'Ready to play a power move?',
  },
];

export function getChild(id: string): ChildProfile | undefined {
  return children.find((c) => c.id === id);
}
