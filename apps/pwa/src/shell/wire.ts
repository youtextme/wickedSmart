import { createClock } from '@wickedsmark/clock';
import { createPlays } from '@wickedsmark/plays';
import { createProof } from '@wickedsmark/proof';

export interface ShellPorts {
  clock: ReturnType<typeof createClock>;
  plays: ReturnType<typeof createPlays>;
  proof: ReturnType<typeof createProof>;
}

/** Composition root wiring — no domain rules, no event bus. */
export function wirePorts(): ShellPorts {
  const clock = createClock();
  const plays = createPlays();
  const proof = createProof();
  return { clock, plays, proof };
}
