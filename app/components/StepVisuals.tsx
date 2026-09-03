/**
 * Miniature visuals for the "How it works" cards.
 *
 * Each one is a dense little panel rather than a sparse illustration —
 * a header with state, a body carrying the actual detail, and a footer
 * that resolves it. They deliberately differ from each other so the grid
 * reads as art-directed rather than templated.
 *
 * Everything shown is either a real intake field, a real routing rule, or
 * a labelled example. None of it depicts a product screen that does not
 * exist.
 */

function Panel({
  label,
  meta,
  children,
  footer,
}: {
  label: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-white">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-3.5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-soft)]">
          {label}
        </span>
        {meta}
      </div>
      <div className="px-3.5 py-3">{children}</div>
      {footer && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5">
          {footer}
        </div>
      )}
    </div>
  );
}

/** 01 — the clock, showing who is covering when. */
export function RoutingVisual() {
  const slots = [
    ["08–17", "Your office", false],
    ["17–22", "Agent", true],
    ["22–06", "Agent", true],
    ["Sat/Sun", "Agent", true],
  ] as const;
  return (
    <Panel
      label="Coverage"
      meta={
        <span className="rounded bg-[color-mix(in_srgb,var(--accent)_10%,white)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--accent)]">
          24 / 7
        </span>
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[var(--muted)]">
            Staff needed on call
          </span>
          <span className="font-mono text-[11px] font-medium">0</span>
        </div>
      }
    >
      <div className="space-y-1.5">
        {slots.map(([time, who, agent]) => (
          <div key={time} className="flex items-center gap-2.5">
            <span className="w-12 shrink-0 font-mono text-[10px] text-[var(--muted-soft)]">
              {time}
            </span>
            <span
              className={`h-2 flex-1 rounded-full ${
                agent
                  ? "bg-[var(--accent)] opacity-80"
                  : "bg-[var(--surface-strong)]"
              }`}
            />
            <span
              className={`w-16 shrink-0 text-right text-[10px] ${
                agent ? "font-medium text-[var(--accent)]" : "text-[var(--muted-soft)]"
              }`}
            >
              {who}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** 02 — the agent following up on an answer, as a dispatcher would. */
export function IntakeVisual() {
  const turns = [
    ["C", "The heat's not working."],
    ["A", "Is the fan running, or is the unit silent?"],
    ["C", "It's blowing, just cold."],
    ["A", "Anyone in the house who shouldn't be in the cold?"],
  ] as const;
  return (
    <Panel
      label="Live call"
      meta={
        <span className="font-mono text-[10px] text-[var(--muted-soft)]">
          02:14 AM
        </span>
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[var(--muted)]">
            Narrowed to
          </span>
          <span className="text-[11px] font-medium">Furnace · not igniting</span>
        </div>
      }
    >
      <div className="space-y-2">
        {turns.map(([who, line], i) => (
          <div key={i} className="flex gap-2">
            <span
              className={`mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded text-[9px] font-medium ${
                who === "A"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--surface-strong)] text-[var(--muted)]"
              }`}
            >
              {who}
            </span>
            <span
              className={`text-[11px] leading-snug ${
                who === "A" ? "" : "text-[var(--muted)]"
              }`}
            >
              {line}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** 03 — the routing rules, with what each one does. */
export function TriageVisual() {
  const rules: [string, string, "urgent" | "same" | "routine"][] = [
    ["No heat · under 5°C", "Call on-call tech", "urgent"],
    ["No cooling · over 30°C", "Call on-call tech", "urgent"],
    ["Intermittent fault", "Book next slot", "same"],
    ["Filter / maintenance", "Queue for AM", "routine"],
  ];
  const tone = {
    urgent: "text-[var(--alert)]",
    same: "text-[var(--foreground)]",
    routine: "text-[var(--muted-soft)]",
  };
  const dot = {
    urgent: "bg-[var(--alert)]",
    same: "bg-[var(--foreground)]",
    routine: "bg-[var(--border-strong)]",
  };
  return (
    <Panel
      label="Escalation rules"
      meta={
        <span className="font-mono text-[10px] text-[var(--muted-soft)]">
          YOUR RULES
        </span>
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[var(--muted)]">
            Escalated tonight
          </span>
          <span className="font-mono text-[11px] font-medium text-[var(--alert)]">
            1 of 4
          </span>
        </div>
      }
    >
      <div className="space-y-2">
        {rules.map(([cond, action, t]) => (
          <div key={cond} className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot[t]}`}
            />
            <span className={`flex-1 truncate text-[11px] ${tone[t]}`}>
              {cond}
            </span>
            <span
              aria-hidden
              className="font-mono text-[10px] text-[var(--muted-soft)]"
            >
              →
            </span>
            <span className="shrink-0 text-[10px] text-[var(--muted)]">
              {action}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** 04 — the agent calling the on-call tech, not sending an email. */
export function RecordVisual() {
  return (
    <Panel
      label="Escalation"
      meta={
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--alert)]" />
          <span className="font-mono text-[10px] font-medium text-[var(--alert)]">
            CALLING
          </span>
        </span>
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[var(--muted)]">Answered in</span>
          <span className="font-mono text-[11px] font-medium">22s</span>
        </div>
      }
    >
      <div className="flex items-center gap-2.5 rounded border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--foreground)] text-[10px] font-medium text-white">
          RM
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium">Ryan · on call</p>
          <p className="truncate text-[10px] text-[var(--muted-soft)]">
            Mobile · 705·555·0119
          </p>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        {[
          "No heat · 4°C indoors",
          "Infant in the home",
          "148 Maple Grove Rd",
        ].map((l) => (
          <div key={l} className="flex items-center gap-1.5">
            <span aria-hidden className="font-mono text-[10px] text-[var(--muted-soft)]">
              ·
            </span>
            <span className="text-[10px] text-[var(--muted)]">{l}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
