import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Navigate to a section on the home page.
 * - Already on home: smooth scroll directly.
 * - Anywhere else: go to '/' and hand the section over via location state,
 *   which Home applies once the sections are mounted.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (sectionId: string) => {
      if (location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      navigate('/', { state: { scrollTo: sectionId } });
    },
    [location.pathname, navigate],
  );
}
