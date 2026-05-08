"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, MapPin } from "lucide-react";

const stats = [
  { value: "~60%", caption: "follow-up LLM calls cut", source: "NL→SQL agent" },
  { value: "~70%", caption: "DB load reduction", source: "hybrid cache layer" },
  { value: "200+", caption: "jurisdictions scraped", source: "trademark pipeline" },
  { value: "1000+", caption: "users on HLS pipeline", source: "TTFA Academy" },
];

const socials = [
  { href: "mailto:shubhamcp23@gmail.com", label: "shubhamcp23@gmail.com", icon: Mail },
  { href: "https://github.com/ShubhamPatel2305", label: "github.com/ShubhamPatel2305", icon: Github, ext: true },
  { href: "https://www.linkedin.com/in/shubham-patel-0422b0247/", label: "linkedin.com/in/shubham-patel", icon: Linkedin, ext: true },
];

const ease = [0.21, 0.62, 0.34, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="absolute inset-0 grid-bg fade-mask-b opacity-70 pointer-events-none" />

      <div className="relative mx-auto max-w-column px-5 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-[11px] tracking-[0.18em] text-ink-muted">
            01
          </span>
          <span className="h-px w-6 bg-rule" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
            engineer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="font-serif text-[44px] sm:text-[58px] leading-[1.02] tracking-tightest text-ink"
        >
          Backend, distributed systems,
          <br />
          and{" "}
          <em className="italic font-serif text-ink">agentic AI</em>{" "}
          <span className="text-ink-muted">in production.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
          className="mt-7 max-w-prose text-[16.5px] leading-[1.6] text-ink-soft"
        >
          I build the parts that don&rsquo;t make the demo &mdash; caching layers,
          multi-cloud failover, evaluation harnesses, the{" "}
          <span className="marker-amber">~60% LLM-call reduction</span>{" "}
          nobody screenshots. Currently shipping production agentic systems at
          Iolite Softwares.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12.5px] text-ink-muted"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>open to roles &middot; sde / ai engineer</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} strokeWidth={1.5} />
            ahmedabad, india &middot; open to remote / relocate
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42, ease }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-rule border hairline rounded-md overflow-hidden"
        >
          {stats.map((s) => (
            <div key={s.value} className="bg-paper-card px-4 py-4">
              <div className="font-serif text-[28px] sm:text-[30px] leading-none text-ink tracking-tightest">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-muted leading-snug">
                {s.caption}
              </div>
              <div className="mt-1 font-mono text-[10px] text-ink-dim">
                {s.source}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          className="mt-10 flex flex-col gap-2.5"
        >
          {socials.map(({ href, label, icon: Icon, ext }) => (
            <li key={href}>
              <a
                href={href}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2.5 font-mono text-[13px] text-ink hover:text-accent transition-colors"
              >
                <Icon size={14} strokeWidth={1.5} />
                <span className="underline-link">{label}</span>
                <ArrowUpRight
                  size={12}
                  strokeWidth={1.5}
                  className="opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
