import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import Faq from "./components/Faq";
import HeroVisual from "./components/HeroVisual";
import Logo from "./components/Logo";
import {
  RoutingVisual,
  IntakeVisual,
  TriageVisual,
  RecordVisual,
} from "./components/StepVisuals";

const STEPS = [
  {
    n: "01",
    visual: <RoutingVisual />,
    title: "Answered, whatever the hour",
    body: "2am Sunday, mid-storm, or while every tech is on a roof. Nobody has to be awake and nobody has to be on call for the phone. The line is picked up on the third ring, every time.",
  },
  {
    n: "02",
    visual: <IntakeVisual />,
    title: "It asks what a dispatcher would",
    body: "Not a form. It works out which unit, what it is actually doing, whether the building has heat or cooling right now, and who is in it — following up on the answers the way your own dispatcher would.",
  },
  {
    n: "03",
    visual: <TriageVisual />,
    title: "It works out what is real",
    body: "A cold house with an infant is not the same call as a thermostat someone has not reset. It qualifies against your rules — temperature, occupancy, contract, equipment — before deciding anything is an emergency.",
  },
  {
    n: "04",
    visual: <RecordVisual />,
    title: "Real emergency, your phone rings",
    body: "When it qualifies as genuine, your on-call tech is called — not emailed. Everything else lands as a booked job with the full write-up waiting when the office opens.",
  },
];

const INTAKE_ROWS = [
  { label: "Job type", value: "No cooling — rooftop unit" },
  { label: "Name", value: "D. Okafor · site manager" },
  { label: "Service address", value: "2100 Kipling Ave, Etobicoke ON" },
  { label: "Callback", value: "416·555·0188" },
  { label: "Property", value: "Commercial · 2 units affected" },
  { label: "Customer", value: "Maintenance plan" },
  {
    label: "Symptom",
    value: "Unit running, air is warm. Server room at 31°C and climbing.",
  },
  { label: "Availability", value: "Site access from 6:00am" },
];

const CRITERIA = [
  {
    title: "Residential or commercial HVAC service",
    body: "Furnaces, heat pumps, boilers, rooftop units, ductless splits — and which symptoms mean a building is without heating or cooling right now. It is not a general-purpose answering service pointed at your trade.",
  },
  {
    title: "Operating in Canada",
    body: "Configured for Canadian service areas, numbers, and address formats — and for a climate that swings from −30°C in February to +35°C in July.",
  },
  {
    title: "More call volume than phone capacity",
    body: "Emergencies, quotes, rebookings, plan renewals — the return comes from whatever is currently going to voicemail. If every call is already answered on the first ring, there is nothing here worth paying for.",
  },
  {
    title: "An existing dispatch process",
    body: "One truck or twelve, paper or software — the agent feeds whatever you already run. You should know what happens to a job once it is booked before automating the front of it.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* ---------------------------------------------------- Hero */}
        <section className="px-5 sm:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-14 pb-[96px] pt-[104px] sm:pt-[128px] lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow">For Canadian HVAC contractors</p>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="mt-6 max-w-[13ch] t-h1">
                  Every missed call is a job that{" "}
                  <span className="text-[var(--accent)]">went elsewhere.</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-7 max-w-[34ch] text-xl leading-snug text-[var(--muted)]">
                  Answered 24/7. Captured in full. Booked before morning.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#book"
                    className="w-full rounded-lg bg-[var(--foreground)] px-7 py-4 text-center text-base font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
                  >
                    Request a scoping call
                  </a>
                  <p className="text-sm text-[var(--muted-soft)]">
                    15 minutes. We&apos;ll play a recorded HVAC call.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={220}>
              <HeroVisual />
            </Reveal>

          </div>
        </section>

        {/* -------------------------------------------- How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-16 px-5 sm:px-8"
        >
          <div className="mx-auto max-w-6xl section-y">
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2 className="mt-5 max-w-[20ch] t-h2">
                Nobody on call. Every call answered.
              </h2>
            </Reveal>

            {/* Asymmetric 2x2: each card carries its own miniature visual
                so the grid reads as art-directed rather than templated. */}
            <div className="mt-16 grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 40}>
                  <div
                    className={`flex h-full flex-col rounded-lg border border-[var(--border)] p-7 sm:p-8 ${
                      i === 0 || i === 3 ? "bg-[var(--surface)]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] tracking-widest text-[var(--muted-soft)]">
                        {s.n}
                      </span>
                      <h3 className="text-lg font-medium tracking-[-0.015em]">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                      {s.body}
                    </p>
                    <div className="mt-auto pt-7">{s.visual}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------ Intake compare */}
        <section
          id="intake"
          className="scroll-mt-16 px-5 sm:px-8"
        >
          <div className="mx-auto max-w-6xl section-y">
            <Reveal>
              <p className="eyebrow">What you actually get</p>
              <h2 className="mt-5 max-w-[20ch] t-h2">
                The difference between a message and a job.
              </h2>
              <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[var(--muted)]">
                A missed call leaves you a name and a number, whatever the job
                was. Every call comes back as something you can dispatch —
                below is one of them.
              </p>
            </Reveal>

            <Reveal delay={60}>
              <div className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-2 border-y border-[var(--border)] py-4">
                <span className="eyebrow mr-1">Same for</span>
                {[
                  "No heat",
                  "No cooling",
                  "Rooftop unit down",
                  "Heat pump fault",
                  "Boiler leak",
                  "Thermostat",
                  "Maintenance",
                  "Quote request",
                  "Warranty",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[var(--border)] bg-white px-2.5 py-1 text-xs text-[var(--muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
              {/* Voicemail */}
              <Reveal>
                <div className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">Typical voicemail</span>
                    <span className="font-mono text-xs text-[var(--muted-soft)]">
                      11:47 PM
                    </span>
                  </div>
                  <p className="mt-8 text-lg leading-relaxed text-[var(--muted)]">
                    &ldquo;Yeah, hi — our AC is out at the Kipling site. Can
                    someone get back to me? Thanks.&rdquo;
                  </p>
                  <div className="mt-8">
                    <p className="font-mono text-xs text-[var(--muted-soft)]">
                      416·555·0188 · 0:11
                    </p>
                    <p className="mt-4 border-t border-[var(--border-strong)] pt-4 text-sm text-[var(--muted)]">
                      No unit type. No site access window. No idea a server
                      room is overheating. Someone has to call back and start
                      the conversation over.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Structured intake */}
              <Reveal delay={90}>
                <div className="flex flex-col rounded-lg border border-[var(--border-strong)] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.10)] sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">Captured by the agent</span>
                    <span className="font-mono text-xs text-[var(--muted-soft)]">
                      11:47 PM
                    </span>
                  </div>

                  <div className="mt-8 flex items-center gap-2.5 rounded-lg bg-[color-mix(in_srgb,var(--alert)_8%,white)] px-3.5 py-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--alert)]" />
                    <span className="text-sm font-medium text-[var(--alert)]">
                      High urgency — no cooling, server room 31°C
                    </span>
                  </div>

                  <dl className="mt-7 space-y-3.5">
                    {INTAKE_ROWS.map((r) => (
                      <div
                        key={r.label}
                        className="grid grid-cols-1 gap-1 border-b border-[var(--border)] pb-3.5 last:border-b-0 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
                      >
                        <dt className="text-xs uppercase tracking-[0.08em] text-[var(--muted-soft)]">
                          {r.label}
                        </dt>
                        <dd className="text-[0.9375rem] leading-snug">
                          {r.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-auto pt-8 text-xs text-[var(--muted-soft)]">
                    Illustrative example of the intake format.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --------------------------------------- Coverage band
            A short horizontal strip that breaks the heading → text
            rhythm between the two large sections either side of it. */}
        <section className="bg-[var(--surface)] px-5 sm:px-8">
          <div className="mx-auto max-w-6xl py-14">
            <Reveal>
              <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
                {[
                  {
                    k: "Heating season",
                    v: "No-heat calls from the first frost to spring",
                  },
                  {
                    k: "Cooling season",
                    v: "AC and rooftop failures through every heat wave",
                  },
                  {
                    k: "All year",
                    v: "Maintenance, plans, quotes and overflow",
                  },
                ].map((c) => (
                  <div key={c.k} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <div>
                      <p className="text-[0.9375rem] font-medium">{c.k}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">{c.v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------- Who for */}
        <section
          id="fit"
          className="scroll-mt-16 px-5 sm:px-8"
        >
          <div className="mx-auto max-w-6xl section-y">
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
              <Reveal>
                <div className="lg:sticky lg:top-24">
                  <p className="eyebrow">Who it&apos;s for</p>
                  <h2 className="mt-5 t-h2">
                    Built for HVAC. Not adapted to it.
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
                    Each deployment is configured against how your dispatch
                    actually runs, so we scope the fit before taking it on.
                  </p>

                  <dl className="mt-10 space-y-4 border-t border-[var(--border)] pt-8">
                    {[
                      ["Residential", "Homeowners, tenants, landlords"],
                      ["Commercial", "Property managers, sites, multi-unit"],
                      ["Contract", "Maintenance plans and warranty work"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-4">
                        <dt className="w-24 shrink-0 text-[11px] uppercase tracking-[0.08em] text-[var(--muted-soft)]">
                          {k}
                        </dt>
                        <dd className="text-[0.9375rem] text-[var(--muted)]">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <div className="space-y-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)]">
                {CRITERIA.map((c, i) => (
                  <Reveal key={c.title} delay={i * 40}>
                    <div className="flex gap-5 bg-white p-7 sm:p-8">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[11px] text-[var(--muted-soft)]"
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-medium tracking-[-0.015em]">
                          {c.title}
                        </h3>
                        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                          {c.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- FAQ */}
        <section
          id="faq"
          className="scroll-mt-16 px-5 sm:px-8"
        >
          <div className="mx-auto max-w-3xl section-y">
            <Reveal>
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-5 mb-12 t-h2">
                Questions we get asked.
              </h2>
            </Reveal>
            <Reveal>
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------ Final CTA */}
        <section
          id="book"
          className="scroll-mt-16 bg-[var(--foreground)] px-5 text-white sm:px-8"
        >
          <div className="mx-auto max-w-6xl section-y">
            <Reveal>
              <h2 className="max-w-[16ch] t-h2">
                Worth fifteen minutes?
              </h2>
              <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-white/60">
                We&apos;ll play a recorded HVAC call, walk through how it would
                sit behind your existing number, and tell you plainly whether
                it&apos;s a fit.
              </p>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href="mailto:asim@rqops.com?subject=HVAC%20call%20automation%20—%20scoping%20call"
                  className="w-full rounded-lg bg-white px-7 py-4 text-center text-base font-medium text-[var(--foreground)] transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Request a scoping call
                </a>
                <p className="text-sm text-white/50">
                  No commitment, no pressure.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="bg-[var(--foreground)] px-5 pb-12 text-white sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Logo size={16} tone="light" />
            <p className="text-sm text-white/40">
              Call automation for Canadian HVAC contractors.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
