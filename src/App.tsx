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
import { ConfirmBookingPage } from './components/ConfirmBookingPage';
import { LinksPage } from './components/LinksPage';
import { WhatsAppFab } from './components/WhatsAppFab';
import { Language } from './types';

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
  const [language, setLanguage] = useState<Language>('en');

  // RTL / LTR + lang attribute drive the whole typographic system
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === 'en' ? 'ar' : 'en')),
    [],
  );

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
          <Route path="/book/:productId" element={<ConfirmBookingPage language={language} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
