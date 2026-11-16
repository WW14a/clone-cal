"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { FaCheck } from "react-icons/fa6";
import { BiCopy } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { IoChatbubbleOutline, IoFlashOutline } from "react-icons/io5";
import {
  LuCheck,
  LuChevronRight,
  LuClock,
  LuExternalLink,
  LuMic,
  LuVideo,
} from "react-icons/lu";

function useCycle(durations, running) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!running || !durations.length) return;

    const duration = step === 0 ? 150 : (durations[step] ?? durations[0]);

    const id = setTimeout(() => {
      setStep((current) => (current + 1) % durations.length);
    }, duration);

    return () => clearTimeout(id);
  }, [step, running, durations]);

  return step;
}

const IMG = {
  graduation: "booking-demo.avif",
  retirement:
    "https://cal.com/_site/_next/image?url=%2Flanding%2Ffilm%2Fcoding-in-the-phone-booth.webp&w=384&q=75 ",
  dinner:
    "	https://cal.com/_site/_next/image?url=%2Flanding%2Ffilm%2Fconference-room-gaze.webp&w=384&q=75",
  office:
    "	https://cal.com/_site/_next/image?url=%2Flanding%2Ffilm%2Fcoding-in-the-phone-booth.webp&w=384&q=75 ",
  reilly: "https://cal.com/landing/film/reilly.webp",
};

function Face({ w, x, y, src, className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-block flex-none overflow-hidden rounded-full bg-hp-field",
        className,
      )}
    >
      <img
        alt=""
        src={src}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute h-auto max-w-none"
        style={{
          width: `${w}%`,
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-${x}%, -${y}%)`,
        }}
      />
    </span>
  );
}

const Chevron = ({ rotate = 0 }) => (
  <span
    aria-hidden="true"
    className="flex items-center justify-center"
    style={{
      transform: `rotate(${rotate}deg)`,
      flexShrink: 0,
      width: 5.6,
      height: 8,
    }}
  >
    <LuChevronRight size={16} className="shrink-0" />
  </span>
);

const TRANSITION = "transition-[opacity,transform] duration-150 ease-in";

function Card({ i, title, desc, span, plateClass, children }) {
  const id = `feat-${i}`;
  const [hovered, setHovered] = useState(false);

  return (
    <article
      aria-labelledby={id}
      tabIndex={0}
      style={{ "--i": i }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex min-w-0 flex-col rounded-3xl bg-hp-surface px-2 pt-2 pb-[22px] outline-none",
        "shadow-[inset_0_0_0_1px_var(--color-hp-hairline)]",
        "focus-visible:shadow-[inset_0_0_0_1px_var(--color-hp-hairline),0_0_0_2px_var(--color-hp-surface),0_0_0_4px_var(--color-hp-ink)]",
        "translate-y-6 opacity-0 transition-[opacity,transform] duration-600 ease-hp [transition-delay:calc(var(--i,0)*60ms)]",
        "group-data-in/section:translate-y-0 group-data-in/section:opacity-100",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        span,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "relative mb-5 grid place-items-center overflow-hidden rounded-[18px] bg-hp-plate shadow-hp-plate",
          plateClass ?? "h-[248px] max-tablet:h-[232px]",
        )}
      >
        {children(hovered)}
      </div>

      <h3
        id={id}
        className="m-0 px-3 font-display text-[17px] leading-[1.3] text-hp-ink"
      >
        {title}
      </h3>

      <div className="mt-1.5 px-3 text-sm leading-normal font-normal text-pretty text-hp-body">
        {desc}
      </div>
    </article>
  );
}

const SLOTS = ["9:00am", "9:30am", "10:00am", "10:30am"];

const SLOT_CLS = ["@max-[340px]:hidden", "", "", "max-tablet:hidden"];

function BookingDemo({ running }) {
  const step = useCycle([1400, 1700, 2000, 500], running);
  const copied = step === 1;

  return (
    <div className="@container w-[min(100%-48px,540px)] max-tablet:w-[calc(100%-24px)]">
      <div className="flex border items-center gap-4 rounded-[14px] bg-hp-raised px-4 py-3.5 shadow-hp-raised max-tablet:gap-3 max-tablet:p-3">
        <div className="min-w-0 flex-1">
          <p className="m-0 truncate text-sm leading-5 font-semibold text-hp-text">
            <b>Intro call</b>{" "}
            <span className="ml-1 text-[13px] font-normal text-hp-subtle">
              /acme/intro
            </span>
          </p>

          <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-hp-field px-1.5 py-0.5 text-xs leading-4 font-medium text-hp-body">
            <LuClock size={14} strokeWidth={1.5} aria-hidden="true" />
            30m
          </span>
        </div>

        <Switch defaultChecked />

        <div className="flex shrink-0 rounded-lg shadow-[inset_0_0_0_1px_var(--color-hp-line)]">
          <span className="relative grid size-[30px] place-items-center text-hp-subtle max-tablet:hidden">
            <LuExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
          </span>

          <span className="relative grid size-[30px] place-items-center text-hp-subtle shadow-[-1px_0_0_var(--color-hp-line)] max-tablet:shadow-none [&>svg]:[grid-area:1/1]">
            {copied ? <BiCopy /> : <FaCheck />}
            <span
              className={cn(
                TRANSITION,
                "absolute right-0 bottom-[calc(100%+10px)] rounded-md bg-hp-ink px-2 py-1.5 text-xs leading-none font-medium whitespace-nowrap text-hp-plate",
                copied
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0",
              )}
            >
              Link copied
            </span>
          </span>

          <span className="relative grid size-[30px] place-items-center text-hp-subtle shadow-[-1px_0_0_var(--color-hp-line)] max-tablet:hidden">
            <BsThreeDots size={14} aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 px-1">
        <p className="m-0 flex items-center gap-2 text-[13px] leading-none font-medium whitespace-nowrap text-hp-subtle [&_b]:text-hp-text">
          <Face src={IMG.graduation} w={440} x={47} y={46} className="size-6" />

          <span>
            <b>Thu</b> 22
          </span>
        </p>

        <ul className="m-0 flex list-none gap-1.5 p-0">
          {SLOTS.map((slot, i) => (
            <li
              key={slot}
              className={cn(
                "relative rounded-lg bg-hp-raised px-2.5 py-2 text-[13px] leading-none font-medium text-hp-text tabular-nums shadow-hp-raised",
                SLOT_CLS[i],
              )}
            >
              {slot}

              <span
                className={cn(
                  "absolute inset-0 grid place-items-center rounded-[inherit] bg-hp-slot-selected text-hp-on-ink transition-opacity duration-150 ease-in",
                  step === 2 && i === 2 ? "opacity-100" : "opacity-0",
                )}
              >
                {slot}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const SIZES = ["Under 50", "50 to 500", "500+"];

function RoutingDemo({ running }) {
  const step = useCycle([1200, 900, 700, 800, 2300], running);

  const open = step === 1 || step === 2;
  const chosen = step >= 3;

  return (
    <div className="grid w-[min(100%-40px,280px)]">
      <div className="relative z-10 rounded-[14px] bg-hp-raised p-3.5 shadow-hp-raised">
        <p className="mt-0 mb-2 text-[13px] leading-[1.35] font-medium text-balance text-hp-text">
          How many people work at your company?
        </p>

        <div className="relative flex h-[34px] items-center justify-between rounded-lg px-2.5 text-[13px] leading-none font-normal text-hp-subtle shadow-[inset_0_0_0_1px_var(--color-hp-line)]">
          <span className={cn(TRANSITION, chosen && "opacity-0")}>Select</span>

          <span
            className={cn(
              TRANSITION,
              "absolute left-2.5 font-medium text-hp-text",
              chosen ? "opacity-100" : "opacity-0",
            )}
          >
            500+
          </span>

          <Chevron rotate={90} />
        </div>

        <ul
          className={cn(
            TRANSITION,
            "absolute top-[calc(100%-8px)] right-3.5 left-3.5 m-0 list-none origin-top rounded-[10px] bg-hp-raised p-1 shadow-hp-raised",
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-1 scale-[0.98] opacity-0",
          )}
        >
          {SIZES.map((size, i) => (
            <li
              key={size}
              className={cn(
                "relative px-2 py-[7px] text-[13px] leading-none font-normal text-hp-text [&>span]:relative",
                "before:absolute before:inset-0 before:rounded-md before:bg-hp-field before:transition-opacity before:duration-100 before:ease-out before:content-['']",
                (step === 1 ? i === 0 || i === 1 : i === 2) && open
                  ? "before:opacity-100"
                  : "before:opacity-0",
              )}
            >
              <span>{size}</span>
            </li>
          ))}
        </ul>
      </div>

      <i
        className={cn(
          "h-[22px] w-px origin-top justify-self-center bg-hp-ink transition-transform duration-150 ease-in",
          chosen ? "scale-y-100" : "scale-y-0",
        )}
      />

      <div className="relative h-14">
        <span
          className={cn(
            TRANSITION,
            "absolute inset-0 grid place-items-center rounded-xl text-[13px] leading-none font-medium text-hp-muted shadow-[inset_0_0_0_1px_var(--color-hp-hairline)]",
            step >= 4 && "translate-y-1.5 opacity-0",
          )}
        >
          Routes on the answer
        </span>

        <div
          className={cn(
            TRANSITION,
            "absolute inset-0 flex items-center gap-2.5 rounded-xl bg-hp-raised px-3 shadow-hp-raised",
            step >= 4
              ? "translate-y-0 opacity-100"
              : "translate-y-1.5 opacity-0",
          )}
        >
          <Face src={IMG.retirement} w={400} x={36} y={47} className="size-8" />

          <p className="m-0 grid gap-0.5 text-[13px] leading-[1.2] font-semibold text-hp-text">
            <b>Martin Kerr</b>
            <span className="text-xs font-normal text-hp-subtle">
              Enterprise team
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const PEOPLE = [
  {
    name: "Felix",
    src: IMG.dinner,
    w: 420,
    x: 30,
    y: 33,
  },
  {
    name: "Ida",
    src: IMG.dinner,
    w: 400,
    x: 72,
    y: 42,
  },
  {
    name: "Pieter",
    src: IMG.office,
    w: 440,
    x: 20,
    y: 33,
  },
];

function RoundRobinDemo({ running }) {
  const step = useCycle([900, 1600, 900, 1600, 900, 1600], running);

  const turn = Math.floor(step / 2);
  const bumped = step % 2 === 1;

  const activePosition = `${((turn + 0.5) / PEOPLE.length) * 100}%`;

  return (
    <div className="w-full overflow-hidden pt-9">
      <div className="relative mx-auto grid w-full max-w-[288px] grid-cols-3 justify-items-center">
        <span
          className={cn(
            "absolute bottom-[calc(100%+10px)] left-0 rounded-full bg-hp-raised px-2.5 py-1.5 text-xs leading-none font-medium whitespace-nowrap text-hp-text shadow-hp-raised transition-[left,opacity,transform] duration-300 ease-hp",
            bumped ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
          style={{
            left: activePosition,
            transform: bumped ? "translate(-50%, 0)" : "translate(-50%, -8px)",
          }}
        >
          New booking
        </span>

        <i
          className="absolute -top-[5px] left-0 size-[74px] -translate-x-1/2 rounded-full bg-hp-tint/8 transition-[left] duration-[520ms] ease-hp after:absolute after:right-1 after:bottom-1 after:size-3 after:rounded-full after:bg-hp-accent after:shadow-[0_0_0_2.5px_var(--color-hp-plate)] after:content-['']"
          style={{
            left: activePosition,
          }}
        />

        {PEOPLE.map((person, i) => {
          const count = 3 + (bumped && i === turn ? 1 : 0);

          return (
            <div
              key={person.name}
              className="relative grid w-full max-w-24 justify-items-center gap-0.5"
            >
              <Face
                src={person.src}
                w={person.w}
                x={person.x}
                y={person.y}
                className="mb-2 size-16"
              />

              <b className="text-[13px] leading-[1.3] font-semibold text-hp-text">
                {person.name}
              </b>

              <span
                key={count}
                className="hp-swap text-xs leading-[1.3] font-normal text-hp-subtle tabular-nums"
              >
                {count} this week
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkflowStep({ Stepicon, title, body, active, sent }) {
  return (
    <div className="relative z-10 rounded-[14px] bg-hp-raised text-left shadow-hp-raised">
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <span className="relative grid size-7 shrink-0 place-items-center rounded-[8px] bg-hp-tint/[0.06] text-hp-subtle">
          {Stepicon}

          <span
            className={cn(
              "absolute inset-0 grid place-items-center rounded-[8px] bg-hp-ink text-hp-plate transition-opacity ease-in",
              active
                ? "opacity-100 duration-[420ms] ease-hp"
                : "opacity-0 duration-150",
            )}
          >
            {Stepicon}
          </span>
        </span>

        <b className="min-w-0 flex-1 text-[13px] leading-[1.3] font-medium text-hp-text">
          {title}
        </b>

        {sent !== undefined && (
          <span
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-md bg-hp-tint/[0.06] px-1.5 py-1 text-[11px] leading-none font-medium text-hp-ink",
              "transition-[opacity,transform] ease-in",
              sent
                ? "translate-y-0 opacity-100 duration-[420ms] ease-hp"
                : "translate-y-1 opacity-0 duration-150",
            )}
          >
            <LuCheck className="size-3" strokeWidth={1.5} aria-hidden="true" />
            Sent
          </span>
        )}
      </div>

      <div className="px-3 py-2.5 text-[13px] leading-[1.4] text-pretty text-hp-subtle shadow-[inset_0_1px_0_var(--color-hp-hairline)]">
        {body}
      </div>
    </div>
  );
}

function WorkflowDemo({ running }) {
  const step = useCycle([1000, 900, 600, 700, 2600, 400], running);

  return (
    <div className="grid w-[min(100%-48px,320px)]">
      <WorkflowStep
        Stepicon={<IoFlashOutline />}
        title="24 hours before event"
        body="Active on Intro call"
        active={step >= 1 && step < 5}
      />

      <span className="relative mx-auto block h-5 w-px bg-hp-line-2">
        <i
          className={cn(
            "absolute inset-0 origin-top bg-hp-ink transition-transform ease-out duration-[480ms]",
            step >= 2 && step < 5 ? "scale-y-100" : "scale-y-0",
          )}
        />
      </span>

      <WorkflowStep
        Stepicon={<IoChatbubbleOutline />}
        title="Send SMS to attendee"
        body="Reminder: Intro call with Lena Brandt is tomorrow at 10:00am."
        active={step >= 3 && step < 5}
        sent={step === 4}
      />
    </div>
  );
}

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const OPEN_DAYS = new Set([19, 20, 21, 22, 23, 26, 27, 28, 29, 30]);

function EmbedDemo({ running }) {
  const step = useCycle([1300, 1000, 3200, 600], running);

  const shown = step >= 2;

  return (
    <div className="grid w-[calc(100%-40px)] grid-cols-[1fr_auto] items-center gap-4 max-desktop:grid-cols-1 max-desktop:justify-items-center">
      <pre className="m-0 grid overflow-hidden rounded-xl bg-hp-well py-3.5 font-mono text-xs leading-[1.8] font-normal text-hp-subtle shadow-hp-well max-desktop:justify-self-stretch max-desktop:text-[11px] [&>span]:relative [&>span]:px-4 [&>span]:whitespace-pre [&_em]:font-medium [&_em]:text-hp-ink [&_em]:not-italic [&_q]:text-hp-body [&_q]">
        <span>
          <em>import</em> Cal <em>from</em> <q>@calcom/embed-react</q>;
        </span>

        <span
          className={cn(
            "before:absolute before:inset-0 before:bg-hp-hairline before:transition-opacity before:duration-150 before:ease-in before:content-['']",
            step === 1 ? "before:opacity-100" : "before:opacity-0",
          )}
        >
          &lt;<em>Cal</em> calLink=<q>acme/intro</q>
        </span>

        <span>
          {"  "}config={"{{"} layout: <q>month_view</q> {"}}"}/&gt;
        </span>
      </pre>

      <div className="w-[198px] border overflow-hidden rounded-xl bg-hp-raised shadow-hp-raised">
        <div className="border-b border-hp-line px-2.5 py-[7px] text-[11px] leading-none font-medium text-hp-subtle">
          yourapp.com/book
        </div>

        <div className="relative h-[186px]">
          <div
            className={cn(
              TRANSITION,
              "absolute inset-3.5 grid content-start gap-2 [&>i]:h-2 [&>i]:rounded [&>i]:bg-hp-field [&>i:nth-of-type(1)]:w-[60%] [&>i:nth-of-type(3)]:w-[75%]",
              shown && "-translate-y-1 opacity-0",
            )}
          >
            <i />
            <i />
            <i />
          </div>

          <div
            className={cn(
              TRANSITION,
              "absolute top-0 left-0 w-[428px] origin-top-left",
              shown
                ? "translate-y-0 scale-[0.46] opacity-100"
                : "translate-y-2.5 scale-[0.46] opacity-0",
            )}
          >
            <div className="px-5 pt-[30px] pb-5">
              <div className="flex w-[392px] items-center justify-between">
                <p className="m-0 text-base leading-4 font-medium text-hp-subtle">
                  <strong className="font-semibold text-hp-text">
                    October
                  </strong>{" "}
                  2026
                </p>

                <span className="inline-flex gap-7 text-hp-subtle">
                  <Chevron rotate={180} />
                  <Chevron />
                </span>
              </div>

              <div
                key={shown ? "in" : "out"}
                className="hp-swap mt-[22px] grid grid-cols-[repeat(7,52px)] gap-1"
              >
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                  (day) => (
                    <span
                      key={day}
                      className="pb-3.5 text-center text-xs leading-3 font-medium text-hp-subtle"
                    >
                      {day}
                    </span>
                  ),
                )}

                {[0, 1, 2, 3].map((n) => (
                  <span key={`b${n}`} />
                ))}

                {DAYS.map((day) => (
                  <span
                    key={day}
                    className={cn(
                      "relative grid size-[52px] place-items-center rounded-md text-sm leading-4 font-medium tabular-nums",
                      OPEN_DAYS.has(day)
                        ? "bg-hp-slot text-hp-ink"
                        : "text-hp-subtle",
                    )}
                  >
                    {day}

                    {day === 21 && (
                      <i className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoDemo({ running }) {
  const step = useCycle([1800, 600, 2600], running);

  const opened = step >= 1;

  return (
    <div className="relative aspect-[3/2] w-[min(100%-40px,300px)] overflow-hidden rounded-[14px] bg-hp-plate shadow-hp-raised">
      <div
        className={cn(
          TRANSITION,
          "absolute inset-0",
          opened ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
        )}
      >
        <img
          alt=""
          src={IMG.reilly}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 size-full object-cover object-[50%_62%]"
        />

        <span
          className={cn(
            TRANSITION,
            "absolute top-2.5 right-2.5 grid h-[46px] w-16 place-items-center rounded-lg bg-[#3a3a3a] text-[11px] leading-none font-semibold text-white/72 shadow-[0_0_0_1px_rgba(255,255,255,0.16)]",
            opened ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0",
          )}
        >
          You
        </span>

        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5 [&>span]:grid [&>span]:size-[30px] [&>span]:place-items-center [&>span]:rounded-full [&>span]:bg-[rgba(17,17,17,0.56)] [&>span]:text-white">
          <span>
            <LuMic size={14} strokeWidth={1.5} aria-hidden="true" />
          </span>

          <span>
            <LuVideo size={14} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
      </div>

      <div
        className={cn(
          TRANSITION,
          "absolute inset-0 grid place-content-center justify-items-center gap-1 text-center text-hp-ink",
          opened && "pointer-events-none scale-[0.98] opacity-0",
        )}
      >
        <Face
          src={IMG.reilly}
          w={500}
          x={15}
          y={40}
          className="mb-1.5 size-9"
        />

        <b className="text-sm leading-[1.3] font-semibold">
          Intro call with Reilly
        </b>

        <span className="grid text-xs leading-[1.4] font-normal text-hp-muted [&>span]:[grid-area:1/1]">
          <span className={cn(TRANSITION, step >= 1 && "opacity-0")}>
            Opens at 8:55am
          </span>

          <span className={cn(TRANSITION, step < 1 && "opacity-0")}>
            The room is open
          </span>
        </span>

        <span
          className={cn(
            "mt-2.5 rounded-full bg-hp-ink px-[18px] py-[7px] text-[13px] leading-none font-semibold text-hp-plate transition-[opacity,background-color] duration-150 ease-in",
            step >= 1 ? "opacity-100" : "opacity-35",
          )}
        >
          Join
        </span>
      </div>
    </div>
  );
}

export default function FeaturesGridSection() {
  const gridRef = useRef(null);

  const inView = useInView(gridRef, {
    once: true,
    amount: 0.15,
  });

  return (
    <section className="mx-auto w-[calc(100%-2*var(--page-margin))] max-w-[1152px] py-28 max-tablet:py-16">
      <style>{`
        @keyframes hp-swap {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .hp-swap {
          animation: hp-swap 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .hp-swap {
            animation: none;
          }
        }
      `}</style>

      <h2 className="m-0 font-display text-[56px] leading-[1.05] text-balance text-hp-ink max-desktop:text-[44px] max-tablet:text-[34px] max-tablet:hyphens-auto max-tablet:[overflow-wrap:anywhere]">
        <span className="block">One calendar for</span>
        <span className="block">every way people meet.</span>
      </h2>

      <div
        ref={gridRef}
        data-in={inView ? "true" : undefined}
        className="group/section mt-14 grid grid-cols-3 gap-4 max-desktop:grid-cols-2 max-tablet:grid-cols-1"
      >
        <Card
          i={0}
          span="col-span-2 max-tablet:col-auto"
          title="Booking pages"
          desc="Share a link. They pick an hour you're free."
        >
          {(hovered) => <BookingDemo running={hovered} />}
        </Card>

        <Card
          i={1}
          title="Routing"
          desc="One form sends each lead to the right person on the first try."
        >
          {(hovered) => <RoutingDemo running={hovered} />}
        </Card>

        <Card
          i={2}
          title="Round robin"
          desc="Meetings spread across the team, so no one gets all of them."
        >
          {(hovered) => <RoundRobinDemo running={hovered} />}
        </Card>

        <Card
          i={3}
          span="col-span-2 max-tablet:col-auto"
          title="Workflows"
          desc="Reminders and follow-ups go out on their own."
        >
          {(hovered) => <WorkflowDemo running={hovered} />}
        </Card>

        <Card
          i={4}
          span="col-span-2 max-desktop:col-span-1 max-tablet:col-auto"
          plateClass="h-[248px] max-desktop:h-auto max-desktop:py-5"
          title="Embeds and API v2"
          desc="Put Cal.com booking on your own site, in your own design."
        >
          {(hovered) => <EmbedDemo running={hovered} />}
        </Card>

        <Card
          i={5}
          title="Cal Video"
          desc="The room opens a few minutes before. No one wanders in early."
        >
          {(hovered) => <VideoDemo running={hovered} />}
        </Card>
      </div>
    </section>
  );
}
