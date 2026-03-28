import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/context/ContentContext';
import { X, MapPin, Calendar } from 'lucide-react';
import type { GalleryImage } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeFilter === 'All'
    ? content.gallery.images
    : content.gallery.images.filter(img => 
        img.category.toLowerCase() === activeFilter.toLowerCase()
      );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid items animation
      const tiles = gridRef.current?.querySelectorAll('.gallery-tile');
      if (tiles) {
        tiles.forEach((tile, index) => {
          gsap.fromTo(
            tile,
            { y: 40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: index * 0.08,
              scrollTrigger: {
                trigger: tile,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Parallax on images
          const img = tile.querySelector('img');
          if (img) {
            gsap.fromTo(
              img,
              { y: -12 },
              {
                y: 12,
                ease: 'none',
                scrollTrigger: {
                  trigger: tile,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredImages]);

  const getTileClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'wide':
        return 'md:col-span-2';
      case 'tall':
        return 'md:row-span-2';
      default:
        return '';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full bg-charcoal py-24 md:py-32 z-[80]"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <h2 className="font-display text-small-section text-off-white">
          {content.gallery.title}
        </h2>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3">
          {content.gallery.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-mono border transition-all ${
                activeFilter === filter
                  ? 'border-gold text-gold'
                  : 'border-off-white/20 text-off-white/60 hover:border-off-white/40 hover:text-off-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Mosaic Grid */}
      <div
        ref={gridRef}
        className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5"
      >
        {filteredImages.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className={`gallery-tile relative overflow-hidden border border-off-white/10 cursor-pointer group ${getTileClass(
              image.size
            )}`}
            style={{ aspectRatio: image.size === 'tall' ? '3/4' : image.size === 'wide' ? '16/9' : '4/5' }}
            onClick={() => setLightboxImage(image)}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-300 flex items-end p-4">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-display text-sm tracking-[0.08em] text-off-white mb-1">
                  {image.title}
                </h3>
                <div className="flex items-center gap-1 text-off-white/70">
                  <MapPin className="w-3 h-3" />
                  <span className="font-mono text-[10px] tracking-wide">
                    {image.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-off-white/60 hover:text-off-white transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] flex flex-col md:flex-row gap-6 md:gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[60vh] md:max-h-[80vh] w-auto object-contain"
            />

            <div className="flex flex-col justify-end text-off-white">
              <h3 className="font-display text-xl tracking-[0.08em] mb-3">
                {lightboxImage.title}
              </h3>
              <div className="space-y-2 text-off-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-mono text-xs tracking-wide">
                    {lightboxImage.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-mono text-xs tracking-wide">
                    {lightboxImage.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
