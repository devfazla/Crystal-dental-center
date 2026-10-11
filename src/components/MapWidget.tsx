import React, { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';

// Keyless Google Maps embed (no API key required) pinned to the clinic address.
export const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=Crystal%20Tower%2C%20Ahmed%20Al-Jaber%20Street%2C%20Sharq%2C%20Kuwait&z=16&output=embed';

interface MapWidgetProps {
  language: Language;
  /** Sizing + positioning for the wrapper (e.g. "w-full h-64"). */
  className?: string;
  /** Corner rounding class applied to the wrapper. */
  roundedClassName?: string;
  id?: string;
}

/**
 * Google Maps embed with graceful degradation:
 * - shows a loading placeholder until the frame reports load,
 * - if the embed is blocked/offline (never loads, or errors), swaps to an
 *   always-usable fallback card with the address and a "Open in Google Maps" link.
 */
export const MapWidget: React.FC<MapWidgetProps> = ({
  language,
  className = '',
  roundedClassName = 'rounded-3xl',
  id,
}) => {
  const isArabic = language === 'ar';
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [reloadKey, setReloadKey] = useState(0);
  const loadedRef = useRef(false);

  // Re-arm the timeout whenever we (re)enter the loading state so a retry that
  // fails again still falls back to the error card.
  useEffect(() => {
    if (state !== 'loading') return;
    const timer = setTimeout(() => {
      if (!loadedRef.current) setState((s) => (s === 'loading' ? 'error' : s));
    }, 8000);
    return () => clearTimeout(timer);
  }, [state, reloadKey]);

  const retry = () => {
    loadedRef.current = false;
    setReloadKey((k) => k + 1);
    setState('loading');
  };

  // Cache-buster so a retry forces a fresh network request for the embed.
  const embedSrc = `${MAP_EMBED_SRC}&_r=${reloadKey}`;

  return (
    <div
      id={id}
      className={`relative overflow-hidden bg-slate-100 ${roundedClassName} ${className}`}
    >
      {state !== 'error' && (
        <iframe
          key={reloadKey}
          title={isArabic ? 'خارطة موقع العيادة' : 'Crystal Dental Center location map'}
          src={embedSrc}
          className={`h-full w-full border-0 transition-opacity duration-500 ${
            state === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={() => {
            loadedRef.current = true;
            setState('ready');
          }}
          onError={() => setState('error')}
        />
      )}

      {state === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <MapPin className="h-7 w-7 animate-pulse" />
            <span className="text-xs">{isArabic ? 'جارٍ تحميل الخارطة…' : 'Loading map…'}</span>
          </div>
        </div>
      )}

      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100 px-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white">
            <MapPin className="h-6 w-6 text-[#008f7a]" />
          </span>
          <p className="text-sm font-semibold text-slate-700">
            {isArabic ? 'لم يتم تحميل الخارطة' : 'Map couldn’t load'}
          </p>
          <p className="max-w-xs text-xs leading-relaxed text-slate-500">
            {isArabic ? CLINIC_INFO.addressAr : CLINIC_INFO.address}
          </p>
          <a
            href={CLINIC_INFO.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#004d5a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#008f7a]"
          >
            <span>{isArabic ? 'افتح في خرائط جوجل' : 'Open in Google Maps'}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            id={id ? `${id}-retry` : 'map-retry'}
            type="button"
            onClick={retry}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-[#004d5a] hover:text-[#004d5a] cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{isArabic ? 'إعادة المحاولة' : 'Retry'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
