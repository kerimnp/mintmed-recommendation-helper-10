import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export const ScrollToTop = () => {
  const location = useLocation();
  const { scrollToTop } = useScrollToTop();
  const prevPathnameRef = useRef<string>('');

  useEffect(() => {
    // Only scroll if the pathname actually changed (not just search params or hash)
    if (location.pathname !== prevPathnameRef.current) {
      // Execute scroll immediately without delay for route changes
      scrollToTop(false, 0);
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname, scrollToTop]);

  // Also handle any hash changes that might occur
  useEffect(() => {
    // If there's a hash in the URL, let the browser handle scrolling to that element
    // Otherwise, ensure we're at the top
    if (!location.hash) {
      scrollToTop(false, 0);
    }
  }, [location.hash, scrollToTop]);

  return null;
};