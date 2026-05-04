import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Zap, Wrench, Brain, Shield, BarChart3, Globe, Link2, type LucideIcon } from 'lucide-react';
import type { Project } from '../data/projects';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Wrench,
  Brain,
  Shield,
  BarChart3,
  Globe,
  Link2,
};

const colSpanMap = {
  large: 'lg:col-span-7',
  medium: 'lg:col-span-5',
  half: 'lg:col-span-6',
  third: 'lg:col-span-4',
};

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const visualRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[project.icon] || Zap;

  const onEnter = () => {
    gsap.to(visualRef.current, { scale: 1.08, rotate: -3, duration: 0.4, ease: 'power2.out' });
    gsap.to(arrowRef.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
  };

  const onLeave = () => {
    gsap.to(visualRef.current, { scale: 1, rotate: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(arrowRef.current, { opacity: 0, y: 4, duration: 0.25, ease: 'power2.out' });
  };

  return (
    <Link
      to={`/project/${project.slug}`}
      className={`col-span-12 ${colSpanMap[project.size]} relative overflow-hidden no-underline`}
      style={{
        background: 'var(--bg)',
        color: 'inherit',
        transition: 'background 0.3s',
        cursor: 'none',
        display: 'block',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        onEnter();
        (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)';
      }}
      onMouseLeave={e => {
        onLeave();
        (e.currentTarget as HTMLElement).style.background = 'var(--bg)';
      }}
    >
      <div
        className="flex flex-col justify-between p-10 h-full"
        style={{ minHeight: project.size === 'large' ? '420px' : '320px' }}
      >
        <div className="flex items-start justify-between">
          <span
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              fontWeight: 300,
              color: 'var(--text-dim)',
              letterSpacing: '0.08em',
            }}
          >
            {project.index}
          </span>
          <div className="flex gap-1 flex-wrap justify-end">
            {project.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  color: 'var(--text-dim)',
                  border: '1px solid var(--border)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div
            ref={visualRef}
            className="mb-6 inline-flex items-center justify-center"
            style={{
              width: 'clamp(3.5rem, 5vw, 5rem)',
              height: 'clamp(3.5rem, 5vw, 5rem)',
              borderRadius: '8px',
              background: 'var(--accent-dim)',
              border: '1px solid rgba(200,240,106,0.15)',
              color: 'var(--accent)',
            }}
          >
            <Icon size={32} strokeWidth={1.5} />
          </div>

          <h2
            className="mb-2"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'var(--text)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
          >
            {project.name}
          </h2>

          <p
            style={{
              fontFamily: 'DM Mono, monospace',
              fontWeight: 300,
              fontSize: '12px',
              color: 'var(--text-muted)',
              lineHeight: '1.7',
              maxWidth: '36ch',
            }}
          >
            {project.desc}
          </p>

          {project.stack && (
            <div className="flex gap-2 flex-wrap mt-4">
              {project.stack.map(tech => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    color: 'var(--accent)',
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(200,240,106,0.2)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '2px',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        ref={arrowRef}
        className="absolute bottom-10 right-10 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          border: '1px solid var(--accent)',
          color: 'var(--accent)',
          fontSize: '14px',
          opacity: 0,
          transform: 'translateY(4px)',
        }}
      >
        ↗
      </div>
    </Link>
  );
}
