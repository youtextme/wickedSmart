import { useState } from 'react';
import type { Beat } from '@wickedsmark/plays';
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
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const minWords = beat.inputMinWords ?? 0;
  const inputOk = beat.kind !== 'input' || words >= minWords;

  return (
    <div className="beat-screen">
      <div className="beat-scene">
        {(beat.kind === 'intro' || beat.kind === 'scene' || beat.kind === 'read' || beat.kind === 'prompt' || beat.kind === 'do') && (
          <TapText text={beat.text} tapWords={beat.tapWords} muted={muted} />
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

      <button
        type="button"
        className="go-btn beat-next"
        disabled={nextDisabled || !inputOk}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
