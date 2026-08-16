// Web Audio API tactile feedback sound effects & Morse audio beeper

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playKeyClick(type: 'standard' | 'space' | 'backspace' | 'enter' = 'standard') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    let freq = 600;
    let duration = 0.03;

    if (type === 'space') {
      freq = 380;
      duration = 0.04;
    } else if (type === 'backspace') {
      freq = 280;
      duration = 0.035;
    } else if (type === 'enter') {
      freq = 520;
      duration = 0.05;
    }

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + duration);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    // Audio context may be blocked before user gesture
  }
}

export const playKeyClickSound = () => playKeyClick('standard');
export const playSpacebarSound = () => playKeyClick('space');
export const playBackspaceSound = () => playKeyClick('backspace');
export const playEnterSound = () => playKeyClick('enter');

export function playMorseTone(dotDurationMs = 80, isDash = false) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const duration = (isDash ? dotDurationMs * 3 : dotDurationMs) / 1000;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.setValueAtTime(0.12, now + duration - 0.01);
    gain.gain.linearRampToValueAtTime(0.0001, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    // Ignore audio errors
  }
}
