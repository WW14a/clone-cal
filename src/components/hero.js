"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { PiOpenAiLogoLight } from "react-icons/pi";

const PHOTOS = [
  {
    src: "party-sofas.webp",
    label: "Friends in costume on the sofas at a Halloween house party.",
  },
  {
    src: "party-kitchen.jpg",
    label: "Friends dancing in a kitchen at a house party.",
  },
  {
    src: "party-street.jpg",
    label:
      "Neighbours dancing in the street at a block party between brownstones.",
  },
];

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const W = 240;
const H = 138;

function dither(ctx) {
  const img = ctx.getImageData(0, 0, W, H);
  const d = img.data;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const t = (BAYER[(y % 4) * 4 + (x % 4)] / 16 - 0.5) * 36;
      for (let c = 0; c < 3; c++) {
        d[i + c] = Math.max(
          0,
          Math.min(255, Math.round((d[i + c] + t) / 32) * 32),
        );
      }
    }
  }
  ctx.putImageData(img, 0, 0);
}

function PixelCanvas({ photo, active }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.imageSmoothingEnabled = false;

    const fallback = () => {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#3a3a3a");
      g.addColorStop(1, "#8a7a6a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      dither(ctx);
    };

    const img = new Image();
    img.onload = () => {
      const s = Math.max(W / img.width, H / img.height);
      const w = img.width * s;
      const h = img.height * s;
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
      dither(ctx);
    };
    img.onerror = fallback;
    img.src = photo.src;
  }, [photo.src]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={photo.label}
      width={W}
      height={H}
      className={`block size-full bg-hp-paper [image-rendering:pixelated] dark:brightness-[0.88] absolute inset-0 transition-opacity ${
        active
          ? "opacity-100 duration-700 ease-out"
          : "opacity-0 duration-[400ms] ease-in"
      }`}
    />
  );
}

function PhotoPill() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % PHOTOS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-[0.86em] overflow-hidden rounded-[0.2em] bg-hp-field text-left text-[1em] tracking-normal align-[-0.12em] shadow-[inset_0_0_0_1px_var(--color-hp-line)] max-md:h-[0.98em] max-md:align-[-0.16em] w-[1.5em]"
    >
      {PHOTOS.map((p, i) => (
        <PixelCanvas key={p.src} photo={p} active={i === idx} />
      ))}
    </span>
  );
}

const STEP_MS = [1600, 900, 1700, 1700, 1700];
const SELECTED_STEPS = [1, 3, 4];

function fmt24(d) {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getSlotTimes() {
  const start = new Date();
  start.setSeconds(0, 0);
  start.setMinutes(start.getMinutes() < 30 ? 30 : 60);
  return [start, new Date(start.getTime() + 30 * 60000)].map(fmt24);
}

const SlotDot = () => <i className="size-[0.5em] rounded-full bg-[#22c55e]" />;
const SlotLogo = () => <PiOpenAiLogoLight />;

function SlotCard() {
  const [step, setStep] = useState(0);
  const [times, setTimes] = useState(["13:30", "14:00"]);

  useEffect(() => {
    const id = setTimeout(() => setTimes(getSlotTimes()), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(
      () => setStep((s) => (s + 1) % STEP_MS.length),
      STEP_MS[step],
    );
    return () => clearTimeout(t);
  }, [step]);

  const layer = (i, extra) =>
    `inline-flex items-center gap-[0.35em] [grid-area:1/1] transition-opacity duration-200 ease-out ${
      step === i ? "opacity-100" : "opacity-0"
    } ${extra}`;

  return (
    <span
      aria-hidden="true"
      className="relative inline-block overflow-hidden rounded-[0.2em] bg-hp-field text-left text-[1em] tracking-normal align-[-0.12em] shadow-[inset_0_0_0_1px_var(--color-hp-line)] max-md:align-[-0.16em] h-auto p-[0.125em] max-md:h-auto max-md:p-[0.15em]"
    >
      <span className="grid gap-[0.25em] font-sans text-[0.19em] leading-[1.25] font-medium tracking-normal whitespace-nowrap text-hp-body tabular-nums max-md:text-[0.215em]">
        <span className="flex items-center gap-[0.4em]">
          <span className="font-semibold text-hp-ink">Intro call</span>
          <span className="rounded-[0.35em] bg-hp-line px-[0.4em] text-[0.9em]">
            30m
          </span>
        </span>

        <span
          data-selected={SELECTED_STEPS.includes(step)}
          className="relative isolate grid h-[1.7em] items-center rounded-[0.45em] bg-hp-raised px-[0.6em] shadow-[inset_0_0_0_1px_var(--color-hp-line)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-hp-slot-selected before:opacity-0 before:transition-opacity before:duration-150 before:ease-in before:content-[''] data-[selected=true]:before:opacity-100"
        >
          <span className={layer(0, "text-hp-ink")}>
            <SlotDot /> {times[0]}
          </span>
          <span className={layer(1, "font-semibold text-hp-on-ink")}>
            <SlotDot /> {times[0]}
          </span>
          <span
            className={layer(
              2,
              "font-semibold text-hp-accent [&_svg]:size-[0.9em]",
            )}
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 10 10">
              <path
                d="m2 5.3 2 2 4-4.6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>{" "}
            Booked
          </span>
          <span className={layer(3, "font-semibold text-hp-on-ink")}>
            <SlotLogo /> {times[0]}
          </span>
          <span className={layer(4, "font-semibold text-hp-on-ink")}>
            <SlotLogo /> {times[1]}
          </span>
        </span>
      </span>
    </span>
  );
}

const ZONE_CODES = {
  Karachi: "KHI",
  Lahore: "LHE",
  London: "LON",
  Paris: "PAR",
  Berlin: "BER",
  New_York: "NYC",
  Los_Angeles: "LAX",
  Chicago: "CHI",
  Tokyo: "TYO",
  Dubai: "DXB",
  Kolkata: "CCU",
  Calcutta: "CCU",
  Singapore: "SIN",
  Sydney: "SYD",
  Toronto: "YYZ",
  Istanbul: "IST",
  Amsterdam: "AMS",
  Madrid: "MAD",
  Rome: "ROM",
  Cairo: "CAI",
};

const zoneCode = (zone) => {
  const city = zone.split("/").pop();
  return ZONE_CODES[city] ?? city.replace(/_/g, "").slice(0, 3).toUpperCase();
};

function zoneTime(zone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { h: get("hour") % 24, m: get("minute"), s: get("second") };
}

function getLocalZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

const TICKS = Array.from({ length: 60 }, (_, i) => i);
const handClass =
  "origin-[0_0] [stroke-linecap:round] [transform-box:view-box]";

function ClockPill() {
  const [zone] = useState(getLocalZone);
  const [t, setT] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => setT(zoneTime(zone));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [zone]);

  const hour = ((t.h % 12) + t.m / 60 + t.s / 3600) * 30;
  const minute = (t.m + t.s / 60) * 6;
  const second = t.s * 6;

  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-[0.86em] overflow-hidden rounded-[0.2em] bg-hp-field text-left text-[1em] tracking-normal align-[-0.12em] shadow-[inset_0_0_0_1px_var(--color-hp-line)] max-md:h-[0.98em] max-md:align-[-0.16em] w-[max(1.45em,70px)] px-[0.06em]"
    >
      <span className="flex h-full items-center gap-[0.08em]" data-zone={zone}>
        <span className="aspect-square h-[calc(100%-0.12em)] w-auto flex-none rounded-full bg-hp-raised shadow-hp-raised">
          <svg
            aria-hidden="true"
            className="block size-full"
            viewBox="-50 -50 100 100"
          >
            {TICKS.map((i) => {
              const major = i % 5 === 0;
              return (
                <line
                  key={i}
                  className={
                    major
                      ? "stroke-hp-ink stroke-[2.6]"
                      : "stroke-hp-ink stroke-[0.9] opacity-55"
                  }
                  transform={`rotate(${i * 6})`}
                  x1="0"
                  x2="0"
                  y1="-44"
                  y2={major ? -35 : -40}
                />
              );
            })}
            <line
              className={`${handClass} stroke-hp-text stroke-[5.5]`}
              style={{ transform: `rotate(${hour}deg)` }}
              x1="0"
              x2="0"
              y1="5"
              y2="-24"
            />
            <line
              className={`${handClass} stroke-hp-text stroke-[3.6]`}
              style={{ transform: `rotate(${minute}deg)` }}
              x1="0"
              x2="0"
              y1="7"
              y2="-37"
            />
            <line
              className={`${handClass} stroke-hp-accent stroke-[1.4]`}
              style={{ transform: `rotate(${second}deg)` }}
              x1="0"
              x2="0"
              y1="10"
              y2="-40"
            />
            <circle className="fill-hp-text" r="3.6" />
          </svg>
        </span>
        <span className="flex-none text-[max(10px,0.19em)] leading-none font-semibold tracking-normal text-hp-ink">
          {zoneCode(zone)}
        </span>
      </span>
    </span>
  );
}

const primaryBtn =
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap border font-medium outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background px-[calc(var(--spacing)*4-1px)] inset-shadow-[0_1px_rgba(255,255,255,0.16)] border-primary bg-primary text-primary-foreground shadow-primary/24 shadow-xs hover:bg-primary/90 active:inset-shadow-[0_1px_rgba(0,0,0,0.08)] active:shadow-none h-14 w-full rounded-xl md:flex-1 text-lg md:h-16 md:text-xl";

const secondaryBtn =
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap border font-medium outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background px-[calc(var(--spacing)*4-1px)] border-input bg-popover text-foreground shadow-xs/5 hover:bg-accent/50 dark:bg-input/32 dark:hover:bg-input/64 active:shadow-none h-14 w-full rounded-xl md:flex-1 text-lg md:h-16 md:text-xl";

export default function Hero() {
  return (
    <section
      data-step="person"
      className="mx-auto w-[calc(100%-2*var(--page-margin))] max-w-(--page-max) pt-[168px] pb-24 text-center max-lg:pt-[136px] max-md:pt-28 max-md:pb-24"
    >
      <div className="mb-7 flex flex-wrap items-center justify-center gap-2 max-md:mb-5">
        <a
          data-slot="badge"
          className="relative inline-flex shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background min-h-8 rounded-md border border-hp-line px-3 font-medium text-hp-ink text-sm sm:h-8 bg-background dark:bg-[color-mix(in_srgb,var(--color-hp-line)_32%,var(--background))] h-auto w-fit max-w-full items-start justify-start gap-2 whitespace-normal py-1 text-start no-underline sm:items-center sm:whitespace-nowrap sm:py-0 ps-[3px] transition-colors duration-100 ease-out motion-reduce:transition-none dark:hover:bg-[color-mix(in_srgb,var(--color-hp-line)_56%,var(--background))]"
        >
          <span className="inline-flex h-6 shrink-0 items-center justify-center rounded-[4px] bg-hp-chip px-2 font-medium text-[11px] text-hp-ink uppercase leading-none tracking-[0.06em]">
            New
          </span>
          <span className="min-w-0 self-center text-pretty sm:truncate">
            Cal.com launches v6.9.5
          </span>
        </a>
      </div>

      <h1
        aria-label="Where people find the time to meet"
        className="mx-auto my-0 max-w-[980px] font-display text-[80px] leading-[1.08] text-balance text-hp-ink max-lg:text-[60px] max-md:text-[42px]"
      >
        Where <PhotoPill /> people <SlotCard /> find <ClockPill /> the time to
        meet
      </h1>

      <p className="mt-5 mb-0 text-xl leading-[1.4] font-medium text-balance text-hp-muted max-md:mt-4 max-md:text-[17px]">
        Making time for millions of people every month.
      </p>

      <div className="mx-auto mt-8 flex w-full max-w-[640px] flex-col gap-4 md:mx-auto [&_p]:text-center">
        <div className="flex flex-col gap-4 md:flex-row">
          <a
            data-slot="button"
            data-tracking-id="button-signup-google-(hero)"
            className={primaryBtn}
          >
            <NextImage
              src="/google-icon.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="size-5"
            />
            Sign up with Google
          </a>
          <a
            data-slot="button"
            data-tracking-id="button-signup-microsoft-(hero)"
            className={secondaryBtn}
          >
            <NextImage
              src="/microsoft-logo.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="size-5"
            />
            Sign up with Microsoft
          </a>
        </div>
        <p className="text-center text-muted-foreground text-sm md:text-left">
          <a
            data-tracking-id="button-signup-email-(hero)"
            className="font-medium text-foreground no-underline hover:text-muted-foreground"
          >
            Sign up with email.
          </a>{" "}
          No credit card required.
        </p>
      </div>
    </section>
  );
}
