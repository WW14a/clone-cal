"use client";

import { usePageInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Cloud,
  Video,
  MessageSquare,
  Users,
  Calendar,
} from "lucide-react";

import {
  SiFramer,
  SiGooglecalendar,
  SiHubspot,
  SiLinear,
  SiMeta,
  SiSlackware,
  SiStripe,
  SiWhatsapp,
  SiZapier,
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ElevenLabsIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <rect x="7" y="3" width="3.2" height="18" rx="1" />
    <rect x="13.8" y="3" width="3.2" height="18" rx="1" />
  </svg>
);

const UmamiIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3a9 9 0 0 0-9 9v1h18v-1a9 9 0 0 0-9-9Zm-7.5 12a8 8 0 0 0 15 0h-15Z" />
  </svg>
);

const DatabuddyIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#fff" />
    <path
      d="M8 8h5a3 3 0 0 1 0 6H8"
      stroke="#111"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 11.5 8 14l2.5 2.5"
      stroke="#111"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const brand = (Icon, color) =>
  function BrandIcon({ className }) {
    return <Icon className={className} style={{ color }} aria-hidden="true" />;
  };
const AppIcon = ({ src, className = "" }) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    className={cn("object-contain", className)}
  />
);

const BASE = "https://cal.com/landing/";

const APPS = {
  googlecalendar: {
    title: "Google Calendar",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/googlecalendar.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  office365calendar: {
    title: "Outlook Calendar",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/office365calendar.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  applecalendar: {
    title: "Apple Calendar",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/applecalendar.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  zoomvideo: {
    title: "Zoom Video",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/zoomvideo.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  googlevideo: {
    title: "Google Meet",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/googlevideo.webp?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  salesforce: {
    title: "Salesforce",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/salesforce.png?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  hubspot: {
    title: "HubSpot CRM",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/hubspot.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  slack: {
    title: "Slack",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/slack.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  stripepayment: {
    title: "Stripe",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/stripepayment.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  zapier: {
    title: "Zapier",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/zapier.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  databuddy: {
    title: "Databuddy",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/databuddy.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  framer: {
    title: "Framer",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/framer.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  elevenlabs: {
    title: "ElevenLabs",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/elevenlabs-dark.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  linear: {
    title: "Linear",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/linear.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  metapixel: {
    title: "Meta Pixel",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/metapixel.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  umami: {
    title: "Umami",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/umami.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
  whatsapp: {
    title: "WhatsApp",
    Icon: (props) => (
      <AppIcon
        src={`${BASE}apps/whatsapp.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko`}
        {...props}
      />
    ),
  },
};

const LEFT = [
  "googlecalendar",
  "office365calendar",
  "applecalendar",
  "zoomvideo",
  "googlevideo",
];
const RIGHT = [
  "salesforce",
  "hubspot",
  "slack",
  "stripepayment",
  "zapier",
  "databuddy",
];

const LIST = [
  [
    "googlecalendar",
    "Checks every calendar for conflicts and adds the booking.",
  ],
  ["zoomvideo", "Gives each booking its own meeting link."],
  ["salesforce", "Logs the meeting on the contact and routes to the owner."],
  ["hubspot", "Adds bookings to contacts and deals."],
  ["slack", "Tells the team the moment a meeting is booked."],
  ["stripepayment", "Takes payment when the slot is booked."],
  ["framer", "Puts your booking page on a Framer site."],
  ["elevenlabs", "Gives voice agents a realistic AI voice."],
  ["linear", "Sets your status to out of office from your calendar."],
  ["metapixel", "Measures bookings from your Meta ad campaigns."],
  ["umami", "Counts visits to your booking page, privately."],
  ["whatsapp", "Meets your guests on a WhatsApp chat or video call."],
];
const CYCLE = [...LEFT, ...RIGHT];

const REVEAL =
  "translate-y-6 opacity-0 transition-[opacity,transform] duration-600 ease-hp [transition-delay:calc(var(--i,0)*60ms)] group-data-in/section:translate-y-0 group-data-in/section:opacity-100 data-in:translate-y-0 data-in:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

const num = (n) => Number(n.toFixed(4));

function spread(count, center, step) {
  return Array.from({ length: count }, (_, i) =>
    num(center + (i - (count - 1) / 2) * step),
  );
}

function wideLayout() {
  const W = 1000;
  const H = 420;
  const cy = 222;
  const leftY = [86, 154, 222, 290, 358];
  const rightY = [74, 133.2, 192.4, 251.6, 310.8, 370];
  const leftEnd = spread(5, cy, 7.3514);
  const rightEnd = spread(6, cy, 6.4);
  const items = [
    ...LEFT.map((id, i) => ({
      id,
      x: 150,
      y: leftY[i],
      path: `M150,${leftY[i]} C292,${leftY[i]} 292,${leftEnd[i]} 434,${leftEnd[i]} L470,${leftEnd[i]}`,
      i,
    })),
    ...RIGHT.map((id, i) => ({
      id,
      x: 850,
      y: rightY[i],
      path: `M850,${rightY[i]} C708,${rightY[i]} 708,${rightEnd[i]} 566,${rightEnd[i]} L530,${rightEnd[i]}`,
      i,
    })),
  ];
  return {
    W,
    H,
    items,
    center: { x: 500, y: cy },
    node: "size-12",
    tile: "size-24 rounded-[22px]",
    tileText: "text-[30px]",
  };
}

function narrowLayout() {
  const W = 360;
  const H = 480;
  const topX = [36, 108, 180, 252, 324];
  const botX = [30, 90, 150, 210, 270, 330];
  const topEnd = spread(5, 180, 4.8);
  const botEnd = spread(6, 180, 4);
  const items = [
    ...LEFT.map((id, i) => ({
      id,
      x: topX[i],
      y: 92,
      path: `M${topX[i]},92 C${topX[i]},143 ${topEnd[i]},143 ${topEnd[i]},194 L${topEnd[i]},226`,
      i,
    })),
    ...RIGHT.map((id, i) => ({
      id,
      x: botX[i],
      y: 408,
      path: `M${botX[i]},408 C${botX[i]},357 ${botEnd[i]},357 ${botEnd[i]},306 L${botEnd[i]},274`,
      i,
    })),
  ];
  return {
    W,
    H,
    items,
    center: { x: 180, y: 250 },
    node: "size-10",
    tile: "size-20 rounded-[18px]",
    tileText: "text-[26px]",
  };
}

const WIDE = wideLayout();
const NARROW = narrowLayout();

function CalTile({ className }) {
  return (
    <span
      className={cn(
        "grid place-items-center bg-hp-surface shadow-hp-lift",
        "scale-95 opacity-0 group-data-in/hub:scale-100 group-data-in/hub:opacity-100",
        "transition-[opacity,scale] duration-500 ease-out",
        "motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none",
        "dark:shadow-[0_0_0_1px_var(--color-hp-hairline)]",
        className,
      )}
    >
      <img
        src="https://cal.com/landing/cal-tile.svg?dpl=dpl_HtFoWFLWovJYct9mjtFKJRKzBcko"
        alt="Cal.com"
        className="h-full w-full object-contain"
      />
    </span>
  );
}

function Diagram({ layout, wrapClass, hovered, onHover }) {
  const { W, H, items, center, node, tile, tileText } = layout;
  return (
    <figure
      aria-label="Cal.com and the tools it connects to"
      className={cn("relative mx-auto my-0 w-full", wrapClass)}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
        fill="none"
        viewBox={`0 0 ${W} ${H}`}
      >
        {items.map((it) => (
          <path
            key={it.id}
            d={it.path}
            data-line={it.id}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ transitionDelay: `${it.i * 60}ms` }}
            className={cn(
              "opacity-0 transition-[opacity,stroke] duration-700 ease-out group-data-in/hub:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none",
              hovered === it.id ? "stroke-hp-text" : "stroke-hp-muted/35",
            )}
          />
        ))}
      </svg>

      {items.map((it, n) => {
        const { Icon, title } = APPS[it.id];
        return (
          <span
            key={it.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(it.x / W) * 100}%`,
              top: `${(it.y / H) * 100}%`,
            }}
          >
            <span
              title={title}
              onMouseEnter={() => onHover(it.id)}
              onMouseLeave={() => onHover(null)}
              style={{ transitionDelay: `${300 + n * 70}ms` }}
              className={cn(
                node,
                "grid translate-y-2 place-items-center rounded-[14px] bg-hp-surface opacity-0 shadow-hp-raised transition-[opacity,translate] duration-500 ease-out",
                "group-data-in/hub:translate-y-0 group-data-in/hub:opacity-100",
                "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
              )}
            >
              <Icon className="size-[58%] object-contain" />
            </span>
          </span>
        );
      })}

      <span
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${(center.x / W) * 100}%`,
          top: `${(center.y / H) * 100}%`,
        }}
      >
        <CalTile className={tile} />{" "}
      </span>
    </figure>
  );
}

export default function AppStoreSection() {
  const ref = useRef(null);
  const inView = usePageInView(ref, { once: true, amount: 0.1 });
  const [hovered, setHovered] = useState(null);
  const [auto, setAuto] = useState(null);
  const index = useRef(0);
  const userHovering = hovered !== null;

  useEffect(() => {
    if (!inView || userHovering) return;

    const id = setInterval(() => {
      setAuto(CYCLE[index.current]);
      index.current = (index.current + 1) % CYCLE.length;
    }, 1400);

    return () => clearInterval(id);
  }, [inView, userHovering]);

  const active = hovered ?? auto;

  return (
    <section
      ref={ref}
      aria-label="App store"
      data-in={inView ? "true" : undefined}
      className="mx-auto w-[calc(100%-2*var(--page-margin))] max-w-[1152px] py-28 max-tablet:py-16 group/section grid gap-14 "
    >
      <div className="grid max-w-[760px] justify-items-start gap-6">
        <Badge
          variant="outline"
          className="h-8 w-fit max-w-full rounded-md border-hp-line bg-background px-3 text-sm font-medium text-hp-ink dark:bg-[color-mix(in_srgb,var(--color-hp-line)_32%,var(--background))]"
        >
          App store
        </Badge>

        <h2 className="m-0 font-display text-[56px] leading-[1.05] text-balance text-hp-ink max-desktop:text-[44px] max-tablet:text-[34px] max-tablet:hyphens-auto max-tablet:[overflow-wrap:anywhere]">
          <span className="block">All your key tools</span>{" "}
          <span className="block">in sync with your meetings.</span>
        </h2>

        <p
          style={{ "--i": 1 }}
          className={cn(
            "font-hp-display m-0 max-w-[640px] text-2xl leading-[1.35] font-medium text-pretty text-hp-quiet max-tablet:text-[19px] max-tablet:text-hp-muted",
            REVEAL,
          )}
        >
          Connects to Slack, Salesforce, and 100+ more. Bookings show up where
          your team already works.
        </p>

        <div
          style={{ "--i": 2 }}
          className={cn("flex flex-wrap gap-2", REVEAL)}
        >
          <Button className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm leading-[21px] font-medium">
            Get started
            <ChevronRight
              className="size-2.5 "
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </Button>
          <Button
            variant="outline"
            className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm leading-[21px] font-medium"
          >
            Explore apps
            <ChevronRight
              className="size-2.5"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>

      <div style={{ "--i": 3 }} className={REVEAL}>
        <div
          data-in={inView ? "true" : undefined}
          className="group/hub @container rounded-[28px] bg-hp-tint/[0.045] p-10 shadow-hp-plate max-tablet:rounded-[20px] max-tablet:px-4 max-tablet:py-6"
        >
          <Diagram
            layout={WIDE}
            wrapClass="max-w-[1000px] @max-[820px]:hidden"
            hovered={active}
            onHover={setHovered}
          />
          <Diagram
            layout={NARROW}
            wrapClass="max-w-[420px] @min-[820px]:hidden"
            hovered={active}
            onHover={setHovered}
          />

          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-5 border-t border-hp-hairline p-0 pt-10 max-tablet:mt-6 max-tablet:pt-6 @min-[560px]:grid-cols-2 @min-[560px]:gap-y-7 @min-[900px]:grid-cols-3">
            {LIST.map(([id, text]) => {
              const { Icon, title } = APPS[id];
              return (
                <li
                  key={id}
                  className="flex items-start gap-3.5"
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-hp-surface shadow-hp-raised">
                    <Icon className="size-5 object-contain" />
                  </span>
                  <span className="grid gap-0.5 text-[15px] leading-[1.4]">
                    <span className="font-medium text-hp-text">{title}</span>
                    <span className="text-pretty text-hp-subtle">{text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
