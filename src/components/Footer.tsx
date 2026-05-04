const links = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Resume', href: '#' },
];

export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-10 py-8 max-w-[1400px] mx-auto flex-wrap gap-4"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <span
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          fontWeight: 300,
          color: 'var(--text-dim)',
          letterSpacing: '0.06em',
        }}
      >
        &copy; 2026 J.M. Njuguna. All rights reserved.
      </span>

      <ul className="flex gap-8 list-none">
        {links.map(link => (
          <li key={link.label}>
            <a
              href={link.href}
              className="no-underline transition-colors duration-200"
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                fontWeight: 300,
                color: 'var(--text-dim)',
                letterSpacing: '0.06em',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-dim)')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
