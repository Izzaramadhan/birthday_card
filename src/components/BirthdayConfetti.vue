<template>
  <div class="confetti-holder" aria-hidden="true">
    <!-- Confetti renders to its own fixed canvas via canvas-confetti -->
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import confetti from 'canvas-confetti';

let timer1 = null;
let timer2 = null;
let timer3 = null;

const CONFETTI_COLORS = [
  '#F5A9C8', // Rose Pink
  '#D877A2', // Accent Pink
  '#FFD1E3', // Light Pink
  '#FFE4EF', // Baby Pink
  '#FFFFFF', // White
  '#FFD700'  // Warm Gold sparkle
];

function fireCelebration() {
  // Check if reduced motion is requested
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 1. Initial Center Burst
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.65 },
    colors: CONFETTI_COLORS,
    disableForReducedMotion: true
  });

  // 2. Left and Right Cannons
  timer1 = setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true
    });

    confetti({
      particleCount: 35,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true
    });
  }, 400);

  // 3. Gentle gentle floating tail
  timer2 = setTimeout(() => {
    confetti({
      particleCount: 25,
      spread: 100,
      origin: { y: 0.4 },
      gravity: 0.8,
      scalar: 1.1,
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true
    });
  }, 900);
}

onMounted(() => {
  fireCelebration();
});

onBeforeUnmount(() => {
  if (timer1) clearTimeout(timer1);
  if (timer2) clearTimeout(timer2);
  if (timer3) clearTimeout(timer3);
  try {
    confetti.reset();
  } catch (e) {
    // ignore
  }
});
</script>

<style scoped>
.confetti-holder {
  display: none;
}
</style>

