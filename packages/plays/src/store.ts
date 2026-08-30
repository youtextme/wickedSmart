import Dexie, { type Table } from 'dexie';

export interface CompletionRow {
  key: string;
  dayId: string;
  playId: string;
  at: string;
}

export interface SessionRow {
  dayId: string;
  lastRoute: string;
  lastPlayId: string | null;
  lastStep: number;
  updatedAt: string;
}

export interface DraftRow {
  key: string;
  dayId: string;
  playId: string;
  field: string;
  value: string;
  updatedAt: string;
}

class PlaysDexie extends Dexie {
  completions!: Table<CompletionRow, string>;
  sessions!: Table<SessionRow, string>;
  drafts!: Table<DraftRow, string>;

  constructor() {
    super('wickedsmark-plays-v1');
    this.version(2).stores({
      completions: 'key, dayId, playId',
      sessions: 'dayId',
      drafts: 'key, dayId, playId, field',
    });
  }
}

const db = new PlaysDexie();

function ckey(dayId: string, playId: string) {
  return `${dayId}:${playId}`;
}

function dkey(dayId: string, playId: string, field: string) {
  return `${dayId}:${playId}:${field}`;
}

export async function markComplete(dayId: string, playId: string): Promise<void> {
  await db.completions.put({
    key: ckey(dayId, playId),
    dayId,
    playId,
    at: new Date().toISOString(),
  });
}

export async function isComplete(dayId: string, playId: string): Promise<boolean> {
  return !!(await db.completions.get(ckey(dayId, playId)));
}

export async function getCompletionsForDay(dayId: string): Promise<string[]> {
  const rows = await db.completions.where('dayId').equals(dayId).toArray();
  return rows.map((r) => r.playId);
}

export async function saveSession(
  dayId: string,
  data: { lastRoute: string; lastPlayId: string | null; lastStep: number },
): Promise<void> {
  await db.sessions.put({
    dayId,
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function getSession(dayId: string): Promise<SessionRow | undefined> {
  return db.sessions.get(dayId);
}

export async function saveDraft(
  dayId: string,
  playId: string,
  field: string,
  value: string,
): Promise<void> {
  await db.drafts.put({
    key: dkey(dayId, playId, field),
    dayId,
    playId,
    field,
    value,
    updatedAt: new Date().toISOString(),
  });
}

export async function getDraft(
  dayId: string,
  playId: string,
  field: string,
): Promise<string> {
  const row = await db.drafts.get(dkey(dayId, playId, field));
  return row?.value ?? '';
}
