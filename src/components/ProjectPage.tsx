import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ExternalLink, Zap, Wrench, Brain, Shield, BarChart3, Globe, Link2, type LucideIcon } from 'lucide-react';
import { projects } from '../data/projects';
import Cursor from './Cursor';
import Nav from './Nav';
import Footer from './Footer';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Wrench,
  Brain,
  Shield,
  BarChart3,
  Globe,
  Link2,
};

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!project) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    const sections = contentRef.current?.querySelectorAll('.project-section');
    if (sections) {
      sections.forEach((section, i) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 88%' },
            delay: i * 0.05,
          }
        );
      });
    }

    const imgs = imagesRef.current?.querySelectorAll('.project-image');
    if (imgs) {
      gsap.fromTo(
        Array.from(imgs),
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: imagesRef.current, start: 'top 85%' },
        }
      );
    }
  }, [slug, project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '4rem', color: 'var(--text)' }}>404</h1>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'var(--text-muted)', marginTop: '1rem' }}>Project not found</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 no-underline"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text)', letterSpacing: '0.03em' }}
          >
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Cursor />
      <Nav />

      {/* Back link */}
      <div className="max-w-[1400px] mx-auto px-10 pt-28 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 no-underline transition-colors duration-200"
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '12px',
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>
      </div>

      {/* Hero */}
      <div ref={heroRef} className="max-w-[1400px] mx-auto px-10 pb-16" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          {(() => {
            const Icon = iconMap[project.icon] || Zap;
            return (
              <div
                className="inline-flex items-center justify-center"
                style={{
                  width: 'clamp(3.5rem, 5vw, 5rem)',
                  height: 'clamp(3.5rem, 5vw, 5rem)',
                  borderRadius: '8px',
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              >
                <Icon size={32} strokeWidth={1.5} />
              </div>
            );
          })()}
          <div className="flex gap-2 flex-wrap ml-4">
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

        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
            color: 'var(--text)',
            marginBottom: '1.5rem',
          }}
        >
          {project.name}
        </h1>

        <p
          style={{
            fontFamily: 'DM Mono, monospace',
            fontWeight: 300,
            fontSize: '14px',
            color: 'var(--text-muted)',
            maxWidth: '60ch',
            lineHeight: '1.8',
          }}
        >
          {project.desc}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-8 mt-10 flex-wrap">
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>Role</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>{project.role}</div>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>Timeline</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>{project.timeline}</div>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>Client</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>{project.client}</div>
          </div>
        </div>

        {/* Stack */}
        {project.stack && (
          <div className="flex gap-2 flex-wrap mt-8">
            {project.stack.map(tech => (
              <span
                key={tech}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--border)',
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

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-10">
        <div style={{ height: '1px', background: 'var(--border)' }} />
      </div>

      {/* Content sections */}
      <div ref={contentRef} className="max-w-[1400px] mx-auto px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 flex flex-col gap-16">
          {/* Overview */}
          <div className="project-section" style={{ opacity: 0 }}>
            <h3
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '1.5rem',
              }}
            >
              Overview
            </h3>
            <p
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '14px',
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: '1.9',
              }}
            >
              {project.overview}
            </p>
          </div>

          {/* Challenge */}
          <div className="project-section" style={{ opacity: 0 }}>
            <h3
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '1.5rem',
              }}
            >
              The Challenge
            </h3>
            <p
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '14px',
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: '1.9',
              }}
            >
              {project.challenge}
            </p>
          </div>

          {/* Approach */}
          <div className="project-section" style={{ opacity: 0 }}>
            <h3
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '1.5rem',
              }}
            >
              Approach
            </h3>
            <p
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '14px',
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: '1.9',
              }}
            >
              {project.approach}
            </p>
          </div>

          {/* Outcome */}
          <div className="project-section" style={{ opacity: 0 }}>
            <h3
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '1.5rem',
              }}
            >
              Outcome
            </h3>
            <p
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                color: 'var(--text)',
                lineHeight: '1.5',
                letterSpacing: '-0.01em',
              }}
            >
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5">
          <div className="project-section" style={{ opacity: 0 }}>
            <h3
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '2rem',
              }}
            >
              Key Features
            </h3>
            <ul className="list-none flex flex-col gap-4">
              {project.keyFeatures.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--text-muted)',
                    lineHeight: '1.7',
                  }}
                >
                  <span
                    className="flex-shrink-0 mt-1.5"
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--text-muted)',
                      display: 'inline-block',
                    }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Images */}
      {project.images.length > 0 && (
        <div ref={imagesRef} className="max-w-[1400px] mx-auto px-10 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img, i) => (
              <div
                key={i}
                className="project-image overflow-hidden rounded-sm"
                style={{
                  opacity: 0,
                  border: '1px solid var(--border)',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                  style={{
                    aspectRatio: '16/10',
                    filter: 'grayscale(0.2) contrast(1.05)',
                    transition: 'filter 0.4s, transform 0.4s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.filter = 'grayscale(0) contrast(1)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.filter = 'grayscale(0.2) contrast(1.05)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div
        className="max-w-[1400px] mx-auto px-10 py-12"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 no-underline transition-colors duration-200"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--text)',
              letterSpacing: '0.03em',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '0.25rem',
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
            <ArrowLeft size={16} /> All projects
          </Link>

          {(() => {
            const currentIndex = projects.findIndex(p => p.slug === slug);
            const nextProject = projects[currentIndex + 1] || projects[0];
            return (
              <Link
                to={`/project/${nextProject.slug}`}
                className="inline-flex items-center gap-2 no-underline transition-colors duration-200"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'var(--text)',
                  letterSpacing: '0.03em',
                }}
              >
                Next project <ExternalLink size={14} />
              </Link>
            );
          })()}
        </div>
      </div>

      <Footer />
    </div>
  );
}
