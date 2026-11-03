<template>
  <nav
    class="progress-indicator"
    role="navigation"
    :aria-label="`Scene ${currentScene} dari ${totalScenes}`"
  >
    <div class="progress-indicator__bar">
      <div
        v-for="step in totalScenes"
        :key="step"
        class="progress-indicator__dot"
        :class="{
          'progress-indicator__dot--active': step === currentScene,
          'progress-indicator__dot--passed': step < currentScene
        }"
        :title="`Bagian ${step}`"
      >
        <span class="sr-only">Langkah {{ step }}</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  currentScene: {
    type: Number,
    required: true
  },
  totalScenes: {
    type: Number,
    default: 7
  }
});
</script>

<style scoped>
.progress-indicator {
  position: fixed;
  top: max(16px, env(safe-area-inset-top, 16px));
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  pointer-events: none;
}

.progress-indicator__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
  box-shadow: 0 4px 15px rgba(216, 119, 162, 0.12);
  border: 1px solid rgba(255, 209, 227, 0.6);
}

.progress-indicator__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--pink-light);
  transition: all var(--transition-normal);
}

.progress-indicator__dot--passed {
  background: var(--pink-rose);
}

.progress-indicator__dot--active {
  width: 22px;
  background: linear-gradient(135deg, #F5A9C8, #D877A2);
  box-shadow: 0 0 10px rgba(216, 119, 162, 0.5);
}

@media (max-width: 480px) {
  .progress-indicator__bar {
    gap: 6px;
    padding: 5px 12px;
  }
  .progress-indicator__dot {
    width: 6px;
    height: 6px;
  }
  .progress-indicator__dot--active {
    width: 18px;
  }
}
</style>

