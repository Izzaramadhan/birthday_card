<template>
  <div class="heart-formation-wrap" ref="containerRef">
    <canvas ref="canvasRef" class="heart-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['formed']);

const containerRef = ref(null);
const canvasRef = ref(null);

let animFrameId = null;
let particles = [];
let startTime = null;
let isFormed = false;

const HEART_COLORS = ['#F5A9C8', '#D877A2', '#FFD1E3', '#FFAEC9', '#E06B9A'];

function drawHeartPath(ctx, x, y, size, color, alpha = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(0, topCurveHeight);
  // Top left curve
  ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
  // Top right curve
  ctx.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function initParticles(width, height) {
  const isMobile = width < 500;
  const count = isMobile ? 48 : 68;
  const cx = width / 2;
  const cy = height / 2 - 10;
  const scale = isMobile ? Math.min(width, height) * 0.024 : Math.min(width, height) * 0.028;

  particles = [];

  for (let i = 0; i < count; i++) {
    // Parametric angle t along heart curve
    const t = (i / count) * Math.PI * 2;
    // Heart curve formula
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    const targetX = cx + hx * scale;
    const targetY = cy + hy * scale;

    // Random start position scattered across or outside view
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.min(width, height) * (0.45 + Math.random() * 0.4);
    const startX = cx + Math.cos(angle) * dist;
    const startY = cy + Math.sin(angle) * dist;

    particles.push({
      x: startX,
      y: startY,
      startX,
      startY,
      targetX,
      targetY,
      hx,
      hy,
      size: Math.random() * 4 + 7,
      color: HEART_COLORS[i % HEART_COLORS.length],
      driftPhase: Math.random() * Math.PI * 2,
      speed: 0.85 + Math.random() * 0.4
    });
  }
}

function resizeCanvas() {
  if (!canvasRef.value || !containerRef.value) return;
  const canvas = canvasRef.value;
  const rect = containerRef.value.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  initParticles(rect.width, rect.height);
}

function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = (timestamp - startTime) / 1000; // in seconds

  if (!canvasRef.value || !containerRef.value) return;
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.width / dpr;
  const height = canvas.height / dpr;
  const cx = width / 2;
  const cy = height / 2 - 10;
  const isMobile = width < 500;
  const baseScale = isMobile ? Math.min(width, height) * 0.024 : Math.min(width, height) * 0.028;

  ctx.clearRect(0, 0, width, height);

  // Transition progress to form heart: 0 -> 1 over 1.6 seconds with smooth ease
  const gatherDuration = 1.6;
  const rawProgress = Math.min(1, elapsed / gatherDuration);
  // Ease out cubic
  const progress = 1 - Math.pow(1 - rawProgress, 3);

  // Heartbeat pulse factor after forming
  let pulseFactor = 1;
  if (elapsed >= gatherDuration) {
    if (!isFormed) {
      isFormed = true;
      emit('formed');
    }
    // Realistic heartbeat rhythm (double pulse)
    const cycle = (elapsed - gatherDuration) * 2.8;
    const beat = Math.sin(cycle);
    pulseFactor = 1 + (beat > 0.4 ? Math.sin(cycle * 2) * 0.075 : 0);
  }

  // Draw soft radial aura in center when formed
  if (progress > 0.6) {
    const auraAlpha = Math.min(0.25, (progress - 0.6) * 0.6) * pulseFactor;
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120 * pulseFactor);
    grad.addColorStop(0, `rgba(245, 169, 200, ${auraAlpha})`);
    grad.addColorStop(1, 'rgba(255, 248, 251, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 120 * pulseFactor, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw each particle
  for (const p of particles) {
    // Current target with pulsation
    const pulsedTargetX = cx + p.hx * baseScale * pulseFactor;
    const pulsedTargetY = cy + p.hy * baseScale * pulseFactor;

    // Position interpolation
    let curX, curY;
    if (progress < 1) {
      curX = p.startX + (p.targetX - p.startX) * progress;
      curY = p.startY + (p.targetY - p.startY) * progress;
    } else {
      // Gentle micro-drift around pulse
      const drift = Math.sin(elapsed * 2 + p.driftPhase) * 1.5;
      curX = pulsedTargetX + drift;
      curY = pulsedTargetY + drift;
    }

    drawHeartPath(ctx, curX, curY, p.size * pulseFactor, p.color, 0.9);
  }

  animFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  animFrameId = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
  window.removeEventListener('resize', resizeCanvas);
});
</script>

<style scoped>
.heart-formation-wrap {
  width: 100%;
  height: 240px;
  max-width: 380px;
  margin: 0 auto 1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

@media (max-width: 480px) {
  .heart-formation-wrap {
    height: 200px;
  }
}
</style>

