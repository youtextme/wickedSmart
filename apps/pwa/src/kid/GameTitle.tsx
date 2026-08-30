import { useEffect, useRef } from 'react';
import { resumeAudio, startAmbient } from './audio';

interface Props {
  onGo: () => void;
  muted: boolean;
  onToggleMute: () => void;
  continuing?: boolean;
}

export function GameTitle({ onGo, muted, onToggleMute, continuing }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;
    const ctx = c;
    const el = canvas;
    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;
    const stars = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 2,
      s: 0.2 + Math.random() * 0.6,
    }));

    function resize() {
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    let raf = 0;
    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, w, h);
      for (const star of stars) {
        const y = ((star.y * h + frame * star.s * 0.15) % (h + 20)) - 10;
        const x = star.x * w + Math.sin(frame * 0.01 + star.x * 10) * 6;
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 184, 74, ${0.25 + star.r * 0.15})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  function handleGo() {
    resumeAudio();
    if (!muted) startAmbient(muted);
    onGo();
  }

  return (
    <div className="game-title">
      <div className="parallax parallax-back" />
      <div className="parallax parallax-mid" />
      <canvas ref={canvasRef} className="particles" aria-hidden />
      <button type="button" className="mute-btn" onClick={onToggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
        {muted ? '🔇' : '🔊'}
      </button>
      <div className="title-core">
        <div className="title-glow" />
        <p className="title-whisper">A story is waiting</p>
        <button type="button" className="go-btn" onClick={handleGo}>
          {continuing ? 'Go' : 'Go'}
        </button>
      </div>
    </div>
  );
}
