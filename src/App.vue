<template>
  <div class="app-root" :class="`scene-active-${currentScene}`">
    <!-- Ambient Background Elements -->
    <div class="ambient-glow" aria-hidden="true"></div>
    <FloatingHearts />
    <SparkleParticles />

    <!-- Top Persistent Controls -->
    <ProgressIndicator :current-scene="currentScene" :total-scenes="TOTAL_SCENES" />
    <MusicToggle />

    <!-- Scene Viewport Transition -->
    <main class="main-stage">
      <Transition :name="transitionName" mode="out-in">
        <component :is="activeSceneComponent" :key="currentScene" />
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSceneNavigation } from '@/composables/useSceneNavigation';
import FloatingHearts from '@/components/FloatingHearts.vue';
import SparkleParticles from '@/components/SparkleParticles.vue';
import ProgressIndicator from '@/components/ProgressIndicator.vue';
import MusicToggle from '@/components/MusicToggle.vue';

// Scene Components
import Scene1Surprise from '@/scenes/Scene1Surprise.vue';
import Scene2SomeoneSpecial from '@/scenes/Scene2SomeoneSpecial.vue';
import Scene3ThousandHearts from '@/scenes/Scene3ThousandHearts.vue';
import Scene4Letter from '@/scenes/Scene4Letter.vue';
import Scene5MakeAWish from '@/scenes/Scene5MakeAWish.vue';
import Scene6BirthdayCelebration from '@/scenes/Scene6BirthdayCelebration.vue';
import Scene7FromSender from '@/scenes/Scene7FromSender.vue';

const { currentScene, TOTAL_SCENES, transitionDirection } = useSceneNavigation();

const sceneMap = {
  1: Scene1Surprise,
  2: Scene2SomeoneSpecial,
  3: Scene3ThousandHearts,
  4: Scene4Letter,
  5: Scene5MakeAWish,
  6: Scene6BirthdayCelebration,
  7: Scene7FromSender
};

const activeSceneComponent = computed(() => {
  return sceneMap[currentScene.value] || Scene1Surprise;
});

const transitionName = computed(() => {
  return transitionDirection.value === 'forward' ? 'scene-forward' : 'scene-backward';
});
</script>

<style scoped>
.app-root {
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
  background: var(--bg-gradient);
  display: flex;
  flex-direction: column;
}

.ambient-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 30%,
    rgba(255, 228, 239, 0.7) 0%,
    rgba(255, 209, 227, 0.4) 40%,
    rgba(255, 248, 251, 0.1) 80%
  );
  pointer-events: none;
  z-index: 1;
}

.main-stage {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* Scene Forward Transitions */
.scene-forward-enter-active,
.scene-forward-leave-active {
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.scene-forward-enter-from {
  opacity: 0;
  transform: translateX(45px) scale(0.97);
}

.scene-forward-leave-to {
  opacity: 0;
  transform: translateX(-45px) scale(0.97);
}

/* Scene Backward Transitions */
.scene-backward-enter-active,
.scene-backward-leave-active {
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.scene-backward-enter-from {
  opacity: 0;
  transform: translateX(-45px) scale(0.97);
}

.scene-backward-leave-to {
  opacity: 0;
  transform: translateX(45px) scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .scene-forward-enter-active,
  .scene-forward-leave-active,
  .scene-backward-enter-active,
  .scene-backward-leave-active {
    transition: opacity 0.1s ease !important;
    transform: none !important;
  }
}
</style>

