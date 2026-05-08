"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

type Group = { label: string; emphasis?: string[]; items: string[] };

const groups: Group[] = [
  {
    label: "languages",
    items: ["Python", "TypeScript", "JavaScript", "C#", "C++", "SQL"],
    emphasis: ["Python", "TypeScript", "C#"],
  },
  {
    label: "backend / api",
    items: [
      "FastAPI",
      "Node.js",
      "Express",
      "ASP.NET Web API",
      "REST",
      "WebSockets",
      "Microservices",
    ],
    emphasis: ["FastAPI", "ASP.NET Web API"],
  },
  {
    label: "ai / llms",
    items: [
      "LangGraph",
      "LangChain",
      "RAG (hybrid)",
      "OpenAI / Anthropic SDKs",
      "Gemma (local)",
      "Vector DBs",
      "Eval (Ragas / DeepEval)",
    ],
    emphasis: ["LangGraph", "RAG (hybrid)"],
  },
  {
    label: "cloud / devops",
    items: [
      "AWS",
      "Azure",
      "Cloudflare",
      "Docker",
      "Terraform",
      "Jenkins",
      "Multi-cloud DR",
      "Canary deploys",
      "CI/CD",
    ],
    emphasis: ["Multi-cloud DR", "Terraform"],
  },
  {
    label: "data / cache",
    items: [
      "PostgreSQL",
      "MongoDB",
      "SQL Server",
      "Redis",
      "Microsoft Garnet",
      "ETag caching",
      "TTL/LRU",
    ],
    emphasis: ["Microsoft Garnet", "ETag caching"],
  },
  {
    label: "frontend (working)",
    items: ["React", "Next.js", "Angular", "Tailwind CSS", "HTML5 video"],
  },
];

export default function Stack() {
  return (
    <section className="mx-auto max-w-column px-5 sm:px-6 py-16 sm:py-20">
      <SectionHeader index="05" label="stack" id="stack" caption="bold = comfortable in production" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
        {groups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.45,
              delay: Math.min(i * 0.04, 0.16),
              ease: [0.21, 0.62, 0.34, 1],
            }}
          >
            <div className="flex items-baseline gap-3 pb-2 border-b hairline">
              <span className="font-mono text-[10.5px] tracking-[0.18em] text-ink-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                {g.label}
              </span>
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
              {g.items.map((it) => {
                const strong = g.emphasis?.includes(it);
                return (
                  <li
                    key={it}
                    className={`text-[13.5px] leading-snug ${
                      strong ? "text-ink font-medium" : "text-ink-muted"
                    }`}
                  >
                    {it}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.21, 0.62, 0.34, 1] }}
        className="mt-10 pt-6 border-t hairline flex flex-wrap items-baseline gap-x-3 gap-y-1.5"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-dim">
          currently picking up
        </span>
        <span className="text-[13.5px] text-ink-soft">
          AWS Solutions Architect Associate · MCP servers · structured-output
          eval harnesses · ML system design
        </span>
      </motion.div>
    </section>
  );
}
