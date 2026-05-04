import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const labelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('a');
    if (!cards) return;

    gsap.fromTo(
      labelRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      }
    );

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.07,
          scrollTrigger: { trigger: card, start: 'top 90%' },
        }
      );
    });
  }, []);

  return (
    <>
      <div
        ref={labelRef}
        id="work"
        className="flex items-center gap-4 max-w-[1400px] mx-auto px-10 pt-12 pb-6"
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          fontWeight: 300,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          opacity: 0,
        }}
      >
        Selected work
        <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
      </div>

      <div
        ref={gridRef}
        className="max-w-[1400px] mx-auto px-10 pb-24 grid grid-cols-12"
        style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}
      >
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
