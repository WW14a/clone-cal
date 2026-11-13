"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1];

const REVEAL =
  "translate-y-6 opacity-0 transition-[opacity,transform] duration-600 ease-hp [transition-delay:calc(var(--i,0)*60ms)] group-data-in/section:translate-y-0 group-data-in/section:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

const FAQS = [
  {
    q: "What is Cal.com and how does it work as a scheduling app?",
    a: "Cal.com is a scheduling app and meeting scheduling software used by over a million people to eliminate booking back-and-forth. You share a link, and Cal.com handles calendar syncing, timezone detection, reminders, and video calls through Zoom, Google Meet, Microsoft Teams, and Cal Video. It works as a simple meeting scheduler for 1-on-1s or a full automated scheduling system with routing and workflows, making it both a flexible scheduling tool and a powerful online booking system.",
  },
  {
    q: "What makes Cal.com different from other scheduling apps?",
    a: "Most scheduling apps limit free users heavily and force them to upgrade to paid tiers. Cal.com’s free tier is robust and always free for individuals. As a scheduler, Cal.com offers exceptional value to users by integrating seamlessly with common workflow tools like Google Calendar, Zoom, and Stripe. It also works as a lead routing, distribution, and management tool for inbound-focused teams. Overall, Cal.com is built for flexibility and customization. As a meeting scheduler, it has a robust free tier and very affordable paid tiers. Rare among scheduling tools, it provides high-impact features like custom domain support via your own SMTP server. This is currently an upcoming feature. Join the waitlist at cal.com/custom-domain-email-waitlist.",
  },
  {
    q: "How much does Cal.com cost and what's included in each plan?",
    a: "Cal.com's free plan includes unlimited links, calendar syncing, workflow automation, Stripe payments, and Cal Video, making it one of the most fully featured free scheduling tools on the market. For teams, the booking software scales across four tiers. Teams ($12/user/month billed yearly, $15 monthly) adds round-robin scheduling, shared availability, and team workflows, making it ideal scheduling software for small business. Organizations ($28/user/month billed yearly, $37 monthly) include org-wide admin controls and centralized management for larger companies using Cal.com's scheduler as their meeting scheduling software. Enterprise offers custom pricing with priority support, dedicated database, and higher SLAs. This is crucial for industries that require a secure online booking system.",
  },
  {
    q: "What are Cal.com's pricing plans, and is it good scheduling software for small businesses?",
    a: "Cal.com is one of the best options for scheduling software for small business thanks to a free tier that includes unlimited links, workflow automation, Stripe payments, and Cal Video, making it the most generous free scheduling tool available. Small businesses needing booking software with team features can upgrade to Teams at $12/user/month billed yearly ($15 monthly) for round-robin scheduling and shared availability. It also works as an online booking system for small businesses with embeddable booking pages. Organizations ($28/user/month billed yearly, $37 monthly) adds admin controls for mid-size to large companies. Enterprise offers custom pricing with priority support, dedicated database, and higher SLAs. The enterprise plan features are crucial for industries that require a secure meeting scheduling software with a secure database.",
  },
  {
    q: "Can Cal.com be used as scheduling software for Healthcare, Sales, Support, and B2B teams?",
    a: "Yes. Cal.com adapts as scheduling software across industries and team structures. Healthcare practices use it as patient scheduling software and physician scheduling software with HIPAA compliance, SOC 2 Type II certification, and encrypted storage. Thanks to the flexibility of Cal.com it is widely used by sales teams across industries. Support teams use the round-robin scheduling feature of Cal.com to fairly distribute workload among team members. For B2B sales teams, Cal.com works as booking software with attribute-based routing, round-robin lead distribution, and CRM updates in Salesforce or HubSpot on every booking. It's a complete automated scheduling system, online booking system, and scheduler for any vertical.",
  },
];

const DOTS = [
  [13.647172, 27.548244, 0.3, 0.012309],
  [19.373042, 27.723784, 0.3, 0.303537],
  [13.962615, 27.8429, 0.489273, 0.576],
  [24.039353, 25.091837, 0.3, 0.210285],
  [7.650745, 24.896549, 0.3, 0.306263],
  [19.091645, 26.657714, 0.606662, 0.576],
  [9.537927, 25.09912, 0.60168, 0.576],
  [24.856509, 23.568402, 0.818927, 0.642196],
  [4.891244, 20.47219, 0.3, 0.079373],
  [15.413209, 24.229726, 0.876319, 0.603653],
  [27.764461, 19.255273, 0.429162, 0.370205],
  [5.682405, 20.871707, 0.579514, 0.576],
  [22.569293, 21.523743, 1.462713, 0.717656],
  [10.79597, 20.494119, 0.982899, 0.616365],
  [27.335977, 17.385789, 1.426824, 0.7777],
  [3.919007, 16.020598, 0.471133, 0.576],
  [18.284302, 18.456275, 1.847796, 0.754771],
  [27.782739, 12.963592, 0.602589, 0.333624],
  [7.305142, 15.813346, 0.93897, 0.61851],
  [24.40636, 14.851054, 2.145599, 0.846435],
  [4.744042, 11.25546, 0.3, 0.337325],
  [13.817832, 14.268603, 1.909864, 0.763863],
  [26.430712, 10.675731, 1.682927, 0.863338],
  [6.468652, 10.810303, 0.888474, 0.634259],
  [19.935722, 11.225973, 2.423957, 0.870501],
  [7.931354, 7.062618, 0.3, 0.124206],
  [24.238715, 6.984665, 0.717027, 0.47599],
  [11.49286, 9.272336, 1.768354, 0.770035],
  [22.11331, 7.465149, 2.160171, 0.898737],
  [9.469808, 6.10807, 0.994187, 0.69988],
  [19.571843, 4.406885, 0.645367, 0.279531],
  [16.179616, 6.221787, 2.05015, 0.853337],
  [13.679109, 3.991409, 0.856131, 0.656767],
  [16, 4.112543, 1.42402, 0.817333],
];

function DotsIcon({ thinking }) {
  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="currentColor"
      className="block size-full"
      animate={thinking ? { rotate: 360 } : { rotate: 0 }}
      transition={
        thinking
          ? { duration: 2.4, ease: "linear", repeat: Infinity }
          : { duration: 0.4 }
      }
    >
      {DOTS.map(([cx, cy, r, o], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} opacity={o} />
      ))}
    </motion.svg>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="10"
      width="7"
      viewBox="0 0 7 10"
      style={{ flexShrink: 0, width: 7, height: 10 }}
    >
      <path
        d="M1.5 9 5.5 5 1.5 1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function FaqItem({ item, id, open, onToggle, reduce }) {
  return (
    <div
      data-open={open ? "" : undefined}
      className="group/item rounded-3xl border-0 bg-(--faq-row,var(--color-hp-field)) max-md:rounded-[20px]"
    >
      <h3 className="flex">
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex flex-1 cursor-pointer items-center justify-between gap-5 rounded-3xl py-5 pr-5 pl-6 text-left text-sm font-medium text-inherit outline-none transition-all [font:inherit] focus-visible:ring-[3px] focus-visible:ring-ring max-md:gap-3 max-md:rounded-[20px] max-md:p-4"
        >
          <span className="flex-1 text-balance font-display text-lg leading-[1.3] text-foreground max-md:text-[17px]">
            {item.q}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`pointer-events-none box-content size-3.5 shrink-0 rounded-full bg-(--faq-toggle,var(--color-hp-raised)) p-[11px] text-foreground transition-transform duration-500 ease-hp ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>

      <motion.div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        aria-hidden={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: reduce ? 0 : open ? 0.5 : 0.3, ease: EASE }}
        className="overflow-hidden"
      >
        <div className="translate-y-1 pr-16 pb-6 pl-6 text-[16px] leading-[1.6] text-pretty text-foreground/80 opacity-0 transition-[opacity,transform] duration-150 ease-out group-data-open/item:translate-y-0 group-data-open/item:opacity-100 group-data-open/item:duration-500 group-data-open/item:ease-hp motion-reduce:transition-none max-md:px-4 max-md:pb-4 max-md:text-[15px]">
          {item.a}
        </div>
      </motion.div>
    </div>
  );
}

function localAnswer(question) {
  const words = question.toLowerCase().match(/[a-z0-9$]{3,}/g) ?? [];
  let best = null;
  let bestScore = 0;
  for (const f of FAQS) {
    const hay = `${f.q} ${f.a}`.toLowerCase();
    const score = words.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0);
    if (score > bestScore) {
      best = f;
      bestScore = score;
    }
  }
  return bestScore >= 2
    ? best.a
    : "I don't have a short answer for that one. Talk to sales and we'll get back to you.";
}

export default function FaqSection({ onAsk }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = onAsk ? await onAsk(q) : localAnswer(q);
      setAnswer(res);
    } catch {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      ref={ref}
      aria-label="FAQ"
      data-in={inView ? "true" : undefined}
      className="mx-auto w-[calc(100%-2*var(--page-margin))] max-w-[1152px] py-28 group/section grid grid-cols-[1fr_1.3fr] items-start gap-16 max-desktop:grid-cols-1 max-desktop:gap-10 max-tablet:gap-8"
    >
      <div className="sticky top-28 grid gap-6 max-desktop:static">
        <h2 className="m-0 font-display text-[56px] leading-[1.05] text-balance text-hp-ink max-desktop:text-[44px] max-tablet:text-[34px] max-tablet:hyphens-auto max-tablet:[hyphenate-limit-chars:14_6_6] max-tablet:[overflow-wrap:anywhere]">
          <span className="block">Frequently asked</span>{" "}
          <span className="block">questions.</span>
        </h2>

        <p
          style={{ "--i": 1 }}
          className={`geom-50 m-0 max-w-[640px] font-hp-display text-2xl leading-[1.35] font-medium text-pretty text-hp-quiet max-tablet:text-[19px] max-tablet:text-hp-muted ${REVEAL}`}
        >
          The short ones are here. For anything else, ask below.
        </p>

        <div style={{ "--i": 2 }} className={`flex flex-wrap gap-2 ${REVEAL}`}>
          <Button className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm font-medium">
            Talk to sales
            <Chevron />
          </Button>
          <Button
            variant="outline"
            className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm font-medium"
          >
            Get started
            <Chevron />
          </Button>
        </div>
      </div>

      <div
        style={{ "--i": 2 }}
        className={`${REVEAL} [--faq-row:var(--color-hp-field)] [--faq-toggle:var(--color-hp-raised)]`}
      >
        <div className="mt-0 grid w-full max-w-none gap-3 text-left">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              id={`faq-${i}`}
              item={item}
              reduce={reduce}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}

          <div className="rounded-3xl border-0 bg-(--faq-row,var(--color-hp-field)) py-2 pr-5 pl-4 max-md:rounded-[20px] max-md:py-1 max-md:pr-4 max-md:pl-3">
            <form onSubmit={submit} className="flex items-center gap-3 py-3">
              <span
                aria-hidden="true"
                className="size-8 shrink-0 text-foreground"
              >
                <DotsIcon thinking={loading} />
              </span>
              <label className="sr-only" htmlFor="faq-ask">
                Ask anything else
              </label>
              <input
                id="faq-ask"
                autoComplete="off"
                maxLength={300}
                placeholder="Ask anything else"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-w-0 flex-1 bg-transparent py-1 font-display text-[20px] text-foreground outline-none placeholder:text-muted-foreground max-md:text-[17px]"
              />
              <button
                type="submit"
                aria-label="Ask"
                disabled={!question.trim() || loading}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--faq-toggle,var(--color-muted)) text-muted-foreground transition-[background-color,color] duration-150 ease-out enabled:bg-foreground enabled:text-background enabled:active:opacity-85"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </form>

            <div
              aria-live="polite"
              className="faq-answer pr-12 pb-5 pl-11 leading-relaxed text-foreground/80"
            >
              {answer && (
                <motion.p
                  className="m-0"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {answer}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
