"use client";

import { useEffect, useRef } from "react";

export function BloomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const curRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const cur = curRef.current;
    if (!canvas || !cur) return;

    if (window.matchMedia("(pointer:fine)").matches) {
      document.body.classList.add("no-native-cursor");
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mx = 0;
    let my = 0;
    let rmx = 0;
    let rmy = 0;
    let animationFrameId: number;

    const PALETTES = [
      { petals: ["#ff6b6b", "#ff8e53", "#ffc844"], centre: "#fff176", stem: "#66bb6a" },
      { petals: ["#ce93d8", "#9c27b0", "#7b1fa2"], centre: "#ffe082", stem: "#81c784" },
      { petals: ["#4dd0e1", "#00acc1", "#0288d1"], centre: "#fff59d", stem: "#aed581" },
      { petals: ["#ffca28", "#ffa000", "#e65100"], centre: "#ff6f00", stem: "#558b2f" },
      { petals: ["#f48fb1", "#e91e63", "#ad1457"], centre: "#fff9c4", stem: "#66bb6a" },
      { petals: ["#a5d6a7", "#66bb6a", "#2e7d32"], centre: "#fff176", stem: "#26a69a" },
      { petals: ["#f8bbd0", "#f48fb1", "#f06292"], centre: "#fff9c4", stem: "#80cbc4" },
      { petals: ["#e040fb", "#aa00ff", "#6200ea"], centre: "#ffff00", stem: "#00e676" },
      { petals: ["#ff5722", "#ff9800", "#ffc107"], centre: "#ffffff", stem: "#00bcd4" },
      { petals: ["#b39ddb", "#7986cb", "#5c6bc0"], centre: "#f3e5f5", stem: "#a5d6a7" },
    ];

    class Flower {
      x: number;
      y: number;
      age: number;
      life: number;
      petalCount: number;
      maxRadius: number;
      innerR: number;
      rotation: number;
      swayAmp: number;
      swaySpeed: number;
      swayOff: number;
      vy: number;
      petalCol: string;
      petalCol2: string;
      centreCol: string;
      stemCol: string;
      petalWidth: number;
      petalBulge: number;
      doubleLayer: boolean;
      innerScale: number;
      innerRotOff: number;
      sparks: { angle: number; dist: number; size: number; alpha: number }[];

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.age = 0;
        this.life = 55 + Math.random() * 10;
        this.petalCount = 5 + Math.floor(Math.random() * 6);
        this.maxRadius = 14 + Math.random() * 20;
        this.innerR = this.maxRadius * (0.28 + Math.random() * 0.15);
        this.rotation = Math.random() * Math.PI * 2;
        this.swayAmp = 0.04 + Math.random() * 0.08;
        this.swaySpeed = 0.018 + Math.random() * 0.02;
        this.swayOff = Math.random() * Math.PI * 2;
        this.vy = 0.1 + Math.random() * 0.15;

        const pal = PALETTES[Math.floor(Math.random() * PALETTES.length)];
        this.petalCol = pal.petals[Math.floor(Math.random() * pal.petals.length)];
        this.petalCol2 = pal.petals[Math.floor(Math.random() * pal.petals.length)];
        this.centreCol = pal.centre;
        this.stemCol = pal.stem;

        this.petalWidth = 0.32 + Math.random() * 0.28;
        this.petalBulge = 0.55 + Math.random() * 0.35;
        this.doubleLayer = Math.random() < 0.35;
        this.innerScale = 0.55 + Math.random() * 0.2;
        this.innerRotOff = Math.PI / this.petalCount;
        if (this.doubleLayer) {
          const pal2 = PALETTES[Math.floor(Math.random() * PALETTES.length)];
          this.petalCol2 = pal2.petals[0];
        }

        this.sparks = [];
        for (let i = 0; i < 6; i++) {
          this.sparks.push({
            angle: Math.random() * Math.PI * 2,
            dist: this.maxRadius * (0.9 + Math.random() * 0.5),
            size: 1.5 + Math.random() * 2,
            alpha: 0.6 + Math.random() * 0.4,
          });
        }
      }

      easeOutElastic(t: number) {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      }

      easeInQuad(t: number) {
        return t * t;
      }

      draw(c: CanvasRenderingContext2D) {
        this.age++;
        this.y += this.vy * 0.25;

        const BLOOM_IN = 14;
        const FADE_OUT = 20;

        let scale = 1;
        let alpha = 1;

        if (this.age < BLOOM_IN) {
          scale = this.easeOutElastic(this.age / BLOOM_IN);
          alpha = this.age / BLOOM_IN;
        } else if (this.age > this.life - FADE_OUT) {
          const t = (this.age - (this.life - FADE_OUT)) / FADE_OUT;
          alpha = 1 - this.easeInQuad(t);
          this.y += t * 0.6;
        }

        if (alpha <= 0) return;

        const sway = Math.sin(this.age * this.swaySpeed + this.swayOff) * this.swayAmp;
        const rot = this.rotation + sway;
        const r = this.maxRadius * scale;
        const iR = this.innerR * scale;

        c.save();
        c.translate(this.x, this.y);
        c.globalAlpha = alpha;

        const stemLen = r * 0.9;
        c.strokeStyle = this.stemCol;
        c.lineWidth = Math.max(1, r * 0.055);
        c.lineCap = "round";
        c.globalAlpha = alpha * 0.7;
        c.beginPath();
        c.moveTo(0, iR * 0.5);
        c.quadraticCurveTo(r * 0.25, iR + stemLen * 0.5, r * 0.1, iR + stemLen);
        c.stroke();

        c.globalAlpha = alpha;
        this._drawPetals(c, r, iR, rot, this.petalCol, this.petalCount, 1);

        if (this.doubleLayer) {
          this._drawPetals(c, r * this.innerScale, iR * 0.9, rot + this.innerRotOff, this.petalCol2, this.petalCount, 0.85);
        }

        const cg = c.createRadialGradient(0, 0, 0, 0, 0, iR);
        cg.addColorStop(0, this.centreCol);
        cg.addColorStop(0.6, this.centreCol + "cc");
        cg.addColorStop(1, "rgba(0,0,0,0.25)");
        c.beginPath();
        c.arc(0, 0, iR, 0, Math.PI * 2);
        c.fillStyle = cg;
        c.fill();

        c.strokeStyle = "rgba(0,0,0,0.12)";
        c.lineWidth = 0.8;
        c.beginPath();
        c.arc(0, 0, iR * 0.65, 0, Math.PI * 2);
        c.stroke();

        if (this.age < BLOOM_IN + 20) {
          const spAlpha = Math.max(0, 1 - (this.age - BLOOM_IN) / 20);
          this.sparks.forEach((sp) => {
            const sa = sp.angle + sway;
            const sx = Math.cos(sa) * sp.dist * scale;
            const sy = Math.sin(sa) * sp.dist * scale;
            c.beginPath();
            c.arc(sx, sy, sp.size * scale, 0, Math.PI * 2);
            c.fillStyle = this.centreCol;
            c.globalAlpha = alpha * spAlpha * sp.alpha;
            c.fill();
          });
        }

        c.restore();
      }

      _drawPetals(c: CanvasRenderingContext2D, r: number, iR: number, rot: number, color: string, count: number, alphaScale: number) {
        const step = (Math.PI * 2) / count;
        const pw = r * this.petalWidth;
        const pb = this.petalBulge;

        const pg = c.createRadialGradient(0, iR * 0.5, 0, 0, iR * 0.5, r);
        pg.addColorStop(0, color);
        pg.addColorStop(0.5, color + "ee");
        pg.addColorStop(1, color + "44");

        c.globalAlpha = c.globalAlpha * alphaScale;

        for (let i = 0; i < count; i++) {
          const a = rot + i * step;
          const ax = Math.cos(a);
          const ay = Math.sin(a);
          const px = -ay;
          const py = ax;

          const tx = ax * r;
          const ty = ay * r;
          const c1x = ax * iR + px * pw + ax * (r - iR) * pb;
          const c1y = ay * iR + py * pw + ay * (r - iR) * pb;
          const c2x = ax * iR - px * pw + ax * (r - iR) * pb;
          const c2y = ay * iR - py * pw + ay * (r - iR) * pb;

          c.beginPath();
          c.moveTo(ax * iR, ay * iR);
          c.bezierCurveTo(c1x, c1y, tx + px * pw * 0.5, ty + py * pw * 0.5, tx, ty);
          c.bezierCurveTo(tx - px * pw * 0.5, ty - py * pw * 0.5, c2x, c2y, ax * iR, ay * iR);
          c.closePath();

          c.fillStyle = pg;
          c.shadowColor = "rgba(0,0,0,0.15)";
          c.shadowBlur = 4;
          c.fill();
          c.shadowBlur = 0;

          c.strokeStyle = "rgba(255,255,255,0.18)";
          c.lineWidth = 0.7;
          c.beginPath();
          c.moveTo(ax * iR * 1.1, ay * iR * 1.1);
          c.quadraticCurveTo(ax * (iR + (r - iR) * 0.5), ay * (iR + (r - iR) * 0.5), tx, ty);
          c.stroke();
        }
      }

      isDead() {
        return this.age >= this.life;
      }
    }

    class Petal {
      x: number;
      y: number;
      vx: number;
      vy: number;
      rot: number;
      vrot: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
      age: number;

      constructor(x: number, y: number, color: string) {
        this.x = x + (Math.random() - 0.5) * 30;
        this.y = y + (Math.random() - 0.5) * 20;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = 0.3 + Math.random() * 0.8;
        this.rot = Math.random() * Math.PI * 2;
        this.vrot = (Math.random() - 0.5) * 0.06;
        this.size = 3 + Math.random() * 5;
        this.color = color;
        this.alpha = 0.7 + Math.random() * 0.3;
        this.life = 30 + Math.random() * 20;
        this.age = 0;
      }

      draw(c: CanvasRenderingContext2D) {
        this.age++;
        this.x += this.vx + Math.sin(this.age * 0.04) * 0.4;
        this.y += this.vy;
        this.rot += this.vrot;
        this.vy *= 1.008;
        const a = Math.max(0, this.alpha * (1 - this.age / this.life));
        if (a <= 0) return;
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rot);
        c.globalAlpha = a;
        c.fillStyle = this.color;
        c.beginPath();
        c.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }

      isDead() {
        return this.age >= this.life;
      }
    }

    const flowers: Flower[] = [];
    const petals: Petal[] = [];
    let lastSpawn = 0;
    const MAX_FLOWERS = 14;

    function maybeSpawn() {
      const now = Date.now();
      if (now - lastSpawn > 170 && flowers.length < MAX_FLOWERS) {
        flowers.push(new Flower(mx, my));
        lastSpawn = now;
        flowers.forEach((f) => {
          if (f.age > f.life - 15 && Math.random() < 0.3) {
            petals.push(new Petal(f.x, f.y, f.petalCol));
          }
        });
      }
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      for (let i = petals.length - 1; i >= 0; i--) {
        petals[i].draw(ctx);
        if (petals[i].isDead()) petals.splice(i, 1);
      }

      for (let i = flowers.length - 1; i >= 0; i--) {
        flowers[i].draw(ctx);
        if (flowers[i].isDead()) {
          const f = flowers[i];
          for (let p = 0; p < 5; p++) petals.push(new Petal(f.x, f.y, f.petalCol));
          flowers.splice(i, 1);
        }
      }

      rmx += (mx - rmx) * 0.12;
      rmy += (my - rmy) * 0.12;

      ctx.save();
      ctx.beginPath();
      ctx.arc(rmx, rmy, 20, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,200,220,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rmx, rmy, 32, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,180,210,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    }

    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (cur) {
        cur.style.left = `${mx}px`;
        cur.style.top = `${my}px`;
      }
      maybeSpawn();
    }

    function onClick(e: MouseEvent) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const angle = (i / 5) * Math.PI * 2;
          const dist = 20 + Math.random() * 30;
          flowers.push(
            new Flower(
              e.clientX + Math.cos(angle) * dist,
              e.clientY + Math.sin(angle) * dist
            )
          );
        }, i * 60);
      }
    }

    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (t) {
        mx = t.clientX;
        my = t.clientY;
        maybeSpawn();
      }
    }

    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      if (t) {
        mx = t.clientX;
        my = t.clientY;
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            const angle = (i / 5) * Math.PI * 2;
            flowers.push(
              new Flower(
                t.clientX + Math.cos(angle) * 30,
                t.clientY + Math.sin(angle) * 30
              )
            );
          }, i * 60);
        }
      }
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    resize();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      document.body.classList.remove("no-native-cursor");
    };
  }, []);

  return (
    <>
      <canvas id="bloomCanvas" ref={canvasRef} />
      <div className="cur" id="cur" ref={curRef} />
    </>
  );
}
