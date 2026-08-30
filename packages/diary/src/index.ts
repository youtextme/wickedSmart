/** Contract stub — not proven slice 1. */
export const schema = {
  name: 'diary',
  version: '0.0.0-stub',
  queries: ['scan'],
  note: 'Parent 5s scan + share formatter. Reads via injected ports only.',
} as const;

export function health(): { ok: boolean; stub: true } {
  return { ok: true, stub: true };
}

export interface DiaryPorts {
  queries: {
    scan(dayId: string): Promise<{ summary: string }>;
  };
}

export function createDiary(): DiaryPorts {
  return {
    queries: {
      async scan() {
        return { summary: 'Diary not shipped in slice 1' };
      },
    },
  };
}
