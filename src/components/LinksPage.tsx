import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Phone,
  Instagram,
  Linkedin,
  MapPin,
  Globe,
  ChevronRight,
} from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';
import { SafeImage } from './SafeImage';
import teethLogo from '../assets/images/teeth_transparent.png';

interface LinksPageProps {
  language: Language;
  onToggleLanguage: () => void;
}

// Official WhatsApp glyph (lucide has no brand icon)
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

type LinkItem = {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  to?: string; // internal route
  external?: boolean;
  highlight?: boolean;
};

export const LinksPage: React.FC<LinksPageProps> = ({ language, onToggleLanguage }) => {
  const isArabic = language === 'ar';

  // Standalone page: start at the top whenever it mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const links: LinkItem[] = [
    {
      id: 'links-phone',
      labelEn: 'Phone',
      labelAr: 'هاتف',
      icon: Phone,
      href: `tel:${CLINIC_INFO.telephone}`,
    },
    {
      id: 'links-whatsapp',
      labelEn: 'WhatsApp',
      labelAr: 'واتساب',
      icon: WhatsAppIcon,
      href: `https://wa.me/${CLINIC_INFO.whatsapp}`,
      external: true,
      highlight: true,
    },
    {
      id: 'links-instagram',
      labelEn: 'Instagram',
      labelAr: 'إنستغرام',
      icon: Instagram,
      href: CLINIC_INFO.instagram,
      external: true,
    },
    {
      id: 'links-linkedin',
      labelEn: 'LinkedIn',
      labelAr: 'لينكدإن',
      icon: Linkedin,
      href: CLINIC_INFO.linkedin,
      external: true,
    },
    {
      id: 'links-directions',
      labelEn: 'Directions',
      labelAr: 'الاتجاهات',
      icon: MapPin,
      href: CLINIC_INFO.googleMaps,
      external: true,
    },
    {
      id: 'links-website',
      labelEn: 'Website',
      labelAr: 'الموقع',
      icon: Globe,
      to: '/',
    },
  ];

  const rowBase =
    'group flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-200 active:scale-[0.99]';

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="relative min-h-screen w-full flex items-center justify-center px-4 py-10 sm:py-16 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #eef4fb 0%, #f6f9fd 45%, #eaf1f8 100%)',
      }}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md md:max-w-2xl rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white shadow-[0_30px_80px_-24px_rgba(15,42,67,0.28)] px-5 py-8 sm:px-10 sm:py-12"
      >
        {/* Language switcher */}
        <div className="absolute top-5 right-5 rtl:left-5 rtl:right-auto flex items-center rounded-full bg-slate-100/80 border border-slate-200/70 p-1 text-xs font-semibold">
          <button
            id="links-lang-en"
            type="button"
            onClick={() => language !== 'en' && onToggleLanguage()}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
              !isArabic ? 'bg-white text-[#0f2a43] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            EN
          </button>
          <button
            id="links-lang-ar"
            type="button"
            onClick={() => language !== 'ar' && onToggleLanguage()}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
              isArabic ? 'bg-white text-[#0f2a43] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            عربي
          </button>
        </div>

        {/* Profile header */}
        <div className="flex flex-col items-center text-center pt-4">
          <div className="w-28 h-28 rounded-full bg-white shadow-lg ring-1 ring-slate-100 flex items-center justify-center p-4">
            <SafeImage
              src={teethLogo}
              alt={isArabic ? 'شعار مركز كريستال للأسنان' : 'Crystal Dental Center logo'}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="mt-5 text-2xl sm:text-[28px] font-bold tracking-tight text-[#0f2a43]">
            {isArabic ? CLINIC_INFO.nameAr : CLINIC_INFO.name}
          </h1>
          <p className="mt-1 text-base sm:text-lg text-slate-400 font-medium">
            {isArabic ? CLINIC_INFO.name : CLINIC_INFO.nameAr}
          </p>
        </div>

        {/* Link grid: single column on mobile, two columns on larger screens */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {links.map((link, idx) => {
            const Icon = link.icon;
            const content = (
              <>
                <span
                  className={`flex items-center justify-center shrink-0 ${
                    link.highlight ? 'text-[#128C7E]' : 'text-[#0f2a43]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </span>
                <span
                  className={`flex-1 text-start text-base sm:text-lg font-semibold ${
                    link.highlight ? 'text-[#128C7E]' : 'text-[#0f2a43]'
                  }`}
                >
                  {isArabic ? link.labelAr : link.labelEn}
                </span>
                <ChevronRight
                  className={`w-5 h-5 shrink-0 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 ${
                    link.highlight ? 'text-[#128C7E]' : 'text-slate-400'
                  }`}
                />
              </>
            );

            const classes = link.highlight
              ? `${rowBase} bg-[#e7f6f1] border-[#bfe6da] hover:border-[#128C7E]/50 hover:shadow-sm`
              : `${rowBase} bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm`;

            const anim = {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.15 + idx * 0.06, ease: [0.22, 1, 0.36, 1] as const },
            };

            if (link.to) {
              return (
                <motion.div key={link.id} {...anim}>
                  <Link to={link.to} id={link.id} className={classes}>
                    {content}
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div key={link.id} {...anim}>
                <a
                  id={link.id}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={classes}
                >
                  {content}
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Subtle footer line */}
        <div className="mt-9 flex items-center justify-center gap-3 text-slate-300">
          <span className="h-px w-10 bg-slate-200" />
          <p className="text-xs font-medium tracking-wide text-slate-400 text-center">
            {isArabic ? CLINIC_INFO.towerAr : CLINIC_INFO.tower}
          </p>
          <span className="h-px w-10 bg-slate-200" />
        </div>
      </motion.div>
    </div>
  );
};
