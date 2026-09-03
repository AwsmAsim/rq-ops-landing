"use client";

import { useState } from "react";

const ITEMS: { q: string; a: string }[] = [
  {
    q: "Does it sound like a robot?",
    a: "It holds a natural spoken conversation — callers describe the problem in their own words instead of pressing numbers through a phone tree, and it handles interruptions and accents the way a person would. We play a recorded HVAC call on the scoping call so you can judge the voice yourself rather than take our word for it.",
  },
  {
    q: "What happens on a genuine emergency?",
    a: "You define what counts as an emergency — no heat below a set temperature, no cooling above one, a gas smell, a commercial site down — and what should happen for each: call the on-call tech, text a group, ring a specific line. The agent follows your rules. It does not decide on its own what is worth waking someone for.",
  },
  {
    q: "What if a caller asks something it can't answer?",
    a: "It does not guess or invent an answer. It captures the question along with the caller's details and routes the whole thing to you, so you follow up with the right information instead of correcting a wrong one.",
  },
  {
    q: "Do I need to change my phone number?",
    a: "No. It sits behind the number your customers already have. Your line rings the way it does today, and the agent picks up the calls that would otherwise reach voicemail — after hours, during volume spikes, or when nobody can get to the phone.",
  },
  {
    q: "Can I control when it answers?",
    a: "Yes. You choose the conditions: after a set number of rings, outside business hours, on specific days, when the line is busy, or not at all. You can turn it off entirely at any point.",
  },
  {
    q: "What about calls that are not emergencies?",
    a: "Most calls are not. Quotes, rebookings, maintenance plan renewals, warranty questions, people chasing an invoice — these are captured, categorised and waiting as a written job when the office opens, rather than sitting in a voicemail queue nobody has time to clear.",
  },
  {
    q: "Will it book straight into our schedule?",
    a: "It can hold a slot against your calendar or hand the job to your office to place, depending on how tightly you want it wired in. Which of those makes sense depends on your dispatch process, so it is one of the things we work out on the scoping call.",
  },
  {
    q: "What if we already have an answering service?",
    a: "Most answering services take a message and pass it on. The difference is what arrives: a structured job with the unit type, symptom, urgency and access window already established, rather than a name and a number to call back. Some contractors run both for a period before switching.",
  },
  {
    q: "How long does setup take?",
    a: "Setup is configured against your call flow rather than handed over as a template, so the timeline depends on how your dispatch works and what it needs to connect to. We scope that on the first call and give you a specific answer before anything is committed.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="text-[1.0625rem] font-medium tracking-[-0.01em] sm:text-lg">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`mt-1 shrink-0 text-xl leading-none text-[var(--muted-soft)] transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              hidden={!isOpen}
              className="pb-6 pr-10 text-[0.9375rem] leading-relaxed text-[var(--muted)] sm:text-base"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
