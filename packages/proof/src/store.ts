import Dexie, { type Table } from 'dexie';

export interface OutboxEntry {
  proofId: string;
  dayId: string;
  playId: string;
  note?: string;
  mimeType?: string;
  hasBlob: boolean;
  createdAt: string;
  driveStatus: 'local' | 'pending' | 'synced' | 'dead';
  driveAttempts: number;
}

interface BlobRow {
  proofId: string;
  data: Blob;
}

class ProofDexie extends Dexie {
  outbox!: Table<OutboxEntry, string>;
  blobs!: Table<BlobRow, string>;

  constructor() {
    super('wickedsmark-proof-v1');
    this.version(1).stores({
      outbox: 'proofId, dayId, playId',
      blobs: 'proofId',
    });
  }
}

const db = new ProofDexie();

/** Drive path contract: {dayId}/{playId}/{proofId} */
export function drivePath(dayId: string, playId: string, proofId: string) {
  return `${dayId}/${playId}/${proofId}`;
}

export async function writeOutbox(entry: OutboxEntry, blob?: Blob): Promise<void> {
  await db.transaction('rw', db.outbox, db.blobs, async () => {
    await db.outbox.put(entry);
    if (blob) await db.blobs.put({ proofId: entry.proofId, data: blob });
  });
}

export async function hasProof(dayId: string, playId: string): Promise<boolean> {
  const n = await db.outbox.where({ dayId, playId }).count();
  return n > 0;
}

export async function getBlob(proofId: string): Promise<Blob | undefined> {
  return (await db.blobs.get(proofId))?.data;
}
