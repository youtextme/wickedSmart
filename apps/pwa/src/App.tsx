import { createElement, useEffect, useMemo, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PlayRunner, QuestMap } from '@wickedsmark/plays';
import { ProofCapture } from '@wickedsmark/proof';
import '@khmyznikov/pwa-install';
import { wirePorts } from './shell/wire';

const BASE = '/wickedSmart';

function Shell() {
  const ports = useMemo(() => wirePorts(), []);
  const dayId = ports.clock.queries.today();
  const navigate = useNavigate();
  const location = useLocation();
  const resumed = useRef(false);

  useEffect(() => {
    void ports.plays.commands.saveSession(dayId, {
      lastRoute: location.pathname || '/',
      lastPlayId: location.pathname.match(/\/play\/([^/]+)/)?.[1] ?? null,
      lastStep: parseInt(location.pathname.match(/step\/(\d+)/)?.[1] ?? '0', 10),
    });
  }, [location.pathname, ports, dayId]);

  useEffect(() => {
    if (resumed.current) return;
    resumed.current = true;
    void (async () => {
      const s = await ports.plays.queries.getSession(dayId);
      if (!s?.lastRoute || s.lastRoute === '/' || !s.lastPlayId) return;
      const complete = await ports.plays.queries.isComplete(dayId, s.lastPlayId);
      if (!complete) navigate(s.lastRoute, { replace: true });
    })();
  }, [ports, dayId, navigate]);

  return (
    <div className="app">
      {createElement('pwa-install', {
        'manual-apple': 'true',
        'manifest-url': `${BASE}/manifest.webmanifest`,
      })}
      <Routes>
        <Route
          path="/"
          element={
            <QuestMap
              ports={ports.plays}
              dayId={dayId}
              onEnterPlay={(p) => navigate(`/play/${p.id}/step/0`)}
              onContinue={(route) => navigate(route)}
            />
          }
        />
        <Route path="/play/:playId/step/:step" element={<PlayRoute ports={ports} dayId={dayId} />} />
        <Route path="/play/:playId/proof" element={<ProofRoute ports={ports} dayId={dayId} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function PlayRoute({ ports, dayId }: { ports: ReturnType<typeof wirePorts>; dayId: string }) {
  const { playId, step } = useParams();
  const navigate = useNavigate();
  const play = playId ? ports.plays.queries.getPlay(playId) : undefined;
  if (!play) return <Navigate to="/" replace />;

  return (
    <PlayRunner
      ports={ports.plays}
      dayId={dayId}
      play={play}
      step={parseInt(step ?? '0', 10)}
      onStepChange={() => {}}
      onComplete={() => navigate(`/play/${play.id}/proof`)}
      onBack={() => navigate('/')}
    />
  );
}

function ProofRoute({ ports, dayId }: { ports: ReturnType<typeof wirePorts>; dayId: string }) {
  const { playId } = useParams();
  const navigate = useNavigate();
  const play = playId ? ports.plays.queries.getPlay(playId) : undefined;
  if (!play) return <Navigate to="/" replace />;

  return (
    <ProofCapture
      ports={ports.proof}
      dayId={dayId}
      playId={play.id}
      playTitle={play.title}
      proofHint={play.proofHint}
      onSaved={() => navigate('/')}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter basename={BASE}>
      <Shell />
    </BrowserRouter>
  );
}
