import { useRef, useState } from 'react';
import type { ProofPorts } from '@wickedsmark/proof';

interface Props {
  ports: ProofPorts;
  dayId: string;
  playId: string;
  onSaved: () => void;
}

export function GameProof({ ports, dayId, playId, onSaved }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  function pick(f: File | undefined) {
    if (!f) return;
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  }

  async function save() {
    if (!file) return;
    setSaving(true);
    await ports.commands.capture({
      dayId,
      playId,
      blob: file,
      mimeType: file.type,
      note: 'video proof',
    });
    setSaving(false);
    onSaved();
  }

  return (
    <div className="game-proof">
      <div className="proof-burst" aria-hidden />
      <h2 className="proof-head">Show what you just did</h2>
      <p className="proof-sub">Quick clip or photo — like beating a level.</p>

      {preview && (
        <div className="proof-preview">
          {file?.type.startsWith('video/') ? (
            <video src={preview} controls playsInline />
          ) : (
            <img src={preview} alt="Your proof" />
          )}
        </div>
      )}

      <input
        ref={videoRef}
        type="file"
        accept="video/*"
        capture="environment"
        hidden
        onChange={(e) => pick(e.target.files?.[0])}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*,video/*"
        hidden
        onChange={(e) => pick(e.target.files?.[0])}
      />

      <div className="proof-actions">
        <button type="button" className="proof-cam" onClick={() => videoRef.current?.click()}>
          📹 Record
        </button>
        <button type="button" className="proof-gallery" onClick={() => galleryRef.current?.click()}>
          🖼 Pick from gallery
        </button>
      </div>

      <button type="button" className="go-btn" disabled={!file || saving} onClick={() => void save()}>
        {saving ? 'Saving…' : 'Next'}
      </button>
    </div>
  );
}
