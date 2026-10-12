"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { makeParticleLogo } from "@/lib/particleLogo";

export function IntroOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [hideBg, setHideBg] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoBoxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/") return;

    function safeSessionGet(key: string) {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    }
    function safeSessionSet(key: string, val: string) {
      try {
        sessionStorage.setItem(key, val);
      } catch {}
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const playedBefore = safeSessionGet("bg_intro_played");

    if (reduceMotion || playedBefore) {
      return;
    }

    safeSessionSet("bg_intro_played", "1");
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    const logoBox = logoBoxRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !logoBox || !overlay) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    try {
      const introLogo = makeParticleLogo(canvas, {
        gap: 3,
        dotSize: 2.2,
        scatterFrom: "top",
        spacingEm: 0.3,
        wordGapEm: 0.65,
      });

      introLogo.start(() => {
        try {
          introLogo.startAmbient();
          setTimeout(() => {
            const headerLogoBox = document.getElementById("logoHome");
            if (headerLogoBox) {
              const from = logoBox.getBoundingClientRect();
              const to = headerLogoBox.getBoundingClientRect();
              const scale = to.width / (from.width || 1);
              const dx = to.left - from.left;
              const dy = to.top - from.top;

              logoBox.style.transition = "transform .7s cubic-bezier(.65,0,.2,1)";
              logoBox.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
              setHideBg(true);
              overlay.style.transition = "opacity .55s ease .15s";
              overlay.style.opacity = "0";

              setTimeout(() => {
                introLogo.stopAmbient();
                setVisible(false);
              }, 750);
            } else {
              setVisible(false);
            }
          }, 320);
        } catch {
          setVisible(false);
        }
      });
    } catch {
      requestAnimationFrame(() => setVisible(false));
    }

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || pathname !== "/") return null;

  return (
    <div
      id="introOverlay"
      ref={overlayRef}
      className={hideBg ? "hide-bg" : ""}
      style={{ opacity: 1 }}
    >
      <div id="introLogo" ref={logoBoxRef}>
        <canvas id="introCanvas" ref={canvasRef} />
      </div>
    </div>
  );
}
