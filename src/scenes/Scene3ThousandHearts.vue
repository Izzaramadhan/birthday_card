<template>
  <SceneContainer :badge="birthdayContent.scene3.badge">
    <div class="scene-3-content">
      <!-- Heart Formation Canvas -->
      <HeartFormation @formed="handleHeartFormed" />

      <!-- Wishes Reveal after heart is formed -->
      <Transition name="wishes-fade">
        <div v-if="isHeartFormed" class="scene-3-card">
          <h2 class="scene-3-intro">
            {{ birthdayContent.scene3.intro }}
          </h2>

          <ul class="scene-3-wishes">
            <li
              v-for="(wish, idx) in birthdayContent.scene3.wishes"
              :key="idx"
              class="scene-3-wish-item"
            >
              <span class="scene-3-bullet">✨</span>
              <span>{{ wish }}</span>
            </li>
          </ul>

          <div class="scene-3-action">
            <PinkButton
              :label="birthdayContent.scene3.buttonLabel"
              size="lg"
              variant="primary"
              pulse
              @click="nextScene"
            />
          </div>
        </div>
      </Transition>
    </div>
  </SceneContainer>
</template>

<script setup>
import { ref } from 'vue';
import { birthdayContent } from '@/data/birthdayContent';
import SceneContainer from '@/components/SceneContainer.vue';
import PinkButton from '@/components/PinkButton.vue';
import HeartFormation from '@/components/HeartFormation.vue';
import { useSceneNavigation } from '@/composables/useSceneNavigation';

const { nextScene } = useSceneNavigation();
const isHeartFormed = ref(false);

const handleHeartFormed = () => {
  isHeartFormed.value = true;
};
</script>

<style scoped>
.scene-3-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.scene-3-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid var(--pink-rose);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: clamp(1.4rem, 4vw, 2.2rem);
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  text-align: left;
}

.scene-3-intro {
  font-size: clamp(1.1rem, 3.4vw, 1.3rem);
  font-weight: 700;
  color: var(--text-dark-rose);
  text-align: center;
}

.scene-3-wishes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.scene-3-wish-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: clamp(0.92rem, 2.7vw, 1.05rem);
  line-height: 1.55;
  color: var(--text-primary);
}

.scene-3-bullet {
  font-size: 1.1rem;
  line-height: 1.4;
  flex-shrink: 0;
}

.scene-3-action {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

/* Wishes Fade Transition */
.wishes-fade-enter-active {
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.wishes-fade-enter-from {
  opacity: 0;
  transform: translateY(24px);
}
</style>

