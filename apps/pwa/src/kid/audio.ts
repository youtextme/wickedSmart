let ambientStop: (() => void) | null = null;
let ctx: AudioContext | null = null;

type AudioContextCtor = typeof AudioContext;

function getCtx(): AudioContext | null {
  if (ctx) return ctx;
  try {
    const g = globalThis as typeof globalThis & { webkitAudioContext?: AudioContextCtor };
    const AC = (typeof AudioContext !== 'undefined' ? AudioContext : undefined) ?? g.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    return ctx;
  } catch {
    return null;
  }
}

export function startAmbient(muted: boolean): void {
  try {
    stopAmbient();
    if (muted) return;
    const ac = getCtx();
    if (!ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const lfo = ac.createOscillator();
    const lfoGain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = 146.83;
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 8;
    gain.gain.value = 0.028;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start();
    lfo.start();
    ambientStop = () => {
      try {
        osc.stop();
        lfo.stop();
      } catch {
        /* already stopped */
      }
      ambientStop = null;
    };
  } catch {
    /* never throw */
  }
}

export function stopAmbient(): void {
  try {
    ambientStop?.();
  } catch {
    ambientStop = null;
  }
}

export function resumeAudio(): void {
  try {
    const ac = getCtx();
    if (!ac) return;
    void ac.resume();
  } catch {
    /* never throw */
  }
}

let bestVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (bestVoice) return bestVoice;
  const voices = speechSynthesis.getVoices();
  const prefs = ['Google US English', 'Samantha', 'Karen', 'Daniel', 'Microsoft Aria'];
  for (const name of prefs) {
    const v = voices.find((x) => x.name.includes(name));
    if (v) {
      bestVoice = v;
      return v;
    }
  }
  bestVoice = voices.find((v) => v.lang.startsWith('en')) ?? voices[0] ?? null;
  return bestVoice;
}

if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.onvoiceschanged = () => {
    bestVoice = null;
  };
}

export function speakPhrase(text: string, muted: boolean): void {
  if (muted || typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  if (v) u.voice = v;
  u.rate = 0.92;
  u.pitch = 1.02;
  speechSynthesis.speak(u);
}
