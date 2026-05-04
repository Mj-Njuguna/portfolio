import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-6"
      style={{
        borderBottom: '1px solid var(--border)',
        background: scrolled ? 'rgba(10,10,9,0.95)' : 'rgba(10,10,9,0.85)',
        backdropFilter: 'blur(12px)',
        transition: 'background 0.3s',
      }}
    >
      <Link
        to="/"
        className="font-bold text-[13px] tracking-[0.08em] uppercase no-underline"
        style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
      >
       J.M. Njuguna
      </Link>

      <ul className="flex gap-8 list-none">
        {isHome ? (
          ['work', 'about', 'contact'].map(id => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="text-[13px] font-medium tracking-[0.04em] bg-transparent border-none cursor-none transition-colors duration-200"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))
        ) : (
          <li>
            <Link
              to="/"
              className="text-[13px] font-medium tracking-[0.04em] no-underline transition-colors duration-200"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Portfolio
            </Link>
          </li>
        )}
      </ul>

      <a
        href="mailto:alex@example.com"
        className="text-[13px] font-semibold tracking-[0.04em] no-underline px-[1.1rem] py-2 rounded-sm transition-opacity duration-200 hover:opacity-85"
        style={{ fontFamily: 'Syne, sans-serif', color: 'var(--bg)', background: 'var(--accent)' }}
      >
        Hire me
      </a>
    </nav>
  );
}
