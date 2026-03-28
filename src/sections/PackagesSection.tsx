import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/context/ContentContext';
import { Camera, Sun, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  camera: Camera,
  sun: Sun,
  sparkles: Sparkles,
};

const PackagesSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        leftImageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rightImageRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        labelRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Package list items stagger in
      const listItems = listRef.current?.querySelectorAll('.package-item');
      if (listItems) {
        listItems.forEach((item, index) => {
          scrollTl.fromTo(
            item,
            { x: '10vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.1 + index * 0.06
          );
        });
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.25
      );

      // SETTLE (30%-70%) hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        leftImageRef.current,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightImageRef.current,
        { x: 0, opacity: 1 },
        { x: '28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, listRef.current, ctaRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToClosing = () => {
    const element = document.getElementById('closing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="packages"
      className="relative w-full h-screen bg-charcoal overflow-hidden z-30"
    >
      {/* Left Image Frame */}
      <div
        ref={leftImageRef}
        className="absolute left-[7vw] top-[12vh] w-[40vw] h-[76vh] image-frame"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.packages.leftImage}
          alt="Wedding detail shot"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Image Frame */}
      <div
        ref={rightImageRef}
        className="absolute left-[53vw] top-[12vh] w-[40vw] h-[76vh] image-frame"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.packages.rightImage}
          alt="Wedding reception moment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Section Label - Bottom Left */}
      <div
        ref={labelRef}
        className="absolute left-[7vw] top-[90vh] flex items-center gap-3"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="w-1 h-1 rounded-full bg-gold" />
        <span className="section-label">{content.packages.label}</span>
      </div>

      {/* Package List - Right Side Overlay */}
      <div
        ref={listRef}
        className="absolute left-[58vw] top-[52vh] w-[32vw] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="space-y-5">
          {content.packages.packages.map((pkg) => {
            const IconComponent = iconMap[pkg.icon] || Camera;
            return (
              <div
                key={pkg.id}
                className="package-item flex items-start gap-4 text-off-white"
              >
                <IconComponent className="w-4 h-4 mt-1 text-gold flex-shrink-0" />
                <div>
                  <h3 className="font-display text-sm tracking-[0.1em] uppercase mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-off-white/60 font-light">
                    {pkg.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Link */}
        <button
          ref={ctaRef}
          onClick={scrollToClosing}
          className="mt-8 text-xs tracking-[0.15em] uppercase font-mono text-gold hover:text-off-white transition-colors underline underline-offset-4"
          style={{ willChange: 'transform, opacity' }}
        >
          {content.packages.ctaText}
        </button>
      </div>
    </section>
  );
};

export default PackagesSection;
