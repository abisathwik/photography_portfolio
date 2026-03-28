import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/context/ContentContext';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const JournalSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

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

      // Posts stagger in from right
      const posts = postsRef.current?.querySelectorAll('.post-item');
      if (posts) {
        posts.forEach((post, index) => {
          scrollTl.fromTo(
            post,
            { x: '8vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.1 + index * 0.07
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
        [labelRef.current, postsRef.current],
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
      id="journal"
      className="relative w-full h-screen bg-charcoal overflow-hidden z-50"
    >
      {/* Left Image Frame */}
      <div
        ref={leftImageRef}
        className="absolute left-[10vw] md:left-[7vw] top-[12vh] w-[80vw] md:w-[40vw] h-[50vh] md:h-[76vh] image-frame"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={content.journal.leftImage}
          alt="Wedding venue"
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
          src={content.journal.rightImage}
          alt="Candid wedding moment"
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
        <span className="section-label">{content.journal.label}</span>
      </div>

      {/* Posts - Bottom Right */}
      <div
        ref={postsRef}
        className="absolute left-[10vw] md:right-[7vw] top-[20vh] md:top-[68vh] w-[80vw] md:w-[32vw] md:text-right z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="space-y-4">
          {content.journal.posts.map((post) => (
            <div
              key={post.id}
              className="post-item group cursor-pointer"
            >
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/40 block mb-1">
                {post.category}
              </span>
              <h3 className="font-display text-sm tracking-[0.08em] text-off-white group-hover:text-gold transition-colors flex items-center gap-2">
                {post.title}
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
            </div>
          ))}
        </div>

        {/* Browse Link */}
        <button className="mt-6 text-xs tracking-[0.15em] uppercase font-mono text-gold hover:text-off-white transition-colors underline underline-offset-4">
          {content.journal.linkText}
        </button>
      </div>
    </section>
  );
};

export default JournalSection;
