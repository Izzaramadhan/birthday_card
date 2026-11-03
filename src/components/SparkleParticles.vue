<template>
  <div class="sparkles-layer" aria-hidden="true">
    <div
      v-for="sparkle in sparkles"
      :key="sparkle.id"
      class="sparkle-star"
      :style="{
        top: sparkle.top + '%',
        left: sparkle.left + '%',
        width: sparkle.size + 'px',
        height: sparkle.size + 'px',
        animationDelay: sparkle.delay + 's',
        animationDuration: sparkle.duration + 's'
      }"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sparkles = ref([]);

onMounted(() => {
  const isMobile = window.innerWidth <= 600;
  const count = isMobile ? 8 : 14;

  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({
      id: i,
      top: Math.random() * 90 + 5,
      left: Math.random() * 90 + 5,
      size: Math.floor(Math.random() * 12) + 10,
      delay: Math.random() * 4,
      duration: 2.2 + Math.random() * 2.5
    });
  }
  sparkles.value = list;
});
</script>

<style scoped>
.sparkles-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.sparkle-star {
  position: absolute;
  color: #F5A9C8;
  opacity: 0.6;
  animation: sparkleTwinkle ease-in-out infinite alternate;
  filter: drop-shadow(0 0 6px rgba(245, 169, 200, 0.7));
}

@keyframes sparkleTwinkle {
  0% {
    transform: scale(0.3) rotate(0deg);
    opacity: 0.15;
  }
  50% {
    transform: scale(1.1) rotate(90deg);
    opacity: 0.85;
  }
  100% {
    transform: scale(0.4) rotate(180deg);
    opacity: 0.2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sparkle-star {
    animation: none;
    opacity: 0.3;
  }
}
</style>

