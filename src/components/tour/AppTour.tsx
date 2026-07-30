'use client';

/* ============================================================================
 *  AppTour — the "what can I change?" guided walkthrough
 * ----------------------------------------------------------------------------
 *  A self-contained onboarding overlay for people who fork this template. It
 *  spotlights each section of the page and tells you exactly which key in
 *  src/config/portfolio.ts controls it.
 *
 *  - Auto-runs once on a visitor's first load (remembered via localStorage).
 *  - Re-openable any time from the "Customize" button (bottom-right).
 *  - No dependencies: highlight = four dimmed panels framing the target.
 *
 *  Editing the tour itself? Change the STEPS array below.
 * ========================================================================== */

import React, { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'pf-tour-v1';

interface Step {
  /** [data-tour] value of the element to spotlight. Omit for a centered card. */
  target?: string;
  title: string;
  body: string;
  /** Config location shown as a code chip. */
  file?: string;
  keys?: string[];
}

const STEPS: Step[] = [
  {
    title: 'This is a template — make it yours',
    body: 'Almost everything you see is driven by a single file. This 60-second tour points out each section and the exact config key that controls it. Fork the repo, edit the values, deploy.',
    file: 'src/config/portfolio.ts',
  },
  {
    target: 'header',
    title: 'Brand & navigation',
    body: 'Your handle, logo, nav links and the header button. Swap the logo by dropping your own file in /public/assets/images and pointing site.logo at it.',
    file: 'src/config/portfolio.ts',
    keys: ['site.brand', 'site.logo', 'nav.links', 'nav.cta'],
  },
  {
    target: 'hero-name',
    title: 'Your name & pitch',
    body: 'The hero “spine”: your name, role, one-line bio, skill pills, and the availability status dot. Clear person.availability to hide the green dot.',
    file: 'src/config/portfolio.ts',
    keys: ['person.firstName', 'person.lastName', 'person.role', 'person.bio', 'person.skills'],
  },
  {
    target: 'hero-stage',
    title: 'The animated intro',
    body: 'Three scroll-through vignettes: a fake git log, an architecture diagram, and a peer quote. All the text lives in config — the animation stays in HeroSection.tsx.',
    file: 'src/config/portfolio.ts',
    keys: ['hero.terminalCommits', 'hero.diagram', 'hero.quote'],
  },
  {
    target: 'work',
    title: 'Selected work',
    body: 'Your projects. Each row has a title, tagline, tags, a first-person story, a repo link, and a decorative demo (code / cli / metrics). Add or remove entries freely.',
    file: 'src/config/portfolio.ts',
    keys: ['projects[]'],
  },
  {
    target: 'writing',
    title: 'Essays & writing',
    body: 'The rotated card gallery. Point each essay’s href at your blog posts, or delete the whole section if you don’t write — just remove <EssayGallery /> from home/page.tsx.',
    file: 'src/config/portfolio.ts',
    keys: ['essays[]', 'essaysMeta'],
  },
  {
    target: 'peer',
    title: 'Peer signal + live GitHub',
    body: 'Testimonials, plus a real GitHub contribution heatmap and stats. Set social.githubUsername and it fetches live. Add a GITHUB_TOKEN env var to raise the rate limit.',
    file: 'src/config/portfolio.ts',
    keys: ['testimonials[]', 'social.githubUsername'],
  },
  {
    target: 'newsletter',
    title: 'Closing call-to-action',
    body: 'A demo newsletter form (no backend yet). Repurpose the copy, or wire the submit handler to your email provider in WaitlistSection.tsx. Set newsletter.repoUrl to your fork.',
    file: 'src/config/portfolio.ts',
    keys: ['newsletter'],
  },
  {
    title: 'That’s the whole surface',
    body: 'Edit src/config/portfolio.ts, drop your logo + resume into /public/assets, set your GitHub username, then `npm run dev`. The README has a full fork-and-deploy checklist. Happy shipping.',
    file: 'README.md',
  },
];

const PAD = 8; // padding around the spotlighted element

const AppTour: React.FC = () => {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const step = STEPS[index];
  const isFirst = index === 0;
  const isLast = index === STEPS.length - 1;

  const start = useCallback(() => {
    setIndex(0);
    setActive(true);
  }, []);

  const finish = useCallback(() => {
    setActive(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'seen');
    } catch {
      /* ignore private-mode errors */
    }
  }, []);

  // Auto-start once for first-time visitors.
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === 'seen';
    } catch {
      seen = false;
    }
    if (!seen) {
      const t = setTimeout(() => {
        setIndex(0);
        setActive(true);
      }, 900);
      return () => clearTimeout(t);
    }
  }, []);

  // Track the target element's rect while the tour is active.
  useEffect(() => {
    if (!active) return;

    const targetSel = step.target;
    const el = targetSel
      ? (document.querySelector(`[data-tour="${targetSel}"]`) as HTMLElement | null)
      : null;

    const measure = () => setRect(el ? el.getBoundingClientRect() : null);

    if (!el) {
      // Centered card (intro / outro): clear any prior highlight, deferred so we
      // don't call setState synchronously in the effect body.
      const clear = setTimeout(measure, 0);
      return () => clearTimeout(clear);
    }

    // Measure right away (don't rely on rAF, which pauses on hidden tabs)…
    measure();
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // …then re-measure as smooth-scroll settles and on any viewport change.
    const timers = [80, 200, 400, 650].map((ms) => window.setTimeout(measure, ms));
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    // rAF loop is a nice-to-have for buttery tracking when the tab is visible.
    const loop = () => {
      measure();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, index, step.target]);

  // Keyboard controls.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
      else if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, STEPS.length - 1));
      else if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, finish]);

  const next = () => (isLast ? finish() : setIndex((i) => i + 1));
  const back = () => setIndex((i) => Math.max(i - 1, 0));

  // ── Launcher button (always available) ─────────────────────────────────────
  const launcher = (
    <button
      onClick={start}
      aria-label="Take the customization tour"
      className="tour-launcher"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 10050,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '100px',
        border: '1px solid rgba(59,59,59,0.12)',
        background: 'rgba(245,240,235,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 10px 30px -10px rgba(42,42,42,0.25)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px',
        fontWeight: 600,
        color: '#3B3B3B',
        cursor: 'pointer',
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C2785C" strokeWidth="2">
        <path d="M12 3l1.9 4.6L19 9.4l-3.6 3.2.9 5-4.3-2.6L7.7 17.6l.9-5L5 9.4l5.1-1.8L12 3z" />
      </svg>
      Customize
    </button>
  );

  if (!active) return launcher;

  // ── Positioning ────────────────────────────────────────────────────────────
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const CARD_W = Math.min(380, vw - 32);

  let cardTop: number;
  let cardLeft: number;

  if (rect) {
    const spaceBelow = vh - rect.bottom;
    const below = spaceBelow > 240 || spaceBelow > rect.top;
    cardTop = below ? rect.bottom + PAD + 12 : rect.top - PAD - 12 - 300;
    cardTop = Math.max(16, Math.min(cardTop, vh - 260));
    cardLeft = rect.left + rect.width / 2 - CARD_W / 2;
    cardLeft = Math.max(16, Math.min(cardLeft, vw - CARD_W - 16));
  } else {
    // Centered card for intro / outro steps.
    cardTop = vh / 2 - 150;
    cardLeft = vw / 2 - CARD_W / 2;
  }

  const dim = 'rgba(30,28,26,0.62)';
  // Four panels that frame the target, leaving a lit "window" over it.
  const panels = rect
    ? [
        { top: 0, left: 0, width: '100vw', height: Math.max(0, rect.top - PAD) },
        {
          top: rect.bottom + PAD,
          left: 0,
          width: '100vw',
          height: Math.max(0, vh - (rect.bottom + PAD)),
        },
        {
          top: Math.max(0, rect.top - PAD),
          left: 0,
          width: Math.max(0, rect.left - PAD),
          height: rect.height + PAD * 2,
        },
        {
          top: Math.max(0, rect.top - PAD),
          left: rect.right + PAD,
          width: Math.max(0, vw - (rect.right + PAD)),
          height: rect.height + PAD * 2,
        },
      ]
    : [{ top: 0, left: 0, width: '100vw', height: '100vh' }];

  return (
    <>
      {launcher}
      <div style={{ position: 'fixed', inset: 0, zIndex: 10040 }}>
        {/* Dim panels */}
        {panels.map((p, i) => (
          <div
            key={i}
            onClick={next}
            style={{
              position: 'fixed',
              top: p.top,
              left: p.left,
              width: p.width,
              height: p.height,
              background: dim,
              transition: 'all 0.35s cubic-bezier(0.25,1,0.5,1)',
            }}
          />
        ))}

        {/* Highlight ring around the target */}
        {rect && (
          <div
            style={{
              position: 'fixed',
              top: rect.top - PAD,
              left: rect.left - PAD,
              width: rect.width + PAD * 2,
              height: rect.height + PAD * 2,
              border: '2px solid #C2785C',
              borderRadius: '12px',
              boxShadow: '0 0 0 2px rgba(194,120,92,0.25), 0 20px 50px -20px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
              transition: 'all 0.35s cubic-bezier(0.25,1,0.5,1)',
            }}
          />
        )}

        {/* Tooltip card */}
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: cardTop,
            left: cardLeft,
            width: CARD_W,
            zIndex: 10060,
            background: '#F5F0EB',
            border: '1px solid rgba(59,59,59,0.1)',
            borderRadius: '16px',
            boxShadow: '0 30px 70px -20px rgba(42,42,42,0.45)',
            padding: '20px 22px',
            transition:
              'top 0.35s cubic-bezier(0.25,1,0.5,1), left 0.35s cubic-bezier(0.25,1,0.5,1)',
          }}
        >
          {/* Progress */}
          <div className="flex items-center justify-between mb-3">
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C2785C',
                fontWeight: 600,
              }}
            >
              Tour · {String(index + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
            </span>
            <button
              onClick={finish}
              aria-label="Close tour"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                color: '#6B6B6B',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Skip ✕
            </button>
          </div>

          <h3
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: '20px',
              lineHeight: 1.2,
              color: '#3B3B3B',
              marginBottom: '8px',
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13.5px',
              lineHeight: 1.65,
              color: '#5B5B5B',
              marginBottom: step.file ? '14px' : '18px',
            }}
          >
            {step.body}
          </p>

          {/* Config location */}
          {step.file && (
            <div
              style={{
                background: 'rgba(110,140,160,0.08)',
                border: '1px solid rgba(110,140,160,0.18)',
                borderRadius: '10px',
                padding: '10px 12px',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: '#4A6E84',
                  fontWeight: 600,
                }}
              >
                {step.file}
              </div>
              {step.keys && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {step.keys.map((k) => (
                    <span
                      key={k}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '10px',
                        color: '#6E8CA0',
                        background: 'rgba(110,140,160,0.12)',
                        border: '1px solid rgba(110,140,160,0.2)',
                        borderRadius: '6px',
                        padding: '2px 7px',
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={back}
              disabled={isFirst}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: isFirst ? 'rgba(59,59,59,0.25)' : '#6B6B6B',
                background: 'none',
                border: 'none',
                cursor: isFirst ? 'default' : 'pointer',
                padding: '8px 4px',
              }}
            >
              ← Back
            </button>
            <button
              onClick={next}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#F5F0EB',
                background: '#C2785C',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px -8px rgba(194,120,92,0.6)',
              }}
            >
              {isLast ? 'Start building →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppTour;
