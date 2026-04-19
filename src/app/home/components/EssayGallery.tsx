'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Essay {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  date: string;
  rotate: string;
  translateY: string;
  color: string;
}

const essays: Essay[] = [
  {
    id: 1,
    title: 'Terraform State: The Silent Killer of Velocity',
    excerpt:
      "Three years of platform engineering taught me that state management isn't just about locking — it's about team boundaries, blast radius, and the art of refactoring without downtime. A dispatch from the trenches of multi-environment Azure provisioning.",
    tags: ['Terraform', 'Azure', 'platform-engineering'],
    readTime: '8 min',
    date: 'Jan 2026',
    rotate: '-rotate-2',
    translateY: 'translate-y-4',
    color: '#6E8CA0',
  },
  {
    id: 2,
    title: 'The Lie of "Simple" GitHub Actions',
    excerpt:
      'Everyone says "just use reusable workflows." Nobody talks about what happens at 3am when a matrix strategy fails halfway through a production deployment and you\'re hunting down a YAML indentation bug.',
    tags: ['GitHub-Actions', 'YAML', 'DevOps'],
    readTime: '12 min',
    date: 'Nov 2025',
    rotate: 'rotate-1',
    translateY: 'translate-y-8',
    color: '#C2785C',
  },
  {
    id: 3,
    title: 'GHAS Is Not a Checkbox',
    excerpt:
      "The hidden cost of security automation: alert fatigue, false positives that train teams to ignore warnings, and the CodeQL queries that don't catch what matters until it's too late.",
    tags: ['GHAS', 'CodeQL', 'security'],
    readTime: '15 min',
    date: 'Sep 2025',
    rotate: '-rotate-1',
    translateY: 'translate-y-2',
    color: '#3B3B3B',
  },
  {
    id: 4,
    title: 'Writing Terraform That Reads Like Documentation',
    excerpt:
      "Variable names and module structures are the cheapest documentation you'll ever write. A case for naming your resources as carefully as you name your functions.",
    tags: ['Terraform', 'craft', 'readability'],
    readTime: '6 min',
    date: 'Jul 2025',
    rotate: 'rotate-3',
    translateY: 'translate-y-6',
    color: '#6E8CA0',
  },
  {
    id: 5,
    title: 'On Building Pipelines That Outlast You',
    excerpt:
      'A meditation on CI/CD workflows that run in production for years. What decisions made them maintainable, and why I now obsess over YAML validation and drift detection.',
    tags: ['DevOps', 'architecture', 'GitHub-Actions'],
    readTime: '10 min',
    date: 'May 2025',
    rotate: '-rotate-3',
    translateY: 'translate-y-0',
    color: '#C2785C',
  },
  {
    id: 6,
    title: 'The Copilot Trap',
    excerpt:
      "When AI code generation became mainstream, we all reached for it reflexively. Here's when writing your own Terraform modules and understanding your infrastructure is still the right answer.",
    tags: ['AI', 'Claude', 'Terraform'],
    readTime: '9 min',
    date: 'Mar 2025',
    rotate: 'rotate-2',
    translateY: 'translate-y-3',
    color: '#3B3B3B',
  },
];

const EssayCard: React.FC<{
  essay: Essay;
  onHover: () => void;
  onLeave: () => void;
  blurred: boolean;
}> = ({ essay, onHover, onLeave, blurred }) => {
  return (
    <div
      className={`essay-card ${essay.rotate} ${essay.translateY}`}
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
    </div>
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
              Technical Writing
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
              Essays from the experience
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
            Long-form writing on systems design, Terraform internals, and the craft of building
            software that lasts.
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
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 font-mono text-sm hover:text-clay transition-colors duration-200"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6E8CA0', fontSize: '13px' }}
          >
            Read all 24 essays
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
      </div>
    </section>
  );
};

export default EssayGallery;
