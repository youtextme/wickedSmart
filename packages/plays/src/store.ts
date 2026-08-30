import Dexie, { type Table } from 'dexie';

export interface CompletionRow {
  key: string;
  dayId: string;
  playId: string;
  at: string;
}

class PlaysDexie extends Dexie {
  completions!: Table<CompletionRow, string>;

  constructor() {
    super('wickedsmark-plays-v1');
    this.version(1).stores({
      completions: 'key, dayId, playId',
    });
  }
}

const db = new PlaysDexie();

function key(dayId: string, playId: string) {
  return `${dayId}:${playId}`;
}

export async function markComplete(dayId: string, playId: string): Promise<void> {
  await db.completions.put({
    key: key(dayId, playId),
    dayId,
    playId,
    at: new Date().toISOString(),
  });
}

export async function isComplete(dayId: string, playId: string): Promise<boolean> {
  return !!(await db.completions.get(key(dayId, playId)));
}
