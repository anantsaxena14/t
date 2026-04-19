'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  context: string;
}

const testimonials: Testimonial[] = [ 
 
  {
    quote:
      "Vipin's deployment strategy saved us from a critical outage. His understanding of Azure infrastructure and Terraform automation turned a potential disaster into a seamless rollback. The monitoring dashboards he built are still our gold standard.",
    name: 'Linda Chambers',
    title: 'IT Delivery Manager',
    avatar: "https://media.licdn.com/dms/image/v2/C4D03AQGwciuz13HJwg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1610479936431?e=1778112000&v=beta&t=nHwrbi7Qdt0a2zuajNhGnJUQ7Dqg08nbqi9CDtlrtQE",
    company: 'ASDA',
    context: 'On a Production Deployment',
  },
  {
    quote:
      "His deep dive on GitHub Advanced Security integration was eye-opening. Vipin doesn't just implement tools—he architects secure-by-default pipelines. The way he explained GHAS to our team made adoption immediate.",
    name: 'Sumit Kumar',
    title: 'Principal Engineer',
    avatar: "https://media.licdn.com/dms/image/v2/C5603AQH8xWZvY5cirw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1606288093250?e=1778112000&v=beta&t=Pe5xlS84q0KNJ7BiBEC7_PmFDoiI35eQovVhMccTIqc",
    company: 'Salesforce',
    context: 'After a conference talk',
  },
  {
    quote:
      "The platform engineering work Vipin delivered was exceptional. His infrastructure-as-code approach with Terraform and YAML templating made our handover process smooth. Everything was documented, tested, and production-ready from day one.",
    name: 'Maneesh Kumar',
    title: 'IT Project Manager',
    avatar: "https://media.licdn.com/dms/image/v2/D5635AQHbWvDD6wFAdw/profile-framedphoto-shrink_800_800/B56ZUhz.ycGUAk-/0/1740029029952?e=1777161600&v=beta&t=nWQhgwAtF25UoF-aLm-93vpRsqxTWpQX2DAikBV2U8o",
    company: 'West Yorkshire Police',
    context: 'After a HOTO(Handover Takeover) meeting',
  },
  {
    quote:
      "Vipin's MERN stack architecture is handling 80k requests/sec in production. His CI/CD pipelines using GitHub Copilot for code generation and automated testing caught issues before they reached staging. Zero downtime in six months.",
    name: 'Aniket Bhatt',
    title: 'Engineering Manager',
    avatar: "https://media.licdn.com/dms/image/v2/C4E03AQF5SQHFRbsI1g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516359155905?e=1778112000&v=beta&t=8qRrkfbAgtJHYw6_uMQIuw5vPjWoVrVjV5ZFzGutxaE",
    company: 'ASDA',
    context: 'GitHub discussion thread',
  },
  {
    quote:
      "Working alongside Vipin on our Azure cloud migration was a masterclass in DevOps excellence. His Terraform modules for multi-environment provisioning and GitHub Actions workflows reduced our deployment time by 70%. The infrastructure he designed is self-healing and fully observable.",
    name: 'Biswajit Kar',
    title: 'Senior DevOps Engineer',
    avatar: "https://media.licdn.com/dms/image/v2/C4D03AQGQeh00yoX5IA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1635530611405?e=1778112000&v=beta&t=DXstjrR4gcobFdfsFBZNt7GxIUk__jQt_ouadAfjRQ0",
    company: 'TCS',
    context: 'Post cloud migration project',
  },  
];

// GitHub contribution heatmap mock
const generateContribData = () => {
  const weeks = 52;
  const days = 7;
  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => {
      if (d === 0 || d === 6) return Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
      return Math.random() > 0.25 ? Math.floor(Math.random() * 6) + 1 : 0;
    })
  );
};

const getContribColor = (level: number): string => {
  if (level === 0) return 'rgba(59,59,59,0.06)';
  if (level === 1) return 'rgba(110,140,160,0.25)';
  if (level === 2) return 'rgba(110,140,160,0.5)';
  if (level === 3) return 'rgba(110,140,160,0.75)';
  if (level >= 4) return '#6E8CA0';
  return 'rgba(59,59,59,0.06)';
};

const PeerSignal: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const contribData = React.useMemo(() => generateContribData(), []);

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
      ref={sectionRef}
      className="py-32 px-8 bg-parchment"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              color: '#6E8CA0',
              fontSize: '10px',
              letterSpacing: '0.25em',
            }}
          >
            Peer Signal
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
            What colleagues say
          </h2>
        </div>

        {/* Testimonials — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          {/* Large card */}
          <div className="md:col-span-7">
            <div
              className="peer-card h-full"
              style={{ background: '#2A2A2A', borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="font-serif text-5xl mb-4 select-none"
                style={{
                  fontFamily: 'Fraunces, serif',
                  color: '#C2785C',
                  opacity: 0.4,
                  lineHeight: 1,
                }}
              >
                "
              </div>
              <p
                className="font-serif italic leading-relaxed mb-8"
                style={{
                  fontFamily: 'Fraunces, serif',
                  color: 'rgba(245,240,235,0.9)',
                  fontSize: '20px',
                  lineHeight: 1.6,
                }}
              >
                {testimonials[0].quote}
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2"
                  style={{ ringColor: 'rgba(255,255,255,0.1)' }}
                >
                  <AppImage
                    src={testimonials[0].avatar}
                    alt={`${testimonials[0].name}, ${testimonials[0].title} at ${testimonials[0].company}`}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p
                    className="font-mono text-sm font-medium"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'rgba(245,240,235,0.9)',
                      fontSize: '13px',
                    }}
                  >
                    {testimonials[0].name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      color: 'rgba(245,240,235,0.45)',
                      fontSize: '12px',
                    }}
                  >
                    {testimonials[0].title} · {testimonials[0].company}
                  </p>
                </div>
                <div className="ml-auto">
                  <span
                    className="tag-pill"
                    style={{
                      background: 'rgba(110,140,160,0.15)',
                      color: '#8AAFC4',
                      borderColor: 'rgba(110,140,160,0.2)',
                    }}
                  >
                    {testimonials[0].context}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Two small cards */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {testimonials.slice(1).map((t, i) => (
              <div
                key={i}
                className="peer-card flex-1"
                style={{
                  transitionDelay: `${(i + 1) * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${(i + 1) * 100}ms`,
                }}
              >
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    color: '#3B3B3B',
                    fontSize: '14px',
                    lineHeight: 1.75,
                  }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage
                      src={t.avatar}
                      alt={`${t.name}, ${t.title} at ${t.company}`}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="font-mono text-xs font-medium"
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        color: '#3B3B3B',
                        fontSize: '12px',
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        color: '#6B6B6B',
                        fontSize: '11px',
                      }}
                    >
                      {t.title} · {t.company}
                    </p>
                  </div>
                  <span
                    className="ml-auto font-mono text-xs"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#6E8CA0',
                      fontSize: '10px',
                    }}
                  >
                    {t.context}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub contribution heatmap */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(59,59,59,0.06)' }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <p
                className="font-mono text-xs tracking-widest uppercase mb-1"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#6E8CA0',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                }}
              >
                GitHub Activity
              </p>
              <p
                className="font-serif font-medium"
                style={{ fontFamily: 'Fraunces, serif', color: '#3B3B3B', fontSize: '18px' }}
              >
                1,247 contributions in the last year
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-xs"
                style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B6B6B', fontSize: '12px' }}
              >
                Less
              </span>
              {[0, 1, 3, 5, 6].map((level) => (
                <div
                  key={level}
                  className="contrib-cell"
                  style={{ background: getContribColor(level) }}
                />
              ))}
              <span
                className="text-xs"
                style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B6B6B', fontSize: '12px' }}
              >
                More
              </span>
            </div>
          </div>

          {/* Heatmap grid */}
          <div className="overflow-x-auto">
            <div className="flex gap-1" style={{ minWidth: '700px' }}>
              {contribData.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="contrib-cell"
                      style={{ background: getContribColor(day) }}
                      title={`${day} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6"
            style={{ borderTop: '1px solid rgba(59,59,59,0.06)' }}
          >
            {[
              { label: 'Public repos', value: '34' },
              { label: 'Stars earned', value: '2.1k' },
              { label: 'PRs merged', value: '187' },
              { label: 'Issues closed', value: '412' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-mono text-2xl font-bold mb-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3B3B3B' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs"
                  style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B6B6B', fontSize: '12px' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeerSignal;
