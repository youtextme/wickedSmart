import { useEffect, useState } from 'react';
import type { Beat, BeatChoice } from '@wickedsmark/plays';
import { speakPhrase } from './audio';
import { TapText } from './TapText';

interface Props {
  beat: Beat;
  draft: string;
  onDraftChange: (v: string) => void;
  onNext: () => void;
  muted: boolean;
  nextDisabled?: boolean;
}

export function BeatScreen({ beat, draft, onDraftChange, onNext, muted, nextDisabled }: Props) {
  const [linkOpened, setLinkOpened] = useState(false);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    setPickedId(null);
    setShowReveal(false);
  }, [beat.id]);

  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const minWords = beat.inputMinWords ?? 0;
  const inputOk = beat.kind !== 'input' || words >= minWords;
  const isChoice = beat.kind === 'choice';
  const canNext = !isChoice || pickedId !== null;

  function handleChoice(choice: BeatChoice) {
    if (pickedId) return;
    setPickedId(choice.id);
    speakPhrase(choice.label, muted);
    const wrong = beat.correctChoiceId != null && choice.id !== beat.correctChoiceId;
    if (wrong && beat.revealText) {
      setShowReveal(true);
      window.setTimeout(() => speakPhrase(beat.revealText!, muted), muted ? 0 : 700);
    }
  }

  return (
    <div className="beat-screen">
      <div className="beat-scene">
        {(beat.kind === 'intro' || beat.kind === 'scene' || beat.kind === 'read' || beat.kind === 'prompt' || beat.kind === 'do') && (
          <TapText text={beat.text} tapWords={beat.tapWords} muted={muted} />
        )}

        {isChoice && (
          <>
            <p className="scene-text">{beat.text}</p>
            <div className="beat-choices" role="group" aria-label="Pick one">
              {(beat.choices ?? []).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`beat-choice${pickedId === c.id ? ' picked' : ''}`}
                  disabled={pickedId !== null && pickedId !== c.id}
                  onClick={() => handleChoice(c)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            {showReveal && beat.revealText && (
              <p className="beat-reveal" aria-live="polite">
                {beat.revealText}
              </p>
            )}
          </>
        )}

        {beat.kind === 'input' && (
          <>
            <p className="scene-text">{beat.text}</p>
            <textarea
              className="kid-input"
              rows={4}
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              placeholder={beat.inputPlaceholder}
            />
          </>
        )}

        {beat.kind === 'link' && (
          <>
            <p className="scene-text">{beat.text}</p>
            <a
              className="helper-link"
              href={beat.linkUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setLinkOpened(true)}
            >
              {beat.linkLabel ?? 'Open'}
            </a>
            {linkOpened && <p className="link-hint">Come back when you are ready.</p>}
          </>
        )}

        <div className="word-pop" aria-live="polite" />
      </div>

      {canNext && (
        <button
          type="button"
          className="go-btn beat-next"
          disabled={nextDisabled || !inputOk}
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
}
