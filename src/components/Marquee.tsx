import { useRef } from 'react';
import { techStack } from '../data/projects';

const items = [...techStack, ...techStack];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        padding: '1rem 0',
      }}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 28s linear infinite' }}
        onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; }}
        onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-10 px-10"
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              fontWeight: 300,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
            }}
          >
            {item}
            <span
              style={{
                display: 'inline-block',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
