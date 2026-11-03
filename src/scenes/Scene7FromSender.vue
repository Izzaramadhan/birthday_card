<template>
  <SceneContainer :badge="birthdayContent.scene7.badge">
    <div class="scene-7-content" ref="closingRef">
      <div class="scene-7-card">
        <!-- Floating Heart Ribbon Accent -->
        <div class="scene-7-ribbon gs-fade" aria-hidden="true">
          <span>💌</span>
        </div>

        <div class="scene-7-messages">
          <p
            v-for="(msg, idx) in birthdayContent.scene7.messages"
            :key="idx"
            class="scene-7-msg gs-fade"
            :class="{ 'scene-7-msg--bold': idx === 3 }"
          >
            {{ msg }}
          </p>
        </div>

        <div class="scene-7-signoff gs-fade">
          <p class="scene-7-closing romantic-script">
            {{ birthdayContent.scene7.closing }}
          </p>
          <p class="scene-7-author romantic-script">
            {{ birthdayContent.scene7.author }}
          </p>
        </div>

        <!-- Replay Button -->
        <div class="scene-7-action gs-fade">
          <ReplayButton
            :label="birthdayContent.scene7.buttonLabel"
            @replay="replayExperience"
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
import ReplayButton from '@/components/ReplayButton.vue';
import { useSceneNavigation } from '@/composables/useSceneNavigation';

const { replayExperience } = useSceneNavigation();
const closingRef = ref(null);

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.gs-fade', {
      y: 18,
      opacity: 0,
      duration: 0.65,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, closingRef.value);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
.scene-7-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.scene-7-card {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid var(--pink-rose);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: clamp(1.6rem, 5vw, 2.5rem);
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.scene-7-ribbon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  background: var(--pink-baby);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-bottom: 0.6rem;
  box-shadow: 0 4px 15px rgba(245, 169, 200, 0.4);
}

.scene-7-messages {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  margin-bottom: 1.4rem;
}

.scene-7-msg {
  font-size: clamp(0.95rem, 2.8vw, 1.08rem);
  line-height: 1.65;
  color: var(--text-primary);
}

.scene-7-msg--bold {
  font-weight: 700;
  color: var(--text-dark-rose);
  font-size: clamp(1.05rem, 3.2vw, 1.2rem);
  margin-top: 0.2rem;
}

.scene-7-signoff {
  width: 100%;
  text-align: right;
  margin-bottom: 1.6rem;
  padding-right: 0.8rem;
}

.scene-7-closing {
  font-size: clamp(1.2rem, 3.5vw, 1.4rem);
  color: var(--text-primary);
  margin-bottom: -0.2rem;
}

.scene-7-author {
  font-size: clamp(1.45rem, 4.2vw, 1.8rem);
  font-weight: 700;
  color: var(--text-dark-rose);
}

.scene-7-action {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
