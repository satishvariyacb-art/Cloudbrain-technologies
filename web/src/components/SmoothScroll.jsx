import { useEffect } from 'react';

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

function isDiscreteWheel(event) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE || event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return true;
  }
  const distance = Math.abs(event.deltaY);
  return event.deltaMode === WheelEvent.DOM_DELTA_PIXEL
    && distance >= 100
    && distance % 10 === 0
    && Math.abs(event.deltaX) < 1;
}

function insideIndependentScroller(target) {
  return target instanceof Element
    && Boolean(target.closest('.modal-content, .cp-lightbox, [role="dialog"]'));
}

export default function SmoothScroll() {
  useEffect(() => {
    const reduceQuery = window.matchMedia(REDUCE_QUERY);
    const finePointer = window.matchMedia('(any-pointer: fine)');
    if (reduceQuery.matches || !finePointer.matches) return undefined;

    let target = null;
    let lastWritten = null;
    let frame = 0;

    const maxScroll = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

    const stop = () => {
      target = null;
      lastWritten = null;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const tick = () => {
      frame = 0;
      if (target === null) return;

      const current = window.scrollY;
      if (lastWritten !== null && Math.abs(current - lastWritten) > 1.5) {
        stop();
        return;
      }

      target = Math.min(maxScroll(), Math.max(0, target));
      const delta = target - current;
      if (Math.abs(delta) < 0.6) {
        window.scrollTo({ top: target, left: 0, behavior: 'instant' });
        stop();
        return;
      }

      window.scrollTo({ top: current + delta * 0.28, left: 0, behavior: 'instant' });
      lastWritten = window.scrollY;
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (event) => {
      if (reduceQuery.matches || !finePointer.matches) return;
      if (event.ctrlKey || event.metaKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (!isDiscreteWheel(event)) return;
      if (document.body.style.overflow === 'hidden') return;
      if (insideIndependentScroller(event.target)) return;

      event.preventDefault();
      window.scrollTo({ top: window.scrollY, left: 0, behavior: 'instant' });

      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 32
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : 1;
      const base = target === null ? window.scrollY : target;
      target = Math.min(maxScroll(), Math.max(0, base + event.deltaY * unit));
      lastWritten = window.scrollY;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onKeyDown = (event) => {
      if ([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        stop();
      }
    };

    const onPreferenceChange = () => {
      if (reduceQuery.matches || !finePointer.matches) stop();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    reduceQuery.addEventListener('change', onPreferenceChange);
    finePointer.addEventListener('change', onPreferenceChange);

    return () => {
      stop();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      reduceQuery.removeEventListener('change', onPreferenceChange);
      finePointer.removeEventListener('change', onPreferenceChange);
    };
  }, []);

  return null;
}
