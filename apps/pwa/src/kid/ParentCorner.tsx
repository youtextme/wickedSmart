import { useMemo, useState } from 'react';
import type { PlaysPorts } from '@wickedsmark/plays';
import { formatMinutes, laneLabel, lanesForPlay, learnedLine, type GrowthLane, whyForLane } from './growth';

interface Props {
  plays: PlaysPorts;
  dayId: string;
  secondsToday: number;
  completedIds: string[];
}

export function ParentCorner({ plays, dayId, secondsToday, completedIds }: Props) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);

  const donePlays = useMemo(() => {
    return plays.queries
      .playsForDay(dayId)
      .filter((p) => completedIds.includes(p.id));
  }, [plays, dayId, completedIds]);

  const lanes = useMemo(() => {
    const set = new Set<string>();
    for (const p of donePlays) {
      for (const l of lanesForPlay(p)) set.add(l);
    }
    return [...set];
  }, [donePlays]);

  return (
    <>
      <button type="button" className="parent-icon" onClick={() => setOpen(true)} aria-label="Parent view">
        ◎
      </button>
      {open && (
        <div className="parent-overlay" role="dialog" aria-modal>
          <button type="button" className="parent-close" onClick={() => { setOpen(false); setDetail(false); }}>
            ×
          </button>
          <p className="parent-time">{formatMinutes(secondsToday)} today</p>
          <p className="parent-learned">
            {donePlays.length === 0
              ? 'Not started yet — kid sees a game, not homework.'
              : donePlays.map((p) => learnedLine(p)).join(' · ')}
          </p>
          {lanes.length > 0 && (
            <div className="parent-lanes">
              {lanes.map((l) => (
                <span key={l} className="lane-pip">{laneLabel(l as GrowthLane)}</span>
              ))}
            </div>
          )}
          {!detail && (
            <button type="button" className="parent-more" onClick={() => setDetail(true)}>
              Why this matters
            </button>
          )}
          {detail && lanes.map((l) => (
            <p key={l} className="parent-why">
              <strong>{laneLabel(l as GrowthLane)}:</strong>{' '}
              {whyForLane(l as GrowthLane)}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
