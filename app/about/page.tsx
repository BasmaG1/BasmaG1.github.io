import type { Metadata } from "next";
import { ProfilePortrait } from "@/components/ProfilePortrait";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Basma Gado — Cinema & Media Arts graduate specializing in 3D animation, virtual production, motion capture, and interactive media.",
};

const TOOLKIT = [
  "Blender",
  "Unreal Engine",
  "DaVinci Resolve",
  "Photoshop",
  "Procreate",
  "Audacity",
];

export default function AboutPage() {
  return (
    <main>
      <section className="panel active" id="about">
        <h2>About</h2>
        <div className="about-grid">
          {/* Fix 3: Formal, professional portrait slot */}
          <ProfilePortrait />

          <div>
            <p>
              Basma Gado holds a Bachelor of Fine Arts in Cinema &amp; Media Arts from
              York University. Her work spans between storytelling, 3D animation,
              virtual production, video/audio editing, and media production. Driven by a
              passion for visual narratives, Basma has hands-on experience with tools
              across the full production pipeline, from motion capture to real-time
              rendering. She is eager to apply her academic knowledge in real-world
              settings and continue expanding her skills through engaging,
              collaborative projects.
            </p>
            <p className="kicker" style={{ marginTop: "24px" }}>
              TOOLKIT
            </p>
            <div className="chip-row">
              {TOOLKIT.map((tool) => (
                <span key={tool} className="chip">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
