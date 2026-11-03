<template>
  <div class="love-envelope-wrapper">
    <!-- Unopened Envelope State -->
    <div
      v-if="!isLetterExpanded"
      class="envelope-box"
      :class="{ 'envelope-box--opening': isOpening }"
      @click="openEnvelope"
      role="button"
      tabindex="0"
      @keydown.enter="openEnvelope"
      @keydown.space.prevent="openEnvelope"
      :aria-label="isOpen ? 'Surat terbuka' : 'Amplop tertutup. Sentuh untuk membuka surat'"
    >
      <div class="envelope">
        <!-- Top Flap (folds open 180deg) -->
        <div class="envelope__flap envelope__flap--top"></div>

        <!-- Left & Right Flaps -->
        <div class="envelope__flap envelope__flap--left"></div>
        <div class="envelope__flap envelope__flap--right"></div>
        <div class="envelope__flap envelope__flap--bottom"></div>

        <!-- Peeking Paper inside -->
        <div class="envelope__paper" :class="{ 'envelope__paper--slide-out': isOpening }">
          <div class="envelope__paper-line"></div>
          <div class="envelope__paper-line short"></div>
          <span class="envelope__paper-heart">💗</span>
        </div>

        <!-- Heart Seal in center -->
        <div class="envelope__seal" :class="{ 'envelope__seal--opened': isOpening }">
          <div class="envelope__seal-heart">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span class="envelope__seal-tag">{{ birthdayContent.scene4.openBadge }}</span>
        </div>
      </div>

      <p class="envelope__hint">{{ birthdayContent.scene4.tapInstruction }}</p>
    </div>

    <!-- Expanded Stationary Letter Card (once opened) -->
    <Transition name="letter-expand">
      <div v-if="isLetterExpanded" class="letter-card">
        <div class="letter-card__stamp">
          <span>🌸</span>
        </div>

        <div class="letter-card__content custom-scrollbar">
          <h3 class="letter-card__salutation romantic-script">
            {{ birthdayContent.scene4.salutation }}
          </h3>

          <div class="letter-card__body">
            <p
              v-for="(para, idx) in birthdayContent.scene4.paragraphs"
              :key="idx"
              class="letter-card__paragraph"
            >
              {{ para }}
            </p>
          </div>

          <div class="letter-card__signature romantic-script">
            {{ birthdayContent.scene4.signature }}
          </div>
        </div>

        <div class="letter-card__footer-accent">
          <span>♡ ♡ ♡</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { birthdayContent } from '@/data/birthdayContent';

const emit = defineEmits(['opened']);

const isOpen = ref(false);
const isOpening = ref(false);
const isLetterExpanded = ref(false);

const openEnvelope = () => {
  if (isOpen.value || isOpening.value) return;

  isOpening.value = true;
  isOpen.value = true;

  // Let flap open & paper slide out before revealing full readable letter
  setTimeout(() => {
    isLetterExpanded.value = true;
    emit('opened');
  }, 950);
};
</script>

<style scoped>
.love-envelope-wrapper {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

/* Envelope Container */
.envelope-box {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  transition: transform var(--transition-normal);
}

.envelope-box:hover:not(.envelope-box--opening) {
  transform: translateY(-4px) scale(1.02);
}

.envelope {
  position: relative;
  width: 280px;
  height: 180px;
  background: #fce2ee;
  border-radius: 14px;
  box-shadow: var(--shadow-envelope);
  overflow: visible;
}

/* Flaps */
.envelope__flap {
  position: absolute;
  width: 0;
  height: 0;
  z-index: 3;
}

/* Top flap */
.envelope__flap--top {
  top: 0;
  left: 0;
  border-left: 140px solid transparent;
  border-right: 140px solid transparent;
  border-top: 105px solid #f7bfd6;
  transform-origin: top;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;
  filter: drop-shadow(0 2px 5px rgba(168, 78, 123, 0.15));
}

.envelope-box--opening .envelope__flap--top {
  transform: rotateX(180deg);
  z-index: 1;
}

/* Bottom flap */
.envelope__flap--bottom {
  bottom: 0;
  left: 0;
  border-left: 140px solid transparent;
  border-right: 140px solid transparent;
  border-bottom: 95px solid #facada;
  border-radius: 0 0 14px 14px;
  z-index: 4;
}

/* Left & Right Flaps */
.envelope__flap--left {
  top: 0;
  left: 0;
  border-top: 90px solid transparent;
  border-bottom: 90px solid transparent;
  border-left: 140px solid #f9d3e2;
  border-radius: 14px 0 0 14px;
  z-index: 3;
}

.envelope__flap--right {
  top: 0;
  right: 0;
  border-top: 90px solid transparent;
  border-bottom: 90px solid transparent;
  border-right: 140px solid #f9d3e2;
  border-radius: 0 14px 14px 0;
  z-index: 3;
}

/* Paper Inside */
.envelope__paper {
  position: absolute;
  left: 20px;
  bottom: 12px;
  width: 240px;
  height: 140px;
  background: #ffffff;
  border-radius: 10px;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(216, 119, 162, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.75s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.envelope__paper-line {
  width: 75%;
  height: 4px;
  background: var(--pink-baby);
  border-radius: 2px;
}

.envelope__paper-line.short {
  width: 50%;
}

.envelope__paper-heart {
  font-size: 1.25rem;
}

.envelope__paper--slide-out {
  transform: translateY(-90px) scale(1.05);
  z-index: 6;
}

/* Seal */
.envelope__seal {
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: opacity 0.3s ease, transform 0.4s ease;
}

.envelope__seal-heart {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #d877a2 0%, #a84e7b 100%);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  box-shadow: 0 4px 12px rgba(168, 78, 123, 0.4);
  animation: sealPulse 2s infinite ease-in-out;
}

.envelope__seal-heart svg {
  width: 22px;
  height: 22px;
}

.envelope__seal-tag {
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-dark-rose);
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(168, 78, 123, 0.15);
}

.envelope__seal--opened {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.6);
  pointer-events: none;
}

@keyframes sealPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

.envelope__hint {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-dark-rose);
  font-weight: 500;
}

/* Expanded Stationery Letter Card */
.letter-card {
  width: 100%;
  max-width: 460px;
  background: #ffffff;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--pink-rose);
  box-shadow: var(--shadow-card);
  padding: clamp(1.4rem, 4vw, 2rem);
  position: relative;
  text-align: left;
  background-image: radial-gradient(var(--pink-baby) 1px, transparent 1px);
  background-size: 20px 20px;
  box-sizing: border-box;
}

.letter-card__stamp {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 36px;
  height: 44px;
  border: 1.5px dashed var(--pink-rose);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: rgba(255, 228, 239, 0.3);
}

.letter-card__content {
  max-height: 52vh;
  overflow-y: auto;
  padding-right: 8px;
}

.letter-card__salutation {
  font-size: clamp(1.4rem, 4vw, 1.7rem);
  color: var(--text-dark-rose);
  margin-bottom: 1.1rem;
}

.letter-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.letter-card__paragraph {
  font-size: clamp(0.9rem, 2.5vw, 0.98rem);
  line-height: 1.68;
  color: var(--text-primary);
}

.letter-card__signature {
  margin-top: 1.4rem;
  text-align: right;
  font-size: clamp(1.3rem, 3.5vw, 1.55rem);
  color: var(--text-dark-rose);
}

.letter-card__footer-accent {
  text-align: center;
  margin-top: 0.8rem;
  color: var(--pink-rose);
  font-size: 0.85rem;
  letter-spacing: 4px;
}

/* Expand Animation */
.letter-expand-enter-active {
  transition: all 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.letter-expand-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.92);
}

@media (max-width: 480px) {
  .envelope {
    width: 250px;
    height: 165px;
  }
  .envelope__flap--top {
    border-left-width: 125px;
    border-right-width: 125px;
    border-top-width: 95px;
  }
  .envelope__flap--bottom {
    border-left-width: 125px;
    border-right-width: 125px;
    border-bottom-width: 85px;
  }
  .envelope__flap--left,
  .envelope__flap--right {
    border-left-width: 125px;
    border-right-width: 125px;
  }
  .envelope__paper {
    left: 15px;
    width: 220px;
    height: 130px;
  }
  .letter-card {
    padding: 1.3rem 1.1rem;
  }
  .letter-card__content {
    max-height: 56vh;
  }
}
</style>

