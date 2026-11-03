import fs from 'fs';
import path from 'path';

// Music Box Birthday Lullaby Synthesizer -> standard WAV
const sampleRate = 44100;
const bpm = 88;
const beatSec = 60 / bpm;

// Frequencies (Hz)
const NOTES = {
  REST: 0,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  Bb5: 932.33,
  B5: 987.77,
  C6: 1046.50,
  D6: 1174.66,
  E6: 1318.51,
  F6: 1396.91,
  G6: 1567.98,
  A6: 1760.00,
  F3: 174.61,
  C4: 261.63,
  A3: 220.00,
  Bb3: 233.08,
  G3: 196.00,
};

// Melody with note and duration (in beats)
const score = [
  // Intro chime
  { note: 'F5', dur: 1 }, { note: 'A5', dur: 1 }, { note: 'C6', dur: 1 },
  { note: 'REST', dur: 0.5 },
  // Happy Birthday to you
  { note: 'C5', dur: 0.75 }, { note: 'C5', dur: 0.25 },
  { note: 'D5', dur: 1.0 }, { note: 'C5', dur: 1.0 }, { note: 'F5', dur: 1.0 },
  { note: 'E5', dur: 2.0 }, { note: 'REST', dur: 0.5 },

  // Happy Birthday to you
  { note: 'C5', dur: 0.75 }, { note: 'C5', dur: 0.25 },
  { note: 'D5', dur: 1.0 }, { note: 'C5', dur: 1.0 }, { note: 'G5', dur: 1.0 },
  { note: 'F5', dur: 2.0 }, { note: 'REST', dur: 0.5 },

  // Happy Birthday dear Dyanova
  { note: 'C5', dur: 0.75 }, { note: 'C5', dur: 0.25 },
  { note: 'C6', dur: 1.0 }, { note: 'A5', dur: 1.0 }, { note: 'F5', dur: 1.0 },
  { note: 'E5', dur: 1.0 }, { note: 'D5', dur: 1.5 }, { note: 'REST', dur: 0.5 },

  // Happy Birthday to you
  { note: 'Bb5', dur: 0.75 }, { note: 'Bb5', dur: 0.25 },
  { note: 'A5', dur: 1.0 }, { note: 'F5', dur: 1.0 }, { note: 'G5', dur: 1.0 },
  { note: 'F5', dur: 2.5 }, { note: 'REST', dur: 1.0 },

  // Sweet Outro Arpeggio
  { note: 'A5', dur: 0.75 }, { note: 'C6', dur: 0.75 }, { note: 'F6', dur: 1.5 },
  { note: 'REST', dur: 1.5 }
];

let totalDuration = 0;
score.forEach(item => {
  totalDuration += item.dur * beatSec;
});
totalDuration += 2.0;

const totalSamples = Math.ceil(totalDuration * sampleRate);
const audioBuffer = new Float32Array(totalSamples);

function addMusicBoxTone(freq, startSec, durationSec, gain = 0.35) {
  if (freq <= 0) return;
  const startSample = Math.floor(startSec * sampleRate);
  const toneDuration = Math.max(durationSec, 1.8);
  const numSamples = Math.floor(toneDuration * sampleRate);

  for (let i = 0; i < numSamples; i++) {
    const idx = startSample + i;
    if (idx >= totalSamples) break;
    const t = i / sampleRate;

    const attack = Math.min(1.0, t / 0.005);
    const decay = Math.exp(-t * 2.8);
    const env = attack * decay;

    const fundamental = Math.sin(2 * Math.PI * freq * t);
    const harmonic2 = 0.3 * Math.sin(2 * Math.PI * freq * 2.76 * t) * Math.exp(-t * 4.5);
    const harmonic3 = 0.15 * Math.sin(2 * Math.PI * freq * 5.4 * t) * Math.exp(-t * 6.0);
    const sparkle = 0.08 * Math.sin(2 * Math.PI * freq * 8.0 * t) * Math.exp(-t * 8.0);

    const sampleVal = (fundamental + harmonic2 + harmonic3 + sparkle) * env * gain;
    audioBuffer[idx] += sampleVal;
  }
}

let currentSec = 0.5;
for (const item of score) {
  const durSec = item.dur * beatSec;
  if (item.note !== 'REST' && NOTES[item.note]) {
    addMusicBoxTone(NOTES[item.note], currentSec, durSec, 0.32);
    const lowerFreq = NOTES[item.note] / 2;
    addMusicBoxTone(lowerFreq, currentSec, durSec, 0.12);
  }
  currentSec += durSec;
}

const numChannels = 1;
const bytesPerSample = 2; // 16-bit
const dataLength = totalSamples * numChannels * bytesPerSample;
const buffer = Buffer.alloc(44 + dataLength);

// 44-byte WAV Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataLength, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28);
buffer.writeUInt16LE(numChannels * bytesPerSample, 32);
buffer.writeUInt16LE(16, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(dataLength, 40);

// Samples
let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  let s = audioBuffer[i];
  if (s > 0.95) s = 0.95 + 0.05 * Math.tanh((s - 0.95) / 0.05);
  else if (s < -0.95) s = -0.95 + 0.05 * Math.tanh((s + 0.95) / 0.05);
  const sample16 = Math.max(-32768, Math.min(32767, Math.floor(s * 32767)));
  buffer.writeInt16LE(sample16, offset);
  offset += 2;
}

const targetDir = path.resolve('public/audio');
fs.mkdirSync(targetDir, { recursive: true });

fs.writeFileSync(path.join(targetDir, 'birthday-background.wav'), buffer);
fs.writeFileSync(path.join(targetDir, 'birthday-background.mp3'), buffer);

console.log(`Success! Generated audio files: ${targetDir}/birthday-background.mp3 & .wav (${buffer.length} bytes, duration ~${totalDuration.toFixed(1)}s)`);
