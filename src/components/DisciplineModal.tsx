import React, { useEffect } from 'react';
import { Discipline, Language } from '../types';
import { SafeImage } from './SafeImage';

interface DisciplineModalProps {
  discipline: Discipline | null;
  language: Language;
  onClose: () => void;
  onBookDiscipline: (discipline: Discipline) => void;
}

export const DisciplineModal: React.FC<DisciplineModalProps> = ({
  discipline,
  language,
  onClose,
  onBookDiscipline,
}) => {
  const isArabic = language === 'ar';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!discipline) return null;

  return (
    <div
      id="discipline-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs transition-opacity duration-200 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-discipline-title"
    >
      {/* Clean Modal Container matching Newsletter Minimal Style */}
      <div
        id="discipline-modal-content"
        className="relative w-full max-w-lg bg-surface rounded-3xl p-6 sm:p-8 shadow-xl border border-outline-variant/40 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Eyebrow + Subtle Close Button */}
        <div className="flex items-center justify-between gap-4 pb-1">
          <span className="font-label-caps text-xs tracking-widest text-secondary uppercase font-semibold">
            {discipline.number} / {isArabic ? discipline.categoryAr : discipline.categoryEn}
          </span>

          <button
            id="close-modal-btn"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Clean Photograph */}
        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden mt-3 mb-5 bg-surface-container-lowest border border-outline-variant/30">
          <SafeImage
            src={discipline.image}
            alt={isArabic ? discipline.titleAr : discipline.titleEn}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3
          id="modal-discipline-title"
          className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-light tracking-tight mt-2 mb-3"
        >
          {isArabic ? discipline.titleAr : discipline.titleEn}
        </h3>

        {/* Summary Description */}
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6 font-normal">
          {isArabic ? discipline.summaryAr : discipline.summaryEn}
        </p>

        {/* Key Operating Highlights */}
        <div className="py-4 border-t border-b border-outline-variant/30 space-y-2.5">
          {(isArabic ? discipline.detailsAr : discipline.detailsEn).map((point, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
              <span className="leading-relaxed">{point}</span>
            </div>
          ))}
        </div>

        {/* Minimal Meta Attributes */}
        <div className="grid grid-cols-2 gap-4 py-4 text-xs">
          <div>
            <span className="text-on-surface-variant block mb-0.5">
              {isArabic ? 'التقنية المعتمدة' : 'Technology'}
            </span>
            <span className="font-medium text-on-surface">
              {isArabic ? discipline.technologyAr : discipline.technologyEn}
            </span>
          </div>
          <div>
            <span className="text-on-surface-variant block mb-0.5">
              {isArabic ? 'الإشراف الطبي' : 'Clinical Lead'}
            </span>
            <span className="font-medium text-on-surface">
              {isArabic ? discipline.leadDoctorAr : discipline.leadDoctorEn}
            </span>
          </div>
        </div>

        {/* Clean Action Button */}
        <button
          id="modal-reserve-btn"
          type="button"
          onClick={() => {
            onBookDiscipline(discipline);
            onClose();
          }}
          className="w-full px-8 py-3.5 rounded-full bg-on-surface text-surface hover:bg-secondary font-label-caps text-label-caps uppercase tracking-widest transition-all shadow-sm hover:shadow-md cursor-pointer font-bold mt-2 flex items-center justify-center gap-2"
        >
          <span>{isArabic ? 'طلب استشارة خاصة' : 'Reserve Consultation'}</span>
          <span className="material-symbols-outlined text-[18px] rtl:rotate-180">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
