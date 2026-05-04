import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      gsap.to(dot, { scale: 2.5, backgroundColor: 'transparent', border: '1px solid #c8f06a', duration: 0.2 });
      gsap.to(ringEl, { scale: 1.5, opacity: 0.6, duration: 0.25 });
    };

    const onLeave = () => {
      gsap.to(dot, { scale: 1, backgroundColor: '#c8f06a', border: 'none', duration: 0.2 });
      gsap.to(ringEl, { scale: 1, opacity: 1, duration: 0.25 });
    };

    document.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    const interactables = document.querySelectorAll('a, button, [data-cursor]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll('a, button, [data-cursor]');
      newEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: '#c8f06a', willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ border: '1px solid rgba(200,240,106,0.4)', willChange: 'transform' }}
      />
    </>
  );
}
