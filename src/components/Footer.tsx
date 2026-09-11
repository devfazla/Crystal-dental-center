import React from 'react';
import {
  Instagram,
  Linkedin,
  Phone,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';
import teethLogo from '../assets/images/teeth_transparent.png';

interface FooterProps {
  language: Language;
  onNavigate?: (page: 'home' | 'gallery', sectionId?: string) => void;
}

// Official WhatsApp icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const isArabic = language === 'ar';
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home', sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    {
      id: 'disciplines',
      labelEn: 'Services',
      labelAr: 'الخدمات',
    },
    {
      id: 'sanctuary',
      labelEn: 'About Clinic',
      labelAr: 'عن العيادة',
    },
    {
      id: 'gallery',
      labelEn: 'Gallery',
      labelAr: 'الصور',
    },
    {
      id: 'reviews',
      labelEn: 'Reviews',
      labelAr: 'الآراء',
    },
    {
      id: 'booking',
      labelEn: 'Book Appointment',
      labelAr: 'حجز موعد',
    },
  ];

  const socialLinks = [
    {
      id: 'footer-social-instagram',
      name: 'Instagram',
      icon: Instagram,
      url: CLINIC_INFO.instagram,
      hoverClass: 'hover:text-[#E4405F] hover:bg-[#E4405F]/15 hover:border-[#E4405F]/40',
    },
    {
      id: 'footer-social-linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      url: CLINIC_INFO.linkedin,
      hoverClass: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/40',
    },
    {
      id: 'footer-social-whatsapp',
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      url: `https://wa.me/${CLINIC_INFO.whatsapp}`,
      hoverClass: 'hover:text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366]/40',
    },
  ];

  return (
    <footer className="w-full bg-black border-t border-white/10 text-slate-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-14 pb-10">
        {/* Main Structured 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Clinic Name & Social Icons Only (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="flex items-center gap-3.5">
              <img
                src={teethLogo}
                alt={isArabic ? 'شعار عيادة كريستال' : 'Crystal Dental Logo'}
                className="w-12 h-12 object-contain shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                  {isArabic ? CLINIC_INFO.nameAr : CLINIC_INFO.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-normal">
                  {isArabic
                    ? `${CLINIC_INFO.founderAr} · برج كريستال، الشرق، الكويت`
                    : `${CLINIC_INFO.founder} · Crystal Tower, Sharq, Kuwait`}
                </p>
              </div>
            </div>

            {/* Social Media - Only Icons */}
            <div className="space-y-3">
              <span className="text-xs font-medium text-slate-400">
                {isArabic ? 'تابعنا' : 'Follow Us'}
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      id={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 select-none ${item.hoverClass}`}
                      aria-label={item.name}
                      title={item.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isArabic ? 'روابط سريعة' : 'Quick Links'}
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    id={`footer-nav-${link.id}`}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{isArabic ? link.labelAr : link.labelEn}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Us (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-3.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </span>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a
                  id="footer-contact-phone"
                  href={`tel:${CLINIC_INFO.telephone}`}
                  className="hover:text-white font-medium transition-colors"
                >
                  {CLINIC_INFO.telephoneDisplay}
                </a>
              </div>

              {/* WhatsApp direct */}
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  id="footer-contact-whatsapp"
                  href={`https://wa.me/${CLINIC_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-medium transition-colors"
                >
                  {CLINIC_INFO.whatsappDisplay}
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <a
                  id="footer-contact-map"
                  href={CLINIC_INFO.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 leading-relaxed"
                >
                  <span>{isArabic ? 'خرائط جوجل' : 'Google Map'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & License */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {isArabic ? CLINIC_INFO.nameAr : CLINIC_INFO.name}. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}</p>
          <p className="font-mono text-[11px] text-slate-500">
            {isArabic ? CLINIC_INFO.licenseAr : CLINIC_INFO.license} · {isArabic ? 'دولة الكويت' : 'State of Kuwait'}
          </p>
        </div>
      </div>
    </footer>
  );
};
