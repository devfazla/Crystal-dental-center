/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { GalleryPage } from './components/GalleryPage';
import { ProductsPage } from './components/ProductsPage';
import { ContactPage } from './components/ContactPage';
import { ConfirmBookingPage } from './components/ConfirmBookingPage';
import { LinksPage } from './components/LinksPage';
import { WhatsAppFab } from './components/WhatsAppFab';
import { Language } from './types';

// ---- Language auto-detection ------------------------------------------------
// Persisted user choice overrides everything. If unset, we pick a default from
// IP geolocation; if the lookup fails (offline, rate-limited, privacy block,
// tracker blocker), we fall back to the browser's locale as a heuristic.
const LANGUAGE_STORAGE_KEY = 'crystal-lang-pref';

// Arab League members + Western Sahara. Iran, Turkey and Israel are excluded
// because Arabic is not the primary language there even though they sit in the
// Middle East, and forcing an Arabic UI on those visitors is worse than EN.
const ARAB_COUNTRY_CODES = new Set([
  'AE', 'BH', 'DJ', 'DZ', 'EG', 'EH', 'IQ', 'JO', 'KM', 'KW', 'LB', 'LY',
  'MA', 'MR', 'OM', 'PS', 'QA', 'SA', 'SD', 'SO', 'SY', 'TN', 'YE',
]);

function getStoredLanguage(): Language | null {
  try {
    const v = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return v === 'ar' || v === 'en' ? v : null;
  } catch {
    return null;
  }
}

function setStoredLanguage(value: Language): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

// Synchronous, no-network fallback: browsers in Arab countries almost always
// report an `ar-*` locale. Used as the initial paint value and as the last
// resort when the IP lookup fails.
function languageFromNavigator(): Language {
  const candidates =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language || ''];
  return candidates.some((l) => typeof l === 'string' && l.toLowerCase().startsWith('ar'))
    ? 'ar'
    : 'en';
}

// IP-based country lookup. Two free HTTPS endpoints, tried in order, each with
// a short race-style timeout so a slow source doesn't starve the fallback.
// Both APIs return CORS-friendly JSON with no key required.
async function languageFromIp(signal: AbortSignal): Promise<Language | null> {
  const sources: { url: string; pick: (d: any) => string | undefined }[] = [
    { url: 'https://ipapi.co/json/', pick: (d) => d?.country_code || d?.country },
    { url: 'https://ipwho.is/', pick: (d) => (d?.success ? d?.country_code : undefined) },
  ];
  const withTimeout = <T,>(p: Promise<T>, ms: number): Promise<T | null> =>
    Promise.race([
      p,
      new Promise<null>((r) => setTimeout(() => r(null), ms)),
    ]);

  for (const src of sources) {
    if (signal.aborted) return null;
    try {
      const res = await withTimeout(
        fetch(src.url, { signal, headers: { Accept: 'application/json' } }),
        2000,
      );
      if (!res || !res.ok) continue;
      const data = await withTimeout(res.json(), 1000);
      if (!data) continue;
      const cc = String(src.pick(data) || '').toUpperCase();
      if (!cc) continue;
      return ARAB_COUNTRY_CODES.has(cc) ? 'ar' : 'en';
    } catch {
      // aborted or network error — try the next source
    }
  }
  return null;
}

// Page titles per route, localized. Applied whenever route or language changes.
function pageTitle(pathname: string, language: Language): string {
  const ar = language === 'ar';
  if (pathname === '/gallery') {
    return ar
      ? 'معرض الحالات والنتائج قبل وبعد | مركز كريستال للأسنان'
      : 'Smile Transformation Gallery & Clinical Results | Crystal Dental Center';
  }
  if (pathname === '/links') {
    return ar ? 'روابط مركز كريستال للأسنان' : 'Crystal Dental Center | All Links';
  }
  if (pathname === '/products') {
    return ar
      ? 'منتجات العناية بالفم | مركز كريستال للأسنان'
      : 'Oral Care Products | Crystal Dental Center';
  }
  if (pathname === '/contact') {
    return ar
      ? 'تواصل معنا | مركز كريستال للأسنان'
      : 'Contact Us | Crystal Dental Center';
  }
  if (pathname.startsWith('/book')) {
    return ar
      ? 'تأكيد الحجز | مركز كريستال للأسنان'
      : 'Confirm Booking | Crystal Dental Center';
  }
  return ar
    ? 'مركز كريستال للأسنان | طب الأسنان التجميلي والجراحي | الشرق، الكويت'
    : 'Crystal Dental Center | Aesthetic & Surgical Dentistry | Sharq, Kuwait';
}

// On route change, jump to top unless a cross-page section scroll is pending
// (HomePage owns that scroll via location.state.scrollTo).
function ScrollManager({ pathname }: { pathname: string }) {
  const location = useLocation();
  useEffect(() => {
    if (!(location.state as { scrollTo?: string } | null)?.scrollTo) {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

// Sets the document title for every route, including the standalone links page
// (which lives outside Layout and so has no header/footer).
function RouteTitle({ language }: { language: Language }) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = pageTitle(pathname, language);
  }, [pathname, language]);
  return null;
}

function Layout({
  language,
  onToggleLanguage,
}: {
  language: Language;
  onToggleLanguage: () => void;
}) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-secondary/20 selection:text-secondary">
      <Header language={language} onToggleLanguage={onToggleLanguage} />
      <ScrollManager pathname={location.pathname} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer language={language} />
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>(
    () => getStoredLanguage() ?? languageFromNavigator(),
  );

  // RTL / LTR + lang attribute drive the whole typographic system
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // One-shot IP-based refinement on first visit. Once the user has toggled the
  // language manually (see toggleLanguage), we never re-detect: their explicit
  // choice is stored in localStorage and wins forever.
  useEffect(() => {
    if (getStoredLanguage()) return;
    const ac = new AbortController();
    const timeout = setTimeout(() => ac.abort(), 4000);
    languageFromIp(ac.signal).then((detected) => {
      clearTimeout(timeout);
      if (ac.signal.aborted || !detected) return;
      // Only switch if IP says something different from what navigator suggested.
      setLanguage((prev) => (prev === detected ? prev : detected));
    });
    return () => {
      clearTimeout(timeout);
      ac.abort();
    };
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next: Language = prev === 'en' ? 'ar' : 'en';
      // Explicit user choice — persist so detection never overrules it.
      setStoredLanguage(next);
      return next;
    });
  }, []);

  return (
    <BrowserRouter>
      <RouteTitle language={language} />
      <WhatsAppFab language={language} />
      <Routes>
        {/* Standalone link-in-bio page: no header / nav / footer */}
        <Route
          path="/links"
          element={<LinksPage language={language} onToggleLanguage={toggleLanguage} />}
        />
        <Route element={<Layout language={language} onToggleLanguage={toggleLanguage} />}>
          <Route path="/" element={<HomePage language={language} />} />
          <Route path="/gallery" element={<GalleryPage language={language} />} />
          <Route path="/products" element={<ProductsPage language={language} />} />
          <Route path="/contact" element={<ContactPage language={language} />} />
          <Route path="/book/:productId" element={<ConfirmBookingPage language={language} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
