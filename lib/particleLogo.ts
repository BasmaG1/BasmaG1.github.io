export interface ParticleLogoOptions {
  gap?: number;
  dotSize?: number;
  scatterFrom?: "bottom" | "top";
  spacingEm?: number;
  wordGapEm?: number;
}

export interface ParticleLogoHandle {
  start: (onDone?: () => void) => void;
  rebuild: () => void;
  resize: () => void;
  startAmbient: () => void;
  stopAmbient: () => void;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

const LOGO_HUES: RGB[] = [
  { r: 201, g: 162, b: 39 }, // mustard yellow
  { r: 226, g: 63, b: 115 }, // raspberry pink
  { r: 56, g: 196, b: 190 }, // turquoise
];

const GOLD: RGB = { r: 255, g: 216, b: 140 };

function mixRgb(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

function chameleonColor(phase: number): RGB {
  const n = LOGO_HUES.length;
  const p = (((phase % 1) + 1) % 1) * n;
  const i = Math.floor(p) % n;
  const j = (i + 1) % n;
  return mixRgb(LOGO_HUES[i], LOGO_HUES[j], p - Math.floor(p));
}

function rgbStr(c: RGB): string {
  return `${c.r | 0},${c.g | 0},${c.b | 0}`;
}

export function makeParticleLogo(
  canvas: HTMLCanvasElement,
  {
    gap = 4,
    dotSize = 2,
    scatterFrom = "bottom",
    spacingEm = 0.24,
    wordGapEm = 0.6,
  }: ParticleLogoOptions = {}
): ParticleLogoHandle {
  const ctx = canvas.getContext("2d");
  const wrap = canvas.parentElement;
  if (!ctx || !wrap) {
    return {
      start: (cb) => cb?.(),
      rebuild: () => {},
      resize: () => {},
      startAmbient: () => {},
      stopAmbient: () => {},
    };
  }

  function sizeCanvas() {
    if (!wrap || !canvas) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = wrap.clientWidth * dpr;
    canvas.height = wrap.clientHeight * dpr;
    canvas.style.width = `${wrap.clientWidth}px`;
    canvas.style.height = `${wrap.clientHeight}px`;
  }
  sizeCanvas();

  interface Particle {
    tx: number;
    ty: number;
    x: number;
    y: number;
    r: number;
    hueSeed: number;
    wobSeed: number;
  }

  function buildParticles(): Particle[] {
    if (!wrap) return [];
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w === 0 || h === 0) return [];
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const octx = off.getContext("2d");
    if (!octx) return [];
    octx.fillStyle = "#fff";
    octx.textBaseline = "alphabetic";

    const FULL = "BASMA GADO";
    let fontSize = Math.min(130, w / 6.4, h * 0.64);
    let letterSpacing = fontSize * spacingEm;
    let wordGap = fontSize * wordGapEm;
    const maxW = w - Math.max(6, w * 0.03);

    for (let pass = 0; pass < 4; pass++) {
      octx.font = `900 ${fontSize}px Unbounded, sans-serif`;
      let width = 0;
      for (let i = 0; i < FULL.length; i++) {
        const c = FULL[i];
        width += c === " " ? wordGap : octx.measureText(c).width + letterSpacing;
      }
      width -= letterSpacing;
      if (width > maxW) {
        const scale = (maxW / width) * 0.98;
        fontSize *= scale;
        letterSpacing *= scale;
        wordGap *= scale;
      } else break;
    }
    octx.font = `900 ${fontSize}px Unbounded, sans-serif`;

    const charWidths: number[] = [];
    let totalWidth = 0;
    for (let i = 0; i < FULL.length; i++) {
      const c = FULL[i];
      const cw = c === " " ? wordGap : octx.measureText(c).width + letterSpacing;
      charWidths.push(cw);
      totalWidth += cw;
    }
    totalWidth -= letterSpacing;

    let cursorX = (w - totalWidth) / 2;
    const baseY = h / 2 + fontSize * 0.34;
    for (let i = 0; i < FULL.length; i++) {
      const c = FULL[i];
      if (c !== " ") {
        octx.fillText(c, cursorX, baseY);
      }
      cursorX += charWidths[i];
    }

    const data = octx.getImageData(0, 0, w, h).data;
    const pts: Particle[] = [];
    for (let y = 0; y < h; y += gap) {
      for (let x = 0; x < w; x += gap) {
        let sum = 0;
        let count = 0;
        for (let dy = 0; dy < gap && y + dy < h; dy++) {
          for (let dx = 0; dx < gap && x + dx < w; dx++) {
            const px = Math.floor(x + dx);
            const py = Math.floor(y + dy);
            sum += data[(py * w + px) * 4 + 3];
            count++;
          }
        }
        const coverage = count ? sum / count / 255 : 0;
        if (coverage > 0.1) {
          const startY = scatterFrom === "bottom" ? h + Math.random() * 60 : Math.random() * h;
          pts.push({
            tx: x + gap / 2,
            ty: y + gap / 2,
            x: Math.random() * w,
            y: startY,
            r: 0.5 + coverage * 1.1,
            hueSeed: (x + gap / 2) / w,
            wobSeed: Math.random() * Math.PI * 2,
          });
        }
      }
    }
    return pts;
  }

  let particles = buildParticles();
  let frame = 0;
  const totalFrames = 60;
  let done = false;
  let ambientRAF: number | null = null;

  function dot(x: number, y: number, radius: number, rgba: string) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.fillStyle = rgba;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function clear() {
    if (!ctx || !wrap) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, wrap.clientWidth, wrap.clientHeight);
  }

  function stopAmbient() {
    if (ambientRAF) cancelAnimationFrame(ambientRAF);
    ambientRAF = null;
  }

  function startAmbient() {
    stopAmbient();
    if (!wrap) return;
    const w = wrap.clientWidth;
    const shineBand = Math.max(36, w * 0.16);
    const shineDuration = 1100;
    let nextShine = performance.now() + 1500 + Math.random() * 1400;

    function loop(now: number) {
      clear();
      let shineActive = false;
      let shineX = 0;
      if (now >= nextShine) {
        const elapsed = now - nextShine;
        if (elapsed < shineDuration) {
          shineActive = true;
          shineX = -shineBand + (w + shineBand * 2) * (elapsed / shineDuration);
        } else {
          nextShine = now + 4800 + Math.random() * 3800;
        }
      }
      particles.forEach((p) => {
        let c = chameleonColor(now / 9000 + p.hueSeed * 0.55);
        let alpha = 0.92;
        if (shineActive) {
          const dist = Math.abs(p.tx - shineX);
          if (dist < shineBand) {
            const k = 1 - dist / shineBand;
            c = mixRgb(c, GOLD, k * 0.9);
            alpha = 0.92 + k * 0.08;
          }
        }
        const wob = Math.sin(now / 1300 + p.wobSeed) * 0.45;
        const wobY = Math.cos(now / 1600 + p.wobSeed) * 0.35;
        dot(p.tx + wob, p.ty + wobY, dotSize * p.r, `rgba(${rgbStr(c)},${alpha})`);
      });
      ambientRAF = requestAnimationFrame(loop);
    }
    ambientRAF = requestAnimationFrame(loop);
  }

  function animate(onDone?: () => void) {
    frame++;
    clear();
    const t = Math.min(1, frame / totalFrames);
    const ease = 1 - Math.pow(1 - t, 3);
    particles.forEach((p) => {
      const cx = p.x + (p.tx - p.x) * ease;
      const cy = p.y + (p.ty - p.y) * ease;
      const c = chameleonColor(p.hueSeed);
      dot(cx, cy, dotSize * p.r, `rgba(${rgbStr(c)},${0.55 + ease * 0.45})`);
    });
    if (t < 1) {
      requestAnimationFrame(() => animate(onDone));
    } else {
      done = true;
      if (onDone) onDone();
    }
  }

  return {
    start(onDone) {
      stopAmbient();
      frame = 0;
      done = false;
      requestAnimationFrame(() => animate(onDone));
    },
    rebuild() {
      sizeCanvas();
      particles = buildParticles();
      frame = 0;
    },
    resize() {
      stopAmbient();
      sizeCanvas();
      particles = buildParticles();
      if (done) {
        frame = totalFrames;
        animate();
        startAmbient();
      } else {
        requestAnimationFrame(() => animate());
      }
    },
    startAmbient,
    stopAmbient,
  };
}
