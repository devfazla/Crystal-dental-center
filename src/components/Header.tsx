import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Stethoscope, Image as ImageIcon, Star, MapPin, Phone, ArrowRight, ShoppingBag } from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';
import { useSectionNav } from '../hooks/useSectionNav';
import { SafeImage } from './SafeImage';
import teethLogo from '../assets/images/teeth_transparent.png';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
}) => {
  const isArabic = language === 'ar';
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = useSectionNav();
  const onGallery = location.pathname === '/gallery';
  const onProducts = location.pathname === '/products';
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  const handleGalleryClick = () => {
    setMobileMenuOpen(false);
    navigate('/gallery');
  };

  const handleProductsClick = () => {
    setMobileMenuOpen(false);
    navigate('/products');
  };

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    scrollToSection('booking');
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 inset-x-0 z-50 bg-surface/92 backdrop-blur-xl border-b border-surface-container transition-all"
    >
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">
        {/* Brand Logo */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0"
          data-path="home"
          id="nav-logo"
        >
          <SafeImage
            src={teethLogo}
            alt={isArabic ? 'شعار عيادة كريستال' : 'Crystal Dental Logo'}
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0 group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col tracking-widest">
            <span className="font-headline-md text-[18px] min-[360px]:text-[20px] sm:text-[22px] tracking-[0.2em] text-on-surface uppercase group-hover:text-secondary transition-colors font-medium leading-tight">
              CRYSTAL
            </span>
            <span className="font-label-sm text-[9px] sm:text-[10px] text-on-surface-variant uppercase tracking-[0.3em] -mt-0.5">
              {isArabic ? 'مركز الأسنان' : 'Dental Center'}
            </span>
          </div>
        </a>

        {/* Focused Navigation Bar: Visible on Desktop & Wide Screens (lg+) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          <button
            type="button"
            onClick={() => handleNavClick('disciplines')}
            className="nav-link text-on-surface-variant hover:text-on-surface font-label-caps text-xs xl:text-label-caps uppercase tracking-wider xl:tracking-widest transition-colors cursor-pointer py-1 whitespace-nowrap"
            data-path="disciplines"
            id="nav-disciplines"
          >
            {isArabic ? 'الخدمات' : 'Services'}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('experience')}
            className="nav-link text-on-surface-variant hover:text-on-surface font-label-caps text-xs xl:text-label-caps uppercase tracking-wider xl:tracking-widest transition-colors cursor-pointer py-1 whitespace-nowrap"
            data-path="sanctuary"
            id="nav-sanctuary"
          >
            {isArabic ? 'عيادتنا' : 'Our Clinic'}
          </button>
          <button
            type="button"
            onClick={handleGalleryClick}
            className={`nav-link font-label-caps text-xs xl:text-label-caps uppercase tracking-wider xl:tracking-widest transition-colors cursor-pointer py-1 whitespace-nowrap ${
              onGallery
                ? 'nav-link-active text-on-surface font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            data-path="gallery"
            id="nav-gallery"
          >
            {isArabic ? 'المعرض' : 'Gallery'}
          </button>
          <button
            type="button"
            onClick={handleProductsClick}
            className={`nav-link font-label-caps text-xs xl:text-label-caps uppercase tracking-wider xl:tracking-widest transition-colors cursor-pointer py-1 whitespace-nowrap ${
              onProducts
                ? 'nav-link-active text-on-surface font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            data-path="products"
            id="nav-products"
          >
            {isArabic ? 'المتجر' : 'Products'}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('reviews')}
            className="nav-link text-on-surface-variant hover:text-on-surface font-label-caps text-xs xl:text-label-caps uppercase tracking-wider xl:tracking-widest transition-colors cursor-pointer py-1 whitespace-nowrap"
            data-path="reviews"
            id="nav-reviews"
          >
            {isArabic ? 'آراء المراجعين' : 'Reviews'}
          </button>
        </nav>

        {/* Right Actions: Language Switcher, CTA Button, Mobile/Tablet Menu Button */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          {/* Language Switcher */}
          <div className="flex items-center font-label-sm text-xs text-on-surface-variant bg-surface-container-low/80 sm:bg-surface-container-low/40 rounded-full px-1.5 py-0.5">
            <button
              id="lang-btn-en"
              type="button"
              onClick={() => language !== 'en' && onToggleLanguage()}
              className={`transition-colors font-medium min-h-[36px] min-w-[36px] flex items-center justify-center px-2 py-1 rounded-md text-xs ${
                language === 'en'
                  ? 'text-on-surface font-bold underline underline-offset-4 decoration-secondary'
                  : 'hover:text-on-surface text-on-surface-variant'
              }`}
            >
              EN
            </button>
            <span className="mx-0.5 text-outline-variant select-none">/</span>
            <button
              id="lang-btn-ar"
              type="button"
              onClick={() => language !== 'ar' && onToggleLanguage()}
              className={`transition-colors font-medium min-h-[36px] min-w-[36px] flex items-center justify-center px-2 py-1 rounded-md text-xs ${
                language === 'ar'
                  ? 'text-on-surface font-bold underline underline-offset-4 decoration-secondary'
                  : 'hover:text-on-surface text-on-surface-variant'
              }`}
            >
              عربي
            </button>
          </div>

          {/* Quick Book Appointment CTA */}
          <button
            id="btn-book-consultation-header"
            type="button"
            onClick={handleBookClick}
            className="hidden sm:inline-flex items-center justify-center px-4 md:px-5 lg:px-6 py-2.5 rounded-full bg-primary-container text-on-primary font-label-caps text-xs lg:text-label-caps uppercase tracking-wider hover:bg-secondary transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95 min-h-[40px]"
            data-path="vip-consultation"
          >
            {isArabic ? 'حجز موعد' : 'Book Appointment'}
          </button>

          {/* Menu Toggle for Tablet and Mobile (< lg, 1024px) */}
          <button
            id="btn-mobile-nav-toggle"
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-on-surface hover:text-secondary rounded-xl hover:bg-surface-container-high/60 transition-colors cursor-pointer border border-outline-variant/30"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Responsive Navigation Panel: Formatted for Mobile AND Tablet (< lg) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden bg-surface/98 backdrop-blur-2xl border-b border-surface-container shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-5 sm:py-7 flex flex-col gap-5">
            {/* Navigation Grid: 1 col on mobile, 2 cols on tablet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
              <button
                type="button"
                onClick={() => handleNavClick('disciplines')}
                className="p-3.5 sm:p-4 rounded-xl border border-outline-variant/30 hover:border-secondary/60 bg-surface-container-lowest hover:bg-surface-container-low transition-all text-start group flex items-center gap-3.5 cursor-pointer min-h-[52px] active:scale-[0.99]"
                id="mobile-nav-disciplines"
              >
                <span className="w-10 h-10 rounded-lg bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-on-surface group-hover:text-secondary transition-colors">
                    {isArabic ? 'الخدمات العلاجية' : 'Dental Services'}
                  </span>
                  <span className="text-xs text-on-surface-variant font-normal">
                    {isArabic ? 'تقويم، زراعة وتجميل الأسنان' : 'Orthodontics, Implants & Aesthetics'}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('experience')}
                className="p-3.5 sm:p-4 rounded-xl border border-outline-variant/30 hover:border-secondary/60 bg-surface-container-lowest hover:bg-surface-container-low transition-all text-start group flex items-center gap-3.5 cursor-pointer min-h-[52px] active:scale-[0.99]"
                id="mobile-nav-sanctuary"
              >
                <span className="w-10 h-10 rounded-lg bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-on-surface group-hover:text-secondary transition-colors">
                    {isArabic ? 'عيادتنا' : 'Our Clinic'}
                  </span>
                  <span className="text-xs text-on-surface-variant font-normal">
                    {isArabic ? 'أجواء هادئة في برج كريستال' : 'Serene Suites & Panoramic Views'}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleGalleryClick}
                className="p-3.5 sm:p-4 rounded-xl border border-outline-variant/30 hover:border-secondary/60 bg-surface-container-lowest hover:bg-surface-container-low transition-all text-start group flex items-center gap-3.5 cursor-pointer min-h-[52px] active:scale-[0.99]"
                id="mobile-nav-gallery"
              >
                <span className="w-10 h-10 rounded-lg bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-on-surface group-hover:text-secondary transition-colors">
                    {isArabic ? 'معرض الصور' : 'Clinic Gallery'}
                  </span>
                  <span className="text-xs text-on-surface-variant font-normal">
                    {isArabic ? 'جولة حصرية ونتائج الابتسامات' : 'Explore Suites & Smile Results'}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleProductsClick}
                className="p-3.5 sm:p-4 rounded-xl border border-outline-variant/30 hover:border-secondary/60 bg-surface-container-lowest hover:bg-surface-container-low transition-all text-start group flex items-center gap-3.5 cursor-pointer min-h-[52px] active:scale-[0.99]"
                id="mobile-nav-products"
              >
                <span className="w-10 h-10 rounded-lg bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-on-surface group-hover:text-secondary transition-colors">
                    {isArabic ? 'المتجر' : 'Products'}
                  </span>
                  <span className="text-xs text-on-surface-variant font-normal">
                    {isArabic ? 'منتجات العناية بالفم والأسنان' : 'Oral Care Products'}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('reviews')}
                className="p-3.5 sm:p-4 rounded-xl border border-outline-variant/30 hover:border-secondary/60 bg-surface-container-lowest hover:bg-surface-container-low transition-all text-start group flex items-center gap-3.5 cursor-pointer min-h-[52px] active:scale-[0.99]"
                id="mobile-nav-reviews"
              >
                <span className="w-10 h-10 rounded-lg bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <Star className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-on-surface group-hover:text-secondary transition-colors">
                    {isArabic ? 'آراء المراجعين' : 'Patient Reviews'}
                  </span>
                  <span className="text-xs text-on-surface-variant font-normal">
                    {isArabic ? 'تجارب وقصص مراجعينا السريرية' : 'Real Testimonials & Experiences'}
                  </span>
                </div>
              </button>
            </div>

            {/* Bottom Row on Tablet & Mobile: Quick Clinic Contacts & Booking Action */}
            <div className="pt-3 border-t border-outline-variant/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>{isArabic ? 'برج كريستال · الدور 8 · الشرق' : 'Crystal Tower · Floor 8 · Sharq'}</span>
                </div>
                <a
                  href={`tel:${CLINIC_INFO.telephone}`}
                  className="flex items-center gap-1.5 hover:text-secondary transition-colors font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>{CLINIC_INFO.telephoneDisplay}</span>
                </a>
              </div>

              <button
                id="mobile-nav-book-btn"
                type="button"
                onClick={handleBookClick}
                className="w-full sm:w-auto min-h-[46px] px-7 py-3 rounded-full bg-primary-container text-on-primary text-xs uppercase tracking-widest font-bold hover:bg-secondary transition-colors text-center shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{isArabic ? 'حجز موعد الآن' : 'Book Appointment Now'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reading / Scroll Progress Bar below the navBar */}
      <div
        id="nav-scroll-progress-track"
        className="absolute bottom-0 inset-x-0 h-[2.5px] bg-outline-variant/20 overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          id="nav-scroll-progress-bar"
          className="h-full bg-secondary transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(202,160,82,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
