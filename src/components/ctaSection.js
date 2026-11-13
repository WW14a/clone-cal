"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const RATINGS = [
  {
    score: "4.5",
    source: "Trustpilot",
    href: "https://www.trustpilot.com/review/cal.com",
    fill: 90,
  },
  {
    score: "4.8",
    source: "Product Hunt",
    href: "https://www.producthunt.com/products/cal-com",
    fill: 96,
  },
  {
    score: "4.5",
    source: "G2",
    href: "https://www.g2.com/products/cal-com/reviews",
    fill: 90,
  },
];

function Stars({ className = "" }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          strokeWidth={0}
          className={`size-3.5 shrink-0 fill-current ${className}`}
        />
      ))}
    </>
  );
}

function Rating({ score, source, href, fill, index, reduce }) {
  return (
    <li>
      <a
        aria-label={`${score} on ${source}`}
        href={href}
        rel="noopener"
        target="_blank"
        className="group flex items-center gap-3 rounded-lg no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        <span className="font-display text-[32px] leading-none text-foreground tabular-nums">
          {score}
        </span>
        <span className="flex flex-col items-start gap-1">
          <span aria-hidden="true" className="relative inline-flex">
            <span className="flex gap-0.5 text-foreground/15">
              <Stars />
            </span>
            <motion.span
              className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-[#f5a524]"
              initial={{ width: reduce ? `${fill}%` : "0%" }}
              whileInView={{ width: `${fill}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.9,
                delay: 0.3 + index * 0.12,
                ease: EASE,
              }}
            >
              <Stars />
            </motion.span>
          </span>
          <span className="text-[13px] leading-none text-muted-foreground transition-colors duration-100 ease-out group-hover:text-foreground">
            {source}
          </span>
        </span>
      </a>
    </li>
  );
}

export default function CtaSection() {
  const reduce = useReducedMotion();

  return (
    <section id="get-started" data-align-exempt="true" className="page-measure">
      <div className="flex flex-col items-center py-24 text-center md:py-32">
        <h2 className="m-0 max-w-4xl text-balance font-display text-[44px] leading-[0.95] md:text-[80px]">
          Scheduling for absolutely everyone.
        </h2>

        <p className="mt-6 mb-0 max-w-xl text-[16px] leading-[1.45] text-pretty text-muted-foreground">
          Free for individuals, no credit card, no usage limits.
          <br />
          Connect a calendar, share a link, and let people book when it works
          for both of you.
        </p>

        <a className="mt-12 inline-flex items-center gap-4 rounded-[20px] bg-foreground px-9 py-5 font-display text-[32px] leading-none tracking-[-0.01em] text-background no-underline transition-colors duration-150 ease-out hover:bg-[color-mix(in_srgb,var(--color-foreground)_88%,var(--color-background))] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground active:bg-[color-mix(in_srgb,var(--color-foreground)_80%,var(--color-background))] active:duration-100 motion-reduce:transition-none max-md:rounded-[16px] max-md:px-7 max-md:py-4 max-md:text-[26px]">
          Get started for free
        </a>

        <Link
          href="/talk-to-sales"
          className="tap-32 mt-5 text-[15px] leading-[1.4] font-medium text-foreground no-underline transition-colors duration-100 ease-out focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          or talk to sales
        </Link>

        <ul className="m-0 mt-14 flex list-none flex-wrap justify-center gap-x-10 gap-y-5 p-0">
          {RATINGS.map((r, i) => (
            <Rating key={r.source} {...r} index={i} reduce={reduce} />
          ))}
        </ul>
      </div>
    </section>
  );
}
