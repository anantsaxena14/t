'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { hero, person } from '@/config/portfolio';

// ─── Vignette 1: Terminal ─────────────────────────────────────────────────────
const TerminalVignette: React.FC<{ active: boolean }> = ({ active }) => {
  const lines = [
    { type: 'prompt', text: hero.terminalPrompt },
    { type: 'command', text: hero.terminalCommand },
    ...hero.terminalCommits.map((text) => ({ type: 'output', text })),
  ];

  const [visibleLines, setVisibleLines] = useState(0);
  const lineCount = lines.length;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    // Defer the reset so we never call setState synchronously in the effect body.
    const kickoff = setTimeout(() => {
      setVisibleLines(0);
      if (!active) return;
      let i = 0;
      interval = setInterval(() => {
        i++;
        setVisibleLines(i);
        if (i >= lineCount) clearInterval(interval);
      }, 200);
    }, 0);
    return () => {
      clearTimeout(kickoff);
      if (interval) clearInterval(interval);
    };
  }, [active, lineCount]);

  return (
    <div className="terminal-window w-full">
      <div className="terminal-bar">
        <div className="terminal-dot" style={{ background: '#FF5F57' }} />
        <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
        <div className="terminal-dot" style={{ background: '#28CA42' }} />
        <span
          className="ml-3 font-mono text-xs"
          style={{ color: '#6B7280', fontFamily: 'JetBrains Mono, monospace' }}
        >
          {hero.terminalTitle}
        </span>
      </div>
      <div className="terminal-body">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.type === 'prompt' && (
              <>
                <span className="terminal-prompt">❯</span>
                <span style={{ color: '#8AAFC4' }}>{line.text}</span>
                <span className="terminal-prompt ml-1">%</span>
              </>
            )}
            {line.type === 'command' && (
              <>
                <span className="terminal-prompt">❯</span>
                <span style={{ color: '#EEFFFF' }}>{line.text}</span>
              </>
            )}
            {line.type === 'output' && (
              <span className="terminal-output pl-4">
                <span className="terminal-highlight">{line.text.split(' ')[0]}</span>{' '}
                <span style={{ color: '#6E8CA0' }}>{line.text.split(' ')[1]}</span>{' '}
                <span>{line.text.split(' ').slice(2).join(' ')}</span>
              </span>
            )}
          </div>
        ))}
        {visibleLines < lines.length && active && <span className="terminal-cursor" />}
      </div>
    </div>
  );
};

// ─── Vignette 2: SVG Architecture Diagram ────────────────────────────────────
const DiagramVignette: React.FC<{ active: boolean }> = ({ active }) => {
  const [drawing, setDrawing] = useState(false);
  const { label, caption, nodes, arrows, annotations } = hero.diagram;
  const NODE_W = 100;
  const NODE_H = 44;

  useEffect(() => {
    let draw: ReturnType<typeof setTimeout> | undefined;
    const kickoff = setTimeout(() => {
      setDrawing(false);
      if (active) draw = setTimeout(() => setDrawing(true), 100);
    }, 0);
    return () => {
      clearTimeout(kickoff);
      if (draw) clearTimeout(draw);
    };
  }, [active]);

  const pathClass = `diagram-path ${drawing ? 'drawing' : ''}`;

  return (
    <div className="diagram-container w-full">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6E8CA0', fontSize: '10px' }}
        >
          {label}
        </span>
      </div>
      <svg
        viewBox="0 0 520 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        style={{ overflow: 'visible' }}
      >
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <rect
              x={node.x}
              y={node.y}
              width={NODE_W}
              height={NODE_H}
              rx="8"
              fill="rgba(245,240,235,0.9)"
              stroke="#6E8CA0"
              strokeWidth="1.5"
              className={pathClass}
              style={{
                strokeDasharray: 'none',
                strokeDashoffset: 'unset',
                opacity: drawing ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.25}s`,
              }}
            />
            <text
              x={node.x + NODE_W / 2}
              y={node.y + 18}
              textAnchor="middle"
              fill="#3B3B3B"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
              style={{
                opacity: drawing ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.25 + 0.1}s`,
              }}
            >
              {node.label}
            </text>
            <text
              x={node.x + NODE_W / 2}
              y={node.y + 33}
              textAnchor="middle"
              fill="#6E8CA0"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              style={{
                opacity: drawing ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.25 + 0.15}s`,
              }}
            >
              {node.sub}
            </text>
          </g>
        ))}

        {/* Arrows */}
        {arrows.map((arrow, i) => (
          <path
            key={i}
            d={arrow.d}
            stroke="#C2785C"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset={drawing ? '0' : '200'}
            fill="none"
            markerEnd="url(#arrowClay)"
            style={{ transition: `stroke-dashoffset 0.5s ease ${arrow.delay}` }}
          />
        ))}

        {/* Annotation labels */}
        {drawing &&
          annotations.map((a, i) => (
            <text
              key={i}
              x={a.x}
              y={a.y}
              fill="#C2785C"
              fontSize="9"
              fontFamily="JetBrains Mono"
              style={{ opacity: drawing ? 1 : 0, transition: `opacity 0.4s ${a.delay}` }}
            >
              {a.text}
            </text>
          ))}

        {/* Arrowhead marker */}
        <defs>
          <marker id="arrowClay" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#C2785C" />
          </marker>
        </defs>
      </svg>
      <p
        className="mt-3 font-mono text-xs"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: '#6B6B6B',
          fontSize: '11px',
          lineHeight: 1.6,
        }}
      >
        {caption}
      </p>
    </div>
  );
};

// ─── Vignette 3: Typewriter Quote ────────────────────────────────────────────
const TypewriterVignette: React.FC<{ active: boolean }> = ({ active }) => {
  const fullText = `"${hero.quote.text}"`;

  const [displayedText, setDisplayedText] = useState('');
  const [showAttrib, setShowAttrib] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let attrib: ReturnType<typeof setTimeout> | undefined;
    const kickoff = setTimeout(() => {
      setDisplayedText('');
      setShowAttrib(false);
      if (!active) {
        setTyping(false);
        return;
      }
      setTyping(true);
      let i = 0;
      interval = setInterval(() => {
        i++;
        setDisplayedText(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(interval);
          setTyping(false);
          attrib = setTimeout(() => setShowAttrib(true), 400);
        }
      }, 28);
    }, 0);
    return () => {
      clearTimeout(kickoff);
      if (interval) clearInterval(interval);
      if (attrib) clearTimeout(attrib);
    };
  }, [active, fullText]);

  return (
    <div className="w-full max-w-[560px]">
      {/* Opening quote mark */}
      <div
        className="font-serif mb-6 select-none"
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: '5rem',
          lineHeight: 1,
          color: '#C2785C',
          opacity: 0.25,
          marginBottom: '-1rem',
        }}
      >
        &ldquo;
      </div>

      <p className="typewriter-text" style={{ minHeight: '160px' }}>
        {displayedText}
        {typing && <span className="typewriter-cursor" />}
      </p>

      <div
        className="mt-8 flex items-center gap-4"
        style={{
          opacity: showAttrib ? 1 : 0,
          transition: 'opacity 0.6s ease',
          transform: showAttrib ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        {hero.quote.avatar && (
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              width={64}
              height={64}
              src={hero.quote.avatar}
              alt={hero.quote.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <p
            className="font-mono text-sm font-medium"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3B3B3B', fontSize: '13px' }}
          >
            {hero.quote.name}
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B6B6B', fontSize: '12px' }}
          >
            {hero.quote.title}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Hero ────────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const [activeVignette, setActiveVignette] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [, setScrollDelta] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(true);
  const deltaRef = useRef(0);
  const activeRef = useRef(0);

  const THRESHOLD = 120;
  const TOTAL_VIGNETTES = 3;

  const advance = useCallback((dir: number) => {
    const next = activeRef.current + dir;
    if (next < 0) return;
    if (next >= TOTAL_VIGNETTES) {
      // Release lock
      lockRef.current = false;
      setIsLocked(false);
      return;
    }
    activeRef.current = next;
    setActiveVignette(next);
    deltaRef.current = 0;
    setScrollDelta(0);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!lockRef.current) return;
      e.preventDefault();
      deltaRef.current += e.deltaY;
      setScrollDelta(deltaRef.current);

      if (deltaRef.current >= THRESHOLD) {
        advance(1);
      } else if (deltaRef.current <= -THRESHOLD) {
        advance(-1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [advance]);

  // Re-lock if user scrolls back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 10 && !lockRef.current) {
        lockRef.current = true;
        setIsLocked(true);
        activeRef.current = 0;
        setActiveVignette(0);
        deltaRef.current = 0;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vignetteTitles = ['Recent commit', 'Architecture', 'Peer review'];
  const vignetteSubs = ['git log', 'event pipeline', 'code review'];

  return (
    <section
      ref={heroRef}
      data-tour="hero"
      className="relative bg-parchment"
      style={{
        height: '100vh',
        overflow: isLocked ? 'hidden' : 'visible',
        position: isLocked ? 'sticky' : 'relative',
        top: isLocked ? '5%' : 'auto',
      }}
      id="about"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 50%, rgba(110,140,160,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(194,120,92,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="relative h-full flex">
        {/* ─── 60% Left: Vignette stage ─── */}
        <div className="relative flex-[6] h-full overflow-hidden" data-tour="hero-stage">
          {/* Vignette 0: Terminal */}
          <div
            className={`vignette-panel ${activeVignette === 0 ? 'active' : activeVignette > 0 ? 'exiting' : ''}`}
          >
            <TerminalVignette active={activeVignette === 0} />
          </div>

          {/* Vignette 1: Diagram */}
          <div className={`vignette-panel ${activeVignette === 1 ? 'active' : ''}`}>
            <DiagramVignette active={activeVignette === 1} />
          </div>

          {/* Vignette 2: Typewriter */}
          <div className={`vignette-panel ${activeVignette === 2 ? 'active' : ''}`}>
            <TypewriterVignette active={activeVignette === 2} />
          </div>

          {/* Progress + scroll hint */}
          <div className="vignette-progress">
            <div className="flex items-center gap-3">
              <div className="progress-dots">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`progress-dot ${activeVignette === i ? 'active' : ''}`}
                    onClick={() => {
                      activeRef.current = i;
                      setActiveVignette(i);
                      deltaRef.current = 0;
                    }}
                    aria-label={`Go to vignette ${i + 1}`}
                  />
                ))}
              </div>
              <span
                className="font-mono text-xs"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#6B6B6B',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                }}
              >
                {vignetteSubs[activeVignette]}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1" style={{ opacity: 0.4 }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B3B3B"
                strokeWidth="1.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <span
                className="font-mono text-xs"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  color: '#3B3B3B',
                  letterSpacing: '0.1em',
                }}
              >
                {activeVignette < 2 ? 'scroll to advance' : 'scroll to continue'}
              </span>
            </div>
          </div>

          {/* Vignette label top-left */}
          <div className="absolute top-8 left-12 flex items-center gap-3">
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: '#6E8CA0',
                fontSize: '10px',
                letterSpacing: '0.2em',
              }}
            >
              {String(activeVignette + 1).padStart(2, '0')} / 03 — {vignetteTitles[activeVignette]}
            </span>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-graphite/8 self-stretch" />

        {/* ─── 40% Right: Name spine ─── */}
        <div className="name-spine flex-[4]" data-tour="hero-name">
          {/* Eyebrow */}
          <div className="mb-4">
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: '#C2785C',
                fontSize: '10px',
                letterSpacing: '0.25em',
              }}
            >
              {person.role}
            </span>
          </div>

          {/* Name — the spine */}
          <h1
            className="font-serif font-light leading-none tracking-tight"
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              color: '#3B3B3B',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {person.firstName}
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>{person.lastName}</span>
          </h1>

          {/* Thin rule */}
          <div className="my-2 w-12 h-px" style={{ background: '#C2785C' }} />

          {/* Short bio */}
          <p
            className="font-body text-sm leading-relaxed max-w-xs"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#6B6B6B',
              fontSize: '14px',
              lineHeight: 1.75,
            }}
          >
            {person.bio}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {person.skills.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          {/* Location + availability */}
          {person.availability && (
            <div className="mt-10 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: '#28CA42' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: '#28CA42' }}
                />
              </span>
              <span
                className="font-mono text-xs"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#6B6B6B',
                  fontSize: '11px',
                }}
              >
                {person.availability}
                {person.location ? ` · ${person.location}` : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
