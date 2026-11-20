"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { ArrowIcon, CheckIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";

const budgets = ["Under $5K", "$5K - $15K", "$15K - $30K", "$30K+"];
const interests = ["Marquee", "Pavilion", "Glamping", "Venue", "Undecided"];
const events = ["Wedding", "Reception", "Corporate", "Private party"];

const rows = [
  { k: "Private line", v: "+1 212 555 0100", href: "tel:+12125550100", icon: PhoneIcon },
  { k: "Enquiries", v: "desk@tenthhouse.com", href: "mailto:desk@tenthhouse.com", icon: MailIcon },
  { k: "Workshop", v: "11 Crosby Street, New York", href: "#", icon: PinIcon },
  { k: "Hours", v: "Mon - Sat · 09:00 - 19:00", href: "#", icon: ClockIcon },
];

export default function Contact({ mark = true }: { mark?: boolean }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: budgets[1],
    interest: interests[0],
    event: events[0],
    note: "",
  });

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="identity identity-contact relative overflow-hidden py-24 lg:py-32">
      {/* neutral, gold-only ambient light (no red/navy tint in dark mode) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(520px 360px at 8% 12%, rgb(var(--c-gold) / 0.07), transparent 70%), radial-gradient(480px 340px at 96% 92%, rgb(var(--c-gold) / 0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          <div>
            <Reveal>
              {mark && <SectionMark meta={sections.contact} />}
              <h2 className="display-sm mt-6 max-w-lg text-content">
                Let&apos;s make space for a <span className="gold-text italic">great evening.</span>
              </h2>
              <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-mute">
                Tell us a little about the site, the date and the feeling you want to create. We will come back with a considered first direction within one working day.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {rows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <a key={row.k} href={row.href} className="group flex items-center gap-3 rounded-[18px] border border-line/10 bg-surface/65 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 hover:bg-surface">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-raise text-navy transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-mute/75">{row.k}</span>
                        <span className="mt-1 block truncate text-[0.82rem] text-content/85">{row.v}</span>
                      </span>
                      <ArrowIcon className="ml-auto h-3.5 w-3.5 shrink-0 text-mute/45 transition-transform group-hover:translate-x-1 group-hover:text-gold" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>


   {/* form card */}
          <Reveal delay={80}>
            <div className="card relative overflow-hidden !rounded-[26px] p-6 shadow-[var(--shadow-lift)] sm:p-8 lg:p-10">
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent, rgb(var(--c-gold) / 0.8) 50%, transparent)",
                }}
              />
              {sent ? (
                <div className="relative flex min-h-[440px] flex-col items-center justify-center text-center">
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-full text-white"
                    style={{
                      backgroundImage:
                        "linear-gradient(140deg, #21262d 0%, #161b22 52%, #b58a3a 100%)",
                    }}
                  >
                    <CheckIcon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-7 font-serif text-3xl text-content">Received, quietly</h3>
                  <p className="mt-3 max-w-sm text-[0.9rem] leading-relaxed text-mute">
                    Thank you, {form.name.split(" ")[0] || "friend"}. A member of the desk
                    will write to you personally within one working day.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn btn-ghost mt-8"
                    type="button"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="relative space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="kicker text-[0.52rem] text-gold">
                      Private enquiry
                    </span>
                    <span className="text-[0.56rem] uppercase tracking-[0.15em] text-mute/70">
                      Confidential
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="field-label">Full name</span>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your name"
                        className="field"
                      />
                    </label>
                    <label className="block">
                      <span className="field-label">Email</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@domain.com"
                        className="field"
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="field-label">Phone</span>
                      <input
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="Optional"
                        className="field"
                      />
                    </label>
                    <label className="block">
                      <span className="field-label">Budget</span>
                      <select
                        value={form.budget}
                        onChange={(e) => update("budget", e.target.value)}
                        className="field appearance-none"
                      >
                        {budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div>
                    <span className="field-label">Structure</span>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((it) => (
                        <button
                          type="button"
                          key={it}
                          onClick={() => update("interest", it)}
                          className={`chip ${form.interest === it ? "chip-on" : ""}`}
                        >
                          {it}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="field-label">Occasion</span>
                    <div className="flex flex-wrap gap-2">
                      {events.map((ev) => (
                        <button
                          type="button"
                          key={ev}
                          onClick={() => update("event", ev)}
                          className={`chip ${form.event === ev ? "chip-on" : ""}`}
                        >
                          {ev}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block">
                    <span className="field-label">Brief</span>
                    <textarea
                      rows={4}
                      value={form.note}
                      onChange={(e) => update("note", e.target.value)}
                      placeholder="Site, date, guest count, the kind of evening you have in mind…"
                      className="field resize-none"
                    />
                  </label>

                  <button type="submit" className="btn btn-gold w-full">
                    Send private enquiry
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </button>

                  <p className="text-center text-[0.6rem] leading-relaxed text-mute/70">
                    Your details are never shared, listed or sold. No newsletters.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}