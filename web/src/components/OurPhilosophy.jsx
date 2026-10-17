import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import SectionBadge from './SectionBadge';


function ValueIcon({ id, uid }) {
  const common = {
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  };

  if (id === 'red') {
    const clip = `ph-icon-clip-red-${uid}`;
    return (
      <svg width="59" height="59" viewBox="0 0 59 59" {...common}>
        <g clipPath={`url(#${clip})`}>
          <path
            d="M28.2026 0.115112C13.9942 0.115112 2.45264 11.6802 2.45264 25.913C2.45264 38.061 12.3067 47.9365 24.4331 47.9365C36.5571 47.9365 46.4087 38.0635 46.4087 25.9178C46.4087 15.859 38.2422 7.67822 28.2026 7.67822C18.163 7.67822 9.99658 15.859 9.99658 25.9178C9.9877 33.8818 16.4643 40.3708 24.4283 40.3782H24.4331C32.396 40.3694 38.8688 33.8808 38.86 25.9178C38.8661 20.0406 34.0798 15.2474 28.2026 15.2413C22.3255 15.2474 17.5392 20.0406 17.5453 25.9178C17.542 29.7092 20.6369 32.8118 24.4283 32.8151H24.4331C28.2244 32.8119 31.3193 29.7092 31.316 25.9178H28.8636C28.8658 28.3822 26.8968 30.358 24.4331 30.3627C21.967 30.3606 19.9956 28.3838 19.9977 25.9178C19.993 21.366 23.6508 17.6984 28.2026 17.6937C32.7544 17.6984 36.4123 21.366 36.4076 25.9178C36.4149 32.5538 31.0684 37.9158 24.4331 37.9258C17.7946 37.9197 12.4416 32.5563 12.449 25.9178C12.449 17.1816 19.4913 10.1306 28.2026 10.1306C36.9139 10.1306 43.9563 17.1816 43.9563 25.9178C43.9563 36.7411 35.229 45.4842 24.4331 45.4842C13.6345 45.4842 4.90502 36.7389 4.90502 25.913C4.90502 13.0029 15.3221 2.56749 28.2026 2.56749C41.0832 2.56749 51.5003 13.0029 51.5003 25.913V44.258H46.5955V39.3532H44.1431V51.7875L45.3022 52.9994C46.6563 54.4069 47.4188 56.5409 47.8456 58.7567H50.2501C50.6743 56.5427 51.439 54.4074 52.7935 52.9994L53.9526 51.7875V25.913C53.9526 11.6802 42.4111 0.115112 28.2026 0.115112ZM46.5955 46.7104H51.5003V50.8056L51.0261 51.299C50.1508 52.2089 49.5398 53.2797 49.0479 54.3932C48.5564 53.2798 47.9452 52.2091 47.0697 51.299L46.5955 50.8056V46.7104Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id={clip}>
            <rect width="58.8571" height="58.8571" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (id === 'green') {
    const clip = `ph-icon-clip-green-${uid}`;
    return (
      <svg width="58" height="58" viewBox="0 0 58 58" {...common}>
        <g clipPath={`url(#${clip})`}>
          <path
            d="M24.5207 0.353821C23.9016 0.972884 22.2667 1.63604 20.7682 1.9964H20.7635C18.7968 2.47129 16.7357 2.56097 14.6935 2.33152C13.8893 2.23921 13.0525 2.10105 12.3807 1.91616C11.7089 1.73127 11.2165 1.45053 11.1252 1.35919L9.4165 3.07257C10.0719 3.72799 10.876 4.01044 11.7388 4.24786C12.6015 4.48529 13.5396 4.62829 14.4198 4.72931C16.4283 4.95547 18.4726 4.77864 20.4803 4.39419L0.354004 24.5205L2.06266 26.2291L22.189 6.10284C21.8095 8.10519 21.611 10.146 21.8538 12.1728C21.9548 13.0503 22.103 13.9843 22.34 14.8444C22.5779 15.7074 22.858 16.5115 23.5153 17.1666L25.224 15.458C25.1321 15.3664 24.8521 14.874 24.667 14.2025C24.4819 13.5309 24.3439 12.6939 24.2516 11.8896V11.8849C24.0086 9.85597 24.1256 7.79983 24.5915 5.8102C24.9522 4.31361 25.6112 2.6806 26.2293 2.06248L24.5207 0.353821ZM38.6667 14.4998V16.7654L39.2284 17.4026C41.9804 20.4992 43.4999 24.4983 43.5 28.6411V28.9951H26.5833V31.2654L27.145 31.9027C29.897 34.9992 31.4165 38.9983 31.4167 43.1411V43.4951H14.5V45.7654L15.0617 46.4026C17.8137 49.4992 19.3332 53.4983 19.3333 57.6411V57.9998H21.75V57.6411C21.7499 53.3487 20.1552 49.2878 17.5444 45.9118H33.8333V43.1411C33.8332 38.8487 32.2386 34.7878 29.6278 31.4118H45.9167V28.6411C45.9165 24.3509 44.3241 20.2916 41.7158 16.9165H58V14.4998H38.6667Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id={clip}>
            <rect width="58" height="58" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (id === 'yellow') {
    const clip = `ph-icon-clip-yellow-${uid}`;
    return (
      <svg width="58" height="58" viewBox="0 0 58 58" {...common}>
        <g clipPath={`url(#${clip})`}>
          <path
            d="M16.8553 1.20822L1.99186 1.99175L1.20833 16.8552L3.625 16.9779L4.29053 4.29041L16.978 3.62489L16.8553 1.20822ZM41.1447 1.20822L41.022 3.62489L53.7095 4.29042L54.375 16.9779L56.7917 16.8552L56.0081 1.99175L41.1447 1.20822ZM29 9.67599C23.4821 9.67599 17.9665 11.8557 13.877 16.218L13.8628 16.2321L7.5804 23.3311C5.23206 25.6753 2.44478 27.7916 0 27.7916V30.2082C2.44478 30.2082 5.23206 32.3245 7.5804 34.6687L13.8628 41.7676L13.877 41.7819C22.056 50.5064 35.944 50.5064 44.123 41.7819L44.1373 41.7676L50.4197 34.6687C52.7679 32.3245 55.5552 30.2082 58 30.2082V27.7916C55.5552 27.7916 52.7679 25.6753 50.4196 23.3311L44.1372 16.2321L44.123 16.218C40.0335 11.8557 34.5179 9.67599 29 9.67599ZM29 12.0738C33.8658 12.0738 38.7298 14.0049 42.353 17.8653L48.659 24.9926L48.6873 25.0209C50.2659 26.5995 52.1916 27.994 54.2759 28.9999C52.1916 30.0058 50.2659 31.4003 48.6873 32.9789L48.659 33.0072L42.353 40.1345C35.1065 47.8553 22.8935 47.8553 15.647 40.1345L15.6375 40.1297L9.34098 33.0072L9.31266 32.9789C7.73409 31.4003 5.80845 30.0058 3.72412 28.9999C5.80845 27.994 7.73409 26.5995 9.31266 25.0209L9.34098 24.9926L15.6375 17.87L15.647 17.8653C19.2702 14.0049 24.1342 12.0738 29 12.0738ZM29 21.7499C26.684 21.7499 24.7956 22.6619 23.5672 24.0438C22.3388 25.4258 21.75 27.221 21.75 28.9999C21.75 30.7788 22.3388 32.574 23.5672 33.9559C24.7956 35.3379 26.684 36.2499 29 36.2499C31.316 36.2499 33.2044 35.3379 34.4328 33.9559C35.6612 32.574 36.25 30.7788 36.25 28.9999C36.25 27.221 35.6612 25.4258 34.4328 24.0438C33.2044 22.6619 31.316 21.7499 29 21.7499ZM29 24.1666C30.7118 24.1666 31.8442 24.765 32.6297 25.6486C33.4152 26.5323 33.8333 27.758 33.8333 28.9999C33.8333 30.2418 33.4152 31.4674 32.6297 32.3511C31.8442 33.2348 30.7118 33.8332 29 33.8332C27.2882 33.8332 26.1558 33.2348 25.3703 32.3511C24.5848 31.4674 24.1667 30.2418 24.1667 28.9999C24.1667 27.758 24.5848 26.5323 25.3703 25.6486C26.1558 24.765 27.2882 24.1666 29 24.1666ZM3.625 41.0219L1.20833 41.1446L1.99186 56.008L16.8553 56.7915L16.978 54.3749L4.29053 53.7094L3.625 41.0219ZM54.375 41.0219L53.7095 53.7094L41.022 54.3749L41.1447 56.7915L56.0081 56.008L56.7917 41.1446L54.375 41.0219Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id={clip}>
            <rect width="58" height="58" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg width="58" height="58" viewBox="0 0 58 58" {...common}>
      <path
        d="M7.25 36.25V37.4583C7.25 41.4767 4.01838 44.7083 0 44.7083V47.125C4.89627 47.125 8.799 43.3977 9.42122 38.6667H33.8333C33.8333 42.0177 31.1427 44.7083 27.7917 44.7083H19.3333V47.125H27.7917H36.4907L45.9544 43.1838C47.3639 42.5961 48.8784 42.2919 50.4054 42.2917H50.75C53.1652 42.2917 54.9276 44.1361 55.3001 46.4406L33.5879 55.5833H0V58H34.0788L58 47.9274V47.125C58 43.1352 54.7397 39.875 50.75 39.875H50.4054C48.5593 39.8753 46.7285 40.2407 45.0246 40.9512L36.0093 44.7083H33.6681C35.2503 43.1696 36.25 41.0379 36.25 38.6667V36.25H8.45833H7.25Z"
        fill="currentColor"
      />
      <path
        d="M27.8701 10.9221V7.53247H30.1298V10.9221H31.2597C33.1183 10.9221 34.6493 12.453 34.6493 14.3117V15.4416H32.3895V14.3117C32.3895 13.6743 31.8971 13.1818 31.2597 13.1818H28.9999H26.7402C26.1028 13.1818 25.6103 13.6743 25.6103 14.3117V15.1591C25.6103 15.6663 25.9355 16.1028 26.4224 16.2448L32.2086 17.9308C33.65 18.3512 34.6493 19.6865 34.6493 21.188V23.3507C34.6493 25.2093 33.1183 26.7403 31.2597 26.7403H30.1298V30.1299H27.8701V26.7403H26.7402C24.8815 26.7403 23.3506 25.2093 23.3506 23.3507V22.2208H25.6103V23.3507C25.6103 23.988 26.1028 24.4805 26.7402 24.4805H28.9999H31.2597C31.8971 24.4805 32.3895 23.988 32.3895 23.3507V21.188C32.3895 20.6808 32.0644 20.2443 31.5775 20.1023L25.7913 18.4119C24.3499 17.9915 23.3506 16.6606 23.3506 15.1591V14.3117C23.3506 12.453 24.8815 10.9221 26.7402 10.9221H27.8701Z"
        fill="currentColor"
      />
    </svg>
  );
}

const THRESHOLDS = [0.1, 0.32, 0.54, 0.76];
const MOBILE_MQ = '(max-width: 720px)';
const VB_W = 1024;
const VB_H = 940;

function buildConnectors(ox, oy, specs, busX) {
  const head = 5.1;
  const wing = 4.64;
  const tipOf = (ix) => ix - 1;
  const tip0 = tipOf(specs[0].ix);
  const bus = Math.min(tip0 - 36, Math.max(ox + 28, busX || ox + Math.max(52, (tip0 - ox) * 0.3)));
  const rises = specs.map((spec) => Math.abs(spec.iy - oy)).filter((rise) => rise > 0.5);
  const closest = rises.length ? Math.min(...rises) : 24;
  const rIn = Math.max(10, Math.min(20, closest / 2, (bus - ox) / 2));
  const fromLogo = `M${ox} ${oy} H${bus - rIn}`;

  const meta = specs.map((spec) => {
    const tip = tipOf(spec.ix);
    const dir = spec.iy < oy - 0.5 ? -1 : spec.iy > oy + 0.5 ? 1 : 0;
    const rise = Math.abs(spec.iy - oy);
    const rOut = dir === 0 ? 0 : Math.max(10, Math.min(20, Math.max(0, (rise - rIn) / 2), (tip - bus) / 2));
    const back = tip - head;
    return {
      tip,
      dir,
      rOut,
      yEnter: oy + dir * rIn,
      yLeave: spec.iy - dir * rOut,
      iy: spec.iy,
      arrow: `M${back} ${spec.iy - wing} L${tip} ${spec.iy} L${back} ${spec.iy + wing}`,
    };
  });

  const lines = meta.map((item) => ({ d: `${fromLogo} H${item.tip}`, arrow: item.arrow }));
  const paint = (group) => {
    let shared = fromLogo;
    group.forEach((item, order) => {
      const current = meta[item.index];
      const elbow = `Q${bus} ${current.iy} ${bus + current.rOut} ${current.iy} H${current.tip}`;
      if (order === 0) {
        const hasSpine = current.dir < 0 ? current.yLeave < current.yEnter - 0.5 : current.yLeave > current.yEnter + 0.5;
        const spine = hasSpine ? `V${current.yLeave}` : '';
        const turn = `Q${bus} ${oy} ${bus} ${current.yEnter} ${spine}`;
        lines[item.index] = { d: `${fromLogo} ${turn} ${elbow}`, arrow: current.arrow };
        shared = `${fromLogo} ${turn}`;
        return;
      }
      const startY = meta[group[order - 1].index].yLeave;
      const hasSpine = current.dir < 0 ? current.yLeave < startY - 0.5 : current.yLeave > startY + 0.5;
      const spine = hasSpine ? `V${current.yLeave}` : '';
      lines[item.index] = { d: `${shared} ${spine} ${elbow}`, arrow: current.arrow };
      shared = `${shared} ${spine}`;
    });
  };

  paint(meta.map((item, index) => ({ index, iy: item.iy })).filter((item) => meta[item.index].dir < 0).sort((a, b) => b.iy - a.iy));
  paint(meta.map((item, index) => ({ index, iy: item.iy })).filter((item) => meta[item.index].dir > 0).sort((a, b) => a.iy - b.iy));
  return { trunk: '', lines, bus, tip: tip0 };
}

const ITEMS = [
  {
    id: 'red',
    color: '#FF4654',
    title: 'Red - Build with Passion',
    description: ['We ask "why" before we ask "how." Every product starts because we\'re', 'genuinely curious about solving it.'],
    top: '38.40%',
    d: 'M318 557 H402 Q416 557 416 543 V403 Q416 389 430 389 H546',
    arrow: 'M542.9 384.36 L548 389 L542.9 393.64',
  },
  {
    id: 'green',
    color: '#00B96B',
    title: 'Teal/Green - Grow with Purpose',
    description: ['Nothing we build is meant to stay static. We design products that keep', 'improving long after launch.'],
    top: '49.89%',
    d: 'M318 557 H402 Q416 557 416 543 V511 Q416 497 430 497 H546',
    arrow: 'M542.9 492.36 L548 497 L542.9 501.64',
  },
  {
    id: 'yellow',
    color: '#FFBB00',
    title: 'Yellow - Think Beyond Obvious',
    description: ['We look for the simplest path to a solution, even when the obvious path', 'takes longer.'],
    top: '61.38%',
    d: 'M318 557 H402 Q416 557 416 571 V591 Q416 605 430 605 H546',
    arrow: 'M542.9 600.36 L548 605 L542.9 609.64',
  },
  {
    id: 'blue',
    color: '#3285FF',
    title: 'Blue - Trust by Design',
    description: ['No shortcuts on the fundamentals. What we ship is stable, secure, and', 'built to hold up.'],
    top: '72.87%',
    d: 'M318 557 H402 Q416 557 416 571 V699 Q416 713 430 713 H546',
    arrow: 'M542.9 708.36 L548 713 L542.9 717.64',
  },
];

export default function OurPhilosophy() {
  const uid = useId().replace(/:/g, '');
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState([false, false, false, false]);
  const [hovered, setHovered] = useState(-1);
  const [lines, setLines] = useState(() => ITEMS.map((item) => ({ d: item.d, arrow: item.arrow })));
  const [trunk, setTrunk] = useState('');
  const allColorful = active[0] && active[1] && active[2] && active[3];
  const currentStep = active.reduce((last, on, index) => (on ? index : last), -1);
  const litIndex = allColorful && hovered >= 0 ? hovered : currentStep;

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const logo = logoRef.current;
    if (!canvas || !logo) return;

    const measure = () => {
      if (window.matchMedia(MOBILE_MQ).matches) return;
      const cr = canvas.getBoundingClientRect();
      const lr = logo.getBoundingClientRect();
      if (cr.width < 2 || cr.height < 2) return;
      const icons = canvas.querySelectorAll('.ph-icon');
      if (icons.length < ITEMS.length) return;
      const sx = VB_W / cr.width;
      const sy = VB_H / cr.height;
      const ox = (lr.right - cr.left) * sx - 3;
      const oy = (lr.top + lr.height / 2 - cr.top) * sy;
      const large = canvas.querySelector('.ph-frame-large');
      const inner = canvas.querySelector('.ph-frame-inner');
      let busX = 0;
      if (large && inner) {
        const right = Math.max(large.getBoundingClientRect().right, inner.getBoundingClientRect().right);
        busX = ox + ((right - cr.left) * sx - ox) * 0.62;
      }
      const specs = ITEMS.map(() => ({ ix: 0, iy: 0 }));
      ITEMS.forEach((_, index) => {
        const ir = icons[index].getBoundingClientRect();
        specs[index].ix = (ir.left - cr.left) * sx - 18;
        specs[index].iy = (ir.top + ir.height / 2 - cr.top) * sy;
      });
      const next = buildConnectors(ox, oy, specs, busX);
      setTrunk((prev) => (prev === next.trunk ? prev : next.trunk));
      setLines((prev) => (
        prev.length === next.lines.length && prev.every((line, index) => line.d === next.lines[index].d && line.arrow === next.lines[index].arrow)
          ? prev
          : next.lines
      ));
    };

    measure();
    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(canvas);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mq = window.matchMedia(MOBILE_MQ);
    let mobile = mq.matches;
    let raf = 0;
    let observers = [];
    const visible = new Set();

    const stage = stageRef.current;
    const canvas = canvasRef.current;

    const layoutPin = () => {
      if (!stage || !canvas) return;
      if (mq.matches) {
        section.style.height = '';
        stage.style.top = '';
        section.classList.remove('is-pinned');
        return;
      }
      const canvasH = canvas.offsetHeight;
      const vh = window.innerHeight;
      const headerEl = document.querySelector('.header-wrapper');
      const headerBottom = headerEl ? headerEl.getBoundingClientRect().bottom + 18 : 124;
      const items = canvas.querySelectorAll('.ph-item');
      const logo = canvas.querySelector('.ph-logo-tile');
      if (!items.length || !logo || !canvasH) return;
      const canvasTop = canvas.getBoundingClientRect().top;
      const rel = (el, edge) => el.getBoundingClientRect()[edge] - canvasTop;
      const diagramTop = Math.min(rel(items[0], 'top'), rel(logo, 'top')) - 8;
      stage.style.top = `${headerBottom - diagramTop}px`;
      section.style.height = `${Math.max(vh * 4, canvasH + vh * 3)}px`;
    };

    const applyDesktop = () => {
      if (!stage || !canvas) return;
      const stickTop = parseFloat(stage.style.top) || 0;
      const canvasH = canvas.offsetHeight;
      const pinDistance = Math.max(section.offsetHeight - canvasH, 1);
      const scrolled = stickTop - section.getBoundingClientRect().top;
      const progress = Math.min(Math.max(scrolled / pinDistance, 0), 1);
      let reached = -1;
      THRESHOLDS.forEach((threshold, index) => {
        if (progress >= threshold) reached = index;
      });
      section.classList.toggle('is-pinned', scrolled > 0 && scrolled < pinDistance);
      const next = ITEMS.map((_, index) => index <= reached);
      setActive((prev) => (
        prev[0] === next[0] && prev[1] === next[1] && prev[2] === next[2] && prev[3] === next[3]
          ? prev
          : next
      ));
    };

    const onScroll = () => {
      if (mobile) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        applyDesktop();
      });
    };

    const onResize = () => {
      layoutPin();
      onScroll();
    };

    const bindMobile = () => {
      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) visible.add(index);
              else visible.delete(index);
            });
            setActive(ITEMS.map((_, i) => visible.has(i)));
          },
          { threshold: 0.45, rootMargin: '0px 0px -12% 0px' }
        );
        io.observe(el);
        observers.push(io);
      });
    };

    const teardownMobile = () => {
      observers.forEach((io) => io.disconnect());
      observers = [];
      visible.clear();
    };

    const syncMode = () => {
      mobile = mq.matches;
      teardownMobile();
      layoutPin();
      if (mobile) bindMobile();
      else applyDesktop();
    };

    syncMode();
    mq.addEventListener('change', syncMode);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      mq.removeEventListener('change', syncMode);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      teardownMobile();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="philosophy" className="philosophy-perfect-section" aria-label="Our philosophy">
      <div className="ph-track" ref={sectionRef}>
      <div className="ph-stage" ref={stageRef}>
        <div className="ph-canvas" ref={canvasRef}>
          <div className="ph-frame ph-frame-mid" aria-hidden="true" />
          <div className="ph-frame ph-frame-outer" aria-hidden="true" />
          <div className="ph-frame ph-frame-large" aria-hidden="true" />
          <div className="ph-frame ph-frame-inner" aria-hidden="true" />

          <header className="ph-head">
            <SectionBadge number="04" label="OUR PHILOSOPHY" />
            <h2 className="ph-title">
              Our Philosophy,<br />in Four Colors.
            </h2>
            <p className="ph-lead">
              Our logo isn&apos;t just a color palette - it&apos;s how we think, build, and grow with <br />every product we create.
            </p>
          </header>

          <div className={`ph-glow${currentStep >= 0 ? ` is-${ITEMS[currentStep].id}` : ''}`} aria-hidden="true" />

          <div className="ph-logo-tile" ref={logoRef}>
            <svg
              viewBox="40 40 270 240"
              className={`ph-logo-svg${litIndex >= 0 ? ' is-lit' : ''}`}
              data-lit={litIndex >= 0 ? ITEMS[litIndex].id : ''}
              role="img"
              aria-label="Cloudbrain logo"
            >
              <defs>
                <linearGradient id={`${uid}-red`} x1="63" y1="61" x2="125" y2="252" gradientUnits="userSpaceOnUse">
                  <stop offset="0.06" stopColor="#F42A37" />
                  <stop offset="1" stopColor="#FE4D4D" />
                </linearGradient>
                <linearGradient id={`${uid}-yellow`} x1="180" y1="100" x2="244" y2="177" gradientUnits="userSpaceOnUse">
                  <stop offset="0.3" stopColor="#FFBE00" />
                  <stop offset="1" stopColor="#FFAE00" />
                </linearGradient>
                <linearGradient id={`${uid}-green`} x1="191" y1="139" x2="301" y2="275" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1D94DC" />
                  <stop offset="0.76" stopColor="#00AF57" />
                </linearGradient>
                <linearGradient id={`${uid}-blue`} x1="298" y1="106" x2="241" y2="70" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3086FF" />
                  <stop offset="1" stopColor="#63A4FF" />
                </linearGradient>
              </defs>
              <g id={`${uid}-piece-red`} className="ph-logo-piece ph-logo-red">
                <path d="M166.459 53.6172C171.31 53.6172 175.243 57.55 175.243 62.4015V79.0916C175.243 81.0322 173.67 82.6053 171.729 82.6053H150.647C133.182 82.6053 119.024 96.7636 119.024 114.229V177.867C119.024 185.629 125.316 191.921 133.079 191.921H169.9C179.602 191.921 187.468 199.787 187.468 209.49V237.209C187.468 239.149 185.895 240.722 183.954 240.722H123.416C113.713 240.722 105.847 232.857 105.847 223.154V194.166C105.847 189.314 101.914 185.381 97.0631 185.381H79.4945C62.0294 185.381 47.8711 171.223 47.8711 153.758V85.2406C47.8711 67.7755 62.0294 53.6172 79.4945 53.6172H166.459Z" fill={`url(#${uid}-red)`} />
              </g>
              <g id={`${uid}-piece-yellow`} className="ph-logo-piece ph-logo-yellow">
                <path d="M175.383 87.4759C175.383 87.0224 176.131 86.8488 176.385 87.2246C177.897 89.4632 180.254 90.9033 182.904 90.9033H213.542C221.842 90.9033 228.571 98.6701 228.571 108.251V152.232C228.571 156 232.846 159.407 235.07 160.925C235.419 161.163 235.246 161.758 234.824 161.758H192.416C183.009 161.758 175.383 152.956 175.383 142.098V87.4759Z" fill={`url(#${uid}-yellow)`} />
              </g>
              <g id={`${uid}-piece-green`} className="ph-logo-piece ph-logo-green">
                <path d="M272.09 161.662H273.627C291.093 161.662 305.251 175.977 305.251 193.442V241.355C305.251 258.821 291.093 273.222 273.627 273.222H272.09L204.878 273.297L201.537 273.282C194.283 273.249 188.42 267.359 188.42 260.106C188.42 255.976 188.42 251.84 188.42 247.748C188.42 245.807 189.993 244.234 191.934 244.234H212.137C229.603 244.234 243.761 230.076 243.761 212.611C243.761 196.214 243.761 179.816 243.761 163.419C243.761 162.449 244.547 161.662 245.518 161.662H272.09Z" fill={`url(#${uid}-green)`} />
              </g>
              <g id={`${uid}-piece-blue`} className="ph-logo-piece ph-logo-blue">
                <path d="M243.762 102.78C243.762 107.632 247.695 111.564 252.546 111.564H296.467C301.319 111.564 305.252 107.632 305.252 102.78V72.0352C305.252 59.9066 295.42 50.0745 283.291 50.0745H252.546C247.695 50.0745 243.762 54.0074 243.762 58.8588V102.78Z" fill={`url(#${uid}-blue)`} />
              </g>
            </svg>
          </div>

          <svg className="ph-lines" viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden="true">
            {trunk ? <path className="ph-base" d={trunk} fill="none" /> : null}
            {ITEMS.map((item, index) => (
              <path key={`base-${item.id}`} className="ph-base" d={lines[index].d} fill="none" />
            ))}
            {[0, 1, 2, 3].map((index) => {
              const item = ITEMS[index];
              return (
                <g
                  key={item.id}
                  className={`ph-step${active[index] ? ' on' : ''}${allColorful && hovered === index ? ' is-hover' : ''}`}
                  style={{ '--c': item.color }}
                >
                  <path className="ph-live" pathLength="1" d={lines[index].d} fill="none" />
                  <path className="ph-arrow" d={lines[index].arrow} fill="none" />
                </g>
              );
            })}
          </svg>

          {ITEMS.map((item, index) => (
            <article
              key={item.id}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={`ph-item${active[index] ? ' on' : ''}${allColorful && hovered === index ? ' is-hover' : ''}`}
              style={{ top: item.top, '--c': item.color }}
              data-step={index}
              onPointerEnter={(event) => {
                if (event.pointerType !== 'touch') setHovered(index);
              }}
              onPointerLeave={() => setHovered(-1)}
            >
              <div className="ph-icon">
                <ValueIcon id={item.id} uid={uid} />
              </div>
              <div className="ph-copy">
                <h3>{item.title}</h3>
                <p>
                  {item.description.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      </div>

      <style>{`
        .philosophy-perfect-section {
          --line-dur: 0.7s;
          --fill-dur: 0.45s;
          --ink: #0f172a;
          --muted: #64748b;
          --off-bg: #EEF0F3;
          --off-icon: #A3A9B3;
          --off-title: #B4B9C2;
          --off-text: #C8CCD3;
          --off-line: #E3E6EA;
          position: relative;
          width: 100%;
          background: #f8fafc;
          z-index: 2;
        }

        .ph-track {
          height: auto;
          position: relative;
        }

        .ph-stage {
          position: sticky;
          top: 0;
          width: 100%;
          height: auto;
          display: block;
          padding: 0;
          overflow: visible;
          background: transparent;
        }

        .ph-canvas {
          position: relative;
          width: 100%;
          aspect-ratio: 1024 / 940;
          container-type: inline-size;
          background: #ffffff;
          border-radius: 80px;
          overflow: clip;
        }

        .ph-frame {
          position: absolute;
          box-sizing: border-box;
          border: 1.5px solid rgba(210, 214, 220, 0.7);
          background: transparent;
          pointer-events: none;
          z-index: 0;
        }

        .ph-frame-outer {
          left: -14%;
          top: 30.5%;
          width: 64%;
          height: 60%;
          border-radius: 3cqw;
        }

        .ph-frame-large {
          left: 3.9%;
          top: 37.2%;
          width: 39.4%;
          height: 46%;
          border-radius: 3cqw;
        }

        .ph-frame-mid {
          left: -17%;
          top: 21.5%;
          width: 74%;
          height: 80%;
          border-radius: 3cqw;
        }

        .ph-frame-inner {
          left: 11.3%;
          top: 46.2%;
          width: 24.5%;
          height: 26%;
          border-radius: 2.5cqw;
          border-color: rgba(214, 218, 224, 0.5);
        }

        .ph-head {
          position: absolute;
          z-index: 4;
          top: 7.2%;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          pointer-events: none;
        }

        .ph-track.is-pinned .ph-head {
          visibility: hidden;
        }

        .ph-head .cb-section-badge {
          margin-bottom: 3.5rem;
        }

        .ph-title {
          margin: 0;
          font-family: var(--font-main);
          font-size: 4.85cqw;
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--ink);
        }

        .ph-lead {
          margin: 1.7cqw auto 0;
          max-width: 68cqw;
          font-family: var(--font-body);
          font-size: 1.42cqw;
          font-weight: 400;
          line-height: 1.45;
          color: var(--muted);
        }

        .ph-glow {
          position: absolute;
          left: 23.4%;
          top: 59.23%;
          width: 28%;
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, #D7F0FB 0%, #EAF6FC 48%, transparent 72%);
          filter: blur(10px);
          opacity: 1;
          z-index: 1;
          pointer-events: none;
          transition: background 0.6s ease;
        }

        .ph-glow.is-red {
          background: radial-gradient(circle, rgba(245, 40, 55, 0.22) 0%, rgba(245, 40, 55, 0.06) 48%, transparent 72%);
        }

        .ph-glow.is-green {
          background: radial-gradient(circle, rgba(0, 175, 87, 0.22) 0%, rgba(0, 175, 87, 0.06) 48%, transparent 72%);
        }

        .ph-glow.is-yellow {
          background: radial-gradient(circle, rgba(255, 190, 0, 0.28) 0%, rgba(255, 190, 0, 0.08) 48%, transparent 72%);
        }

        .ph-glow.is-blue {
          background: radial-gradient(circle, #D7F0FB 0%, #EAF6FC 48%, transparent 72%);
        }

        .ph-logo-tile {
          position: absolute;
          left: 15.2%;
          top: 50.3%;
          width: 16.4%;
          aspect-ratio: 1;
          box-sizing: border-box;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
          border-radius: 2cqw;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }

        .ph-logo-svg {
          width: 72%;
          height: auto;
          display: block;
          overflow: visible;
        }

        .ph-logo-piece {
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        }

        .ph-logo-svg[data-lit="red"] .ph-logo-red {
          transform: scale(1.06);
          filter: drop-shadow(0 0 8px #F42A37);
        }

        .ph-logo-svg[data-lit="green"] .ph-logo-green {
          transform: scale(1.06);
          filter: drop-shadow(0 0 8px #00AF57);
        }

        .ph-logo-svg[data-lit="yellow"] .ph-logo-yellow {
          transform: scale(1.06);
          filter: drop-shadow(0 0 8px #FFBE01);
        }

        .ph-logo-svg[data-lit="blue"] .ph-logo-blue {
          transform: scale(1.06);
          filter: drop-shadow(0 0 8px #3085FF);
        }

        .ph-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          z-index: 2;
          pointer-events: none;
        }

        .ph-base {
          stroke: var(--off-line);
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ph-live {
          fill: none;
          stroke: var(--c);
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset var(--line-dur) cubic-bezier(0.6, 0, 0.2, 1);
          transition-delay: var(--fill-dur);
        }

        .ph-arrow {
          fill: none;
          stroke: var(--off-line);
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke 0.2s ease;
          transition-delay: var(--fill-dur);
        }

        .ph-step.on .ph-live {
          stroke-dashoffset: 0;
          transition-delay: 0s;
        }

        .ph-step.on .ph-arrow {
          stroke: var(--c);
          transition-delay: var(--line-dur);
        }

        .ph-item {
          position: absolute;
          left: 54.8%;
          width: 42%;
          display: flex;
          align-items: flex-start;
          gap: 1.75cqw;
          z-index: 3;
          cursor: pointer;
        }

        .ph-icon {
          flex: none;
          width: 5.37cqw;
          aspect-ratio: 1;
          border-radius: 1.35cqw;
          display: grid;
          place-items: center;
          background: var(--off-bg);
          color: var(--off-icon);
          box-shadow: none;
          transition:
            background var(--fill-dur) ease,
            color var(--fill-dur) ease,
            box-shadow var(--fill-dur) ease,
            transform var(--fill-dur) ease;
        }

        .ph-icon svg {
          width: 54%;
          height: 54%;
        }

        .ph-copy {
          min-width: 0;
          padding-top: 0.15cqw;
        }

        .ph-copy h3 {
          margin: 0;
          font-family: var(--font-main);
          font-size: 32px;
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--off-title);
          white-space: normal;
          transition: color var(--fill-dur) ease;
        }

        .ph-copy p {
          margin: 0.35cqw 0 0;
          max-width: none;
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.42;
          color: var(--off-text);
          transition: color var(--fill-dur) ease;
        }

        .ph-copy p span {
          display: block;
          white-space: nowrap;
        }

        @media (max-width: 1360px) {
          .ph-copy p span {
            white-space: normal;
          }
        }

        .ph-item.on .ph-icon {
          background: var(--c);
          color: #ffffff;
          box-shadow: 0 0.7cqw 1.5cqw -0.55cqw var(--c);
          transform: scale(1.04);
          transition-delay: var(--line-dur);
        }

        .ph-item.on h3,
        .ph-item.on p {
          transition-delay: var(--line-dur);
        }

        .ph-item.on h3 {
          color: #0B1020;
        }

        .ph-item.on p {
          color: #4B5563;
        }

        @media (prefers-reduced-motion: reduce) {
          .philosophy-perfect-section {
            --line-dur: 0s;
            --fill-dur: 0s;
          }
        }

        @media (max-width: 720px) {
          .ph-track {
            height: auto;
          }

          .ph-stage {
            position: relative;
            top: auto;
            height: auto;
            display: block;
            padding: 0;
            overflow: visible;
          }

          .ph-glow {
            display: none;
          }

          .ph-canvas {
            width: 100%;
            aspect-ratio: auto;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 1.4rem;
            padding: 3.2rem 1.15rem 3rem;
            border-radius: 36px;
          }

          .ph-frame,
          .ph-lines {
            display: none;
          }

          .ph-head,
          .ph-logo-tile,
          .ph-item {
            position: static;
            width: auto;
            left: auto;
            top: auto;
          }

          .ph-head {
            pointer-events: auto;
          }

          .ph-title {
            font-size: 1.85rem;
            line-height: 1.12;
          }

          .ph-lead {
            font-size: 0.95rem;
            max-width: 22rem;
            margin-top: 0.85rem;
          }

          .ph-lead br {
            display: none;
          }

          .ph-logo-tile {
            width: 196px;
            margin: 0.4rem auto 0.2rem;
            border-radius: 36px;
          }

          .ph-item {
            gap: 0.85rem;
          }

          .ph-icon {
            width: 54px;
            border-radius: 14px;
          }

          .ph-item.on .ph-icon {
            box-shadow: 0 8px 16px -6px var(--c);
          }

          .ph-copy h3 {
            font-size: 32px;
            font-weight: 500;
          }

          .ph-copy p {
            font-size: 16px;
            font-weight: 400;
            max-width: none;
          }

          .ph-copy p span {
            display: inline;
            white-space: normal;
          }

          .ph-copy p span + span::before {
            content: ' ';
          }
        }
      `}</style>
    </section>
  );
}

