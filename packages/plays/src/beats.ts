import { tapWordsInText } from './glossary';
import type { PlayView } from './types';

export type BeatKind = 'intro' | 'scene' | 'read' | 'prompt' | 'input' | 'link' | 'do' | 'choice';

export interface BeatChoice {
  id: string;
  label: string;
}

export interface Beat {
  id: string;
  playId: string;
  index: number;
  kind: BeatKind;
  text: string;
  tapWords?: string[];
  inputPlaceholder?: string;
  inputMinWords?: number;
  linkUrl?: string;
  linkLabel?: string;
  choices?: BeatChoice[];
  correctChoiceId?: string;
  revealText?: string;
}

const DAY_OPEN_PROMPT =
  'Something waits at the gate. Rob walks past every morning without looking up. What do you notice first?';

const DAY_OPEN_CHOICES: BeatChoice[] = [
  { id: 'rust', label: 'The rust on the hinges' },
  { id: 'bird', label: 'A bird carved in the wood' },
  { id: 'number', label: 'The number painted twice' },
  { id: 'truck', label: 'A truck on the highway' },
];

const DAY_OPEN_REVEAL =
  'Sistine stops you: look up. The bird is carved in the gate, worn smooth by rain. That is where today starts.';

function gateChoiceFields(): Omit<Beat, 'id' | 'playId' | 'index'> {
  return {
    kind: 'choice',
    text: DAY_OPEN_PROMPT,
    choices: DAY_OPEN_CHOICES,
    correctChoiceId: 'bird',
    revealText: DAY_OPEN_REVEAL,
  };
}

/** Reusable 4-choice gate beat — used for day opener and empty-catalog fallback. */
export function gateChoiceBeat(playId: string, index = 0): Beat {
  return {
    id: `${playId}-gate-choice`,
    playId,
    index,
    ...gateChoiceFields(),
  };
}

export function beatsForPlay(play: PlayView, opts?: { dayOpener?: boolean }): Beat[] {
  const beats: Beat[] = [];
  let n = 0;
  const add = (b: Omit<Beat, 'id' | 'playId' | 'index'>) => {
    beats.push({ id: `${play.id}-b${n}`, playId: play.id, index: n, ...b });
    n += 1;
  };

  if (opts?.dayOpener && play.order === 0) {
    add(gateChoiceFields());
  }

  switch (play.kind) {
    case 'read':
      for (const para of play.storyParagraphs ?? []) {
        add({
          kind: beats.length === 0 ? 'scene' : 'read',
          text: para,
          tapWords: tapWordsInText(para),
        });
      }
      break;

    case 'write':
      add({
        kind: 'prompt',
        text: play.writePrompt ?? 'Write what you noticed. Short is fine.',
      });
      add({
        kind: 'input',
        text: 'Put it in your own words.',
        inputPlaceholder: 'Type here — it saves automatically…',
        inputMinWords: 8,
      });
      break;

    case 'research':
      add({
        kind: 'prompt',
        text: `Wonder about this: ${play.researchSpark ?? 'something you are curious about'}`,
        tapWords: tapWordsInText(play.researchSpark ?? ''),
      });
      add({
        kind: 'input',
        text: 'Hunt for one real source. Write what you found in one or two sentences.',
        inputPlaceholder: 'What I found…',
        inputMinWords: 6,
      });
      add({
        kind: 'input',
        text: 'What do you believe now? One honest sentence.',
        inputPlaceholder: 'I believe…',
        inputMinWords: 4,
      });
      break;

    case 'question':
      add({
        kind: 'prompt',
        text: play.initiative ?? 'Ask something you actually care about.',
      });
      add({
        kind: 'input',
        text: 'Write your question.',
        inputPlaceholder: 'My question…',
        inputMinWords: 4,
      });
      if (play.toolLink) {
        add({
          kind: 'link',
          text: 'Ask a smart tool — then come back with what it said.',
          linkUrl: play.toolLink,
          linkLabel: 'Open helper',
        });
      }
      add({
        kind: 'input',
        text: 'What do YOU think? Your take wins.',
        inputPlaceholder: 'What I think…',
        inputMinWords: 6,
      });
      break;

    case 'presence':
      add({
        kind: 'do',
        text: play.presencePrompt ?? play.doAction,
      });
      add({
        kind: 'input',
        text: 'One word or one line — what did you notice?',
        inputPlaceholder: 'I noticed…',
        inputMinWords: 1,
      });
      break;

    case 'people':
      add({
        kind: 'do',
        text: play.peoplePrompt ?? play.doAction,
      });
      add({
        kind: 'input',
        text: 'What did they say? One sentence.',
        inputPlaceholder: 'They said…',
        inputMinWords: 4,
      });
      break;

    case 'agency':
      add({
        kind: 'do',
        text: play.agencyPrompt ?? play.doAction,
      });
      add({
        kind: 'input',
        text: 'What is your smallest next move?',
        inputPlaceholder: 'Next I will…',
        inputMinWords: 4,
      });
      break;
  }

  if (beats.length === 0) {
    add(gateChoiceFields());
  }

  return beats;
}

export function beatCount(play: PlayView, dayOpener = false): number {
  return beatsForPlay(play, { dayOpener }).length;
}
