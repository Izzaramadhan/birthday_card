<template>
  <div class="countdown-wrapper" ref="countdownRef" aria-live="assertive">
    <div class="countdown-number">
      <span class="countdown-digit" ref="digitRef">{{ currentDisplay }}</span>
      <div class="countdown-ring" ref="ringRef" aria-hidden="true"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

const emit = defineEmits(['complete']);

const countdownRef = ref(null);
const digitRef = ref(null);
const ringRef = ref(null);
const currentDisplay = ref(3);

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        emit('complete');
      }
    });

    // Animate 3
    tl.fromTo(
      digitRef.value,
      { scale: 0.2, opacity: 0, rotation: -15 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.8)' }
    )
      .to(ringRef.value, { scale: 1.25, opacity: 0.9, duration: 0.35, ease: 'power2.out' }, '<')
      .to(ringRef.value, { scale: 1, opacity: 0.4, duration: 0.35, ease: 'power2.in' })
      .to(
        digitRef.value,
        { scale: 1.35, opacity: 0, duration: 0.25, ease: 'power2.in' },
        '+=0.15'
      )
      // Set to 2
      .call(() => {
        currentDisplay.value = 2;
      })
      // Animate 2
      .fromTo(
        digitRef.value,
        { scale: 0.2, opacity: 0, rotation: 15 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.8)' }
      )
      .to(ringRef.value, { scale: 1.25, opacity: 0.9, duration: 0.35, ease: 'power2.out' }, '<')
      .to(ringRef.value, { scale: 1, opacity: 0.4, duration: 0.35, ease: 'power2.in' })
      .to(
        digitRef.value,
        { scale: 1.35, opacity: 0, duration: 0.25, ease: 'power2.in' },
        '+=0.15'
      )
      // Set to 1
      .call(() => {
        currentDisplay.value = 1;
      })
      // Animate 1
      .fromTo(
        digitRef.value,
        { scale: 0.2, opacity: 0, rotation: 0 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.8)' }
      )
      .to(ringRef.value, { scale: 1.35, opacity: 1, duration: 0.35, ease: 'power2.out' }, '<')
      .to(ringRef.value, { scale: 1, opacity: 0.4, duration: 0.35, ease: 'power2.in' })
      .to(
        digitRef.value,
        { scale: 1.45, opacity: 0, duration: 0.3, ease: 'power2.in' },
        '+=0.2'
      );
  }, countdownRef.value);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
.countdown-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 1.2rem auto 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.countdown-number {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  border-radius: var(--radius-full);
  background: radial-gradient(circle, #ffffff 40%, #ffe4ef 100%);
  box-shadow: 0 10px 35px rgba(216, 119, 162, 0.4);
  border: 3px solid var(--pink-rose);
}

.countdown-digit {
  font-family: var(--font-ui);
  font-size: 4.8rem;
  font-weight: 800;
  color: var(--text-dark-rose);
  line-height: 1;
  text-shadow: 0 4px 15px rgba(216, 119, 162, 0.3);
  display: inline-block;
  will-change: transform, opacity;
}

.countdown-ring {
  position: absolute;
  inset: -12px;
  border-radius: var(--radius-full);
  border: 2.5px dashed var(--pink-accent);
  opacity: 0.5;
  pointer-events: none;
}
</style>
