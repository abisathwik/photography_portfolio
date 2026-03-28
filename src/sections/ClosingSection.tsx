import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/context/ContentContext';
import {
  Mail,
  Instagram,
  MapPin,
  Send,
  Check,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ClosingSection = () => {
  const { content, addSubmission } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    location: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields stagger animation
      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        formFields.forEach((field, index) => {
          gsap.fromTo(
            field,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.2 + index * 0.08,
              scrollTrigger: {
                trigger: formRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add submission to database
    addSubmission(formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        date: '',
        location: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="relative w-full bg-warm-gray py-24 md:py-32 z-[90]"
    >
      {/* Subtle grain overlay for this section */}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            <h2
              ref={headlineRef}
              className="font-display text-small-section text-off-white mb-6"
            >
              {content.closing.headline}
            </h2>

            <div ref={contentRef} className="space-y-6">
              <p className="text-sm text-off-white/80 font-light leading-relaxed">
                {content.closing.body}
              </p>

              {/* Contact Details */}
              <div className="space-y-3 pt-4">
                <a
                  href={`mailto:${content.closing.email}`}
                  className="flex items-center gap-3 text-off-white/70 hover:text-gold transition-colors group"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-mono text-xs tracking-wide">
                    {content.closing.email}
                  </span>
                </a>

                <a
                  href={`https://instagram.com/${content.closing.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-off-white/70 hover:text-gold transition-colors group"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="font-mono text-xs tracking-wide">
                    {content.closing.instagram}
                  </span>
                </a>

                <div className="flex items-center gap-3 text-off-white/70">
                  <MapPin className="w-4 h-4" />
                  <span className="font-mono text-xs tracking-wide">
                    {content.closing.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="form-field">
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-off-white/20 py-2 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div className="form-field">
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-off-white/20 py-2 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Event Date */}
                <div className="form-field">
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-off-white/20 py-2 text-off-white text-sm focus:border-gold focus:outline-none transition-colors [color-scheme:dark]"
                  />
                </div>

                {/* Location */}
                <div className="form-field">
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-off-white/20 py-2 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-field">
                <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-off-white/20 py-2 text-off-white text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your vision..."
                />
              </div>

              {/* Submit Button */}
              <div className="form-field pt-4">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full md:w-auto px-8 py-4 flex items-center justify-center gap-3 text-xs tracking-[0.15em] uppercase font-mono transition-all ${
                    isSubmitted
                      ? 'bg-green-600 text-white'
                      : 'bg-gold text-charcoal hover:bg-off-white'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      Inquiry Sent
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {content.closing.formCta}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-off-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/40">
            {content.closing.footer}
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/40">
            {content.closing.stats}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
