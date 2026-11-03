import { ref, computed } from 'vue';

const TOTAL_SCENES = 7;
const currentScene = ref(1);
const isTransitioning = ref(false);
const transitionDirection = ref('forward'); // 'forward' | 'backward'

export function useSceneNavigation() {
  const prefersReducedMotion = () => {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const transitionDuration = computed(() => {
    return prefersReducedMotion() ? 50 : 750;
  });

  const nextScene = () => {
    if (isTransitioning.value) return false;
    if (currentScene.value < TOTAL_SCENES) {
      isTransitioning.value = true;
      transitionDirection.value = 'forward';

      const timer = setTimeout(() => {
        currentScene.value += 1;
        isTransitioning.value = false;
      }, transitionDuration.value);

      return true;
    }
    return false;
  };

  const previousScene = () => {
    if (isTransitioning.value) return false;
    if (currentScene.value > 1) {
      isTransitioning.value = true;
      transitionDirection.value = 'backward';

      const timer = setTimeout(() => {
        currentScene.value -= 1;
        isTransitioning.value = false;
      }, transitionDuration.value);

      return true;
    }
    return false;
  };

  const goToScene = (sceneNumber) => {
    if (isTransitioning.value) return false;
    if (sceneNumber >= 1 && sceneNumber <= TOTAL_SCENES && sceneNumber !== currentScene.value) {
      isTransitioning.value = true;
      transitionDirection.value = sceneNumber > currentScene.value ? 'forward' : 'backward';

      const timer = setTimeout(() => {
        currentScene.value = sceneNumber;
        isTransitioning.value = false;
      }, transitionDuration.value);

      return true;
    }
    return false;
  };

  const replayExperience = () => {
    if (isTransitioning.value) return;
    isTransitioning.value = true;
    transitionDirection.value = 'backward';

    setTimeout(() => {
      currentScene.value = 1;
      isTransitioning.value = false;
    }, transitionDuration.value);
  };

  const progressPercentage = computed(() => {
    return Math.round((currentScene.value / TOTAL_SCENES) * 100);
  });

  return {
    TOTAL_SCENES,
    currentScene,
    isTransitioning,
    transitionDirection,
    transitionDuration,
    nextScene,
    previousScene,
    goToScene,
    replayExperience,
    progressPercentage
  };
}

