"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { makeParticleLogo, ParticleLogoHandle } from "@/lib/particleLogo";
import { burstConfetti } from "@/components/Confetti";

interface NavItem {
  href: string;
  label: string;
  colorVar: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "REEL", colorVar: "var(--purple)" },
  { href: "/videos", label: "VIDEOS", colorVar: "var(--magenta)" },
  { href: "/images", label: "IMAGES", colorVar: "var(--raspberry)" },
  { href: "/resume", label: "RESUME", colorVar: "var(--emerald)" },
  { href: "/about", label: "ABOUT", colorVar: "var(--olive)" },
  { href: "/contact", label: "CONTACT", colorVar: "var(--purple)" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [showSecret, setShowSecret] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoHandleRef = useRef<ParticleLogoHandle | null>(null);
  const clicksRef = useRef<number[]>([]);

  // Fix 5: Reset menu state on route change during render without extra effect
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }


  // Update --accent variable based on current route
  useEffect(() => {
    const activeItem =
      NAV_ITEMS.find((item) =>
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
      ) || NAV_ITEMS[0];

    document.documentElement.style.setProperty("--accent", activeItem.colorVar);
  }, [pathname]);

  // Fix 5: Ensure body scroll lock is applied when menu is open and released when closed
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Header particle logo
  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    try {
      const headerLogo = makeParticleLogo(canvas, {
        gap: 2,
        dotSize: 1.3,
        spacingEm: 0.36,
        wordGapEm: 0.7,
      });
      logoHandleRef.current = headerLogo;

      headerLogo.start(() => {
        headerLogo.startAmbient();
      });

      const handleResize = () => {
        headerLogo.resize();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        headerLogo.stopAmbient();
      };
    } catch {}
  }, []);

  // Easter egg: 5 fast clicks on logo
  const handleLogoClick = () => {
    const now = Date.now();
    clicksRef.current = clicksRef.current.filter((t) => now - t < 2200);
    clicksRef.current.push(now);

    if (clicksRef.current.length >= 5) {
      clicksRef.current = [];
      const logoEl = document.getElementById("logoHome");
      if (logoEl) {
        const r = logoEl.getBoundingClientRect();
        burstConfetti(r.left + r.width * 0.5, r.top + r.height * 0.6, 42);
      }
      setShowSecret(true);
      setTimeout(() => setShowSecret(false), 2600);
    }
  };

  return (
    <>
      <header className="topbar">
        <Link
          href="/"
          className="logo ready"
          id="logoHome"
          title="Back to the reel"
          onClick={handleLogoClick}
        >
          <canvas id="nameCanvas" ref={canvasRef} />
          <span className="logo-fallback">BASMA GADO</span>
        </Link>
        <button
          className="menu-btn"
          id="menuBtn"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </header>

      <nav className={`deck ${menuOpen ? "open" : ""}`} id="deck" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`tab-btn ${isActive ? "active" : ""}`}
              style={{ "--ch": item.colorVar } as React.CSSProperties}
              onClick={() => setMenuOpen(false)}
            >
              <span className="tab-dots">
                <span />
                <span />
                <span />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={`secret-toast ${showSecret ? "show" : ""}`} id="secretToast" role="status">
        🎬 You found the secret — thanks for exploring! — Basma
      </div>
    </>
  );
}
