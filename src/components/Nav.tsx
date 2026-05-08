import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const menuItems = ['work', 'about', 'contact'];
const socialLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const scrollCloseTimeout = useRef<number | null>(null);
  const pendingScrollTarget = useRef<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('work');
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
    if (!menuOpen) return;

    const closeMenuOnScroll = () => {
      if (scrollCloseTimeout.current) {
        window.clearTimeout(scrollCloseTimeout.current);
      }
      scrollCloseTimeout.current = window.setTimeout(() => {
        setMenuOpen(false);
        scrollCloseTimeout.current = null;
      }, 200);
    };

    window.addEventListener('scroll', closeMenuOnScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', closeMenuOnScroll);
      if (scrollCloseTimeout.current) {
        window.clearTimeout(scrollCloseTimeout.current);
        scrollCloseTimeout.current = null;
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      if (isHome) {
        const sections = menuItems
          .map(item => ({ id: item, element: document.getElementById(item) }))
          .filter(section => section.element !== null);

        const scrollAnchor = scrollY + window.innerHeight * 0.2;
        let currentSection = sections.length > 0 ? sections[0].id : 'work';

        for (const { id, element } of sections) {
          if (!element) continue;
          const rect = element.getBoundingClientRect();
          const elementTop = scrollY + rect.top;

          if (scrollAnchor >= elementTop) {
            currentSection = id;
          } else {
            break;
          }
        }

        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

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

  useEffect(() => {
    if (isHome && pendingScrollTarget.current) {
      document.getElementById(pendingScrollTarget.current)?.scrollIntoView({ behavior: 'smooth' });
      pendingScrollTarget.current = null;
    }
  }, [isHome]);

  const scrollTo = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    pendingScrollTarget.current = id;
    navigate('/');
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
        <div
          className="pointer-events-none absolute right-6 w-[260px] rounded-t-[28px] rounded-tr-[28px] transition-all duration-300"
          style={{
            top: '8px',
            height: 'calc(100% - 8px)',
            background: menuOpen ? 'var(--menu-panel-bg)' : 'transparent',
            borderLeft: menuOpen ? '1px solid var(--border)' : 'none',
            opacity: menuOpen ? 1 : 0,
          }}
        />
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
              color: 'var(--theme-toggle-icon)',
              boxShadow: '0 0 18px rgba(0, 0, 0, 0.16)',
              border: '1.5px solid var(--border)',
            }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onMouseEnter={(e) => {
              const button = e.currentTarget as HTMLElement;
              button.style.boxShadow = '0 0 26px rgba(0, 0, 0, 0.22)';
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget as HTMLElement;
              button.style.boxShadow = '0 0 18px rgba(0, 0, 0, 0.16)';
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
                color: 'var(--theme-toggle-icon)',
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
            className="relative flex h-10 w-12 items-center justify-center rounded-lg border transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              borderColor: 'var(--border)',
              background: menuOpen ? 'var(--bg-hover)' : 'var(--menu-btn-bg)',
              boxShadow: menuOpen ? '0 0 20px rgba(0, 0, 0, 0.15)' : 'none',
            }}
          >
            <span
              className="block h-[2px] w-5 rounded-full bg-current transition-all duration-500 ease-out"
              style={{
                transform: menuOpen ? 'translateY(4px) rotate(45deg) scaleX(0.8)' : 'none',
                transformOrigin: 'center',
              }}
            />
            <span
              className="absolute block h-[2px] rounded-full bg-current transition-all duration-500 ease-out"
              style={{
                width: menuOpen ? '0px' : '14px',
                transform: menuOpen ? 'translateX(-6px) translateY(0px)' : 'translateY(0px)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[2px] w-5 rounded-full bg-current transition-all duration-500 ease-out"
              style={{
                transform: menuOpen ? 'translateY(-4px) rotate(-45deg) scaleX(0.8)' : 'none',
                transformOrigin: 'center',
              }}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-6 z-[90] w-[260px] rounded-[28px] p-5 pt-[5.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-450 ease-out ${
          menuOpen ? 'visible opacity-100 scale-100 translate-y-0' : 'invisible opacity-0 scale-95 -translate-y-4'
        }`}
        style={{
          border: '1px solid var(--border)',
          background: 'var(--menu-panel-bg)',
          color: 'var(--menu-panel-text)',
          transformOrigin: 'top right',
          maxHeight: 'calc(100vh - 5.5rem)',
          overflowY: 'auto',
        }}
      >
        <div
          className="mb-4 h-[2px] overflow-hidden rounded-full"
          style={{ background: 'var(--border)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: menuOpen ? '100%' : '0%',
              background: 'var(--border-hover)',
            }}
          />
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeSection === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  scrollTo(item);
                }}
                className="relative w-full rounded-2xl px-4 py-2 text-left text-[14px] uppercase tracking-[0.12em] transition-all duration-300"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  color: isActive ? 'var(--menu-panel-active-text)' : 'var(--menu-panel-text-muted)',
                  background: isActive ? 'var(--bg-hover)' : 'transparent',
                  opacity: isActive ? 1 : 0.92,
                  border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{item}</span>
                  {isActive && (
                    <span
                      className="block h-2 w-2 rounded-full"
                      style={{ background: 'var(--menu-panel-active-dot)' }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        <div className="mt-1 pt-1 pl-4">
          {/* iOS-style fade divider */}
          <div
            className="mb-3"
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--menu-panel-text) 30%, var(--menu-panel-text) 70%, transparent)',
              opacity: 0.12,
            }}
          />
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--menu-panel-text)',
              marginBottom: '0.5rem',
            }}
          >
            Socials
          </div>
          <div className="space-y-1">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="block no-underline transition-colors duration-200"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '12px',
                  fontWeight: 300,
                  letterSpacing: '0.12em',
                  color: 'var(--menu-panel-text-muted)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--menu-panel-text)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--menu-panel-text-muted)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <a
        href="mailto:ahello@njuguna.com"
        className="fixed left-6 bottom-6 z-[100] rounded-full px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em] no-underline transition-all duration-300 hover:shadow-lg"
        style={{
          fontFamily: 'Syne, sans-serif',
          color: 'var(--button-text)',
          background: 'var(--button-bg)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.18)',
          border: '1px solid var(--button-border)',
          letterSpacing: '0.08em',
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.24)';
          target.style.background = 'var(--button-bg-hover)';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.18)';
          target.style.background = 'var(--button-bg)';
        }}
      >
        Hire me
      </a>
    </>
  );
}
