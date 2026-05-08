"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section className="mx-auto max-w-column px-5 sm:px-6 py-16 sm:py-20">
      <SectionHeader index="02" label="about" id="about" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.62, 0.34, 1] }}
        className="space-y-5 max-w-prose text-[16px] leading-[1.7] text-ink-soft"
      >
        <p>
          I&rsquo;m a software engineer with{" "}
          <span className="text-ink">1.5+ years full-time</span> at Iolite
          Softwares and two more part-time during my B.Tech at PDEU
          (CS, GPA 9.21/10). My work sits where backend, distributed systems,
          and applied AI overlap &mdash; the parts that decide whether a
          product survives its first 1,000 concurrent users.
        </p>
        <p>
          I&rsquo;ve shipped a multi-tenant{" "}
          <span className="text-ink">agentic NL&rarr;SQL chatbot</span> on
          LangGraph + Gemma with a 3-tier follow-up engine and binary-encoded
          RBAC, an{" "}
          <span className="text-ink">active-passive multi-cloud DR</span>{" "}
          topology spanning AWS Mumbai/Singapore + Azure failover with canary
          failback, and an{" "}
          <span className="text-ink">HLS streaming pipeline</span> running
          ephemeral FFmpeg workers on EC2 dispatched via SQS. Tools change;
          the lens stays the same: how does this fail, what does it cost, and
          where&rsquo;s the metric.
        </p>
        <p>
          Outside the day job I&rsquo;m usually breaking and re-building small
          agentic services, or reading
          <span className="font-serif italic"> Designing Data-Intensive
          Applications</span> for the third time.
        </p>
      </motion.div>
    </section>
  );
}
