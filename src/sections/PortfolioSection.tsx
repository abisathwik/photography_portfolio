import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

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
        dividerRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        labelRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        microcopyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 0.7, ease: 'none' },
        0.2
      );

      // SETTLE (30%-70%): Hold - no animation

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
        [labelRef.current, microcopyRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        dividerRef.current,
        { scaleY: 1 },
        { scaleY: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full h-screen bg-charcoal overflow-hidden z-20"
    >
      {/* Left Image Frame */}
      <div
        ref={leftImageRef}
        className="absolute left-[7vw] top-[12vh] w-[40vw] h-[76vh] image-frame"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.portfolio.leftImage}
          alt="Editorial wedding portrait"
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
          src={content.portfolio.rightImage}
          alt="Groom portrait"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vertical Divider */}
      <div
        ref={dividerRef}
        className="absolute left-1/2 top-[12vh] h-[76vh] w-[1px] bg-off-white/25 origin-top"
        style={{ willChange: 'transform' }}
      />

      {/* Section Label - Bottom Left */}
      <div
        ref={labelRef}
        className="absolute left-[7vw] top-[90vh] flex items-center gap-3"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="w-1 h-1 rounded-full bg-gold" />
        <span className="section-label">{content.portfolio.label}</span>
      </div>

      {/* Microcopy - Bottom Right */}
      <p
        ref={microcopyRef}
        className="absolute right-[7vw] top-[90vh] text-xs text-off-white/60 max-w-[280px] text-right font-light"
        style={{ willChange: 'transform, opacity' }}
      >
        {content.portfolio.microcopy}
      </p>
    </section>
  );
};

export default PortfolioSection;
