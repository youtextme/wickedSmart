import { useCallback, useEffect, useRef, useState } from 'react';
import type { PlayView, PlaysPorts } from '../types';

interface Props {
  ports: PlaysPorts;
  dayId: string;
  play: PlayView;
  step: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onBack: () => void;
}

export function PlayRunner({ ports, dayId, play, step, onStepChange, onComplete, onBack }: Props) {
  const [draft, setDraft] = useState('');
  const [paraIdx, setParaIdx] = useState(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fieldKey = play.kind === 'read' ? 'readIdx' : play.kind;

  const persist = useCallback(
    (value: string) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        void ports.commands.saveDraft(dayId, play.id, fieldKey, value);
      }, 800);
    },
    [ports, dayId, play.id, fieldKey],
  );

  useEffect(() => {
    void (async () => {
      const saved = await ports.queries.getDraft(dayId, play.id, fieldKey);
      if (play.kind === 'read') {
        const idx = parseInt(saved || '0', 10);
        setParaIdx(Number.isNaN(idx) ? 0 : idx);
      } else {
        setDraft(saved);
      }
    })();
  }, [ports, dayId, play.id, fieldKey, play.kind]);

  useEffect(() => {
    void ports.commands.saveSession(dayId, {
      lastRoute: `/play/${play.id}/step/${step}`,
      lastPlayId: play.id,
      lastStep: step,
    });
  }, [ports, dayId, play.id, step]);

  function handleDraftChange(value: string) {
    setDraft(value);
    persist(value);
  }

  async function finish() {
    await ports.commands.complete(dayId, play.id);
    onComplete();
  }

  const paragraphs = play.storyParagraphs ?? [];
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  return (
    <div className="play-runner">
      <button type="button" className="back" onClick={onBack}>← Map</button>
      <span className="play-badge">{play.skill}</span>
      <h1>{play.title}</h1>
      <p className="tagline">{play.tagline}</p>

      {play.kind === 'read' && (
        <div className="read-room">
          <p className="story">{paragraphs[paraIdx]}</p>
          <p className="read-meta">Part {paraIdx + 1} of {paragraphs.length}</p>
          <div className="btn-row">
            {paraIdx > 0 && (
              <button type="button" onClick={() => {
                const n = paraIdx - 1;
                setParaIdx(n);
                void ports.commands.saveDraft(dayId, play.id, 'readIdx', String(n));
              }}>Back</button>
            )}
            {paraIdx < paragraphs.length - 1 ? (
              <button type="button" className="btn-primary" onClick={() => {
                const n = paraIdx + 1;
                setParaIdx(n);
                void ports.commands.saveDraft(dayId, play.id, 'readIdx', String(n));
                onStepChange(n);
              }}>Next door →</button>
            ) : (
              <button type="button" className="btn-primary" onClick={() => void finish()}>Light this room ✓</button>
            )}
          </div>
        </div>
      )}

      {play.kind === 'write' && (
        <div className="write-room">
          <p>{play.writePrompt}</p>
          <textarea
            rows={8}
            value={draft}
            onChange={(e) => handleDraftChange(e.target.value)}
            placeholder="Autosaves while you type…"
          />
          <p className="word-count">{wordCount} words · aim ~{play.writeWordGoal ?? 50}</p>
          <button type="button" className="btn-primary" disabled={wordCount < 10} onClick={() => void finish()}>
            Log complete ✓
          </button>
        </div>
      )}

      {play.kind === 'research' && (
        <div className="research-room">
          <p className="spark">Spark: {play.researchSpark}</p>
          <label>① My question<textarea rows={2} value={draft.split('|||')[0] ?? ''} onChange={(e) => {
            const parts = draft.split('|||'); parts[0] = e.target.value; handleDraftChange(parts.join('|||'));
          }} /></label>
          <label>② One source I found<textarea rows={2} value={draft.split('|||')[1] ?? ''} onChange={(e) => {
            const parts = draft.split('|||'); while (parts.length < 4) parts.push(''); parts[1] = e.target.value; handleDraftChange(parts.join('|||'));
          }} /></label>
          <label>③ What I now believe<textarea rows={2} value={draft.split('|||')[2] ?? ''} onChange={(e) => {
            const parts = draft.split('|||'); while (parts.length < 4) parts.push(''); parts[2] = e.target.value; handleDraftChange(parts.join('|||'));
          }} /></label>
          <label>④ What I'd ask next<textarea rows={2} value={draft.split('|||')[3] ?? ''} onChange={(e) => {
            const parts = draft.split('|||'); while (parts.length < 4) parts.push(''); parts[3] = e.target.value; handleDraftChange(parts.join('|||'));
          }} /></label>
          <button type="button" className="btn-primary" onClick={() => void finish()}>Card done ✓</button>
        </div>
      )}

      {play.kind === 'question' && (
        <div className="question-room">
          <p className="spark">Initiative: {play.initiative}</p>
          <label>My question<textarea rows={2} value={draft.split('|||')[0] ?? ''} onChange={(e) => {
            const p = draft.split('|||'); p[0] = e.target.value; handleDraftChange(p.join('|||'));
          }} /></label>
          <p><a href={play.toolLink} target="_blank" rel="noreferrer">Open Gemini ↗</a> — paste its answer below</p>
          <label>Tool said<textarea rows={3} value={draft.split('|||')[1] ?? ''} onChange={(e) => {
            const p = draft.split('|||'); while (p.length < 3) p.push(''); p[1] = e.target.value; handleDraftChange(p.join('|||'));
          }} /></label>
          <label>What I think (yours wins)<textarea rows={3} value={draft.split('|||')[2] ?? ''} onChange={(e) => {
            const p = draft.split('|||'); while (p.length < 3) p.push(''); p[2] = e.target.value; handleDraftChange(p.join('|||'));
          }} /></label>
          <button type="button" className="btn-primary" onClick={() => void finish()}>Question card done ✓</button>
        </div>
      )}

      {(play.kind === 'presence' || play.kind === 'people' || play.kind === 'agency') && (
        <div className="quick-room">
          <p>{play.presencePrompt ?? play.peoplePrompt ?? play.agencyPrompt ?? play.doAction}</p>
          <textarea rows={4} value={draft} onChange={(e) => handleDraftChange(e.target.value)} placeholder="Your artifact (few lines)…" />
          <button type="button" className="btn-primary" disabled={!draft.trim()} onClick={() => void finish()}>Done ✓</button>
        </div>
      )}
    </div>
  );
}
