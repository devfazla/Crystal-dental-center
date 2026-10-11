import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, CalendarClock, ShoppingBag } from 'lucide-react';
import { Language } from '../types';
import { getBookableItem, CLINIC_INFO } from '../data/content';
import { SafeImage } from './SafeImage';

interface ConfirmBookingPageProps {
  language: Language;
}

// Official WhatsApp glyph (same mark used in the booking section).
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Checkout-style confirmation page reached from a product's "Book Now" or a
// service's "Reserve Consultation". Shows the item details plus name / phone /
// preferred timing, and offers two ways to confirm: a demo submit or a
// prefilled WhatsApp message.
export const ConfirmBookingPage: React.FC<ConfirmBookingPageProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();
  const product = getBookableItem(productId);

  // Return target: products grid when arriving from /products, otherwise the
  // home page (services are booked from the "Our Dental Services." section).
  const backTo = (location.state as { from?: string } | null)?.from ?? '/products';
  const backLabel =
    backTo === '/products'
      ? isArabic
        ? 'العودة للمتجر'
        : 'Back to Products'
      : isArabic
        ? 'العودة للرئيسية'
        : 'Return to Home';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timing, setTiming] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fieldClass =
    'w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:border-[#004d5a] focus:outline-none focus:ring-2 focus:ring-[#004d5a]/15 transition-all min-h-[48px]';

  // Guard: unknown or removed product id.
  if (!product) {
    return (
      <div className="w-full min-h-screen bg-surface pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-16 flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-4">
          <ShoppingBag className="w-10 h-10 opacity-40 text-on-surface-variant" />
          <p className="text-on-surface-variant text-sm">
            {isArabic ? 'هذا المنتج غير متوفر حالياً.' : 'This product is no longer available.'}
          </p>
          <button
            id="confirm-booking-back-btn"
            type="button"
            onClick={() => navigate(backTo)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004d5a] text-white text-sm font-medium hover:bg-[#003842] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {backLabel}
          </button>
        </div>
      </div>
    );
  }

  const title = isArabic ? product.titleAr : product.titleEn;

  const waMessage = isArabic
    ? `مرحباً مركز كريستال للأسنان، أرغب بتأكيد حجز خدمة "${title}".${
        name.trim() ? `\nالاسم: ${name.trim()}` : ''
      }${phone.trim() ? `\nرقم الهاتف: ${phone.trim()}` : ''}${
        timing.trim() ? `\nالتوقيت المفضل: ${timing.trim()}` : ''
      }`
    : `Hello Crystal Dental Center, I'd like to confirm a booking for "${title}".${
        name.trim() ? `\nName: ${name.trim()}` : ''
      }${phone.trim() ? `\nPhone: ${phone.trim()}` : ''}${
        timing.trim() ? `\nPreferred timing: ${timing.trim()}` : ''
      }`;

  const waHref = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(waMessage)}`;

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

  return (
    <div className="w-full min-h-screen bg-surface pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-16">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-8 sm:gap-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-6">
          <button
            id="confirm-booking-return-btn"
            type="button"
            onClick={() => navigate(backTo)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface hover:text-secondary font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span>{backLabel}</span>
          </button>

          <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
            {isArabic ? 'تأكيد الحجز' : 'Confirm Booking'}
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto pt-2">
          <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface uppercase tracking-tight font-extrabold">
            {isArabic ? (
              <>تأكيد <span className="heading-accent">الحجز</span>.</>
            ) : (
              <>Confirm <span className="heading-accent">Booking</span>.</>
            )}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl mx-auto rounded-3xl shadow-xl overflow-hidden bg-white border border-outline-variant/30 grid grid-cols-1 md:grid-cols-12"
        >
          {/* Left: product summary */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#004d5a] to-[#013742] p-6 sm:p-8 text-white flex flex-col">
            <span className="text-[11px] uppercase tracking-widest text-white/60 font-semibold mb-3">
              {isArabic ? 'ملخص الخدمة' : 'Service Summary'}
            </span>
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 border border-white/15 mb-5">
              <SafeImage
                src={product.image}
                alt={title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>
            {product.price && (
              <span className="mt-2 inline-flex w-fit px-3 py-1 rounded-full bg-white/15 text-sm font-semibold">
                {product.price}
              </span>
            )}
            <p className="mt-3 text-sm text-white/70 leading-relaxed line-clamp-4">
              {isArabic ? product.descAr : product.descEn}
            </p>
          </div>

          {/* Right: confirm form / success */}
          <div className="md:col-span-7 bg-white p-6 sm:p-9 lg:p-10 flex flex-col justify-center">
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
                    ? `شكراً! سيتواصل معك فريق الاستقبال قريباً لتأكيد حجز "${title}".`
                    : `Thank you! Our reception team will reach out shortly to confirm your "${title}" booking.`}
                </p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <button
                    id="confirm-booking-another-btn"
                    type="button"
                    onClick={() => {
                      setName('');
                      setPhone('');
                      setTiming('');
                      setSubmitted(false);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer"
                  >
                    {isArabic ? 'تعديل الطلب' : 'Edit request'}
                  </button>
                  <button
                    id="confirm-booking-products-btn"
                    type="button"
                    onClick={() => navigate(backTo)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#004d5a] text-white text-sm font-medium hover:bg-[#003842] transition-colors cursor-pointer"
                  >
                    {backLabel}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1 flex items-center gap-2">
                  <CalendarClock className="w-6 h-6 text-[#004d5a]" />
                  {isArabic ? 'بيانات الحجز' : 'Your Details'}
                </h3>

                {/* Full Name */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5" htmlFor="cb-name">
                    {isArabic ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    id="cb-name"
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
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5" htmlFor="cb-phone">
                      {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      id="cb-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+965 ---- ----"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5" htmlFor="cb-timing">
                      {isArabic ? 'التوقيت المفضل' : 'Preferred Timing'}
                    </label>
                    <input
                      id="cb-timing"
                      type="text"
                      value={timing}
                      onChange={(e) => setTiming(e.target.value)}
                      placeholder={isArabic ? 'صباحاً أو مساءً' : 'e.g. Morning / Evening'}
                      className={fieldClass}
                    />
                  </div>
                </div>

                {/* Confirm actions */}
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    id="confirm-booking-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[50px] px-6 py-3.5 rounded-xl bg-[#004d5a] hover:bg-[#003842] active:bg-[#002a32] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.99]"
                  >
                    {isSubmitting
                      ? isArabic
                        ? 'جارٍ الإرسال...'
                        : 'Submitting...'
                      : isArabic
                        ? 'تأكيد الحجز'
                        : 'Confirm Booking'}
                  </button>

                  <a
                    id="confirm-booking-whatsapp-btn"
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full min-h-[50px] px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    {isArabic ? 'التأكيد عبر واتساب' : 'Confirm via WhatsApp'}
                  </a>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
