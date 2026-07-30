'use client';

import React, { useState, useEffect, useRef } from 'react';
import { newsletter } from '@/config/portfolio';

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const targetCount = newsletter.startCount;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [countAnimated, setCountAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!countAnimated) {
            setCountAnimated(true);
            // Animate counter from 0 → targetCount
            const duration = 2000;
            const startTime = performance.now();
            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * targetCount));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [countAnimated, targetCount]);

  // Simulate occasional new signups
  useEffect(() => {
    if (!countAnimated) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setCount((c) => c + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [countAnimated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Mock submit
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setCount((c) => c + 1);
    }, 1200);
  };

  return (
    <section
      id="newsletter"
      data-tour="newsletter"
      ref={sectionRef}
      className="py-32 px-8"
      style={{
        background: 'var(--dark)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: '#C2785C' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: '#C2785C' }}
                />
              </span>
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#C2785C',
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                }}
              >
                {newsletter.eyebrow}
              </span>
            </div>

            {/* Counter */}
            <div className="mb-6">
              <div className="counter-display" style={{ color: 'rgba(245,240,235,0.95)' }}>
                {count.toLocaleString()}
              </div>
              <p
                className="font-body mt-2"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  color: 'rgba(245,240,235,0.4)',
                  fontSize: '14px',
                }}
              >
                {newsletter.countLabel}
              </p>
            </div>

            {/* Headline */}
            <h2
              className="font-serif font-light leading-tight mb-6"
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: 'rgba(245,240,235,0.95)',
                lineHeight: 1.1,
              }}
            >
              {newsletter.headlineTop}
              <br />
              <span style={{ fontStyle: 'italic', color: '#C2785C' }}>
                {newsletter.headlineBottom}
              </span>
            </h2>

            {/* Promise */}
            <p
              className="leading-relaxed mb-8"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: 'rgba(245,240,235,0.55)',
                fontSize: '15px',
                lineHeight: 1.8,
                maxWidth: '440px',
              }}
            >
              {newsletter.promise}
            </p>

            {/* What you get */}
            <div className="space-y-3">
              {newsletter.bullets.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                    style={{
                      background: 'rgba(110,140,160,0.15)',
                      border: '1px solid rgba(110,140,160,0.3)',
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#6E8CA0' }} />
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      color: 'rgba(245,240,235,0.5)',
                      fontSize: '13px',
                      lineHeight: 1.7,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-6">
            <div
              className="rounded-2xl p-10"
              style={{
                background: 'rgba(245,240,235,0.04)',
                border: '1px solid rgba(245,240,235,0.08)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {!submitted ? (
                <>
                  <p
                    className="font-mono text-xs mb-6 tracking-widest uppercase"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#6E8CA0',
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                    }}
                  >
                    {newsletter.formLabel}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="waitlist-email"
                        className="block font-mono text-xs mb-2 tracking-wide uppercase"
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          color: 'rgba(245,240,235,0.4)',
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                        }}
                      >
                        Email address
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="email-input"
                        style={{
                          background: 'rgba(245,240,235,0.06)',
                          borderColor: 'rgba(245,240,235,0.1)',
                          color: 'rgba(245,240,235,0.9)',
                        }}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="cta-primary w-full flex items-center justify-center gap-2"
                      style={{
                        background: loading ? 'rgba(194,120,92,0.5)' : '#C2785C',
                        color: '#F5F0EB',
                        borderRadius: '10px',
                        padding: '14px 28px',
                        fontSize: '15px',
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        border: 'none',
                      }}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 12a9 9 0 11-6.219-8.56" />
                          </svg>
                          {newsletter.ctaLoadingLabel}
                        </>
                      ) : (
                        <>
                          {newsletter.ctaLabel}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  <p
                    className="mt-4 text-center text-xs"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      color: 'rgba(245,240,235,0.25)',
                      fontSize: '11px',
                    }}
                  >
                    {newsletter.finePrint}
                  </p>

                  {newsletter.repoUrl && (
                    <>
                      {/* Divider */}
                      <div className="flex items-center gap-4 my-8">
                        <div
                          className="flex-1 h-px"
                          style={{ background: 'rgba(245,240,235,0.06)' }}
                        />
                        <span
                          className="font-mono text-xs"
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'rgba(245,240,235,0.2)',
                            fontSize: '10px',
                          }}
                        >
                          or
                        </span>
                        <div
                          className="flex-1 h-px"
                          style={{ background: 'rgba(245,240,235,0.06)' }}
                        />
                      </div>

                      {/* GitHub CTA */}
                      <a
                        href={newsletter.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-medium transition-all duration-300"
                        style={{
                          border: '1px solid rgba(245,240,235,0.1)',
                          color: 'rgba(245,240,235,0.6)',
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '14px',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor =
                            'rgba(245,240,235,0.25)';
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            'rgba(245,240,235,0.9)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor =
                            'rgba(245,240,235,0.1)';
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            'rgba(245,240,235,0.6)';
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        Star the repo instead
                        {newsletter.repoStars && (
                          <span
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-xs"
                            style={{
                              background: 'rgba(245,240,235,0.06)',
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: '10px',
                              color: 'rgba(245,240,235,0.4)',
                            }}
                          >
                            ★ {newsletter.repoStars}
                          </span>
                        )}
                      </a>
                    </>
                  )}
                </>
              ) : (
                /* Success state */
                <div className="text-center py-8">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: 'rgba(194,120,92,0.15)',
                      border: '1px solid rgba(194,120,92,0.3)',
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C2785C"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3
                    className="font-serif font-medium mb-3"
                    style={{
                      fontFamily: 'Fraunces, serif',
                      color: 'rgba(245,240,235,0.9)',
                      fontSize: '22px',
                    }}
                  >
                    Seat saved.
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      color: 'rgba(245,240,235,0.45)',
                      fontSize: '14px',
                      lineHeight: 1.7,
                    }}
                  >
                    Check your inbox for a confirmation. First issue ships when the next build
                    wraps.
                  </p>
                  <div
                    className="mt-6 font-mono text-xs"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#C2785C',
                      fontSize: '11px',
                    }}
                  >
                    You&rsquo;re #{count.toLocaleString()} on the list.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
