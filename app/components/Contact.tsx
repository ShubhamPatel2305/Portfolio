"use client";

import { useMemo, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Mail, Github, Linkedin } from "lucide-react";
import SectionHeader from "./SectionHeader";

type Topic = "hiring" | "collab" | "question" | "hi";

const topics: { id: Topic; label: string; tagline: string }[] = [
  { id: "hiring", label: "hiring", tagline: "a role at your team" },
  { id: "collab", label: "collab", tagline: "building something together" },
  { id: "question", label: "question", tagline: "advice / tech / how-did-you" },
  { id: "hi", label: "say hi", tagline: "no agenda needed" },
];

const placeholders: Record<Topic, string> = {
  hiring:
    "Role title, team, location/remote, comp range you have in mind, and timeline you're hiring for.",
  collab:
    "What you're building, what you'd want me to own, timeline, and the rough shape of the engagement.",
  question:
    "What you're stuck on. Stack / context / what you've already tried always helps.",
  hi: "Whatever's on your mind. I read everything.",
};

const MAX = 1200;

export default function Contact() {
  const [topic, setTopic] = useState<Topic>("hiring");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const remaining = useMemo(() => MAX - message.length, [message]);
  const valid = name.trim() && /\S+@\S+\.\S+/.test(email) && message.trim().length > 8;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);

    try {
      const subject = encodeURIComponent(
        `[${topic}] from ${name} via portfolio`
      );
      const body = encodeURIComponent(
        `Topic: ${topic}\nFrom: ${name} <${email}>\n\n${message}`
      );
      window.location.href = `mailto:shubhamcp23@gmail.com?subject=${subject}&body=${body}`;

      await new Promise((r) => setTimeout(r, 350));
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-column px-5 sm:px-6 py-16 sm:py-24">
      <SectionHeader index="06" label="contact" id="contact" caption="reply within ~48h" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 0.62, 0.34, 1] }}
        className="max-w-prose"
      >
        <h3 className="font-serif text-[40px] sm:text-[48px] leading-[1.05] tracking-tightest text-ink">
          Let&rsquo;s <em className="italic">talk</em>.
        </h3>
        <p className="mt-3 text-[15.5px] leading-[1.7] text-ink-muted">
          Best for product-company SDE / AI engineer roles, contract or
          full-time. Pick the kind of conversation &mdash; the form adapts.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.21, 0.62, 0.34, 1] }}
        onSubmit={onSubmit}
        className="mt-10 border hairline rounded-md bg-paper-card overflow-hidden"
      >
        <div className="px-5 sm:px-6 py-3 border-b hairline flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-dim">
          <span>~/new-message.md</span>
          <span className="hidden sm:inline">draft &middot; not sent</span>
        </div>

        <div className="px-5 sm:px-6 pt-6 pb-2">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-muted mb-3">
            topic
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => {
              const active = t.id === topic;
              return (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTopic(t.id)}
                  aria-pressed={active}
                  className={`group inline-flex items-baseline gap-2 border rounded-full px-3 py-1.5 transition-all ${
                    active
                      ? "bg-ink text-paper border-ink"
                      : "bg-paper text-ink-muted hairline hover:text-ink hover:border-ink/40"
                  }`}
                >
                  <span className="font-mono text-[12px]">{t.label}</span>
                  <span
                    className={`text-[11px] transition-colors ${
                      active ? "text-paper/60" : "text-ink-dim"
                    } hidden sm:inline`}
                  >
                    {t.tagline}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule mt-4 border-t hairline">
          <Field
            label="from"
            type="text"
            name="name"
            value={name}
            onChange={setName}
            placeholder="your name"
            autoComplete="name"
          />
          <Field
            label="reply to"
            type="email"
            name="email"
            value={email}
            onChange={setEmail}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>

        <div className="border-t hairline">
          <label className="block px-5 sm:px-6 pt-5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
              message
            </span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
            placeholder={placeholders[topic]}
            rows={6}
            className="block w-full px-5 sm:px-6 pt-2 pb-5 bg-transparent text-[15px] leading-[1.65] text-ink placeholder:text-ink-dim resize-none"
          />
          <div className="px-5 sm:px-6 pb-4 flex items-center justify-between font-mono text-[10.5px] text-ink-dim">
            <span>markdown ok &middot; links welcome</span>
            <span className={remaining < 100 ? "text-accent" : ""}>
              {remaining} chars left
            </span>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 border-t hairline flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-ink-dim hidden sm:block">
            opens your mail client &middot; nothing logged
          </span>
          <button
            type="submit"
            disabled={!valid || submitting}
            className="ml-auto group inline-flex items-center gap-2 font-mono text-[12.5px] bg-ink text-paper px-4 py-2 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent"
          >
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="inline-flex items-center gap-2"
                >
                  <Check size={13} strokeWidth={2} /> sent &mdash; talk soon
                </motion.span>
              ) : (
                <motion.span
                  key="send"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="inline-flex items-center gap-2"
                >
                  send
                  <ArrowRight
                    size={13}
                    strokeWidth={1.75}
                    className="-translate-x-0.5 group-hover:translate-x-0 transition-transform"
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.form>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12px] text-ink-muted">
        <span className="text-ink-dim">or just &mdash;</span>
        <a
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          href="mailto:shubhamcp23@gmail.com"
        >
          <Mail size={13} strokeWidth={1.5} /> shubhamcp23@gmail.com
        </a>
        <a
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          href="https://github.com/ShubhamPatel2305"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={13} strokeWidth={1.5} /> github
        </a>
        <a
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          href="https://www.linkedin.com/in/shubham-patel-0422b0247/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={13} strokeWidth={1.5} /> linkedin
        </a>
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <label className="block bg-paper-card px-5 sm:px-6 py-4">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1.5 block w-full bg-transparent text-[15px] text-ink placeholder:text-ink-dim"
      />
    </label>
  );
}
