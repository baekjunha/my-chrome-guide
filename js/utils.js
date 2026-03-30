import { $ } from './constants.js';
import { store } from './store.js';

let toastTimer = null;

/**
 * 두 문자열 간의 편집 거리(Levenshtein Distance)를 계산하여 유사도 측정
 */
export function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * 현재 운영체제 감지 (Mac, Win, 기타)
 */
export function getPlatform() {
  const platform = navigator.platform.toLowerCase();
  if (platform.includes('mac')) return 'mac';
  if (platform.includes('win')) return 'win';
  return 'other';
}

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
