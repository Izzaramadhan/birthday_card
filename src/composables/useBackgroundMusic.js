import { ref, readonly } from 'vue';

// Global singleton state so audio state persists smoothly across scene changes and replays
const isMusicPlaying = ref(false);
const isMusicEnabled = ref(false); // User accepted music
const isAudioSupported = ref(true);
const currentVolume = ref(0.25);
const TARGET_VOLUME = 0.25;

let audioElement = null;
let fadeInterval = null;

// Built-in Web Audio API music-box fallback in case the audio file cannot be loaded
let audioCtx = null;
let synthTimer = null;
let isUsingSynth = false;

// Dreamy music box notes
const MELODY = [
  { freq: 523.25, dur: 0.75 }, { freq: 523.25, dur: 0.25 },
  { freq: 587.33, dur: 1.0 }, { freq: 523.25, dur: 1.0 }, { freq: 698.46, dur: 1.0 },
  { freq: 659.25, dur: 2.0 }, { freq: 0, dur: 0.5 },
  { freq: 523.25, dur: 0.75 }, { freq: 523.25, dur: 0.25 },
  { freq: 587.33, dur: 1.0 }, { freq: 523.25, dur: 1.0 }, { freq: 783.99, dur: 1.0 },
  { freq: 698.46, dur: 2.0 }, { freq: 0, dur: 0.5 },
  { freq: 523.25, dur: 0.75 }, { freq: 523.25, dur: 0.25 },
  { freq: 1046.50, dur: 1.0 }, { freq: 880.00, dur: 1.0 }, { freq: 698.46, dur: 1.0 },
  { freq: 659.25, dur: 1.0 }, { freq: 587.33, dur: 1.5 }, { freq: 0, dur: 0.5 },
  { freq: 932.33, dur: 0.75 }, { freq: 932.33, dur: 0.25 },
  { freq: 880.00, dur: 1.0 }, { freq: 698.46, dur: 1.0 }, { freq: 783.99, dur: 1.0 },
  { freq: 698.46, dur: 2.5 }, { freq: 0, dur: 1.5 }
];

function initAudioElement() {
  if (audioElement || typeof window === 'undefined') return;

  try {
    audioElement = new Audio();
    audioElement.src = '/audio/birthday-background.mp3';
    audioElement.loop = true;
    audioElement.preload = 'auto';
    audioElement.volume = 0;

    audioElement.addEventListener('error', (e) => {
      console.warn('Background audio file not found or failed, falling back to Web Audio synth:', e);
      // Fallback to Web Audio synth
      isUsingSynth = true;
    });
  } catch (err) {
    console.warn('Audio initialization error:', err);
    isUsingSynth = true;
  }
}

function startWebAudioSynth() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    let noteIdx = 0;
    const tempo = 650; // ms per beat

    const playNextNote = () => {
      if (!isMusicPlaying.value || !audioCtx) return;
      const note = MELODY[noteIdx];
      noteIdx = (noteIdx + 1) % MELODY.length;

      if (note.freq > 0 && audioCtx.state === 'running') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, audioCtx.currentTime);

        // Music box bell envelope
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(TARGET_VOLUME * 0.4, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + Math.max(0.6, note.dur * 0.8));

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + Math.max(0.7, note.dur * 0.85));
      }

      synthTimer = setTimeout(playNextNote, note.dur * tempo);
    };

    playNextNote();
  } catch (e) {
    console.warn('Web Audio synth error:', e);
  }
}

function stopWebAudioSynth() {
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
}

function clearFade() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
}

function fadeIn(durationMs = 1200) {
  clearFade();
  if (!audioElement || isUsingSynth) return;

  const steps = 24;
  const stepTime = durationMs / steps;
  const volumeIncrement = TARGET_VOLUME / steps;

  audioElement.volume = 0;
  currentVolume.value = 0;

  fadeInterval = setInterval(() => {
    if (!audioElement) {
      clearFade();
      return;
    }
    const nextVol = Math.min(TARGET_VOLUME, audioElement.volume + volumeIncrement);
    audioElement.volume = nextVol;
    currentVolume.value = nextVol;

    if (nextVol >= TARGET_VOLUME) {
      clearFade();
    }
  }, stepTime);
}

function fadeOut(durationMs = 800) {
  clearFade();
  if (!audioElement || isUsingSynth) {
    if (audioElement) audioElement.pause();
    return;
  }

  const steps = 16;
  const stepTime = durationMs / steps;
  const startVol = audioElement.volume;
  const volumeDecrement = startVol / steps;

  fadeInterval = setInterval(() => {
    if (!audioElement) {
      clearFade();
      return;
    }
    const nextVol = Math.max(0, audioElement.volume - volumeDecrement);
    audioElement.volume = nextVol;
    currentVolume.value = nextVol;

    if (nextVol <= 0.01) {
      clearFade();
      audioElement.pause();
      audioElement.volume = 0;
    }
  }, stepTime);
}

export function useBackgroundMusic() {
  initAudioElement();

  const playMusic = async () => {
    isMusicEnabled.value = true;
    isMusicPlaying.value = true;

    if (isUsingSynth) {
      startWebAudioSynth();
      return;
    }

    if (!audioElement) {
      initAudioElement();
    }

    if (audioElement) {
      try {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              fadeIn();
            })
            .catch((err) => {
              console.warn('Native audio play error, trying Web Audio synth fallback:', err);
              isUsingSynth = true;
              startWebAudioSynth();
            });
        }
      } catch (err) {
        console.warn('Audio play exception:', err);
        isUsingSynth = true;
        startWebAudioSynth();
      }
    }
  };

  const pauseMusic = () => {
    isMusicPlaying.value = false;
    fadeOut();
    stopWebAudioSynth();
  };

  const toggleMusic = () => {
    if (isMusicPlaying.value) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const setMusicPreference = (enabled) => {
    isMusicEnabled.value = enabled;
    if (enabled) {
      playMusic();
    } else {
      pauseMusic();
    }
  };

  return {
    isMusicPlaying: readonly(isMusicPlaying),
    isMusicEnabled: readonly(isMusicEnabled),
    isAudioSupported: readonly(isAudioSupported),
    currentVolume: readonly(currentVolume),
    playMusic,
    pauseMusic,
    toggleMusic,
    setMusicPreference
  };
}

