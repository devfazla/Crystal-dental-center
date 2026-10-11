import React, { useEffect } from 'react';
import { X, CalendarPlus } from 'lucide-react';
import { Product, Language } from '../types';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: Product | null;
  language: Language;
  onClose: () => void;
  // Optional: when provided, a "Book Now" CTA is shown that routes to checkout.
  onBook?: (product: Product) => void;
}

// Custom "product detailed view" popup. Opens over the products grid when a
// card is clicked; closes on overlay click, the X button, or Escape.
export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  language,
  onClose,
  onBook,
}) => {
  const isArabic = language === 'ar';

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock background scroll while the popup is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  const features = isArabic ? product.featuresAr : product.featuresEn;

  return (
    <div
      id="product-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/45 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        id="product-modal-content"
        className="relative w-full max-w-lg bg-surface rounded-3xl p-6 sm:p-8 shadow-xl border border-outline-variant/40 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: category eyebrow + close */}
        <div className="flex items-center justify-between gap-4 pb-1">
          {(isArabic ? product.categoryAr : product.categoryEn) ? (
            <span className="font-label-caps text-xs tracking-widest text-secondary uppercase font-semibold">
              {isArabic ? product.categoryAr : product.categoryEn}
            </span>
          ) : (
            <span />
          )}
          <button
            id="product-modal-close-btn"
            type="button"
            onClick={onClose}
            aria-label={isArabic ? 'إغلاق' : 'Close'}
            className="w-8 h-8 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mt-3 mb-5 bg-surface-container-lowest border border-outline-variant/30">
          <SafeImage
            src={product.image}
            alt={isArabic ? product.titleAr : product.titleEn}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Title + price */}
        <div className="flex items-start justify-between gap-4">
          <h3
            id="product-modal-title"
            className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-light tracking-tight"
          >
            {isArabic ? product.titleAr : product.titleEn}
          </h3>
          {product.price && (
            <span className="shrink-0 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold whitespace-nowrap">
              {product.price}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-3 mb-5 font-normal">
          {isArabic ? product.descAr : product.descEn}
        </p>

        {/* Optional feature bullets */}
        {features && features.length > 0 && (
          <ul className="py-4 border-t border-outline-variant/30 space-y-2.5">
            {features.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Book Now CTA */}
        {onBook && (
          <button
            id="product-modal-book-btn"
            type="button"
            onClick={() => onBook(product)}
            className="mt-5 w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#004d5a] hover:bg-[#003842] text-white text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <CalendarPlus className="w-4 h-4" />
            {isArabic ? 'احجز الآن' : 'Book Now'}
          </button>
        )}
      </div>
    </div>
  );
};
