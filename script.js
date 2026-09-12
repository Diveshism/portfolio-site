document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('themeToggle');
const root = document.documentElement;
const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

applyTheme(stored || (prefersDark ? 'dark' : 'light'));

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll progress bar + sticky nav shadow
const progressBar = document.getElementById('scrollProgress');
const nav = document.querySelector('.nav');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  nav.classList.toggle('scrolled', scrollTop > 10);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Highlight the active nav link as sections scroll into view
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

// Fade/slide elements in as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = reduceMotion ? '0s' : (i % 5) * 0.08 + 's';
  revealObserver.observe(el);
});

// Typewriter effect cycling through taglines in the hero subtitle
const taglineEl = document.querySelector('.subtitle');
const taglines = [
  'MBA Candidate — International Business & Marketing',
  'Big Data Analyst, Accenture (2021–2025)',
  'Blending Analytics with Brand Strategy',
];

if (taglineEl && !reduceMotion) {
  let taglineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = taglines[taglineIndex];
    charIndex += deleting ? -1 : 1;
    taglineEl.textContent = current.substring(0, charIndex);

    let delay = deleting ? 30 : 45;
    if (!deleting && charIndex === current.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      delay = 300;
    }
    setTimeout(typeLoop, delay);
  }

  taglineEl.textContent = '';
  setTimeout(typeLoop, 900);
} else if (taglineEl) {
  taglineEl.textContent = taglines[0];
}
