import type { SectionMeta } from "@/lib/sections";

export default function SectionMark({
  meta,
  invert = false,
}: {
  meta: SectionMeta;
  invert?: boolean;
}) {
  const Icon = meta.icon;
  return (
    <div className={`section-mark ${invert ? "section-mark--invert" : ""}`}>
      <span className="section-mark__num num">{meta.number}</span>
      <span className="section-mark__rule" aria-hidden />
      <Icon className="section-mark__icon" strokeWidth={1.6} aria-hidden />
      <span className="section-mark__label">{meta.label}</span>
      <span className="section-mark__dots" aria-hidden>
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
