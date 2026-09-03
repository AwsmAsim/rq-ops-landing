/**
 * Hero centrepiece — a thermostat dial.
 *
 * A rendered object rather than a UI mock. The dial is unmistakably HVAC,
 * the arc carries the same ember gradient as the rest of the page, and the
 * cold reading plus the after-hours stamp tell the story in one glance.
 *
 * Pure SVG/CSS so it stays crisp at any size and costs a few KB.
 */

const R = 92; // dial radius
const GAP = 62; // degrees of open gap at the bottom
const START = 90 + GAP / 2;
const SWEEP = 360 - GAP;

/** Point on the dial circle at a given angle (degrees). */
function pt(angle: number, radius = R) {
  const rad = (angle * Math.PI) / 180;
  return [120 + Math.cos(rad) * radius, 120 + Math.sin(rad) * radius];
}

/** Arc path from the dial start through `frac` of the sweep. */
function arc(frac: number, radius = R) {
  const end = START + SWEEP * frac;
  const [x1, y1] = pt(START, radius);
  const [x2, y2] = pt(end, radius);
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${
    SWEEP * frac > 180 ? 1 : 0
  } 1 ${x2} ${y2}`;
}

// Indoor temp is well below the setpoint — the call that comes in at 11:47pm.
const CURRENT = 0.28;

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Warm ambient glow behind the stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, var(--ember-1) 0%, var(--ember-2) 40%, transparent 70%)",
        }}
      />

      {/* Back cards — physical depth either side */}
      <div
        aria-hidden
        className="absolute inset-y-10 -left-5 w-[62%] origin-right -rotate-[10deg] rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_50px_-24px_rgba(21,21,21,0.35)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-10 -right-5 w-[62%] origin-left rotate-[10deg] rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_50px_-24px_rgba(21,21,21,0.35)]"
      />

      {/* Front card */}
      <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[#faf9f6] px-8 pb-7 pt-8 shadow-[0_2px_4px_rgba(21,21,21,0.04),0_28px_70px_-28px_rgba(21,21,21,0.45)]">
        <svg
          viewBox="0 0 240 240"
          className="mx-auto block w-full max-w-[228px]"
          role="img"
          aria-label="Thermostat reading 11 degrees against a 21 degree setpoint"
        >
          <defs>
            <linearGradient id="ember" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--cool)" />
              <stop offset="50%" stopColor="var(--ember-1)" />
              <stop offset="100%" stopColor="var(--ember-3)" />
            </linearGradient>
          </defs>

          {/* Track */}
          <path
            d={arc(1)}
            fill="none"
            stroke="url(#ember)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.22"
          />

          {/* Tick marks around the dial */}
          {Array.from({ length: 41 }, (_, i) => {
            const f = i / 40;
            const a = START + SWEEP * f;
            const [x1, y1] = pt(a, R - 15);
            const [x2, y2] = pt(a, R - (i % 5 === 0 ? 23 : 19));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--foreground)"
                strokeWidth={i % 5 === 0 ? 1.6 : 1}
                opacity={f <= CURRENT ? 0.5 : 0.14}
                strokeLinecap="round"
              />
            );
          })}

          {/* Filled arc up to the current reading */}
          <path
            d={arc(CURRENT)}
            fill="none"
            stroke="var(--cool)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Setpoint marker */}
          <circle
            cx={pt(START + SWEEP * 0.72)[0]}
            cy={pt(START + SWEEP * 0.72)[1]}
            r="4.5"
            fill="var(--foreground)"
          />

          {/* Readout */}
          <text
            x="120"
            y="118"
            textAnchor="middle"
            className="fill-[var(--foreground)]"
            style={{
              fontSize: "54px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            11°
          </text>
          <text
            x="120"
            y="144"
            textAnchor="middle"
            className="fill-[var(--muted-soft)]"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.09em",
            }}
          >
            SET 21°
          </text>

          {/* Status pill inside the dial opening */}
          <g>
            <rect
              x="76"
              y="182"
              width="88"
              height="24"
              rx="12"
              className="fill-[var(--alert)]"
              opacity="0.09"
            />
            <circle cx="93" cy="194" r="3" className="fill-[var(--alert)]" />
            <text
              x="103"
              y="198"
              className="fill-[var(--alert)]"
              style={{ fontSize: "11px", fontWeight: 600 }}
            >
              No heat
            </text>
          </g>
        </svg>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5">
          <p className="eyebrow">Inbound · 11:47 PM</p>
          <p className="text-sm font-medium">Booked 7:30 AM</p>
        </div>
      </div>
    </div>
  );
}
