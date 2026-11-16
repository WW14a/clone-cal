"use client";

import { useState } from "react";
import {
  CalendarDays,
  MonitorSmartphone,
  Ticket,
  Compass,
  Sparkles,
  Video,
  Laptop,
  NotebookPen,
  Mic,
  CalendarRange,
  CreditCard,
  Building2,
  Globe,
  ChevronDown,
  Monitor,
  Sun,
  Moon,
} from "lucide-react";
import PixelPhoto from "./pixelPhoto";
import { useTheme } from "./themeProvider";

const base = "https://cal.com";

const columns = [
  [
    {
      title: "Products",
      links: [
        ["Scheduling", "/scheduling", CalendarDays],
        ["Companion app", "/app", MonitorSmartphone],
        ["Events", "/events", Ticket],
        ["Discover", "https://cal.com/discover", Compass],
        ["Cal.ai", "/ai", Sparkles],
        ["Cal Video", "/features/cal-video", Video],
        ["Cal Desktop", "/desktop", Laptop],
        ["Notes", "/notes", NotebookPen],
        ["Dictation", "/dictation", Mic],
        ["Calendar", "/calendar", CalendarRange],
        ["Cal Pay", "https://cal.com/payments", CreditCard],
        ["Enterprise", "/enterprise", Building2],
      ],
    },
    {
      title: "Platform",
      links: [
        ["Pricing", "/pricing"],
        ["Organizations", "/organizations"],
        ["Routing", "/routing"],
        ["Workflows", "/workflows"],
        ["App Store", "/features/app-store"],
        ["iOS & Android app", "/app"],
        ["Desktop app", "https://cal.com/download"],
      ],
    },
  ],
  [
    {
      title: "Features",
      links: [
        ["Round-robin scheduling", "/features/round-robin"],
        ["Collective events", "/features/collective-events"],
        ["Dynamic group links", "/features/dynamic-group-links"],
        ["Smart routing", "/smart-routing"],
        ["Recurring events", "/features/recurring-events"],
        ["Requires confirmation", "/features/requires-confirmation"],
        ["Instant meetings", "/features/instant-meetings"],
        ["Out of office", "/features/ooo"],
        ["Payments", "/features/payments"],
        ["No-show fees", "/features/no-show-fees"],
        ["Embed", "/embed"],
        ["Teams", "/teams"],
        ["Booking questions", "/features/booking-questions"],
        ["Seats", "/features/seats"],
        ["Managed links", "/features/managed-events"],
        ["Multiple durations", "/features/multiple-durations"],
        ["Buffers & limits", "/features/buffers-and-limits"],
        ["Private links", "/features/private-links"],
        ["Restriction schedules", "/features/restriction-schedules"],
        ["Date overrides", "/features/date-overrides"],
        ["Travel schedule", "/features/travel-schedule"],
        ["Insights", "/features/insights"],
        ["Webhooks", "/features/webhooks"],
        ["Audit logs", "/features/audit-logs"],
        ["Delegated credentials", "/features/delegated-credentials"],
        ["SSO & SCIM", "/features/sso-scim"],
      ],
    },
  ],
  [
    {
      title: "Use cases",
      links: [
        ["Sales", "/scheduling/sales-teams"],
        ["Marketing", "/scheduling/marketing"],
        ["Talent acquisition", "/scheduling/talent-acquisition-teams"],
        ["Customer support", "/scheduling/customer-support"],
        ["Higher education", "/scheduling/higher-education"],
        ["Telehealth", "/scheduling/telehealth"],
        ["Professional services", "/scheduling/professional-services"],
        ["Hiring marketplace", "/scheduling/hiring-marketplaces"],
        ["Human resources", "/scheduling/people-operations"],
        ["Tutoring", "/scheduling/higher-education"],
        ["C-suite", "/scheduling/c-suite"],
        ["Law", "/scheduling/law"],
        ["Healthcare", "/scheduling/healthcare"],
        ["Recruiting", "/scheduling/talent-acquisition-teams"],
        ["Fitness", "/scheduling/fitness"],
        ["Beauty & wellness", "/scheduling/beauty"],
      ],
    },
    {
      title: "Tools",
      links: [
        ["All tools", "/calendar-tools"],
        ["World clock", "/world-clock"],
        ["Timezone clock", "/world-clock/timezone-clock"],
        ["Time zone converter", "/world-clock/time-zone-converter"],
        ["Meeting planner", "/world-clock/meeting-planner"],
        ["Time zone abbreviations", "/world-clock/time-zones"],
        ["Daylight saving time", "/world-clock/daylight-saving-time"],
        ["Week numbers", "/world-clock/week-number"],
        ["Date calculator", "/world-clock/date-calculator"],
        ["Weather calendar", "/calendar-tools/weather-calendar"],
      ],
    },
  ],
  [
    {
      title: "Developers",
      links: [
        ["Docs", "https://cal.com/docs"],
        ["API reference", "https://cal.com/docs/api-reference/v2/introduction"],
        ["Cal.com Atoms", "https://cal.com/atoms"],
        ["Integrate with Cal.com", "/integrate"],
        ["Scheduling API (coss.com)", "https://coss.com/products/scheduling"],
        ["For AI agents", "/mcp"],
        ["Scheduling agents", "/ai"],
        ["Enterprise API", "https://cal.com/docs/enterprise-features/api"],
        ["GitHub", "https://github.com/calcom/cal.com"],
        ["llms.txt", "/llms.txt"],
      ],
    },
    {
      title: "Contact",
      links: [
        ["support@cal.com", "mailto:support@cal.com"],
        ["security@cal.com", "mailto:security@cal.com"],
        ["privacy@cal.com", "mailto:privacy@cal.com"],
        ["press@cal.com", "mailto:press@cal.com"],
      ],
    },
  ],
  [
    {
      title: "AI",
      links: [
        ["Cal.ai", "/ai"],
        ["Agent", "/agent"],
        ["Assistant", "/assistant"],
        ["MCP server", "/mcp"],
        ["Grok Bot", "/grok-bot"],
        ["Cal Desktop", "/desktop"],
      ],
    },
    {
      title: "Resources",
      links: [
        ["Help docs", "https://cal.com/help"],
        ["FAQ", "/faq"],
        ["Blog", "/blog"],
        ["Customer stories", "/customers"],
        ["Compare", "https://cal.com/compare"],
        ["Cal.com vs Calendly", "/calcom-vs-calendly"],
        ["Migrate to Cal.com", "/migrate"],
        ["Changelog", "/changelog"],
        ["Status", "https://status.cal.com"],
        ["Cal Sans", "/font"],
        ["Brand assets", "/brand"],
      ],
    },
  ],
  [
    {
      title: "Company",
      links: [
        ["About", "/about"],
        ["Jobs", "/jobs"],
        ["Open startup", "/open"],
        ["Press", "/press-kit"],
        ["Affiliate program", "/affiliate-program"],
        ["Support", "https://app.cal.com/support"],
        ["Contact", "/contact"],
        ["Get a demo", "/talk-to-sales"],
        ["Talk to sales", "/talk-to-sales"],
        ["Security", "/security"],
        ["Compliance", "/compliance"],
        ["Data Privacy Framework", "/dpf-data-privacy-framework"],
        ["Privacy", "/privacy"],
        ["Terms", "/terms"],
      ],
    },
  ],
];

const assistantLinks = [
  {
    name: "ChatGPT",
    icon: "openai",
    href: "https://chatgpt.com/?hints=search&q=",
  },
  {
    name: "Claude",
    icon: "claude",
    href: "https://claude.ai/new?q=",
  },
  {
    name: "Perplexity",
    icon: "perplexity",
    href: "https://www.perplexity.ai/search?q=",
  },
  {
    name: "Grok",
    icon: "grok",
    href: "https://grok.com/?q=",
  },
];

const platforms = [
  [
    "iPhone",
    "ios",
    "/landing/platform-macos.svg",
    "https://go.cal.com/ios",
    true,
  ],
  [
    "Android",
    "android",
    "/landing/platform-google-play.svg",
    "https://go.cal.com/android",
  ],
  [
    "Mac",
    "mac",
    "/landing/platform-macos.svg",
    "https://cal.com/download",
    true,
  ],
  [
    "Windows",
    "windows",
    "/landing/platform-windows.svg",
    "https://cal.com/download",
  ],
  ["Linux", "linux", "/landing/platform-linux.png", "https://cal.com/download"],
];

const browsers = [
  ["Chrome", "/landing/platform-chrome.svg", "https://go.cal.com/chrome"],
  ["Safari", "/landing/platform-safari.svg", "https://go.cal.com/safari"],
  ["Edge", "/landing/platform-edge.svg", "https://go.cal.com/edge"],
  ["Firefox", "/landing/platform-firefox.svg", "https://go.cal.com/firefox"],
];

const compliance = [
  ["ISO 27001 Information Security", "/landing/compliance/iso.svg", 38, 39],
  ["AICPA SOC 2", "/landing/compliance/soc2.svg", 34, 35],
  ["CCPA compliant", "/landing/compliance/ccpa.svg", 27, 39],
  ["GDPR aligned", "/landing/compliance/gdpr.svg", 28, 39],
  ["HIPAA compliant", "/landing/compliance/hipaa.svg", 59, 40],
];

const aiPrompt =
  "Read this page: https://cal.com\n\nIn a few sentences, tell me what Cal.com does, who it is for, and whether it is worth a closer look for my business based on what you know about me.";

function FooterLink({ link }) {
  const [label, href, Icon] = link;

  return (
    <li>
      <a
        href={href.startsWith("/") ? `${base}${href}` : href}
        className="inline-flex items-center gap-2 leading-[1.35] transition-colors duration-150 hover:text-white [&_svg]:size-4 [&_svg]:shrink-0"
      >
        {Icon && <Icon size={16} strokeWidth={1.75} />}
        {label}
      </a>
    </li>
  );
}

function FooterNav({ section }) {
  return (
    <nav aria-label={section.title}>
      <p className="mb-4 mt-0 font-medium text-white">{section.title}</p>
      <ul className="m-0 grid list-none gap-2.5 p-0">
        {section.links.map((link) => (
          <FooterLink key={link[0]} link={link} />
        ))}
      </ul>
    </nav>
  );
}

function IconButton({ href, label, children }) {
  return (
    <a
      aria-label={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="grid size-8 place-items-center rounded-[9px] bg-white/[0.06] text-white/55 transition-colors duration-100 hover:bg-white/[0.12] hover:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("en");

  return (
    <footer
      data-page-footer="true"
      className="relative mt-12 overflow-hidden bg-[#101010] text-sm font-normal leading-normal text-white/60 [&_a]:text-inherit [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-150 [&_a:hover]:text-white [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0"
    >
      <div
        className="relative z-10 h-12 w-full rounded-b-[32px] bg-background"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-[1440px] px-8 pt-24 max-tablet:px-6 max-tablet:pt-14">
        <div className="grid grid-cols-[1.3fr_repeat(6,1fr)] gap-x-8 gap-y-12 max-desktop:grid-cols-3 max-tablet:grid-cols-2 max-tablet:gap-y-10">
          <div className="grid content-start justify-items-start gap-5 max-desktop:col-span-full [&_img]:block">
            <a href="https://cal.com" aria-label="Cal.com home">
              <img
                alt="Cal.com"
                loading="lazy"
                width="101"
                height="22"
                src={`${base}/landing/logo-white.svg`}
                className="h-[22px] w-[101px]"
              />
            </a>

            <p className="m-0 max-w-[300px] text-pretty leading-[1.5]">
              Our mission is to connect a billion people by 2031 through
              calendar scheduling.
            </p>

            <div className="grid gap-2">
              <p className="m-0 font-medium text-white">Ask AI about Cal.com</p>
              <ul aria-label="Ask AI about Cal.com" className="grid gap-2.5">
                {assistantLinks.map((assistant) => (
                  <li key={assistant.name}>
                    <a
                      data-assistant={assistant.icon}
                      href={`${assistant.href}${encodeURIComponent(aiPrompt)}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="inline-flex items-center gap-2 leading-[1.35]"
                    >
                      <span
                        aria-hidden="true"
                        className="size-4 shrink-0 bg-current [mask:var(--mark)_center/var(--mark-size)_no-repeat]"
                        style={{
                          "--mark": `url(${base}/landing/agents/${assistant.icon}.svg)`,
                          "--mark-size":
                            assistant.icon === "claude"
                              ? "90%"
                              : assistant.icon === "perplexity"
                                ? "110%"
                                : assistant.icon === "grok"
                                  ? "125%"
                                  : "140%",
                        }}
                      />
                      Open in {assistant.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-1.5 leading-[1.5]">
              <p className="m-0 font-medium text-white">Need help?</p>
              <p className="m-0">
                <a className="text-white/85" href="mailto:support@cal.com">
                  support@cal.com
                </a>{" "}
                or visit{" "}
                <a className="text-white/85" href="https://cal.com/help">
                  cal.com/help
                </a>
              </p>
            </div>

            <a
              href="https://status.cal.com"
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex h-9 w-fit items-center gap-2 whitespace-nowrap rounded-lg bg-white/5 px-3 text-sm text-white/85 transition-colors duration-100 ease-out hover:bg-white/10"
            >
              <span className="size-2 rounded-full bg-amber-400 transition-colors duration-300" />
              Some systems are degraded
            </a>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <label htmlFor="footer-language" className="sr-only">
                  Language
                </label>
                <div className="flex h-9 items-center gap-2 rounded-lg bg-white/5 px-3 text-sm text-white/85 transition-colors hover:bg-white/10">
                  <Globe size={16} className="opacity-60" />
                  <select
                    id="footer-language"
                    aria-label="Language"
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className="max-w-[100px] cursor-pointer appearance-none border-0 bg-transparent pr-1 text-sm text-white/85 outline-none"
                  >
                    <option className="bg-[#161616]" value="en">
                      English
                    </option>
                    <option className="bg-[#161616]" value="de">
                      Deutsch
                    </option>
                    <option className="bg-[#161616]" value="es">
                      Español
                    </option>
                    <option className="bg-[#161616]" value="fr">
                      Français
                    </option>
                    <option className="bg-[#161616]" value="pt">
                      Português
                    </option>
                  </select>
                  <ChevronDown size={14} className="opacity-70" />
                </div>
              </div>

              <fieldset
                aria-label="Theme"
                className="m-0 flex w-fit min-w-0 gap-1 rounded-[11px] border-0 bg-white/[0.06] p-1"
              >
                {[
                  ["system", "System", Monitor],
                  ["light", "Light", Sun],
                  ["dark", "Dark", Moon],
                ].map(([value, label, Icon]) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={label}
                    aria-pressed={(theme ?? "system") === value}
                    title={label}
                    onClick={() => setTheme(value)}
                    className={`grid size-7 place-items-center rounded-[8px] transition-colors duration-100 ease-out hover:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-1 ${
                      (theme ?? "system") === value
                        ? "bg-white/[0.14] text-white"
                        : "text-white/55"
                    }`}
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </fieldset>
            </div>

            <ul aria-label="Social" className="flex flex-wrap gap-1">
              <li>
                <IconButton href="https://x.com/calcom" label="X">
                  <svg
                    aria-hidden="true"
                    className="size-[15px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m21.742 21.75-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714h-6.189l7.29 10.776-7.399 8.724h2.456l6.035-7.118 4.818 7.118h6.191zm-14.003-17.932 11.071 16.364h-2.447l-11.073-16.364h2.447z" />
                  </svg>
                </IconButton>
              </li>
              <li>
                <IconButton
                  href="https://www.linkedin.com/company/cal-com"
                  label="LinkedIn"
                >
                  <svg
                    aria-hidden="true"
                    className="size-[15px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </IconButton>
              </li>
              <li>
                <IconButton
                  href="https://www.youtube.com/@calcominc"
                  label="YouTube"
                >
                  <svg
                    aria-hidden="true"
                    className="size-[15px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </IconButton>
              </li>
            </ul>

            <div className="mt-3 grid gap-4">
              <div className="grid gap-2">
                <p className="m-0 text-[13px] text-white/50">Get the app</p>
                <ul aria-label="Get the app" className="flex flex-wrap gap-1">
                  {platforms.map(([label, key, image, href, invert]) => (
                    <li key={key}>
                      <a
                        aria-label={label}
                        href={href}
                        className="group grid size-8 place-items-center rounded-[9px] bg-white/[0.06] transition-colors duration-100 hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                      >
                        <img
                          alt=""
                          loading="lazy"
                          width="18"
                          height="18"
                          src={`${base}${image}`}
                          className={`size-4 object-contain opacity-70 grayscale transition-[filter,opacity] duration-100 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0 ${
                            invert ? "invert" : ""
                          }`}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-2">
                <p className="m-0 text-[13px] text-white/50">
                  Browser extensions
                </p>
                <ul
                  aria-label="Browser extensions"
                  className="flex flex-wrap gap-1"
                >
                  {browsers.map(([label, image, href]) => (
                    <li key={label}>
                      <a
                        aria-label={label}
                        href={href}
                        className="group grid size-8 place-items-center rounded-[9px] bg-white/[0.06] transition-colors duration-100 hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                      >
                        <img
                          alt=""
                          loading="lazy"
                          width="18"
                          height="18"
                          src={`${base}${image}`}
                          className="size-4 object-contain opacity-70 grayscale transition-[filter,opacity] duration-100 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {columns.map((column, index) => (
            <div key={index} className="grid content-start gap-10">
              {column.map((section) => (
                <FooterNav key={section.title} section={section} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-24 flex items-center justify-between gap-8 border-t border-white/10 pt-8 max-tablet:mt-14 max-tablet:flex-col-reverse max-tablet:items-start">
          <ul
            aria-label="Compliance"
            className="flex shrink-0 items-center gap-5 max-tablet:flex-wrap max-tablet:gap-4 [&_img]:block [&_img]:h-10 [&_img]:w-auto [&_img]:opacity-90"
          >
            {compliance.map(([label, image, width, height]) => (
              <li key={label}>
                <button
                  className="block cursor-default rounded-sm focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
                  type="button"
                  aria-label={label}
                >
                  <img
                    alt={label}
                    loading="lazy"
                    width={width}
                    height={height}
                    src={`${base}${image}`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <p className="m-0 max-w-[520px] text-right text-[13px] text-balance text-white/55 max-tablet:text-left [&>span]:block">
            <span>© 2026 Cal.com, Inc. All rights reserved.</span>
            <span>
              Cal.com® and Cal® are registered trademarks of Cal.com, Inc.
            </span>
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mx-auto mt-[72px] w-full max-w-[1440px] overflow-hidden px-8 max-tablet:mt-10 max-tablet:px-6"
      >
        <div className="relative h-[260px] w-full overflow-hidden bg-[#101010]">
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: "url('https://cal.com/landing/logo.svg')",
              maskImage: "url('https://cal.com/landing/logo.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center 58px",
              maskPosition: "center 58px",
              WebkitMaskSize: "92% auto",
              maskSize: "92% auto",
            }}
          >
            <PixelPhoto
              src="/office.jpg"
              label=""
              className="!absolute !inset-0"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
