/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { DisciplinesSection } from './components/DisciplinesSection';
import { SanctuarySection } from './components/SanctuarySection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { GalleryPage } from './components/GalleryPage';
import { BookingSection } from './components/BookingSection';
import { NewsletterSection } from './components/NewsletterSection';
import { DisciplineModal } from './components/DisciplineModal';
import { Footer } from './components/Footer';
import { DISCIPLINES } from './data/content';
import { Discipline, Language } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>(DISCIPLINES[0]);
  const [modalDiscipline, setModalDiscipline] = useState<Discipline | null>(null);
  const [bookingDisciplineName, setBookingDisciplineName] = useState<string>('Invisalign & Orthodontics');

  useEffect(() => {
    // Update document dir and lang attribute for authentic typography & RTL layout
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    // Dynamic SEO Title and Meta Description
    if (currentPage === 'gallery') {
      document.title = language === 'ar'
        ? 'معرض الحالات والنتائج قبل وبعد | مركز كريستال للأسنان'
        : 'Smile Transformation Gallery & Clinical Results | Crystal Dental Center';
    } else {
      document.title = language === 'ar'
        ? 'مركز كريستال للأسنان | طب الأسنان التجميلي والجراحي | الشرق، الكويت'
        : 'Crystal Dental Center | Aesthetic & Surgical Dentistry | Sharq, Kuwait';
    }
  }, [language, currentPage]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#gallery-page') {
        setCurrentPage('gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '' || window.location.hash === '#hero') {
        setCurrentPage('home');
      }
    };

    if (window.location.hash === '#gallery-page') {
      setCurrentPage('gallery');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = id;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (page: 'home' | 'gallery', sectionId?: string) => {
    if (page === 'gallery') {
      setCurrentPage('gallery');
      window.location.hash = 'gallery-page';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      if (sectionId) {
        window.location.hash = sectionId;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBookFromDiscipline = (disc: Discipline) => {
    setBookingDisciplineName(disc.titleEn);
    scrollToSection('booking');
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-secondary/20 selection:text-secondary">
      {/* Fixed Luxury Navigation Header */}
      <Header
        language={language}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleLanguage={toggleLanguage}
        onBookClick={() => scrollToSection('booking')}
      />

      {currentPage === 'gallery' ? (
        /* Dedicated Gallery Page */
        <main className="w-full bg-surface">
          <GalleryPage
            language={language}
            onBackToHome={() => handleNavigate('home')}
            onBookClick={() => scrollToSection('booking')}
          />
        </main>
      ) : (
        /* Main Home Experience */
        <main className="w-full pt-20 bg-surface">
          {/* Section 1: Hero / The Statement */}
          <HeroSection language={language} />

          {/* Full-screen Intro Section: Subtitle & Actions */}
          <IntroSection
            language={language}
            onReserveClick={() => scrollToSection('booking')}
            onExploreClick={() => scrollToSection('disciplines')}
          />

          {/* Section 2: Disciplines (Precision Craft) */}
          <DisciplinesSection
            language={language}
            selectedDiscipline={selectedDiscipline}
            onSelectDiscipline={(d) => setSelectedDiscipline(d)}
            onOpenDetails={(d) => setModalDiscipline(d)}
            onNextSection={() => scrollToSection('experience')}
          />

          {/* Section 3: Sanctuary (Comfort. Zero Compromise.) */}
          <SanctuarySection
            language={language}
            onNextSection={() => scrollToSection('gallery')}
          />

          {/* Section 4: Architectural Gallery Showcase */}
          <GallerySection
            language={language}
            onOpenGalleryPage={() => handleNavigate('gallery')}
          />

          {/* Section 5: Patient Voices & Reviews */}
          <ReviewsSection language={language} />

          {/* Section 6: Contact & VIP Concierge Consultation */}
          <BookingSection
            language={language}
            initialDiscipline={bookingDisciplineName}
            onScrollToTop={() => scrollToSection('hero')}
          />

          {/* Section 7: Newsletter (Free Subscription of Newsletter) */}
          <NewsletterSection language={language} />
        </main>
      )}

      {/* Footer */}
      <Footer language={language} onNavigate={handleNavigate} />

      {/* Interactive Clinical Deep-Dive Modal */}
      <DisciplineModal
        discipline={modalDiscipline}
        language={language}
        onClose={() => setModalDiscipline(null)}
        onBookDiscipline={handleBookFromDiscipline}
      />
    </div>
  );
}

