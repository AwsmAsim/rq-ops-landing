"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import Logo from "./Logo";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#intake", label: "What you get" },
  { href: "#fit", label: "Who it's for" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // useLenis() is undefined until the provider mounts. Normalise to null so
  // the effect dependency arrays below keep a stable size across renders.
  const lenis = useLenis() ?? null;

  // Lenis intercepts anchor links itself (see the `anchors` option in
  // SmoothScroll), so links only need to close the mobile menu here.
  const scrollTo = () => () => setOpen(false);

  // Lenis emits its own scroll events; the native listener covers the
  // reduced-motion case where Lenis is not mounted at all.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();

    if (lenis) {
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  // Prevent background scrolling while the mobile menu is open. Lenis owns
  // the scroll, so body overflow alone would not hold it — stop it directly
  // and keep the overflow lock for the reduced-motion (no Lenis) case.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();

    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, lenis]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-colors ${
        scrolled ? "border-[var(--border)]" : "border-transparent"
      }`}
    >
      {/* Three zones: identity left, navigation centred, actions right.
          The centre column is absolutely placed so it stays optically
          centred regardless of how wide the two side zones become. */}
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" aria-label="RQ Ops — home">
          <Logo size={17} />
        </a>

        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
          <div className="pointer-events-auto flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={scrollTo()}
                className="text-[0.9375rem] text-[var(--foreground)] opacity-80 transition-opacity hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="#faq"
            onClick={scrollTo()}
            className="text-[0.9375rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Questions
          </a>
          <a
            href="#book"
            onClick={scrollTo()}
            className="rounded-lg bg-[var(--accent)] px-3.5 py-1.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Book a call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-[2px] w-6 bg-[var(--foreground)] transition-transform duration-300 ${
                open ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-[2px] w-6 bg-[var(--foreground)] transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[2px] w-6 bg-[var(--foreground)] transition-transform duration-300 ${
                open ? "top-[7px] -rotate-45" : "top-[14px]"
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-[var(--border)] bg-white md:hidden"
        >
          <div className="flex flex-col px-5 py-4 sm:px-8">
            {[...LINKS, { href: "#faq", label: "FAQ" }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={scrollTo()}
                className="border-b border-[var(--border)] py-4 text-base text-[var(--muted)] last:border-b-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={scrollTo()}
              className="mt-4 rounded-lg bg-[var(--accent)] px-5 py-3.5 text-center text-base font-medium text-white"
            >
              Book a call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
