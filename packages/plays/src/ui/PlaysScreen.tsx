import { useCallback, useEffect, useState } from 'react';
import type { PlayView, PlaysPorts } from '../types';

interface Props {
  ports: PlaysPorts;
  dayId: string;
  onSelectPlay: (play: PlayView) => void;
}

export function PlaysScreen({ ports, dayId, onSelectPlay }: Props) {
  const [plays, setPlays] = useState<PlayView[]>([]);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    const list = await ports.queries.forDay(dayId);
    setPlays(list);
    const flags: Record<string, boolean> = {};
    for (const p of list) {
      flags[p.id] = await ports.queries.isComplete(dayId, p.id);
    }
    setDone(flags);
  }, [ports, dayId]);

  useEffect(() => {
    void load();
  }, [load]);

  const theme = ports.queries.dayTheme(dayId);
  const gradient = ports.queries.dayGradient(dayId);

  return (
    <div className="plays-screen">
      <header className="plays-hero" style={{ background: gradient }}>
        <p className="eyebrow">wickedSmart</p>
        <h1>Today&apos;s 3 plays</h1>
        <p className="thread">{theme}</p>
      </header>
      <p className="tease">{ports.queries.unlockTease()}</p>
      <div className="play-grid">
        {plays.map((play) => (
          <button
            key={play.id}
            type="button"
            className={`play-card ${done[play.id] ? 'done' : ''}`}
            onClick={() => onSelectPlay(play)}
          >
            <span className="slot">{play.slot}</span>
            <h2>{play.title}</h2>
            <p>{play.tagline}</p>
            <span className="mins">{play.durationMinutes} min</span>
            {done[play.id] && <span className="badge">Played</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
