"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
  {
    value: "solutions",
    label: "Products",
    menu: [
      {
        title: "Scheduling",
        description: "Booking pages for individuals and teams",
        href: "#",
      },
      {
        title: "Routing",
        description: "Route leads to the right person",
        href: "#",
      },
      {
        title: "Workflows",
        description: "Automate reminders and follow-ups",
        href: "#",
      },
      {
        title: "Insights",
        description: "Understand your booking data",
        href: "#",
      },
    ],
  },
  {
    value: "use-cases",
    label: "Use cases",
    menu: [
      { title: "Sales", description: "Book more demos, faster", href: "#" },
      {
        title: "Recruiting",
        description: "Schedule interviews with ease",
        href: "#",
      },
      {
        title: "Support",
        description: "Let customers book help sessions",
        href: "#",
      },
      { title: "Consulting", description: "Get paid for your time", href: "#" },
    ],
  },
  {
    value: "features",
    label: "Features",
    menu: [
      {
        title: "Round-robin",
        description: "Distribute meetings across a team",
        href: "#",
      },
      {
        title: "Collective events",
        description: "Find a time that works for everyone",
        href: "#",
      },
      {
        title: "Payments",
        description: "Collect payment at booking",
        href: "#",
      },
      {
        title: "Integrations",
        description: "Connect your calendar and video apps",
        href: "#",
      },
    ],
  },
  {
    value: "resources",
    label: "Resources",
    menu: [
      { title: "Blog", description: "News and product updates", href: "#" },
      { title: "Docs", description: "Guides and API reference", href: "#" },
      { title: "Help center", description: "Get answers fast", href: "#" },
      { title: "Changelog", description: "See what's new", href: "#" },
    ],
  },
  { value: "enterprise", label: "Enterprise", href: "/enterprise" },
  { value: "pricing", label: "Pricing", href: "/pricing" },
];

const TEAM_SIZES = [
  "Just me",
  "1-20",
  "21-200",
  "201-1000",
  "1001-2000",
  "2001+",
];

const AVATAR_SLOTS = [
  [
    "https://cal.com/api/avatar/45cb25ad-61b2-4971-beca-a23dd1b8c1c5.png",
    "https://app.cal.com/api/avatar/23dfa762-fa25-4bce-a285-095f4d4e84ad.png",
  ],
  [
    "https://app.cal.com/api/avatar/12cc6ce3-7ce1-4b39-9a9a-7d18f825dfce.png",
    "https://cal.com/api/avatar/86d637bc-bd3b-46dc-9a82-23ae74a151d2.png",
  ],
];

const targetClass =
  "flex h-9 shrink-0 select-none items-center gap-1 whitespace-nowrap rounded-lg px-2.5 font-medium text-[14px] text-hp-ink outline-none focus-visible:ring-2 focus-visible:ring-ring xl:px-3.5 dark:text-foreground";

const buttonClass =
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border outline-none before:pointer-events-none before:absolute before:inset-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 inset-shadow-[0_1px_rgba(255,255,255,0.16)] border-primary bg-primary text-primary-foreground shadow-primary/24 shadow-xs hover:bg-primary/90 active:inset-shadow-[0_1px_rgba(0,0,0,0.08)] active:shadow-none rounded-[12px] pt-px before:rounded-[11px] transition-[background-color,box-shadow] duration-150 ease-out active:duration-100 h-9 gap-1.5 px-3.5 text-sm leading-[21px] ml-2 font-medium";

function AvatarStack() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v === 0 ? 1 : 0)), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="-space-x-2 flex">
      {AVATAR_SLOTS.map((slot, s) => (
        <span
          key={s}
          className={`relative size-6 overflow-hidden rounded-full ring-2 ring-white dark:ring-card ${
            s === 0 ? "z-10" : ""
          }`}
        >
          {slot.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt=""
              width={24}
              height={24}
              initial={false}
              animate={{ opacity: i === idx ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 size-full object-cover"
            />
          ))}
        </span>
      ))}
    </span>
  );
}

const optionClass =
  "flex h-10 w-full cursor-pointer items-center justify-center rounded-lg text-sm outline-none transition-[background-color,color] duration-100 ease-out focus-visible:ring-2 motion-reduce:transition-none bg-hp-tint/[0.05] text-hp-ink hover:bg-hp-tint/[0.1] focus-visible:ring-ring active:bg-hp-tint/[0.14]";

function TalkToSales() {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);

  const show = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative hidden md:block lg:hidden min-[71.25rem]:block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <Link
        href="/talk-to-sales"
        title="Talk to sales"
        aria-label="Talk to sales"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-tracking-id="nav-link-sales"
        className={`${targetClass} transition-colors duration-150 ease-out hover:bg-foreground/4 gap-2 px-2.5`}
      >
        <AvatarStack />
        <span data-nav-sales-label="true">Talk to sales</span>
      </Link>

      <div
        role="dialog"
        aria-hidden={!open}
        style={{ width: 264 }}
        className={`absolute top-full right-0 z-50 origin-top-right overflow-hidden rounded-2xl border transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] mt-2.5 text-foreground border-border bg-card shadow-black/10 shadow-xl ${
          open
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
      >
        <div aria-hidden="true" className="-top-2.5 absolute inset-x-0 h-2.5" />
        <div className="p-4">
          <p className="m-0 font-display text-lg text-foreground">
            How big is your team?
          </p>
          <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-2 p-0">
            {TEAM_SIZES.map((size) => (
              <li key={size}>
                <Link
                  href={`/talk-to-sales?size=${encodeURIComponent(size)}`}
                  className={`${optionClass} no-underline`}
                >
                  {size}
                </Link>
              </li>
            ))}
            <li className="col-span-2">
              <a
                href="https://go.cal.com/support"
                className={`${optionClass} no-underline`}
              >
                I need help
              </a>
            </li>
          </ul>
          <p className="m-0 mt-4 text-xs leading-relaxed text-muted-foreground">
            Pick a size to see the team's available times.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [tight, setTight] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const [openValue, setOpenValue] = useState(null);
  const [hl, setHl] = useState({ x: 0, w: 0, visible: false, instant: false });
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setTight(window.scrollY > 8);

      const nav = document.querySelector('[data-nav-bar="true"]');
      const footer = document.querySelector('[data-page-footer="true"]');
      if (!nav || !footer) return;

      const navRect = nav.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      setOverFooter(
        footerRect.top < navRect.bottom && footerRect.bottom > navRect.top,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const moveHighlight = (el) =>
    setHl((prev) => ({
      x: el.offsetLeft,
      w: el.offsetWidth,
      visible: true,
      instant: !prev.visible,
    }));
  const hideHighlight = () => setHl((p) => ({ ...p, visible: false }));

  const openMenu = (value) => {
    clearTimeout(closeTimer.current);
    setOpenValue(value);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenValue(null), 120);
  };

  return (
    <nav
      aria-label="Main"
      data-nav-bar="true"
      data-over-footer={overFooter ? "true" : "false"}
      data-tight={tight ? "1" : "0"}
      className="sticky top-2 z-40 mx-auto mt-2 flex h-16 w-[calc(100%-2*var(--page-margin))] max-w-(--page-max) items-center justify-between gap-4 rounded-2xl xl:gap-6 bg-[rgba(244,244,244,0.72)] px-(--page-gutter) backdrop-blur-[12px] dark:bg-[rgba(23,23,23,0.72)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
    >
      <div className="flex shrink-0">
        <Link
          href="/"
          data-tracking-id="nav-link-logo"
          className="flex shrink-0 items-center"
        >
          <span className="relative block">
            <img
              alt="Cal.com"
              width={101}
              height={22}
              decoding="async"
              className="block h-[22px] w-auto dark:invert"
              src="logo.svg"
            />
          </span>
        </Link>
      </div>

      <div className="ml-2 flex min-w-0 flex-1 items-center xl:ml-6">
        <nav data-nav-menu="true" className="hidden lg:block">
          <ul
            className="relative isolate m-0 flex list-none items-center gap-0.5 p-0 xl:gap-1"
            onMouseLeave={hideHighlight}
          >
            <li
              aria-hidden="true"
              data-nav-highlight="true"
              data-visible={hl.visible ? "true" : "false"}
              className="nav-highlight -z-10 pointer-events-none absolute inset-y-0 left-0 rounded-lg bg-foreground/5"
              style={{
                transform: `translateX(${hl.x}px)`,
                width: hl.w,
                opacity: hl.visible ? 1 : 0,
                transition: hl.instant
                  ? "opacity 150ms ease-out"
                  : "transform 250ms cubic-bezier(0.22,1,0.36,1), width 250ms cubic-bezier(0.22,1,0.36,1), opacity 150ms ease-out",
              }}
            />

            {NAV.map((item) => {
              const isOpen = openValue === item.value;

              if (!item.menu) {
                return (
                  <li key={item.value}>
                    <Link
                      href={item.href}
                      data-nav-target="true"
                      className={targetClass}
                      onMouseEnter={(e) => {
                        moveHighlight(e.currentTarget);
                        scheduleClose();
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.value}
                  className="relative"
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    data-nav-target="true"
                    data-nav-value={item.value}
                    className={targetClass}
                    onMouseEnter={(e) => {
                      moveHighlight(e.currentTarget);
                      openMenu(item.value);
                    }}
                    onFocus={() => openMenu(item.value)}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      data-popup-open={isOpen ? "" : undefined}
                      className="transition-transform duration-150 ease-out data-popup-open:rotate-180"
                    >
                      <ChevronDown
                        className="size-3 opacity-50"
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{
                          duration: 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ transformOrigin: "top left" }}
                        className="absolute left-0 top-full z-50 pt-6"
                        onMouseEnter={() => openMenu(item.value)}
                      >
                        <div className="w-[340px] rounded-2xl border border-border bg-card p-2 shadow-xl shadow-black/10">
                          {item.menu.map((m) => (
                            <Link
                              key={m.title}
                              href={m.href}
                              className="block rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-foreground/5"
                            >
                              <div className="text-sm font-medium text-foreground">
                                {m.title}
                              </div>
                              <div className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
                                {m.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <TalkToSales />

        <Link
          href="https://app.cal.com/auth/login"
          data-nav-sign-in="true"
          data-tracking-id="nav-link-button-sign-in"
          className={`${targetClass} transition-colors duration-150 ease-out hover:bg-foreground/4 hidden sm:flex`}
        >
          Sign in
        </Link>

        <Link
          href="https://app.cal.com/signup"
          data-slot="button"
          data-tracking-id="nav-link-button-get-started"
          className={buttonClass}
        >
          Get started
        </Link>

        <Sheet>
          <SheetTrigger
            type="button"
            aria-label="Open menu"
            data-nav-sheet-toggle="true"
            className="relative inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent text-base font-medium text-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring sm:size-8 sm:text-sm lg:hidden"
          >
            <Menu
              className="size-4.5 opacity-80 sm:size-4"
              aria-hidden="true"
            />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-4">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <ul className="mt-8 flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.value}>
                  <Link
                    href={item.href ?? "#"}
                    className="flex h-10 items-center rounded-lg px-3 text-[15px] font-medium text-foreground hover:bg-foreground/5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
