'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  tags: string[];
  annotation: string;
  year: string;
  embed: 'code' | 'cli' | 'metrics';
  reversed?: boolean;
}

const projects: Project[] = [
{
    id: 'modmesh',
    number: '01',
    title: 'Terraform Module Mesh',
    tagline: 'A composable infrastructure-as-code framework for multi-environment Azure provisioning — 40% faster deployments.',
    tags: ['Terraform', 'Azure', 'platform-engineering', 'open-source'],
    annotation: `Started as a 2am frustration: every Terraform setup I inherited was either copy-pasted spaghetti or had hardcoded values buried in modules. So I built a mesh architecture that doesn't.

It uses a hierarchical composition pattern with environment-aware variable injection — no duplication, just DRY modules and clean separation of concerns. Ships with built-in validation, drift detection, and automated documentation generation.`,
    year: '2025',
    embed: 'code',
    reversed: false,
  },
  {
    id: 'cicdscheduler',
    number: '02',
    title: 'GitHub Actions Pipeline Orchestrator',
    tagline: 'Event-driven CI/CD scheduler with matrix strategy optimization and GitHub Copilot integration.',
    tags: ['Terraform', 'GitHub-Actions', 'YAML', 'automation'],
    annotation: `The problem: a monorepo where build times were unpredictable. Downstream jobs were queuing for hours or failing due to resource contention depending on the day.

The orchestrator uses Terraform to provision dynamic runner pools based on queue depth, with intelligent matrix splitting and reusable workflow composition. Build times dropped from 45 minutes to 8 minutes average.`,
    year: '2025',
    embed: 'cli',
    reversed: true,
  },
  {
    id: 'ghasguard',
    number: '03',
    title: 'GHAS Security Automation',
    tagline: 'GitHub Advanced Security implementation with policy-as-code — vulnerabilities caught in minutes, not months.',
    tags: ['Terraform', 'GHAS', 'security', 'policy-as-code'],
    annotation: `What's next. Still evolving — the policy engine is solid, the reporting dashboards are in progress.

Terraform-managed GHAS rollout across 200+ repos with custom CodeQL queries, secret scanning alerts routed to Slack, and dependency review gates in PRs. The part I'm most proud of: the policy framework that auto-remediates common issues without human intervention.`,
    year: '2026 ↗',
    embed: 'metrics',
    reversed: false,
  },
];

// ─── Code Embed ───────────────────────────────────────────────────────────────
const CodeEmbed: React.FC = () => (
  <div className="code-embed">
    <div className="code-header">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#28CA42' }} />
      </div>
      <span
        className="font-mono text-xs ml-3"
        style={{ fontFamily: 'JetBrains Mono, monospace', color: '#546E7A', fontSize: '11px' }}
      >
        local.tf
      </span>
    </div>
    <div className="code-body">
      <pre
        style={{
          margin: 0,
          whiteSpace: 'pre',
          color: '#EEFFFF',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '13px',
          lineHeight: 1.9,
        }}
      >
        <span className="tok-comment">// Single-producer, single-consumer ring buffer</span>
        {'\n'}
        <span className="tok-comment">// Capacity must be a power of two</span>
        {'\n'}
        <span className="tok-keyword">pub struct </span>
        <span className="tok-type">RingBuf</span>
        <span className="tok-punct">{'<T>'}</span> <span className="tok-punct">{'{'}</span>
        {'\n'}
        {'    '}
        <span className="tok-var">head</span>
        <span className="tok-punct">: </span>
        <span className="tok-type">AtomicUsize</span>
        <span className="tok-punct">,</span>
        {'\n'}
        {'    '}
        <span className="tok-var">tail</span>
        <span className="tok-punct">: </span>
        <span className="tok-type">AtomicUsize</span>
        <span className="tok-punct">,</span>
        {'\n'}
        {'    '}
        <span className="tok-var">buf</span>
        <span className="tok-punct">: </span>
        <span className="tok-type">Box</span>
        <span className="tok-punct">{'<[MaybeUninit<T>]>'}</span>
        <span className="tok-punct">,</span>
        {'\n'}
        <span className="tok-punct">{'}'}</span>
        {'\n\n'}
        <span className="tok-keyword">impl</span>
        <span className="tok-punct">{'<T>'} </span>
        <span className="tok-type">RingBuf</span>
        <span className="tok-punct">
          {'<T>'} {'{'}
        </span>
        {'\n'}
        {'    '}
        <span className="tok-keyword">pub fn </span>
        <span className="tok-fn">push</span>
        <span className="tok-punct">(&</span>
        <span className="tok-keyword">mut self</span>
        <span className="tok-punct">, </span>
        <span className="tok-var">val</span>
        <span className="tok-punct">: T) -&gt; </span>
        <span className="tok-type">bool </span>
        <span className="tok-punct">{'{'}</span>
        {'\n'}
        {'        '}
        <span className="tok-keyword">let </span>
        <span className="tok-var">tail</span>
        <span className="tok-punct"> = </span>
        <span className="tok-keyword">self</span>
        <span className="tok-punct">.</span>
        <span className="tok-var">tail</span>
        <span className="tok-punct">.</span>
        <span className="tok-fn">load</span>
        <span className="tok-punct">(</span>
        <span className="tok-type">Relaxed</span>
        <span className="tok-punct">);</span>
        {'\n'}
        {'        '}
        <span className="tok-keyword">let </span>
        <span className="tok-var">next</span>
        <span className="tok-punct"> = (</span>
        <span className="tok-var">tail</span>
        <span className="tok-punct"> + </span>
        <span className="tok-num">1</span>
        <span className="tok-punct">) & (</span>
        <span className="tok-keyword">self</span>
        <span className="tok-punct">.</span>
        <span className="tok-var">buf</span>
        <span className="tok-punct">.</span>
        <span className="tok-fn">len</span>
        <span className="tok-punct">() - </span>
        <span className="tok-num">1</span>
        <span className="tok-punct">);</span>
        {'\n'}
        {'        '}
        <span className="tok-keyword">if </span>
        <span className="tok-var">next</span>
        <span className="tok-punct"> == </span>
        <span className="tok-keyword">self</span>
        <span className="tok-punct">.</span>
        <span className="tok-var">head</span>
        <span className="tok-punct">.</span>
        <span className="tok-fn">load</span>
        <span className="tok-punct">(</span>
        <span className="tok-type">Acquire</span>
        <span className="tok-punct">) {'{'} </span>
        <span className="tok-keyword">return </span>
        <span className="tok-num">false</span>
        <span className="tok-punct">; {'}'}</span>
        {'\n'}
        {'        '}
        <span className="tok-comment">// safety: slot is ours until head advances</span>
        {'\n'}
        {'        '}
        <span className="tok-keyword">unsafe </span>
        <span className="tok-punct">{'{'} </span>
        <span className="tok-keyword">self</span>
        <span className="tok-punct">.</span>
        <span className="tok-var">buf</span>
        <span className="tok-punct">[</span>
        <span className="tok-var">tail</span>
        <span className="tok-punct">].</span>
        <span className="tok-fn">write</span>
        <span className="tok-punct">(</span>
        <span className="tok-var">val</span>
        <span className="tok-punct">); {'}'}</span>
        {'\n'}
        {'        '}
        <span className="tok-keyword">self</span>
        <span className="tok-punct">.</span>
        <span className="tok-var">tail</span>
        <span className="tok-punct">.</span>
        <span className="tok-fn">store</span>
        <span className="tok-punct">(</span>
        <span className="tok-var">next</span>
        <span className="tok-punct">, </span>
        <span className="tok-type">Release</span>
        <span className="tok-punct">);</span>
        {'\n'}
        {'        '}
        <span className="tok-num">true</span>
        {'\n'}
        {'    '}
        <span className="tok-punct">{'}'}</span>
        {'\n'}
        <span className="tok-punct">{'}'}</span>
      </pre>
    </div>
  </div>
);

// ─── CLI Embed ────────────────────────────────────────────────────────────────
const CliEmbed: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { prompt: true, text: 'scheduler run --workers 8 --deadline 50ms' },
    { prompt: false, text: '⠸ Booting work-stealing pool (8 workers)...' },
    { prompt: false, text: '✓ Pool ready in 2.1ms' },
    { prompt: false, text: '' },
    { prompt: false, text: '┌─ Task throughput ────────────────────┐' },
    { prompt: false, text: '│  enqueued   12,440 tasks/s           │' },
    { prompt: false, text: '│  completed  12,438 tasks/s           │' },
    { prompt: false, text: '│  shed (OoD)     2 tasks/s            │' },
    { prompt: false, text: '└──────────────────────────────────────┘' },
    { prompt: false, text: '' },
    { prompt: false, text: '  p50    8ms   ████░░░░░░░░░░░░░░' },
    { prompt: false, text: '  p95   22ms   ███████░░░░░░░░░░░' },
    { prompt: false, text: '  p99   38ms   ████████████░░░░░░' },
    { prompt: false, text: '  max   51ms   █████████████████░' },
  ];

  useEffect(() => {
    setStep(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStep(i);
      if (i >= steps.length) clearInterval(interval);
    }, 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-window w-full">
      <div className="terminal-bar">
        <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#28CA42' }} />
        <span
          className="ml-3 font-mono text-xs"
          style={{ color: '#6B7280', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}
        >
          scheduler demo
        </span>
      </div>
      <div className="terminal-body" style={{ minHeight: '260px' }}>
        {steps.slice(0, step).map((s, i) => (
          <div key={i} className={s.prompt ? 'flex gap-2' : ''}>
            {s.prompt ? (
              <>
                <span className="terminal-prompt">❯</span>
                <span style={{ color: '#EEFFFF' }}>{s.text}</span>
              </>
            ) : (
              <span
                style={{
                  color: s.text.startsWith('  p')
                    ? '#C3E88D'
                    : s.text.startsWith('│') || s.text.startsWith('┌') || s.text.startsWith('└')
                      ? '#6E8CA0'
                      : '#8B9BAA',
                }}
              >
                {s.text}
              </span>
            )}
          </div>
        ))}
        {step < steps.length && <span className="terminal-cursor" />}
      </div>
    </div>
  );
};

// ─── Metrics Embed ────────────────────────────────────────────────────────────
const MetricsEmbed: React.FC = () => {
  const metrics = [
    { label: 'Vaults synced', value: '—', note: 'beta soon' },
    { label: 'Merge conflicts resolved', value: '100%', note: 'automatic' },
    { label: 'Offline-first', value: '✓', note: 'IndexedDB backed' },
    { label: 'Devices per vault', value: '∞', note: 'no limit' },
  ];

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.5)',
        border: '1px solid rgba(110,140,160,0.15)',
        boxShadow: '0 20px 60px -20px rgba(42,42,42,0.08)',
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{
          borderBottom: '1px solid rgba(110,140,160,0.1)',
          background: 'rgba(245,240,235,0.8)',
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: '#C2785C', animation: 'pulse 2s infinite' }}
        />
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: '#6E8CA0',
            fontSize: '10px',
            letterSpacing: '0.2em',
          }}
        >
          obsidian-sync // status
        </span>
        <span
          className="ml-auto font-mono text-xs"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: '#C2785C', fontSize: '10px' }}
        >
          in progress
        </span>
      </div>

      {/* Sketch note */}
      <div className="px-6 pt-5 pb-3">
        <p
          className="font-serif italic text-sm leading-relaxed"
          style={{ fontFamily: 'Fraunces, serif', color: '#6B6B6B', fontSize: '14px' }}
        >
          "A sketch, not a render. The diff viewer is still a whiteboard photo."
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(110,140,160,0.1)' }}>
        {metrics.map((m, i) => (
          <div key={i} className="px-6 py-5" style={{ background: 'rgba(245,240,235,0.6)' }}>
            <div
              className="font-mono text-2xl font-bold mb-1"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3B3B3B' }}
            >
              {m.value}
            </div>
            <div
              className="text-xs font-medium mb-0.5"
              style={{ fontFamily: 'DM Sans, sans-serif', color: '#3B3B3B', fontSize: '12px' }}
            >
              {m.label}
            </div>
            <div
              className="text-xs"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: '#6E8CA0',
                fontSize: '10px',
              }}
            >
              {m.note}
            </div>
          </div>
        ))}
      </div>

      {/* GitHub CTA inside embed */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ borderTop: '1px solid rgba(110,140,160,0.1)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#3B3B3B">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        <span
          className="font-mono text-xs"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6B6B6B', fontSize: '11px' }}
        >
          github.com/mSingh/obsidian-sync
        </span>
        <span className="ml-auto tag-pill">WIP</span>
      </div>
    </div>
  );
};

// ─── Project Row ──────────────────────────────────────────────────────────────
const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  const EmbedComponent =
    project.embed === 'code' ? CodeEmbed : project.embed === 'cli' ? CliEmbed : MetricsEmbed;

  return (
    <div
      ref={rowRef}
      className={`project-section ${project.reversed ? 'reversed' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition:
          'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
        borderTop: index > 0 ? '1px solid rgba(59,59,59,0.06)' : 'none',
      }}
    >
      {/* Embed side */}
      <div
        className="project-embed"
        style={{ background: index % 2 === 0 ? 'var(--parchment)' : 'var(--parchment-dark)' }}
      >
        <EmbedComponent />
      </div>

      {/* Annotation side */}
      <div
        className="project-annotation"
        style={{ background: index % 2 === 0 ? 'var(--parchment-dark)' : 'var(--parchment)' }}
      >
        <div className="annotation-number">
          {project.number} — {project.year}
        </div>
        <div className="section-divider" />

        <h2
          className="font-serif font-medium mb-3 leading-tight"
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            color: '#3B3B3B',
            lineHeight: 1.15,
          }}
        >
          {project.title}
        </h2>

        <p
          className="font-body text-sm mb-6 leading-relaxed"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            color: '#6E8CA0',
            fontSize: '14px',
            fontStyle: 'italic',
          }}
        >
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* First-person annotation */}
        <div className="relative pl-5" style={{ borderLeft: '2px solid rgba(194,120,92,0.3)' }}>
          {project.annotation.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="font-body text-sm leading-relaxed mb-4 last:mb-0"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: '#6B6B6B',
                fontSize: '14px',
                lineHeight: 1.8,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* GitHub link */}
        <div className="mt-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View source
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectSpotlight: React.FC = () => (
  <section id="work" className="bg-parchment">
    <div
      className="max-w-7xl mx-auto px-8 pt-24 pb-8"
      style={{ borderBottom: '1px solid rgba(59,59,59,0.06)' }}
    >
      <span
        className="font-mono text-xs tracking-widest uppercase"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: '#6E8CA0',
          fontSize: '10px',
          letterSpacing: '0.25em',
        }}
      >
        Selected Work
      </span>
      <h2
        className="font-serif font-light mt-3 leading-tight"
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: '#3B3B3B',
          lineHeight: 1.1,
        }}
      >
        Things I've shipped
      </h2>
    </div>

    <div>
      {projects.map((project, i) => (
        <ProjectRow key={project.id} project={project} index={i} />
      ))}
    </div>
  </section>
);

export default ProjectSpotlight;
