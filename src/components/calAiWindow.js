"use client";

import { useEffect, useRef, useState } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { TiWiFi } from "react-icons/ti";
import { IoBatteryFullOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa6";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  BookOpen,
  Box,
  Calendar,
  ChartColumn,
  ChevronsUpDown,
  Clock,
  Download,
  EllipsisVertical,
  Hash,
  House,
  Info,
  LayoutGrid,
  Link as LinkIcon,
  ListFilter,
  Maximize2,
  MessagesSquare,
  Minus,
  Plus,
  RotateCw,
  SlidersHorizontal,
  Split,
  Star,
  ThumbsDown,
  ThumbsUp,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";
import ProgressRing from "./progressRing";

const ACTIVE =
  "visible scale-100 opacity-100 blur-none transition-[opacity,filter,scale,visibility] delay-100 duration-[260ms] ease-out motion-reduce:transition-none";
const INACTIVE =
  "invisible scale-[0.985] opacity-0 blur-[2px] transition-[opacity,filter,scale,visibility] duration-200 ease-in motion-reduce:transition-none";

function Reveal({ children, i = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ "--i": i }}
      className="translate-y-6 opacity-0 transition-[opacity,transform] duration-600 ease-hp [transition-delay:calc(var(--i,0)*60ms)] data-in:translate-y-0 data-in:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
    >
      {children}
    </div>
  );
}

function useTyped(text, on, ms = 28, paused = false) {
  const [n, setN] = useState(0);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  useEffect(() => {
    if (!on) {
      setN(0);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, ms);
    return () => clearInterval(id);
  }, [on, text, ms]);
  return text.slice(0, n);
}

const TABS = [
  {
    id: "web",
    label: "Web app",
    blurb: "Charts from your bookings, next to the page you have open.",
    ms: 9500,
    marks: [0, 500, 1500, 3200, 4600],
  },
  {
    id: "slack",
    label: "Slack",
    blurb: "DM the Cal.com app, or type /cal in any channel.",
    ms: 10000,
    marks: [0, 600, 2400, 3200, 4400, 5600, 7200],
  },
  {
    id: "imessage",
    label: "iMessage",
    blurb: "Text Cal.com like you would a friend.",
    ms: 9500,
    marks: [0, 500, 2200, 3200, 4600],
  },
];

function useTabClock(tabIndex, autoplay, paused, onNext) {
  const [step, setStep] = useState(0);
  const pausedRef = useRef(paused);
  const nextRef = useRef(onNext);
  pausedRef.current = paused;
  nextRef.current = onNext;

  useEffect(() => {
    const tab = TABS[tabIndex];
    let elapsed = 0;
    setStep(0);
    const id = setInterval(() => {
      if (pausedRef.current) return;
      elapsed += 100;
      if (elapsed >= tab.ms) {
        if (autoplay) {
          nextRef.current();
          return;
        }
        elapsed = 0;
      }
      const s = tab.marks.filter((m) => m <= elapsed).length - 1;
      setStep((p) => (p === s ? p : s));
    }, 100);
    return () => clearInterval(id);
  }, [tabIndex, autoplay]);

  return step;
}

const Cal = ({ className = "" }) => (
  <span
    className={`grid shrink-0 place-items-center bg-[#101010] font-display text-white ${className}`}
  >
    Cal
  </span>
);

const rise = (on) =>
  `transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`;

function WindowShell({ children, search }) {
  return (
    <div
      aria-hidden="true"
      data-app-frame="true"
      className="hp-window @container flex flex-col overflow-hidden rounded-[12px] win:rounded-[8px] text-left font-os text-[13px] text-hp-ink shadow-[0_0_0_1px_var(--color-hp-line-2),0_20px_44px_-20px_rgba(0,0,0,0.3)] bg-hp-plate h-full w-full max-w-[1040px]"
    >
      <div className="relative flex h-10 shrink-0 items-center gap-3 px-4">
        <span aria-hidden="true" className="flex shrink-0 gap-2 win:hidden">
          <span className="size-3 rounded-full bg-hp-mac-close" />
          <span className="size-3 rounded-full bg-hp-mac-minimize" />
          <span className="size-3 rounded-full bg-hp-mac-zoom" />
        </span>
        {search && (
          <span className="mx-auto flex h-6 w-[min(46%,420px)] items-center rounded-[6px] bg-hp-tint/[0.07] px-2.5 text-[12px] text-hp-subtle">
            {search}
          </span>
        )}
        <span
          aria-hidden="true"
          data-caption-buttons="true"
          className="hidden shrink-0 items-center text-hp-subtle win:flex -me-4 ms-auto self-stretch"
        >
          <span className="grid h-full min-h-7 w-9 place-items-center @max-[420px]:w-7">
            <svg
              aria-hidden="true"
              className="size-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 10 11"
            >
              <path d="M0 5.5h10" />
            </svg>
          </span>
          <span className="grid h-full min-h-7 w-9 place-items-center @max-[420px]:w-7">
            <svg
              aria-hidden="true"
              className="size-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 10 11"
            >
              <rect height="9" rx="1.5" width="9" x=".5" y="1" />
            </svg>
          </span>
          <span className="grid h-full min-h-7 w-9 place-items-center @max-[420px]:w-7">
            <svg
              aria-hidden="true"
              className="size-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 10 11"
            >
              <path d="M.5 1l9 9m0-9l-9 9" />
            </svg>
          </span>
        </span>
      </div>
      <div className="flex min-h-0 flex-1">{children}</div>
    </div>
  );
}

function smooth(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const SERIES = {
  scheduled: [17, 18, 16, 24, 18, 16, 17, 19, 21, 20],
  completed: [15, 17, 14, 21, 16, 15, 15, 17, 19, 18.5],
  cancelled: [1.5, 2, 2.5, 2.5, 3.5, 2, 1, 0.8, 1, 0.3],
};
const CX = (i) => 30 + (i * 190) / 9;
const CY = (v) => 106 - (v / 25) * 96;
const toPts = (arr) => arr.map((v, i) => [CX(i), CY(v)]);

function TrendChart({ draw }) {
  const white = smooth(toPts(SERIES.scheduled));
  const line = (d, stroke, delay) => (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      pathLength="1"
      style={{
        strokeDasharray: 1,
        strokeDashoffset: draw ? 0 : 1,
        transition: `stroke-dashoffset 1300ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    />
  );
  return (
    <svg viewBox="0 0 240 134" className="block w-full">
      <defs>
        <linearGradient id="trend-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 5, 10, 15, 20, 25].map((v) => (
        <g key={v}>
          <text
            x="8"
            y={CY(v) + 3}
            className="fill-hp-ink"
            fontSize="7.5"
            opacity="0.85"
          >
            {v}
          </text>
          <line
            x1="26"
            x2="226"
            y1={CY(v)}
            y2={CY(v)}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeDasharray="2 3"
            className="text-hp-ink"
          />
        </g>
      ))}
      <path
        d={`${white} L${CX(9)},${CY(0)} L${CX(0)},${CY(0)} Z`}
        fill="url(#trend-fade)"
        style={{
          opacity: draw ? 1 : 0,
          transition: "opacity 900ms ease-out 500ms",
        }}
      />
      {line(smooth(toPts(SERIES.cancelled)), "#f87171", 200)}
      {line(smooth(toPts(SERIES.completed)), "#5eead4", 100)}
      {line(white, "#ffffff", 0)}
      {[
        ["Sep 7", 30],
        ["Oct 5", 120],
        ["Today", 214],
      ].map(([t, x]) => (
        <text
          key={t}
          x={x}
          y="126"
          textAnchor="middle"
          fontSize="7.5"
          className="fill-hp-ink"
          opacity="0.75"
        >
          {t}
        </text>
      ))}
    </svg>
  );
}

function Donut({ draw }) {
  const segs = [
    [0.79, "#f5f5f5"],
    [0.075, "#5a5a5a"],
    [0.055, "#3c3c3c"],
    [0.04, "#2c2c2c"],
  ];
  let acc = 0;
  return (
    <svg viewBox="0 0 120 120" className="size-[120px]">
      <g transform="rotate(-90 60 60)">
        {segs.map(([len, color], i) => {
          const start = acc;
          acc += len + 0.012;
          return (
            <circle
              key={i}
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke={color}
              strokeWidth="11"
              pathLength="1"
              strokeDasharray={`${len} ${1 - len}`}
              style={{
                strokeDashoffset: draw ? -start : -start + len,
                transition: `stroke-dashoffset 1000ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                opacity: draw ? 1 : 0,
              }}
            />
          );
        })}
      </g>
      <text
        x="60"
        y="58"
        textAnchor="middle"
        className="fill-hp-ink"
        fontSize="17"
        fontWeight="600"
      >
        130
      </text>
      <text
        x="60"
        y="71"
        textAnchor="middle"
        className="fill-hp-ink"
        fontSize="7"
        opacity="0.8"
      >
        Total events
      </text>
    </svg>
  );
}

const NAV = [
  [House, "Home"],
  [LinkIcon, "Links"],
  [Calendar, "Bookings"],
  [Clock, "Availability"],
  [Users, "Teams"],
  [LayoutGrid, "Apps"],
  [Split, "Routing"],
  [Zap, "Workflows"],
];
const SUBNAV = [
  "Bookings",
  "Routing",
  "Out of office",
  "Router position",
  "Call history",
  "Wrong routing",
];

const STATS = [
  ["Average ratings", "4.4", "0%", null],
  ["No-Show (Host)", "2", "-33%", "down"],
  ["No-Show (Guest)", "10", "0%", null],
  ["CSAT score", "89.7", "-5%", "down"],
];

const Btn = ({ children, className = "" }) => (
  <span
    className={`inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#222222] px-3 text-[12px] font-semibold text-white/90 border border-white/[0.08] shadow-sm hover:bg-[#282828] transition-colors cursor-pointer ${className}`}
  >
    {children}
  </span>
);

function WebBrowserFrame({ children }) {
  return (
    <div
      aria-hidden="true"
      data-app-frame="true"
      className="hp-window @container flex flex-col overflow-hidden rounded-[12px] text-left font-os text-[13px] text-hp-ink bg-[#171717] h-full w-full max-w-[1040px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_44px_-20px_rgba(0,0,0,0.5)] border border-white/[0.08]"
    >
      <div className="flex h-[38px] shrink-0 items-end justify-between bg-[#141414] px-2 border-b border-white/[0.06]">
        <div className="flex items-end gap-1">
          <div className="relative flex h-[31px] w-[210px] min-w-0 items-center gap-2 rounded-t-[8px] bg-[#1e1e1e] px-3 text-[12px] text-white/90 border-t border-x border-white/[0.08]">
            <span className="grid size-4 shrink-0 place-items-center rounded-[3px] bg-black font-display text-[8px] font-bold text-white">
              Cal
            </span>
            <span className="min-w-0 flex-1 truncate font-medium">
              Insights | Cal.com
            </span>
            <X
              className="size-3 shrink-0 text-white/40 hover:text-white cursor-pointer"
              aria-hidden="true"
            />
          </div>
          <button
            type="button"
            className="mb-1 ms-1 grid size-6 place-items-center rounded-md text-white/40 hover:bg-white/[0.06] hover:text-white"
          >
            <Plus className="size-3.5" />
          </button>
        </div>

        <div className="flex items-center text-white/50 -me-2 h-full">
          <span className="grid h-full w-10 place-items-center hover:bg-white/[0.06] hover:text-white cursor-pointer">
            <Minus className="size-3" />
          </span>
          <span className="grid h-full w-10 place-items-center hover:bg-white/[0.06] hover:text-white cursor-pointer">
            <svg
              aria-hidden="true"
              className="size-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 10 10"
            >
              <rect height="8" width="8" x="1" y="1" rx="1" />
            </svg>
          </span>
          <span className="grid h-full w-10 place-items-center hover:bg-[#e81123] hover:text-white cursor-pointer">
            <X className="size-3" />
          </span>
        </div>
      </div>

      <div className="flex h-10 shrink-0 items-center gap-2.5 bg-[#1e1e1e] px-3 text-white/60 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5">
          <ArrowLeft className="size-3.5 text-white/70 hover:text-white cursor-pointer" />
          <ArrowRight className="size-3.5 text-white/30" />
          <RotateCw className="size-3.5 text-white/70 hover:text-white cursor-pointer" />
        </div>

        <div className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#141414] px-3 text-[12px] border border-white/[0.06]">
          <SlidersHorizontal className="size-3 shrink-0 text-white/50" />
          <span className="truncate text-white/90 font-normal">
            app.cal.com/insights
          </span>
          <Star className="ms-auto size-3.5 shrink-0 text-white/40 hover:text-white cursor-pointer" />
        </div>

        <div className="flex items-center gap-2 text-white/60">
          <span className="grid size-6 place-items-center rounded-full bg-white/[0.06] text-white/70">
            <UserRound className="size-3.5" />
          </span>
          <EllipsisVertical className="size-3.5 text-white/60 hover:text-white cursor-pointer" />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 bg-[#181818] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function WebScene({ step, active }) {
  return (
    <div
      aria-hidden={!active}
      className={`[grid-area:1/1] h-full w-full min-h-0 min-w-0 ${active ? ACTIVE : INACTIVE}`}
    >
      <WebBrowserFrame>
        <div className="flex size-full bg-hp-surface text-hp-text">
          <div className="flex w-[184px] shrink-0 flex-col gap-0.5 border-r border-white/[0.08] bg-[#191919] p-3 @max-[720px]:hidden">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <img
                alt=""
                width="20"
                height="20"
                src="https://cal.com/landing/film/graduation-portrait.webp"
                className="size-5 rounded-full object-cover object-[47%_30%]"
              />
              <span className="font-medium text-[13px] text-white">
                Lena Brandt
              </span>
            </div>
            <div className="h-1" />
            {NAV.map(([Icon, label]) => (
              <span
                key={label}
                className="flex h-7 items-center gap-2.5 rounded-md px-2 text-[12.5px] text-hp-body hover:text-white transition-colors cursor-pointer"
              >
                <Icon
                  strokeWidth={1.75}
                  className="size-4 text-hp-subtle"
                  aria-hidden="true"
                />
                {label}
              </span>
            ))}
            <span className="flex h-7 items-center gap-2.5 rounded-md px-2 text-[12.5px] text-white font-medium">
              <ChartColumn
                strokeWidth={1.75}
                className="size-4 text-hp-subtle"
                aria-hidden="true"
              />
              Insights
            </span>
            {SUBNAV.map((label, i) => (
              <span
                key={label}
                className={`ms-2 flex h-7 items-center rounded-md px-3 text-[12.5px] transition-colors cursor-pointer ${
                  i === 0
                    ? "bg-[#282828] font-medium text-white"
                    : "text-hp-body hover:text-white"
                }`}
              >
                {label}
              </span>
            ))}
            <span className="mt-auto flex h-7 items-center gap-2.5 px-2 text-[12.5px] text-hp-body hover:text-white transition-colors cursor-pointer">
              <BookOpen
                strokeWidth={1.75}
                className="size-4 text-hp-subtle"
                aria-hidden="true"
              />
              Help
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden p-5 justify-between">
            <div>
              <p className="m-0 font-display text-[20px] font-semibold text-white leading-tight">
                Insights
              </p>
              <p className="mt-1 mb-0 text-[12px] text-hp-subtle">
                View booking insights across your events
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Btn>
                      <span className="grid size-4 place-items-center rounded-full bg-white text-[8px] font-bold text-black">
                        N
                      </span>
                      Team: Northwind Sales
                      <ChevronsUpDown className="size-3 opacity-60" />
                    </Btn>
                    <Btn>
                      <ListFilter className="size-3.5 opacity-70" />
                      Filter
                    </Btn>
                  </div>
                  <Btn>
                    <Download className="size-3.5 opacity-70" />
                    Download
                  </Btn>
                </div>
                <div className="flex items-center">
                  <Btn>
                    <Calendar className="size-3.5 opacity-70" />
                    Month to date
                  </Btn>
                </div>
              </div>

              <div className="mt-3.5 rounded-xl border border-white/[0.08] bg-[#1e1e1e]/50 p-2.5">
                <p className="m-0 px-1 pb-2 text-[12px] font-semibold text-white/90">
                  Performance
                </p>
                <div className="grid grid-cols-4 rounded-lg border border-white/[0.08] bg-[#161616] divide-x divide-white/[0.08] @max-[900px]:grid-cols-2">
                  {STATS.map(([label, value, delta, dir], i) => (
                    <div key={label} className="px-3 py-2.5">
                      <p className="m-0 flex items-center gap-1 truncate text-[10.5px] text-hp-body">
                        {label}
                        {i === 1 || i === 2 ? (
                          <Info className="size-3 opacity-60 shrink-0" />
                        ) : null}
                      </p>
                      <p className="mt-1.5 mb-0 text-[19px] leading-snug font-semibold text-white tabular-nums">
                        {value}
                      </p>
                      <div className="mt-1 flex items-center">
                        <span className="inline-flex items-center gap-0.5 rounded bg-[#242424] px-1.5 py-0.5 text-[10px] font-semibold text-white/90">
                          {dir === "down" && (
                            <ArrowUp className="size-2.5 rotate-180" />
                          )}
                          {delta}
                        </span>
                      </div>
                      <p className="mt-1 mb-0 text-[10px] text-hp-subtle">
                        from last period
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#1e1e1e]/50 p-2.5">
              <p className="m-0 flex items-center gap-1.5 px-1 pb-2 text-[12px] font-semibold text-white/90">
                Events <Info className="size-3 opacity-60" />
              </p>
              <div className="grid h-[150px] place-items-center rounded-lg border border-white/[0.08] bg-[#161616]">
                <Donut draw={step >= 1} />
              </div>
            </div>
          </div>

          <div className="flex w-[345px] shrink-0 flex-col border-l border-white/[0.08] bg-[#191919] p-3.5 justify-between @max-[900px]:hidden">
            <div>
              <div className="flex h-7 shrink-0 items-center gap-2">
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                  className="shrink-0 text-white"
                >
                  {Array.from({ length: 8 }, (_, i) => {
                    const a = (i * Math.PI) / 4;
                    return (
                      <circle
                        key={i}
                        cx={9 + Math.cos(a) * 6}
                        cy={9 + Math.sin(a) * 6}
                        r={i % 2 ? 1 : 1.4}
                        fill="currentColor"
                      />
                    );
                  })}
                  <circle cx="9" cy="9" r="1.6" fill="currentColor" />
                </svg>
                <span className="min-w-0 flex-1 truncate font-semibold text-[13px] text-white">
                  Bookings since September
                </span>
                <span className="flex items-center gap-2.5 text-hp-subtle">
                  <Maximize2 className="size-3.5 hover:text-white cursor-pointer" />
                  <Minus className="size-3.5 hover:text-white cursor-pointer" />
                  <X className="size-3.5 hover:text-white cursor-pointer" />
                </span>
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-2.5 pt-3">
                <div className={rise(step >= 1)}>
                  <p className="m-0 text-[11.5px] font-semibold text-hp-subtle">
                    Event trends
                  </p>
                  <div className="mt-1.5 flex gap-1.5 overflow-hidden text-[11px] font-semibold">
                    {[
                      ["Scheduled", "bg-white"],
                      ["Completed", "bg-teal-300"],
                      ["Rescheduled", "bg-amber-600"],
                      ["Cancelled", "bg-red-400"],
                    ].map(([l, dot], i) => (
                      <span
                        key={l}
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#242424] px-2 py-1 text-white/90 border border-white/[0.06] ${i > 1 ? "opacity-50" : ""}`}
                      >
                        <i className={`size-1.5 rounded-full ${dot}`} />
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`rounded-xl border border-white/[0.08] bg-[#161616] p-2 shadow-sm ${rise(step >= 2)}`}
                >
                  <TrendChart draw={step >= 2} />
                </div>

                <div
                  className={`flex gap-3 px-1 text-hp-subtle ${rise(step >= 3)}`}
                >
                  <ThumbsUp className="size-3.5 hover:text-white cursor-pointer" />
                  <ThumbsDown className="size-3.5 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-2">
              <div className="flex items-center gap-1.5 rounded-t-lg bg-[#222222] px-3 py-1.5 text-[11px] font-medium text-white/80 border-t border-x border-white/[0.08]">
                <Box className="size-3" />
                Current page insights
                <X className="ms-auto size-3 opacity-60 hover:opacity-100 cursor-pointer" />
              </div>
              <div className="flex h-[72px] flex-col justify-between rounded-b-lg bg-[#191919] p-2.5 ps-3 text-[12px] text-hp-subtle border border-white/[0.08]">
                Ask anything...
                <span className="grid size-6 place-items-center self-end rounded-full bg-white text-black shadow-sm">
                  <ArrowUp className="size-3.5 stroke-[2.5]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </WebBrowserFrame>
    </div>
  );
}

const QUESTION = "How did my bookings go since September?";
const ANSWER =
  "164 bookings in the last 9 weeks, up 18%. Busiest was the week of Sep 28 with 24. 11 cancelled.";

function TypingDots() {
  return (
    <span className="mt-1 inline-flex gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <i
          key={i}
          className="size-1.5 animate-pulse rounded-full bg-hp-subtle"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  );
}

function SlackScene({ step, active, paused }) {
  const typed = useTyped(QUESTION, active && step === 1, 28, paused);
  const composer = step === 1 ? typed : "";
  return (
    <div
      aria-hidden={!active}
      className={`[grid-area:1/1] h-full w-full min-h-0 min-w-0 ${active ? ACTIVE : INACTIVE}`}
    >
      <WindowShell search="Search Northwind">
        <ul className="m-0 flex w-[60px] shrink-0 list-none flex-col items-center gap-3 p-0 pt-1 @max-[420px]:hidden">
          <li className="mb-1 grid size-8 place-items-center rounded-[8px] bg-hp-ink font-semibold text-[14px] text-hp-plate">
            N
          </li>
          <li className="grid size-8 place-items-center rounded-[8px] text-hp-subtle">
            <House strokeWidth={1.75} className="size-[17px]" />
          </li>
          <li className="grid size-8 place-items-center rounded-[8px] bg-hp-tint/[0.09]">
            <MessagesSquare strokeWidth={1.75} className="size-[17px]" />
          </li>
          <li className="grid size-8 place-items-center rounded-[8px] text-hp-subtle">
            <Bell strokeWidth={1.75} className="size-[17px]" />
          </li>
        </ul>

        <div className="w-[180px] shrink-0 px-2 text-[13px] @max-[720px]:hidden">
          <p className="m-0 flex h-9 items-center px-2  font-bold text-[15px]">
            Northwind
          </p>
          <p className="m-0 mt-2 px-2 pb-1 text-[12px] text-hp-subtle">
            Channels
          </p>
          {["general", "sales", "launch"].map((c) => (
            <p
              key={c}
              className="m-0 flex h-7 items-center gap-2 px-2 text-hp-body"
            >
              <Hash className="size-3.5 opacity-70" />
              {c}
            </p>
          ))}
          <p className="m-0 mt-4 px-2 pb-1 text-[12px] text-hp-subtle">Apps</p>
          <p className="m-0 flex h-7 items-center gap-2 rounded-[6px] bg-hp-tint/[0.09] px-2 font-semibold">
            <Cal className="size-[18px] rounded-[5px] text-[7px]" />
            Cal.com
          </p>
        </div>

        <div className="me-2 mb-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] bg-hp-surface shadow-[inset_0_0_0_1px_var(--color-hp-line-2)] @max-[420px]:ms-2">
          <div className="flex h-11 shrink-0 items-center gap-2 border-hp-line-2 border-b px-4">
            <Cal className="size-5 rounded-[5px] text-[8px]" />
            <span className="font-bold text-[15px]">Cal.com</span>
            <span className="rounded-[3px] bg-hp-tint/[0.07] px-1 text-[10px] font-semibold text-hp-subtle">
              APP
            </span>
          </div>

          <ul className="m-0 flex min-h-0 flex-1 list-none flex-col justify-end gap-4 overflow-hidden p-0 px-4 pb-3 text-[14px]">
            <li className={`flex gap-2.5 ${rise(step >= 2)}`}>
              <span
                aria-hidden="true"
                className="relative inline-block size-9 flex-none shrink-0 overflow-hidden rounded-[8px] bg-hp-field"
              >
                <img
                  alt=""
                  data-face="true"
                  loading="lazy"
                  src="https://cal.com/landing/film/graduation-portrait.webp"
                  className="absolute h-auto max-w-none"
                  style={{
                    width: "440%",
                    left: "47%",
                    top: "46%",
                    transform: "translate(-47%, -46%)",
                  }}
                />
              </span>
              <span className="min-w-0 leading-[1.45]">
                <span className="flex items-baseline gap-2">
                  <span className="font-bold">Lena Brandt</span>
                  <span className="text-[11px] text-hp-subtle tabular-nums">
                    9:02 AM
                  </span>
                </span>
                <span className="block text-hp-body">{QUESTION}</span>
              </span>
            </li>

            <li className={`flex gap-2.5 ${rise(step >= 3)}`}>
              <Cal className="size-9 rounded-[8px] text-[15px]" />
              <span className="min-w-0 leading-[1.45]">
                <span className="flex items-baseline gap-2">
                  <span className="font-bold">Cal.com</span>
                  <span className="rounded-[3px] bg-hp-tint/[0.07] px-1 text-[10px] font-semibold text-hp-subtle">
                    APP
                  </span>
                  <span className="text-[11px] text-hp-subtle tabular-nums">
                    9:02 AM
                  </span>
                </span>
                {step < 4 ? (
                  <TypingDots />
                ) : (
                  <span className={`block text-hp-body ${rise(true)}`}>
                    {ANSWER}
                    <span
                      className={`mt-2 flex transition-opacity duration-200 ${step >= 5 ? "opacity-100" : "opacity-0"}`}
                    >
                      <span
                        className={`rounded-[6px] px-3 py-1 font-semibold text-[13px] shadow-[inset_0_0_0_1px_var(--color-hp-line-2)] transition-colors duration-100 ${step >= 6 ? "bg-hp-tint/[0.09]" : ""}`}
                      >
                        Why?
                      </span>
                    </span>
                  </span>
                )}
              </span>
            </li>
          </ul>

          <div className="mx-4 mb-4 shrink-0 rounded-[8px] px-3 py-2.5 text-hp-subtle shadow-[inset_0_0_0_1px_var(--color-hp-line-2)]">
            {composer ? (
              <span className="text-hp-ink">{composer}</span>
            ) : (
              "Message Cal.com"
            )}
          </div>
        </div>
      </WindowShell>
    </div>
  );
}

function IMessageScene({ step, active, paused }) {
  const typed = useTyped(
    "how did my bookings go since september?",
    active && step === 1,
    26,
    paused,
  );

  return (
    <div
      aria-hidden={!active}
      className={`[grid-area:1/1] flex size-full items-center justify-center min-h-0 min-w-0 ${active ? ACTIVE : INACTIVE}`}
    >
      <div
        className="as-phone relative mx-auto w-[340px] max-w-full select-none text-left rounded-[54px] bg-[#1a1a1a] p-[11px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/40 -my-[68px] origin-center scale-[0.8]"
        data-phone="iphone"
      >
        <span className="absolute top-[110px] -left-[2px] h-7 w-[3px] rounded-l bg-[#2a2a2a]" />
        <span className="absolute top-[160px] -left-[2px] h-14 w-[3px] rounded-l bg-[#2a2a2a]" />
        <span className="absolute top-[228px] -left-[2px] h-14 w-[3px] rounded-l bg-[#2a2a2a]" />
        <span className="absolute top-[180px] -right-[2px] h-20 w-[3px] rounded-r bg-[#2a2a2a]" />

        <div
          className="relative flex h-[660px] flex-col overflow-hidden rounded-[44px] bg-hp-surface"
          data-phone-screen="true"
        >
          <div className="relative h-14 shrink-0 text-hp-text font-ios">
            <div className="absolute inset-x-0 top-[11px] grid h-[30px] grid-cols-[1fr_100px_1fr] items-center">
              <span className="text-center font-semibold text-[15px] leading-none tracking-[-0.01em] tabular-nums text-white">
                9:41
              </span>
              <span className="h-full rounded-full bg-black" />
              <span className="flex items-center justify-center gap-[5px] text-white">
                <GiNetworkBars />
                <TiWiFi />
                <IoBatteryFullOutline />
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-start justify-between bg-hp-surface px-3 pt-2 pb-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#f2f2f7] text-hp-text shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] dark:bg-[#2c2c2e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] mt-1.5 cursor-pointer">
              <MdKeyboardArrowLeft className="size-6" />
            </span>
            <span className="flex flex-col items-center">
              <svg
                aria-hidden="true"
                className="shrink-0 size-[52px]"
                viewBox="0 0 400 400"
              >
                <rect
                  className="fill-[#292929] dark:fill-[#f2f2f2]"
                  height="400"
                  rx="200"
                  width="400"
                />
                <g
                  className="fill-white dark:fill-[#111111]"
                  transform="translate(11 0)"
                >
                  <path d="M129.554 265.729C92.588 265.729 64.6855 236.938 64.6855 201.393C64.6855 165.671 91.1662 136.702 129.554 136.702C149.815 136.702 163.855 142.922 175.051 156.251L157.457 171.536C149.992 163.716 140.751 159.806 129.554 159.806C105.562 159.806 90.4553 178.644 90.4553 201.393C90.4553 224.142 105.562 242.625 130.087 242.625C142.173 242.625 151.237 238.537 158.523 230.54L176.651 246.001C167.232 257.376 151.236 265.729 129.554 265.729Z" />
                  <path d="M221.937 265.729C196.522 265.729 176.262 244.224 176.262 217.566C176.262 190.907 196.522 169.047 221.937 169.047C237.932 169.047 246.285 175.623 251.261 185.576V171.002H275.076V263.418H251.794V248.312C246.818 258.797 238.465 265.729 221.937 265.729ZM200.255 217.388C200.255 231.428 210.563 244.046 225.847 244.046C241.664 244.046 251.794 231.961 251.794 217.566C251.794 203.17 241.664 190.73 225.847 190.73C210.563 190.73 200.255 202.993 200.255 217.388Z" />
                  <path d="M289.331 263.418V133.681H313.324V263.418H289.331Z" />
                </g>
              </svg>
              <span className="-mt-3 relative flex h-7 items-center gap-1 rounded-full bg-[#f2f2f7] pr-2.5 pl-3 font-semibold text-[14px] text-hp-text shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] dark:bg-[#2c2c2e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                Cal.ai
                <MdKeyboardArrowRight />
              </span>
            </span>
            <span className="flex size-10 items-center justify-center rounded-full bg-[#f2f2f7] text-hp-text shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] dark:bg-[#2c2c2e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] mt-1.5 cursor-pointer">
              <BsCameraVideo className="font-bold" />
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-4 pb-2">
            {step >= 2 && (
              <div className="as-bubble as-bubble-me max-w-[78%] shrink-0 rounded-[18px] px-3.5 py-2 text-[15px] leading-[1.3] self-end bg-[#0b6bdb] text-white">
                how did my bookings go since september?
              </div>
            )}
            {step >= 2 && step < 4 && (
              <span className="-mt-0.5 shrink-0 self-end pr-1 text-[11px] text-hp-subtle">
                Delivered
              </span>
            )}
            {step === 3 && (
              <div
                aria-hidden="true"
                className="as-bubble as-bubble-ai flex h-9 shrink-0 items-center gap-1 self-start rounded-[18px] bg-[#e9e9eb] dark:bg-[#262628] px-3.5"
              >
                <span className="as-typing-dot" />
                <span className="as-typing-dot" />
                <span className="as-typing-dot" />
              </div>
            )}
            {step >= 4 && (
              <div className="as-bubble as-bubble-ai max-w-[78%] shrink-0 rounded-[18px] px-3.5 py-2 text-[15px] leading-[1.3] self-start bg-[#e9e9eb] dark:bg-[#262628] text-hp-text">
                {ANSWER}
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2.5 px-4 pt-2 pb-7">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#e9e9eb] dark:bg-[#262628] text-hp-text cursor-pointer">
              <LuPlus />
            </span>
            <span className="flex h-9 flex-1 items-center justify-between rounded-full border border-[#d1d1d6] dark:border-[#38383a] pr-1 pl-3.5 text-[15px] text-hp-subtle">
              {step === 1 && typed ? (
                <span className="text-hp-text font-normal truncate pe-2">
                  {typed}
                </span>
              ) : (
                "iMessage"
              )}
              <span
                className={`flex size-7 items-center justify-center rounded-full transition-colors ${
                  step === 1 && typed
                    ? "bg-[#0b6bdb] text-white"
                    : "bg-[#e9e9eb] dark:bg-[#262628] text-hp-subtle"
                }`}
              >
                <FaArrowUp />
              </span>
            </span>
          </div>

          <span className="absolute bottom-2 left-1/2 h-[5px] w-[130px] -translate-x-1/2 rounded-full bg-hp-ink" />
        </div>
      </div>
    </div>
  );
}

export default function CalAiWindow() {
  const [tab, setTab] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const step = useTabClock(tab, true, interactionPaused, () =>
    setTab((t) => (t + 1) % TABS.length),
  );
  const refs = useRef([]);

  const select = (i) => {
    setTab(i);
    setInteractionPaused(true);
  };

  const onKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next =
      (tab + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    select(next);
    refs.current[next]?.focus();
  };

  const stepOf = (i) => (tab === i ? step : 0);

  return (
    <section className="mx-auto w-[calc(100%-2*var(--page-margin))] max-w-(--page-max) px-(--page-gutter)">
      <Reveal i={3}>
        <div className="grid gap-6">
          <div
            aria-label="Cal.ai"
            role="tablist"
            onKeyDown={onKey}
            onMouseEnter={() => setInteractionPaused(true)}
            onMouseLeave={() => setInteractionPaused(false)}
            className="group/row flex w-fit max-w-full gap-1 overflow-x-auto rounded-[14px] bg-hp-tint/[0.05] p-1"
          >
            {TABS.map((t, i) => {
              const on = tab === i;
              return (
                <span key={t.id} className="group/tab relative block">
                  {on && (
                    <ProgressRing
                      durationMs={t.ms}
                      paused={interactionPaused}
                    />
                  )}
                  <button
                    ref={(el) => (refs.current[i] = el)}
                    type="button"
                    role="tab"
                    data-calai-tab={t.id}
                    aria-selected={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    onFocus={() => {
                      setInteractionPaused(true);
                    }}
                    onBlur={() => setInteractionPaused(false)}
                    className={`relative h-9 shrink-0 rounded-[10px] px-4 font-medium text-[14px] max-md:px-2.5 max-md:text-[13px] transition-colors duration-100 ease-out focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none ${
                      on
                        ? "bg-hp-surface text-hp-ink shadow-hp-raised"
                        : "text-hp-subtle hover:text-hp-ink"
                    }`}
                  >
                    {t.label}
                  </button>
                </span>
              );
            })}
          </div>

          <p className="m-0 text-[15px] text-hp-body">{TABS[tab].blurb}</p>

          <div
            data-calai-plate=""
            className="grid h-[620px] grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] justify-items-center rounded-[28px] bg-hp-plate p-6 shadow-hp-plate max-md:h-[600px] max-md:p-3"
          >
            <div className="grid size-full max-w-[1040px] grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)]">
              <WebScene active={tab === 0} step={stepOf(0)} />
              <SlackScene
                active={tab === 1}
                step={stepOf(1)}
                paused={interactionPaused}
              />
              <IMessageScene
                active={tab === 2}
                step={stepOf(2)}
                paused={interactionPaused}
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
