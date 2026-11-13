"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function ProgressRing({ durationMs, paused, onDone, pathRef }) {
  const spanRef = React.useRef(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [g, setG] = React.useState(null);

  React.useLayoutEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    const card = span.nextElementSibling;

    const measure = () => {
      const line =
        parseFloat(getComputedStyle(span).getPropertyValue("--line")) || 4;

      const radius = card
        ? parseFloat(getComputedStyle(card).borderTopLeftRadius) || 22
        : 22;

      setG({
        w: span.offsetWidth,
        h: span.offsetHeight,
        r: Math.max(radius - line / 2, 0),
        line,
      });
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(span);

    return () => ro.disconnect();
  }, []);

  const pathClass = cn(
    "animate-hp-ring group-hover/row:[animation-play-state:paused] group-has-[:focus-visible]/row:[animation-play-state:paused]",
    paused && "[animation-play-state:paused]",
  );

  const anim = {
    animationDuration: `${durationMs}ms`,
    animationDelay: "0ms",
    animationTimingFunction: "cubic-bezier(0.37, 0, 0.63, 1)",
  };

  let body = null;

  if (g) {
    const { w, h, r, line } = g;
    const i = line / 2;
    const cx = w / 2;

    const right = `M${cx} ${i}H${w - i - r}A${r} ${r} 0 0 1 ${w - i} ${i + r}V${h - i - r}A${r} ${r} 0 0 1 ${w - i - r} ${h - i}H${cx}`;

    const left = `M${cx} ${i}H${i + r}A${r} ${r} 0 0 0 ${i} ${i + r}V${h - i - r}A${r} ${r} 0 0 0 ${i + r} ${h - i}H${cx}`;

    const common = {
      fill: "none",
      pathLength: 1,
      stroke: "var(--stroke)",
      strokeDasharray: "1 2",
      strokeLinecap: "round",
      strokeWidth: line,
      "data-progress-hook": "true",
      style: anim,
      className: pathClass,
    };

    body = (
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          <clipPath id={`${uid}-0`}>
            <rect x={cx} y={-4} width={cx + 4} height={h + 8} />
          </clipPath>

          <clipPath id={`${uid}-1`}>
            <rect x={-4} y={-4} width={cx + 4} height={h + 8} />
          </clipPath>
        </defs>

        <path
          ref={pathRef}
          clipPath={`url(#${uid}-0)`}
          d={right}
          onAnimationEnd={onDone}
          {...common}
        />

        <path clipPath={`url(#${uid}-1)`} d={left} {...common} />
      </svg>
    );
  }

  return (
    <span
      ref={spanRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] [--bend:calc(var(--radius-3xl)+var(--line))] [--line:4px] [--stroke:color-mix(in_oklab,var(--color-hp-ink)_16%,var(--color-hp-field))] max-tablet:[--line:3px] max-md:[--bend:calc(var(--radius-2xl)+var(--line))]"
    >
      {body}
    </span>
  );
}

export default ProgressRing;
