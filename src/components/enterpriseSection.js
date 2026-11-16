"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PixelPhoto from "./pixelPhoto";

const EASE = [0.22, 1, 0.36, 1];

const FEATURES = [
  "SAML SSO and SCIM provisioning",
  "Audit log for every admin change",
  "99.99% uptime SLA",
  "Pay only for active members",
];

const COMPLIANCE = [
  { alt: "ISO 27001", src: "https://cal.com/landing/compliance/iso.svg" },
  { alt: "SOC 2", src: "https://cal.com/landing/compliance/soc2.svg" },
  { alt: "CCPA", src: "https://cal.com/landing/compliance/ccpa.svg" },
  { alt: "GDPR", src: "https://cal.com/landing/compliance/gdpr.svg" },
  { alt: "HIPAA", src: "https://cal.com/landing/compliance/hipaa.svg" },
];

const STORIES = [
  {
    href: "/customers/deel",
    name: "Deel",
    logo: "https://cal.com/landing/stories/deel-logo.png",
    photo: "Dan-Westgarth.jpg",
    title: "From $500M to $1.5B+ ARR",
    tilt: "1.2deg",
    pos: "left-0 top-0 z-30",
  },
  {
    href: "/customers/retell-ai",
    name: "Retell AI",
    logo: "https://cal.com/landing/stories/retell-ai-logo.png",
    photo: "retell_ai.avif",
    title: "10M+ calls handled per month",
    tilt: "-1.2deg",
    pos: "right-0 top-[22%] z-20",
  },
  {
    href: "https://cal.com/customers/storyblok",
    name: "Storyblok",
    logo: "https://cal.com/landing/stories/storyblok-logo.jpg",
    photo: "Storyblok.webp",
    title: "50% more demo efficiency",
    tilt: "-2deg",
    pos: "left-[14%] top-[49%] z-10",
  },
];

function Check() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="12"
      viewBox="0 0 16 16"
      width="12"
    >
      <path
        d="m3.5 8.5 3 3 6-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
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

function Print({ story: s, index: i, reduce }) {
  const [visible, setVisible] = useState(false);

  return (
    <motion.li
      className={`absolute w-[46%] max-sm:w-[52%] ${s.pos}`}
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.15 + i * 0.14, ease: EASE }}
      onViewportEnter={() => {
        if (reduce) return setVisible(true);
        setTimeout(() => setVisible(true), 350 + i * 140);
      }}
    >
      <Link
        href={s.href}
        style={{ "--tilt": s.tilt }}
        className="group relative block rounded-[3px] bg-hp-print-paper p-3 pb-6 text-hp-print-label no-underline shadow-[0_0_0_0.5px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.05),0_3px_8px_-3px_rgba(0,0,0,0.08)] transition-[rotate] duration-200 ease-out [rotate:var(--tilt)] hover:[rotate:0deg] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground focus-visible:[rotate:0deg] motion-reduce:transition-none dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_3px_8px_-3px_rgba(0,0,0,0.4)]"
      >
        <div
          aria-hidden="true"
          className="relative aspect-[4/3] overflow-hidden"
        >
          <PixelPhoto src={s.photo} label="" visible={visible} />
        </div>
        <div className="mt-4 flex items-center gap-2 px-1">
          <img
            src={s.logo}
            alt=""
            width={24}
            height={24}
            className="size-6 rounded-[5px] object-contain"
          />
          <span className="truncate text-[13px] font-medium opacity-70">
            {s.name}
          </span>
        </div>
        <h3 className="geom-100 m-0 mt-2.5 px-1 text-[19px] leading-[1.28] font-medium text-pretty">
          {s.title}
        </h3>
      </Link>
    </motion.li>
  );
}

export default function EnterpriseSection() {
  const reduce = useReducedMotion();

  const column = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const item = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section
      id="enterprise"
      className="mx-auto w-[calc(100%-2*var(--page-margin))] max-w-[1152px] py-28 grid grid-cols-[minmax(0,1fr)_minmax(0,560px)] items-center gap-16 max-desktop:grid-cols-1 max-desktop:gap-12 max-tablet:gap-10"
    >
      <motion.div
        className="grid justify-items-start gap-6"
        variants={column}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={item}>
          <Badge
            variant="outline"
            className="h-8 min-h-8 rounded-md border-hp-line bg-background px-3 text-sm font-medium text-hp-ink dark:bg-[color-mix(in_srgb,var(--color-hp-line)_32%,var(--background))]"
          >
            Enterprise
          </Badge>
        </motion.div>

        <motion.h2
          variants={item}
          className="m-0 font-display text-[56px] leading-[1.05] text-balance text-hp-ink max-desktop:text-[44px] max-tablet:text-[34px] max-tablet:hyphens-auto max-tablet:[overflow-wrap:anywhere]"
        >
          <span className="block">Scheduling the whole company</span>{" "}
          <span className="block">actually adopts.</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="geom-50 m-0 max-w-[640px] font-hp-display text-2xl leading-[1.35] font-medium text-pretty text-hp-quiet max-tablet:text-[19px] max-tablet:text-hp-muted"
        >
          One organization for every team, inside the company and out: the same
          links, rules and admin controls, so the rollout sticks.
        </motion.p>

        <motion.div variants={item} className="mt-2 flex flex-wrap gap-2">
          <Button className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm font-medium">
            Talk to sales
            <Chevron />
          </Button>
          <Button
            variant="outline"
            className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm font-medium"
          >
            Learn more
          </Button>
        </motion.div>

        <motion.ul
          variants={item}
          className="m-0 mt-6 grid w-full list-none gap-x-6 gap-y-3 p-0 sm:grid-cols-2 max-tablet:mt-4"
        >
          {FEATURES.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2.5 text-[15px] leading-[1.35] text-hp-body"
            >
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-hp-tint/[0.07] text-hp-ink">
                <Check />
              </span>
              {f}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="mt-4 grid gap-4 max-tablet:mt-2">
          <ul
            aria-label="Compliance frameworks"
            className="m-0 flex list-none flex-wrap items-center gap-x-7 gap-y-3 p-0"
          >
            {COMPLIANCE.map((c) => (
              <li key={c.alt} className="flex items-center">
                <NextImage
                  src={c.src}
                  alt={c.alt}
                  width={32}
                  height={32}
                  unoptimized
                  className="h-8 w-auto opacity-60 brightness-0 dark:invert"
                />
              </li>
            ))}
          </ul>
          <p className="m-0 max-w-md text-sm leading-[1.45] text-pretty text-hp-subtle">
            Encrypted in transit and at rest, continuously monitored, hosted in
            the US or the EU.{" "}
            <Link
              href="/compliance"
              className="text-hp-ink no-underline hover:text-hp-body"
            >
              Read the compliance overview
            </Link>
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        data-enterprise-plate="true"
        className="rounded-[28px] bg-hp-plate p-10 shadow-hp-plate max-tablet:rounded-[22px] max-tablet:p-5"
        initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <ul
          data-enterprise-prints="true"
          className="relative m-0 aspect-[0.93] w-full list-none p-0 max-lg:mx-auto max-lg:max-w-[520px] max-sm:aspect-[0.6]"
        >
          {STORIES.map((story, i) => (
            <Print key={story.name} story={story} index={i} reduce={reduce} />
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
