import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { splitWords } from "../utils/splitText";

const stats = [
  { num: "5+", label: "Years exp." },
  { num: "23", label: "Projects shipped" },
  { num: "8", label: "Happy clients" },
];

export default function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(
      eyebrowRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
    );

    if (headlineRef.current) {
      const words = splitWords(headlineRef.current);
      tl.fromTo(
        words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.06 },
        "-=0.4",
      );
    }

    tl.fromTo(
      subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.4",
    );

    if (metaRef.current) {
      const children = Array.from(metaRef.current.children);
      tl.fromTo(
        children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 },
        "-=0.4",
      );
    }
  }, []);

  return (
    <section className="pt-[13rem] pb-24 px-10 max-w-[1400px] mx-auto">
      <div
        ref={eyebrowRef}
        className="flex items-center gap-3 mb-8"
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "12px",
          fontWeight: 300,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--accent)",
          opacity: 0,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "28px",
            height: "1px",
            background: "var(--accent)",
            flexShrink: 0,
          }}
        />
        Software developer — Nairobi
      </div>

      <h1
        ref={headlineRef}
        className="font-extrabold mb-10"
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          color: "var(--text)",
          maxWidth: "14ch",
        }}
      >
        Building things{" "}
        <em style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
          that matter
        </em>
      </h1>

      <p
        ref={subRef}
        style={{
          fontFamily: "DM Mono, monospace",
          fontWeight: 300,
          fontSize: "13px",
          color: "var(--text-muted)",
          maxWidth: "44ch",
          lineHeight: "1.8",
          opacity: 0,
        }}
      >
        Full-stack engineer specializing in scalable web apps, developer
        tooling, and clean APIs. Open to freelance &amp; full-time.
      </p>

      <div ref={metaRef} className="mt-16 flex items-center gap-12">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex items-center gap-12"
          >
            <div>
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "2rem",
                  color: "var(--text)",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "11px",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {s.label}
              </div>
            </div>
            {i < stats.length - 1 && (
              <div
                style={{
                  width: "1px",
                  height: "40px",
                  background: "var(--border)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
