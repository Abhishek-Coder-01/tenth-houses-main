import type { ReactNode } from "react";
import { sections, type SectionKey } from "@/lib/sections";
import SectionMark from "./SectionMark";

export default function PageHero({
  section,
  title,
  children,
}: {
  section: SectionKey;
  title: ReactNode;
  children?: ReactNode;
}) {
  const meta = sections[section];
  return (
    <section className={`page-hero identity ${meta.identity} overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20`}>
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <SectionMark meta={meta} />
        <h1 className="page-title display-sm mt-6 max-w-3xl text-content">{title}</h1>
        {children}
      </div>
    </section>
  );
}
