'use client';

import React, { useRef, useEffect, useState } from 'react';
import { essays, essaysMeta, type Essay } from '@/config/portfolio';

const EssayCard: React.FC<{
  essay: Essay;
  onHover: () => void;
  onLeave: () => void;
  blurred: boolean;
}> = ({ essay, onHover, onLeave, blurred }) => {
  return (
    <a
      href={essay.href}
      className={`essay-card block ${essay.rotate} ${essay.translateY}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        filter: blurred ? 'blur(3px) grayscale(30%)' : 'none',
        opacity: blurred ? 0.55 : 1,
        transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      {/* Color accent top bar */}
      <div style={{ height: '3px', background: essay.color }} />

      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {essay.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="font-serif font-medium mb-3 leading-snug"
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: '17px',
            color: '#3B3B3B',
            lineHeight: 1.3,
          }}
        >
          {essay.title}
        </h3>

        {/* Excerpt */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            color: '#6B6B6B',
            fontSize: '13px',
            lineHeight: 1.75,
          }}
        >
          {essay.excerpt}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid rgba(59,59,59,0.06)' }}
        >
          <span
            className="font-mono text-xs"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6E8CA0', fontSize: '10px' }}
          >
            {essay.date}
          </span>
          <span
            className="font-mono text-xs"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6B6B6B', fontSize: '10px' }}
          >
            {essay.readTime} read
          </span>
        </div>
      </div>
    </a>
  );
};

const EssayGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="writing"
      data-tour="writing"
      ref={sectionRef}
      className="py-32 px-8 bg-parchment-dark overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: '#6E8CA0',
                fontSize: '10px',
                letterSpacing: '0.25em',
              }}
            >
              {essaysMeta.eyebrow}
            </span>
            <h2
              className="font-serif font-light mt-3 leading-tight"
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: '#3B3B3B',
                lineHeight: 1.1,
              }}
            >
              {essaysMeta.heading}
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#6B6B6B',
              fontSize: '14px',
              lineHeight: 1.75,
            }}
          >
            {essaysMeta.intro}
          </p>
        </div>

        {/* Card gallery — rotated, staggered */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10"
          style={{ perspective: '1200px' }}
        >
          {essays.map((essay, i) => (
            <div
              key={essay.id}
              style={{
                transitionDelay: `${i * 80}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${i * 80}ms, transform 0.7s ease ${i * 80}ms`,
              }}
            >
              <EssayCard
                essay={essay}
                onHover={() => setHoveredId(essay.id)}
                onLeave={() => setHoveredId(null)}
                blurred={hoveredId !== null && hoveredId !== essay.id}
              />
            </div>
          ))}
        </div>

        {/* All essays link */}
        {essaysMeta.allLabel && (
          <div className="mt-16 text-center">
            <a
              href={essaysMeta.allHref}
              className="inline-flex items-center gap-2 font-mono text-sm hover:text-clay transition-colors duration-200"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: '#6E8CA0',
                fontSize: '13px',
              }}
            >
              {essaysMeta.allLabel}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default EssayGallery;
