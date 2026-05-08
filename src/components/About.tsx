import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' },
      }
    );

    gsap.fromTo(
      bodyRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 85%' },
      }
    );

    const blocks = gridRef.current?.querySelectorAll('.skill-block');
    if (blocks) {
      gsap.fromTo(
        Array.from(blocks),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="max-w-[1400px] mx-auto px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-24"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div>
        <h2
          ref={headlineRef}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
            marginBottom: '2rem',
            color: 'var(--text)',
            opacity: 0,
          }}
        >
          Engineer.{' '}
          <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontStyle: 'italic' }}>
            Builder. Problem-solver.
          </span>
        </h2>

        <p
          ref={bodyRef}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '13px',
            fontWeight: 300,
            color: 'var(--text-muted)',
            lineHeight: '1.9',
            marginBottom: '2rem',
            opacity: 0,
          }}
        >
          I'm Njuguna — a full-stack software developer based in Nairobi, Kenya. I build web applications, developer tools, and APIs that are fast, maintainable, and built to scale.
          <br /><br />
          I care deeply about developer experience, clean architecture, and shipping products people actually love to use. Whether it's a greenfield SaaS, a critical backend migration, or an open-source tool — I'm at my best when solving hard problems with elegant code.
          <br /><br />
          When I'm not shipping code, I write about software, contribute to open source, and mentor junior devs in the Nairobi tech community.
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 no-underline pb-1 transition-all duration-200"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            color: 'var(--text)',
            letterSpacing: '0.03em',
            borderBottom: '1px solid var(--border)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text)';
            (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--text)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text)';
            (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--border)';
          }}
        >
          Read my writing →
        </a>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 self-start"
        style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}
      >
        {skills.map(skill => (
          <div
            key={skill.category}
            className="skill-block p-6 transition-all duration-200"
            style={{ background: 'var(--bg)', opacity: 0 }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--bg)')}
          >
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                fontWeight: 300,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '0.75rem',
              }}
            >
              {skill.category}
            </div>
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 500,
                fontSize: '13px',
                color: 'var(--text)',
                lineHeight: '1.8',
              }}
            >
              {skill.list.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < skill.list.length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
