import { $ } from './constants.js';
import { store } from './store.js';

let toastTimer = null;

export function showToast(message) {
  let toast = $('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  clearTimeout(toastTimer);

  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/**
 * 클릭 지점에 "복사됨!" 같은 텍스트 애니메이션 생성
 */
export function createFloatingText(x, y, text) {
  const el = document.createElement('div');
  el.className = 'floating-feedback';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);

  // 애니메이션 후 제거
  setTimeout(() => el.remove(), 1000);
}

let canvas, ctx;
let particles = [];
let animatingParticles = false;

export function initCanvas() {
  canvas = $('#effect-canvas');
  if (!canvas) return;
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
      color: color || getComputedStyle(document.body).getPropertyValue('--accent').trim() || (store.state.isDark ? '#669df6' : '#1e40af')
    });
  }
  if (!animatingParticles) updateParticles();
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function updateParticles() {
  if (particles.length === 0) {
    animatingParticles = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  
  animatingParticles = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1; // gravity
    p.life -= 0.02;
    
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    
    if (p.life <= 0) particles.splice(i, 1);
  });
  
  requestAnimationFrame(updateParticles);
}
