<template>
  <SceneContainer :badge="birthdayContent.scene5.badge">
    <div class="scene-5-content">
      <div class="scene-5-card">
        <!-- Soft glowing candle / star icon -->
        <div class="scene-5-icon" aria-hidden="true">
          <span>🕯️✨</span>
        </div>

        <div class="scene-5-lines">
          <p
            v-for="(line, idx) in birthdayContent.scene5.lines"
            :key="idx"
            class="scene-5-line"
            :class="{ 'scene-5-line--accent': idx === 1 || idx === 4 }"
          >
            {{ line }}
          </p>
        </div>

        <!-- Countdown Display when active -->
        <div v-if="isCountingDown" class="scene-5-countdown-box">
          <CountdownAnimation @complete="handleCountdownComplete" />
          <p class="scene-5-countdown-hint">Tutup mata dan berdoa yaa... ✨</p>
        </div>

        <!-- Action Button (hidden/disabled during countdown) -->
        <div v-if="!isCountingDown" class="scene-5-action">
          <PinkButton
            :label="birthdayContent.scene5.buttonLabel"
            size="lg"
            variant="primary"
            :disabled="isCountingDown"
            pulse
            @click="startWishCountdown"
          />
        </div>
      </div>
    </div>
  </SceneContainer>
</template>

<script setup>
import { ref } from 'vue';
import { birthdayContent } from '@/data/birthdayContent';
import SceneContainer from '@/components/SceneContainer.vue';
import PinkButton from '@/components/PinkButton.vue';
import CountdownAnimation from '@/components/CountdownAnimation.vue';
import { useSceneNavigation } from '@/composables/useSceneNavigation';

const { nextScene } = useSceneNavigation();
const isCountingDown = ref(false);

const startWishCountdown = () => {
  if (isCountingDown.value) return;
  isCountingDown.value = true;
};

const handleCountdownComplete = () => {
  // Transition directly to Scene 6
  nextScene();
};
</script>

<style scoped>
.scene-5-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.scene-5-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid var(--pink-rose);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: clamp(1.6rem, 5vw, 2.4rem);
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.3rem;
  text-align: center;
}

.scene-5-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-full);
  background: var(--pink-baby);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  box-shadow: 0 4px 15px rgba(245, 169, 200, 0.4);
  animation: candleGlow 2.5s infinite alternate ease-in-out;
}

@keyframes candleGlow {
  0% {
    box-shadow: 0 0 10px rgba(245, 169, 200, 0.3);
    transform: scale(0.96);
  }
  100% {
    box-shadow: 0 0 25px rgba(245, 169, 200, 0.75);
    transform: scale(1.04);
  }
}

.scene-5-lines {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
}

.scene-5-line {
  font-size: clamp(1rem, 3.2vw, 1.15rem);
  line-height: 1.55;
  color: var(--text-primary);
}

.scene-5-line--accent {
  font-weight: 700;
  color: var(--text-dark-rose);
}

.scene-5-countdown-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.scene-5-countdown-hint {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-dark-rose);
  animation: pulseHint 1.5s infinite alternate;
}

@keyframes pulseHint {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

.scene-5-action {
  margin-top: 0.5rem;
}
</style>

