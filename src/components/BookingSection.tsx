import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';

interface BookingSectionProps {
  language: Language;
  initialDiscipline?: string;
  onScrollToTop?: () => void;
}

// Official WhatsApp glyph
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Clinic hours (Kuwait): Sat–Thu 9:00–21:00, Friday by appointment.
const OPEN_HOUR = 9;
const CLOSE_HOUR = 21;

function computeClinicStatus() {
  // Read the visitor's local clock, but resolve it as Kuwait wall-clock time.
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kuwait',
    weekday: 'short',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? '';
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
  const isFriday = weekday === 'Fri';
  const isOpen = !isFriday && hour >= OPEN_HOUR && hour < CLOSE_HOUR;
  return { isFriday, isOpen };
}

function useClinicStatus() {
  const [status, setStatus] = useState(computeClinicStatus);
  useEffect(() => {
    const id = setInterval(() => setStatus(computeClinicStatus()), 30000);
    return () => clearInterval(id);
  }, []);
  return status;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  language,
  initialDiscipline = 'Invisalign & Orthodontics',
}) => {
  const isArabic = language === 'ar';
  const clinic = useClinicStatus();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialDiscipline);
  const [preferredTiming, setPreferredTiming] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Demo submission: no backend, so simulate a short request then confirm.
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setPreferredTiming('');
    setService(initialDiscipline);
    setSubmitted(false);
  };

  const fieldClass =
    'w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:border-[#004d5a] focus:outline-none focus:ring-2 focus:ring-[#004d5a]/15 transition-all min-h-[48px]';

  return (
    <section
      id="booking"
      className="relative w-full md:min-h-screen flex flex-col justify-center items-center px-3 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20 bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl mx-auto rounded-3xl shadow-xl overflow-hidden bg-white text-slate-800 grid grid-cols-1 md:grid-cols-12 border border-outline-variant/30"
      >
        {/* Left: brand + direct contact */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#004d5a] to-[#013742] p-7 sm:p-9 lg:p-10 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-2">
              {isArabic ? (
                <>
                  زيارة <span className="italic font-semibold text-secondary-fixed">كريستال</span>
                </>
              ) : (
                <>
                  Visit <span className="italic font-semibold text-secondary-fixed">Crystal</span>
                </>
              )}
            </h2>

            <p className="flex items-center gap-2 text-white/70 text-sm leading-relaxed mb-8">
              <MapPin className="w-4 h-4 shrink-0" />
              {isArabic
                ? 'برج كريستال · الدور الثامن · الشرق، الكويت'
                : 'Crystal Tower · 8th Floor · Sharq, Kuwait'}
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${CLINIC_INFO.telephone}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors group min-h-[52px]"
              >
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[11px] text-white/60 uppercase tracking-wider">
                    {isArabic ? 'اتصال' : 'Call'}
                  </span>
                  <span className="text-sm font-medium tracking-wide">{CLINIC_INFO.telephoneDisplay}</span>
                </span>
              </a>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors group min-h-[52px]"
              >
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                  <WhatsAppIcon className="w-4 h-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[11px] text-white/60 uppercase tracking-wider">
                    {isArabic ? 'واتساب' : 'WhatsApp'}
                  </span>
                  <span className="text-sm font-medium tracking-wide">
                    {isArabic ? 'استشارة فورية' : 'Instant consult'}
                  </span>
                </span>
              </a>

              {/* Live open/closed status (Kuwait time) */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 min-h-[52px]">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      clinic.isOpen
                        ? 'bg-emerald-400'
                        : clinic.isFriday
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                    }`}
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-[11px] text-white/60 uppercase tracking-wider">
                    {isArabic ? 'الحالة · الكويت (غرينتش+3)' : 'Status · Kuwait (GMT+3)'}
                  </span>
                  <span className="text-sm font-medium tracking-wide">
                    {clinic.isOpen
                      ? isArabic
                        ? 'مفتوح الآن · يغلق ٩:٠٠ م'
                        : 'Open now · closes 9:00 PM'
                      : clinic.isFriday
                      ? isArabic
                        ? 'الجمعة: بموعد مسبق'
                        : 'Friday · By appointment'
                      : isArabic
                      ? 'مغلق الآن · يفتح ٩:٠٠ ص'
                        : 'Closed now · opens 9:00 AM'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: the form */}
        <div className="md:col-span-7 bg-white p-7 sm:p-9 lg:p-10 flex flex-col justify-center">
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
                {isArabic ? 'تم استلام طلبك' : 'Request received'}
              </h3>
              <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                {isArabic
                  ? 'شكراً! سيتواصل معك فريق الاستقبال قريباً لتأكيد الموعد.'
                  : 'Thank you! Our reception team will reach out shortly to confirm your appointment.'}
              </p>
              <button
                id="booking-reset-btn"
                type="button"
                onClick={resetForm}
                className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer"
              >
                {isArabic ? 'إرسال طلب آخر' : 'Submit another request'}
              </button>
            </motion.div>
          ) : (
            <>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-6">
            {isArabic ? 'حجز موعد' : 'Book an Appointment'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5" htmlFor="fullName">
                {isArabic ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isArabic ? 'الاسم الكريم' : 'Your full name'}
                className={fieldClass}
              />
            </div>

            {/* Phone & Preferred Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5" htmlFor="phoneNumber">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+965 ---- ----"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5" htmlFor="preferredTiming">
                  {isArabic ? 'التوقيت المفضل' : 'Preferred Timing'}
                </label>
                <input
                  id="preferredTiming"
                  type="text"
                  value={preferredTiming}
                  onChange={(e) => setPreferredTiming(e.target.value)}
                  placeholder={isArabic ? 'صباحاً أو مساءً' : 'e.g. Morning / Evening'}
                  className={fieldClass}
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5" htmlFor="serviceType">
                {isArabic ? 'الخدمة المطلوبة' : 'Service Needed'}
              </label>
              <select
                id="serviceType"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`${fieldClass} cursor-pointer`}
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
            <button
              id="booking-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[50px] px-6 py-3.5 rounded-xl bg-[#004d5a] hover:bg-[#003842] active:bg-[#002a32] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.99]"
            >
              <span>
                {isSubmitting
                  ? isArabic
                    ? 'جارٍ الإرسال...'
                    : 'Submitting...'
                  : isArabic
                  ? 'إرسال'
                  : 'Submit'}
              </span>
            </button>
          </form>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};
