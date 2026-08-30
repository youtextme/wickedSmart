import { createElement, useMemo, useState } from 'react';
import type { PlayView } from '@wickedsmark/plays';
import { PlayDetail, PlaysScreen } from '@wickedsmark/plays';
import { ProofCapture } from '@wickedsmark/proof';
import '@khmyznikov/pwa-install';
import { wirePorts } from './shell/wire';

type Screen = 'list' | 'play' | 'proof';

export default function App() {
  const ports = useMemo(() => wirePorts(), []);
  const dayId = ports.clock.queries.today();
  const [screen, setScreen] = useState<Screen>('list');
  const [active, setActive] = useState<PlayView | null>(null);

  return (
    <div className="app">
      {createElement('pwa-install', {
        'manual-apple': 'true',
        'manifest-url': '/manifest.webmanifest',
      })}
      {screen === 'list' && (
        <PlaysScreen
          ports={ports.plays}
          dayId={dayId}
          onSelectPlay={(p) => {
            setActive(p);
            setScreen('play');
          }}
        />
      )}
      {screen === 'play' && active && (
        <PlayDetail
          ports={ports.plays}
          dayId={dayId}
          play={active}
          onBack={() => setScreen('list')}
          onDone={() => setScreen('proof')}
        />
      )}
      {screen === 'proof' && active && (
        <ProofCapture
          ports={ports.proof}
          dayId={dayId}
          playId={active.id}
          playTitle={active.title}
          proofHint={active.proofHint}
          onSaved={() => setScreen('list')}
        />
      )}
    </div>
  );
}
