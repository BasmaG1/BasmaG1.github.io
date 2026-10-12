"use client";

export function burstConfetti(x: number, y: number, count = 26) {
  if (typeof document === "undefined") return;
  const colors = ["#511B8A", "#891B81", "#8A1B54", "#548A1B", "#1B8A51"];
  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.className = "burst-dot";
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    d.style.background = colors[i % colors.length];
    document.body.appendChild(d);
    const angle = Math.random() * Math.PI * 2;
    const dist = 50 + Math.random() * 110;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    try {
      const anim = d.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) scale(.3)`, opacity: 0 },
        ],
        {
          duration: 650 + Math.random() * 450,
          easing: "cubic-bezier(.16,.8,.3,1)",
        }
      );
      anim.onfinish = () => d.remove();
    } catch {
      setTimeout(() => d.remove(), 900);
    }
  }
}
