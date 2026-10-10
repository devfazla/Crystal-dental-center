import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Discipline, Language } from '../types';
import { DISCIPLINES } from '../data/content';
import { SafeImage } from './SafeImage';

interface DisciplinesSectionProps {
  language: Language;
  selectedDiscipline: Discipline;
  onSelectDiscipline: (discipline: Discipline) => void;
  onOpenDetails: (discipline: Discipline) => void;
  onNextSection: () => void;
}

export const DisciplinesSection: React.FC<DisciplinesSectionProps> = ({
  language,
  selectedDiscipline,
  onSelectDiscipline,
  onOpenDetails,
}) => {
  const isArabic = language === 'ar';
  // Cache last hovered item and keep it active until another item is hovered
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline>(selectedDiscipline);

  const handleItemHover = (item: Discipline) => {
    setActiveDiscipline(item);
    onSelectDiscipline(item);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isArabic ? 20 : -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section
      id="disciplines"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-16 pt-12 sm:pt-14 pb-16 sm:pb-20 lg:pb-24 bg-surface"
    >
      {/* Top Meta Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1440px] mx-auto flex items-center justify-center text-center pb-6 sm:pb-8 border-b border-outline-variant/30"
      >
        <h2 className="font-headline-xl text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl lg:text-[68px] lg:leading-[72px] text-on-surface uppercase tracking-tight text-center font-extrabold">
          {isArabic ? (
            <>خدمات <span className="heading-accent">علاجات الأسنان</span>.</>
          ) : (
            <>Our <span className="heading-accent">Dental Services.</span></>
          )}
        </h2>
      </motion.div>

      {/* Grid: Clean Image on Left + Clean Item Cards on Right */}
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 my-auto py-6 sm:py-8 items-stretch">
        
        {/* Left: Pure, Clean Image with No Overlaid Elements */}
        <motion.div
          id="discipline-image-display"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm relative min-h-[250px] sm:min-h-[360px] lg:min-h-[520px] bg-surface-container-lowest border border-outline-variant/30"
        >
          {DISCIPLINES.map((item) => {
            const isVisible = activeDiscipline.id === item.id;
            return (
              <SafeImage
                key={item.id}
                alt={isArabic ? item.titleAr : item.titleEn}
                src={item.image}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
                  isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                loading="eager"
              />
            );
          })}
        </motion.div>

        {/* Right: Clean Discipline Items */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 flex flex-col justify-between gap-3 sm:gap-4"
        >
          {DISCIPLINES.map((item) => {
            const isActive = activeDiscipline.id === item.id;

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                id={`discipline-card-${item.id}`}
                onMouseEnter={() => handleItemHover(item)}
                onClick={() => {
                  onSelectDiscipline(item);
                  onOpenDetails(item);
                }}
                className={`p-4 sm:p-6 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 group cursor-pointer border active:scale-[0.99] ${
                  isActive
                    ? 'bg-surface-container-lowest border-secondary shadow-sm'
                    : 'bg-surface-container-lowest/60 hover:bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant/60'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectDiscipline(item);
                    onOpenDetails(item);
                  }
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-medium tracking-wider transition-colors ${
                        isActive ? 'text-secondary font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-label-sm uppercase tracking-wider">
                      {isArabic ? item.categoryAr : item.categoryEn}
                    </span>
                  </div>

                  <h3
                    className={`font-headline-md text-base min-[360px]:text-lg sm:text-xl uppercase mt-1 transition-colors leading-snug ${
                      isActive ? 'text-secondary font-medium' : 'text-on-surface group-hover:text-secondary'
                    }`}
                  >
                    {isArabic ? item.titleAr : item.titleEn}
                  </h3>
                </div>

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-secondary text-white'
                      : 'bg-surface-container-high/40 text-on-surface-variant group-hover:bg-secondary group-hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] rtl:rotate-180">
                    arrow_forward
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
