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

  const toggleTheme = () => {
    const button = document.querySelector('[data-theme-button]') as HTMLElement;
    if (button) {
      button.style.animation = 'none';
      setTimeout(() => {
        button.style.animation = 'spin-smooth 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }, 10);
    }
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
            data-theme-button
            className="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
            style={{
              boxShadow: theme === 'dark' 
                ? '0 0 20px rgba(200, 240, 106, 0.3)' 
                : '0 0 20px rgba(93, 189, 73, 0.25)',
              border: '1.5px solid var(--border)',
            }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onMouseEnter={(e) => {
              const button = e.currentTarget as HTMLElement;
              button.style.boxShadow = theme === 'dark'
                ? '0 0 30px rgba(200, 240, 106, 0.5)'
                : '0 0 30px rgba(93, 189, 73, 0.4)';
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget as HTMLElement;
              button.style.boxShadow = theme === 'dark'
                ? '0 0 20px rgba(200, 240, 106, 0.3)'
                : '0 0 20px rgba(93, 189, 73, 0.25)';
            }}
          >
            {/* Base circle */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-500"
              style={{ 
                background: 'var(--theme-toggle-bg)',
              }}
            />
            
            {/* Icon indicator - Sun for light, Moon for dark */}
            <svg
              className="absolute w-4 h-4 transition-all duration-500"
              style={{
                opacity: theme === 'dark' ? 1 : 0,
                transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>

            {/* Moon icon for light mode */}
            <svg
              className="absolute w-4 h-4 transition-all duration-500"
              style={{
                opacity: theme === 'light' ? 1 : 0,
                transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
                color: 'var(--bg)',
              }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
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
