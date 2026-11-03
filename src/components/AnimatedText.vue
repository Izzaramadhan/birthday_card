<template>
  <div class="animated-text-wrap" @click="fastForward">
    <div
      v-for="(line, index) in lines"
      :key="index"
      class="text-line"
      :class="{
        'text-line--visible': index <= currentVisibleIndex,
        'text-line--highlight': isHighlightLine(line)
      }"
    >
      <p>{{ line }}</p>
    </div>

    <!-- Skip Hint -->
    <div
      v-if="allowSkip && !isCompleted"
      class="skip-hint"
      @click.stop="fastForward"
    >
      <button class="skip-btn" type="button" aria-label="Percepat teks">
        <span>⚡ Ketuk untuk lewati animasi</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  lines: {
    type: Array,
    required: true
  },
  intervalMs: {
    type: Number,
    default: 1200
  },
  allowSkip: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['complete']);

const currentVisibleIndex = ref(0);
const isCompleted = ref(false);
let lineTimer = null;

const isHighlightLine = (line) => {
  return line.includes('Dyanova Ganesafitri');
};

const showNextLine = () => {
  if (currentVisibleIndex.value < props.lines.length - 1) {
    currentVisibleIndex.value += 1;
    lineTimer = setTimeout(showNextLine, props.intervalMs);
  } else {
    isCompleted.value = true;
    emit('complete');
  }
};

const fastForward = () => {
  if (isCompleted.value) return;
  if (lineTimer) {
    clearTimeout(lineTimer);
    lineTimer = null;
  }
  currentVisibleIndex.value = props.lines.length - 1;
  isCompleted.value = true;
  emit('complete');
};

onMounted(() => {
  if (props.lines.length <= 1) {
    isCompleted.value = true;
    emit('complete');
    return;
  }
  lineTimer = setTimeout(showNextLine, props.intervalMs);
});

onBeforeUnmount(() => {
  if (lineTimer) {
    clearTimeout(lineTimer);
    lineTimer = null;
  }
});
</script>

<style scoped>
.animated-text-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
  cursor: pointer;
}

.text-line {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.text-line--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.text-line p {
  font-size: clamp(1.05rem, 3.5vw, 1.3rem);
  font-weight: 500;
  line-height: 1.6;
  color: var(--text-primary);
}

.text-line--highlight p {
  color: var(--text-dark-rose);
  font-weight: 700;
  background: linear-gradient(135deg, rgba(255, 209, 227, 0.5), rgba(255, 228, 239, 0.8));
  padding: 6px 16px;
  border-radius: var(--radius-md);
  display: inline-block;
}

.skip-hint {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.skip-btn {
  background: rgba(255, 255, 255, 0.7);
  border: 1px dashed var(--pink-rose);
  border-radius: var(--radius-full);
  padding: 6px 14px;
  font-size: 0.75rem;
  color: var(--text-dark-rose);
  font-family: var(--font-ui);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.skip-btn:hover {
  background: var(--pink-baby);
  border-color: var(--pink-accent);
}

@media (prefers-reduced-motion: reduce) {
  .text-line {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
</style>

