import type { Metadata } from "next";
import House from "@/components/House";
import Process from "@/components/Process";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Story — Tenth House",
  description: "Heritage, trust and craftsmanship. The practice behind Tenth House.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        section="about"
        title={
          <>
            Heritage, held with <span className="gold-text italic">care</span>
          </>
        }
      >
        <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-mute">
          A house built on evenings, not inventory. Seventeen years of placing marquees where they belong.
        </p>
      </PageHero>
      <House mark={false} />
      <Process />
    </main>
  );
}
