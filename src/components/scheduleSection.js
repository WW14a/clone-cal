"use client";

import * as React from "react";
import { useInView } from "framer-motion";
import { ChevronRight, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { OLDER, THREAD } from "./inboxData";
import { CalDots } from "./calDots";
import PixelPhoto from "./pixelPhoto";
import ProgressRing from "./progressRing";

const STEPS = [
  {
    title: "Stop chasing a time over email",
    body: "Four people, three time zones, eleven emails and still no slot.",
    face: "inbox",
    photo: "party",
    ms: 8000,
  },
  {
    title: "Send one link with your free hours",
    body: "It only shows the times you can actually meet.",
    face: "link",
    photo: "party",
    ms: 6538.32,
  },
  {
    title: "Let them pick the time",
    body: "It lands in everyone's calendar, no reply needed.",
    face: "booked",
    photo: "woman",
    ms: 6538.32,
  },
];

const PHOTOS = {
  party: {
    src: "/playing-hard-cheerful.jpg",
    label: "Friends dancing in a kitchen at a house party.",
  },
  woman: {
    src: "/woman-black-jacket.jpg",
    label:
      "A woman in a leather jacket walking down a garden path between tall hedges.",
  },
};

const FACE_BASE =
  "self-end [grid-area:1/1] transition-[opacity,filter] motion-reduce:transition-none";
const FACE_ON = "opacity-100 blur-none delay-[100ms] duration-[350ms] ease-hp";
const FACE_OFF = "opacity-0 blur-[4px] duration-150 ease-in";
const BUBBLE =
  "flex min-w-0 flex-col gap-2 transition-[opacity,filter] duration-200 ease-out motion-reduce:transition-none";

const PROSE =
  "text-pretty text-foreground text-sm leading-6 [&_p]:m-0 [&_strong]:font-semibold [&_ul]:m-0 [&_ul]:mt-1.5 [&_ul]:list-none [&_ul]:p-0 [&_li]:relative [&_li]:mb-1 [&_li]:ps-5 [&_li]:before:absolute [&_li]:before:start-0 [&_li]:before:min-w-4 [&_li]:before:text-center [&_li]:before:text-muted-foreground [&_li]:before:content-['•']";

const INITIAL = 3;
const START_MS = 600;
const INTERVAL_MS = 800;

export function ScheduleSection() {
  const sectionRef = React.useRef(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const [active, setActive] = React.useState(0);
  const [interactionPaused, setInteractionPaused] = React.useState(false);
  const [count, setCount] = React.useState(INITIAL);
  const ringPath = React.useRef(null);
  const faceEls = React.useRef({});
  const [panelH, setPanelH] = React.useState();

  const step = STEPS[active];
  const faceId = step.face;

  const next = React.useCallback(
    () => setActive((a) => (a + 1) % STEPS.length),
    [],
  );

  React.useEffect(() => {
    if (active !== 0) {
      const t = setTimeout(() => setCount(INITIAL), 700);
      return () => clearTimeout(t);
    }

    let raf = 0;

    const tick = () => {
      const anim = ringPath.current?.getAnimations()[0];
      const ct = anim?.currentTime;
      const t = typeof ct === "number" ? ct : 0;
      const arrived =
        t < START_MS ? 0 : Math.floor((t - START_MS) / INTERVAL_MS) + 1;

      setCount(Math.min(THREAD.length, INITIAL + arrived));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [active]);

  React.useLayoutEffect(() => {
    const el = faceEls.current[faceId];

    if (!el) return;

    const measure = () => setPanelH(el.offsetHeight);

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => ro.disconnect();
  }, [faceId]);

  const inboxRef = React.useCallback((el) => {
    faceEls.current.inbox = el;
  }, []);
  const linkRef = React.useCallback((el) => {
    faceEls.current.link = el;
  }, []);
  const bookedRef = React.useCallback((el) => {
    faceEls.current.booked = el;
  }, []);

  const rows = [
    ...THREAD.map((m, k) => ({
      m,
      slot: k < count ? count - 1 - k : -1,
      hidden: k >= count,
    })),
    ...OLDER.map((m, j) => ({
      m,
      slot: count + j,
      hidden: false,
    })),
  ];

  const unread = THREAD.slice(0, count).filter((m) => m.unread).length;

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-[calc(100%-2*var(--page-margin))] max-w-[1152px] py-28 max-tablet:py-16"
    >
      <div className="[--row:60px]" data-state={faceId}>
        <div className="grid grid-cols-2 items-center gap-16 max-desktop:gap-8 max-tablet:grid-cols-1 max-tablet:gap-5">
          <div className="grid gap-10 max-tablet:gap-4">
            <h2 className="m-0 font-display text-[56px] leading-[1.05] text-balance text-hp-ink max-desktop:text-[44px] max-tablet:text-[34px] max-tablet:hyphens-auto max-tablet:[hyphenate-limit-chars:14_6_6] max-tablet:[overflow-wrap:anywhere]">
              <span className="block">
                Finding a time took a week of emails.
              </span>{" "}
              <span className="block">Now it&apos;s one link.</span>
            </h2>

            <div className="grid gap-5">
              <ol className="m-0 grid list-none gap-2 p-0">
                {STEPS.map((s, i) => {
                  const on = i === active;

                  return (
                    <li
                      key={s.title}
                      className="group/row relative"
                      aria-current={on ? "step" : undefined}
                      onMouseEnter={() => {
                        setActive(i);
                        setInteractionPaused(true);
                      }}
                      onMouseLeave={() => setInteractionPaused(false)}
                      onFocus={() => {
                        setActive(i);
                        setInteractionPaused(true);
                      }}
                      onBlur={() => setInteractionPaused(false)}
                    >
                      {on && (
                        <ProgressRing
                          durationMs={s.ms}
                          paused={!inView || interactionPaused}
                          onDone={next}
                          pathRef={ringPath}
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setActive(i);
                          setInteractionPaused(true);
                        }}
                        className={cn(
                          "relative block w-full cursor-pointer overflow-hidden rounded-3xl px-6 py-5 text-left text-inherit outline-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-foreground focus-visible:outline-offset-2 max-md:rounded-2xl max-md:px-5 max-md:py-4",
                          on
                            ? "bg-hp-surface shadow-[inset_0_0_0_1px_var(--color-hp-hairline)]"
                            : "bg-hp-field hover:bg-hp-line",
                        )}
                      >
                        <span
                          className={cn(
                            "block text-balance font-display text-[22px] leading-[1.15] transition-colors duration-200 ease-out max-md:text-[19px]",
                            on ? "text-foreground" : "text-hp-muted",
                          )}
                        >
                          {s.title}
                        </span>

                        <span
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-300 ease-hp motion-reduce:transition-none",
                            on
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-[46ch] pt-2 text-pretty text-[15px] text-muted-foreground leading-[1.45]">
                              {s.body}
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <p className="m-0 text-sm leading-normal font-medium text-pretty text-hp-body tabular-nums [&_b]:font-semibold [&_b]:text-hp-ink max-w-[440px] max-tablet:hidden">
              <b>Deel</b> spends 35% less time scheduling across support, sales
              and ops, and gets back more than 6,000 hours a week.
            </p>
          </div>

          <figure className="relative m-0 aspect-[4/5] max-h-[calc(100vh-96px)] w-full justify-self-end overflow-hidden rounded-3xl [--rows:5] max-desktop:[--rows:4] max-tablet:aspect-[4/4.4] max-tablet:max-h-[56vh] max-tablet:justify-self-stretch max-tablet:[--rows:3]">
            <PixelPhoto
              src={PHOTOS.party.src}
              label={PHOTOS.party.label}
              visible={step.photo === "party"}
            />

            <PixelPhoto
              src={PHOTOS.woman.src}
              label={PHOTOS.woman.label}
              visible={step.photo === "woman"}
            />

            <div
              className="overflow-hidden rounded-2xl bg-hp-raised text-hp-ink shadow-hp-raised transition-[height] duration-[450ms] ease-hp motion-reduce:transition-none absolute right-5 bottom-5 left-5 grid grid-cols-[minmax(0,1fr)] content-end items-end max-desktop:right-3.5 max-desktop:bottom-3.5 max-desktop:left-3.5"
              style={{ height: panelH }}
            >
              <section
                ref={inboxRef}
                aria-hidden={faceId !== "inbox"}
                aria-label="Inbox"
                className={cn(
                  FACE_BASE,
                  "overflow-hidden",
                  faceId === "inbox" ? FACE_ON : FACE_OFF,
                )}
              >
                <header className="flex items-center justify-between border-b border-hp-line px-4 py-3 text-[13px] leading-none">
                  <span className="font-semibold">Inbox</span>
                  <span className="text-hp-muted tabular-nums">
                    {unread} unread
                  </span>
                </header>

                <ul className="relative m-0 h-[calc(var(--rows)*var(--row))] list-none p-0">
                  {rows.map(({ m, slot, hidden }) => (
                    <MailRow key={m.id} mail={m} slot={slot} hidden={hidden} />
                  ))}
                </ul>
              </section>

              <ChatFace
                register={linkRef}
                visible={faceId === "link"}
                label="Cal.com link"
                title="Intro call link"
                prompt="Create a 30-min intro call link for Clara, Felix and Ida"
                reply={
                  <p>
                    Intro call is ready: <strong>cal.com/acme/intro</strong>. It
                    only offers times all four of you are free, each in their
                    own time zone.
                  </p>
                }
              />

              <ChatFace
                register={bookedRef}
                visible={faceId === "booked"}
                title="Intro call"
                prompt="Did they book the intro call?"
                reply={
                  <p>
                    Yes. Clara picked <strong>Thursday at 10:00</strong>, and
                    it&apos;s in all four calendars.
                  </p>
                }
              >
                <div className="w-full overflow-hidden rounded-lg shadow-[inset_0_0_0_1px_var(--color-border)]">
                  <div className="flex items-center gap-2 border-border border-t px-2.5 py-2 first:border-t-0">
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium text-foreground text-xs">
                        Intro call between Pieter Smit and Clara Voss
                      </span>
                      <span className="truncate text-muted-foreground text-xs tabular-nums">
                        Nov 12, 10:00 AM
                      </span>
                    </span>
                  </div>
                </div>
              </ChatFace>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Avatar({ mail }) {
  if (!mail.face) {
    return (
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-full bg-hp-field text-xs leading-none font-semibold text-hp-body"
      >
        {mail.initial}
      </span>
    );
  }

  const { file: src, width, left, top } = mail.face;

  return (
    <span
      aria-hidden="true"
      className="relative inline-block flex-none overflow-hidden rounded-full bg-hp-field size-8"
    >
      <img
        alt=""
        src={src}
        loading="lazy"
        decoding="async"
        data-face="true"
        className="absolute h-auto max-w-none"
        style={{
          width,
          left,
          top,
          transform: `translate(-${left}, -${top})`,
        }}
      />
    </span>
  );
}

function MailRow({ mail, slot, hidden }) {
  const u = mail.unread;

  return (
    <li
      className="absolute inset-x-0 top-0 grid h-(--row) translate-y-[calc(var(--slot)*var(--row))] grid-cols-[32px_minmax(0,1fr)] items-center gap-3 px-4 text-[13px] leading-[1.3] text-hp-muted opacity-[clamp(0,calc(var(--rows)-var(--slot)),1)] shadow-[inset_0_-1px_0_var(--color-hp-line)] transition-[transform,opacity] duration-[450ms] ease-hp motion-reduce:transition-none"
      style={{
        "--slot": slot,
        ...(hidden ? { opacity: 0 } : null),
      }}
    >
      <Avatar mail={mail} />

      <span className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-0.5">
        <span className="flex items-baseline gap-2">
          <b
            className={cn(
              "min-w-0 flex-1 truncate",
              u ? "font-semibold text-hp-ink" : "font-medium text-hp-body",
            )}
          >
            {mail.name}
          </b>

          <time
            className={cn(
              "flex-none text-xs tabular-nums",
              u && "font-semibold text-hp-ink",
            )}
          >
            {mail.time}
          </time>
        </span>

        <span className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate">
            <span className={u ? "font-medium text-hp-ink" : "text-hp-body"}>
              {mail.subject}
            </span>{" "}
            {mail.preview}
          </span>

          {u && (
            <span
              aria-hidden="true"
              className="size-2 flex-none rounded-full bg-hp-ink"
            />
          )}
        </span>
      </span>
    </li>
  );
}

function ChatFace({
  register,
  visible,
  label,
  title,
  prompt,
  reply,
  children,
}) {
  const state = visible ? "opacity-100 blur-none" : "opacity-0 blur-[2px]";

  return (
    <section
      ref={register}
      aria-hidden={!visible}
      aria-label={label}
      className={cn(FACE_BASE, visible ? FACE_ON : FACE_OFF)}
    >
      <div className="text-left">
        <div className="flex items-center gap-1.5 border-hp-line border-b px-4 py-2.5">
          <CalDots />
          <span className="truncate font-semibold text-[13px]">{title}</span>
        </div>

        <div className="flex flex-col gap-4 p-4 max-tablet:gap-3 max-tablet:p-3">
          <div className={cn(BUBBLE, state)} aria-hidden={!visible}>
            <p className="m-0 ms-auto w-fit max-w-[85%] text-pretty rounded-lg bg-muted px-3 py-2 text-sm leading-6">
              {prompt}
            </p>
          </div>

          <div
            className={cn(BUBBLE, state)}
            aria-hidden={!visible}
            style={{
              transitionDelay: visible ? "0.9s" : undefined,
            }}
          >
            <div className="flex flex-col">
              <span className="inline-flex w-fit items-center gap-1.5 text-muted-foreground text-xs leading-5">
                <CircleCheck className="size-3.5" aria-hidden="true" />
                Completed 1 step
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </span>
            </div>

            <div className={PROSE}>{reply}</div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
export default ScheduleSection;
