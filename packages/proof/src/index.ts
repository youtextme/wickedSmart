import { hasProof, writeOutbox } from './store';
import type { ProofCaptured, ProofPorts } from './types';

export function createProof(): ProofPorts {
  const listeners = new Set<(e: ProofCaptured) => void>();

  return {
    commands: {
      async capture({ dayId, playId, note, blob, mimeType }) {
        const proofId = crypto.randomUUID();
        await writeOutbox(
          {
            proofId,
            dayId,
            playId,
            note,
            mimeType,
            hasBlob: Boolean(blob),
            createdAt: new Date().toISOString(),
            driveStatus: 'local',
            driveAttempts: 0,
          },
          blob,
        );
        const e = { proofId, playId, dayId };
        listeners.forEach((fn) => fn(e));
        return e;
      },
    },
    queries: { hasProof },
    events: {
      subscribeProofCaptured(fn) {
        listeners.add(fn);
        return () => listeners.delete(fn);
      },
    },
  };
}

export const schema = {
  name: 'proof',
  version: '0.1.0',
  commands: ['capture'],
  queries: ['hasProof'],
  events: ['ProofCaptured'],
} as const;

export function health(): { ok: boolean } {
  return { ok: true };
}

export type { ProofCaptured, ProofPorts } from './types';
export { ProofCapture } from './ui/ProofCapture';
