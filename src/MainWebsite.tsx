import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import PortfolioSection from './sections/PortfolioSection';
import PackagesSection from './sections/PackagesSection';
import AboutSection from './sections/AboutSection';
import JournalSection from './sections/JournalSection';
import ContactSection from './sections/ContactSection';
import FeatureSection from './sections/FeatureSection';
import GallerySection from './sections/GallerySection';
import ClosingSection from './sections/ClosingSection';

gsap.registerPlugin(ScrollTrigger);

function MainWebsite() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount before setting up global snap
    const timer = setTimeout(() => {
      setupGlobalSnap();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const setupGlobalSnap = () => {
    const pinned = ScrollTrigger.getAll()
      .filter(st => st.vars.pin)
      .sort((a, b) => a.start - b.start);
    
    const maxScroll = ScrollTrigger.maxScroll(window);
    if (!maxScroll || pinned.length === 0) return;

    const pinnedRanges = pinned.map(st => ({
      start: st.start / maxScroll,
      end: (st.end ?? st.start) / maxScroll,
      center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
    }));

    ScrollTrigger.create({
      snap: {
        snapTo: (value: number) => {
          const inPinned = pinnedRanges.some(
            r => value >= r.start - 0.02 && value <= r.end + 0.02
          );
          if (!inPinned) return value;

          const target = pinnedRanges.reduce(
            (closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value)
                ? r.center
                : closest,
            pinnedRanges[0]?.center ?? 0
          );
          return target;
        },
        duration: { min: 0.15, max: 0.35 },
        delay: 0,
        ease: 'power2.out',
      },
    });
  };

  return (
    <div ref={mainRef} className="relative bg-charcoal min-h-screen">
      {/* Film Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Vignette Overlay */}
      <div className="vignette-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - pin: true */}
        <HeroSection />
        
        {/* Section 2: Portfolio - pin: true */}
        <PortfolioSection />
        
        {/* Section 3: Packages - pin: true */}
        <PackagesSection />
        
        {/* Section 4: About - pin: true */}
        <AboutSection />
        
        {/* Section 5: Journal - pin: true */}
        <JournalSection />
        
        {/* Section 6: Contact - pin: true */}
        <ContactSection />
        
        {/* Section 7: Feature - pin: true */}
        <FeatureSection />
        
        {/* Section 8: Gallery - pin: false */}
        <GallerySection />
        
        {/* Section 9: Closing - pin: false */}
        <ClosingSection />
      </main>

      {/* Admin Link (subtle, bottom right) */}
      <a
        href="/admin"
        className="fixed bottom-4 right-4 z-50 font-mono text-[9px] tracking-wide text-off-white/20 hover:text-gold transition-colors"
      >
        Admin
      </a>
    </div>
  );
}

export default MainWebsite;
