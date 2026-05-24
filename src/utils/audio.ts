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
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Synthesizes a rapid, mechanical typewriter-style click sound.
 * Uses a sine oscillator with a tight exponential decay envelope, high-pass filtered to create a "tick" sound.
 */
export function playTypeClick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    // Introduce very slight pitch randomization for organic typewriter feel
    osc.frequency.setValueAtTime(1400 + Math.random() * 300, ctx.currentTime);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1600, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);

    // Rapid envelope: decays to zero in under 20ms
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.018);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.02);
  } catch (error) {
    // Fail silently
  }
}

/**
 * Synthesizes a sweeping white-noise whoosh/sweep.
 * Perfectly matches the vertical vertical-glowing scanline wipe transition on boot reveal.
 */
export function playWipeSweep() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const duration = 0.45; // 450ms
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Populate with white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Resonant bandpass filter sweeping from mid to high frequency
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(2.5, ctx.currentTime);
    filter.frequency.setValueAtTime(180, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + duration - 0.03);

    // Smooth envelope sweep in and exponential fade out
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseNode.start(ctx.currentTime);
    noiseNode.stop(ctx.currentTime + duration);
  } catch (error) {
    // Fail silently
  }
}
