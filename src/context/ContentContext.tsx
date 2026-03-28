import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { SiteContent, GalleryImage, AdminUser, Submission } from '@/types';
import { defaultContent, ADMIN_USERNAME, ADMIN_PASSWORD } from '@/data/defaultContent';

// Storage keys
const CONTENT_STORAGE_KEY = 'gayathri-portfolio-content';
const ADMIN_STORAGE_KEY = 'gayathri-portfolio-admin';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  updateHero: (hero: Partial<SiteContent['hero']>) => void;
  updatePortfolio: (portfolio: Partial<SiteContent['portfolio']>) => void;
  updatePackages: (packages: Partial<SiteContent['packages']>) => void;
  updateAbout: (about: Partial<SiteContent['about']>) => void;
  updateJournal: (journal: Partial<SiteContent['journal']>) => void;
  updateContact: (contact: Partial<SiteContent['contact']>) => void;
  updateFeature: (feature: Partial<SiteContent['feature']>) => void;
  updateGallery: (gallery: Partial<SiteContent['gallery']>) => void;
  updateClosing: (closing: Partial<SiteContent['closing']>) => void;
  
  // Gallery image management
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateGalleryImage: (id: string, image: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;
  reorderGalleryImages: (images: GalleryImage[]) => void;
  
  // Admin authentication
  admin: AdminUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  
  // Reset to defaults
  resetToDefaults: () => void;
  
  // Export/Import
  exportData: () => string;
  importData: (jsonString: string) => boolean;
  
  // Submissions
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, 'id' | 'submittedAt'>) => void;
  deleteSubmission: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  // Initialize content from localStorage or defaults
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (stored) {
        try {
          return { ...defaultContent, ...JSON.parse(stored) };
        } catch {
          return defaultContent;
        }
      }
    }
    return defaultContent;
  });

  // Initialize admin from localStorage
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  // Initialize submissions from localStorage
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gayathri-portfolio-submissions');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  // Save admin to localStorage whenever it changes
  useEffect(() => {
    if (admin) {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }, [admin]);

  // Save submissions to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gayathri-portfolio-submissions', JSON.stringify(submissions));
  }, [submissions]);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...newContent }));
  };

  const updateHero = (hero: Partial<SiteContent['hero']>) => {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, ...hero } }));
  };

  const updatePortfolio = (portfolio: Partial<SiteContent['portfolio']>) => {
    setContent((prev) => ({ ...prev, portfolio: { ...prev.portfolio, ...portfolio } }));
  };

  const updatePackages = (packages: Partial<SiteContent['packages']>) => {
    setContent((prev) => ({ ...prev, packages: { ...prev.packages, ...packages } }));
  };

  const updateAbout = (about: Partial<SiteContent['about']>) => {
    setContent((prev) => ({ ...prev, about: { ...prev.about, ...about } }));
  };

  const updateJournal = (journal: Partial<SiteContent['journal']>) => {
    setContent((prev) => ({ ...prev, journal: { ...prev.journal, ...journal } }));
  };

  const updateContact = (contact: Partial<SiteContent['contact']>) => {
    setContent((prev) => ({ ...prev, contact: { ...prev.contact, ...contact } }));
  };

  const updateFeature = (feature: Partial<SiteContent['feature']>) => {
    setContent((prev) => ({ ...prev, feature: { ...prev.feature, ...feature } }));
  };

  const updateGallery = (gallery: Partial<SiteContent['gallery']>) => {
    setContent((prev) => ({ ...prev, gallery: { ...prev.gallery, ...gallery } }));
  };

  const updateClosing = (closing: Partial<SiteContent['closing']>) => {
    setContent((prev) => ({ ...prev, closing: { ...prev.closing, ...closing } }));
  };

  // Gallery image management
  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage: GalleryImage = {
      ...image,
      id: Date.now().toString(),
    };
    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images: [...prev.gallery.images, newImage],
      },
    }));
  };

  const updateGalleryImage = (id: string, image: Partial<GalleryImage>) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images: prev.gallery.images.map((img) =>
          img.id === id ? { ...img, ...image } : img
        ),
      },
    }));
  };

  const deleteGalleryImage = (id: string) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images: prev.gallery.images.filter((img) => img.id !== id),
      },
    }));
  };

  const reorderGalleryImages = (images: GalleryImage[]) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images,
      },
    }));
  };

  // Admin authentication
  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdmin({ username, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure? This will reset all content to default values.')) {
      setContent(defaultContent);
    }
  };

  const exportData = (): string => {
    return JSON.stringify(content, null, 2);
  };

  const importData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      setContent({ ...defaultContent, ...parsed });
      return true;
    } catch {
      return false;
    }
  };

  // Submissions
  const addSubmission = (submission: Omit<Submission, 'id' | 'submittedAt'>) => {
    const newSubmission: Submission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setSubmissions((prev) => [...prev, newSubmission]);
  };

  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter(s => s.id !== id));
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        updateHero,
        updatePortfolio,
        updatePackages,
        updateAbout,
        updateJournal,
        updateContact,
        updateFeature,
        updateGallery,
        updateClosing,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        reorderGalleryImages,
        admin,
        login,
        logout,
        isAuthenticated: admin?.isAuthenticated ?? false,
        resetToDefaults,
        exportData,
        importData,
        submissions,
        addSubmission,
        deleteSubmission,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
