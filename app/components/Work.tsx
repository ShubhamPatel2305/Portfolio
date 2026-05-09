"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChevronDown } from "lucide-react";
import SectionHeader from "./SectionHeader";

type Role = {
  company: string;
  title: string;
  period: string;
  context: string;
  bullets: {
    lead: string;
    body: string;
    detail: string;
    metric?: string;
    tags: string[];
  }[];
};

const roles: Role[] = [
  {
    company: "Iolite Softwares",
    title: "Software Developer",
    period: "Jan 2025 — Present",
    context:
      "Backend, AI infra, and platform work on a multi-tenant SaaS — primarily a LangGraph-based chatbot, the C#/ASP.NET API behind it, and the trademark-automation product line.",
    bullets: [
      {
        lead: "Agentic NL→SQL chatbot",
        body: "Architected a multi-tenant agentic NL→SQL chatbot on LangGraph with locally-served Gemma. Built a 3-tier follow-up engine, a destructive-SQL gate, and a binary-encoded RBAC whitelist across 50+ modules.",
        detail:
          "Picked LangGraph over plain LangChain so state, retries, and conditional routing live inside one explicit state graph rather than chained prompts — easier to reason about, easier to debug. Gemma runs on-prem because tenant schemas travel through the agent and we couldn't ship that metadata to a public API. The 3-tier follow-up engine resolves the easy half of repeat questions from a hashed-prompt + last-execution cache (L1), kicks the next slice to a tiny rewrite agent that prompts only with the diff against the previous turn (L2), and only falls through to a full re-plan (L3) when the question genuinely shifts intent. Authorization sits in front of generation, not behind it: the RBAC whitelist is encoded as packed bitmasks per (role × table × column), so checking access on a generated query is one AND, not a join.",
        metric: "~60% drop in follow-up LLM calls",
        tags: ["LangGraph", "Gemma", "Python", "RBAC", "Postgres"],
      },
      {
        lead: "FastSQLDatabase + RAG retrieval",
        body: "Built a custom FastSQLDatabase wrapper with cached INFORMATION_SCHEMA snapshots and multi-tier TTL+LRU caches. Added RAG few-shot retrieval with hybrid embedding + lexical fallback for tenant priming.",
        detail:
          "Each new tenant was paying a multi-second schema-introspection penalty on cold queries; pre-computing a versioned schema snapshot per tenant and layering an in-process LRU on top of a cross-process TTL store collapsed that to roughly a quarter of the original. Retrieval is hybrid on purpose: dense embeddings catch paraphrase and intent, BM25 catches the exact column names and identifiers that embeddings smooth over. Few-shot beat fine-tuning here because tenant schemas evolve weekly and re-tuning is operationally wrong for that rate of change.",
        metric: "~70% faster tenant cold-start",
        tags: ["FastAPI", "Vector DB", "Hybrid retrieval", "TTL/LRU"],
      },
      {
        lead: "Hybrid distributed caching",
        body: "Built ETag-based hybrid HTTP caching layered with IMemoryCache and Microsoft Garnet on the ASP.NET / C# / Angular 17 stack.",
        detail:
          "Three layers, each doing one job. Weak ETags at the edge let Angular skip large list payloads on revalidation — the cheapest cache hit is the one that never crosses the network. IMemoryCache short-circuits hot reads inside each app instance for sub-millisecond wins on N+1-style hotspots. Garnet (Microsoft's Redis-protocol drop-in, lower latency than Redis on our access pattern) is the shared L2 across the cluster so a cold instance still gets warm data. Invalidation is event-driven over a thin pub/sub bus rather than TTL-only, which keeps stale reads bounded after writes.",
        metric: "~70% DB-load reduction · ~60% faster responses",
        tags: ["ASP.NET", "C#", "Garnet", "ETag", "Angular"],
      },
      {
        lead: "Trademark automation at scale",
        body: "Shipped scrapers for 200+ trademark offices with custom CAPTCHA-solving models and PDF/image+text similarity pipelines (ResNet, CLIP, RapidFuzz) running across 250+ regional journals.",
        detail:
          "Every jurisdiction is its own scraping problem — sessions, JS-rendered pages, IP rate limits, and a different CAPTCHA per office. Commercial CAPTCHA APIs were uneconomic at this volume so we trained per-style solvers offline. Conflict ranking blends three signals rather than picking one: RapidFuzz on normalised marks for textual proximity, ResNet feature distance on logo crops for visual similarity, and CLIP for the cross-modal cases (text mark vs logo, or vice versa). Scoring is calibrated per jurisdiction because filing standards and similarity tolerances genuinely differ.",
        metric: "200+ jurisdictions · 250+ journals",
        tags: ["Scrapers", "CV", "CLIP", "ResNet", "RapidFuzz"],
      },
    ],
  },
  {
    company: "TTFA Academy",
    title: "Software Developer (part-time, during B.Tech)",
    period: "Jan 2023 — Dec 2024",
    context:
      "Owned the platform end-to-end: DR architecture across two clouds, the video-streaming pipeline serving live classes, and the lead-attribution + EMI CRM.",
    bullets: [
      {
        lead: "Multi-cloud active-passive DR",
        body: "Designed a DR topology with Cloudflare routing primary traffic to AWS Mumbai, hot-standby on AWS Singapore, and Azure failover on MongoDB Atlas. Built canary failback (5%→100% stepped ramp) gated on multi-tier health checks. Terraform + Jenkins drill pipeline.",
        detail:
          "Active-passive (not active-active) was a deliberate choice: the data tier — Atlas with cross-region replication and Azure as cold failover — couldn't tolerate concurrent writes safely on a small team's complexity budget, and the read-heavy traffic profile didn't really need it either. Cloudflare's load-balancer does the cutover; the health-check chain runs edge → app health → DB write probe so a single failing layer can't drag the others. The 5%→25%→50%→100% canary ramp on failback is gated on rolling error rate and p99 latency — fail any gate and traffic snaps back automatically. Drills run weekly via Jenkins so the failback path never bit-rots; the first time you find out a runbook is broken should not be the day production is on fire.",
        metric: "automated cutover · multi-tier health gates",
        tags: ["AWS", "Azure", "Cloudflare", "Terraform", "Jenkins"],
      },
      {
        lead: "Adaptive HLS streaming pipeline",
        body: "Built end-to-end HLS — SQS-dispatched ephemeral EC2 workers running Dockerized FFmpeg transcoders, multi-bitrate (1080p/720p/360p) chunks served via CDN with a custom HTML5 ABR player.",
        detail:
          "Class-recording uploads are bursty and unpredictable, so a fixed transcoder fleet was the wrong shape. Workers spin up per job from an SQS queue, transcode a single asset, push HLS chunks to S3, and self-terminate — cost scales with usage, not with peak. The custom ABR player picks bitrate rungs based on a moving average of segment-download time relative to segment duration, which holds up better on Indian 4G (where bandwidth is jagged, not just low) than the default browser heuristics that aggressively bias high. The 1080p/720p/360p ladder is intentionally sparse rather than a six-rung ladder — three rungs cover the actual distribution, more rungs just inflate storage and CDN cost.",
        metric: "1080p/720p/360p · 1000+ students served",
        tags: ["FFmpeg", "EC2", "SQS", "Docker", "HLS"],
      },
      {
        lead: "CRM with lead attribution & EMI",
        body: "Built a CRM with Meta Leads + LinkedIn Graph webhook ingestion, server-side Meta Conversions API (recovering iOS 14+ ATT attribution), and an in-house EMI engine.",
        detail:
          "iOS 14+ ATT had broken client-side pixel attribution for the iOS slice of leads — the data was just gone. The Conversions API path sends events server-side with a hashed customer email/phone payload, which restores a meaningful chunk of the lost attribution depending on cohort. The EMI engine is in-house because off-the-shelf payment tools didn't cleanly model education-fee EMIs — partial payments mid-cycle, late-fee accrual rules, and refund splits across already-paid instalments were all edge cases that needed first-class support, not workarounds.",
        metric: "~80% cut in lead-response time",
        tags: ["Node.js", "Webhooks", "Meta CAPI", "MongoDB"],
      },
    ],
  },
];

export default function Work() {
  const [open, setOpen] = useState<number[]>([0]);
  const [openDetails, setOpenDetails] = useState<Set<string>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  const toggleDetail = (key: string) =>
    setOpenDetails((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <section className="mx-auto max-w-column px-5 sm:px-6 py-16 sm:py-20">
      <SectionHeader index="03" label="work" id="work" caption="2 roles · 3.5 yrs" />

      <ul className="divide-y hairline border-y hairline">
        {roles.map((role, i) => {
          const isOpen = open.includes(i);
          return (
            <li key={role.company}>
              <button
                onClick={() => toggle(i)}
                className="w-full text-left py-5 sm:py-6 flex items-start gap-4 group"
                aria-expanded={isOpen}
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-ink-dim mt-1.5 w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-serif text-[24px] sm:text-[28px] leading-tight text-ink tracking-tightest">
                      {role.company}
                    </span>
                    <span className="font-mono text-[12px] text-ink-muted">
                      {role.title}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[11.5px] text-ink-dim">
                    {role.period}
                  </div>
                </div>

                <span className="mt-2 inline-flex items-center justify-center w-7 h-7 rounded-full border hairline text-ink-muted group-hover:bg-ink group-hover:text-paper transition-colors shrink-0">
                  {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.21, 0.62, 0.34, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-6 sm:pl-10 pr-2 pb-7 sm:pb-8">
                      <p className="text-[14.5px] leading-[1.65] text-ink-muted max-w-prose">
                        {role.context}
                      </p>

                      <ul className="mt-7 space-y-8">
                        {role.bullets.map((b, j) => {
                          const detailKey = `${i}-${j}`;
                          const isDetailOpen = openDetails.has(detailKey);
                          return (
                            <li key={j} className="relative">
                              <div className="flex items-baseline gap-3">
                                <span className="font-mono text-[10.5px] text-ink-dim shrink-0">
                                  {String(j + 1).padStart(2, "0")}
                                </span>
                                <h4 className="font-serif text-[19px] leading-tight text-ink tracking-tightest">
                                  {b.lead}
                                </h4>
                              </div>
                              <p className="mt-2 ml-7 text-[14.5px] leading-[1.65] text-ink-soft max-w-prose">
                                {b.body}
                              </p>
                              {b.metric && (
                                <div className="mt-2.5 ml-7 inline-flex items-center gap-2 font-mono text-[11px] text-accent">
                                  <span className="inline-block w-3 h-px bg-accent" />
                                  {b.metric}
                                </div>
                              )}

                              {/* Collapsible why / how */}
                              <div className="mt-3 ml-7 border-l-2 border-rule pl-3">
                                <button
                                  onClick={() => toggleDetail(detailKey)}
                                  aria-expanded={isDetailOpen}
                                  className="flex items-center gap-2 group/detail cursor-pointer"
                                >
                                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim group-hover/detail:text-ink-muted transition-colors">
                                    why / how
                                  </span>
                                  <motion.span
                                    animate={{ rotate: isDetailOpen ? 180 : 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="inline-flex text-ink-dim group-hover/detail:text-ink-muted transition-colors"
                                  >
                                    <ChevronDown size={11} />
                                  </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                  {isDetailOpen && (
                                    <motion.div
                                      key="detail"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: [0.21, 0.62, 0.34, 1] }}
                                      className="overflow-hidden"
                                    >
                                      <p className="mt-1.5 text-[13.5px] leading-[1.7] text-ink-muted max-w-prose">
                                        {b.detail}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              <div className="mt-3 ml-7 flex flex-wrap gap-1.5">
                                {b.tags.map((t) => (
                                  <span
                                    key={t}
                                    className="font-mono text-[10.5px] text-ink-muted border hairline rounded-full px-2 py-0.5"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}