"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronRight, CornerDownLeft } from "lucide-react";
import { AiOutlineOpenAI } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE_HP = [0.22, 1, 0.36, 1];

const SLOTS = [
  ["my event", "a design meetup"],
  ["Oct 16 at 14:00", "Nov 7 at 18:00"],
  ["15:00", "21:00"],
  ["somewhere", "in Karachi"],
];

const STEP_MS = [400, 400, 400, 400, 500, 600, 600, 600, 700, 2000];

const HOLD = STEP_MS.length - 1;

const FACES = [
  {
    src: "https://cal.com/landing/film/karaoke-woman.webp",
    w: 320,
    x: 64,
    y: 42,
  },
  {
    src: "https://cal.com/landing/nav/focused-at-the-laptop.jpg",
    w: 360,
    x: 23,
    y: 48,
  },
  {
    src: "https://cal.com/landing/film/retirement-party-fun.webp",
    w: 460,
    x: 74,
    y: 30,
  },
];

const PRINTS = [
  {
    alt: "Bowls of snacks and jugs of juice laid out on a table, seen from above.",
    src: "print3.avif",
    pos: { left: "8%", top: "6%" },
    rotate: -7,
  },
  {
    alt: "Friends playing a card game on a picnic blanket.",
    src: "print2.avif",
    pos: { left: "50%", top: "30%" },
    rotate: 5,
  },
  {
    alt: "Neighbours dancing in the street at a block party between brownstones.",
    src: "print1.avif",
    pos: { left: "14%", top: "54%" },
    rotate: -3,
  },
];

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function PixelCanvas({ src, label, width, height, cell = 4, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const sw = Math.ceil(width / cell);
      const sh = Math.ceil(height / cell);
      const small = document.createElement("canvas");
      small.width = sw;
      small.height = sh;
      const sctx = small.getContext("2d");
      const ratio = Math.max(sw / img.width, sh / img.height);
      const dw = img.width * ratio;
      const dh = img.height * ratio;
      sctx.drawImage(img, (sw - dw) / 2, (sh - dh) / 2, dw, dh);
      const data = sctx.getImageData(0, 0, sw, sh);
      const d = data.data;
      const levels = 6;
      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          const i = (y * sw + x) * 4;
          const t = BAYER[y % 4][x % 4] / 16 - 0.5;
          for (let c = 0; c < 3; c++) {
            const v = d[i + c] / 255 + t / levels;
            d[i + c] =
              Math.round(Math.min(1, Math.max(0, v)) * (levels - 1)) *
              (255 / (levels - 1));
          }
        }
      }
      sctx.putImageData(data, 0, 0);
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(small, 0, 0, sw, sh, 0, 0, sw * cell, sh * cell);
    };
    return () => {
      cancelled = true;
    };
  }, [src, width, height, cell]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      width={width}
      height={height}
      className={cn(
        "block size-full bg-hp-paper [image-rendering:pixelated] dark:brightness-[0.88]",
        className,
      )}
    />
  );
}

const slotBase =
  "rounded px-0.5 underline decoration-hp-muted/60 decoration-dashed decoration-[1.5px] underline-offset-[0.16em] transition-[color,background-color] duration-100 ease-out";

function Sentence({ step }) {
  const filled = Math.min(step, 4);
  const focus = step < 4 ? step : -1;

  const render = (useFinalText) => (
    <>
      I&apos;m hosting{" "}
      {SLOTS.map(([placeholder, value], i) => {
        const isFilled = i < filled;
        const text = useFinalText || isFilled ? value : placeholder;
        return (
          <span key={i}>
            <span
              className={cn(
                slotBase,
                isFilled && "text-hp-text",
                !useFinalText && focus === i && "bg-hp-well",
              )}
            >
              {text}
            </span>
            {i === 0 && " on "}
            {i === 1 && " until "}
            {i === 2 && " "}
          </span>
        );
      })}
      .
    </>
  );

  return (
    <p className="m-0 grid font-display text-[44px] leading-[1.1] text-pretty text-hp-quiet max-desktop:text-[38px] max-tablet:text-[28px] [&>span]:[grid-area:1/1]">
      <span className="sr-only">
        I&apos;m hosting a design meetup on Nov 7 at 18:00 until 21:00 in
        Karachi.
      </span>
      <span aria-hidden="true" className="invisible">
        {render(true)}
      </span>
      <span aria-hidden="true">{render(false)}</span>
    </p>
  );
}

function CreateButton({ active }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center gap-1.5 self-start rounded-[10px] px-3 py-2 text-sm leading-none font-medium transition-[background-color,color] duration-100 ease-out",
        active ? "bg-hp-ink text-hp-plate" : "bg-hp-field text-hp-muted",
      )}
    >
      Create event
      <kbd className="inline-flex items-center gap-1">
        <kbd className="pointer-events-none inline-flex h-auto min-w-0 items-center justify-center gap-1 rounded bg-current/12 px-[5px] py-0.5 font-sans text-[11px] leading-none font-medium text-inherit select-none">
          <span className="win:hidden">⌘</span>
          <span className="hidden win:inline">Ctrl</span>
        </kbd>
        <kbd className="pointer-events-none inline-flex h-auto min-w-0 items-center justify-center gap-1 self-stretch rounded bg-current/12 px-[5px] font-sans text-xs font-medium text-inherit select-none">
          <CornerDownLeft className="size-[11px]" strokeWidth={2} />
        </kbd>
      </kbd>
    </span>
  );
}

function ListCard({ step }) {
  const published = step >= 6;
  return (
    <AnimatePresence>
      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.45, ease: EASE_HP }}
          className="absolute right-7 bottom-6 left-7 grid grid-cols-[76px_auto_1fr_auto] items-center gap-4 overflow-hidden rounded-[14px] bg-hp-raised pr-4 text-[13px] leading-[1.4] font-normal text-hp-subtle shadow-hp-raised max-tablet:right-3 max-tablet:bottom-3 max-tablet:left-3 max-tablet:grid-cols-[64px_auto_1fr] [&_b]:block [&_b]:font-semibold [&_b]:text-hp-text [&_span]:block"
        >
          <div className="h-[76px] max-tablet:h-16">
            <PixelCanvas
              src="Glasses-and-plates.jpg"
              label="Glasses and plates along a long table in the sun."
              width={152}
              height={152}
              cell={3}
            />
          </div>
          <div className="tabular-nums">
            <b>Fri, Nov 7</b>
            <span>18:00</span>
            <span
              className={cn(
                "mt-1 h-auto w-fit min-w-0 rounded border-0 px-1.5 py-px text-[11px] leading-normal font-medium transition-colors duration-200",
                published
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-hp-field text-hp-subtle",
              )}
            >
              {published ? "Published" : "Draft"}
            </span>
          </div>
          <div className="min-w-0">
            <b className="truncate">Design meetup</b>
            <span className="truncate">Karachi</span>
          </div>
          <span
            className={cn(
              "rounded-lg px-3 py-1.5 text-[13px] leading-none font-medium text-hp-text inset-ring inset-ring-hp-line-2 transition-opacity duration-200 ease-out max-tablet:hidden!",
              step === 5 ? "opacity-100" : "opacity-0",
            )}
          >
            Publish
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Prints({ step }) {
  const on = step === 8;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-opacity duration-200 ease-out",
        on ? "opacity-100" : "opacity-0",
      )}
    >
      {PRINTS.map((p, i) => (
        <motion.figure
          key={p.src}
          initial={false}
          animate={{
            opacity: on ? 1 : 0,
            rotate: on ? p.rotate : p.rotate * 2,
            y: on ? 0 : 24,
          }}
          transition={{
            duration: 0.55,
            ease: EASE_HP,
            delay: on ? i * 0.12 : 0,
          }}
          style={p.pos}
          className="absolute m-0 w-[42%] rounded-[3px] bg-hp-print-paper px-2 pt-2 pb-[30px] shadow-hp-print max-desktop:w-[30%] max-tablet:w-[44%] [&_canvas]:aspect-[5/4] [&_canvas]:h-auto"
        >
          <PixelCanvas
            src={p.src}
            label={p.alt}
            width={500}
            height={400}
            cell={5}
          />
        </motion.figure>
      ))}
    </div>
  );
}

function EventPage({ step }) {
  const going = step >= 8;
  return (
    <AnimatePresence>
      {step >= 7 && (
        <motion.div
          data-event-page="true"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: EASE_HP }}
          className="relative w-full max-w-[380px] overflow-hidden rounded-[18px] bg-hp-surface shadow-hp-float"
        >
          <div className="h-[132px] max-tablet:h-[104px] [&_canvas]:size-full [&_canvas]:object-cover">
            <PixelCanvas
              src="Guests-mingling.jpg"
              label="Guests mingling between long dinner tables, glasses in hand."
              width={760}
              height={264}
              cell={4}
            />
          </div>
          <div className="grid gap-3 p-5 max-tablet:p-4">
            <div className="grid gap-1">
              <span className="text-[12px] leading-none font-medium text-hp-subtle tabular-nums">
                Fri, Nov 7, 18:00
              </span>
              <b className="font-display text-[22px] leading-[1.1] font-semibold text-balance text-hp-ink">
                Design meetup in Karachi
              </b>
            </div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex [&>span]:size-6 [&>span]:shadow-[0_0_0_2px_var(--color-hp-surface)] [&>span+span]:-ml-1.5"
              >
                {FACES.map((f, i) => (
                  <motion.span
                    key={i}
                    initial={false}
                    animate={{
                      opacity: going ? 1 : 0,
                      scale: going ? 1 : 0.6,
                      y: going ? 0 : 6,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: EASE_HP,
                      delay: going ? 0.15 + i * 0.12 : 0,
                    }}
                    className="relative inline-block overflow-hidden rounded-full bg-hp-field"
                  >
                    <img
                      alt=""
                      src={f.src}
                      loading="lazy"
                      decoding="async"
                      className="absolute h-auto max-w-none"
                      style={{
                        width: `${f.w}%`,
                        left: `${f.x}%`,
                        top: `${f.y}%`,
                        transform: `translate(-${f.x}%, -${f.y}%)`,
                      }}
                    />
                  </motion.span>
                ))}
              </span>
              <span
                key={going ? "going" : "empty"}
                role="status"
                className="hp-swap text-[13px] leading-none text-hp-body tabular-nums"
              >
                {going
                  ? "3 going, 37 of 40 seats left"
                  : "0 going, 40 of 40 seats left"}
              </span>
            </div>
            <span
              aria-hidden="true"
              className={cn(
                "grid h-9 place-items-center rounded-[10px] bg-hp-ink text-sm leading-none font-medium text-hp-plate transition-opacity duration-100 ease-out",
                step === 9 ? "opacity-100" : "opacity-90",
              )}
            >
              Book a seat
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AgentReply({ step }) {
  return (
    <AnimatePresence>
      {step >= 9 && (
        <motion.div
          data-agent-reply="true"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.45, ease: EASE_HP }}
          className="absolute bottom-5 left-5 flex max-w-[300px] items-start gap-2.5 rounded-[14px] bg-hp-raised p-3 text-[13px] leading-[1.4] shadow-hp-raised max-tablet:right-3 max-tablet:bottom-3 max-tablet:left-3 max-tablet:max-w-none"
        >
          <span
            role="img"
            aria-label="ChatGPT"
            data-name="ChatGPT"
            style={{ "--size": "28px" }}
            className="relative inline-grid size-(--size) flex-none place-items-center rounded-[calc(var(--size)*12/56)] bg-hp-raised text-hp-ink shadow-hp-raised"
          >
            <AiOutlineOpenAI
              aria-hidden="true"
              className="size-[calc(var(--size)*0.6)]"
            />
          </span>
          <span className="grid gap-0.5">
            <b className="block font-semibold text-hp-ink">
              Booked 2 seats for Daniel and Tobias
            </b>
            <span className="block text-hp-subtle">
              ChatGPT, through Cal.com
            </span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EventsDemo({ running }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!running) return;

    if (step >= HOLD) return;

    const id = setTimeout(() => {
      setStep((s) => s + 1);
    }, STEP_MS[step]);

    return () => clearTimeout(id);
  }, [step, running]);

  return (
    <div
      data-step={step >= 9 ? "agent" : "compose"}
      className="grid min-h-[560px] w-full grid-cols-2 rounded-[28px] bg-hp-surface p-3 text-left text-hp-text shadow-hp-float max-desktop:grid-cols-1 max-tablet:rounded-[22px] max-tablet:p-2"
    >
      <div className="relative flex flex-col gap-6 px-10 pt-8 pb-[132px] max-tablet:px-5 max-tablet:pt-5">
        <div
          aria-hidden="true"
          className="mb-auto flex items-center gap-2 pb-8 [&>img]:h-[18px] [&>img]:w-auto"
        >
          <img
            alt=""
            src="https://cal.com/landing/logo.svg"
            width={83}
            height={18}
            loading="lazy"
            className="dark:hidden"
          />
          <img
            alt=""
            src="https://cal.com/landing/logo-white.svg"
            width={83}
            height={18}
            loading="lazy"
            className="hidden dark:block"
          />
          <span className="rounded-md bg-hp-well px-1.5 py-0.5 text-[11px] leading-[1.4] font-medium text-hp-body">
            Events
          </span>
        </div>

        <Sentence step={Math.min(step, 5)} />
        <CreateButton active={step >= 4} />
        <ListCard step={step} />
      </div>

      <div className="relative grid place-items-center overflow-hidden rounded-[18px] bg-hp-plate p-8 max-desktop:min-h-[460px] max-tablet:min-h-[440px] max-tablet:p-3">
        <Prints step={step} />
        <EventPage step={step} />
        <AgentReply step={step} />
      </div>
    </div>
  );
}

export default function EventsSection() {
  const ref = useRef(null);
  const visible = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <section
      ref={ref}
      id="events"
      className=" grid gap-14 max-tablet:gap-10 mx-auto w-[calc(100%-2*var(--page-margin))] max-w-[1152px] py-28 "
    >
      <style>{`
        @keyframes hp-swap { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .hp-swap { animation: hp-swap 320ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) { .hp-swap { animation: none; } }
      `}</style>

      <div className="grid max-w-[760px] justify-items-start gap-6 [&>a]:mt-2">
        <Badge
          variant="outline"
          className="h-8 w-fit max-w-full rounded-md border-hp-line bg-background px-3 text-sm font-medium text-hp-ink dark:bg-[color-mix(in_srgb,var(--color-hp-line)_32%,var(--background))]"
        >
          Cal.com Events
        </Badge>
        <h2 className="m-0 font-display text-[56px] leading-[1.05] text-balance text-hp-ink max-desktop:text-[44px] max-tablet:text-[34px] max-tablet:hyphens-auto max-tablet:[overflow-wrap:anywhere]">
          <span className="block">Hosting more than a meeting?</span>{" "}
          <span className="block">Events takes the whole room.</span>
        </h2>
        <p className="font-hp-display m-0 max-w-[640px] text-2xl leading-[1.35] font-medium text-pretty text-hp-quiet max-tablet:text-[19px] max-tablet:text-hp-muted">
          Write the event as a sentence. Tickets, the guest list and RSVPs run
          on the calendar your team already books through.
        </p>
        <Button className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm leading-[21px] font-medium">
          Host an event
          <ChevronRight
            className="size-2.5"
            strokeWidth={2.4}
            aria-hidden="true"
          />
        </Button>
      </div>

      <EventsDemo running={visible} />
    </section>
  );
}
