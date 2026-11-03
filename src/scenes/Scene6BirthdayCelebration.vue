<template>
  <SceneContainer :badge="birthdayContent.scene6.badge">
    <div class="scene-6-content" ref="celebrateRef">
      <!-- Confetti trigger on mount -->
      <BirthdayConfetti />

      <!-- Celebratory Card -->
      <div class="scene-6-card">
        <div class="scene-6-crown gs-pop" aria-hidden="true">👑</div>

        <h1 class="scene-6-title gs-pop">
          {{ birthdayContent.scene6.celebrateTitle }}
        </h1>

        <div class="scene-6-name-wrap gs-pop">
          <h2 class="scene-6-name romantic-script">
            {{ birthdayContent.scene6.name }}
          </h2>
        </div>

        <div class="scene-6-divider gs-pop">
          <span>🌸 💖 🌸</span>
        </div>

        <div class="scene-6-wishes">
          <p
            v-for="(wish, idx) in birthdayContent.scene6.wishes"
            :key="idx"
            class="scene-6-wish gs-pop"
          >
            {{ wish }}
          </p>
        </div>

        <div class="scene-6-highlight gs-pop">
          <p>{{ birthdayContent.scene6.highlight }}</p>
        </div>

        <div class="scene-6-action gs-pop">
          <PinkButton
            :label="birthdayContent.scene6.buttonLabel"
            size="lg"
            variant="primary"
            pulse
            @click="nextScene"
          />
        </div>
      </div>
    </div>
  </SceneContainer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { birthdayContent } from '@/data/birthdayContent';
import SceneContainer from '@/components/SceneContainer.vue';
import PinkButton from '@/components/PinkButton.vue';
import BirthdayConfetti from '@/components/BirthdayConfetti.vue';
import { useSceneNavigation } from '@/composables/useSceneNavigation';

const { nextScene } = useSceneNavigation();
const celebrateRef = ref(null);

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.gs-pop', {
      scale: 0.9,
      y: 20,
      opacity: 0,
      duration: 0.65,
      stagger: 0.12,
      ease: 'back.out(1.5)'
    });
  }, celebrateRef.value);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
.scene-6-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.scene-6-card {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 2px solid var(--pink-rose);
  border-radius: var(--radius-xl);
  box-shadow: 0 15px 40px rgba(216, 119, 162, 0.25);
  padding: clamp(1.6rem, 5vw, 2.5rem);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.scene-6-crown {
  font-size: 2.4rem;
  margin-bottom: -0.2rem;
  animation: crownBounce 2.5s infinite ease-in-out;
}

@keyframes crownBounce {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(4deg);
  }
}

.scene-6-title {
  font-size: clamp(1.4rem, 4.5vw, 2rem);
  font-weight: 800;
  color: var(--text-dark-rose);
  letter-spacing: 0.5px;
  line-height: 1.25;
}

.scene-6-name-wrap {
  margin: 0.4rem 0 0.8rem;
  width: 100%;
}

.scene-6-name {
  font-size: clamp(2rem, 6.5vw, 3.2rem);
  font-weight: 700;
  color: var(--pink-accent);
  line-height: 1.2;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  text-shadow: 0 4px 15px rgba(216, 119, 162, 0.4);
}

.scene-6-divider {
  color: var(--pink-rose);
  font-size: 1.1rem;
  margin-bottom: 1.1rem;
  letter-spacing: 6px;
}

.scene-6-wishes {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
}

.scene-6-wish {
  font-size: clamp(0.95rem, 2.9vw, 1.08rem);
  line-height: 1.6;
  color: var(--text-primary);
}

.scene-6-highlight {
  background: linear-gradient(135deg, rgba(255, 209, 227, 0.5), rgba(255, 228, 239, 0.9));
  border: 1px solid var(--pink-rose);
  border-radius: var(--radius-md);
  padding: 8px 18px;
  margin-bottom: 1.4rem;
}

.scene-6-highlight p {
  font-size: clamp(1rem, 3.2vw, 1.15rem);
  font-weight: 700;
  color: var(--text-dark-rose);
}

.scene-6-action {
  width: 100%;
  display: flex;
  justify-content: center;
}

@media (prefers-reduced-motion: reduce) {
  .scene-6-crown {
    animation: none;
  }
}
</style>
