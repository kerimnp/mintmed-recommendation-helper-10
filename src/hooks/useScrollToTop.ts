
import { useCallback } from 'react';

export const useScrollToTop = () => {
  const scrollToTop = useCallback((smooth: boolean = true) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, []);

  return scrollToTop;
};
