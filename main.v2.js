'use strict';

const FONT_SCALE_STORAGE_KEY = 'ifsc-digital-book-font-scale';
const FONT_SCALE_LEVELS = ['small', 'normal', 'large', 'xlarge'];
const FONT_SCALE_LABELS = {
  small: 'Pequeno',
  normal: 'Padrão',
  large: 'Grande',
  xlarge: 'Extra'
};

let activeFontScale = localStorage.getItem(FONT_SCALE_STORAGE_KEY);
if (!FONT_SCALE_LEVELS.includes(activeFontScale)) {
  activeFontScale = 'normal';
}
document.documentElement.dataset.fontScale = activeFontScale;

const THEME_STORAGE_KEY = 'ifsc-digital-book-theme';
const THEME_MODES = ['light', 'dark', 'system'];
let activeThemeMode = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
let systemThemeMediaQuery = null;

function applyTheme(mode) {
  const root = document.documentElement;
  let resolvedMode = mode;

  if (mode === 'system') {
    systemThemeMediaQuery = systemThemeMediaQuery || window.matchMedia('(prefers-color-scheme: dark)');
    resolvedMode = systemThemeMediaQuery.matches ? 'dark' : 'light';
  }

  if (resolvedMode === 'dark') {
    root.classList.add('dark');
    document.body?.classList.add('dark');
  } else {
    root.classList.remove('dark');
    document.body?.classList.remove('dark');
  }

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.dataset.mode = mode;
    toggle.setAttribute('aria-pressed', String(resolvedMode === 'dark'));
    const label = toggle.querySelector('[data-mode-text]');
    if (label) {
      const labels = { light: 'LIGHT', dark: 'DARK', system: 'AUTO' };
      label.textContent = labels[mode] || 'LIGHT';
    }
  }
}

function updateTheme(mode) {
  activeThemeMode = mode;
  localStorage.setItem(THEME_STORAGE_KEY, mode);
  applyTheme(mode);
}

function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) {
    applyTheme(activeThemeMode);
    return;
  }

  const handleSystemChange = (event) => {
    if (activeThemeMode === 'system') {
      applyTheme('system');
    }
  };

  systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemThemeMediaQuery.addEventListener('change', handleSystemChange);

  toggle.addEventListener('click', () => {
    const currentIndex = THEME_MODES.indexOf(activeThemeMode);
    const nextMode = THEME_MODES[(currentIndex + 1) % THEME_MODES.length];
    updateTheme(nextMode);
  });

  applyTheme(activeThemeMode);
}

function applyFontScale(scale) {
  if (!FONT_SCALE_LEVELS.includes(scale)) {
    scale = 'normal';
  }

  document.documentElement.dataset.fontScale = scale;

  const label = document.querySelector('[data-font-label]');
  if (label) {
    label.textContent = FONT_SCALE_LABELS[scale] || FONT_SCALE_LABELS.normal;
  }

  const decreaseBtn = document.getElementById('font-decrease');
  const increaseBtn = document.getElementById('font-increase');
  const index = FONT_SCALE_LEVELS.indexOf(scale);

  if (decreaseBtn) {
    decreaseBtn.disabled = index <= 0;
  }
  if (increaseBtn) {
    increaseBtn.disabled = index >= FONT_SCALE_LEVELS.length - 1;
  }
}

function updateFontScale(scale) {
  activeFontScale = FONT_SCALE_LEVELS.includes(scale) ? scale : 'normal';
  localStorage.setItem(FONT_SCALE_STORAGE_KEY, activeFontScale);
  applyFontScale(activeFontScale);
}

function setupFontControls() {
  const decreaseBtn = document.getElementById('font-decrease');
  const increaseBtn = document.getElementById('font-increase');

  if (!decreaseBtn || !increaseBtn) {
    applyFontScale(activeFontScale);
    return;
  }

  const changeScale = (step) => {
    const currentIndex = FONT_SCALE_LEVELS.indexOf(activeFontScale);
    const nextIndex = Math.min(Math.max(currentIndex + step, 0), FONT_SCALE_LEVELS.length - 1);
    updateFontScale(FONT_SCALE_LEVELS[nextIndex]);
  };

  decreaseBtn.addEventListener('click', () => changeScale(-1));
  increaseBtn.addEventListener('click', () => changeScale(1));

  applyFontScale(activeFontScale);
}

function activateCopyButtons() {
  const codeBlocks = document.querySelectorAll('.code-block, .code-container, pre[class*="language-"]');

  codeBlocks.forEach(block => {
    const target = block.classList.contains('code-block') || block.classList.contains('code-container')
      ? block
      : block.parentElement;
    if (!target || target.querySelector('.copy-btn')) {
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-btn';
    button.textContent = 'Copiar';

    button.addEventListener('click', () => {
      const codeElement = target.querySelector('pre code, code');
      if (!codeElement) {
        return;
      }

      navigator.clipboard?.writeText(codeElement.innerText).then(() => {
        button.textContent = 'Copiado!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'Copiar';
          button.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        button.textContent = 'Erro';
      });
    });

    target.appendChild(button);
  });
}

function initializeReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  const mainContent = document.querySelector('main');

  if (!progressBar || !mainContent) {
    return;
  }

  const updateProgress = () => {
    const contentHeight = mainContent.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = contentHeight > 0 ? Math.min(scrollPosition / contentHeight, 1) : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
}

function buildDynamicToc() {
  const tocList = document.getElementById('toc-list');
  if (!tocList) {
    return;
  }

  const sections = document.querySelectorAll('[data-toc="section"]');
  if (sections.length === 0) {
    tocList.innerHTML = '<li class="text-slate-400">Nada a exibir</li>';
    return;
  }

  const fragment = document.createDocumentFragment();
  const entries = [];

  sections.forEach((section, index) => {
    const heading = section.querySelector('h2, h3');
    const title = section.dataset.tocTitle || heading?.textContent?.trim();
    if (!title) {
      return;
    }

    const id = section.id ? section.id : `section-${index + 1}`;
    section.id = id;

    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.className = 'toc-link';
    link.textContent = title;

    const level = heading ? Number(heading.tagName.slice(1)) : 2;
    if (level >= 3) {
      li.style.paddingLeft = '1.25rem';
    }

    li.appendChild(link);
    fragment.appendChild(li);
    entries.push({ section, link });
  });

  tocList.innerHTML = '';
  tocList.appendChild(fragment);

  const observer = new IntersectionObserver((observerEntries) => {
    observerEntries.forEach(entry => {
      const tocEntry = entries.find(item => item.section === entry.target);
      if (!tocEntry) {
        return;
      }

      if (entry.isIntersecting) {
        entries.forEach(item => item.link.classList.remove('active'));
        tocEntry.link.classList.add('active');
      }
    });
  }, {
    rootMargin: '-55% 0px -40% 0px',
    threshold: 0.1
  });

  entries.forEach(({ section }) => observer.observe(section));
}

function collapseLogoWrapperIfNeeded() {
  const wrapper = document.querySelector('header .flex.flex-wrap');
  if (!wrapper) {
    return;
  }

  const validateVisibility = () => {
    const images = Array.from(wrapper.querySelectorAll('img'));
    const visible = images.filter(img => img.naturalWidth > 0 && img.style.display !== 'none');
    if (visible.length === 0) {
      wrapper.style.display = 'none';
    }
  };

  const images = Array.from(wrapper.querySelectorAll('img'));
  let pending = images.length;

  if (pending === 0) {
    return;
  }

  images.forEach(img => {
    if (img.complete) {
      pending -= 1;
    } else {
      img.addEventListener('load', () => {
        pending -= 1;
        if (pending <= 0) {
          validateVisibility();
        }
      });
      img.addEventListener('error', () => {
        pending -= 1;
        if (pending <= 0) {
          validateVisibility();
        }
      });
    }
  });

  if (pending === 0) {
    validateVisibility();
  }
}

function setupShrinkableHeader() {
  const header = document.querySelector('header');
  if (!header) {
    return;
  }

  header.classList.add('shrinkable-header');

  const threshold = 80;
  let ticking = false;

  const updateState = () => {
    const shouldCompact = window.scrollY > threshold;
    header.classList.toggle('header-compact', shouldCompact);
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateState);
      ticking = true;
    }
  };

  updateState();
  window.addEventListener('scroll', onScroll, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  setupFontControls();
  setupThemeToggle();
  activateCopyButtons();
  initializeReadingProgress();
  buildDynamicToc();
  collapseLogoWrapperIfNeeded();
  setupShrinkableHeader();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = new URL('service-worker.js', window.location.href);
    navigator.serviceWorker.register(swUrl.href).catch((error) => {
      console.error('Falha ao registrar o service worker:', error);
    });
  });
}
