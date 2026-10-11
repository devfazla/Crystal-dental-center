import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { HeroSection } from './HeroSection';
import { IntroSection } from './IntroSection';
import { ProductsPreviewSection } from './ProductsPreviewSection';
import { DisciplinesSection } from './DisciplinesSection';
import { SanctuarySection } from './SanctuarySection';
import { GallerySection } from './GallerySection';
import { ReviewsSection } from './ReviewsSection';
import { BookingSection } from './BookingSection';
import { MapSection } from './MapSection';
import { NewsletterSection } from './NewsletterSection';
import { DisciplineModal } from './DisciplineModal';
import { DISCIPLINES } from '../data/content';
import { Discipline, Language } from '../types';
import { useSectionNav } from '../hooks/useSectionNav';

interface HomePageProps {
  language: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ language }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToSection = useSectionNav();

  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>(DISCIPLINES[0]);
  const [modalDiscipline, setModalDiscipline] = useState<Discipline | null>(null);
  // Default treatment preselected in the on-page booking form.
  const bookingDisciplineName = DISCIPLINES[0].titleEn;

  // Cross-page section landing: Header/Footer route here with location.state.scrollTo.
  // Applied once the sections are mounted, then the state is cleared so a refresh
  // doesn't re-trigger the scroll.
  const pendingSection = (location.state as { scrollTo?: string } | null)?.scrollTo;
  useEffect(() => {
    if (!pendingSection) return;
    let raf = 0;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(pendingSection);
      if (el) {
        // 'instant' avoids drift from reveal animations resizing the page mid-smooth-scroll
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        window.history.replaceState({}, '');
      } else if (++attempts < 30) {
        raf = requestAnimationFrame(tryScroll);
      }
    };
    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pendingSection]);

  const handleBookFromDiscipline = (disc: Discipline) => {
    setModalDiscipline(null);
    // Same checkout/confirm-booking flow the product "Book Now" uses. Passing
    // from: '/' so the confirm page returns to the home services section.
    navigate(`/book/${disc.id}`, { state: { from: '/' } });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-surface"
    >
      {/* Section 1: Hero / The Statement */}
      <HeroSection language={language} />

      {/* Full-screen Intro Section: Subtitle & Actions */}
      <IntroSection
        language={language}
        onReserveClick={() => scrollToSection('booking')}
        onExploreClick={() => scrollToSection('disciplines')}
      />

      {/* Products preview strip: single row, links to /products */}
      <ProductsPreviewSection language={language} />

      {/* Section 2: Disciplines (Precision Craft) */}
      <DisciplinesSection
        language={language}
        selectedDiscipline={selectedDiscipline}
        onSelectDiscipline={(d) => setSelectedDiscipline(d)}
        onOpenDetails={(d) => setModalDiscipline(d)}
        onNextSection={() => scrollToSection('experience')}
      />

      {/* Section 3: Sanctuary (Our Clinic) */}
      <SanctuarySection
        language={language}
        onNextSection={() => scrollToSection('gallery')}
      />

      {/* Section 4: Architectural Gallery Showcase */}
      <GallerySection language={language} />

      {/* Section 5: Patient Voices & Reviews */}
      <ReviewsSection language={language} />

      {/* Section 6: Contact & VIP Concierge Consultation */}
      <BookingSection language={language} initialDiscipline={bookingDisciplineName} />

      {/* Section 7: Location & Map */}
      <MapSection language={language} />

      {/* Section 8: Newsletter */}
      <NewsletterSection language={language} />

      {/* Interactive Clinical Deep-Dive Modal */}
      <DisciplineModal
        discipline={modalDiscipline}
        language={language}
        onClose={() => setModalDiscipline(null)}
        onBookDiscipline={handleBookFromDiscipline}
      />
    </motion.main>
  );
};
