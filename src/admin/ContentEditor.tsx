import { useState, useEffect, useRef } from 'react';
import { useContent } from '@/context/ContentContext';
import {
  Save,
  RotateCcw,
  Check,
  Type,
  Image as ImageIcon,
  Mail,
  MapPin,
} from 'lucide-react';

const ContentEditor = () => {
  const { content, updateHero, updatePortfolio, updatePackages, updateAbout, updateJournal, updateContact, updateFeature, updateClosing } = useContent();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Local form state
  const [formData, setFormData] = useState({
    hero: { ...content.hero },
    portfolio: { ...content.portfolio },
    packages: { ...content.packages },
    about: { ...content.about },
    journal: { ...content.journal },
    contact: { ...content.contact },
    feature: { ...content.feature },
    closing: { ...content.closing },
  });

  const saveTimeoutRef = useRef<number | null>(null);
  const hasLoadedRef = useRef(false);

  const handleSave = async () => {
    setSaveStatus('saving');
    
    // Update each section
    updateHero(formData.hero);
    updatePortfolio(formData.portfolio);
    updatePackages(formData.packages);
    updateAbout(formData.about);
    updateJournal(formData.journal);
    updateContact(formData.contact);
    updateFeature(formData.feature);
    updateClosing(formData.closing);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all changes? This will revert to the last saved state.')) {
      setFormData({
        hero: { ...content.hero },
        portfolio: { ...content.portfolio },
        packages: { ...content.packages },
        about: { ...content.about },
        journal: { ...content.journal },
        contact: { ...content.contact },
        feature: { ...content.feature },
        closing: { ...content.closing },
      });
    }
  };

  useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      return;
    }
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      handleSave();
    }, 2000);
  }, [formData]);

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: Type },
    { id: 'portfolio', label: 'Portfolio Section', icon: ImageIcon },
    { id: 'packages', label: 'Packages Section', icon: Type },
    { id: 'about', label: 'About Section', icon: Type },
    { id: 'journal', label: 'Journal Section', icon: Type },
    { id: 'contact', label: 'Contact Section', icon: Mail },
    { id: 'feature', label: 'Feature Section', icon: ImageIcon },
    { id: 'closing', label: 'Closing Section', icon: MapPin },
  ];

  const updateField = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-off-white mb-1">
            Content Editor
          </h2>
          <p className="text-off-white/60 text-sm">
            Edit text content across all sections of your website
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-off-white/20 text-off-white/60 hover:text-off-white hover:border-off-white/40 transition-colors text-xs uppercase tracking-wide"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="btn-gold flex items-center gap-2 disabled:opacity-50"
          >
            {saveStatus === 'saving' ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : saveStatus === 'saved' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-charcoal/50 border border-off-white/10">
            <div className="p-4 border-b border-off-white/10">
              <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50">
                Sections
              </h3>
            </div>
            <div className="divide-y divide-off-white/10">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-gold/10 text-gold border-l-2 border-gold'
                      : 'text-off-white/70 hover:text-off-white hover:bg-off-white/5'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  <span className="text-sm">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor Form */}
        <div className="lg:col-span-3">
          <div className="bg-charcoal/50 border border-off-white/10 p-6">
            {/* Hero Section */}
            {activeSection === 'hero' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg text-off-white mb-4">
                  Hero Section Content
                </h3>
                
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={formData.hero.headline}
                    onChange={(e) => updateField('hero', 'headline', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Subheadline
                  </label>
                  <input
                    type="text"
                    value={formData.hero.subheadline}
                    onChange={(e) => updateField('hero', 'subheadline', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Primary CTA
                    </label>
                    <input
                      type="text"
                      value={formData.hero.ctaPrimary}
                      onChange={(e) => updateField('hero', 'ctaPrimary', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Secondary CTA
                    </label>
                    <input
                      type="text"
                      value={formData.hero.ctaSecondary}
                      onChange={(e) => updateField('hero', 'ctaSecondary', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Left Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.hero.leftImage}
                      onChange={(e) => updateField('hero', 'leftImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Right Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.hero.rightImage}
                      onChange={(e) => updateField('hero', 'rightImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Section */}
            {activeSection === 'portfolio' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg text-off-white mb-4">
                  Portfolio Section Content
                </h3>
                
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={formData.portfolio.label}
                    onChange={(e) => updateField('portfolio', 'label', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Microcopy
                  </label>
                  <textarea
                    value={formData.portfolio.microcopy}
                    onChange={(e) => updateField('portfolio', 'microcopy', e.target.value)}
                    rows={2}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Left Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.portfolio.leftImage}
                      onChange={(e) => updateField('portfolio', 'leftImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Right Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.portfolio.rightImage}
                      onChange={(e) => updateField('portfolio', 'rightImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Packages Section */}
            {activeSection === 'packages' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg text-off-white mb-4">
                  Packages Section Content
                </h3>
                
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={formData.packages.label}
                    onChange={(e) => updateField('packages', 'label', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    CTA Text
                  </label>
                  <input
                    type="text"
                    value={formData.packages.ctaText}
                    onChange={(e) => updateField('packages', 'ctaText', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Left Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.packages.leftImage}
                      onChange={(e) => updateField('packages', 'leftImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Right Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.packages.rightImage}
                      onChange={(e) => updateField('packages', 'rightImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* About Section */}
            {activeSection === 'about' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg text-off-white mb-4">
                  About Section Content
                </h3>
                
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={formData.about.label}
                    onChange={(e) => updateField('about', 'label', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Paragraph
                  </label>
                  <textarea
                    value={formData.about.paragraph}
                    onChange={(e) => updateField('about', 'paragraph', e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={formData.about.linkText}
                    onChange={(e) => updateField('about', 'linkText', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Left Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.about.leftImage}
                      onChange={(e) => updateField('about', 'leftImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Right Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.about.rightImage}
                      onChange={(e) => updateField('about', 'rightImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Journal Section */}
            {activeSection === 'journal' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg text-off-white mb-4">
                  Journal Section Content
                </h3>
                
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={formData.journal.label}
                    onChange={(e) => updateField('journal', 'label', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={formData.journal.linkText}
                    onChange={(e) => updateField('journal', 'linkText', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Left Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.journal.leftImage}
                      onChange={(e) => updateField('journal', 'leftImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Right Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.journal.rightImage}
                      onChange={(e) => updateField('journal', 'rightImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg text-off-white mb-4">
                  Contact Section Content
                </h3>
                
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={formData.contact.label}
                    onChange={(e) => updateField('contact', 'label', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Prompt
                  </label>
                  <textarea
                    value={formData.contact.prompt}
                    onChange={(e) => updateField('contact', 'prompt', e.target.value)}
                    rows={2}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => updateField('contact', 'email', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    CTA Text
                  </label>
                  <input
                    type="text"
                    value={formData.contact.ctaText}
                    onChange={(e) => updateField('contact', 'ctaText', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Left Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.contact.leftImage}
                      onChange={(e) => updateField('contact', 'leftImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Right Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.contact.rightImage}
                      onChange={(e) => updateField('contact', 'rightImage', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Feature Section */}
            {activeSection === 'feature' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg text-off-white mb-4">
                  Feature Section Content
                </h3>
                
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Statement
                  </label>
                  <input
                    type="text"
                    value={formData.feature.statement}
                    onChange={(e) => updateField('feature', 'statement', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    CTA Text
                  </label>
                  <input
                    type="text"
                    value={formData.feature.ctaText}
                    onChange={(e) => updateField('feature', 'ctaText', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Trust Line
                  </label>
                  <input
                    type="text"
                    value={formData.feature.trustLine}
                    onChange={(e) => updateField('feature', 'trustLine', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Background Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.feature.backgroundImage}
                    onChange={(e) => updateField('feature', 'backgroundImage', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Closing Section */}
            {activeSection === 'closing' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg text-off-white mb-4">
                  Closing Section Content
                </h3>
                
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={formData.closing.headline}
                    onChange={(e) => updateField('closing', 'headline', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Body Text
                  </label>
                  <textarea
                    value={formData.closing.body}
                    onChange={(e) => updateField('closing', 'body', e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.closing.email}
                      onChange={(e) => updateField('closing', 'email', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.closing.instagram}
                      onChange={(e) => updateField('closing', 'instagram', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.closing.location}
                    onChange={(e) => updateField('closing', 'location', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Form CTA
                    </label>
                    <input
                      type="text"
                      value={formData.closing.formCta}
                      onChange={(e) => updateField('closing', 'formCta', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                      Stats Text
                    </label>
                    <input
                      type="text"
                      value={formData.closing.stats}
                      onChange={(e) => updateField('closing', 'stats', e.target.value)}
                      className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                    Footer Text
                  </label>
                  <input
                    type="text"
                    value={formData.closing.footer}
                    onChange={(e) => updateField('closing', 'footer', e.target.value)}
                    className="w-full bg-transparent border border-off-white/20 py-2 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
