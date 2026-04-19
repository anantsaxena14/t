'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-glass py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <AppLogo size={60} />
          <span
            className="font-mono text-lg font-600 tracking-tight text-graphite group-hover:text-clay transition-colors duration-300"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
          >
            vpnsin
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Work', href: '#work' },
            { label: 'Findings', href: '#writing' },
            { label: 'Resume', href: 'assets/resume/resume.pdf', target: '_blank', download: true },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover-underline font-body text-sm font-medium text-graphite-light hover:text-graphite transition-colors duration-200"
              style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B6B6B' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#waitlist"
          className="magnetic-btn hidden md:inline-flex text-sm font-semibold px-5 py-2.5 rounded-full border border-graphite/20 text-graphite hover:border-clay hover:text-clay transition-all duration-300"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Save me a seat
        </a>
      </div>
    </header>
  );
};

export default Header;
