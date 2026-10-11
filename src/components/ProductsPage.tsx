import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, CalendarPlus } from 'lucide-react';
import { Language, Product } from '../types';
import { PRODUCTS } from '../data/content';
import { SafeImage } from './SafeImage';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductsPageProps {
  language: Language;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // When arriving from the home preview strip, scroll to and briefly highlight
  // the clicked product, then clear the state so a refresh doesn't re-trigger.
  useEffect(() => {
    const focusId = (location.state as { focusProduct?: string } | null)?.focusProduct;
    if (!focusId) return;
    let raf = 0;
    let attempts = 0;
    const tryFocus = () => {
      const el = document.getElementById(`product-card-${focusId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        setFocusedId(focusId);
        window.setTimeout(() => setFocusedId(null), 2400);
        window.history.replaceState({}, '');
      } else if (++attempts < 30) {
        raf = requestAnimationFrame(tryFocus);
      }
    };
    raf = requestAnimationFrame(tryFocus);
    return () => cancelAnimationFrame(raf);
  }, [location.state]);

  return (
    <div className="w-full min-h-screen bg-surface pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-16">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-8 sm:gap-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-6">
          <button
            id="products-back-btn"
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface hover:text-secondary font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span>{isArabic ? 'العودة للرئيسية' : 'Return to Home'}</span>
          </button>

          <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
            {isArabic ? 'المتجر' : 'Products'}
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto pt-4 pb-2">
          <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl text-on-surface uppercase tracking-tight font-extrabold">
            {isArabic ? (
              <>متجر <span className="heading-accent">العيادة</span>.</>
            ) : (
              <>Our <span className="heading-accent">Products.</span></>
            )}
          </h1>
          <p className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-2xl">
            {isArabic
              ? 'منتجات العناية بالفم مختارة بعناية. اضغط أي منتج لعرض التفاصيل.'
              : 'Hand-picked oral care products. Tap any product to see the details.'}
          </p>
        </div>

        {/* Products Grid */}
        {PRODUCTS.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center text-on-surface-variant">
            <ShoppingBag className="w-10 h-10 opacity-40" />
            <p className="text-sm">
              {isArabic ? 'لا توجد منتجات بعد.' : 'No products listed yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 py-4 items-stretch">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                onClick={() => setSelectedProduct(product)}
                className={`group rounded-3xl overflow-hidden bg-surface-container-lowest flex flex-col cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 ${
                  focusedId === product.id
                    ? 'ring-2 ring-secondary border-transparent'
                    : 'border border-outline-variant/30'
                }`}
              >
                {/* Image + price badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
                  <SafeImage
                    src={product.image}
                    alt={isArabic ? product.titleAr : product.titleEn}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {product.price && (
                    <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-on-surface text-xs sm:text-sm font-semibold shadow-sm">
                      {product.price}
                    </span>
                  )}
                </div>

                {/* Text */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {(product.categoryEn || product.categoryAr) && (
                    <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold mb-1">
                      {isArabic ? product.categoryAr : product.categoryEn}
                    </span>
                  )}
                  <h3 className="text-lg font-medium text-on-surface group-hover:text-secondary transition-colors">
                    {isArabic ? product.titleAr : product.titleEn}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-2 mb-5 leading-relaxed line-clamp-3">
                    {isArabic ? product.descAr : product.descEn}
                  </p>

                  {/* Book Now: stops propagation so it doesn't open the detail popup.
                      mt-auto pins it to the card bottom so content is centered and
                      aligned consistently across cards. */}
                  <button
                    id={`product-book-${product.id}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/book/${product.id}`);
                    }}
                    className="mt-auto flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#004d5a] hover:bg-[#003842] text-white text-sm font-medium text-center transition-colors cursor-pointer shrink-0"
                  >
                    <CalendarPlus className="w-4 h-4 shrink-0" />
                    <span>{isArabic ? 'احجز الآن' : 'Book Now'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom product detailed view popup */}
      <ProductDetailModal
        product={selectedProduct}
        language={language}
        onClose={() => setSelectedProduct(null)}
        onBook={(p) => {
          setSelectedProduct(null);
          navigate(`/book/${p.id}`);
        }}
      />
    </div>
  );
};
