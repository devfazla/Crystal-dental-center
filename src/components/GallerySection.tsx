import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { GALLERY_ITEMS } from '../data/content';
import { SafeImage } from './SafeImage';

interface GallerySectionProps {
  language: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  language,
}) => {
  const isArabic = language === 'ar';
  const navigate = useNavigate();
  const openGallery = () => navigate('/gallery');

  // Hovered item ID drives which tile grows wider. Rows keep a FIXED height so
  // hovering only redistributes horizontal space — the section never grows.
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
  const isTopRowHovered = isTopLeftHovered || isRightColHovered;

  const isAnyBottomHovered =
    hoveredId === item3.id || hoveredId === item4.id || hoveredId === item5.id;

  return (
    <section
      id="gallery"
      className="relative w-full md:min-h-screen flex flex-col px-4 sm:px-6 lg:px-12 pt-16 pb-20 lg:pb-24 bg-surface border-t border-outline-variant/30 overflow-hidden"
    >
      {/* Top Meta Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center pb-6 border-b border-outline-variant/30 shrink-0"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-[52px] lg:leading-[58px] font-extrabold text-slate-900 tracking-tight text-center">
          {isArabic ? (
            <>معرض <span className="heading-accent">صور العيادة</span></>
          ) : (
            <>Clinic <span className="heading-accent">Gallery.</span></>
          )}
        </h2>
        <p className="mt-3 text-slate-500 max-w-2xl text-center text-sm sm:text-base font-normal leading-relaxed">
          {isArabic
            ? 'مرّر المؤشر على الصورة لتقريبها.'
            : 'Hover a photo to bring it closer.'}
        </p>
      </motion.div>

      {/* Mosaic: fills remaining vertical space; row heights are fixed so the
          section never expands when a tile grows on hover. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        onMouseLeave={() => setHoveredId(null)}
        className="w-full max-w-[1440px] mx-auto flex-1 flex flex-col justify-center gap-4 sm:gap-5 py-8"
      >
        {/* Top row — side-by-side & fixed height only on lg+ */}
        <div
          className={`flex flex-col lg:flex-row gap-4 sm:gap-5 w-full lg:h-[42vh] lg:min-h-[420px] transition-opacity duration-500 ${
            isAnyBottomHovered ? 'opacity-90' : 'opacity-100'
          }`}
        >
          {/* Item 0: dominant tile, only width changes on hover */}
          <div
            id={`gallery-card-${item0.id}`}
            onClick={openGallery}
            onMouseEnter={() => setHoveredId(item0.id)}
            className={`group relative h-[320px] sm:h-[380px] lg:h-full rounded-3xl overflow-hidden cursor-pointer bg-slate-950 ring-1 ring-white/60 ring-inset transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isRightColHovered
                ? 'lg:w-[46%] border border-slate-200/90 shadow-[6px_6px_18px_rgba(0,0,0,0.06)]'
                : isTopLeftHovered
                ? 'lg:w-[66%] border border-slate-300 shadow-[14px_14px_34px_rgba(0,0,0,0.13)] z-20'
                : 'lg:w-[66%] border border-slate-200/90 shadow-[10px_10px_26px_rgba(0,0,0,0.09)] z-10'
            }`}
          >
            <SafeImage
              src={item0.image}
              alt={isArabic ? item0.titleAr : item0.titleEn}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

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

          {/* Right column — tiles keep their own height on mobile, share the
              fixed row height via flex only on lg+ */}
          <div
            className={`flex flex-col gap-4 sm:gap-5 w-full lg:h-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isRightColHovered ? 'lg:w-[54%]' : 'lg:w-[34%]'
            }`}
          >
            {[
              { item: item1, hovered: isRightTopHovered, shrunk: isRightBottomHovered },
              { item: item2, hovered: isRightBottomHovered, shrunk: isRightTopHovered },
            ].map(({ item, hovered, shrunk }) => (
              <div
                key={item.id}
                id={`gallery-card-${item.id}`}
                onClick={openGallery}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`group relative h-[200px] lg:h-0 min-h-0 rounded-3xl overflow-hidden cursor-pointer bg-slate-950 ring-1 ring-white/60 ring-inset transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  hovered
                    ? 'lg:flex-[1.6] border border-slate-300 shadow-[14px_14px_34px_rgba(0,0,0,0.13)] z-20'
                    : shrunk
                    ? 'lg:flex-[0.6] border border-slate-200/90 shadow-[5px_5px_15px_rgba(0,0,0,0.05)] opacity-80'
                    : 'lg:flex-1 border border-slate-200/90 shadow-[6px_6px_18px_rgba(0,0,0,0.06)]'
                }`}
              >
                <SafeImage
                  src={item.image}
                  alt={isArabic ? item.titleAr : item.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 rtl:left-auto rtl:right-5 max-w-md text-left rtl:text-right">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#59d8e5] font-semibold mb-1 block">
                    {isArabic ? item.categoryAr : item.categoryEn}
                  </span>
                  <h3 className="font-headline-md text-xl sm:text-2xl text-white font-normal tracking-tight">
                    {isArabic ? item.titleAr : item.titleEn}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — tiles stack with their own height on mobile, share the
            fixed row height only on sm+ */}
        <div
          className={`flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:h-[26vh] sm:min-h-[240px] ${
            isTopRowHovered ? 'opacity-90' : 'opacity-100'
          }`}
        >
          {[item3, item4, item5].map((item) => {
            const isThisCardHovered = hoveredId === item.id;
            const isAnyOtherBottomHovered = isAnyBottomHovered && !isThisCardHovered;

            return (
              <div
                key={item.id}
                id={`gallery-card-${item.id}`}
                onClick={openGallery}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`group relative h-[220px] sm:h-full rounded-3xl overflow-hidden cursor-pointer bg-slate-950 ring-1 ring-white/60 ring-inset transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isThisCardHovered
                    ? 'sm:flex-[2.2] border border-slate-300 shadow-[14px_14px_34px_rgba(0,0,0,0.13)] z-20'
                    : isAnyOtherBottomHovered
                    ? 'sm:flex-[0.7] border border-slate-200/90 shadow-[5px_5px_15px_rgba(0,0,0,0.05)] opacity-80'
                    : 'sm:flex-1 border border-slate-200/90 shadow-[6px_6px_18px_rgba(0,0,0,0.06)]'
                }`}
              >
                <SafeImage
                  src={item.image}
                  alt={isArabic ? item.titleAr : item.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 rtl:left-auto rtl:right-5 max-w-md text-left rtl:text-right">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#59d8e5] font-semibold mb-1 block">
                    {isArabic ? item.categoryAr : item.categoryEn}
                  </span>
                  <h3 className="font-headline-md text-lg sm:text-xl lg:text-2xl text-white font-normal tracking-tight">
                    {isArabic ? item.titleAr : item.titleEn}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl mx-auto flex items-center justify-center pt-6 border-t border-outline-variant/30 shrink-0"
      >
        <button
          id="home-open-full-gallery-btn"
          type="button"
          onClick={openGallery}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white hover:bg-[#008f7a] transition-all duration-300 text-xs uppercase tracking-widest font-semibold cursor-pointer shadow-[6px_6px_16px_rgba(0,0,0,0.1),-3px_-3px_10px_rgba(255,255,255,0.8)] hover:shadow-[8px_8px_20px_rgba(0,143,122,0.3)] active:scale-95"
        >
          <span>{isArabic ? 'مشاهدة جميع الصور' : 'View All Photos'}</span>
          <ArrowUpRight className="w-4 h-4 rtl:rotate-[-45deg]" />
        </button>
      </motion.div>
    </section>
  );
};
