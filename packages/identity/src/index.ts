/** Contract stub — optional PARENT Google. Anonymous kid is happy path. */
export const schema = {
  name: 'identity',
  version: '0.0.0-stub',
  note: 'Parent OAuth for Drive only. No kid OAuth.',
} as const;

export function health(): { ok: boolean; stub: true } {
  return { ok: true, stub: true };
}

export function createIdentity() {
  return {
    queries: {
      isParentAuthed: () => false,
    },
  };
}
