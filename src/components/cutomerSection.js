"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RING_MS = 13468;
const EASE_HP = [0.22, 1, 0.36, 1];
const QUOTE_MS = 6500;

const STORIES = [
  {
    id: "deel",
    name: "Deel",
    title: "Deel runs its entire company on Cal.com, from sales to support.",
    logo: "https://cal.com/landing/stories/deel-logo.png",
    invertLogo: false,
    image: "Dan-Westgarth.jpg",
    alt: "Dan Westgarth, COO of Deel, speaking on stage at Web Summit Rio",
    stats: [
      ["From $500M to $1.5B+", "ARR"],
      ["From 12s to <2s", "page loads"],
      ["6,000+", "hours saved per week"],
    ],
    hideStatsFrom: 1,
    href: "/customers/deel",
    built:
      "Attribute-based routing, Round-robin, Routing forms, Workflows, Instant meetings",
  },
  {
    id: "retell",
    name: "Retell AI",
    title: "Retell AI powers millions of AI phone calls on Cal.com's API.",
    logo: "https://cal.com/landing/stories/retell-ai-logo.png",
    invertLogo: true,
    image: "retell_ai.avif",
    alt: "The Retell AI team in front of the Y Combinator sign",
    stats: [
      ["10M+", "calls handled per month"],
      ["2+ days", "of build time saved per customer"],
    ],
    href: "/customers/retell-ai",
    built: "API v2, Atoms, Embeds",
  },
  {
    id: "storyblok",
    name: "Storyblok",
    title: "Storyblok balances demo bookings across 40+ countries.",
    logo: "https://cal.com/landing/stories/storyblok-logo.jpg",
    invertLogo: true,
    image: "Storyblok.webp",
    alt: "The Storyblok team at their conference stand",
    stats: [
      ["50%", "more demo efficiency"],
      ["40+", "countries covered"],
    ],
    href: "/customers/storyblok",
    built: "Fixed round-robin, Teams, Cal Video",
  },
  {
    id: "kiaora",
    name: "Kiaora",
    title: "Kiaora runs mission-critical healthcare scheduling across states.",
    logo: "https://cal.com/landing/stories/kiaora-healthcare-logo.jpg",
    invertLogo: false,
    image: "A-woman-Kiaora.jpg",
    alt: "A woman in a sunlit field, under the Kiaora Life Giving Therapies mark",
    stats: [
      ["24 hours", "of admin work saved per month"],
      ["Multi-state", "provider availability in one place"],
    ],
    href: "/customers/kiaora-healthcare",
    built: "Routing forms, Teams, Workflows",
  },
];

const QUOTES = [
  {
    text: "Just gave it a go and it's definitely the easiest meeting I've ever scheduled!",
    name: "Aria Minaei",
    role: "CEO, Theatre.JS",
    avatar: "https://cal.com/landing/avatar-aria-minaei.png",
  },
  {
    text: "I think Cal.com has a very good chance of creating a new category around being both great and well designed.",
    name: "Guillermo Rauch",
    role: "CEO, Vercel",
    avatar: "https://cal.com/landing/avatar-guillermo-rauch.png",
  },
  {
    text: "More elegant than Calendly, more open than SavvyCal, Cal.com works and it feels just right.",
    name: "Flo Merian",
    role: "Product Marketing, Mintlify",
    avatar: "https://cal.com/landing/avatar-flo-merian.png",
  },
  {
    text: "I just migrated from Calendly to Cal.com.",
    name: "Kent C. Dodds",
    role: "Founder of EpicWeb.dev",
    avatar: "https://cal.com/landing/avatar-kent-c-dodds.webp",
  },
  {
    text: "I finally made the move to Cal.com after I couldn't find how to edit events in the Calendly dashboard.",
    name: "Ant Wilson",
    role: "Co-Founder & CTO, Supabase",
    avatar: "https://cal.com/landing/avatar-ant-wilson.jpeg",
  },
  {
    text: "At Navi, protecting personal health information is a non-negotiable, so choosing Cal.com for scheduling just makes sense.",
    name: "Micah Friedland",
    role: "CEO & Founder, Navi",
    avatar: "https://cal.com/landing/avatar-navi.png",
  },
];

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function PixelCanvas({ src, label }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const CELL = 5;
      const W = canvas.width;
      const H = canvas.height;
      const sw = Math.ceil(W / CELL);
      const sh = Math.ceil(H / CELL);
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
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(small, 0, 0, sw, sh, 0, 0, sw * CELL, sh * CELL);
      setReady(true);
    };
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      width={2520}
      height={1102}
      className={cn(
        "absolute inset-0 block size-full bg-hp-paper [image-rendering:pixelated] dark:brightness-[0.88]",
        "transition-opacity duration-500 ease-out motion-reduce:transition-none",
        ready ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

function ProgressRing({ paused, onDone }) {
  const wrap = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const read = () => setBox({ w: el.offsetWidth, h: el.offsetHeight });
    const ro = new ResizeObserver(read);
    ro.observe(el);
    read();
    return () => ro.disconnect();
  }, []);

  const { w, h } = box;
  const r = 20;
  const s = 2;
  const mid = w / 2;
  const right = `M${mid} ${s}H${w - r - s}A${r} ${r} 0 0 1 ${w - s} ${r + s}V${h - r - s}A${r} ${r} 0 0 1 ${w - r - s} ${h - s}H${mid}`;
  const left = `M${mid} ${s}H${r + s}A${r} ${r} 0 0 0 ${s} ${r + s}V${h - r - s}A${r} ${r} 0 0 0 ${r + s} ${h - s}H${mid}`;

  const common = {
    fill: "none",
    pathLength: 1,
    stroke: "var(--hp-ring)",
    strokeDasharray: "1 2",
    strokeLinecap: "round",
    strokeWidth: 4,
    className: "hp-ring-path",
    style: {
      animationDuration: `${RING_MS}ms`,
      animationTimingFunction: "cubic-bezier(0.37, 0, 0.63, 1)",
      animationPlayState: paused ? "paused" : "running",
    },
  };

  return (
    <span
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] [--hp-ring:color-mix(in_oklab,var(--color-hp-ink)_16%,var(--color-hp-field))] max-tablet:[--line:3px]"
    >
      {w > 0 && (
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full overflow-visible"
        >
          <path d={right} {...common} onAnimationEnd={onDone} />
          <path d={left} {...common} />
        </svg>
      )}
    </span>
  );
}

function StoryItem({ story, index, open, paused, onToggle, onDone, onHover }) {
  const panelId = `story-panel-${story.id}`;
  const triggerId = `story-trigger-${story.id}`;

  return (
    <li
      data-index={index}
      data-open={open ? "" : undefined}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      className={cn(
        "group/row relative rounded-3xl border-0 bg-hp-field transition-colors duration-150 ease-out",
        !open && "hover:bg-hp-line",
      )}
    >
      {open && <ProgressRing key={story.id} paused={paused} onDone={onDone} />}

      <h3 className="flex">
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className="flex flex-1 cursor-pointer items-center justify-between gap-5 rounded-3xl p-4 text-left text-sm font-medium text-inherit outline-none transition-all [font:inherit] focus-visible:ring-[3px] focus-visible:ring-ring max-tablet:gap-3 max-tablet:p-3"
        >
          <span className="size-12 shrink-0 rounded-[14px] max-tablet:size-10 max-tablet:rounded-xl">
            <img
              alt=""
              src={story.logo}
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
              className={cn(
                "block size-full rounded-[inherit] object-cover",
                story.invertLogo && "dark:invert dark:hue-rotate-180",
              )}
            />
          </span>
          <span className="grid min-w-0 flex-1 gap-0.5">
            <span className="text-[13px] leading-[1.2] font-medium text-hp-muted">
              {story.name}
            </span>
            <span className="font-display text-2xl leading-[1.1] text-balance text-hp-ink max-tablet:text-lg">
              {story.title}
            </span>
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "box-content grid size-3.5 shrink-0 place-items-center rounded-full bg-hp-raised p-[11px] text-hp-ink transition-transform duration-[450ms] ease-hp",
              open && "rotate-180",
            )}
          >
            <ChevronDown className="size-3.5 opacity-80" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.45, ease: EASE_HP }}
            className="overflow-hidden text-sm text-muted-foreground"
          >
            <div className="p-0">
              <figure className="relative mx-4 my-0 aspect-[16/7] overflow-hidden rounded-2xl max-desktop:aspect-video max-tablet:mx-3 max-tablet:aspect-[4/3]">
                <PixelCanvas src={story.image} label={story.alt} />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 bg-[linear-gradient(to_top,rgba(17,17,17,0.55),transparent)] p-4 max-tablet:p-3">
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {story.stats.map(([value, label], i) => (
                      <li
                        key={value}
                        data-stat="true"
                        className={cn(
                          "inline-flex h-9 items-center rounded-full bg-hp-surface px-3.5 text-[13px] leading-none font-medium whitespace-nowrap text-hp-muted",
                          story.hideStatsFrom !== undefined &&
                            i >= story.hideStatsFrom &&
                            "max-tablet:hidden",
                        )}
                      >
                        <span className="inline-flex items-baseline gap-1.5 [text-box:trim-both_cap_alphabetic]">
                          <b className="font-display text-[17px] leading-none text-hp-ink">
                            {value}
                          </b>
                          <span>{label}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm leading-[21px] font-medium"
                  >
                    Read the story
                    <ChevronRight
                      className="size-2.5"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                  </Button>
                </figcaption>
              </figure>
              <p className="m-0 px-5 pt-3.5 pb-5 text-sm leading-[1.4] font-medium text-hp-muted max-tablet:px-4 max-tablet:pt-3 max-tablet:pb-4">
                <b className="font-semibold text-hp-ink">Built with</b>{" "}
                {story.built}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function QuoteCarousel({ running }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!running || hover) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % QUOTES.length),
      QUOTE_MS,
    );
    return () => clearTimeout(id);
  }, [active, running, hover]);

  return (
    <figure
      data-quote="guillermo"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative m-0 mt-[120px] mb-0 grid max-w-[880px] max-tablet:mt-20"
    >
      {QUOTES.map((q, i) => {
        const on = i === active;
        return (
          <div
            key={q.name}
            aria-hidden={!on}
            inert={!on ? true : undefined}
            className={cn(
              "[grid-area:1/1] transition-opacity duration-500 ease-out motion-reduce:transition-none",
              on ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <blockquote
              cite="https://cal.com/"
              className="m-0 font-display text-[40px] leading-[1.1] text-balance text-hp-ink before:content-['\201C'] after:content-['\201D'] max-desktop:text-[32px] max-tablet:text-[26px]"
            >
              {q.text}
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              <img
                alt=""
                src={q.avatar}
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="size-10 rounded-full object-cover"
              />
              <span className="grid text-left text-sm leading-[1.4] font-medium text-hp-muted">
                <b className="font-semibold text-hp-ink">{q.name}</b>
                {q.role}
              </span>
            </figcaption>
          </div>
        );
      })}
    </figure>
  );
}

export default function CustomersSection() {
  const ref = useRef(null);
  const visible = useInView(ref, { amount: 0.2 });
  const [openIndex, setOpenIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  const toggle = useCallback(
    (i) => setOpenIndex((cur) => (cur === i ? null : i)),
    [],
  );
  const advance = useCallback(
    () =>
      setOpenIndex((cur) => (cur === null ? null : (cur + 1) % STORIES.length)),
    [],
  );

  return (
    <section
      ref={ref}
      className="mx-auto w-[calc(100%-2*var(--page-margin))] max-w-[1152px] py-28"
    >
      <style>{`
        @keyframes hp-ring { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .hp-ring-path { animation-name: hp-ring; animation-fill-mode: both; }
      `}</style>

      <header className="grid max-w-[760px] justify-items-start gap-6">
        <h2 className="m-0 font-display text-[56px] leading-[1.05] text-balance text-hp-ink max-desktop:text-[44px] max-tablet:text-[34px] max-tablet:hyphens-auto max-tablet:[overflow-wrap:anywhere]">
          <span className="block">Trusted by teams</span>{" "}
          <span className="block">that meet at scale.</span>
        </h2>
        <Button
          variant="outline"
          className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm leading-[21px] font-medium"
        >
          Read stories
          <ChevronRight
            className="size-2.5"
            strokeWidth={2.4}
            aria-hidden="true"
          />
        </Button>
      </header>

      <ul className="m-0 mt-14 grid list-none gap-3 p-0 max-tablet:mt-10">
        {STORIES.map((story, i) => (
          <StoryItem
            key={story.id}
            story={story}
            index={i}
            open={openIndex === i}
            paused={hovering || !visible}
            onToggle={toggle}
            onDone={advance}
            onHover={setHovering}
          />
        ))}
      </ul>

      <QuoteCarousel running={visible} />
    </section>
  );
}
