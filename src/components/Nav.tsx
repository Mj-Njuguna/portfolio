import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const menuItems = ['work', 'about', 'contact'];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'light' ? 'light' : savedTheme === 'dark' ? 'dark' : prefersDark ? 'dark' : 'light';

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const scrollTo = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    navigate('/');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-6"
        style={{
          borderBottom: '1px solid var(--border)',
          background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
          color: 'var(--nav-text)',
          backdropFilter: 'blur(12px)',
          transition: 'background 0.3s',
        }}
      >
        <Link
          to="/"
          className="font-bold text-[13px] tracking-[0.08em] uppercase no-underline"
          style={{ fontFamily: 'Syne, sans-serif', color: 'var(--nav-text)' }}
        >
          J.M. Njuguna
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="relative flex h-7 w-7 items-center justify-center"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector('[data-theme-overlay]') as HTMLElement;
              if (overlay) overlay.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector('[data-theme-overlay]') as HTMLElement;
              if (overlay) overlay.style.opacity = '0';
            }}
          >
            {/* Base circle */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'var(--theme-toggle-bg)' }}
            />
            {/* Crescent overlay - hidden by default, shows on hover */}
            <div
              data-theme-overlay
              className="absolute transition-opacity duration-300"
              style={{
                inset: 0,
                opacity: 0,
                background: 'var(--nav-bg)',
                borderRadius: '50%',
                clipPath: 'polygon(70% 0%, 100% 0%, 100% 100%, 70% 100%, 55% 85%, 55% 15%)',
              }}
            />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative flex h-10 w-12 items-center justify-center rounded-md border"
            style={{ borderColor: 'var(--border)', background: 'var(--menu-btn-bg)' }}
          >
            <span
              className="block h-[2px] w-5 rounded-full bg-current transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none' }}
            />
            <span
              className="absolute block h-[2px] rounded-full bg-current transition-all duration-300"
              style={{
                width: '14px',
                transform: menuOpen ? 'translateX(-6px) translateY(0px)' : 'translateY(0px)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[2px] w-5 rounded-full bg-current transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-[5.5rem] right-6 z-[90] w-[240px] rounded-3xl p-5 shadow-[0_30px_90px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 ${
          menuOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'
        }`}
        style={{
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          color: 'var(--nav-text)',
        }}
      >
        <div
          style={{
            height: '2px',
            width: '3rem',
            marginBottom: '1rem',
            background: 'var(--accent)',
            borderRadius: '999px',
          }}
        />
        <ul className="flex flex-col gap-4 list-none">
          {menuItems.map(item => (
            <li key={item}>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  scrollTo(item);
                }}
                className="w-full rounded-xl px-4 py-3 text-left text-[14px] font-semibold uppercase tracking-[0.12em] transition-all duration-200"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  color: 'var(--nav-text-muted)',
                  background: 'rgba(0,0,0,0)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--accent)';
                  e.currentTarget.style.background = 'var(--accent-dim)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--nav-text-muted)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="mailto:alex@example.com"
        className="fixed left-6 bottom-6 z-[100] rounded-sm px-[1.1rem] py-3 text-[13px] font-semibold uppercase tracking-[0.04em] no-underline transition-colors duration-200 hover:bg-[rgba(200,240,106,0.15)]"
        style={{
          fontFamily: 'Syne, sans-serif',
          color: 'var(--bg)',
          background: 'var(--accent)',
        }}
      >
        Hire me
      </a>
    </>
  );
}
