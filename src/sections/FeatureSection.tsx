import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/context/ContentContext';
import { Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const trustLineRef = useRef<HTMLDivElement>(null);

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
        bgImageRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Statement words stagger in
      const words = statementRef.current?.querySelectorAll('.word');
      if (words) {
        words.forEach((word, index) => {
          scrollTl.fromTo(
            word,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.1 + index * 0.04
          );
        });
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.25
      );

      scrollTl.fromTo(
        trustLineRef.current,
        { opacity: 0 },
        { opacity: 0.75, ease: 'none' },
        0.3
      );

      // SETTLE (30%-70%) hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        statementRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.98, opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        trustLineRef.current,
        { opacity: 0.75 },
        { opacity: 0, ease: 'power2.in' },
        0.74
      );

      // Background subtle zoom
      scrollTl.fromTo(
        bgImageRef.current,
        { scale: 1 },
        { scale: 1.04, ease: 'none' },
        0.7
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

  // Split statement into words for animation
  const statementWords = content.feature.statement.split(' ');

  return (
    <section
      ref={sectionRef}
      id="feature"
      className="relative w-full h-screen overflow-hidden z-[70]"
    >
      {/* Full-bleed Background Image */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.feature.backgroundImage}
          alt="Bridal portrait"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-charcoal/45" />
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Statement */}
        <h2
          ref={statementRef}
          className="font-display text-section text-off-white text-center text-shadow max-w-[74vw] leading-[1.1]"
          style={{ willChange: 'transform, opacity' }}
        >
          {statementWords.map((word, index) => (
            <span key={index} className="word inline-block">
              {word}{' '}
            </span>
          ))}
        </h2>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToClosing}
          className="mt-12 btn-gold flex items-center gap-3"
          style={{ willChange: 'transform, opacity' }}
        >
          <Calendar className="w-4 h-4" />
          {content.feature.ctaText}
        </button>

        {/* Trust Line */}
        <div
          ref={trustLineRef}
          className="mt-8 flex items-center gap-2 text-off-white/70"
          style={{ willChange: 'opacity' }}
        >
          <Clock className="w-3 h-3" />
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase">
            {content.feature.trustLine}
          </span>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
