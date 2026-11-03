<template>
  <div class="floating-hearts-layer" aria-hidden="true">
    <div
      v-for="heart in hearts"
      :key="heart.id"
      class="floating-heart"
      :style="{
        left: heart.left + '%',
        bottom: heart.bottom + '%',
        width: heart.size + 'px',
        height: heart.size + 'px',
        opacity: heart.opacity,
        animationDuration: heart.duration + 's',
        animationDelay: heart.delay + 's',
        transform: `scale(${heart.scale}) rotate(${heart.rotation}deg)`
      }"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        class="floating-heart__svg"
        :style="{ color: heart.color }"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const hearts = ref([]);

const colors = [
  '#F5A9C8',
  '#FFD1E3',
  '#FFE4EF',
  '#D877A2',
  'rgba(245, 169, 200, 0.7)'
];

onMounted(() => {
  // Check if mobile to keep particle count lightweight
  const isMobile = window.innerWidth <= 600;
  const count = isMobile ? 12 : 20;

  const generated = [];
  for (let i = 0; i < count; i++) {
    generated.push({
      id: i,
      left: Math.random() * 94 + 3,
      bottom: -15 - Math.random() * 20,
      size: Math.floor(Math.random() * 18) + 14,
      scale: 0.8 + Math.random() * 0.5,
      rotation: Math.floor(Math.random() * 40) - 20,
      opacity: 0.35 + Math.random() * 0.45,
      duration: Math.floor(Math.random() * 8) + 12,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  hearts.value = generated;
});
</script>

<style scoped>
.floating-hearts-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.floating-heart {
  position: absolute;
  animation: floatUpward linear infinite;
  will-change: transform, opacity;
}

.floating-heart__svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 6px rgba(216, 119, 162, 0.18));
}

@keyframes floatUpward {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: var(--tw-opacity, 0.6);
  }
  90% {
    opacity: var(--tw-opacity, 0.5);
  }
  100% {
    transform: translateY(-115vh) rotate(35deg) scale(1.1);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-heart {
    animation: none;
    opacity: 0.2;
    top: 50%;
  }
}
</style>

