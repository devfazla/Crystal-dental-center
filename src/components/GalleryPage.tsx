import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { Language, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/content';

interface GalleryPageProps {
  language: Language;
  onBackToHome: () => void;
  onBookClick: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  language,
  onBackToHome,
  onBookClick,
}) => {
  const isArabic = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Photos', labelAr: 'جميع الصور' },
    { id: 'suites', labelEn: 'Clinic Rooms', labelAr: 'غرف العيادة' },
    { id: 'technology', labelEn: 'Modern Equipment', labelAr: 'الأجهزة الحديثة' },
    { id: 'sanctuary', labelEn: 'Relaxing Spaces', labelAr: 'أماكن الراحة' },
    { id: 'artistry', labelEn: 'Smile & Care', labelAr: 'الابتسامة والرعاية' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxItem) return;
      if (e.key === 'Escape') {
        setLightboxItem(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
        if (currentIndex < filteredItems.length - 1) {
          setLightboxItem(filteredItems[currentIndex + 1]);
        } else {
          setLightboxItem(filteredItems[0]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
        if (currentIndex > 0) {
          setLightboxItem(filteredItems[currentIndex - 1]);
        } else {
          setLightboxItem(filteredItems[filteredItems.length - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem, filteredItems]);

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(
      currentIndex < filteredItems.length - 1
        ? filteredItems[currentIndex + 1]
        : filteredItems[0]
    );
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(
      currentIndex > 0
        ? filteredItems[currentIndex - 1]
        : filteredItems[filteredItems.length - 1]
    );
  };

  return (
    <div className="w-full min-h-screen bg-surface pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-16">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-8 sm:gap-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-6">
          <button
            id="gallery-back-btn"
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface hover:text-secondary font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span>{isArabic ? 'العودة للرئيسية' : 'Return to Home'}</span>
          </button>

          <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
            {isArabic ? 'معرض صور العيادة' : 'Clinic Gallery'}
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto pt-4 pb-2">
          <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl text-on-surface uppercase tracking-tight">
            {isArabic ? 'غرف ومرافق العيادة.' : 'OUR CLINIC & ROOMS.'}
          </h1>

          <p className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-2xl">
            {isArabic
              ? 'استكشف غرف العلاج الحديثة والأجهزة المتطورة وأماكن الراحة المصممة لتوفير أعلى درجات الطمأنينة.'
              : 'Explore our modern treatment rooms, advanced equipment, and comfortable spaces designed for your peace of mind.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 py-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`gallery-filter-${cat.id}`}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-on-surface text-surface shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-outline-variant/30'
                }`}
              >
                {isArabic ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4 items-stretch">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group rounded-3xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 flex flex-col cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
                <img
                  src={item.image}
                  alt={isArabic ? item.titleAr : item.titleEn}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Text Meta */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-medium text-on-surface group-hover:text-secondary transition-colors">
                    {isArabic ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                    {isArabic ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-secondary font-medium">
                  <span>{isArabic ? 'اضغط لتكبير الصورة' : 'Click to inspect in full resolution'}</span>
                  <span className="rtl:rotate-180">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Call to Action Banner */}
        <div className="mt-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-secondary font-medium block mb-1">
              {isArabic ? 'زيارة خاصة' : 'VIP Consultation'}
            </span>
            <h2 className="text-xl sm:text-2xl font-headline-md text-on-surface">
              {isArabic
                ? 'هل ترغب في تجربة عيادتنا شخصياً؟'
                : 'Experience our suites in person.'}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              {isArabic
                ? 'احجز استشارتك مع أطبائنا المتخصصين في برج كريستال بالشرق.'
                : 'Reserve an executive consultation at Crystal Tower, Sharq.'}
            </p>
          </div>

          <button
            id="gallery-cta-reserve-btn"
            type="button"
            onClick={onBookClick}
            className="px-8 py-3.5 rounded-full bg-on-surface text-surface hover:bg-secondary transition-colors text-xs uppercase tracking-widest font-medium shrink-0 cursor-pointer shadow-sm active:scale-95 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{isArabic ? 'طلب موعد استشارة' : 'Reserve Appointment'}</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
        >
          {/* Close Button */}
          <button
            id="lightbox-close-btn"
            type="button"
            onClick={() => setLightboxItem(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-30"
            aria-label="Close image viewer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Prev Button */}
          <button
            id="lightbox-prev-btn"
            type="button"
            onClick={handlePrevLightbox}
            className="absolute left-2 sm:left-8 rtl:left-auto rtl:right-2 sm:rtl:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer z-30"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
          </button>

          {/* Next Button */}
          <button
            id="lightbox-next-btn"
            type="button"
            onClick={handleNextLightbox}
            className="absolute right-2 sm:right-8 rtl:right-auto rtl:left-2 sm:rtl:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer z-30"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
          </button>

          {/* Content Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden max-h-[72vh] bg-black/40 border border-white/10 shadow-2xl">
              <img
                src={lightboxItem.image}
                alt={isArabic ? lightboxItem.titleAr : lightboxItem.titleEn}
                className="w-auto h-auto max-h-[72vh] max-w-full object-contain"
              />
            </div>

            {/* Captions */}
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#d8c290] font-medium block">
                {isArabic ? lightboxItem.categoryAr : lightboxItem.categoryEn}
              </span>
              <h3 className="text-lg sm:text-xl font-medium mt-1">
                {isArabic ? lightboxItem.titleAr : lightboxItem.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                {isArabic ? lightboxItem.descriptionAr : lightboxItem.descriptionEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
