import type { Metadata } from "next";
import { ResumeSection } from "@/components/ResumeSection";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Curriculum Vitae, qualifications, education (York University BFA Honours), and technical production toolkit of Basma Gado.",
};

export default function ResumePage() {
  return (
    <main>
      <ResumeSection />
    </main>
  );
}
