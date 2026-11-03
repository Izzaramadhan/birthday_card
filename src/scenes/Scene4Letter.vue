<template>
  <SceneContainer :badge="birthdayContent.scene4.badge">
    <div class="scene-4-content">
      <!-- Interactive Love Envelope -->
      <LoveEnvelope @opened="handleLetterOpened" />

      <!-- Next Button appears once letter is opened -->
      <Transition name="btn-appear">
        <div v-if="isOpened" class="scene-4-action">
          <PinkButton
            :label="birthdayContent.scene4.buttonLabel"
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
import LoveEnvelope from '@/components/LoveEnvelope.vue';
import { useSceneNavigation } from '@/composables/useSceneNavigation';

const { nextScene } = useSceneNavigation();
const isOpened = ref(false);

const handleLetterOpened = () => {
  isOpened.value = true;
};
</script>

<style scoped>
.scene-4-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.scene-4-action {
  margin-top: 0.5rem;
}

.btn-appear-enter-active {
  transition: all 0.5s 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-appear-enter-from {
  opacity: 0;
  transform: translateY(18px);
}
</style>

