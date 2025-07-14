
import { useCallback, useRef, useEffect } from 'react';

export const useScrollToTop = () => {
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToTop = useCallback((smooth: boolean = false, delay: number = 0) => {
    const performScroll = () => {
      // Prevent multiple simultaneous scroll operations
      if (isScrollingRef.current) return;
      
      isScrollingRef.current = true;
      
      // Check if we're in a browser environment
      if (typeof window !== 'undefined') {
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Force immediate scroll to prevent layout shift
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Also immediately scroll the main window
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto' // Always use instant scroll for immediate effect
        });
        
        // Reset scroll position for any scrollable containers
        const scrollableElements = document.querySelectorAll(
          '[data-scroll-container], .overflow-auto, .overflow-y-auto, .overflow-y-scroll, main, [role="main"]'
        );
        
        scrollableElements.forEach((element) => {
          if (element.scrollTop > 0) {
            element.scrollTop = 0;
          }
        });

        // Reset the scrolling flag after a brief delay
        timeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 100);
      }
    };

    if (delay > 0) {
      setTimeout(performScroll, delay);
    } else {
      // For route changes, execute immediately
      performScroll();
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToTopWithFeedback = useCallback((smooth: boolean = true, delay: number = 0) => {
    scrollToTop(smooth, delay);
    
    // Add visual feedback by briefly highlighting the scroll action
    if (typeof window !== 'undefined') {
      const indicator = document.createElement('div');
      indicator.className = 'fixed top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm z-50 animate-fade-in-out';
      indicator.textContent = '↑ Scrolled to top';
      indicator.style.animation = 'fadeInOut 2s ease-in-out';
      
      // Add CSS animation if it doesn't exist
      if (!document.querySelector('#scroll-feedback-styles')) {
        const style = document.createElement('style');
        style.id = 'scroll-feedback-styles';
        style.textContent = `
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(indicator);
      
      setTimeout(() => {
        if (document.body.contains(indicator)) {
          document.body.removeChild(indicator);
        }
      }, 2000);
    }
  }, [scrollToTop]);

  return { scrollToTop, scrollToTopWithFeedback };
};
