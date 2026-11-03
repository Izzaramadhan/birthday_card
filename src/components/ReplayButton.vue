<template>
  <button
    class="replay-button"
    type="button"
    :aria-label="label"
    @click="$emit('replay')"
  >
    <span class="replay-button__icon">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </span>
    <span class="replay-button__text">{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Mau lihat lagi? 💗'
  }
});

defineEmits(['replay']);
</script>

<style scoped>
.replay-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 12px 32px;
  border-radius: var(--radius-full);
  font-family: var(--font-ui);
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, #F5A9C8 0%, #D877A2 100%);
  color: var(--white);
  box-shadow: var(--shadow-button);
  transition: all var(--transition-normal);
  animation: replayPulse 2.4s infinite ease-in-out;
}

.replay-button:hover {
  transform: translateY(-2px) scale(1.02);
  background: linear-gradient(135deg, #f7b5d1 0%, #dd82ab 100%);
  box-shadow: var(--shadow-button-hover);
}

.replay-button:active {
  transform: translateY(1px) scale(0.98);
}

.replay-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: transform 0.4s ease;
}

.replay-button:hover .replay-button__icon {
  transform: rotate(-45deg);
}

.replay-button__icon svg {
  width: 100%;
  height: 100%;
}

@keyframes replayPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 22px -3px rgba(216, 119, 162, 0.38);
  }
  50% {
    transform: scale(1.025);
    box-shadow: 0 12px 30px 2px rgba(216, 119, 162, 0.55);
  }
}

@media (prefers-reduced-motion: reduce) {
  .replay-button {
    animation: none;
  }
}
</style>

