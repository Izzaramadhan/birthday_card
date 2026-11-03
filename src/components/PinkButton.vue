<template>
  <button
    class="pink-btn"
    :class="[
      `pink-btn--${variant}`,
      `pink-btn--${size}`,
      { 'pink-btn--pulse': pulse, 'pink-btn--disabled': disabled }
    ]"
    :disabled="disabled"
    :aria-label="ariaLabel || label"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots.icon || icon" class="pink-btn__icon">
      <slot name="icon">
        <component :is="icon" v-if="icon" :size="iconSize" />
      </slot>
    </span>
    <span class="pink-btn__text">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  variant: {
    type: String,
    default: 'primary', // 'primary', 'secondary', 'outline', 'ghost'
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost'].includes(v)
  },
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  pulse: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: ''
  }
});

defineEmits(['click']);

const iconSize = computed(() => {
  if (props.size === 'sm') return 16;
  if (props.size === 'lg') return 22;
  return 18;
});
</script>

<style scoped>
.pink-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-full);
  font-family: var(--font-ui);
  font-weight: 600;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all var(--transition-normal);
  position: relative;
  user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}

/* Sizes */
.pink-btn--sm {
  min-height: 40px;
  padding: 8px 18px;
  font-size: 0.875rem;
}

.pink-btn--md {
  min-height: 48px;
  padding: 12px 26px;
  font-size: 1rem;
}

.pink-btn--lg {
  min-height: 54px;
  padding: 14px 34px;
  font-size: 1.1rem;
}

/* Primary Variant */
.pink-btn--primary {
  background: linear-gradient(135deg, #F5A9C8 0%, #D877A2 100%);
  color: var(--white);
  box-shadow: var(--shadow-button);
}

.pink-btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #f7b5d1 0%, #dd82ab 100%);
  box-shadow: var(--shadow-button-hover);
}

.pink-btn--primary:active:not(:disabled) {
  transform: translateY(1px) scale(0.98);
}

/* Secondary Variant */
.pink-btn--secondary {
  background: var(--pink-baby);
  color: var(--text-dark-rose);
  box-shadow: var(--shadow-subtle);
}

.pink-btn--secondary:hover:not(:disabled) {
  background: var(--pink-light);
  transform: translateY(-2px);
}

.pink-btn--secondary:active:not(:disabled) {
  transform: translateY(1px) scale(0.98);
}

/* Outline Variant */
.pink-btn--outline {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  color: var(--text-dark-rose);
  border: 1.5px solid var(--pink-rose);
}

.pink-btn--outline:hover:not(:disabled) {
  background: var(--pink-baby);
  border-color: var(--pink-accent);
  transform: translateY(-2px);
}

/* Ghost Variant */
.pink-btn--ghost {
  background: transparent;
  color: var(--text-dark-rose);
}

.pink-btn--ghost:hover:not(:disabled) {
  background: rgba(255, 228, 239, 0.5);
}

/* Pulse animation */
.pink-btn--pulse {
  animation: pinkPulse 2.4s infinite ease-in-out;
}

@keyframes pinkPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 22px -3px rgba(216, 119, 162, 0.38);
  }
  50% {
    transform: scale(1.025);
    box-shadow: 0 12px 30px 2px rgba(216, 119, 162, 0.55);
  }
}

/* Disabled */
.pink-btn--disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.pink-btn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

