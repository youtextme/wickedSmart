import { useMemo } from 'react';
import { lookupWord } from '@wickedsmark/plays';
import { speakPhrase } from './audio';

interface Props {
  text: string;
  tapWords?: string[];
  muted: boolean;
}

export function TapText({ text, tapWords, muted }: Props) {
  const tokens = useMemo(() => {
    const taps = new Set((tapWords ?? []).map((w) => w.toLowerCase()));
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      const bare = part.replace(/[^a-zA-Z'-]/g, '');
      const key = bare.toLowerCase();
      if (bare && (taps.has(key) || lookupWord(key))) {
        return { key: `${i}-${key}`, type: 'word' as const, word: key, raw: part };
      }
      return { key: `${i}-t`, type: 'text' as const, raw: part };
    });
  }, [text, tapWords]);

  return (
    <p className="scene-text">
      {tokens.map((t) =>
        t.type === 'word' ? (
          <button
            key={t.key}
            type="button"
            className="tap-word"
            onClick={(e) => {
              const card = lookupWord(t.word);
              if (!card) return;
              speakPhrase(`${card.word}. ${card.meaning}`, muted);
              const el = (e.currentTarget as HTMLElement).closest('.beat-screen');
              const pop = el?.querySelector('.word-pop');
              if (pop) {
                pop.textContent = `${card.meaning} — e.g. ${card.examples[0]}`;
                pop.classList.add('show');
              }
            }}
          >
            {t.raw}
          </button>
        ) : (
          <span key={t.key}>{t.raw}</span>
        ),
      )}
    </p>
  );
}
