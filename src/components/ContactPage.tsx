import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Star,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';
import { MapWidget } from './MapWidget';

interface ContactPageProps {
  language: Language;
}

// Official WhatsApp glyph (same mark used in the booking + footer).
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// X (formerly Twitter) wordmark-free glyph. Lucide ships no X brand icon.
const XIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Standalone contact page. Direct channels (call / WhatsApp / email / visit),
// opening hours, the location map, and a general message form. No backend, so
// the form simulates a short request then confirms — matching the booking flow.
export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fieldClass =
    'w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:border-[#004d5a] focus:outline-none focus:ring-2 focus:ring-[#004d5a]/15 transition-all min-h-[48px]';
  // Red outline for the phone/email pair when neither is filled in.
  const errorClass = 'border-red-400 focus:border-red-500 focus:ring-red-500/15';
  const labelClass = 'text-xs font-semibold text-slate-700 block mb-1.5';

  // WhatsApp deep link prefilled with whatever the visitor filled in.
  const waMessage = isArabic
    ? `مرحباً مركز كريستال للأسنان.${name.trim() ? `\nالاسم: ${name.trim()}` : ''}${
        subject ? `\nالموضوع: ${subject}` : ''
      }${phone ? `\nالهاتف: ${phone}` : ''}${email ? `\nالبريد: ${email}` : ''}${
        message.trim() ? `\n${message.trim()}` : ''
      }`
    : `Hello Crystal Dental Center.${name.trim() ? `\nName: ${name.trim()}` : ''}${
        subject ? `\nSubject: ${subject}` : ''
      }${phone ? `\nPhone: ${phone}` : ''}${email ? `\nEmail: ${email}` : ''}${
        message.trim() ? `\n${message.trim()}` : ''
      }`;
  const waHref = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(waMessage)}`;

  // Name, subject and message are enforced with native `required`. The one rule
  // HTML can't express is "phone OR email", so it's checked here: neither is
  // invalid, either on its own is fine, both is best.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !subject || !message.trim()) return;
    if (!phone.trim() && !email.trim()) {
      setContactError(
        isArabic
          ? 'أدخل رقم الهاتف أو البريد الإلكتروني لنتمكّن من الرد عليك.'
          : 'Add a phone number or email so we can get back to you.',
      );
      return;
    }
    setContactError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setMessage('');
    setContactError('');
    setSubmitted(false);
  };

  // Direct-channel tiles rendered from CLINIC_INFO.
  const channels = [
    {
      id: 'contact-channel-phone',
      icon: Phone,
      labelEn: 'Call',
      labelAr: 'اتصال',
      value: CLINIC_INFO.telephoneDisplay,
      href: `tel:${CLINIC_INFO.telephone}`,
      external: false,
    },
    {
      id: 'contact-channel-whatsapp',
      icon: WhatsAppIcon,
      labelEn: 'WhatsApp',
      labelAr: 'واتساب',
      value: CLINIC_INFO.whatsappDisplay,
      href: `https://wa.me/${CLINIC_INFO.whatsapp}`,
      external: true,
    },
    {
      id: 'contact-channel-email',
      icon: Mail,
      labelEn: 'Email',
      labelAr: 'البريد',
      value: CLINIC_INFO.email,
      href: `mailto:${CLINIC_INFO.email}`,
      external: false,
    },
  ];

  // Social profiles, shown as icon-only buttons in their own card.
  const socials = [
    { id: 'contact-social-facebook', name: 'Facebook', icon: Facebook, href: CLINIC_INFO.facebook, hover: 'hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10' },
    { id: 'contact-social-instagram', name: 'Instagram', icon: Instagram, href: CLINIC_INFO.instagram, hover: 'hover:text-[#E4405F] hover:border-[#E4405F]/40 hover:bg-[#E4405F]/10' },
    { id: 'contact-social-x', name: 'X', icon: XIcon, href: CLINIC_INFO.x, hover: 'hover:text-black hover:border-black/40 hover:bg-black/5' },
    { id: 'contact-social-linkedin', name: 'LinkedIn', icon: Linkedin, href: CLINIC_INFO.linkedin, hover: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10' },
    { id: 'contact-social-youtube', name: 'YouTube', icon: Youtube, href: CLINIC_INFO.youtube, hover: 'hover:text-[#FF0000] hover:border-[#FF0000]/40 hover:bg-[#FF0000]/10' },
  ];

  return (
    <div className="w-full min-h-screen bg-surface pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-16">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-8 sm:gap-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-6">
          <button
            id="contact-back-btn"
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface hover:text-secondary font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span>{isArabic ? 'العودة للرئيسية' : 'Return to Home'}</span>
          </button>

          <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
            {isArabic ? 'تواصل معنا' : 'Contact'}
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto pt-2">
          <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface uppercase tracking-tight font-extrabold">
            {isArabic ? (
              <>تواصل <span className="heading-accent">معنا</span>.</>
            ) : (
              <>Get in <span className="heading-accent">Touch</span>.</>
            )}
          </h1>
          <p className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed">
            {isArabic
              ? 'اتصل، راسل على واتساب، أو اترك رسالة. نرد خلال ساعات العمل.'
              : 'Call, WhatsApp, or send a note. We reply during clinic hours.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-2">
          {/* Left: direct channels, hours, map */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl overflow-hidden bg-white border border-outline-variant/30 shadow-sm"
            >
              {/* Teal brand strip */}
              <div className="bg-[#004d5a] p-6 sm:p-7 text-white text-center">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  {isArabic ? 'تواصل مباشر' : 'Reach us directly'}
                </h2>
                <p className="mt-1.5 flex items-center justify-center gap-2 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {isArabic ? CLINIC_INFO.addressAr : CLINIC_INFO.address}
                </p>
              </div>

              {/* Channel tiles */}
              <div className="p-4 sm:p-5 flex flex-col gap-2.5">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.id}
                      id={c.id}
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group min-h-[56px]"
                    >
                      <span className="w-10 h-10 rounded-full bg-[#004d5a]/10 text-[#004d5a] flex items-center justify-center shrink-0 group-hover:bg-[#004d5a] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400">
                          {isArabic ? c.labelAr : c.labelEn}
                        </span>
                        <span className="text-sm font-medium text-slate-800 truncate">{c.value}</span>
                      </span>
                    </a>
                  );
                })}

                {/* Opening hours */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 min-h-[56px]">
                  <span className="w-10 h-10 rounded-full bg-[#008f7a]/10 text-[#008f7a] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400">
                      {isArabic ? 'ساعات العمل · الكويت (غرينتش+3)' : 'Hours · Kuwait (GMT+3)'}
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      {isArabic
                        ? 'السبت–الخميس ٩:٠٠ ص – ٩:٠٠ م · الجمعة بموعد'
                        : 'Sat–Thu 9:00 AM – 9:00 PM · Fri by appointment'}
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Map + directions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl overflow-hidden bg-white border border-outline-variant/30 shadow-sm p-4 sm:p-5 flex flex-col gap-4"
            >
              <MapWidget
                language={language}
                id="contact-page-map"
                className="w-full h-[280px] sm:h-[320px] border border-slate-200/80"
                roundedClassName="rounded-lg"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  id="contact-maps-btn"
                  href={CLINIC_INFO.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#004d5a] text-white text-sm font-medium hover:bg-[#003842] transition-colors min-h-[48px]"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{isArabic ? 'الاتجاهات على الخريطة' : 'Get Directions'}</span>
                </a>
                <a
                  id="contact-review-btn"
                  href={CLINIC_INFO.review}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#004d5a]/40 text-[#004d5a] hover:bg-[#004d5a]/5 text-sm font-medium transition-colors min-h-[48px]"
                >
                  <Star className="w-4 h-4" />
                  <span>{isArabic ? 'اكتب تقييماً' : 'Write a Review'}</span>
                </a>
              </div>
            </motion.div>

            {/* Social profiles — icon-only */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl bg-white border border-outline-variant/30 shadow-sm p-4 sm:p-5 flex flex-col gap-3"
            >
              <h2 className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold text-center">
                {isArabic ? 'تابعنا على' : 'Follow us'}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.id}
                      id={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      title={s.name}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 bg-slate-50 text-slate-600 flex items-center justify-center transition-colors ${s.hover}`}
                    >
                      <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: message form. Stays pinned while the taller info + map
              column scrolls past it. self-start stops the grid from stretching
              the card to full height (which created large empty gaps). */}
          <div className="lg:col-span-7 self-start lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl bg-white border border-outline-variant/30 shadow-sm p-6 sm:p-9 lg:p-10"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <span className="w-16 h-16 rounded-full bg-[#008f7a]/10 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-9 h-9 text-[#008f7a]" />
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                    {isArabic ? 'تم استلام رسالتك' : 'Message received'}
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                    {isArabic
                      ? 'شكراً. نرد خلال ساعات العمل. للضرورة، اتصل على '
                      : "Thanks. We answer during clinic hours. If it's urgent, call "}
                    <span className="font-medium text-slate-700" dir="ltr">
                      {CLINIC_INFO.telephoneDisplay}
                    </span>
                    .
                  </p>
                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <button
                      id="contact-reset-btn"
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer"
                    >
                      {isArabic ? 'إرسال رسالة أخرى' : 'Send another message'}
                    </button>
                    <a
                      id="contact-success-whatsapp"
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#004d5a] text-white text-sm font-medium hover:bg-[#003842] transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      {isArabic ? 'متابعة على واتساب' : 'Continue on WhatsApp'}
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
                    {isArabic ? 'أرسل رسالة' : 'Send a Message'}
                  </h3>

                  {/* Name & subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} htmlFor="contact-name">
                        {isArabic ? 'الاسم الكامل' : 'Full name'}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isArabic ? 'الاسم الكريم' : 'Your full name'}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="contact-subject">
                        {isArabic ? 'الموضوع' : 'Subject'}
                      </label>
                      <select
                        id="contact-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className={`${fieldClass} cursor-pointer`}
                      >
                        <option value="">{isArabic ? 'اختر موضوعاً' : 'Select a topic'}</option>
                        <option value="booking">{isArabic ? 'حجز موعد' : 'Booking / appointment'}</option>
                        <option value="treatment">{isArabic ? 'سؤال عن علاج' : 'Treatment question'}</option>
                        <option value="products">{isArabic ? 'المنتجات' : 'Products'}</option>
                        <option value="feedback">{isArabic ? 'ملاحظة' : 'Feedback'}</option>
                        <option value="other">{isArabic ? 'أخرى' : 'Other'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Phone & email — at least one is required */}
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="contact-phone">
                          {isArabic ? 'الهاتف' : 'Phone'}
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (contactError) setContactError('');
                          }}
                          placeholder="+965 ---- ----"
                          aria-invalid={!!contactError}
                          className={`${fieldClass} ${contactError ? errorClass : ''}`}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="contact-email">
                          {isArabic ? 'البريد الإلكتروني' : 'Email'}
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (contactError) setContactError('');
                          }}
                          placeholder="you@email.com"
                          aria-invalid={!!contactError}
                          className={`${fieldClass} ${contactError ? errorClass : ''}`}
                        />
                      </div>
                    </div>
                    {contactError && (
                      <p className="mt-1.5 text-xs text-red-600">{contactError}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass} htmlFor="contact-message">
                      {isArabic ? 'رسالتك' : 'Your Message'}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isArabic ? 'كيف نقدر نساعدك؟' : 'How can we help?'}
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[50px] px-6 py-3.5 rounded-xl bg-[#004d5a] hover:bg-[#003842] active:bg-[#002a32] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span>{isArabic ? 'جارٍ الإرسال...' : 'Sending...'}</span>
                    ) : (
                      <span>{isArabic ? 'إرسال الرسالة' : 'Send Message'}</span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
