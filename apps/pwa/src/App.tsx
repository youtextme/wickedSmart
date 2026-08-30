import { useMemo } from 'react';
import { KidPath } from './kid/KidPath';
import { wirePorts } from './shell/wire';

export default function App() {
  const ports = useMemo(() => wirePorts(), []);

  return (
    <div className="app">
      <KidPath {...ports} />
    </div>
  );
}
