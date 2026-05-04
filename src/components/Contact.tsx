import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from '../utils/splitText';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    });

    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });

    if (headlineRef.current) {
      const words = splitWords(headlineRef.current);
      tl.fromTo(
        words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.07 },
        '-=0.3'
      );
    }

    tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="max-w-[1400px] mx-auto px-10 py-24 flex flex-col items-start"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <p
        ref={eyebrowRef}
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          fontWeight: 300,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '2rem',
          opacity: 0,
        }}
      >
        Let's build together
      </p>

      <h2
        ref={headlineRef}
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(3rem, 7vw, 6.5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          marginBottom: '3rem',
          maxWidth: '14ch',
          color: 'var(--text)',
        }}
      >
        Got a project?{' '}
        <span style={{ color: 'var(--text-muted)' }}>Let's talk.</span>
      </h2>

      <a
        ref={ctaRef}
        href="mailto:alex@example.com"
        className="inline-flex items-center gap-4 no-underline transition-opacity duration-200 hover:opacity-85"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--bg)',
          background: 'var(--accent)',
          padding: '1rem 2rem',
          opacity: 0,
        }}
      >
        Send me an email →
      </a>
    </section>
  );
}
