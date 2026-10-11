import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin } from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';
import { MapWidget } from './MapWidget';

interface MapSectionProps {
  language: Language;
}

export const MapSection: React.FC<MapSectionProps> = ({ language }) => {
  const isArabic = language === 'ar';

  return (
    <section id="location" className="w-full">
      {/* Section header — keeps the "Our Clinic" block rhythm */}
      <div className="w-full bg-surface border-b border-outline-variant/30 py-12 sm:py-16 px-4 sm:px-6 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center justify-center"
        >
          <h2 className="font-headline-xl text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl lg:text-[62px] lg:leading-[66px] text-on-surface uppercase tracking-tight text-center font-extrabold">
            {isArabic ? (
              <>زور <span className="heading-accent">عيادتنا</span>.</>
            ) : (
              <>Find <span className="heading-accent">Us.</span></>
            )}
          </h2>
        </motion.div>
      </div>

      {/* Full-height block: map frame + two actions, nothing else */}
      <div className="md:min-h-[90vh] lg:min-h-screen w-full flex flex-col items-center justify-center gap-8 py-16 sm:py-20 px-4 sm:px-8 lg:px-16 bg-[#f1f7f6] border-b border-outline-variant/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-6xl h-[60vh] min-h-[360px] sm:min-h-[460px]"
        >
          <MapWidget
            language={language}
            className="h-full w-full border border-slate-200/80 shadow-md"
            roundedClassName="rounded-3xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <a
            id="map-review-btn"
            href={CLINIC_INFO.review}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#004d5a] text-white hover:bg-[#008f7a] transition-colors text-xs uppercase tracking-widest font-semibold shadow-sm active:scale-95 min-h-[48px]"
          >
            <Star className="w-4 h-4" />
            <span>{isArabic ? 'اكتب تقييماً' : 'Write a Review'}</span>
          </a>
          <a
            id="map-view-btn"
            href={CLINIC_INFO.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#004d5a]/40 text-[#004d5a] hover:border-[#004d5a] hover:bg-[#004d5a]/5 transition-colors text-xs uppercase tracking-widest font-semibold active:scale-95 min-h-[48px]"
          >
            <MapPin className="w-4 h-4" />
            <span>{isArabic ? 'افتح في خرائط جوجل' : 'View on Google Maps'}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
