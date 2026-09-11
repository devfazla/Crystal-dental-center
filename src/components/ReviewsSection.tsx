import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language, ReviewItem } from '../types';
import { REVIEWS } from '../data/content';

interface ReviewsSectionProps {
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const isArabic = language === 'ar';

  // Carousel pause state
  const [isPaused, setIsPaused] = useState(false);

  // Tracks which card is currently hovered and which card's stars are animating
  const [hoveredCardKey, setHoveredCardKey] = useState<string | null>(null);
  const [animatingCardKey, setAnimatingCardKey] = useState<string | null>(null);

  // Refs for 1s hover timer and current target card
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentCardKeyRef = useRef<string | null>(null);

  // Clear timer safely on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  // When mouse moves over any part of the carousel or cards:
  // 1. Immediately continue/resume the carousel
  // 2. Clear previous hover timer
  // 3. Set 1-second (1000ms) hover timer: after 1s of stationary hover, pause carousel & trigger star animation
  const handleMouseMove = useCallback((cardKey?: string) => {
    if (cardKey) {
      currentCardKeyRef.current = cardKey;
      setHoveredCardKey(cardKey);
    }

    // Immediately continue carousel whenever mouse moves
    setIsPaused(false);

    // Reset currently animating card while mouse is moving
    setAnimatingCardKey(null);

    // Clear any pending timer
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    // Set 1-second (1000ms) hover timer
    hoverTimerRef.current = setTimeout(() => {
      setIsPaused(true);
      if (currentCardKeyRef.current) {
        setAnimatingCardKey(currentCardKeyRef.current);
      }
    }, 1000);
  }, []);

  // When mouse leaves the carousel viewport
  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    currentCardKeyRef.current = null;
    setHoveredCardKey(null);
    setAnimatingCardKey(null);

    // Continue carousel when mouse leaves
    setIsPaused(false);
  }, []);

  // When mouse enters a specific card
  const handleCardMouseEnter = useCallback(
    (cardKey: string) => {
      handleMouseMove(cardKey);
    },
    [handleMouseMove]
  );

  // Group reviews into 3 columns
  const col1 = [REVIEWS[0], REVIEWS[3], REVIEWS[6]];
  const col2 = [REVIEWS[1], REVIEWS[4], REVIEWS[7]];
  const col3 = [REVIEWS[2], REVIEWS[5], REVIEWS[8]];

  // Duplicate arrays for seamless vertical infinite looping
  const col1Loop = [...col1, ...col1];
  const col2Loop = [...col2, ...col2];
  const col3Loop = [...col3, ...col3];

  const renderCard = (item: ReviewItem, idx: number, colPrefix: string) => {
    const cardKey = `${colPrefix}-${item.id}-${idx}`;
    const isThisCardAnimating = animatingCardKey === cardKey;
    const isThisCardHovered = hoveredCardKey === cardKey;

    return (
      <div
        key={cardKey}
        id={`review-card-${cardKey}`}
        onMouseEnter={() => handleCardMouseEnter(cardKey)}
        onMouseMove={() => handleMouseMove(cardKey)}
        className={`group relative rounded-3xl bg-white border p-6 sm:p-7 transition-all duration-300 select-none ${
          isThisCardAnimating
            ? 'border-amber-300 ring-2 ring-amber-400/50 shadow-[0_12px_36px_-6px_rgba(245,158,11,0.22)] scale-[1.015]'
            : isThisCardHovered
            ? 'border-slate-300 shadow-lg scale-[1.008]'
            : 'border-slate-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-md'
        }`}
      >
        {/* Author Header */}
        <div className="flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src={item.avatar}
              alt={isArabic ? item.authorAr : item.authorEn}
              className={`w-11 h-11 rounded-full object-cover shrink-0 ring-2 transition-all duration-300 ${
                isThisCardAnimating ? 'ring-amber-400' : 'ring-slate-100'
              }`}
              loading="lazy"
            />
            <div className="min-w-0">
              <h4 className="font-semibold text-slate-900 text-sm tracking-tight truncate">
                {isArabic ? item.authorAr : item.authorEn}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 truncate flex items-center gap-1.5">
                <span>{isArabic ? item.roleAr : item.roleEn}</span>
                <span className="text-[#008f7a] font-medium">{item.handle}</span>
              </p>
            </div>
          </div>

          {/* Verified Check Badge */}
          {item.verified && (
            <div
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-[10px] font-medium shrink-0"
              title={isArabic ? 'مراجع موثق في عيادتنا' : 'Verified Clinic Patient'}
            >
              <CheckCircle2 className="w-3 h-3 text-[#008f7a]" />
              <span className="hidden sm:inline">{isArabic ? 'موثّق' : 'Verified'}</span>
            </div>
          )}
        </div>

        {/* Star Rating Bar with 1-Second Hover Pop Animation */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((starIdx) => {
              const fillFraction = Math.max(0, Math.min(1, item.rating - starIdx));
              const isFull = fillFraction >= 0.95;
              const isPartial = fillFraction > 0 && fillFraction < 0.95;

              return (
                <div
                  key={starIdx}
                  className={`relative inline-flex items-center justify-center transition-transform duration-200 ${
                    isThisCardAnimating ? 'animate-star-pop' : ''
                  }`}
                  style={
                    isThisCardAnimating
                      ? { animationDelay: `${starIdx * 80}ms` }
                      : undefined
                  }
                >
                  {isFull ? (
                    <Star
                      className={`w-4 h-4 transition-all duration-300 ${
                        isThisCardAnimating
                          ? 'text-amber-500 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)] scale-110'
                          : 'text-amber-400 fill-amber-400'
                      }`}
                    />
                  ) : isPartial ? (
                    <div className="relative w-4 h-4">
                      {/* Empty base star */}
                      <Star className="w-4 h-4 text-slate-200 fill-slate-100" />
                      {/* Fractional filled overlay */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${Math.round(fillFraction * 100)}%` }}
                      >
                        <Star
                          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isThisCardAnimating
                              ? 'text-amber-500 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)] scale-110'
                              : 'text-amber-400 fill-amber-400'
                          }`}
                        />
                      </div>
                    </div>
                  ) : (
                    <Star className="w-4 h-4 text-slate-200 fill-slate-100" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Score & Treatment */}
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={`font-bold transition-colors duration-300 ${
                isThisCardAnimating ? 'text-amber-600 font-extrabold' : 'text-slate-700'
              }`}
            >
              {item.rating.toFixed(1)}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 text-[11px] truncate max-w-[150px]">
              {isArabic ? item.treatmentAr : item.treatmentEn}
            </span>
          </div>
        </div>

        {/* Review Body */}
        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-3.5 font-normal">
          {isArabic ? item.contentAr : item.contentEn}
        </p>

        {/* Timestamp */}
        <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
          <span className="font-mono sm:font-sans">{isArabic ? item.dateAr : item.dateEn}</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="reviews"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-12 pt-16 pb-20 lg:pb-24 bg-surface border-t border-outline-variant/30 overflow-hidden"
    >
      {/* Top Header */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center pb-4">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-[52px] lg:leading-[58px] font-bold text-slate-900 tracking-tight text-center">
          {isArabic ? 'تجارب وآراء عملائنا ومراجعينا' : 'Reviews from our clients'}
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-slate-500 text-sm sm:text-base font-normal max-w-xl text-center">
          {isArabic
            ? 'شهادات وتجارب حقيقية من مراجعي عيادتنا في برج كريستال'
            : 'Testimonials from our clients around globe'}
        </p>
      </div>

      {/* 3-Column Vertical Carousel Stream */}
      <div
        className={`relative w-full max-w-6xl mx-auto my-4 group-marquee ${
          isPaused ? 'is-paused' : ''
        }`}
        onMouseMove={() => handleMouseMove()}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Gradient Fade Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-surface via-surface/90 to-transparent z-20"
        />

        {/* Bottom Gradient Fade Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-surface via-surface/90 to-transparent z-20"
        />

        {/* Carousel Viewport Container */}
        <div
          className="relative h-[540px] sm:h-[600px] lg:h-[640px] overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-start"
          style={isPaused ? { animationPlayState: 'paused' } : undefined}
        >
          {/* Column 1 (Scrolls upward) */}
          <div
            className="flex flex-col gap-5 sm:gap-6 animate-marquee-up"
            style={isPaused ? { animationPlayState: 'paused' } : undefined}
          >
            {col1Loop.map((item, idx) => renderCard(item, idx, 'c1'))}
          </div>

          {/* Column 2 (Scrolls downward for natural contrast) */}
          <div
            className="flex flex-col gap-5 sm:gap-6 animate-marquee-down"
            style={isPaused ? { animationPlayState: 'paused' } : undefined}
          >
            {col2Loop.map((item, idx) => renderCard(item, idx, 'c2'))}
          </div>

          {/* Column 3 (Scrolls upward at slightly different pace, desktop only) */}
          <div
            className="flex flex-col gap-5 sm:gap-6 animate-marquee-up-slow md:hidden lg:flex"
            style={isPaused ? { animationPlayState: 'paused' } : undefined}
          >
            {col3Loop.map((item, idx) => renderCard(item, idx, 'c3'))}
          </div>
        </div>
      </div>

      {/* Bottom Stats Container */}
      <div className="w-full max-w-5xl mx-auto mt-4 sm:mt-6">
        <div
          id="reviews-stats-banner"
          className="rounded-[28px] sm:rounded-3xl bg-[#e6f8f5] border border-[#bcece3] py-8 sm:py-10 px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center shadow-xs"
        >
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 tracking-tight leading-none">
              10k<span className="text-[#00a389] font-medium">+</span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-3.5 font-medium tracking-normal">
              {isArabic ? 'عميل ومراجع حول العالم' : 'Clients around globe'}
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center border-y sm:border-y-0 sm:border-x border-[#c7ede6] py-4 sm:py-0">
            <div className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 tracking-tight leading-none">
              97<span className="text-[#00a389] font-medium">%</span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-3.5 font-medium tracking-normal">
              {isArabic ? 'نسبة الرضا التام' : 'Satisfaction rate'}
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 tracking-tight leading-none">
              22k<span className="text-[#00a389] font-medium">+</span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-3.5 font-medium tracking-normal">
              {isArabic ? 'إجراء علاجي واستشارة' : 'Procedures & consults'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
