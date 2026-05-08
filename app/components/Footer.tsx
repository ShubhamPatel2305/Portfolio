"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto max-w-column px-5 sm:px-6 pt-8 pb-12 mt-6 border-t hairline">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11.5px] text-ink-dim">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          <span>shubham patel &middot; ahmedabad, IN</span>
        </div>
        <div className="flex items-center gap-3">
          <span>© {year}</span>
          <span className="text-ink-muted">·</span>
          <span>built with next.js · hosted on vercel</span>
        </div>
      </div>
    </footer>
  );
}
