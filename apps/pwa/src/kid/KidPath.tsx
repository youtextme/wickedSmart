import { useCallback, useEffect, useMemo, useState } from 'react';
import { beatsForPlay, gateChoiceBeat, type PlayView, type SessionState } from '@wickedsmark/plays';
import type { ShellPorts } from '../shell/wire';
import { resumeAudio, startAmbient, stopAmbient } from './audio';
import { BeatScreen } from './BeatScreen';
import { GameProof } from './GameProof';
import { GameTitle } from './GameTitle';
import { ParentCorner } from './ParentCorner';
import { PlayChoice } from './PlayChoice';

type Phase = SessionState['phase'] | 'loading';

function firstOpenPlay(plays: PlayView[], done: Set<string>): PlayView | undefined {
  return plays.find((p) => !done.has(p.id));
}

export function KidPath({ clock, plays, proof }: ShellPorts) {
  const dayId = clock.queries.today();
  const dayPlays = useMemo(() => plays.queries.playsForDay(dayId), [plays, dayId]);

  const [phase, setPhase] = useState<Phase>('loading');
  const [playId, setPlayId] = useState<string | null>(null);
  const [beatIndex, setBeatIndex] = useState(0);
  const [draft, setDraft] = useState('');
  const [muted, setMuted] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [secondsToday, setSecondsToday] = useState(0);
  const [continuing, setContinuing] = useState(false);

  const play = playId ? plays.queries.getPlay(playId) : undefined;
  const resolvedPlay = play ?? (phase === 'beat' ? plays.queries.getPlay('d0-r1') : undefined);
  const doneSet = useMemo(() => new Set(completedIds), [completedIds]);
  const dayOpener = resolvedPlay?.order === 0 && resolvedPlay != null && !doneSet.has(resolvedPlay.id);
  const beats = useMemo(() => {
    if (!resolvedPlay) return [];
    const generated = beatsForPlay(resolvedPlay, { dayOpener });
    return generated.length > 0 ? generated : [gateChoiceBeat(resolvedPlay.id)];
  }, [resolvedPlay, dayOpener]);
  const beat = beats[beatIndex] ?? beats[0];

  const save = useCallback(
    async (patch: Partial<SessionState> & { lastPlayId?: string | null }) => {
      await plays.commands.saveSession(dayId, {
        lastRoute: '/',
        lastPlayId: patch.lastPlayId ?? playId,
        lastStep: patch.beatIndex ?? beatIndex,
        phase: patch.phase ?? (phase === 'loading' ? 'title' : phase),
        beatIndex: patch.beatIndex ?? beatIndex,
        onBreak: patch.onBreak ?? false,
        secondsToday: patch.secondsToday ?? secondsToday,
        lastTickAt: new Date().toISOString(),
      });
    },
    [plays, dayId, playId, beatIndex, phase, secondsToday],
  );

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const done = await plays.queries.completedIds(dayId);
      if (cancelled) return;
      setCompletedIds(done);
      const s = await plays.queries.getSession(dayId);
      if (cancelled) return;
      if (s?.secondsToday) setSecondsToday(s.secondsToday);

      const inProgress = s?.lastPlayId && !done.includes(s.lastPlayId);

      if (s?.onBreak || s?.phase === 'break') {
        setContinuing(done.length > 0 || !!inProgress);
        setPhase((p) => (p === 'loading' ? 'title' : p));
        return;
      }
      if (s?.phase === 'proof' && s.lastPlayId) {
        setPlayId(s.lastPlayId);
        setBeatIndex(s.beatIndex ?? 0);
        setPhase((p) => (p === 'loading' ? 'proof' : p));
        return;
      }
      if (s?.phase === 'choice' && s.lastPlayId) {
        setPlayId(s.lastPlayId);
        setPhase((p) => (p === 'loading' ? 'choice' : p));
        return;
      }
      if (s?.phase === 'beat' && s.lastPlayId) {
        setPlayId(s.lastPlayId);
        setBeatIndex(s.beatIndex ?? 0);
        const d = await plays.queries.getDraft(dayId, s.lastPlayId, `beat-${s.beatIndex ?? 0}`);
        if (cancelled) return;
        setDraft(d);
        setPhase((p) => (p === 'loading' ? 'beat' : p));
        setContinuing(done.length > 0);
        return;
      }
      setContinuing(done.length > 0);
      setPhase((p) => (p === 'loading' ? 'title' : p));
    })();
    return () => {
      cancelled = true;
    };
  }, [dayId, plays]);

  useEffect(() => {
    if (phase === 'beat' && beats.length === 0) {
      setPhase('title');
    }
  }, [phase, beats.length]);

  useEffect(() => {
    if (phase !== 'beat' && phase !== 'proof') return;
    const id = window.setInterval(() => setSecondsToday((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === 'loading' || phase === 'title') return;
    void save({});
  }, [phase, beatIndex, playId, secondsToday, save]);

  useEffect(() => {
    if (muted) stopAmbient();
    else if (phase !== 'title' && phase !== 'loading') startAmbient(muted);
  }, [muted, phase]);

  function toggleMute() {
    setMuted((m) => !m);
  }

  function startFromTitle() {
    resumeAudio();
    const pool = dayPlays.length > 0 ? dayPlays : plays.queries.playsForDay('2026-08-30');
    const next = firstOpenPlay(pool, doneSet) ?? pool[0] ?? plays.queries.getPlay('d0-r1');
    const id = next?.id ?? 'd0-r1';
    setPlayId(id);
    setBeatIndex(0);
    setDraft('');
    setPhase('beat');
    void save({ phase: 'beat', beatIndex: 0, lastPlayId: id, onBreak: false });
  }

  async function handleNext() {
    if (!beat) { setPhase('proof'); void save({ phase: 'proof' }); return; }
    const id = resolvedPlay?.id ?? playId;
    if (id) await plays.commands.saveDraft(dayId, id, `beat-${beatIndex}`, draft);

    if (beatIndex < beats.length - 1) {
      const n = beatIndex + 1;
      setBeatIndex(n);
      if (id) {
        const d = await plays.queries.getDraft(dayId, id, `beat-${n}`);
        setDraft(d);
      }
      void save({ beatIndex: n, phase: 'beat' });
      return;
    }
    setPhase('proof');
    void save({ phase: 'proof' });
  }

  async function handleProofSaved() {
    if (!playId) return;
    await plays.commands.complete(dayId, playId);
    const done = [...completedIds, playId];
    setCompletedIds(done);
    setPhase('choice');
    void save({ phase: 'choice' });
  }

  function handleBreak() {
    setPhase('title');
    void save({ phase: 'break', onBreak: true });
  }

  function handleNextGame() {
    const done = new Set(completedIds);
    const next = dayPlays.find((p) => !done.has(p.id));
    if (!next) {
      setPhase('title');
      setContinuing(true);
      void save({ phase: 'title', onBreak: false });
      return;
    }
    setPlayId(next.id);
    setBeatIndex(0);
    setDraft('');
    setPhase('beat');
    void save({ phase: 'beat', beatIndex: 0, lastPlayId: next.id, onBreak: false });
  }

  const hasMore = dayPlays.some((p) => !completedIds.includes(p.id));
  const activePlayId = resolvedPlay?.id ?? playId;

  if (phase === 'loading') {
    return <div className="game-loading" aria-busy />;
  }

  return (
    <div className="kid-path">
      <button type="button" className="mute-float" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
        {muted ? '🔇' : '🔊'}
      </button>
      <ParentCorner plays={plays} dayId={dayId} secondsToday={secondsToday} completedIds={completedIds} />

      {phase === 'title' && (
        <GameTitle onGo={startFromTitle} muted={muted} onToggleMute={toggleMute} continuing={continuing} />
      )}
      {phase === 'beat' && beat && (
        <BeatScreen
          beat={beat}
          draft={draft}
          onDraftChange={(v) => {
            setDraft(v);
            if (activePlayId) void plays.commands.saveDraft(dayId, activePlayId, `beat-${beatIndex}`, v);
          }}
          onNext={() => void handleNext()}
          muted={muted}
        />
      )}
      {phase === 'proof' && playId && (
        <GameProof ports={proof} dayId={dayId} playId={playId} onSaved={() => void handleProofSaved()} />
      )}
      {phase === 'choice' && (
        <PlayChoice onBreak={handleBreak} onNext={handleNextGame} hasMore={hasMore} />
      )}
    </div>
  );
}
