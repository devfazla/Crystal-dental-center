import React, { useState } from 'react';
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

  return (
    <section
      id="newsletter"
      className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-16 sm:py-20 md:py-24 overflow-hidden bg-surface"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Heading: Free Subscription of Newsletter */}
        <h2 className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl text-on-surface font-light tracking-tight mb-6 sm:mb-8">
          {isArabic ? (
            <>
              اشتراك مجاني في <br />
              <span className="italic font-semibold text-secondary">النشرة البريدية</span>
            </>
          ) : (
            <>
              Free subscription <br />
              to our <span className="italic font-semibold text-secondary">Newsletter</span>
            </>
          )}
        </h2>

        {isSubscribed ? (
          <div
            id="newsletter-success-msg"
            className="w-full p-6 sm:p-8 rounded-2xl bg-secondary-container/20 border border-secondary-fixed/40 text-on-surface flex flex-col items-center gap-3 animate-fade-in"
          >
            <p className="font-medium text-lg text-secondary">
              {isArabic ? 'تم الاشتراك.' : 'Subscribed.'}
            </p>
            <p className="text-sm text-on-surface-variant max-w-md">
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
              className="mt-2 text-xs uppercase tracking-widest text-secondary hover:underline cursor-pointer min-h-[44px] flex items-center justify-center px-4"
            >
              {isArabic ? 'اشتراك بعنوان بريد آخر' : 'Add another email'}
            </button>
          </div>
        ) : (
          <form
            id="newsletter-form"
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto flex flex-col items-center gap-3.5 sm:gap-4"
          >
            {/* Input: Name */}
            <div className="w-full">
              <label htmlFor="newsletter-name" className="sr-only">
                {isArabic ? 'الاسم' : 'Name'}
              </label>
              <input
                id="newsletter-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isArabic ? 'الاسم بالكامل' : 'Your Name'}
                className="w-full min-h-[48px] px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-base sm:text-sm text-center focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all shadow-sm"
              />
            </div>

            {/* Input: Email */}
            <div className="w-full">
              <label htmlFor="newsletter-email" className="sr-only">
                {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isArabic ? 'البريد الإلكتروني' : 'Your Email Address'}
                className="w-full min-h-[48px] px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-base sm:text-sm text-center focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all shadow-sm"
              />
            </div>

            {/* Subscribe Button */}
            <button
              id="newsletter-subscribe-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] px-8 py-3.5 sm:py-4 rounded-full bg-on-surface text-surface hover:bg-secondary font-label-caps text-xs sm:text-label-caps uppercase tracking-widest transition-all shadow-md hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer font-bold disabled:opacity-70 mt-1"
            >
              {isSubmitting
                ? isArabic
                  ? 'جاري الاشتراك...'
                  : 'Subscribing...'
                : isArabic
                ? 'اشترك الآن'
                : 'Subscribe Now'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
