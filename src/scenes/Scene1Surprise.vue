<template>
  <SceneContainer :badge="birthdayContent.scene1.badge">
    <div class="scene-1-content" ref="contentRef">
      <!-- Romantic Big Greeting -->
      <h1 class="scene-1-title romantic-script gs-fade-up">
        {{ birthdayContent.scene1.greeting }}
      </h1>

      <!-- Staggered Card Text -->
      <div class="scene-1-card gs-fade-up">
        <p class="scene-1-subtext-1">
          {{ birthdayContent.scene1.subtext1 }}
        </p>
        <p class="scene-1-subtext-2">
          {{ birthdayContent.scene1.subtext2 }}
        </p>
      </div>

      <!-- Action Button -->
      <div class="scene-1-action gs-fade-up">
        <PinkButton
          :label="birthdayContent.scene1.buttonLabel"
          size="lg"
          variant="primary"
          pulse
          @click="handleStart"
        />
      </div>
    </div>

    <!-- Music Modal Prompt -->
    <MusicModal
      :is-open="isMusicModalOpen"
      @choice="handleMusicChoice"
    />
  </SceneContainer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { birthdayContent } from '@/data/birthdayContent';
import SceneContainer from '@/components/SceneContainer.vue';
import PinkButton from '@/components/PinkButton.vue';
import MusicModal from '@/components/MusicModal.vue';
import { useBackgroundMusic } from '@/composables/useBackgroundMusic';
import { useSceneNavigation } from '@/composables/useSceneNavigation';

const { isMusicEnabled, setMusicPreference } = useBackgroundMusic();
const { nextScene } = useSceneNavigation();

const contentRef = ref(null);
const isMusicModalOpen = ref(false);
const hasAskedMusic = ref(false);

let ctx;

onMounted(() => {
  // GSAP Context with clean lifecycle management
  ctx = gsap.context(() => {
    gsap.from('.gs-fade-up', {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.22,
      ease: 'power3.out'
    });
  }, contentRef.value);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});

const handleStart = () => {
  if (!hasAskedMusic.value && !isMusicEnabled.value) {
    isMusicModalOpen.value = true;
  } else {
    nextScene();
  }
};

const handleMusicChoice = (accepted) => {
  hasAskedMusic.value = true;
  isMusicModalOpen.value = false;
  setMusicPreference(accepted);
  setTimeout(() => {
    nextScene();
  }, 250);
};
</script>

<style scoped>
.scene-1-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.scene-1-title {
  font-size: clamp(2.4rem, 7vw, 3.8rem);
  color: var(--text-dark-rose);
  line-height: 1.2;
  text-shadow: 0 4px 15px rgba(245, 169, 200, 0.45);
  animation: gentleFloat 3.5s ease-in-out infinite alternate;
}

@keyframes gentleFloat {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-6px);
  }
}

.scene-1-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid var(--pink-rose);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: clamp(1.4rem, 4vw, 2.2rem);
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scene-1-subtext-1 {
  font-size: clamp(1.05rem, 3.2vw, 1.25rem);
  font-weight: 600;
  color: var(--text-dark-rose);
}

.scene-1-subtext-2 {
  font-size: clamp(0.95rem, 2.8vw, 1.1rem);
  color: var(--text-primary);
  line-height: 1.6;
}

.scene-1-action {
  margin-top: 0.8rem;
}

@media (prefers-reduced-motion: reduce) {
  .scene-1-title {
    animation: none;
  }
}
</style>
