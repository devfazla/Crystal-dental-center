import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Language } from '../types';
import { PRODUCTS } from '../data/content';
import { SafeImage } from './SafeImage';

interface ProductsPreviewSectionProps {
  language: Language;
}

// How many small cards fit in the single row, by viewport width.
function computeItemsPerRow(width: number): number {
  if (width < 480) return 2;
  if (width < 640) return 3;
  if (width < 1024) return 4;
  if (width < 1280) return 5;
  return 6;
}

// A compact, single-row strip of product images shown above "Our Dental
// Services.". Clicking a card jumps to /products and focuses that item.
export const ProductsPreviewSection: React.FC<ProductsPreviewSectionProps> = ({
  language,
}) => {
  const isArabic = language === 'ar';
  const navigate = useNavigate();

  const [itemsPerRow, setItemsPerRow] = useState(() =>
    typeof window !== 'undefined' ? computeItemsPerRow(window.innerWidth) : 4,
  );

  useEffect(() => {
    const onResize = () => setItemsPerRow(computeItemsPerRow(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const visible = PRODUCTS.slice(0, itemsPerRow);
  if (visible.length === 0) return null;

  const openProduct = (id: string) =>
    navigate('/products', { state: { focusProduct: id } });

  return (
    <section
      id="products-preview"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-16 bg-surface-container-low border-y border-outline-variant/30"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Single row of small product cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-3 sm:gap-4"
          style={{ gridTemplateColumns: `repeat(${visible.length}, minmax(0, 1fr))` }}
        >
          {visible.map((product) => (
            <button
              key={product.id}
              type="button"
              id={`product-preview-${product.id}`}
              onClick={() => openProduct(product.id)}
              className="group block w-full cursor-pointer focus:outline-none"
              aria-label={isArabic ? product.titleAr : product.titleEn}
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                <SafeImage
                  src={product.image}
                  alt={isArabic ? product.titleAr : product.titleEn}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
