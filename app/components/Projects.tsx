"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeader from "./SectionHeader";

type Project = {
  num: string;
  domain: string;
  title: string;
  pitch: string;
  metric: string;
  body: string;
  decision: { label: string; text: string };
  tags: string[];
  repo: string;
  live?: string;
};

const projects: Project[] = [
  {
    num: "01",
    domain: "rag · search",
    title: "Express Docs RAG",
    pitch: "Hybrid retrieval + reranking over the official Express.js documentation.",
    metric: "BM25 + dense fusion · Cohere reranking · Ragas CI gate",
    body:
      "A RAG pipeline that combines BM25Okapi (exact-token recall) and dense embeddings (ChromaDB + all-MiniLM-L6-v2, 384-d) fused via min-max-normalized weighted sum behind a single alpha knob. A Cohere cross-encoder reranking stage narrows 20-25 hybrid candidates to the 5 that actually answer the question — the cross-encoder reads query and chunk jointly, catching relevance signals bi-encoders miss. Generation uses Gemini Flash with a grounded system prompt and inline [#N] citations so every claim is traceable back to the source doc.",
    decision: {
      label: "key decision",
      text: "Two-stage retrieval over single-stage — recall and precision pull in opposite directions. The hybrid retriever optimises for recall (cast wide); the cross-encoder reranker optimises for precision (cut noise). Doing both in one pass isn't possible with precomputed vectors alone.",
    },
    tags: ["FastAPI", "ChromaDB", "BM25", "Cohere", "Gemini", "Next.js"],
    repo: "https://github.com/ShubhamPatel2305/Express-Docs-RAG",
    live: "https://express-docs.rag.shubhampatel.uk/",
  },
  {
    num: "02",
    domain: "agentic-ai · production",
    title: "Agentic NL→SQL Chatbot",
    pitch: "Multi-tenant LangGraph chatbot with locally-served Gemma.",
    metric: "~60% LLM-call reduction · 50+ modules · binary RBAC",
    body:
      "A 3-tier follow-up engine routes queries through a hashed-prompt cache (L1), a small rewrite agent that prompts only with the diff against the previous turn (L2), and a full re-plan only when intent shifts (L3). A destructive-SQL gate blocks DDL/DML on read-only tenants before generation lands. The RBAC whitelist is encoded as packed bitmasks per (role × table × column) so authorization is a single AND, not a join — checked in front of generation, not behind it.",
    decision: {
      label: "key decision",
      text: "LangGraph over plain LangChain — explicit state graph beats chained prompts when retries, branching, and human-in-the-loop all touch the same state.",
    },
    tags: ["LangGraph", "Gemma", "Python", "Postgres", "RBAC"],
    repo: "https://github.com/ShubhamPatel2305/NL-to-SQL-Chat-Bot",
    live: "https://www.nl2sql.shubhampatel.uk"
  },
  {
    num: "03",
    domain: "infrastructure · multi-cloud",
    title: "Active-Passive Disaster Recovery",
    pitch:
      "Two clouds, three regions, canary failback gated on health checks.",
    metric: "Cloudflare → AWS Mumbai (active) · AWS SG (hot) · Azure (failover)",
    body:
      "Cloudflare's load-balancer routes primary traffic to AWS Mumbai with hot-standby on AWS Singapore and Azure failover for MongoDB Atlas. Failback ramps 5%→25%→50%→100% gated on rolling error rate and p99 latency — fail any gate and traffic snaps back automatically. Health checks chain edge → app health → DB write probe so a single failing layer can't drag the others. Terraform owns the topology end-to-end and Jenkins runs weekly drills so the failback path doesn't bit-rot.",
    decision: {
      label: "key decision",
      text: "Active-passive over active-active — read-heavy traffic, small team, and a data tier that couldn't safely tolerate concurrent multi-region writes.",
    },
    tags: ["AWS", "Azure", "Cloudflare", "Terraform", "Jenkins"],
    repo: "https://github.com/ShubhamPatel2305/Multi-cloud-DR-pipeline",
  },
  // {
  //   num: "03",
  //   domain: "video · distributed",
  //   title: "Adaptive HLS Streaming Pipeline",
  //   pitch:
  //     "End-to-end ingest → transcode → CDN, scaled with ephemeral workers.",
  //   metric: "1080p/720p/360p · 1000+ students · custom ABR player",
  //   body:
  //     "SQS-dispatched ephemeral EC2 workers spin up per job, run Dockerized FFmpeg transcoders, push HLS chunks to S3, and self-terminate. The custom HTML5 ABR player picks rungs based on a moving average of segment-download time relative to segment duration, which holds up better on Indian 4G than the default browser heuristics. The 3-rung ladder is intentionally sparse — covers the actual viewer distribution without inflating storage or CDN cost.",
  //   decision: {
  //     label: "key decision",
  //     text: "Per-job ephemeral workers, not a fixed transcoder fleet — class-recording uploads are bursty and unpredictable, so cost should scale with usage.",
  //   },
  //   tags: ["FFmpeg", "EC2", "SQS", "Docker", "HLS"],
  //   repo: "https://github.com/ShubhamPatel2305",
  // },
  {
    num: "04",
    domain: "full-stack · led",
    title: "TeamSync — Project Management Platform",
    pitch:
      "Backend + integrations lead, Infosys Springboard 5.0.",
    metric: "Role-based access · task tracking · team workflows",
    body:
      "Led the backend and integration tracks of a collaborative project-management platform built on Node.js, Express, React, and MongoDB with role-based access, task tracking, and end-to-end team workflows. Owned the API design, auth model, and the integration surface; coordinated four contributors across the build.",
    decision: {
      label: "scope",
      text: "Backend + integrations lead — owned API design, auth model, and the cross-team integration surface.",
    },
    tags: ["Node.js", "Express", "React", "MongoDB"],
    repo: "https://github.com/ShubhamPatel2305/teamsync_Infosys_Internship_Oct2024",
    live: "https://www.teamsync.infosys.shubhampatel.uk"
  },
];

export default function Projects() {
  return (
    <section className="mx-auto max-w-column px-5 sm:px-6 py-16 sm:py-20">
      <SectionHeader
        index="04"
        label="selected projects"
        id="projects"
        caption="readmes on github"
      />

      <ul className="space-y-3">
        {projects.map((p, i) => (
          <motion.li
            key={p.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: Math.min(i * 0.04, 0.18),
              ease: [0.21, 0.62, 0.34, 1],
            }}
          >
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative border hairline rounded-md bg-paper-card hover:bg-paper-warm transition-colors duration-200 p-5 sm:p-6"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="font-mono text-[11px] tracking-[0.18em] text-ink-dim mt-1 w-7 shrink-0">
                  {p.num}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-muted">
                    {p.domain}
                  </div>

                  <h3 className="mt-2 font-serif text-[26px] sm:text-[30px] leading-[1.1] tracking-tightest text-ink">
                    {p.title}
                  </h3>

                  <p className="mt-2 font-serif italic text-[16px] text-ink-muted">
                    {p.pitch}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] text-accent">
                    <span className="inline-block w-3 h-px bg-accent" />
                    {p.metric}
                  </div>

                  <p className="mt-4 text-[14.5px] leading-[1.65] text-ink-soft max-w-prose">
                    {p.body}
                  </p>

                  <div className="mt-4 pl-3 border-l-2 border-rule">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim mb-1">
                      {p.decision.label}
                    </div>
                    <p className="text-[13.5px] leading-[1.65] text-ink-muted max-w-prose">
                      {p.decision.text}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10.5px] text-ink-muted border hairline rounded-full px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-4 font-mono text-[11.5px]">
                    <span className="inline-flex items-center gap-1.5 text-ink group-hover:text-accent transition-colors">
                      <Github size={13} strokeWidth={1.5} />
                      view readme
                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.75}
                        className="-translate-x-0.5 group-hover:translate-x-0 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </span>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-ink-muted hover:text-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        live demo <ArrowUpRight size={11} strokeWidth={1.75} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>

      <p className="mt-7 font-mono text-[11.5px] text-ink-dim">
        &mdash; rest of the work lives on{" "}
        <a
          href="https://github.com/ShubhamPatel2305"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline-link hover:text-accent"
        >
          github.com/ShubhamPatel2305
        </a>
      </p>
    </section>
  );
}
