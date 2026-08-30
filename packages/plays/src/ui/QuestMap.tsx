import { useCallback, useEffect, useState } from 'react';
import { engineLabel } from '../catalog';
import type { PlayView, PlaysPorts } from '../types';

interface Props {
  ports: PlaysPorts;
  dayId: string;
  onEnterPlay: (play: PlayView) => void;
  onContinue: (route: string) => void;
}

export function QuestMap({ ports, dayId, onEnterPlay, onContinue }: Props) {
  const [plays, setPlays] = useState<PlayView[]>([]);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [session, setSession] = useState<{ lastRoute: string; lastPlayId: string | null } | null>(null);

  const load = useCallback(async () => {
    const list = await ports.queries.forDay(dayId);
    setPlays(list);
    const completed = new Set(await ports.queries.completedIds(dayId));
    setDone(completed);
    const open = new Set<string>();
    for (const p of list) {
      if (await ports.queries.isRoomUnlocked(dayId, p.id)) open.add(p.id);
    }
    setUnlocked(open);
    const s = await ports.queries.getSession(dayId);
    setSession(s);
  }, [ports, dayId]);

  useEffect(() => {
    void load();
  }, [load]);

  const theme = ports.queries.dayTheme(dayId);
  const gradient = ports.queries.dayGradient(dayId);
  const lit = done.size;
  const total = plays.length;

  return (
    <div className="quest-map">
      <header className="hud" style={{ background: gradient }}>
        <div className="hud-top">
          <span className="brand">wickedSmart</span>
          <span className="hud-pips">
            {lit}/{total} rooms lit
          </span>
        </div>
        <h1>{theme}</h1>
        <p className="map-sub">{plays.length} rooms today · ~15 min each</p>
      </header>

      {session?.lastRoute && session.lastRoute !== '/' && (
        <button
          type="button"
          className="btn-continue"
          onClick={() => onContinue(session.lastRoute)}
        >
          ▶ Continue where you left off
        </button>
      )}

      <div className="map-path">
        {plays.map((play, i) => {
          const isDone = done.has(play.id);
          const isOpen = unlocked.has(play.id);
          const isNext = isOpen && !isDone;
          return (
            <button
              key={play.id}
              type="button"
              className={`room ${isDone ? 'done' : ''} ${isNext ? 'active' : ''} ${!isOpen ? 'locked' : ''}`}
              disabled={!isOpen}
              onClick={() => onEnterPlay(play)}
            >
              <span className="room-num">{i + 1}</span>
              <div className="room-body">
                <span className="room-engine">{engineLabel(play.engine)} · {play.durationMinutes}m</span>
                <strong>{play.title}</strong>
                <span className="room-sub">{play.roomName}</span>
              </div>
              <span className="room-state">{isDone ? '✓' : isOpen ? '→' : '🔒'}</span>
            </button>
          );
        })}
      </div>
      <p className="tease-map">{ports.queries.unlockTease()}</p>
    </div>
  );
}
