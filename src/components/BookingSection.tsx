import React, { useState } from 'react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';

interface BookingSectionProps {
  language: Language;
  initialDiscipline?: string;
  onScrollToTop?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  language,
  initialDiscipline = 'Invisalign & Orthodontics',
}) => {
  const isArabic = language === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialDiscipline);
  const [preferredTiming, setPreferredTiming] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    const consultationText =
      `Hello Crystal Dental Center,\n\n` +
      `Appointment Request:\n` +
      `• Name: ${name}\n` +
      `• Phone: ${phone}\n` +
      `• Discipline: ${service}\n` +
      (preferredTiming ? `• Timing: ${preferredTiming}\n` : '') +
      `• Location: Crystal Tower, 8th Floor, Sharq`;

    const encoded = encodeURIComponent(consultationText);
    const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encoded}`;

    setShowSuccess(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section
      id="booking"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-3 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20 bg-transparent"
    >
      <div className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden bg-white text-slate-800 grid grid-cols-1 md:grid-cols-12 border border-outline-variant/30">
        {/* Left Side: Minimalist Brand & Location Panel */}
        <div className="md:col-span-5 bg-[#004d5a] p-6 sm:p-8 md:p-8 lg:p-10 flex flex-col justify-between text-white">
          <div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-white font-light tracking-tight mb-2 sm:mb-3">
              {isArabic ? (
                <>
                  زيارة <span className="font-serif italic text-secondary-fixed">كريستال</span>
                </>
              ) : (
                <>
                  Visit <span className="font-serif italic text-secondary-fixed">Crystal</span>
                </>
              )}
            </h2>

            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
              {isArabic
                ? 'برج كريستال · الدور الثامن · الشرق، الكويت'
                : 'Crystal Tower · 8th Floor · Sharq, Kuwait'}
            </p>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:gap-3">
              <a
                href={`tel:${CLINIC_INFO.telephone}`}
                className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/95 transition-colors group min-h-[44px]"
              >
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">call</span>
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] text-white/60 uppercase tracking-wider font-sans">
                    {isArabic ? 'اتصال مباشر' : 'Direct Call'}
                  </span>
                  <span className="text-xs sm:text-sm font-mono tracking-wide">{CLINIC_INFO.telephoneDisplay}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/95 transition-colors group min-h-[44px]"
              >
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] text-white/60 uppercase tracking-wider font-sans">
                    {isArabic ? 'استشارة فورية' : 'Instant Consult'}
                  </span>
                  <span className="text-xs sm:text-sm font-medium tracking-wide">
                    {isArabic ? 'محادثة واتساب' : 'WhatsApp Chat'}
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10 pt-4 border-t border-white/15 text-[11px] sm:text-xs text-white/60 tracking-wider uppercase">
            {isArabic ? 'جناح 801 · مواعيد واستشارات سريرية' : 'Suite 801 · Private Consultations'}
          </div>
        </div>

        {/* Right Side: Clean Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 md:p-8 lg:p-10 flex flex-col justify-center">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
            {isArabic ? 'حجز موعد استشارة' : 'Book an Appointment'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
            {isArabic
              ? 'املأ بياناتك وسيقوم فريق العيادة بالتواصل معك لتأكيد الموعد.'
              : 'Fill in your details and our reception team will promptly confirm your visit.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1" htmlFor="fullName">
                {isArabic ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isArabic ? 'الاسم الكريم' : 'Your full name'}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#004d5a] focus:bg-white text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004d5a]/20 transition-all min-h-[46px]"
              />
            </div>

            {/* Phone & Preferred Time: Responsive 2-col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1" htmlFor="phoneNumber">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+965 ---- ----"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#004d5a] focus:bg-white text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004d5a]/20 transition-all min-h-[46px]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1" htmlFor="preferredTiming">
                  {isArabic ? 'التوقيت المفضل' : 'Preferred Timing'}
                </label>
                <input
                  id="preferredTiming"
                  type="text"
                  value={preferredTiming}
                  onChange={(e) => setPreferredTiming(e.target.value)}
                  placeholder={isArabic ? 'صباحاً أو مساءً' : 'e.g. Morning / Evening'}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#004d5a] focus:bg-white text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004d5a]/20 transition-all min-h-[46px]"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1" htmlFor="serviceType">
                {isArabic ? 'الخدمة المطلوبة' : 'Service Needed'}
              </label>
              <select
                id="serviceType"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#004d5a] focus:bg-white text-slate-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#004d5a]/20 transition-all cursor-pointer min-h-[46px]"
              >
                <option value="Invisalign & Orthodontics">
                  {isArabic ? 'تقويم الأسنان وإنفزلاين®' : 'Invisalign® & Braces'}
                </option>
                <option value="Swiss Dental Implants">
                  {isArabic ? 'زراعة الأسنان السويسرية' : 'Swiss Dental Implants'}
                </option>
                <option value="Microscopic Endodontics">
                  {isArabic ? 'علاج عصب الأسنان بالمجهر' : 'Microscopic Endodontics'}
                </option>
                <option value="Crystal Hygiene">
                  {isArabic ? 'تنظيف وتلميع الأسنان' : 'Teeth Cleaning & Polish'}
                </option>
                <option value="Smile Makeover">
                  {isArabic ? 'تجميل وابتسامة هوليوود' : 'Smile Makeover & Veneers'}
                </option>
              </select>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                id="booking-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] px-6 py-3.5 rounded-xl bg-[#004d5a] hover:bg-[#003842] active:bg-[#002a32] text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.99]"
              >
                <span>
                  {isSubmitting
                    ? isArabic
                      ? 'جاري التحويل...'
                      : 'Connecting...'
                    : isArabic
                    ? 'تأكيد الحجز عبر الواتساب'
                    : 'Confirm via WhatsApp'}
                </span>
                <span className="material-symbols-outlined text-[18px] rtl:rotate-180">arrow_forward</span>
              </button>
            </div>
          </form>

          {showSuccess && (
            <div
              id="bookingFeedback"
              className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center text-xs font-medium animate-fade-in"
            >
              {isArabic
                ? 'جاري فتح الواتساب للتواصل مع العيادة...'
                : 'Opening WhatsApp to connect with the clinic...'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
