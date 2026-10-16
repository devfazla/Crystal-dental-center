import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { IMAGES, VIDEOS, CLINIC_INFO } from '../data/content';

interface HeroSectionProps {
  language: Language;
}

// Full-screen hero: the cinematic clip plays as an ambient cover background,
// dimmed by a black overlay, with the Crystal Dental Center branding centered
// on top. No inline player controls — the video is set dressing, not a widget.
export const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enforce muted playback so autoplay is allowed by browser policies. React's
  // muted prop isn't always reflected to the DOM attribute, so set it directly.
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.defaultMuted = true;
      const attempt = v.play();
      if (attempt) attempt.catch(() => {});
    }
  }, []);

  const scrollToNext = () => {
    const target = document.getElementById('intro');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background video (cover, ambient, no controls) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={IMAGES.heroChair}
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src={VIDEOS.heroCinematic} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Black overlay for legibility */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      {/* Centered branding */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display-hero uppercase tracking-tight text-white text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg"
        >
          {isArabic ? CLINIC_INFO.nameAr : CLINIC_INFO.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent via-secondary-fixed/80 to-transparent" />
          <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.4em] text-secondary-fixed">
            {isArabic ? 'ابتسامتك، بهوية' : 'Brand Your Smile'}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-5 max-w-md text-sm sm:text-base text-white/70 leading-relaxed"
        >
          {isArabic ? CLINIC_INFO.towerAr : CLINIC_INFO.tower}
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.button
        id="hero-scroll-cue"
        type="button"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        aria-label={isArabic ? 'انزل للأسفل' : 'Scroll down'}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors cursor-pointer animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
};
