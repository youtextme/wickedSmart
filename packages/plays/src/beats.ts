import { tapWordsInText } from './glossary';
import type { PlayView } from './types';

export type BeatKind = 'intro' | 'scene' | 'read' | 'prompt' | 'input' | 'link' | 'do';

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
}

const DAY_OPEN =
  'Something waits at the gate. Rob walks past every morning without looking up. Today feels different — like the air knows a secret.';

export function beatsForPlay(play: PlayView, opts?: { dayOpener?: boolean }): Beat[] {
  const beats: Beat[] = [];
  let n = 0;
  const add = (b: Omit<Beat, 'id' | 'playId' | 'index'>) => {
    beats.push({ id: `${play.id}-b${n}`, playId: play.id, index: n, ...b });
    n += 1;
  };

  if (opts?.dayOpener && play.order === 0) {
    add({
      kind: 'intro',
      text: DAY_OPEN,
      tapWords: tapWordsInText(DAY_OPEN),
    });
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
    const text = `${play.title}. ${play.doAction}`;
    add({
      kind: 'scene',
      text,
      tapWords: tapWordsInText(text),
    });
  }

  return beats;
}

export function beatCount(play: PlayView, dayOpener = false): number {
  return beatsForPlay(play, { dayOpener }).length;
}
