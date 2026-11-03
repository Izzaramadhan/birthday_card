<template>
  <button
    class="music-toggle"
    :class="{ 'music-toggle--playing': isMusicPlaying }"
    :aria-label="isMusicPlaying ? 'Matikan musik latar' : 'Putar musik latar'"
    :title="isMusicPlaying ? 'Matikan Musik' : 'Nyalakan Musik'"
    @click="toggleMusic"
  >
    <div class="music-toggle__icon-wrap">
      <!-- Animated Sound Bars when Playing -->
      <div v-if="isMusicPlaying" class="music-bars" aria-hidden="true">
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
        <span class="bar bar-3"></span>
      </div>

      <!-- Muted Icon when paused -->
      <svg
        v-else
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="music-icon"
      >
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    </div>
  </button>
</template>

<script setup>
import { useBackgroundMusic } from '@/composables/useBackgroundMusic';

const { isMusicPlaying, toggleMusic } = useBackgroundMusic();
</script>

<style scoped>
.music-toggle {
  position: fixed;
  top: max(16px, env(safe-area-inset-top, 16px));
  right: max(16px, env(safe-area-inset-right, 16px));
  z-index: 60;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--pink-rose);
  box-shadow: 0 4px 15px rgba(216, 119, 162, 0.15);
  color: var(--text-dark-rose);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
  padding: 0;
}

.music-toggle:hover {
  transform: scale(1.08);
  background: var(--white);
  border-color: var(--pink-accent);
  box-shadow: 0 6px 20px rgba(216, 119, 162, 0.28);
}

.music-toggle:active {
  transform: scale(0.95);
}

.music-toggle--playing {
  background: linear-gradient(135deg, #FFF0F6 0%, #FFE4EF 100%);
  border-color: var(--pink-accent);
}

.music-toggle__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.music-icon {
  width: 18px;
  height: 18px;
}

/* Animated Sound Bars */
.music-bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  width: 16px;
  height: 14px;
}

.music-bars .bar {
  width: 3px;
  background: var(--pink-accent);
  border-radius: 2px;
  animation: barBounce 1.2s infinite ease-in-out;
}

.music-bars .bar-1 {
  height: 60%;
  animation-delay: 0.1s;
}

.music-bars .bar-2 {
  height: 100%;
  animation-delay: 0.3s;
}

.music-bars .bar-3 {
  height: 40%;
  animation-delay: 0.5s;
}

@keyframes barBounce {
  0%, 100% {
    height: 30%;
  }
  50% {
    height: 100%;
  }
}
</style>

