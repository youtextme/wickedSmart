import { useState } from 'react';
import type { ProofPorts } from '../types';

interface Props {
  ports: ProofPorts;
  dayId: string;
  playId: string;
  playTitle: string;
  proofHint: string;
  onSaved: () => void;
}

export function ProofCapture({
  ports,
  dayId,
  playId,
  playTitle,
  proofHint,
  onSaved,
}: Props) {
  const [note, setNote] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!note.trim() && !file) return;
    setSaving(true);
    await ports.commands.capture({
      dayId,
      playId,
      note: note.trim() || undefined,
      blob: file ?? undefined,
      mimeType: file?.type,
    });
    setSaved(true);
    setSaving(false);
    onSaved();
  }

  if (saved) {
    return (
      <div className="proof-done" role="status">
        <h2>Proof saved</h2>
        <p>Locked on this device. You can close the tab.</p>
      </div>
    );
  }

  return (
    <div className="proof-capture">
      <h2>Proof for {playTitle}</h2>
      <p className="hint">{proofHint}</p>
      <label className="field">
        <span>Photo or video</span>
        <input
          type="file"
          accept="image/*,video/*"
          capture="environment"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <label className="field">
        <span>Or one line</span>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What did you set up?"
        />
      </label>
      <button
        type="button"
        className="btn-primary"
        disabled={saving || (!note.trim() && !file)}
        onClick={() => void handleSave()}
      >
        {saving ? 'Saving…' : 'Save proof'}
      </button>
    </div>
  );
}
