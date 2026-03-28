import { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Packages', id: 'packages' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-charcoal/80 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase text-off-white hover:text-gold transition-colors"
          >
            Gadapa Gayathri
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[13px] font-light text-off-white/80 hover:text-off-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('closing')}
              className="btn-gold text-[11px]"
            >
              Book a session
            </button>
            
            {/* Admin Link */}
            <a
              href="/admin"
              className="p-2 text-off-white/40 hover:text-gold transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-off-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-display text-3xl tracking-[0.1em] uppercase text-off-white hover:text-gold transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('closing')}
            className="btn-gold mt-8 text-sm"
          >
            Book a session
          </button>
          
          {/* Mobile Admin Link */}
          <a
            href="/admin"
            className="mt-4 flex items-center gap-2 text-off-white/50 hover:text-gold transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span className="font-mono text-xs tracking-wide">Admin Portal</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
