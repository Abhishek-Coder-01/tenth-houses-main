import type { Metadata } from "next";
import Services from "@/components/Services";
import PageHero from "@/components/PageHero";
import ScrollTop from "@/components/ScrollTop";

export const metadata: Metadata = {
  title: "Our Services — Tenth House",
  description: "Professional services from first question to final strike.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        section="services"
        title="A single desk for the entire evening"
      >
        <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-mute">
          Tent, décor, furniture, catering support, sound and on-ground management — never subcontracted to a stranger.
        </p>
      </PageHero>
      <Services mark={false} />
      <ScrollTop />
    </main>
  );
}
