<template>
  <SceneContainer :badge="birthdayContent.scene2.badge">
    <div class="scene-2-content">
      <div class="scene-2-card">
        <AnimatedText
          :lines="birthdayContent.scene2.lines"
          :interval-ms="1300"
          :allow-skip="true"
          @complete="handleTextComplete"
        />
      </div>

      <!-- Action Button appears when text complete -->
      <Transition name="fade-slide">
        <div v-if="isTextDone" class="scene-2-action">
          <PinkButton
            :label="birthdayContent.scene2.buttonLabel"
            size="lg"
            variant="primary"
            pulse
            @click="nextScene"
          />
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
import AnimatedText from '@/components/AnimatedText.vue';
import { useSceneNavigation } from '@/composables/useSceneNavigation';

const { nextScene } = useSceneNavigation();
const isTextDone = ref(false);

const handleTextComplete = () => {
  isTextDone.value = true;
};
</script>

<style scoped>
.scene-2-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  width: 100%;
}

.scene-2-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid var(--pink-rose);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: clamp(1.6rem, 5vw, 2.5rem);
  width: 100%;
  max-width: 480px;
}

.scene-2-action {
  margin-top: 0.5rem;
}

/* Transitions */
.fade-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
</style>

