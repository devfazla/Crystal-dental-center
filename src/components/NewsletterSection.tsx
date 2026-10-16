import React, { useState } from 'react';
import { User, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface NewsletterSectionProps {
  language: Language;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 600);
  };

  // Shared field styling: tinted input that whitens on focus, teal ring, icon on
  // the inline-start edge so it flips automatically in RTL.
  const fieldClass =
    'w-full min-h-[52px] ps-12 pe-5 py-3.5 rounded-xl bg-slate-50 border border-outline-variant/60 text-on-surface placeholder:text-on-surface-variant/50 text-sm sm:text-base focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all shadow-sm';
  const iconClass =
    'absolute start-4 top-1/2 -translate-y-1/2 text-secondary/70 pointer-events-none';

  return (
    <section
      id="newsletter"
      className="relative w-full md:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-16 py-20 sm:py-24 overflow-hidden bg-surface"
    >
      {/* Background image: light field with subtle teal corner waves */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/newsletter_bg.png')" }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: eyebrow + heading */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
              {isArabic ? 'النشرة البريدية' : 'Free Newsletter'}
            </span>
          </div>

          <h2 className="mt-5 font-headline-lg text-4xl sm:text-5xl lg:text-6xl text-on-surface font-light tracking-tight leading-[1.05]">
            {isArabic ? (
              <>
                ابق على اطلاع <br />
                <span className="text-secondary italic font-semibold">بآخر تحديثاتنا</span>
              </>
            ) : (
              <>
                Stay in the loop with
                <br />
                <span className="text-secondary italic font-semibold">our latest updates</span>
              </>
            )}
          </h2>
        </div>

        {/* Right: form / success */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          {isSubscribed ? (
            <div
              id="newsletter-success-msg"
              className="w-full p-7 sm:p-8 rounded-xl bg-white border border-outline-variant/40 text-on-surface flex flex-col items-center gap-3 text-center shadow-sm"
            >
              <CheckCircle2 className="w-10 h-10 text-secondary" />
              <p className="font-semibold text-lg text-secondary">
                {isArabic ? 'تم الاشتراك.' : 'Subscribed.'}
              </p>
              <p className="text-sm text-on-surface-variant max-w-sm">
                {isArabic
                  ? 'تحديثات العيادة ومقالات صحة الفم والأسنان، دون غيرها.'
                  : "You're on the list. Clinical updates and oral care articles, nothing else."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubscribed(false);
                  setName('');
                  setEmail('');
                }}
                className="mt-1 text-xs uppercase tracking-widest text-secondary hover:underline cursor-pointer min-h-[44px] flex items-center justify-center px-4"
              >
                {isArabic ? 'اشتراك بعنوان بريد آخر' : 'Add another email'}
              </button>
            </div>
          ) : (
            <form
              id="newsletter-form"
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4 p-6 sm:p-8 rounded-xl bg-white border border-outline-variant/40 shadow-sm"
            >
              {/* Input: Name */}
              <div className="relative w-full">
                <label htmlFor="newsletter-name" className="sr-only">
                  {isArabic ? 'الاسم' : 'Name'}
                </label>
                <User className={iconClass} />
                <input
                  id="newsletter-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isArabic ? 'اسمك الكريم' : 'Your Name'}
                  className={fieldClass}
                />
              </div>

              {/* Input: Email */}
              <div className="relative w-full">
                <label htmlFor="newsletter-email" className="sr-only">
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <Mail className={iconClass} />
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your Email Address'}
                  className={fieldClass}
                />
              </div>

              {/* Subscribe Button */}
              <button
                id="newsletter-subscribe-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[52px] px-8 py-4 rounded-xl bg-secondary text-on-secondary font-label-caps text-xs sm:text-label-caps uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#004f55] transition-all shadow-md hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer disabled:opacity-70 mt-1"
              >
                {isSubmitting ? (
                  <span>{isArabic ? 'جاري الاشتراك...' : 'Subscribing...'}</span>
                ) : (
                  <>
                    <span>{isArabic ? 'اشترك الآن' : 'Subscribe now'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
