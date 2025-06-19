
import { useCallback } from 'react';

export const useScrollToTop = () => {
  const scrollToTop = useCallback((smooth: boolean = true, delay: number = 0) => {
    const performScroll = () => {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined') {
        // First scroll the main window
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: smooth ? 'smooth' : 'auto'
        });
        
        // Also scroll any scrollable containers that might contain the main content
        const scrollableElements = document.querySelectorAll('[data-scroll-container], .overflow-auto, .overflow-y-auto');
        scrollableElements.forEach((element) => {
          if (element.scrollTop > 0) {
            element.scrollTo({
              top: 0,
              left: 0,
              behavior: smooth ? 'smooth' : 'auto'
            });
          }
        });
      }
    };

    if (delay > 0) {
      setTimeout(performScroll, delay);
    } else {
      performScroll();
    }
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
