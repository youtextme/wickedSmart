import type { PlayView } from '@wickedsmark/plays';

export type GrowthLane = 'mind' | 'body' | 'people' | 'tools' | 'school';
type PlayEngine = PlayView['engine'];

const laneLabels: Record<GrowthLane, string> = {
  mind: 'Mind',
  body: 'Body',
  people: 'People',
  tools: 'Tools',
  school: 'School',
};

const engineLane: Record<PlayEngine, GrowthLane[]> = {
  'read-stretch': ['mind', 'school'],
  'write-stretch': ['mind', 'school'],
  research: ['tools', 'mind'],
  'question-tools': ['tools', 'school'],
  presence: ['body', 'mind'],
  people: ['people'],
  agency: ['mind'],
};

const kidLearned: Record<PlayEngine, string> = {
  'read-stretch': 'Read a scene and noticed details',
  'write-stretch': 'Put thoughts into words',
  research: 'Hunted for real answers',
  'question-tools': 'Asked a sharp question and pushed back',
  presence: 'Named what was happening inside',
  people: 'Connected with someone',
  agency: 'Chose a next move on purpose',
};

const whyMatters: Record<GrowthLane, string> = {
  mind: 'Builds focus and story sense for reading and tests.',
  body: 'Helps calm under pressure — useful in sports and exams.',
  people: 'Practice for friendships, teams, and group projects.',
  tools: 'Learns to use AI and search without getting played.',
  school: 'Direct lift for reading, writing, and participation.',
};

export function lanesForPlay(play: PlayView): GrowthLane[] {
  return engineLane[play.engine] ?? ['mind'];
}

export function learnedLine(play: PlayView): string {
  return kidLearned[play.engine] ?? 'Showed up and tried something new';
}

export function laneLabel(lane: GrowthLane): string {
  return laneLabels[lane];
}

export function whyForLane(lane: GrowthLane): string {
  return whyMatters[lane];
}

export function formatMinutes(seconds: number): string {
  const m = Math.max(1, Math.round(seconds / 60));
  return m === 1 ? '1 min' : `${m} min`;
}
