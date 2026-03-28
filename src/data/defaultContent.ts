import type { SiteContent } from '@/types';

// Default content for the website
// This is the initial data that loads when the site is first visited
export const defaultContent: SiteContent = {
  hero: {
    headline: "MOMENTS, PRESERVED IN LIGHT.",
    subheadline: "Wedding & editorial photography—intimate, honest, and timeless.",
    ctaPrimary: "Book a session",
    ctaSecondary: "View portfolio",
    leftImage: "/images/hero_couple_closeup.jpg",
    rightImage: "/images/hero_couple_field.jpg",
  },
  
  portfolio: {
    label: "PORTFOLIO",
    microcopy: "A selection of weddings, portraits, and editorial stories.",
    leftImage: "/images/portfolio_01.jpg",
    rightImage: "/images/portfolio_02.jpg",
  },
  
  packages: {
    label: "PACKAGES",
    packages: [
      {
        id: "1",
        name: "Essential Collection",
        description: "4 hours, 150+ images, online gallery",
        icon: "camera",
      },
      {
        id: "2",
        name: "Full Day Story",
        description: "10 hours, 400+ images, engagement mini-session",
        icon: "sun",
      },
      {
        id: "3",
        name: "Editorial Session",
        description: "2 hours, 50+ images, art-directed sets",
        icon: "sparkles",
      },
    ],
    ctaText: "Request detailed pricing",
    leftImage: "/images/packages_01.jpg",
    rightImage: "/images/packages_02.jpg",
  },
  
  about: {
    label: "ABOUT",
    paragraph: "I work quietly, move quickly, and chase the light that makes ordinary moments feel like cinema.",
    linkText: "Read the full story",
    leftImage: "/images/about_01.jpg",
    rightImage: "/images/about_02.jpg",
  },
  
  journal: {
    label: "JOURNAL",
    posts: [
      { id: "1", title: "On Film: A Goa Wedding", category: "Weddings" },
      { id: "2", title: "Portraits in Natural Light", category: "Technique" },
      { id: "3", title: "What to Wear: Engagement Shoots", category: "Guide" },
    ],
    linkText: "Browse all entries",
    leftImage: "/images/journal_01.jpg",
    rightImage: "/images/journal_02.jpg",
  },
  
  contact: {
    label: "CONTACT",
    prompt: "Tell me your date and city. I'll reply within 48 hours.",
    email: "hello@gadapagayathri.com",
    ctaText: "Start a conversation",
    leftImage: "/images/contact_01.jpg",
    rightImage: "/images/contact_02.jpg",
  },
  
  feature: {
    statement: "YOUR STORY, FRAMED BEAUTIFULLY.",
    ctaText: "Check availability",
    trustLine: "Limited dates per month • 48-hour response",
    backgroundImage: "/images/feature_bride.jpg",
  },
  
  gallery: {
    title: "SELECTED WORK",
    filters: ["All", "Weddings", "Portraits", "Editorial"],
    images: [
      {
        id: "1",
        src: "/images/mosaic_01.jpg",
        title: "The Grand Ceremony",
        location: "Hyderabad, India",
        date: "March 2024",
        category: "weddings",
        size: "large",
      },
      {
        id: "2",
        src: "/images/mosaic_02.jpg",
        title: "Coastal Love",
        location: "Goa, India",
        date: "February 2024",
        category: "weddings",
        size: "tall",
      },
      {
        id: "3",
        src: "/images/mosaic_03.jpg",
        title: "Elegant Reception",
        location: "Mumbai, India",
        date: "January 2024",
        category: "weddings",
        size: "wide",
      },
      {
        id: "4",
        src: "/images/mosaic_04.jpg",
        title: "Bridal Portrait",
        location: "Delhi, India",
        date: "December 2023",
        category: "portraits",
        size: "tall",
      },
      {
        id: "5",
        src: "/images/mosaic_05.jpg",
        title: "Groom Preparation",
        location: "Bangalore, India",
        date: "November 2023",
        category: "portraits",
        size: "normal",
      },
      {
        id: "6",
        src: "/images/mosaic_06.jpg",
        title: "Bridal Party",
        location: "Chennai, India",
        date: "October 2023",
        category: "weddings",
        size: "wide",
      },
      {
        id: "7",
        src: "/images/mosaic_07.jpg",
        title: "First Dance",
        location: "Jaipur, India",
        date: "September 2023",
        category: "weddings",
        size: "tall",
      },
      {
        id: "8",
        src: "/images/mosaic_08.jpg",
        title: "Rings & Details",
        location: "Pune, India",
        date: "August 2023",
        category: "editorial",
        size: "normal",
      },
    ],
  },
  
  closing: {
    headline: "READY WHEN YOU ARE.",
    body: "Share a few details and I'll get back to you with availability and next steps.",
    email: "hello@gadapagayathri.com",
    instagram: "@gadapagayathri",
    location: "Based in Hyderabad • Available worldwide",
    formCta: "Send Inquiry",
    footer: "© Gadapa Gayathri Photography. Crafted with care.",
    stats: "100+ Events Captured",
  },
  
  submissions: [],
};

// Admin credentials (in production, use proper authentication)
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "gayathri2024";
