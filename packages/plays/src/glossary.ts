export interface WordCard {
  word: string;
  say: string;
  meaning: string;
  examples: [string, string];
}

/** Kid glossary — short voice lines, not dictionary dumps. */
export const glossary: Record<string, WordCard> = {
  gate: {
    word: 'gate',
    say: 'gate',
    meaning: 'A door you pass through to enter or leave a place.',
    examples: ['The school gate opens at eight.', 'He stopped at the garden gate.'],
  },
  hinges: {
    word: 'hinges',
    say: 'HIN-jiz',
    meaning: 'Metal pieces that let a door swing open and shut.',
    examples: ['The gate squeaked on its hinges.', 'Oil the hinges so it is quiet.'],
  },
  carved: {
    word: 'carved',
    say: 'carved',
    meaning: 'Cut into wood or stone to make a shape.',
    examples: ['A bird was carved into the wood.', 'She carved her initials in the desk.'],
  },
  ordinary: {
    word: 'ordinary',
    say: 'OR-din-air-ee',
    meaning: 'Normal. Nothing special at first glance.',
    examples: ['It looked like an ordinary Tuesday.', 'Ordinary days can hide surprises.'],
  },
  rust: {
    word: 'rust',
    say: 'rust',
    meaning: 'Red-brown stuff that forms on old metal in the rain.',
    examples: ['Rust spotted the old gate.', 'The bike chain had rust on it.'],
  },
  suitcase: {
    word: 'suitcase',
    say: 'SUIT-case',
    meaning: 'A box with a handle for clothes when you travel.',
    examples: ['He hid a note in his suitcase.', 'She packed one suitcase for the trip.'],
  },
  shoulders: {
    word: 'shoulders',
    say: 'SHOLE-ders',
    meaning: 'The top of your arms — they rise when you are tense.',
    examples: ['His shoulders climbed toward his ears.', 'Roll your shoulders to relax.'],
  },
  buzzing: {
    word: 'buzzing',
    say: 'BUZ-ing',
    meaning: 'A busy, noisy feeling in your head.',
    examples: ['His mind kept buzzing.', 'The room was buzzing with talk.'],
  },
  lighthouse: {
    word: 'lighthouse',
    say: 'LIGHT-house',
    meaning: 'A tower with a bright light that guides ships — or a small kindness that guides you.',
    examples: ['Her smile was a lighthouse.', 'The lighthouse blinked across the bay.'],
  },
  fortress: {
    word: 'fortress',
    say: 'FOR-tress',
    meaning: 'A strong place built to stay safe inside.',
    examples: ['The old fort was their fortress.', 'Books can feel like a fortress.'],
  },
};

const wordRe = /\b[a-z]{4,}\b/gi;

export function tapWordsInText(text: string): string[] {
  const found = new Set<string>();
  for (const m of text.matchAll(wordRe)) {
    const w = m[0].toLowerCase();
    if (glossary[w]) found.add(w);
  }
  return [...found];
}

export function lookupWord(raw: string): WordCard | undefined {
  return glossary[raw.toLowerCase()];
}
