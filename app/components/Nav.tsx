"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "#about", label: "about" },
  { href: "#work", label: "work" },
  { href: "#projects", label: "projects" },
  { href: "#stack", label: "stack" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b hairline"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-column px-5 sm:px-6 h-14 flex items-center justify-between">
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-[13px] tracking-tight"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-ink">shubham patel</span>
          <span className="hidden sm:inline text-ink-dim">/ engineer</span>
        </a>

        <nav className="flex items-center gap-1.5 sm:gap-3">
          <ul className="hidden sm:flex items-center gap-4 font-mono text-[12px] text-ink-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hover:text-ink transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 sm:ml-3 inline-flex items-center gap-1 font-mono text-[12px] text-ink border hairline px-2.5 py-1 rounded-full hover:bg-ink hover:text-paper transition-colors duration-200"
          >
            résumé <ArrowUpRight size={12} strokeWidth={1.75} />
          </a>
        </nav>
      </div>
    </header>
  );
}
