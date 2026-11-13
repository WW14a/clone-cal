"use client";

import { useEffect, useRef, useState } from "react";
import { PiOpenAiLogoLight } from "react-icons/pi";
import { IoWifiOutline } from "react-icons/io5";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoIosBatteryFull } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Calendar,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock,
  EllipsisVertical,
  FolderClosed,
  House,
  LayoutGrid,
  Link as LinkIcon,
  Lock,
  Maximize2,
  Minus,
  PanelLeft,
  PanelRight,
  Plus,
  RotateCw,
  Search,
  Settings,
  Share,
  SlidersHorizontal,
  Split,
  SquareStack,
  Star,
  UserRound,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

const SCENES = ["booking", "agents", "dashboard"];
const SCENE_MS = [11000, 8500, 8500];
const STEP_MARKS = [
  [0, 900, 2200, 3300, 4300, 5300, 6300, 7000, 8200],
  [0, 700, 1700, 3000, 4500],
  [0, 600, 1500, 2600, 3800],
];

function useShowcaseClock() {
  const [s, setS] = useState({ scene: 0, step: 0 });

  useEffect(() => {
    let scene = 0;
    let start = performance.now();
    const id = setInterval(() => {
      let t = performance.now() - start;
      if (t >= SCENE_MS[scene]) {
        scene = (scene + 1) % SCENES.length;
        start = performance.now();
        t = 0;
      }
      const step = STEP_MARKS[scene].filter((m) => m <= t).length - 1;
      setS((p) => (p.scene === scene && p.step === step ? p : { scene, step }));
    }, 100);
    return () => clearInterval(id);
  }, []);

  return s;
}

const ACTIVE =
  "visible scale-100 opacity-100 blur-none transition-[opacity,filter,scale,visibility] delay-100 duration-[260ms] ease-out motion-reduce:transition-none";
const INACTIVE =
  "invisible scale-[0.985] opacity-0 blur-[2px] transition-[opacity,filter,scale,visibility] duration-200 ease-in motion-reduce:transition-none";

function useInert(active) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.inert = !active;
  }, [active]);
  return ref;
}

const CAL_PATHS = [
  "M129.554 265.729C92.588 265.729 64.6855 236.938 64.6855 201.393C64.6855 165.671 91.1662 136.702 129.554 136.702C149.815 136.702 163.855 142.922 175.051 156.251L157.457 171.536C149.992 163.716 140.751 159.806 129.554 159.806C105.562 159.806 90.4553 178.644 90.4553 201.393C90.4553 224.142 105.562 242.625 130.087 242.625C142.173 242.625 151.237 238.537 158.523 230.54L176.651 246.001C167.232 257.376 151.236 265.729 129.554 265.729Z",
  "M221.937 265.729C196.522 265.729 176.262 244.224 176.262 217.566C176.262 190.907 196.522 169.047 221.937 169.047C237.932 169.047 246.285 175.623 251.261 185.576V171.002H275.076V263.418H251.794V248.312C246.818 258.797 238.465 265.729 221.937 265.729ZM200.255 217.388C200.255 231.428 210.563 244.046 225.847 244.046C241.664 244.046 251.794 231.961 251.794 217.566C251.794 203.17 241.664 190.73 225.847 190.73C210.563 190.73 200.255 202.993 200.255 217.388Z",
  "M289.331 263.418V133.681H313.324V263.418H289.331Z",
];

function CalMark({
  size = 18,
  rect = "currentColor",
  letters = "var(--color-hp-plate)",
  className,
}) {
  return (
    <svg
      aria-label="Cal"
      fill="none"
      role="presentation"
      viewBox="0 0 400 400"
      height={size}
      width={size}
      className={className}
    >
      <rect fill={rect} height="400" rx="31.3628" width="400" />
      {CAL_PATHS.map((d) => (
        <path key={d.slice(0, 12)} d={d} fill={letters} />
      ))}
    </svg>
  );
}

const CalFavicon = ({ className }) => (
  <CalMark size={16} rect="#111" letters="#fff" className={className} />
);

function IconTile({ size = 18, label, children, className = "" }) {
  return (
    <span
      role="img"
      aria-label={label}
      data-name={label}
      style={{ "--size": `${size}px` }}
      className={`relative inline-grid size-(--size) flex-none place-items-center rounded-[calc(var(--size)*12/56)] shadow-hp-raised transition-[box-shadow,background-color] duration-150 ease-out ${className}`}
    >
      {children}
    </span>
  );
}

const Mask = ({ url, className, scale }) => (
  <span
    aria-hidden="true"
    className={`bg-current [mask:var(--logo)_center/contain_no-repeat] ${className}`}
    style={{ "--logo": `url(${url})`, ...(scale ? { "--scale": scale } : {}) }}
  />
);

const AgentGlyph = () => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    className="block shrink-0 text-foreground"
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
);

const OpenAiIcon = ({ className }) => (
  <PiOpenAiLogoLight aria-hidden="true" className={className} />
);

function TabIcon({ kind, className }) {
  return kind === "openai" ? (
    <OpenAiIcon className={`shrink-0 rounded-[3px] ${className}`} />
  ) : (
    <CalFavicon className={`shrink-0 rounded-[3px] ${className}`} />
  );
}

function TrafficLights({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 gap-2 win:hidden ${className}`}
    >
      <span className="size-3 rounded-full bg-hp-mac-close" />
      <span className="size-3 rounded-full bg-hp-mac-minimize" />
      <span className="size-3 rounded-full bg-hp-mac-zoom" />
    </span>
  );
}

export function BrowserFrame({ icon, title, url, children }) {
  return (
    <div
      aria-hidden="true"
      data-app-frame="true"
      className="hp-window @container flex flex-col overflow-hidden rounded-[12px] win:rounded-[8px] text-left font-os text-[13px] text-hp-ink bg-hp-plate w-[933px] h-[440px] max-lg:w-[715px] max-lg:h-[561px] max-md:w-full max-md:h-[606px] shadow-[inset_0_0_0_1px_var(--color-hp-line-2),0_40px_80px_-40px_rgba(0,0,0,0.35)]"
    >
      <div className="shrink-0 flex-col hidden win:flex">
        <div className="flex h-[38px] shrink-0 items-end gap-1 ps-4 pe-2 win:ps-2">
          <TrafficLights className="mb-[13px] me-3" />
          <span className="relative flex h-[31px] w-[220px] min-w-0 items-center gap-2 rounded-t-[10px] bg-hp-surface px-3 text-[12px] win:rounded-t-[8px]">
            <TabIcon kind={icon} className="size-4" />
            <span className="min-w-0 flex-1 truncate">{title}</span>
            <X className="size-3 shrink-0 text-hp-subtle" aria-hidden="true" />
          </span>
          <Plus
            strokeWidth={1.75}
            className="mb-[9px] ms-1 size-4 shrink-0 text-hp-subtle"
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            data-caption-buttons="true"
            className="hidden shrink-0 items-center text-hp-subtle win:flex -me-2 ms-auto self-stretch"
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
        <div className="flex h-10 shrink-0 items-center gap-3 bg-hp-surface px-3 text-hp-subtle">
          <ArrowLeft
            strokeWidth={1.75}
            className="size-4 shrink-0"
            aria-hidden="true"
          />
          <ArrowRight
            strokeWidth={1.75}
            className="size-4 shrink-0 opacity-50 @max-[420px]:hidden"
            aria-hidden="true"
          />
          <RotateCw
            strokeWidth={1.75}
            className="size-3.5 shrink-0 @max-[420px]:hidden"
            aria-hidden="true"
          />
          <span className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-full bg-hp-tint/[0.06] ps-1 pe-3 text-[12.5px]">
            <span className="grid size-5 shrink-0 place-items-center rounded-full">
              <SlidersHorizontal className="size-3" aria-hidden="true" />
            </span>
            <span className="truncate text-hp-ink">{url}</span>
            <Star
              strokeWidth={1.75}
              className="ms-auto size-3.5 shrink-0 @max-[420px]:hidden"
              aria-hidden="true"
            />
          </span>
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-hp-tint/[0.08]">
            <UserRound
              strokeWidth={1.75}
              className="size-3.5"
              aria-hidden="true"
            />
          </span>
          <EllipsisVertical
            strokeWidth={1.75}
            className="size-4 shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex h-[46px] shrink-0 items-center gap-3 px-4 text-hp-subtle win:hidden">
        <TrafficLights className="me-2" />
        <PanelLeft
          strokeWidth={1.75}
          className="size-4 shrink-0 @max-[480px]:hidden"
          aria-hidden="true"
        />
        <span className="flex items-center gap-2 @max-[420px]:hidden">
          <ChevronLeft className="size-4 shrink-0" aria-hidden="true" />
          <ChevronRight
            className="size-4 shrink-0 opacity-40"
            aria-hidden="true"
          />
        </span>
        <span className="mx-auto flex h-7 min-w-0 max-w-[460px] flex-1 items-center gap-1.5 rounded-[8px] bg-hp-tint/[0.06] px-2.5 text-[12.5px]">
          {icon === "openai" ? (
            <OpenAiIcon className="size-3.5 rounded-[3px]" />
          ) : (
            <CalFavicon className="size-3.5 shrink-0 rounded-[3px]" />
          )}
          <span className="flex min-w-0 flex-1 items-center justify-center gap-1">
            <Lock className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate text-hp-ink">{url}</span>
          </span>
          <RotateCw
            className="size-3 shrink-0 @max-[420px]:hidden"
            aria-hidden="true"
          />
        </span>
        <span className="flex items-center gap-3.5 @max-[560px]:hidden">
          <Share
            strokeWidth={1.75}
            className="size-4 shrink-0"
            aria-hidden="true"
          />
          <Plus
            strokeWidth={1.75}
            className="size-4 shrink-0"
            aria-hidden="true"
          />
          <SquareStack
            strokeWidth={1.75}
            className="size-4 shrink-0"
            aria-hidden="true"
          />
        </span>
      </div>

      <div className="relative min-h-0 flex-1 bg-hp-surface shadow-[inset_0_1px_0_var(--color-hp-line-2)]">
        {children}
      </div>
    </div>
  );
}

const AVAILABLE_DAYS = [19, 20, 21, 22, 23, 26, 27, 28, 29, 30];
const SLOT_TIMES = ["9:00am", "9:15am", "9:30am", "10:00am", "10:15am"];
const DAY_BASE =
  "relative grid size-[52px] place-items-center rounded-md text-sm leading-4 font-medium tabular-nums max-md:size-[calc((100cqw-24px)/7)]";
const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function BookingScene({ step, active }) {
  const panelRef = useInert(active);
  const bodyRef = useRef(null);
  const dayRef = useRef(null);
  const slotRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 620, y: 470, o: 0 });

  const measure = (el) => {
    const c = bodyRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left - c.left + r.width / 2 - 2,
      y: r.top - c.top + r.height / 2 - 1.5,
    };
  };

  useEffect(() => {
    if (step === 0) setCursor({ x: 620, y: 470, o: 0 });
    else if (step === 1 && dayRef.current)
      setCursor({ ...measure(dayRef.current), o: 1 });
    else if (step === 3 && slotRef.current)
      setCursor({ ...measure(slotRef.current), o: 1 });
    else if (step >= 5) setCursor((c) => ({ ...c, o: 0 }));
  }, [step]);

  const daySelected = step >= 2;
  const slotSelected = step >= 4;
  const confirmed = step >= 5;

  return (
    <div
      ref={panelRef}
      aria-hidden={!active}
      data-product-panel="booking"
      className={`[grid-area:1/1] max-md:w-full ${active ? ACTIVE : INACTIVE}`}
    >
      <BrowserFrame
        icon="cal"
        title="Get Rickrolled | Rick Astley"
        url="cal.com/rick"
      >
        <div ref={bodyRef} className="relative size-full bg-hp-surface">
          <div
            className={`flex h-full max-lg:flex-wrap max-md:flex-col max-md:flex-nowrap [&>*]:transition-opacity [&>*]:duration-300 [&>*]:ease-out ${
              confirmed ? "[&>*]:opacity-30" : "[&>*]:opacity-100"
            }`}
          >
            <div className="animate-hp-swap p-5 text-hp-text motion-reduce:animate-none w-[281px] shrink-0 border-r border-hp-line max-md:w-auto max-md:border-r-0 max-md:border-b max-md:[&_[data-event-detail]]:hidden">
              <img
                alt=""
                width="24"
                height="24"
                src="https://cal.com/api/avatar/45cb25ad-61b2-4971-beca-a23dd1b8c1c5.png"
                className="size-6 rounded-full object-cover"
              />
              <p className="mt-2 mb-0 text-sm leading-[21px] font-medium text-hp-subtle">
                Rick Astley
              </p>
              <h4 className="mt-1 mb-0 font-display text-xl leading-6">
                Get Rickrolled
              </h4>
              <p
                data-event-detail="true"
                className="mt-2 mb-0 text-sm leading-5 font-normal text-hp-subtle"
              >
                Book me and I will never give you up. Cal will never let you
                down. Cal.com will never run around and desert you.
              </p>
              <div data-event-detail="true" className="mt-5 grid gap-2">
                <div className="flex items-center gap-2.5 text-sm leading-[21px] font-medium text-hp-body">
                  <svg
                    aria-hidden="true"
                    className="shrink-0 text-hp-subtle"
                    fill="none"
                    height="14"
                    viewBox="0 0 16 16"
                    width="14"
                  >
                    <path
                      d="M8 4.5V8l2.5 1.5M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.4"
                    />
                  </svg>
                  <div className="flex gap-0.5 rounded-[10px] bg-hp-field p-1">
                    {["15m", "30m", "45m", "1h"].map((d, i) => (
                      <span
                        key={d}
                        className={`rounded-lg px-2.5 py-1.5 text-sm leading-4 font-medium ${
                          i === 0
                            ? "bg-hp-surface text-hp-text shadow-[0_1px_2px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"
                            : "text-hp-subtle"
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-sm leading-[21px] font-medium text-hp-body">
                  <svg
                    aria-hidden="true"
                    className="shrink-0 text-hp-subtle"
                    fill="none"
                    height="14"
                    viewBox="0 0 16 16"
                    width="14"
                  >
                    <path
                      d="M10.5 6.5 14 4.5v7l-3.5-2M2 4.5h8.5v7H2z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.4"
                    />
                  </svg>
                  <span>Cal Video</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm leading-[21px] font-medium text-hp-body">
                  <svg
                    aria-hidden="true"
                    className="shrink-0 text-hp-subtle"
                    fill="none"
                    height="14"
                    viewBox="0 0 16 16"
                    width="14"
                  >
                    <path
                      d="M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0ZM1.5 8h13M8 1.5c1.7 1.8 2.5 4 2.5 6.5S9.7 12.7 8 14.5C6.3 12.7 5.5 10.5 5.5 8S6.3 3.3 8 1.5Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.4"
                    />
                  </svg>
                  <span>Europe/London</span>
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="8"
                    style={{
                      transform: "rotate(90deg)",
                      flexShrink: 0,
                      width: 5.6,
                      height: 8,
                    }}
                    viewBox="0 0 7 10"
                    width="5.6"
                  >
                    <path
                      d="M1.5 9 5.5 5 1.5 1"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="px-5 pt-[30px] pb-5 max-md:mx-auto max-md:w-full max-md:max-w-[428px] max-md:px-5 max-md:pt-4 max-md:pb-3">
              <div className="flex w-[392px] items-center justify-between max-md:w-auto">
                <p className="m-0 text-base leading-4 font-medium text-hp-subtle">
                  <strong className="font-semibold text-hp-text">
                    October
                  </strong>{" "}
                  2026
                </p>
                <span className="inline-flex gap-7 text-hp-subtle">
                  {[180, 0].map((r) => (
                    <svg
                      key={r}
                      aria-hidden="true"
                      fill="none"
                      height="8"
                      style={{
                        transform: `rotate(${r}deg)`,
                        flexShrink: 0,
                        width: 5.6,
                        height: 8,
                      }}
                      viewBox="0 0 7 10"
                      width="5.6"
                    >
                      <path
                        d="M1.5 9 5.5 5 1.5 1"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                      />
                    </svg>
                  ))}
                </span>
              </div>
              <div className="mt-[22px] grid animate-hp-swap grid-cols-[repeat(7,52px)] gap-1 max-md:@container max-md:grid-cols-7 motion-reduce:animate-none">
                {DOW.map((d) => (
                  <span
                    key={d}
                    className="pb-3.5 text-center text-xs leading-3 font-medium text-hp-subtle"
                  >
                    {d}
                  </span>
                ))}
                {[0, 1, 2, 3].map((i) => (
                  <span key={`b${i}`} />
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const avail = AVAILABLE_DAYS.includes(day);
                  const selected = day === 22 && daySelected;
                  return (
                    <span
                      key={day}
                      ref={day === 22 ? dayRef : undefined}
                      data-day={day}
                      className={`${DAY_BASE} transition-colors duration-150 ${
                        selected
                          ? "bg-hp-slot-selected text-hp-on-ink"
                          : avail
                            ? "bg-hp-slot text-hp-ink"
                            : "text-hp-subtle"
                      }`}
                    >
                      {day}
                      {day === 21 && (
                        <i className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="w-[220px] border-l border-hp-line px-4 pt-[30px] pb-5 max-lg:w-auto max-lg:basis-full max-lg:border-t max-lg:border-l-0 max-lg:p-5 max-md:px-4 max-md:pt-3 max-md:pb-4">
              <div className="flex items-center justify-between">
                <p className="m-0 text-base leading-4 font-medium text-hp-subtle">
                  <strong className="font-semibold text-hp-text">Thu</strong>{" "}
                  22nd
                </p>
                <span className="inline-flex rounded-lg bg-hp-well p-0.5 text-xs leading-none font-medium text-hp-subtle shadow-hp-well">
                  <span className="rounded-md bg-hp-raised px-[7px] py-1 text-hp-text shadow-hp-raised">
                    12h
                  </span>
                  <span className="rounded-md px-[7px] py-1">24h</span>
                </span>
              </div>
              <ul className="mt-[22px] mb-0 grid list-none gap-2 p-0 max-lg:mt-4 max-lg:grid-cols-5 max-md:grid-cols-3">
                {daySelected &&
                  SLOT_TIMES.map((time, i) => {
                    const sel = time === "10:00am" && slotSelected;
                    return (
                      <li
                        key={time}
                        ref={time === "10:00am" ? slotRef : undefined}
                        data-time={time}
                        style={{ "--i": i }}
                        className={`flex h-10 items-center justify-center gap-2 rounded-md text-sm leading-none font-medium tabular-nums transition-[background-color,color] duration-100 ease-out max-md:text-[13px] animate-hp-slot-in shadow-[inset_0_0_0_1px_var(--color-hp-line)] [animation-delay:calc(var(--i)*40ms)] motion-reduce:animate-none ${
                          sel
                            ? "bg-hp-slot-selected text-hp-on-ink"
                            : "bg-hp-surface text-hp-text"
                        }`}
                      >
                        <i className="size-1.5 rounded-full bg-[#22c55e] max-md:hidden opacity-100" />{" "}
                        {time}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div
            role="status"
            style={{
              opacity: confirmed ? 1 : 0,
              transform: confirmed ? "none" : "translateY(10px) scale(0.98)",
              transition:
                "opacity 300ms ease-out, transform 300ms cubic-bezier(0.22,1,0.36,1)",
            }}
            className="pointer-events-none absolute inset-0 m-auto h-fit w-[min(380px,calc(100%-24px))] rounded-[18px] bg-hp-raised p-6 text-center text-hp-text shadow-hp-raised max-md:p-5"
          >
            <span
              aria-hidden="true"
              className="inline-grid size-10 place-items-center rounded-full bg-hp-field text-hp-ink"
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="16"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  d="m3.5 8.5 3 3 6-7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </span>
            <h3 className="mt-3.5 mb-0 font-display text-xl leading-6 text-balance">
              This meeting is scheduled
            </h3>
            <p className="mt-2 mb-0 text-sm leading-5 font-normal text-pretty text-hp-subtle">
              We sent an email with a calendar invitation with the details to
              everyone.
            </p>
            <dl className="mt-5 mb-0 grid grid-cols-[56px_1fr] gap-x-4 gap-y-3 border-t border-hp-line pt-5 text-left text-sm leading-5 font-normal [&_dd]:m-0 [&_dd]:text-hp-body [&_dd]:tabular-nums [&_dt]:font-semibold">
              <dt>What</dt>
              <dd>Get Rickrolled between Rick Astley and you</dd>
              <dt>When</dt>
              <dd>
                Thursday, October 22, 2026
                <br />
                10:00am - 10:15am (Europe/London)
              </dd>
              <dt>Who</dt>
              <dd>
                Rick Astley{" "}
                <span
                  data-slot="badge"
                  className="relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm border border-transparent font-medium h-5.5 min-w-5.5 px-[calc(var(--spacing)*1-1px)] text-sm sm:h-4.5 sm:min-w-4.5 sm:text-xs bg-secondary text-secondary-foreground ml-1"
                >
                  Host
                </span>
              </dd>
              <dt>Where</dt>
              <dd>Cal Video</dd>
            </dl>
          </div>

          <svg
            aria-hidden="true"
            height="22"
            width="20"
            viewBox="0 0 20 22"
            className="pointer-events-none absolute top-0 left-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
            style={{
              opacity: cursor.o,
              transform: `translate(${cursor.x}px, ${cursor.y}px)`,
              transition:
                "transform 800ms cubic-bezier(0.22,1,0.36,1), opacity 200ms ease-out",
            }}
          >
            <path
              d="M2 1.5 17 12l-6.6 1.2L7 19.8z"
              fill="#111"
              stroke="#fff"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </BrowserFrame>
    </div>
  );
}

const reveal = (on, extra = "") =>
  `transition-[opacity,translate] duration-300 ease-out ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"} ${extra}`;

function AgentsScene({ step, active }) {
  const ref = useInert(active);
  return (
    <div
      ref={ref}
      aria-hidden={!active}
      data-product-panel="agents"
      className={`[grid-area:1/1] max-md:w-full ${active ? ACTIVE : INACTIVE}`}
    >
      <BrowserFrame icon="openai" title="ChatGPT" url="chatgpt.com">
        <div className="flex size-full flex-col bg-hp-surface text-hp-text">
          <div className="flex h-12 shrink-0 items-center gap-2.5 border-hp-line border-b px-4">
            <IconTile
              size={26}
              label="ChatGPT"
              className="bg-hp-raised text-hp-ink after:pointer-events-none after:absolute after:top-[calc(100%+8px)] after:left-1/2 after:z-2 after:-translate-x-1/2 after:-translate-y-1 after:rounded-md after:bg-hp-ink after:px-[7px] after:py-1 after:text-[11px] after:leading-none after:font-medium after:whitespace-nowrap after:text-hp-on-ink after:opacity-0 after:transition-[opacity,transform] after:duration-100 after:ease-in after:content-[attr(data-name)] hover:after:translate-y-0 hover:after:opacity-100 hover:after:duration-[160ms] hover:after:ease-out"
            >
              <OpenAiIcon className="size-[calc(var(--size)*0.74)]" />
            </IconTile>
            <span className="font-medium text-[14px]">ChatGPT</span>
            <span className="ms-auto flex items-center gap-1.5 text-[12px] text-hp-subtle">
              <IconTile
                size={18}
                label="Cal.com"
                className="bg-transparent text-hp-ink [&>svg]:block"
              >
                <CalMark />
              </IconTile>
              Cal.com connected
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-5 max-md:p-4">
            <p
              className={`m-0 max-w-[420px] self-end rounded-2xl rounded-ee-md bg-hp-field px-4 py-2.5 text-[14px] leading-5 transition-opacity duration-200 ease-out ${step >= 1 ? "opacity-100" : "opacity-0"}`}
            >
              Book me 15 minutes with Rick Astley on Thursday morning.
            </p>

            <div
              className={`flex items-center gap-2 text-[13px] text-hp-subtle transition-opacity duration-200 ease-out ${step >= 2 ? "opacity-100" : "opacity-0"}`}
            >
              <IconTile
                size={18}
                label="Cal.com"
                className="bg-transparent  text-hp-ink [&>svg]:block"
              >
                <CalMark />
              </IconTile>
              Checking Rick&apos;s Cal.com
            </div>

            <div className={`max-w-[520px] ${reveal(step >= 3)}`}>
              <p className="m-0 text-[14px] leading-5">
                Rick has three times free on Thursday 22nd:
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {["9:30am", "10:00am", "10:15am"].map((t) => (
                  <span
                    key={t}
                    className="flex h-9 items-center gap-2 rounded-md bg-hp-surface px-3 text-[14px] tabular-nums shadow-[inset_0_0_0_1px_var(--color-hp-line)] transition-colors duration-100 ease-out"
                  >
                    <i className="size-1.5 rounded-full bg-[#22c55e]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div
              role="status"
              className={`flex max-w-[520px] items-center gap-3 rounded-xl bg-hp-surface p-3 shadow-[inset_0_0_0_1px_var(--color-hp-line)] max-md:items-start ${reveal(step >= 4)}`}
            >
              <span className="inline-grid size-8 shrink-0 place-items-center rounded-full bg-hp-field text-hp-ink">
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="14"
                  viewBox="0 0 16 16"
                  width="14"
                >
                  <path
                    d="m3.5 8.5 3 3 6-7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>
              <span className="min-w-0 text-[13px] leading-5">
                <span className="block font-medium text-[14px]">
                  Booked: Get Rickrolled
                </span>
                <span className="block text-hp-subtle tabular-nums">
                  Thu 22 Oct, 10:00am to 10:15am on Cal Video
                </span>
              </span>
            </div>

            <div className="mt-auto flex h-11 items-center rounded-full bg-hp-field ps-4 pe-1.5 text-[14px] text-hp-subtle">
              Ask anything
              <span className="ms-auto inline-grid size-8 place-items-center rounded-full bg-hp-ink text-hp-on-ink">
                <ArrowUp className="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

const NAV_ITEMS = [
  [House, "Home"],
  [LinkIcon, "Links"],
  [Calendar, "Bookings"],
  [Clock, "Availability"],
  [Users, "Teams"],
  [LayoutGrid, "Apps"],
  [Split, "Routing"],
  [Zap, "Workflows"],
  [ChartColumn, "Insights"],
];

const faceImg = (src, w, l, t) => (
  <img
    alt=""
    data-face="true"
    loading="lazy"
    src={src}
    className="absolute h-auto max-w-none"
    style={{
      width: `${w}%`,
      left: `${l}%`,
      top: `${t}%`,
      transform: `translate(-${l}%, -${t}%)`,
    }}
  />
);

function DashboardScene({ step, active }) {
  const ref = useInert(active);
  const row1 = step >= 1;
  const done = step >= 4;
  return (
    <div
      ref={ref}
      aria-hidden={!active}
      data-product-panel="dashboard"
      className={`[grid-area:1/1] max-md:w-full ${active ? ACTIVE : INACTIVE}`}
    >
      <BrowserFrame
        icon="cal"
        title="Bookings | Cal.com"
        url="app.cal.com/bookings"
      >
        <div className="flex size-full bg-hp-surface text-hp-text">
          <div className="flex w-[196px] shrink-0 flex-col gap-0.5 border-hp-line border-e p-3 max-lg:hidden">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <img
                alt=""
                width="20"
                height="20"
                src="https://cal.com/api/avatar/45cb25ad-61b2-4971-beca-a23dd1b8c1c5.png"
                className="size-5 rounded-full object-cover"
              />
              <span className="font-medium text-[13px]">Rick Astley</span>
            </div>
            <div className="mt-1 mb-2 flex h-8 items-center gap-2 rounded-md px-2 text-[13px] text-hp-subtle shadow-[inset_0_0_0_1px_var(--color-hp-line)]">
              <Search className="size-3.5" aria-hidden="true" />
              Search
              <span className="ms-auto text-[11px]">
                <span className="win:hidden">⌘K</span>
                <span className="hidden win:inline">Ctrl+K</span>
              </span>
            </div>
            {NAV_ITEMS.map(([Icon, label]) => {
              const current = label === "Bookings";
              return (
                <span
                  key={label}
                  className={`flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] ${current ? "bg-hp-field font-medium text-hp-ink" : "text-hp-body"}`}
                >
                  <Icon
                    strokeWidth={1.75}
                    className="size-4 text-hp-subtle"
                    aria-hidden="true"
                  />
                  {label}
                  {current && (
                    <span className="ms-auto rounded bg-hp-ink px-1.5 text-[11px] text-hp-plate leading-4">
                      1
                    </span>
                  )}
                </span>
              );
            })}
            <span className="mt-auto flex h-8 items-center gap-2.5 px-2 text-[13px] text-hp-body">
              <Settings
                strokeWidth={1.75}
                className="size-4 text-hp-subtle"
                aria-hidden="true"
              />
              Settings
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-6 max-md:p-4">
            <p className="m-0 font-display text-[20px] leading-6">Bookings</p>
            <p className="mt-1 mb-0 text-[13px] text-hp-subtle">
              See upcoming and past events booked through your booking links.
            </p>
            <div className="mt-4 flex gap-1 text-[13px]">
              {["Upcoming", "Unconfirmed", "Past", "Cancelled"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-md px-2.5 py-1 max-md:px-2 ${i === 0 ? "bg-hp-field font-medium text-hp-ink" : "text-hp-subtle"} ${t === "Cancelled" ? "max-md:hidden" : ""}`}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-xl bg-hp-surface shadow-[inset_0_0_0_1px_var(--color-hp-line)] [&>*:first-child]:border-t-0">
              <div
                className={`grid grid-cols-[150px_1fr_auto] items-center gap-4 px-4 py-3 transition-[opacity,background-color] duration-300 ease-out max-md:grid-cols-[1fr_auto] max-md:gap-2 ${row1 ? "opacity-100" : "opacity-0"}`}
              >
                <span className="text-[13px] leading-5 tabular-nums max-md:col-span-2">
                  <span className="block font-medium">Thu, 22 Oct</span>
                  <span className="block text-hp-subtle">
                    10:00am to 10:15am
                  </span>
                </span>
                <span className="min-w-0 text-[13px] leading-5">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="truncate">Get Rickrolled</span>
                    <span className="shrink-0 rounded px-1.5 text-[11px] leading-4 bg-hp-chip text-hp-body">
                      {done ? "Confirmed" : "Unconfirmed"}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 text-hp-subtle">
                    <Video className="size-3.5" aria-hidden="true" /> Cal Video
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-[12px]">
                  <span
                    className={`rounded-md bg-hp-ink px-2.5 py-1 text-hp-plate transition-opacity duration-150 ease-out max-md:hidden ${done ? "opacity-0" : "opacity-100"}`}
                  >
                    Confirm
                  </span>
                  <img
                    alt=""
                    width="24"
                    height="24"
                    src="https://cal.com/api/avatar/45cb25ad-61b2-4971-beca-a23dd1b8c1c5.png"
                    className="size-6 rounded-full object-cover"
                  />
                </span>
              </div>

              <div className="grid grid-cols-[150px_1fr_auto] items-center gap-4 border-hp-line border-t px-4 py-3 max-md:grid-cols-[1fr_auto] max-md:gap-2">
                <span className="text-[13px] leading-5 tabular-nums max-md:col-span-2">
                  <span className="block font-medium">Fri, 23 Oct</span>
                  <span className="block text-hp-subtle">2:00pm to 2:30pm</span>
                </span>
                <span className="min-w-0 text-[13px] leading-5">
                  <span className="block truncate font-medium">Intro call</span>
                  <span className="block truncate text-hp-subtle">
                    You and Clara Voss
                  </span>
                </span>
                <span className="flex items-center">
                  <span
                    aria-hidden="true"
                    className="relative inline-block flex-none overflow-hidden rounded-full bg-hp-field size-6"
                  >
                    {faceImg("/landing/film/karaoke-woman.webp", 320, 64, 42)}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-[150px_1fr_auto] items-center gap-4 border-hp-line border-t px-4 py-3 max-md:grid-cols-[1fr_auto] max-md:gap-2">
                <span className="text-[13px] leading-5 tabular-nums max-md:col-span-2">
                  <span className="block font-medium">Mon, 26 Oct</span>
                  <span className="block text-hp-subtle">
                    11:00am to 12:00pm
                  </span>
                </span>
                <span className="min-w-0 text-[13px] leading-5">
                  <span className="block truncate font-medium">
                    Design review
                  </span>
                  <span className="block truncate text-hp-subtle">
                    You, Felix Moreau and Ida Lund
                  </span>
                </span>
                <span className="flex items-center">
                  <span
                    aria-hidden="true"
                    className="relative inline-block flex-none overflow-hidden rounded-full bg-hp-field size-6 ring-2 ring-hp-raised"
                  >
                    {faceImg(
                      "/landing/film/dinner-party-apartment-1.webp",
                      420,
                      30,
                      33,
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative inline-block flex-none overflow-hidden rounded-full bg-hp-field -ms-2 size-6 ring-2 ring-hp-raised"
                  >
                    {faceImg(
                      "/landing/film/dinner-party-apartment-1.webp",
                      400,
                      72,
                      42,
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

const fade = (on) =>
  `flex min-w-0 flex-col gap-2 transition-[opacity,filter] duration-200 ease-out motion-reduce:transition-none ${
    on ? "opacity-100 blur-none" : "opacity-0 blur-[2px]"
  }`;

const richText =
  "text-pretty text-foreground text-sm leading-6 [&_p]:m-0 [&_strong]:font-semibold";

function AgentFrame({ title, children, inputText, inputActive, kind, active }) {
  const ref = useInert(active);
  return (
    <div
      ref={ref}
      aria-hidden={!active}
      data-desk-agent={kind}
      className={`absolute end-6 bottom-6 z-20 h-[336px] w-[300px] max-lg:hidden [&>*]:h-full ${active ? ACTIVE : INACTIVE}`}
    >
      <div
        data-agent-panel="true"
        className="flex min-h-0 flex-col overflow-hidden bg-popover text-left text-foreground rounded-xl border border-border shadow-[0_12px_32px_-12px_rgb(0_0_0/0.12)]"
      >
        <div className="flex shrink-0 items-center gap-2 px-3 py-2">
          <span className="flex min-w-0 flex-1 items-center gap-1.5">
            <AgentGlyph />
            <span className="min-w-0 truncate font-semibold text-sm">
              {title}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="flex items-center text-muted-foreground"
          >
            {[PanelRight, Maximize2, Minus, X].map((Icon, i) => (
              <span key={i} className="grid size-6 place-items-center">
                <Icon className="size-3.5" />
              </span>
            ))}
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col justify-end px-4 pt-2 gap-4 pb-3">
            {children}
          </div>
        </div>
        <div className="shrink-0 px-3 pb-3">
          <div className="flex min-h-[76px] flex-col justify-between rounded-lg border border-border bg-background p-1.5 ps-2.5">
            <span
              className={`line-clamp-2 pt-0.5 text-sm ${inputActive ? "text-foreground" : "text-muted-foreground/72"}`}
            >
              {inputText}
            </span>
            <span
              aria-hidden="true"
              className={`grid size-7 place-items-center self-end rounded-full ${inputActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              <ArrowUp className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingAgent({ step, active }) {
  return (
    <AgentFrame
      kind="booking"
      title="Rick Astley"
      active={active}
      inputText="Ask anything..."
      inputActive={false}
    >
      <div className={fade(step >= 6)}>
        <p className="m-0 ms-auto w-fit max-w-[85%] text-pretty rounded-lg bg-muted px-3 py-2 text-sm leading-6">
          Find my bookings with Rick Astley
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className={fade(step === 7)}>
          <span className="inline-flex w-fit items-center gap-1.5 text-muted-foreground text-xs leading-5">
            <Calendar className="size-3.5" aria-hidden="true" />
            Checking your bookings
          </span>
        </div>
        {step >= 8 && (
          <>
            <div className="flex flex-col">
              <span className="inline-flex w-fit items-center gap-1.5 text-muted-foreground text-xs leading-5">
                <CircleCheck className="size-3.5" aria-hidden="true" />
                Completed 1 step
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </span>
            </div>
            <div className={richText}>
              <p>
                One: <strong>Get Rickrolled</strong> with Rick Astley on
                Thursday 22 October, 10:00am to 10:15am on Cal Video.
              </p>
            </div>
          </>
        )}
      </div>
    </AgentFrame>
  );
}

function DashboardAgent({ step, active }) {
  const typed = step < 2;
  return (
    <AgentFrame
      kind="dashboard"
      title="Pending bookings"
      active={active}
      inputText={
        typed && step >= 1
          ? "Confirm all my pending bookings"
          : "Ask anything..."
      }
      inputActive={typed && step >= 1}
    >
      <div className={fade(step >= 2)}>
        <p className="m-0 ms-auto w-fit max-w-[85%] text-pretty rounded-lg bg-muted px-3 py-2 text-sm leading-6">
          Confirm all my pending bookings
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className={fade(step === 3)}>
          <span className="inline-flex w-fit items-center gap-1.5 text-muted-foreground text-xs leading-5">
            <Calendar className="size-3.5" aria-hidden="true" />
            Checking your bookings
          </span>
        </div>
        <div className={fade(step >= 4)}>
          <div className={richText}>
            <p>
              Done. <strong>Get Rickrolled</strong> on Thursday 22 October at
              10:00am is confirmed. It was your only pending request.
            </p>
          </div>
        </div>
      </div>
    </AgentFrame>
  );
}

function MenuBar({ appName }) {
  return (
    <div
      aria-hidden="true"
      data-menu-bar="true"
      className="hp-bar flex items-center gap-5 bg-hp-surface px-5 font-os text-[13px] text-hp-ink leading-none shadow-[inset_0_-1px_0_var(--color-hp-line-2)] md:px-7 [&_span]:[text-box:trim-both_cap_alphabetic] h-[30px] win:hidden"
    >
      <Mask
        url="/landing/logos/brand-apple.svg"
        className="-me-1 inline-block h-[14px] w-3 shrink-0"
      />
      <span className="font-bold">
        <span className="inline-grid">
          {["Safari", "Cal.com"].map((n) => (
            <span
              key={n}
              className={`[grid-area:1/1] ${
                appName === n
                  ? "visible scale-100 opacity-100 blur-none transition-[opacity,filter,scale,visibility] delay-100 duration-[260ms] ease-out motion-reduce:transition-none"
                  : "invisible scale-[0.985] opacity-0 blur-[2px] transition-[opacity,filter,scale,visibility] duration-200 ease-in motion-reduce:transition-none"
              }`}
            >
              {n}
            </span>
          ))}
        </span>
      </span>
      {["File", "Edit", "View", "Window", "Help"].map((m) => (
        <span key={m} className="max-sm:hidden">
          {m}
        </span>
      ))}
      <span className="ms-auto flex items-center gap-3.5">
        <span
          data-tray="true"
          className="-mx-1.5 flex h-[22px] items-center gap-1.5 rounded-[5px] px-1.5"
        >
          <Mask
            url="/landing/desktop/tray.png"
            className="inline-block h-[11px] w-[15px] shrink-0"
          />
          <span className="whitespace-nowrap tabular-nums">
            Design review in 5m
          </span>
        </span>
        <svg
          aria-hidden="true"
          className="h-[12px] w-[25px] shrink-0 max-sm:hidden"
          fill="none"
          viewBox="0 0 25 12"
        >
          <rect
            height="11"
            opacity="0.4"
            rx="3.5"
            stroke="currentColor"
            width="21"
            x="0.5"
            y="0.5"
          />
          <rect fill="currentColor" height="8" rx="2" width="18" x="2" y="2" />
          <path
            d="M23 4v4c.8-.3 1.4-1.1 1.4-2S23.8 4.3 23 4Z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
        <svg
          aria-hidden="true"
          className="h-[12px] w-[16px] shrink-0"
          fill="currentColor"
          viewBox="0 -0.8 16 12"
        >
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4.2.2.5.2.7 0l.9-.9c.2-.2.2-.5 0-.7C13.6 1.1 10.9 0 8 0S2.4 1.1.4 3c-.2.2-.2.5 0 .7l.9.9c.2.2.5.2.7 0C3.6 3.1 5.7 2.2 8 2.2Z" />
          <path d="M8 5.6c1.4 0 2.6.5 3.6 1.3.2.2.5.2.7 0l.9-.9c.2-.2.2-.5 0-.7A7.5 7.5 0 0 0 8 3.4a7.5 7.5 0 0 0-5.2 1.9c-.2.2-.2.5 0 .7l.9.9c.2.2.5.2.7 0 1-.8 2.2-1.3 3.6-1.3Z" />
          <path d="M10.4 8.4c.2-.2.2-.5 0-.7A3.7 3.7 0 0 0 8 6.9c-.9 0-1.7.3-2.4.8-.2.2-.2.5 0 .7l2.1 2.1c.2.2.5.2.7 0l2-2.1Z" />
        </svg>
        <svg
          aria-hidden="true"
          className="size-[14px] shrink-0 max-sm:hidden"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          viewBox="0 0 14 14"
        >
          <circle cx="5.8" cy="5.8" r="4.6" strokeWidth="1.6" />
          <path d="m9.2 9.2 3.8 3.8" strokeWidth="1.9" />
        </svg>
        <svg
          aria-hidden="true"
          className="h-[13px] w-[15px] shrink-0 max-sm:hidden"
          fill="none"
          viewBox="0 0 15 13"
        >
          <rect
            height="5.2"
            rx="2.6"
            stroke="currentColor"
            strokeWidth="1.3"
            width="13.6"
            x="0.7"
            y="0.65"
          />
          <circle cx="3.6" cy="3.25" fill="currentColor" r="1.6" />
          <rect fill="currentColor" height="5.2" rx="2.6" width="15" y="7.15" />
          <circle
            className="text-hp-surface"
            cx="11.4"
            cy="9.75"
            fill="currentColor"
            r="1.6"
          />
        </svg>
        <span className="whitespace-nowrap tabular-nums max-sm:hidden">
          Mon 2 Nov 9:55
        </span>
      </span>
    </div>
  );
}

function Taskbar({ scene }) {
  const activeIdx = scene === 2 ? 1 : 0;
  const apps = [
    {
      key: "chrome",
      node: (
        <img
          alt=""
          aria-hidden="true"
          src="brand-chrome.svg"
          className="shrink-0 object-contain size-6"
        />
      ),
    },
    { key: "cal", node: <CalFavicon className="size-6 shrink-0" /> },
    {
      key: "outlook",
      node: (
        <img
          alt=""
          aria-hidden="true"
          src="outlook.svg"
          className="shrink-0 object-contain size-6"
        />
      ),
    },
    {
      key: "slack",
      node: (
        <img
          alt=""
          aria-hidden="true"
          src="slack.svg"
          className="shrink-0 object-contain size-6"
        />
      ),
      hide: true,
    },
  ];
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <div
      aria-hidden="true"
      data-taskbar="true"
      className="hp-bar h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center bg-hp-surface px-3 font-os md:px-5 text-[12px] text-hp-ink shadow-[inset_0_1px_0_var(--color-hp-line-2)] hidden win:grid"
    >
      <span />
      <span className="flex items-center gap-1">
        <span className="grid size-10 place-items-center">
          <span className="grid size-[15px] shrink-0 grid-cols-2 gap-px">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="rounded-[1.5px] bg-current" />
            ))}
          </span>
        </span>
        <span className="me-1 flex h-8 w-[180px] items-center gap-2 rounded-full bg-hp-tint/[0.06] px-3 text-[14px] text-hp-subtle max-md:hidden">
          <svg
            aria-hidden="true"
            className="size-4 shrink-0"
            viewBox="0 0 16 16"
            {...stroke}
          >
            <circle cx="9.5" cy="6.5" r="4.6" strokeWidth="1.3" />
            <path d="m6.2 9.8-4.2 4.2" strokeWidth="1.3" />
          </svg>
          Search
        </span>
        <span className="relative grid size-10 place-items-center rounded-[4px] max-sm:hidden">
          <FolderClosed
            strokeWidth={1.75}
            className="size-6 text-hp-body"
            aria-hidden="true"
          />
        </span>
        {apps.map((a, i) => (
          <span
            key={a.key}
            className={`relative grid size-10 place-items-center rounded-[4px] transition-colors duration-200 ${i === activeIdx ? "bg-hp-tint/[0.06]" : ""} ${a.hide ? "max-sm:hidden" : ""}`}
          >
            {a.node}
            <span
              className={`absolute bottom-0.5 h-[3px] rounded-full transition-[width,background-color] duration-200 ${i === activeIdx ? "w-3.5 bg-hp-ink" : "w-1.5 bg-hp-subtle"}`}
            />
          </span>
        ))}
      </span>
      <span className="flex items-center justify-end gap-3 pe-1">
        <span className="flex items-center gap-3 text-hp-body max-sm:hidden">
          <IoIosArrowUp className="size-4" />

          <Mask
            url="https://cal.com/landing/desktop/tray.png"
            className="inline-block h-[11px] w-[15px] shrink-0"
          />

          <IoWifiOutline className="size-4" />
          <HiOutlineSpeakerWave className="size-4" />

          <IoIosBatteryFull className="size-4" />
        </span>
        <span className="flex flex-col items-end text-[12px] tabular-nums leading-[1.35]">
          <span>9:55</span>
          <span className="max-sm:hidden">Mon 2 Nov</span>
        </span>
      </span>
    </div>
  );
}

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

function Wallpaper() {
  const ref = useRef(null);
  useEffect(() => {
    const W = 1152,
      H = 793;
    const ctx = ref.current.getContext("2d", { willReadFrequently: true });
    const dither = () => {
      const img = ctx.getImageData(0, 0, W, H);
      const d = img.data;
      for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          const t = (BAYER[(y % 4) * 4 + (x % 4)] / 16 - 0.5) * 36;
          for (let c = 0; c < 3; c++)
            d[i + c] = Math.max(
              0,
              Math.min(255, Math.round((d[i + c] + t) / 32) * 32),
            );
        }
      ctx.putImageData(img, 0, 0);
    };
    const image = new Image();
    image.onload = () => {
      const s = Math.max(W / image.width, H / image.height);
      ctx.drawImage(
        image,
        (W - image.width * s) / 2,
        (H - image.height * s) / 2,
        image.width * s,
        image.height * s,
      );
      dither();
    };
    image.onerror = () => {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#3a3a3a");
      g.addColorStop(1, "#8a7a6a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      dither();
    };
    image.src = "office.jpg";
  }, []);

  return (
    <div
      aria-hidden="true"
      data-wallpaper-layer="true"
      className="absolute inset-0 -z-10 bg-hp-plate"
    >
      <canvas
        ref={ref}
        role="img"
        aria-label="A quiet corner office, a desk and monitor by tall windows onto the city."
        width={1152}
        height={793}
        className="block size-full bg-hp-paper [image-rendering:pixelated] dark:brightness-[0.88] absolute inset-0 opacity-[0.42]"
      />
    </div>
  );
}

export default function ProductShowcase() {
  const [os, setOs] = useState("win");
  const { scene, step } = useShowcaseClock();

  useEffect(() => {
    setOs(/Windows/i.test(navigator.userAgent) ? "win" : "mac");
  }, []);

  const sceneStep = (i) => (scene === i ? step : 0);

  return (
    <figure
      className={`win m-0`}
      data-product-view={SCENES[scene]}
      data-os={os}
    >
      <div
        data-desktop-screen="true"
        data-wallpaper="true"
        className="relative isolate flex flex-col overflow-hidden rounded-[12px] bg-hp-plate text-hp-ink md:rounded-[16px] shadow-hp-plate after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_var(--color-hp-plate-line)] after:content-['']"
      >
        <Wallpaper />
        <MenuBar appName={scene === 2 ? "Cal.com" : "Safari"} />

        <div className="relative min-h-0 flex-1">
          <div
            data-product-desktop="true"
            className="relative grid place-items-center px-6 pt-16 pb-20 max-lg:px-4 max-lg:py-12 max-md:px-3 max-md:py-6"
          >
            <BookingScene active={scene === 0} step={sceneStep(0)} />
            <AgentsScene active={scene === 1} step={sceneStep(1)} />
            <DashboardScene active={scene === 2} step={sceneStep(2)} />
          </div>

          <BookingAgent active={scene === 0} step={sceneStep(0)} />
          <DashboardAgent active={scene === 2} step={sceneStep(2)} />
        </div>

        <Taskbar scene={scene} />
      </div>
    </figure>
  );
}
