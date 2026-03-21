import { $ } from './constants.js';
import { state } from './state.js';

export function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

let canvas, ctx;
let particles = [];
let animatingParticles = false;

export function initCanvas() {
  canvas = $('#effect-canvas');
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

export function createParticleGroupAt(x, y, color = null) {
  for (let i = 0; i < 10; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5 - 2,
      life: 1.0,
      size: Math.random() * 4 + 1,
      color: color || (state.isDark ? '#669df6' : '#4285f4')
    });
  }
  if (!animatingParticles) updateParticles();
}

function updateParticles() {
  animatingParticles = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => {
    p.x += p.vx; p.y += p.vy; p.life -= 0.03;
    ctx.fillStyle = p.color; ctx.globalAlpha = p.life;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    return p.life > 0;
  });
  if (particles.length > 0) requestAnimationFrame(updateParticles);
  else animatingParticles = false;
}

export function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
