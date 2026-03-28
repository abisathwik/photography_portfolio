// Gallery Image Type
export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  location: string;
  date: string;
  category: 'weddings' | 'portraits' | 'editorial';
  size: 'normal' | 'wide' | 'tall' | 'large';
}

// Submission Type
export interface Submission {
  id: string;
  name: string;
  email: string;
  date: string;
  location: string;
  message: string;
  submittedAt: string;
}

// Content Types for each section
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  leftImage: string;
  rightImage: string;
}

export interface PortfolioContent {
  label: string;
  microcopy: string;
  leftImage: string;
  rightImage: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  icon: 'camera' | 'sun' | 'sparkles';
}

export interface PackagesContent {
  label: string;
  packages: Package[];
  ctaText: string;
  leftImage: string;
  rightImage: string;
}

export interface AboutContent {
  label: string;
  paragraph: string;
  linkText: string;
  leftImage: string;
  rightImage: string;
}

export interface JournalPost {
  id: string;
  title: string;
  category: string;
}

export interface JournalContent {
  label: string;
  posts: JournalPost[];
  linkText: string;
  leftImage: string;
  rightImage: string;
}

export interface ContactContent {
  label: string;
  prompt: string;
  email: string;
  ctaText: string;
  leftImage: string;
  rightImage: string;
}

export interface FeatureContent {
  statement: string;
  ctaText: string;
  trustLine: string;
  backgroundImage: string;
}

export interface GalleryContent {
  title: string;
  filters: string[];
  images: GalleryImage[];
}

export interface ClosingContent {
  headline: string;
  body: string;
  email: string;
  instagram: string;
  location: string;
  formCta: string;
  footer: string;
  stats: string;
}

// Complete Site Content
export interface SiteContent {
  hero: HeroContent;
  portfolio: PortfolioContent;
  packages: PackagesContent;
  about: AboutContent;
  journal: JournalContent;
  contact: ContactContent;
  feature: FeatureContent;
  gallery: GalleryContent;
  closing: ClosingContent;
  submissions: Submission[];
}

// Admin User
export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}
