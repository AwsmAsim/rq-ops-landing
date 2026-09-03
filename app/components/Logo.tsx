/**
 * RQ Ops wordmark — typographic only.
 *
 * No glyph. The mark is the setting: tight negative tracking on the name,
 * a hairline rule, then the category in small caps at wide tracking. The
 * contrast between the two does the work an icon would otherwise do.
 *
 * `size` drives the name; everything else is derived from it so the lockup
 * stays proportional at any scale.
 */

export default function Logo({
  className = "",
  size = 17,
  tone = "dark",
}: {
  className?: string;
  size?: number;
  tone?: "dark" | "light";
}) {
  const muted =
    tone === "light" ? "rgba(255,255,255,0.62)" : "var(--muted)";
  const rule =
    tone === "light" ? "rgba(255,255,255,0.25)" : "var(--border-strong)";

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span
        className="font-semibold"
        style={{ fontSize: size, letterSpacing: "-0.032em" }}
      >
        RQ&nbsp;Ops
      </span>

      {/* Hairline divider, optically centred against the cap height */}
      <span
        aria-hidden
        style={{
          width: 1,
          height: size * 0.66,
          background: rule,
          margin: `0 ${size * 0.46}px`,
          transform: `translateY(${size * 0.015}px)`,
        }}
      />

      <span
        className="font-medium uppercase"
        style={{
          fontSize: size * 0.6,
          letterSpacing: "0.17em",
          color: muted,
        }}
      >
        HVAC
      </span>
    </span>
  );
}
