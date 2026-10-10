import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface IntroSectionProps {
  language: Language;
  onReserveClick: () => void;
  onExploreClick: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({
  language,
  onReserveClick,
  onExploreClick,
}) => {
  const isArabic = language === 'ar';

  return (
    <section
      id="intro"
      className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-16 sm:py-24 bg-surface"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl mx-auto flex flex-col items-center text-center my-auto"
      >
        {/* Short Subtitle Message */}
        <p className="font-headline-md text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl text-on-surface font-light tracking-tight leading-relaxed max-w-2xl px-2">
          {isArabic
            ? 'عناية أسنان متخصصة من الدور الثامن، بإطلالة على مدينة الكويت.'
            : 'Specialist dental care with the Kuwait City skyline out the window.'}
        </p>

        {/* Two Clean Buttons: Fluid on Mobile */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 mt-8 sm:mt-10 max-w-xs sm:max-w-none">
          <button
            id="intro-reserve-btn"
            type="button"
            onClick={onReserveClick}
            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-on-surface text-surface hover:bg-secondary font-label-caps text-label-caps uppercase tracking-widest transition-all shadow-sm hover:shadow-md cursor-pointer font-semibold active:scale-95"
          >
            {isArabic ? 'احجز موعدك' : 'Book Appointment'}
          </button>

          <button
            id="intro-explore-btn"
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-outline-variant/60 text-on-surface hover:border-secondary hover:text-secondary font-label-caps text-label-caps uppercase tracking-wider transition-all cursor-pointer group active:scale-95"
          >
            <span>{isArabic ? 'استكشف الخدمات' : 'Explore Services'}</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-y-0.5 transition-transform">
              south
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
