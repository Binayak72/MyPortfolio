// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.borderColor = 'rgba(0,229,255,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.borderColor = 'rgba(0,229,255,0.4)';
  });
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.right = '24px';
  navLinks.style.background = 'rgba(7,11,18,0.98)';
  navLinks.style.padding = '20px';
  navLinks.style.border = '1px solid rgba(255,255,255,0.06)';
  navLinks.style.borderRadius = '12px';
  navLinks.style.backdropFilter = 'blur(20px)';
});

// ===== TYPED TEXT =====
const titles = [
  'Cloud & DevOps Engineer',
  'Linux Systems Specialist',
  'Infrastructure Architect',
  'Automation Engineer',
  'Security-First Builder'
];

let titleIndex = 0;
let charIndex = 0;
let deleting = false;
let typingSpeed = 80;

function type() {
  const el = document.getElementById('typedText');
  const currentTitle = titles[titleIndex];

  if (!deleting) {
    el.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentTitle.length) {
      deleting = true;
      typingSpeed = 60;
      setTimeout(type, 2000);
      return;
    }
  } else {
    el.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 80;
    }
  }
  setTimeout(type, typingSpeed);
}

setTimeout(type, 1000);

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.animationDelay = (i * 80) + 'ms';
  observer.observe(card);
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});

// ===== PARTICLE EFFECT on HERO =====
const hero = document.querySelector('.hero');
function createParticle() {
  const p = document.createElement('div');
  p.style.cssText = `
    position: absolute;
    width: 2px; height: 2px;
    background: rgba(0,229,255,0.5);
    border-radius: 50%;
    pointer-events: none;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    animation: floatParticle ${4 + Math.random() * 6}s linear infinite;
    animation-delay: ${Math.random() * 5}s;
    z-index: 0;
  `;
  hero.appendChild(p);
}

for (let i = 0; i < 20; i++) createParticle();

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes floatParticle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px) translateX(${Math.random() > 0.5 ? '+' : '-'}40px); opacity: 0; }
  }
`;
document.head.appendChild(particleStyle);

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const val = parseInt(num.textContent);
        if (!isNaN(val)) animateCounter(num, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObserver.observe(statsEl);

// ===== SCROLL REVEAL for timeline, pub, cert =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item, .pub-card, .cert-card, .project-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(-20px)';
  el.style.transition = `opacity 0.5s ${i * 60}ms ease, transform 0.5s ${i * 60}ms ease`;
  revealObserver.observe(el);
});

console.log('%c Binayak Kumar Mahato — Cloud & DevOps Engineer ', 
  'background: #00e5ff; color: #070b12; font-weight: bold; padding: 8px 16px; font-size: 14px;');
console.log('%c github.com/Binayak72 | binayakmahato01@gmail.com ', 
  'color: #00e5ff; padding: 4px;');
