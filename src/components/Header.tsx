'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { site, person, nav } from '@/config/portfolio';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header links = configured nav links + a résumé link (if a résumé is set).
  const links = [
    ...nav.links,
    ...(person.resumeUrl
      ? [{ label: 'Resume', href: person.resumeUrl, target: '_blank', download: true }]
      : []),
  ];

  return (
    <header
      data-tour="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-glass py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <AppLogo src={site.logo} size={60} />
          <span
            className="font-mono text-lg font-600 tracking-tight text-graphite group-hover:text-clay transition-colors duration-300"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
          >
            {site.brand}
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...('target' in item ? { target: item.target } : {})}
              className="hover-underline font-body text-sm font-medium text-graphite-light hover:text-graphite transition-colors duration-200"
              style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B6B6B' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        {nav.cta.label && (
          <a
            href={nav.cta.href}
            className="magnetic-btn hidden md:inline-flex text-sm font-semibold px-5 py-2.5 rounded-full border border-graphite/20 text-graphite hover:border-clay hover:text-clay transition-all duration-300"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {nav.cta.label}
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
