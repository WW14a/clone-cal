"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUp,
  Check,
  ChevronRight,
  Copy,
  PhoneOutgoing,
} from "lucide-react";
import {
  SiClaude,
  SiCursor,
  SiGooglegemini,
  SiPerplexity,
} from "react-icons/si";
import { RiGrokAiLine } from "react-icons/ri";
import { PiOpenAiLogoLight } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CalMark = ({ size }) => (
  <svg
    aria-label="Cal"
    fill="none"
    role="presentation"
    viewBox="0 0 400 400"
    aria-hidden="true"
    height={size}
    width={size}
  >
    <rect fill="currentColor" height="400" rx="31.3628" width="400" />
    <path
      d="M129.554 265.729C92.588 265.729 64.6855 236.938 64.6855 201.393C64.6855 165.671 91.1662 136.702 129.554 136.702C149.815 136.702 163.855 142.922 175.051 156.251L157.457 171.536C149.992 163.716 140.751 159.806 129.554 159.806C105.562 159.806 90.4553 178.644 90.4553 201.393C90.4553 224.142 105.562 242.625 130.087 242.625C142.173 242.625 151.237 238.537 158.523 230.54L176.651 246.001C167.232 257.376 151.236 265.729 129.554 265.729Z"
      fill="var(--color-hp-plate)"
    />
    <path
      d="M221.937 265.729C196.522 265.729 176.262 244.224 176.262 217.566C176.262 190.907 196.522 169.047 221.937 169.047C237.932 169.047 246.285 175.623 251.261 185.576V171.002H275.076V263.418H251.794V248.312C246.818 258.797 238.465 265.729 221.937 265.729ZM200.255 217.388C200.255 231.428 210.563 244.046 225.847 244.046C241.664 244.046 251.794 231.961 251.794 217.566C251.794 203.17 241.664 190.73 225.847 190.73C210.563 190.73 200.255 202.993 200.255 217.388Z"
      fill="var(--color-hp-plate)"
    />
    <path
      d="M289.331 263.418V133.681H313.324V263.418H289.331Z"
      fill="var(--color-hp-plate)"
    />
  </svg>
);

const CalBadge = ({ size }) => (
  <span
    aria-label="Cal.com"
    role="img"
    style={{ "--size": `${size}px` }}
    className="relative inline-grid size-(--size) flex-none place-items-center rounded-[calc(var(--size)*12/56)] bg-transparent text-hp-ink shadow-hp-raised transition-[box-shadow,background-color] duration-150 ease-out [&>svg]:block"
  >
    <CalMark size={size} />
  </span>
);

const AGENTS = [
  { id: "chatgpt", name: "ChatGPT", Icon: PiOpenAiLogoLight, scale: 0.74 },
  { id: "claude", name: "Claude", Icon: SiClaude, scale: 0.52 },
  { id: "grok", name: "Grok", Icon: RiGrokAiLine, scale: 0.5 },
  { id: "cursor", name: "Cursor", Icon: SiCursor, scale: 0.48 },
  { id: "gemini", name: "Gemini", Icon: SiGooglegemini, scale: 0.52 },
  { id: "perplexity", name: "Perplexity", Icon: SiPerplexity, scale: 0.56 },
];

const THEMES = {
  chatgpt: {
    label: "ChatGPT",
    version: "5",
    placeholder: "Ask anything",
    root: "bg-[#212121] text-[#ececec]",
    line: "border-[#2f2f2f]",
    bubble: "bg-[#303030]",
    input: "border-transparent bg-[#303030]",
    send: "bg-white text-black",
    accent: "#ececec",
    status: "text-[#ececec]",
    serif: false,
  },
  claude: {
    label: "Claude",
    version: "",
    placeholder: "Reply to Claude...",
    root: "bg-[#faf9f5] text-[#141413] dark:bg-[#262624] dark:text-[#faf9f5]",
    line: "border-[#e8e6dc] dark:border-[#3a3935]",
    bubble: "bg-[#f0eee6] dark:bg-[#141413]",
    input:
      "border-[#e8e6dc] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.035)] dark:border-[#3a3935] dark:bg-[#30302e]",
    send: "bg-[#c6613f] text-white",
    accent: "#d97757",
    status: "text-[#3d3d3a] dark:text-[#c2c0b6]",
    serif: true,
  },
  grok: {
    label: "Grok",
    version: "",
    placeholder: "Ask Grok anything",
    root: "bg-[#0a0a0a] text-[#f5f5f5]",
    line: "border-[#1f1f1f]",
    bubble: "bg-[#1c1c1c]",
    input: "border-[#262626] bg-[#141414]",
    send: "bg-white text-black",
    accent: "#f5f5f5",
    status: "text-[#d4d4d4]",
    serif: false,
  },
  cursor: {
    label: "Cursor",
    version: "",
    placeholder: "Plan, search, build anything",
    root: "bg-[#14120b] text-[#edecec]",
    line: "border-[#2a2820]",
    bubble: "bg-[#26251e]",
    input: "border-[#2a2820] bg-[#1b1913]",
    send: "bg-[#f54e00] text-white",
    accent: "#edecec",
    status: "text-[#d6d4cc]",
    serif: false,
  },
  gemini: {
    label: "Gemini",
    version: "",
    placeholder: "Ask Gemini",
    root: "bg-[#1e1f20] text-[#e3e3e3]",
    line: "border-[#2f3032]",
    bubble: "bg-[#282a2c]",
    input: "border-[#3c4043] bg-[#1e1f20]",
    send: "bg-[#a8c7fa] text-[#062e6f]",
    accent: "#8ab4f8",
    status: "text-[#c4c7c5]",
    serif: false,
  },
  perplexity: {
    label: "Perplexity",
    version: "",
    placeholder: "Ask a follow-up",
    root: "bg-[#191a1a] text-[#e7e7e2]",
    line: "border-[#2a2c2c]",
    bubble: "bg-[#202222]",
    input: "border-[#2a2c2c] bg-[#202222]",
    send: "bg-[#20b8cd] text-[#0b1f22]",
    accent: "#20b8cd",
    status: "text-[#c9c9c4]",
    serif: false,
  },
};

const SCENARIOS = {
  priya: {
    prompt: "Find 45 minutes with Priya for a design review this week.",
    checking: "Checking Priya's availability",
    found: "Found 3 times this week",
    booked: "Booked. Priya has the invite.",
    times: ["Wed 21, 11:00", "Thu 22, 15:30", "Fri 23, 10:00"],
    picked: 1,
    title: "Design review with Priya",
    detail: "Thu, 22 Oct, 15:30 - 16:15",
    date: "Thu, 22 Oct",
    range: "15:30 - 16:15",
    who: "You and Priya",
    phone: "Priya said yes",
  },
  maria: {
    prompt: "Book Maria for a 30 minute intro next week. She's in Lisbon.",
    checking: "Checking Maria's availability",
    found: "Found 3 times next week in Lisbon",
    booked: "Booked. Maria has the invite.",
    times: ["Tue 20, 14:00", "Wed 21, 10:30", "Thu 22, 16:00"],
    picked: 0,
    title: "Intro with Maria",
    detail: "Tue, 20 Oct, 14:00 - 14:30 in Lisbon, 15:00 for you",
    date: "Tue, 20 Oct",
    range: "14:00 - 14:30",
    who: "You and Maria",
    phone: "Maria said yes",
  },
  theo: {
    prompt: "Set up 20 minutes with Theo to go over the roadmap.",
    checking: "Checking Theo's availability",
    found: "Found 3 times this week",
    booked: "Booked. Theo has the invite.",
    times: ["Tue 20, 09:30", "Wed 21, 13:00", "Fri 23, 11:30"],
    picked: 1,
    title: "Roadmap with Theo",
    detail: "Wed, 21 Oct, 13:00 - 13:20",
    date: "Wed, 21 Oct",
    range: "13:00 - 13:20",
    who: "You and Theo",
    phone: "Theo said yes",
  },
};

const SCENARIO_FOR = {
  chatgpt: "priya",
  claude: "maria",
  grok: "theo",
  cursor: "priya",
  gemini: "maria",
  perplexity: "theo",
};

const STEP_MS = [500, 700, 1100, 1500, 1100, 500, 500, 3000];

const TABS = [
  {
    id: "prompt",
    label: "Prompt",
    code: "Connect to the Cal.com MCP server at https://mcp.cal.com/mcp, sign in with OAuth, then book 15 minutes with Rick Astley on Thursday morning.",
  },
  {
    id: "mcp",
    label: "MCP",
    code: '{\n  "mcpServers": {\n    "cal": {\n      "url": "https://mcp.cal.com/mcp"\n    }\n  }\n}',
  },
  {
    id: "grok",
    label: "Grok Bot",
    code: "@grok connect to https://mcp.cal.com/mcp and book 15 minutes with Rick Astley on Thursday morning.",
  },
];

const REVEAL =
  "translate-y-6 opacity-0 transition-[opacity,transform] duration-600 ease-hp [transition-delay:calc(var(--i,0)*60ms)] group-data-in/section:translate-y-0 group-data-in/section:opacity-100 data-in:translate-y-0 data-in:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

const show = (on) =>
  cn(
    "transition-[opacity,transform] ease-in motion-reduce:transition-none",
    on
      ? "translate-y-0 opacity-100 duration-300 ease-hp-quad"
      : "translate-y-1 opacity-0 duration-150",
  );

function ConnectBox() {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(TABS[tab].code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    setTab(
      (t) => (t + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length,
    );
  };

  return (
    <div
      style={{ "--i": 2 }}
      data-mcp-connect="true"
      className={cn("max-w-[480px]", REVEAL)}
    >
      <p className="m-0 mb-3 flex flex-wrap items-baseline gap-x-2 text-sm leading-[1.4]">
        <span className="font-medium text-hp-ink">Connect Cal.com</span>
        <span className="text-hp-muted">
          Free. Your agent uses your own tokens.
        </span>
      </p>
      <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-hp-line-2 bg-hp-surface text-left">
        <div className="flex items-center gap-3 border-b border-hp-line-2 px-3 py-2.5">
          <div
            role="tablist"
            aria-label="Connect Cal.com"
            onKeyDown={onKeyDown}
            className="relative isolate -my-1 flex min-w-0 flex-1 gap-1 overflow-x-auto py-1"
          >
            {TABS.map((t, i) => (
              <button
                key={t.id}
                id={`mcp-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={tab === i}
                aria-controls="mcp-panel"
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                className={cn(
                  "relative h-8 shrink-0 rounded-lg px-3 text-[13px] leading-none font-medium whitespace-nowrap transition-colors duration-100 ease-out",
                  tab === i ? "text-hp-ink" : "text-hp-muted hover:text-hp-ink",
                )}
              >
                {tab === i && (
                  <motion.span
                    layoutId="mcp-pill"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                    className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-hp-tint/[0.07]"
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>
          <div className="-my-1 -me-1.5">
            <button
              type="button"
              aria-label="Copy code"
              onClick={copy}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-hp-muted transition-colors duration-100 ease-out hover:bg-hp-tint/[0.06] hover:text-hp-ink"
            >
              {copied ? (
                <Check className="size-4 text-hp-ink" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
              <span aria-live="polite" className="sr-only">
                {copied ? "Copied" : ""}
              </span>
            </button>
          </div>
        </div>
        <div
          id="mcp-panel"
          role="tabpanel"
          aria-labelledby={`mcp-tab-${tab}`}
          className="relative grid min-h-0"
        >
          <div className="flex min-w-0 flex-col">
            <pre
              key={TABS[tab].id}
              tabIndex={0}
              data-language={TABS[tab].id}
              className={cn(
                "hp-swap m-0 h-[136px] overflow-auto px-5 pt-4 pb-5 text-sm leading-[1.5] text-hp-ink max-sm:h-[156px] max-sm:px-4",
                tab === 1
                  ? "font-mono text-[13px] whitespace-pre"
                  : "font-sans whitespace-pre-wrap",
              )}
            >
              {TABS[tab].code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentButton({ agent, active, onSelect, size }) {
  const { Icon } = agent;
  const dim = `calc(var(--size) * ${agent.scale})`;
  return (
    <button
      type="button"
      aria-label={`Book with ${agent.name}`}
      aria-pressed={active}
      onClick={() => onSelect(agent.id)}
      className="inline-flex cursor-pointer rounded-[calc(var(--size)*12/56)] border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-hp-ink focus-visible:outline-offset-2 hover:not-aria-pressed:[&>span]:bg-[color-mix(in_srgb,var(--color-hp-ink)_4%,var(--color-hp-raised))]"
    >
      <span
        role="img"
        aria-label={agent.name}
        data-name={agent.name}
        style={{ "--size": `${size}px` }}
        className={cn(
          "relative inline-grid size-(--size) flex-none place-items-center rounded-[calc(var(--size)*12/56)] text-hp-ink transition-[box-shadow,background-color] duration-150 ease-out",
          "after:pointer-events-none after:absolute after:top-[calc(100%+8px)] after:left-1/2 after:z-2 after:-translate-x-1/2 after:-translate-y-1 after:rounded-md after:bg-hp-ink after:px-[7px] after:py-1 after:text-[11px] after:leading-none after:font-medium after:whitespace-nowrap after:text-hp-plate after:opacity-0 after:transition-[opacity,transform] after:duration-100 after:ease-in after:content-[attr(data-name)]",
          "hover:after:translate-y-0 hover:after:opacity-100 hover:after:duration-[160ms] hover:after:ease-out",
          active
            ? "bg-hp-well shadow-hp-well"
            : "bg-hp-raised shadow-hp-raised",
        )}
      >
        <Icon aria-hidden="true" style={{ width: dim, height: dim }} />
      </span>
    </button>
  );
}

function Chat({ agentId, step }) {
  const agent = AGENTS.find((a) => a.id === agentId);
  const theme = THEMES[agentId];
  const s = SCENARIOS[SCENARIO_FOR[agentId]];
  const { Icon } = agent;
  const status = step >= 4 ? s.booked : step === 3 ? s.found : s.checking;

  return (
    <div
      data-agent-chat={agentId}
      className={cn(
        "grid min-h-[320px] grid-rows-[auto_auto_auto_1fr_auto] gap-3.5 rounded-[18px] px-4 pt-3.5 pb-4 shadow-hp-raised max-tablet:min-h-[376px] max-tablet:px-3 max-tablet:pt-3 max-tablet:pb-3",
        theme.root,
      )}
    >
      <div
        className={cn(
          "flex h-9 items-center gap-2 border-b pb-3 text-[13px] leading-none font-semibold",
          theme.line,
        )}
      >
        <Icon
          aria-hidden="true"
          className="size-4 flex-none"
          style={{ color: theme.accent }}
        />
        <b className="flex items-center gap-1.5 font-semibold">
          <span
            className={cn(theme.serif && "font-serif text-[15px] font-normal")}
          >
            {theme.label}
          </span>
          {theme.version && (
            <span className="font-medium opacity-60">{theme.version}</span>
          )}
        </b>
        <span className="ml-auto font-medium opacity-60">
          Cal.com connected
        </span>
      </div>

      <p
        className={cn(
          show(step >= 1),
          "m-0 max-w-[300px] justify-self-end rounded-xl px-3.5 py-2.5 text-sm leading-[1.45] font-medium",
          theme.bubble,
        )}
      >
        {s.prompt}
      </p>

      <div className={cn(show(step >= 2), "flex items-center gap-2.5")}>
        <CalBadge size={22} />
        <span
          className={cn(
            "grid text-[15px] font-medium",
            theme.serif && "font-serif",
            theme.status,
          )}
        >
          <span key={status} className="hp-swap [grid-area:1/1]">
            {status}
          </span>
        </span>
      </div>

      <div className="grid items-start pl-8 max-tablet:pl-0 [&>*]:[grid-area:1/1]">
        <ul
          aria-label="Open times"
          className={cn(
            "m-0 flex list-none flex-wrap gap-2 self-start p-0 transition-[opacity,transform] duration-150 ease-in motion-reduce:transition-none",
            step === 3
              ? "translate-y-0 opacity-100"
              : "-translate-y-1 opacity-0",
          )}
        >
          {s.times.map((t, i) => (
            <li
              key={t}
              style={{ "--i": i }}
              className={cn(
                "rounded-[10px] px-3 py-[9px] text-[13px] leading-none font-medium tabular-nums shadow-[inset_0_0_0_1px_var(--color-hp-line)] transition-[background-color,color] duration-100 ease-out motion-reduce:transition-none",
                i === s.picked
                  ? "bg-hp-slot-selected text-hp-on-ink"
                  : "bg-hp-raised text-hp-ink",
              )}
            >
              {t}
            </li>
          ))}
        </ul>
        <div
          className={cn(
            show(step >= 4),
            "flex items-center gap-3 rounded-xl bg-hp-raised px-3.5 py-3 text-[13px] leading-[1.4] font-normal tabular-nums text-hp-ink shadow-[inset_0_0_0_1px_var(--color-hp-line)]",
          )}
        >
          <span
            aria-hidden="true"
            className="grid size-7 flex-none place-items-center rounded-full bg-hp-field text-hp-ink"
          >
            <Check className="size-3.5" strokeWidth={2.2} />
          </span>
          <span className="grid min-w-0 gap-0.5">
            <b className="text-sm leading-[1.3] font-semibold text-hp-ink">
              {s.title}
            </b>
            <span className="text-pretty text-hp-subtle">{s.detail}</span>
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "flex h-12 items-center gap-2 rounded-[20px] border ps-4 pe-2 text-sm",
          theme.input,
        )}
      >
        <span className="min-w-0 flex-1 truncate opacity-45">
          {theme.placeholder}
        </span>
        <span
          className={cn(
            "grid size-8 flex-none place-items-center rounded-lg",
            theme.send,
            agentId === "chatgpt" && "rounded-full",
          )}
        >
          <ArrowUp className="size-3.5" strokeWidth={2.4} />
        </span>
      </div>
    </div>
  );
}

function InfoCard({ visible, label, children }) {
  return (
    <div
      className={cn(
        show(visible),
        "rounded-[18px] bg-hp-raised px-4 pt-3 pb-3.5 shadow-hp-raised max-tablet:p-3",
      )}
    >
      <p className="mt-0 mb-2.5 text-xs leading-none font-medium text-hp-muted">
        {label}
      </p>
      <div className="flex items-center gap-4 text-[13px] leading-[1.35] font-normal tabular-nums max-tablet:flex-wrap max-tablet:gap-x-2.5 max-tablet:gap-y-2">
        {children}
      </div>
    </div>
  );
}

function AgentPanel({ running }) {
  const [agentId, setAgentId] = useState("chatgpt");
  const [step, setStep] = useState(7);

  useEffect(() => {
    if (!running || step >= STEP_MS.length - 1) return;

    const id = setTimeout(() => setStep(step + 1), STEP_MS[step]);

    return () => clearTimeout(id);
  }, [step, running]);

  const select = (id) => {
    setAgentId(id);
    setStep(0);
  };

  const s = SCENARIOS[SCENARIO_FOR[agentId]];
  const size = 40;
  const left = AGENTS.slice(0, 3);
  const right = AGENTS.slice(3);

  return (
    <div
      style={{ "--i": 2 }}
      data-step={step >= 4 ? "confirmed" : "working"}
      className={cn(
        "grid gap-4 rounded-[28px] bg-hp-plate p-7 shadow-hp-plate max-tablet:rounded-[22px] max-tablet:p-4",
        REVEAL,
      )}
    >
      <div
        style={{ "--size": `${size}px` }}
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-[calc(var(--size)*0.27)] pt-1 pb-3 max-tablet:[zoom:0.8]"
      >
        <span className="flex justify-end gap-[inherit]">
          {left.map((a) => (
            <AgentButton
              key={a.id}
              agent={a}
              active={agentId === a.id}
              onSelect={select}
              size={size}
            />
          ))}
        </span>
        <CalBadge size={51} />
        <span className="flex gap-[inherit]">
          {right.map((a) => (
            <AgentButton
              key={a.id}
              agent={a}
              active={agentId === a.id}
              onSelect={select}
              size={size}
            />
          ))}
        </span>
      </div>

      <Chat agentId={agentId} step={step} />

      <InfoCard visible={step >= 5} label="Upcoming">
        <span className="min-w-[92px] flex-none whitespace-nowrap max-tablet:w-20 [&>b]:block [&>b]:font-semibold [&>b]:text-hp-ink [&>span]:block [&>span]:text-hp-subtle">
          <b>{s.date}</b>
          <span>{s.range}</span>
        </span>
        <span className="min-w-0 flex-1 [&>b]:block [&>b]:truncate [&>b]:font-semibold [&>b]:text-hp-ink [&>span]:block [&>span]:truncate [&>span]:text-hp-subtle">
          <b>{s.title}</b>
          <span>{s.who}</span>
        </span>
        <span
          role="status"
          className="inline-flex h-auto min-w-[84px] flex-none items-center justify-center rounded-md bg-primary px-2 py-1 text-xs leading-none font-medium whitespace-nowrap text-primary-foreground max-tablet:min-w-[78px] max-tablet:px-1.5"
        >
          Confirmed
        </span>
      </InfoCard>

      <InfoCard visible={step >= 6} label="AI Phone templates">
        <span
          aria-hidden="true"
          className="grid size-8 flex-none place-items-center rounded-[9px] bg-hp-raised text-hp-ink shadow-hp-raised"
        >
          <PhoneOutgoing className="size-4" strokeWidth={1.6} />
        </span>
        <span className="min-w-0 flex-1 [&>b]:block [&>b]:truncate [&>b]:font-semibold [&>b]:text-hp-ink [&>span]:block [&>span]:truncate [&>span]:text-hp-subtle">
          <b>Call to confirm booking</b>
          <span>2 hrs before event starts</span>
        </span>
        <span className="flex-none font-medium text-hp-body max-tablet:basis-full max-tablet:pl-11">
          {s.phone}
        </span>
      </InfoCard>
    </div>
  );
}

export default function AgentsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const visible = useInView(ref, { amount: 0.1 });

  return (
    <section
      ref={ref}
      aria-label="Agents"
      data-in={inView ? "true" : undefined}
      className="group/section grid grid-cols-2 items-center gap-16 max-desktop:grid-cols-1 max-desktop:gap-10 mx-auto w-[calc(100%-2*var(--page-margin))] max-w-[1152px] py-28"
    >
      <style>{`
        @keyframes hp-swap { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .hp-swap { animation: hp-swap 320ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) { .hp-swap { animation: none; } }
      `}</style>

      <div className="grid gap-6">
        <h2 className="m-0 font-display text-[56px] leading-[1.05] text-balance text-hp-ink max-desktop:text-[44px] max-tablet:text-[34px] max-tablet:hyphens-auto max-tablet:[overflow-wrap:anywhere]">
          <span className="block">Give your agents</span>{" "}
          <span className="block">a calendar.</span>
        </h2>

        <p
          style={{ "--i": 1 }}
          className={cn(
            "font-hp-display m-0 max-w-[640px] text-2xl leading-[1.35] font-medium text-pretty text-hp-quiet max-tablet:text-[19px] max-tablet:text-hp-muted",
            REVEAL,
          )}
        >
          Voice agents, chat agents, your own copilot. Connect any of them to
          mcp.cal.com and they check real availability and book real hours,
          through the same API your team schedules on.
        </p>

        <ConnectBox />

        <div
          style={{ "--i": 3 }}
          className={cn("flex flex-wrap gap-2", REVEAL)}
        >
          <Button className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm leading-[21px] font-medium">
            Read the API docs
            <ChevronRight
              className="size-2.5"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </Button>
          <Button
            variant="outline"
            className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm leading-[21px] font-medium"
          >
            Book a demo
            <ChevronRight
              className="size-2.5"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>

      <AgentPanel running={visible} />
    </section>
  );
}
