import type { Metadata } from "next";
import { HeroViewfinder } from "@/components/HeroViewfinder";

export const metadata: Metadata = {
  title: "Reel | Basma Gado — Media Artist",
  description:
    "Showreel and new media works by Basma Gado — 3D animation, virtual production, motion capture, and interactive media.",
};

export default function HomePage() {
  return (
    <main>
      <HeroViewfinder />
    </main>
  );
}
