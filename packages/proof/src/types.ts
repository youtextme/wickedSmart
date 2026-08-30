export interface ProofCaptured {
  proofId: string;
  playId: string;
  dayId: string;
}

export interface ProofPorts {
  commands: {
    capture(input: {
      dayId: string;
      playId: string;
      note?: string;
      blob?: Blob;
      mimeType?: string;
    }): Promise<ProofCaptured>;
  };
  queries: {
    hasProof(dayId: string, playId: string): Promise<boolean>;
  };
  events: {
    subscribeProofCaptured(fn: (e: ProofCaptured) => void): () => void;
  };
}
