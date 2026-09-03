"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
// Assume motion is fine during SSR; the client corrects on hydration.
const getServerSnapshot = () => false;

/**
 * Wraps the app in Lenis smooth scrolling.
 *
 * Disabled entirely when the visitor prefers reduced motion — hijacking
 * the scroll is exactly the kind of motion that setting asks us to drop.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // Lenis does NOT run its own RAF loop by default — without this it
        // mounts but never animates, and scrollTo() silently does nothing.
        autoRaf: true,
        // Let Lenis intercept in-page anchor links itself, offset for the
        // 64px sticky header.
        anchors: { offset: -64 },
        duration: 1.1,
        // Gentle ease-out so the page settles rather than drifts.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Native touch scrolling on mobile feels better than a simulated one.
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
