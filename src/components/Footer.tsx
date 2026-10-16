import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';
import { useSectionNav } from '../hooks/useSectionNav';
import { SafeImage } from './SafeImage';
import { MapWidget } from './MapWidget';
import teethLogo from '../assets/images/teeth_transparent.png';

interface FooterProps {
  language: Language;
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

// X (formerly Twitter) glyph. Lucide ships no X brand icon.
const XIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const scrollToSection = useSectionNav();

  // Each quick link is either a standalone route or a home-page section.
  const navLinks: {
    id: string;
    labelEn: string;
    labelAr: string;
    to?: string;
    section?: string;
  }[] = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية', to: '/' },
    { id: 'disciplines', labelEn: 'Services', labelAr: 'الخدمات', section: 'disciplines' },
    { id: 'about', labelEn: 'About Clinic', labelAr: 'عن العيادة', section: 'experience' },
    { id: 'gallery', labelEn: 'Gallery', labelAr: 'الصور', to: '/gallery' },
    { id: 'products', labelEn: 'Products', labelAr: 'المتجر', to: '/products' },
    { id: 'reviews', labelEn: 'Reviews', labelAr: 'الآراء', section: 'reviews' },
    { id: 'contact', labelEn: 'Contact', labelAr: 'تواصل معنا', to: '/contact' },
    { id: 'links', labelEn: 'All Links', labelAr: 'كل الروابط', to: '/links' },
    { id: 'booking', labelEn: 'Book Appointment', labelAr: 'حجز موعد', section: 'booking' },
  ];

  const socialLinks = [
    {
      id: 'footer-social-facebook',
      name: 'Facebook',
      icon: Facebook,
      url: CLINIC_INFO.facebook,
      hoverClass: 'hover:text-[#1877F2] hover:bg-[#1877F2]/15 hover:border-[#1877F2]/40',
    },
    {
      id: 'footer-social-instagram',
      name: 'Instagram',
      icon: Instagram,
      url: CLINIC_INFO.instagram,
      hoverClass: 'hover:text-[#E4405F] hover:bg-[#E4405F]/15 hover:border-[#E4405F]/40',
    },
    {
      id: 'footer-social-x',
      name: 'X',
      icon: XIcon,
      url: CLINIC_INFO.x,
      hoverClass: 'hover:text-white hover:bg-black/40 hover:border-white/40',
    },
    {
      id: 'footer-social-linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      url: CLINIC_INFO.linkedin,
      hoverClass: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/40',
    },
    {
      id: 'footer-social-youtube',
      name: 'YouTube',
      icon: Youtube,
      url: CLINIC_INFO.youtube,
      hoverClass: 'hover:text-[#FF0000] hover:bg-[#FF0000]/15 hover:border-[#FF0000]/40',
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-[#006971] to-[#014a50] text-white/80">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-8">
        {/* Main layout: content on one side, square map on the other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Content column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10 sm:gap-12">
            {/* Brand */}
            <div className="flex items-start gap-4">
              <span className="w-16 h-16 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0 p-3">
                <SafeImage
                  src={teethLogo}
                  alt={isArabic ? 'شعار عيادة كريستال' : 'Crystal Dental Logo'}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
                  {isArabic ? CLINIC_INFO.nameAr : CLINIC_INFO.name}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55 max-w-sm">
                  {isArabic
                    ? `${CLINIC_INFO.founderAr} · برج كريستال، الشرق، الكويت`
                    : `${CLINIC_INFO.founder} · Crystal Tower, Sharq, Kuwait`}
                </p>
              </div>
            </div>

            {/* Explore + Get in touch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              {/* Quick Links */}
              <nav className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  {isArabic ? 'روابط سريعة' : 'Quick Links'}
                </span>
                <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        id={`footer-nav-${link.id}`}
                        href={link.to ? `#${link.to}` : '#/'}
                        onClick={(e) => {
                          e.preventDefault();
                          if (link.to) navigate(link.to);
                          else if (link.section) scrollToSection(link.section);
                        }}
                        className="group inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors"
                      >
                        <span className="h-px w-4 bg-white/30 group-hover:w-6 group-hover:bg-secondary-fixed transition-all duration-300" />
                        <span>{isArabic ? link.labelAr : link.labelEn}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Get in Touch */}
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  {isArabic ? 'تواصل معنا' : 'Get in Touch'}
                </span>
                <div className="mt-4 space-y-3">
                  <a
                    id="footer-contact-phone"
                    href={`tel:${CLINIC_INFO.telephone}`}
                    className="group flex items-center gap-3 text-white/80 hover:text-white"
                  >
                    <span className="w-9 h-9 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <Phone className="w-4 h-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-white/45">{isArabic ? 'اتصال' : 'Call'}</span>
                      <span className="text-sm font-medium">{CLINIC_INFO.telephoneDisplay}</span>
                    </span>
                  </a>

                  <a
                    id="footer-contact-email"
                    href={`mailto:${CLINIC_INFO.email}`}
                    className="group flex items-center gap-3 text-white/80 hover:text-white"
                  >
                    <span className="w-9 h-9 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-white/45">{isArabic ? 'البريد' : 'Email'}</span>
                      <span className="text-sm font-medium break-all">{CLINIC_INFO.email}</span>
                    </span>
                  </a>

                  <a
                    id="footer-contact-whatsapp"
                    href={`https://wa.me/${CLINIC_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-white/80 hover:text-white"
                  >
                    <span className="w-9 h-9 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <WhatsAppIcon className="w-4 h-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-white/45">{isArabic ? 'واتساب' : 'WhatsApp'}</span>
                      <span className="text-sm font-medium">{CLINIC_INFO.whatsappDisplay}</span>
                    </span>
                  </a>

                  <p className="flex items-center gap-3 text-white/80 pt-0.5">
                    <span className="w-9 h-9 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="text-sm leading-relaxed">{isArabic ? CLINIC_INFO.addressAr : CLINIC_INFO.address}</span>
                  </p>
                </div>

                {/* Social */}
                <div className="flex items-center gap-2.5 mt-6">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.id}
                        id={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 select-none ${item.hoverClass}`}
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
          </div>

          {/* Square map on the side */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                {isArabic ? 'موقعنا' : 'Find Us'}
              </span>
              <a
                id="footer-map-directions"
                href={CLINIC_INFO.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/70 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <span>{isArabic ? 'الاتجاهات' : 'Directions'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <MapWidget
              language={language}
              id="footer-map"
              className="w-full aspect-square border border-white/15"
              roundedClassName="rounded-2xl"
            />
          </div>
        </div>

        {/* Bottom Bar: Copyright & License */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>© {currentYear} {isArabic ? CLINIC_INFO.nameAr : CLINIC_INFO.name}. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}</p>
          <p className="font-mono text-[11px]">
            {isArabic ? CLINIC_INFO.licenseAr : CLINIC_INFO.license} · {isArabic ? 'دولة الكويت' : 'State of Kuwait'}
          </p>
        </div>
      </div>
    </footer>
  );
};
