import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Left image slides in from left
      tl.fromTo(
        leftImageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1 },
        0
      );

      // Right image slides in from right
      tl.fromTo(
        rightImageRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1 },
        0
      );

      // Headline words fade in with stagger
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
          0.3
        );
      }

      // Rule grows
      tl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6 },
        0.6
      );

      // Subheadline fades in
      tl.fromTo(
        subheadlineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.7
      );

      // CTA buttons fade in
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.9
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([leftImageRef.current, rightImageRef.current], {
              x: 0,
              opacity: 1,
            });
            gsap.set(headlineRef.current, { y: 0, opacity: 1 });
            gsap.set(subheadlineRef.current, { y: 0, opacity: 1 });
            gsap.set(ctaRef.current, { y: 0, opacity: 1 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold - already visible from load animation
      // SETTLE (30%-70%): Hold static
      // EXIT (70%-100%): Elements exit

      // Left image exits to left
      scrollTl.fromTo(
        leftImageRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Right image exits to right
      scrollTl.fromTo(
        rightImageRef.current,
        { x: 0, opacity: 1 },
        { x: '55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Headline exits upward
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subheadline exits downward
      scrollTl.fromTo(
        subheadlineRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // CTA exits downward
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split headline into words for animation
  const headlineWords = content.hero.headline.split(' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen bg-charcoal overflow-hidden z-10"
    >
      {/* Left Image Frame */}
      <div
        ref={leftImageRef}
        className="absolute left-[10vw] md:left-[6vw] top-[14vh] w-[80vw] md:w-[42vw] h-[60vh] md:h-[72vh] image-frame"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.hero.leftImage}
          alt="Intimate wedding moment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Image Frame */}
      <div
        ref={rightImageRef}
        className="absolute left-[10vw] md:left-[52vw] top-[74vh] md:top-[14vh] w-[80vw] md:w-[42vw] h-[60vh] md:h-[72vh] image-frame"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.hero.rightImage}
          alt="Couple in golden field"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Centered Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-hero text-off-white text-center text-shadow max-w-[88vw] leading-[1.1]"
          style={{ willChange: 'transform, opacity' }}
        >
          {headlineWords.map((word, index) => (
            <span key={index} className="word inline-block">
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Decorative Rule */}
        <div
          ref={ruleRef}
          className="w-[120px] h-[1px] bg-off-white/40 mt-8 origin-left"
          style={{ willChange: 'transform' }}
        />

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-6 text-sm md:text-base text-off-white/80 text-center max-w-md font-light tracking-wide"
          style={{ willChange: 'transform, opacity' }}
        >
          {content.hero.subheadline}
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="mt-10 flex items-center gap-6 pointer-events-auto"
          style={{ willChange: 'transform, opacity' }}
        >
          <button
            onClick={() => scrollToSection('closing')}
            className="btn-gold"
          >
            {content.hero.ctaPrimary}
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-xs tracking-[0.15em] uppercase font-mono text-off-white/70 hover:text-off-white transition-colors underline underline-offset-4"
          >
            {content.hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-off-white/40">
          Scroll
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
