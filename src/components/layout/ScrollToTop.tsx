import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export const ScrollToTop = () => {
  const location = useLocation();
  const { scrollToTop } = useScrollToTop();

  useEffect(() => {
    scrollToTop(true, 0);
  }, [location.pathname, scrollToTop]);

  return null;
};