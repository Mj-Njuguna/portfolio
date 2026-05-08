import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
      style={{ backgroundColor: 'white', mixBlendMode: 'difference', willChange: 'transform' }}
    />
  );
}
