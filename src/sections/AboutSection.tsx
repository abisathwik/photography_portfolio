import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/context/ContentContext';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);

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

      scrollTl.fromTo(
        paragraphRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
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

      // Paragraph fades last
      scrollTl.fromTo(
        paragraphRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full h-screen bg-charcoal overflow-hidden z-40"
    >
      {/* Left Image Frame */}
      <div
        ref={leftImageRef}
        className="absolute left-[7vw] top-[12vh] w-[40vw] h-[76vh] image-frame"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.about.leftImage}
          alt="Photographer in action"
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
          src={content.about.rightImage}
          alt="Photographer portrait"
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
        <span className="section-label">{content.about.label}</span>
      </div>

      {/* Paragraph - Bottom Right */}
      <div
        ref={paragraphRef}
        className="absolute right-[7vw] top-[78vh] w-[32vw] text-right z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <p className="text-sm text-off-white/90 font-light leading-relaxed mb-4">
          {content.about.paragraph}
        </p>
        <button className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-mono text-gold hover:text-off-white transition-colors group">
          {content.about.linkText}
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
