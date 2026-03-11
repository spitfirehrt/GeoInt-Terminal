/* GEOINT Terminal JS */

// Clock
function updateClock() {
  const el = document.getElementById('terminal-clock');
  if (!el) return;
  const now = new Date();
  const utc = now.toUTCString().replace('GMT', 'UTC');
  const local = now.toLocaleTimeString('en-US', { hour12: false });
  el.textContent = `LOCAL ${local}  ·  ${utc.split(' ').slice(-2).join(' ')}`;
}
setInterval(updateClock, 1000);
updateClock();

// Command bar
const cmdInput = document.getElementById('cmd-input');
if (cmdInput) {
  const commands = {
    'help': () => alert('Commands: IRAN · MIDEAST · EUROPE · ASIA · AMERICAS · AFRICA · SEARCH [term]'),
    'iran': () => window.location.href = 'analysis/iran-war-2026.html',
    'home': () => window.location.href = '/index.html',
    'index': () => window.location.href = '/index.html',
  };

  cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = cmdInput.value.trim().toLowerCase();
      if (commands[val]) {
        commands[val]();
      } else if (val.startsWith('search ')) {
        alert(`Search: ${val.slice(7)} — feature coming soon`);
      } else if (val) {
        cmdInput.style.color = 'var(--red)';
        setTimeout(() => { cmdInput.style.color = ''; cmdInput.value = ''; }, 600);
      }
    }
    if (e.key === 'Escape') cmdInput.value = '';
  });

  // Focus command bar with '/'
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== cmdInput) {
      e.preventDefault();
      cmdInput.focus();
    }
  });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.filter-bar');
    group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.analysis-card').forEach(card => {
      if (filter === 'all' || card.dataset.region === filter || card.dataset.risk === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// TOC active state on scroll
const tocLinks = document.querySelectorAll('.toc-item');
if (tocLinks.length) {
  const sections = document.querySelectorAll('[data-section]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.section;
        tocLinks.forEach(l => {
          l.classList.toggle('active', l.dataset.target === id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

// Animate progress bars on load
window.addEventListener('load', () => {
  document.querySelectorAll('.rm-bar, .pb-fill').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = w; }, 200);
  });
});

// Animate card entrance
const cards = document.querySelectorAll('.analysis-card');
if (cards.length && 'IntersectionObserver' in window) {
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(8px)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = '';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px' });

  cards.forEach(card => cardObserver.observe(card));
}
