<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="music-modal-backdrop" @click.self="onDecline">
      <div class="music-modal-card" role="dialog" aria-modal="true" :aria-labelledby="'music-modal-title'">
        <div class="music-modal-icon">
          <span>🎵</span>
        </div>

        <h3 id="music-modal-title" class="music-modal-title">
          {{ birthdayContent.musicModal.title }}
        </h3>

        <p class="music-modal-desc">
          {{ birthdayContent.musicModal.description }}
        </p>

        <div class="music-modal-actions">
          <PinkButton
            :label="birthdayContent.musicModal.acceptLabel"
            variant="primary"
            size="md"
            pulse
            @click="onAccept"
          />
          <PinkButton
            :label="birthdayContent.musicModal.declineLabel"
            variant="outline"
            size="md"
            @click="onDecline"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { birthdayContent } from '@/data/birthdayContent';
import PinkButton from '@/components/PinkButton.vue';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['choice']);

const onAccept = () => {
  emit('choice', true);
};

const onDecline = () => {
  emit('choice', false);
};
</script>

<style scoped>
.music-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(168, 78, 123, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.music-modal-card {
  width: 100%;
  max-width: 380px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--pink-rose);
  box-shadow: var(--shadow-card);
  padding: 2.2rem 1.8rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.music-modal-icon {
  width: 58px;
  height: 58px;
  border-radius: var(--radius-full);
  background: var(--pink-baby);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(245, 169, 200, 0.4);
}

.music-modal-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-dark-rose);
  margin-bottom: 0.5rem;
}

.music-modal-desc {
  font-size: 0.95rem;
  color: var(--text-primary);
  margin-bottom: 1.8rem;
  line-height: 1.5;
}

.music-modal-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>

