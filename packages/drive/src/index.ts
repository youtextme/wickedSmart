/** Contract stub — drive.file adapter, called by proof outbox later. */
export const schema = {
  name: 'drive',
  version: '0.0.0-stub',
  scope: 'https://www.googleapis.com/auth/drive.file',
  folder: 'WickedSmart',
} as const;

export function health(): { ok: boolean; stub: true } {
  return { ok: true, stub: true };
}

export interface DrivePorts {
  commands: {
    put(path: string, blob: Blob): Promise<void>;
  };
}

export function createDrive(): DrivePorts {
  return {
    commands: {
      async put() {
        /* slice 2 */
      },
    },
  };
}
