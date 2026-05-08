"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  label: string;
  id?: string;
  caption?: string;
};

export default function SectionHeader({ index, label, id, caption }: Props) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.21, 0.62, 0.34, 1] }}
      className="flex items-baseline gap-3 pb-5 mb-8 border-b hairline"
    >
      <span className="font-mono text-[11px] tracking-[0.18em] text-ink-muted">
        {index}
      </span>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
        {label}
      </h2>
      {caption ? (
        <span className="ml-auto font-mono text-[11px] tracking-[0.04em] text-ink-dim">
          {caption}
        </span>
      ) : null}
    </motion.div>
  );
}
