import { useEffect } from 'react';

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';
const HEADING_SELECTOR = 'h2, h3';

function prefersReducedMotion() {
  return window.matchMedia(REDUCE_QUERY).matches;
}

function isExcluded(heading) {
  return Boolean(heading.closest('.ph-item'));
}

function isUnsafe(heading) {
  return Boolean(heading.querySelector('a, button, input, textarea, select, img, svg'));
}

function headingLabel(heading) {
  const parts = [];
  const walk = (node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        parts.push(child.textContent);
        return;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) return;
      if (child.tagName === 'BR') {
        parts.push(' ');
        return;
      }
      walk(child);
    });
  };
  walk(heading);
  return parts.join('').replace(/\s+/g, ' ').trim();
}

function splitWords(heading) {
  if (heading.querySelector('.hz-word') || isUnsafe(heading)) return [];
  const label = heading.getAttribute('aria-label') || headingLabel(heading);
  if (!label) return [];
  const words = [];

  const visit = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = child.textContent.split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
            return;
          }
          const word = document.createElement('span');
          word.className = 'hz-word';
          word.setAttribute('aria-hidden', 'true');
          word.style.setProperty('--hz-i', String(words.length));
          word.textContent = part;
          words.push(word);
          fragment.appendChild(word);
        });
        child.replaceWith(fragment);
        return;
      }
      if (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains('hz-word')) {
        visit(child);
      }
    });
  };

  visit(heading);
  if (!words.length) return [];
  if (!heading.getAttribute('aria-label')) heading.setAttribute('aria-label', label);
  return words;
}

function preloaderVisible() {
  return Boolean(document.querySelector('.preloader-overlay'));
}

export default function HeadingZoom() {
  useEffect(() => {
    const reduceMedia = window.matchMedia(REDUCE_QUERY);
    const pending = new Set();
    let intersection;

    const finish = (heading) => {
      if (heading.dataset.hz !== 'play') return;
      heading.dataset.hz = 'done';
    };

    const play = (heading) => {
      if (prefersReducedMotion() || preloaderVisible()) return;
      if (heading.dataset.hz === 'play' || heading.dataset.hz === 'done') return;
      if (isUnsafe(heading)) {
        pending.delete(heading);
        intersection.unobserve(heading);
        heading.dataset.hz = 'done';
        return;
      }
      pending.delete(heading);
      intersection.unobserve(heading);
      const words = splitWords(heading);
      if (!words.length) {
        heading.dataset.hz = 'done';
        return;
      }
      heading.dataset.hz = 'play';
      const last = words[words.length - 1];
      last.addEventListener('animationend', () => finish(heading), { once: true });
      window.setTimeout(() => finish(heading), 450 + Math.max(0, words.length - 1) * 100 + 80);
    };

    const flushVisible = () => {
      if (preloaderVisible()) return;
      pending.forEach((heading) => {
        if (!heading.isConnected) {
          pending.delete(heading);
          return;
        }
        const rect = heading.getBoundingClientRect();
        const inView = rect.bottom > 0 && rect.top < window.innerHeight * 0.92 && rect.height > 0;
        if (inView) play(heading);
      });
    };

    const scan = () => {
      if (prefersReducedMotion()) return;
      document.querySelectorAll(HEADING_SELECTOR).forEach((heading) => {
        if (heading.dataset.hz || isExcluded(heading) || isUnsafe(heading)) return;
        heading.dataset.hz = 'watch';
        pending.add(heading);
        intersection.observe(heading);
      });
      flushVisible();
    };

    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      queueMicrotask(() => {
        queued = false;
        scan();
      });
    };

    const onScroll = () => flushVisible();

    const onReduceChange = () => {
      if (!prefersReducedMotion()) {
        schedule();
        return;
      }
      pending.clear();
      intersection.disconnect();
      document.querySelectorAll('[data-hz]').forEach((heading) => {
        delete heading.dataset.hz;
      });
    };

    intersection = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) play(entry.target);
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.15 });

    const mutations = new MutationObserver(schedule);
    mutations.observe(document.body, { childList: true, subtree: true });
    reduceMedia.addEventListener('change', onReduceChange);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    scan();

    return () => {
      intersection.disconnect();
      mutations.disconnect();
      reduceMedia.removeEventListener('change', onReduceChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      pending.forEach((heading) => {
        if (heading.dataset.hz === 'watch') delete heading.dataset.hz;
      });
      pending.clear();
    };
  }, []);

  return null;
}
