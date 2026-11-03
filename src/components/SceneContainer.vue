<template>
  <div class="scene-container" :class="{ 'scene-container--active': active }">
    <div class="scene-container__inner">
      <div v-if="badge" class="scene-container__badge-wrap">
        <span class="scene-container__badge">{{ badge }}</span>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  badge: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.scene-container {
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(1.2rem, 4vw, 2.5rem);
  padding-top: calc(clamp(1.2rem, 4vw, 2.5rem) + env(safe-area-inset-top, 0px) + 38px);
  padding-bottom: calc(clamp(1.2rem, 4vw, 2.5rem) + env(safe-area-inset-bottom, 0px) + 24px);
  position: relative;
  z-index: 10;
  box-sizing: border-box;
}

.scene-container__inner {
  width: 100%;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  margin: 0 auto;
}

.scene-container__badge-wrap {
  margin-bottom: 1.25rem;
}

.scene-container__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--pink-rose);
  border-radius: var(--radius-full);
  color: var(--text-dark-rose);
  font-family: var(--font-ui);
  font-size: 0.825rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(216, 119, 162, 0.12);
}

@media (max-width: 480px) {
  .scene-container {
    padding-left: 1.1rem;
    padding-right: 1.1rem;
  }
}
</style>

