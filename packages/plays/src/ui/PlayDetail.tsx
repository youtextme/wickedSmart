import { useState } from 'react';
import type { PlayView, PlaysPorts } from '../types';

interface Props {
  ports: PlaysPorts;
  dayId: string;
  play: PlayView;
  onDone: () => void;
  onBack: () => void;
}

export function PlayDetail({ ports, dayId, play, onDone, onBack }: Props) {
  const [finishing, setFinishing] = useState(false);

  async function handleFinish() {
    setFinishing(true);
    await ports.commands.complete(dayId, play.id);
    onDone();
  }

  return (
    <div className="play-detail">
      <button type="button" className="back" onClick={onBack}>
        ← Back
      </button>
      <span className="slot">{play.slot}</span>
      <h1>{play.title}</h1>
      <p className="tagline">{play.tagline}</p>
      <p className="do">{play.doAction}</p>
      <ol>
        {play.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p className="open-quest">
        <strong>Open quest:</strong> {play.openQuest}
      </p>
      <button
        type="button"
        className="btn-primary"
        disabled={finishing}
        onClick={() => void handleFinish()}
      >
        I did it — add proof
      </button>
    </div>
  );
}

export { PlayDetail as PlayDetailScreen };
