import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Eye } from 'lucide-react';
import { Language } from '../types';
import { GALLERY_ITEMS } from '../data/content';

interface GallerySectionProps {
  language: Language;
  onOpenGalleryPage: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  language,
  onOpenGalleryPage,
}) => {
  const isArabic = language === 'ar';

  // Hovered item ID controls which card expands to 2X; if null, item 0 is the default 2X
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const item0 = GALLERY_ITEMS[0]; // Sharq Skyline Suite
  const item1 = GALLERY_ITEMS[2]; // Expert Clinical Care
  const item2 = GALLERY_ITEMS[3]; // Pediatric Dentistry
  const item3 = GALLERY_ITEMS[1]; // Crystal Tower Panorama
  const item4 = GALLERY_ITEMS[4]; // Advanced Medical Tools
  const item5 = GALLERY_ITEMS[5]; // Infection Control Protocol

  const isTopLeftHovered = hoveredId === item0.id;
  const isRightTopHovered = hoveredId === item1.id;
  const isRightBottomHovered = hoveredId === item2.id;
  const isRightColHovered = isRightTopHovered || isRightBottomHovered;

  const isBottom3Hovered = hoveredId === item3.id;
  const isBottom4Hovered = hoveredId === item4.id;
  const isBottom5Hovered = hoveredId === item5.id;
  const isAnyBottomHovered = isBottom3Hovered || isBottom4Hovered || isBottom5Hovered;

  return (
    <section
      id="gallery"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-12 pt-16 pb-20 lg:pb-24 bg-surface border-t border-outline-variant/30 overflow-hidden"
    >
      {/* Top Meta Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center pb-8 border-b border-outline-variant/30"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-[52px] lg:leading-[58px] font-bold text-slate-900 tracking-tight text-center">
          {isArabic ? 'معرض صور العيادة' : 'Clinic Gallery'}
        </h2>
        <p className="mt-3 text-slate-500 max-w-2xl text-center text-sm sm:text-base font-normal leading-relaxed">
          {isArabic
            ? 'مرر المؤشر على أي جناح ليتمدد إلى الحجم الكبير (2X) بينما تعود الأجنحة الأخرى إلى الحجم الطبيعي بسلاسة.'
            : 'Hover over any suite to scale it into the 2X featured spotlight while the others smoothly settle into 1X.'}
        </p>
      </motion.div>

      {/* Dynamic 2X / 1X Scaling Flex Mosaic Container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1440px] mx-auto flex flex-col gap-4 sm:gap-5 my-auto py-8"
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Top Flex Row */}
        <div
          className={`flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isAnyBottomHovered ? 'opacity-85 scale-[0.99]' : 'opacity-100 scale-100'
          }`}
        >
          {/* Item 0: Default 2X Card (scales down to 1X if a right card is hovered) */}
          <div
            id={`gallery-card-${item0.id}`}
            onClick={onOpenGalleryPage}
            onMouseEnter={() => setHoveredId(item0.id)}
            className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-950 border ring-1 ring-white/60 ring-inset transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              // When right column is hovered, this card scales down to 1X width
              isRightColHovered
                ? 'lg:w-[44%] min-h-[360px] sm:min-h-[400px] lg:min-h-[460px] border-slate-200/90 shadow-[6px_6px_18px_rgba(0,0,0,0.06),-4px_-4px_14px_rgba(255,255,255,0.9)] opacity-90'
                : isTopLeftHovered
                ? 'lg:w-[65%] min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] border-slate-300 shadow-[14px_14px_34px_rgba(0,0,0,0.13),-8px_-8px_24px_rgba(255,255,255,0.95)] z-20 scale-[1.015]'
                : 'lg:w-[65%] min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] border-slate-200/90 shadow-[10px_10px_26px_rgba(0,0,0,0.09),-6px_-6px_20px_rgba(255,255,255,0.95)] z-10'
            }`}
          >
            <img
              src={item0.image}
              alt={isArabic ? item0.titleAr : item0.titleEn}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

            {/* Bottom Overlay Info */}
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 rtl:left-auto rtl:right-6 sm:rtl:right-8 max-w-xl text-left rtl:text-right">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#59d8e5] font-semibold mb-2 block">
                {isArabic ? item0.categoryAr : item0.categoryEn}
              </span>
              <h3 className="font-headline-md text-2xl sm:text-3xl lg:text-4xl text-white font-normal tracking-tight">
                {isArabic ? item0.titleAr : item0.titleEn}
              </h3>
              <p
                className={`text-xs sm:text-sm text-slate-200 font-light mt-2.5 leading-relaxed max-w-lg transition-all duration-500 ${
                  isRightColHovered ? 'line-clamp-1 opacity-80' : 'line-clamp-2 sm:line-clamp-3 opacity-100'
                }`}
              >
                {isArabic ? item0.descriptionAr : item0.descriptionEn}
              </p>
            </div>
          </div>

          {/* Right Column (Item 1 & Item 2) */}
          <div
            className={`flex flex-col gap-4 sm:gap-5 w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isRightColHovered ? 'lg:w-[56%]' : 'lg:w-[35%]'
            }`}
          >
            {/* Item 1: Right Top Card (Scales to 2X when hovered!) */}
            <div
              id={`gallery-card-${item1.id}`}
              onClick={onOpenGalleryPage}
              onMouseEnter={() => setHoveredId(item1.id)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-950 border ring-1 ring-white/60 ring-inset transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isRightTopHovered
                  ? 'flex-[2.4] min-h-[290px] sm:min-h-[310px] lg:min-h-[330px] border-slate-300 shadow-[14px_14px_34px_rgba(0,0,0,0.13),-8px_-8px_24px_rgba(255,255,255,0.95)] z-20 scale-[1.02]'
                  : isRightBottomHovered
                  ? 'flex-[0.7] min-h-[150px] sm:min-h-[165px] lg:min-h-[175px] border-slate-200/90 shadow-[5px_5px_15px_rgba(0,0,0,0.05),-3px_-3px_10px_rgba(255,255,255,0.8)] opacity-75 scale-[0.98]'
                  : 'flex-1 min-h-[190px] sm:min-h-[215px] lg:min-h-[238px] border-slate-200/90 shadow-[6px_6px_18px_rgba(0,0,0,0.06),-4px_-4px_14px_rgba(255,255,255,0.9)]'
              }`}
            >
              <img
                src={item1.image}
                alt={isArabic ? item1.titleAr : item1.titleEn}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 rtl:left-auto rtl:right-5 sm:rtl:right-6 max-w-md text-left rtl:text-right">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#59d8e5] font-semibold mb-1 block">
                  {isArabic ? item1.categoryAr : item1.categoryEn}
                </span>
                <h3
                  className={`font-headline-md text-white font-normal tracking-tight transition-all duration-300 ${
                    isRightTopHovered ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  }`}
                >
                  {isArabic ? item1.titleAr : item1.titleEn}
                </h3>
                {/* Reveal description when scaled to 2X */}
                {isRightTopHovered && (
                  <p className="text-xs sm:text-sm text-slate-200 font-light mt-2 line-clamp-2 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {isArabic ? item1.descriptionAr : item1.descriptionEn}
                  </p>
                )}
              </div>
            </div>

            {/* Item 2: Right Bottom Card (Scales to 2X when hovered!) */}
            <div
              id={`gallery-card-${item2.id}`}
              onClick={onOpenGalleryPage}
              onMouseEnter={() => setHoveredId(item2.id)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-950 border ring-1 ring-white/60 ring-inset transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isRightBottomHovered
                  ? 'flex-[2.4] min-h-[290px] sm:min-h-[310px] lg:min-h-[330px] border-slate-300 shadow-[14px_14px_34px_rgba(0,0,0,0.13),-8px_-8px_24px_rgba(255,255,255,0.95)] z-20 scale-[1.02]'
                  : isRightTopHovered
                  ? 'flex-[0.7] min-h-[150px] sm:min-h-[165px] lg:min-h-[175px] border-slate-200/90 shadow-[5px_5px_15px_rgba(0,0,0,0.05),-3px_-3px_10px_rgba(255,255,255,0.8)] opacity-75 scale-[0.98]'
                  : 'flex-1 min-h-[190px] sm:min-h-[215px] lg:min-h-[238px] border-slate-200/90 shadow-[6px_6px_18px_rgba(0,0,0,0.06),-4px_-4px_14px_rgba(255,255,255,0.9)]'
              }`}
            >
              <img
                src={item2.image}
                alt={isArabic ? item2.titleAr : item2.titleEn}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 rtl:left-auto rtl:right-5 sm:rtl:right-6 max-w-md text-left rtl:text-right">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#59d8e5] font-semibold mb-1 block">
                  {isArabic ? item2.categoryAr : item2.categoryEn}
                </span>
                <h3
                  className={`font-headline-md text-white font-normal tracking-tight transition-all duration-300 ${
                    isRightBottomHovered ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  }`}
                >
                  {isArabic ? item2.titleAr : item2.titleEn}
                </h3>
                {/* Reveal description when scaled to 2X */}
                {isRightBottomHovered && (
                  <p className="text-xs sm:text-sm text-slate-200 font-light mt-2 line-clamp-2 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {isArabic ? item2.descriptionAr : item2.descriptionEn}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Flex Row: 3 Cards (Hovered one scales up to 2X width & height, others scale down to 1X) */}
        <div
          className={`flex flex-col sm:flex-row gap-4 sm:gap-5 w-full items-stretch transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isAnyBottomHovered ? 'min-h-[290px] sm:min-h-[320px]' : ''
          }`}
        >
          {[item3, item4, item5].map((item) => {
            const isThisCardHovered = hoveredId === item.id;
            const isAnyOtherBottomHovered = isAnyBottomHovered && !isThisCardHovered;

            return (
              <div
                key={item.id}
                id={`gallery-card-${item.id}`}
                onClick={onOpenGalleryPage}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-950 border ring-1 ring-white/60 ring-inset transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isThisCardHovered
                    ? 'sm:flex-[2.4] min-h-[290px] sm:min-h-[320px] lg:min-h-[340px] border-slate-300 shadow-[14px_14px_34px_rgba(0,0,0,0.13),-8px_-8px_24px_rgba(255,255,255,0.95)] z-20 scale-[1.02]'
                    : isAnyOtherBottomHovered
                    ? 'sm:flex-[0.75] min-h-[190px] sm:min-h-[210px] lg:min-h-[230px] border-slate-200/90 shadow-[5px_5px_15px_rgba(0,0,0,0.05),-3px_-3px_10px_rgba(255,255,255,0.8)] opacity-75 scale-[0.98]'
                    : 'sm:flex-1 min-h-[200px] sm:min-h-[230px] lg:min-h-[260px] border-slate-200/90 shadow-[6px_6px_18px_rgba(0,0,0,0.06),-4px_-4px_14px_rgba(255,255,255,0.9)]'
                }`}
              >
                <img
                  src={item.image}
                  alt={isArabic ? item.titleAr : item.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 rtl:left-auto rtl:right-5 sm:rtl:right-6 max-w-md text-left rtl:text-right">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#59d8e5] font-semibold mb-1 block">
                    {isArabic ? item.categoryAr : item.categoryEn}
                  </span>
                  <h3
                    className={`font-headline-md text-white font-normal tracking-tight transition-all duration-300 ${
                      isThisCardHovered ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl lg:text-2xl'
                    }`}
                  >
                    {isArabic ? item.titleAr : item.titleEn}
                  </h3>
                  {/* Reveal description when scaled to 2X */}
                  {isThisCardHovered && (
                    <p className="text-xs sm:text-sm text-slate-200 font-light mt-2 line-clamp-2 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {isArabic ? item.descriptionAr : item.descriptionEn}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Action Bar: Centered Entry to Full Dedicated Gallery */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl mx-auto flex items-center justify-center pt-6 border-t border-outline-variant/30"
      >
        <button
          id="home-open-full-gallery-btn"
          type="button"
          onClick={onOpenGalleryPage}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white hover:bg-[#008f7a] transition-all duration-300 text-xs uppercase tracking-widest font-semibold cursor-pointer shadow-[6px_6px_16px_rgba(0,0,0,0.1),-3px_-3px_10px_rgba(255,255,255,0.8)] hover:shadow-[8px_8px_20px_rgba(0,143,122,0.3)] active:scale-95"
        >
          <span>{isArabic ? 'مشاهدة جميع الصور' : 'View All Photos'}</span>
          <ArrowUpRight className="w-4 h-4 rtl:rotate-[-90deg]" />
        </button>
      </motion.div>
    </section>
  );
};
