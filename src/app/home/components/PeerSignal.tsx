'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import AppImage from '@/components/ui/AppImage';
import { getGithubContributions, GithubStats } from './getGithubContributions';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  linkedin: string;
  company: string;
  avatar: string;
  context: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "His deep dive on GitHub Advanced Security integration was eye-opening. YourName doesn't just implement tools—he architects secure-by-default pipelines. The way he explained GHAS to our team made adoption immediate.",
    name: 'Sumit Kumar',
    title: 'Senior Application Engineer',
    linkedin: "https://www.linkedin.com/in/vipin-k-singh/",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFox9ZZrFrZ2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712355884709?e=1778716800&v=beta&t=M4p6yFdBh51D9MyjtDsIlQswinuP54bPpBeasLBR46w",
    company: 'SAP Labs',
    context: 'After a conference talk',
  }
];

// Maps a raw contribution count to a 0–4 level for colour bucketing
export const getContribLevel = (count: number): number => {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
};

/**
 * Converts a flat array of { date, count } objects from the GitHub API into a
 * 52-column × 7-row grid where:
 *   - each column is a calendar week (oldest → newest, left → right)
 *   - each row is a weekday (0 = Sun … 6 = Sat)
 *
 * Fix vs. original:
 *   - Uses the *position* of each day in the sorted array rather than a
 *     year-relative week index, so a rolling 52-week window always fills
 *     exactly 52–53 columns with no gaps or off-by-one misalignment.
 *   - Stores contribution *levels* (0–4) instead of raw counts so the colour
 *     function receives the values it expects.
 */
export const transformContribData = (res: GithubStats): number[][] => {
  const { days } = res
  // Sort ascending so week 0 is the oldest
  const sorted = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const weeks: number[][] = [];

  sorted.forEach((day) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay(); // 0 Sun – 6 Sat

    // Start a new column on every Sunday (or for the very first entry)
    if (dayOfWeek === 0 || weeks.length === 0) {
      weeks.push(Array(7).fill(0));
    }

    const currentWeek = weeks[weeks.length - 1];
    currentWeek[dayOfWeek] = getContribLevel(day.count);
  });

  return weeks;
};

// GitHub contribution heatmap mock
const generateContribData = async () => {
  const res = await getGithubContributions('vpnsin');
  const contribData = transformContribData(res);
  return { res, contribData };
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
  const [userData, setUserData] = React.useState<{ res: GithubStats; contribData: number[][]; }>({ res: {} as GithubStats, contribData: [] });

  React.useEffect(() => {
    generateContribData().then(setUserData);
  }, []);

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
                  className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white ring-opacity-10"
                >
                  <AppImage
                    src={testimonials[0].avatar}
                    alt={`${testimonials[0].name}, ${testimonials[0].title} at ${testimonials[0].company}`}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                    onClick={() => window.open(testimonials[0].linkedin, '_blank')}
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
                      onClick={() => window.open(t.linkedin, '_blank')}
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
              {userData?.res?.total && <p
                className="font-serif font-medium"
                style={{ fontFamily: 'Fraunces, serif', color: '#3B3B3B', fontSize: '18px' }}
              >
                {userData.res.total} contributions in the last year
              </p>}
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
              {userData?.contribData?.length === 0 ? (
                <div style={{ color: "#6B6B6B", fontSize: 12 }}>Loading...</div>
              ) : (
                userData?.contribData.map((week, wi) => (
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
                )))}
            </div>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6"
            style={{ borderTop: '1px solid rgba(59,59,59,0.06)' }}
          >
            {[
              { label: 'Public repos', value: userData.res.publicRepos },
              { label: 'Stars earned', value: userData.res.totalStars },
              { label: 'Followers', value: userData.res.followers },
              { label: 'Location', value: userData.res.location },
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
