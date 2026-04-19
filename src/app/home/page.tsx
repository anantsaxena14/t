import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ProjectSpotlight from './components/ProjectSpotlight';
import EssayGallery from './components/EssayGallery';
import PeerSignal from './components/PeerSignal';
import WaitlistSection from './components/WaitlistSection';

export default function HomePage() {
  return (
    <main className="relative bg-parchment">
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Header />

      {/* Hero — scroll-jacked vignette system */}
      <HeroSection />

      {/* Spacer so page can scroll after hero releases */}
      <div style={{ height: '1px' }} />

      {/* Project Spotlight — alternating 60/40 */}
      <ProjectSpotlight />

      {/* Essay Gallery — rotated card grid */}
      <EssayGallery />

      {/* Peer Signal — testimonials + GitHub heatmap */}
      <PeerSignal />

      {/* Waitlist CTA — dark section */}
      <WaitlistSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
