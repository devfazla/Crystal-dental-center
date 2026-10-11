import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/content';

// Keyless Google Maps embed (no API key required) pinned to the clinic address.
export const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=Crystal%20Tower%2C%20Ahmed%20Al-Jaber%20Street%2C%20Sharq%2C%20Kuwait&z=16&output=embed';

// Silent auto-retry budget before the user ever sees an error card. "A failed
// map" is bad UX — most transient hiccups resolve within a couple of tries, so
// we spend them quietly and only surface the fallback when the map is truly
// unreachable.
const MAX_ATTEMPTS = 4;
const ATTEMPT_TIMEOUT_MS = 6000;

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
 * - waits until the widget is near the viewport (so a lazy iframe below the
 *   fold doesn't have its timeout start before the browser begins loading it),
 * - auto-retries the embed up to MAX_ATTEMPTS times, staying on the loading
 *   indicator the whole time so users never see a transient failure,
 * - only after all attempts fail does it swap to the fallback card with the
 *   address, an "Open in Google Maps" link, and a manual Retry button that
 *   resets the counter for another full cycle.
 */
export const MapWidget: React.FC<MapWidgetProps> = ({
  language,
  className = '',
  roundedClassName = 'rounded-3xl',
  id,
}) => {
  const isArabic = language === 'ar';
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);
  const attemptsRef = useRef(1);

  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [reloadKey, setReloadKey] = useState(0);
  const [visible, setVisible] = useState(false);

  // Realtime visibility checker: gate auto-retries on the widget being on (or
  // near) screen so we don't waste the attempt budget on a hidden map.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible(true);
      },
      // Preload when the widget is within 200px of the viewport.
      { rootMargin: '200px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Called when a single attempt fails (timeout or iframe onError).
  // Silently remounts a fresh iframe (bumping reloadKey + cache-buster) until
  // we exhaust MAX_ATTEMPTS; then flips to the visible error card.
  const failAttempt = useCallback(() => {
    if (loadedRef.current) return; // already succeeded, ignore spurious errors
    if (attemptsRef.current < MAX_ATTEMPTS) {
      attemptsRef.current += 1;
      setReloadKey((k) => k + 1);
    } else {
      setState('error');
    }
  }, []);

  // Re-arm the timeout whenever we (re)enter loading after a retry.
  useEffect(() => {
    if (!visible || state !== 'loading') return;
    const timer = setTimeout(failAttempt, ATTEMPT_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [visible, state, reloadKey, failAttempt]);

  // Manual retry resets the attempt counter so the user gets another full cycle.
  const manualRetry = () => {
    loadedRef.current = false;
    attemptsRef.current = 1;
    setState('loading');
    setReloadKey((k) => k + 1);
  };

  // Cache-buster so each retry forces a fresh network request for the embed.
  const embedSrc = `${MAP_EMBED_SRC}&_r=${reloadKey}`;

  return (
    <div
      id={id}
      ref={wrapperRef}
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
          onError={failAttempt}
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
            onClick={manualRetry}
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
