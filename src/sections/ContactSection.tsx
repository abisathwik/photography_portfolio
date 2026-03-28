import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/context/ContentContext';
import { Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const contentBoxRef = useRef<HTMLDivElement>(null);

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

      // Content elements stagger in
      const contentItems = contentBoxRef.current?.querySelectorAll('.content-item');
      if (contentItems) {
        contentItems.forEach((item, index) => {
          scrollTl.fromTo(
            item,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.15 + index * 0.08
          );
        });
      }

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
        [labelRef.current, contentBoxRef.current],
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
      id="contact"
      className="relative w-full h-screen bg-charcoal overflow-hidden z-[60]"
    >
      {/* Left Image Frame */}
      <div
        ref={leftImageRef}
        className="absolute left-[10vw] md:left-[7vw] top-[12vh] w-[80vw] md:w-[40vw] h-[50vh] md:h-[76vh] image-frame"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.contact.leftImage}
          alt="Couple in urban setting"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Image Frame */}
      <div
        ref={rightImageRef}
        className="absolute left-[10vw] md:left-[53vw] top-[62vh] md:top-[12vh] w-[80vw] md:w-[40vw] h-[50vh] md:h-[76vh] image-frame"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.contact.rightImage}
          alt="Quiet portrait"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Section Label - Bottom Left */}
      <div
        ref={labelRef}
        className="absolute left-[10vw] md:left-[7vw] top-[90vh] md:top-[90vh] flex items-center gap-3"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="w-1 h-1 rounded-full bg-gold" />
        <span className="section-label">{content.contact.label}</span>
      </div>

      {/* Contact Content - Bottom Right */}
      <div
        ref={contentBoxRef}
        className="absolute left-[10vw] md:right-[7vw] top-[20vh] md:top-[68vh] w-[80vw] md:w-[32vw] md:text-right z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <p className="content-item text-sm text-off-white/90 font-light leading-relaxed mb-4">
          {content.contact.prompt}
        </p>

        <div className="content-item flex items-center justify-end gap-2 text-gold mb-6">
          <Mail className="w-4 h-4" />
          <span className="font-mono text-xs tracking-wide">
            {content.contact.email}
          </span>
        </div>

        <button
          onClick={scrollToClosing}
          className="content-item btn-gold inline-flex items-center gap-2"
        >
          {content.contact.ctaText}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
