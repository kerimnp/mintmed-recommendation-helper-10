import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, AlertTriangle, CheckCircle, Info, Quote } from 'lucide-react';

interface EnhancedContentProps {
  content: string;
}

export const EnhancedContent: React.FC<EnhancedContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      enhanceContent(contentRef.current);
    }
  }, [content]);

  const enhanceContent = (element: HTMLElement) => {
    // Enhance headings with icons and styling
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
      heading.classList.add('group', 'flex', 'items-center', 'gap-3', 'scroll-mt-20');
      heading.setAttribute('id', `heading-${index}`);
      
      const level = parseInt(heading.tagName.charAt(1));
      const icon = createHeadingIcon(level);
      heading.insertBefore(icon, heading.firstChild);
      
      // Add decorative line
      const decorator = document.createElement('div');
      decorator.className = 'flex-1 h-px bg-gradient-to-r from-medical-primary/30 to-transparent';
      heading.appendChild(decorator);
    });

    // Enhance lists with better styling
    const lists = element.querySelectorAll('ul, ol');
    lists.forEach(list => {
      list.classList.add('space-y-3', 'my-6');
      const items = list.querySelectorAll('li');
      items.forEach(item => {
        item.classList.add('flex', 'items-start', 'gap-3', 'leading-relaxed');
        if (list.tagName === 'UL') {
          const bullet = document.createElement('div');
          bullet.className = 'w-2 h-2 rounded-full bg-medical-accent mt-2 flex-shrink-0';
          item.insertBefore(bullet, item.firstChild);
        }
      });
    });

    // Enhance blockquotes
    const blockquotes = element.querySelectorAll('blockquote');
    blockquotes.forEach(quote => {
      quote.classList.add(
        'border-l-4', 'border-medical-accent', 'bg-medical-light/30', 
        'p-6', 'my-6', 'rounded-r-lg', 'italic', 'relative'
      );
      
      const quoteIcon = document.createElement('div');
      quoteIcon.className = 'absolute -left-3 top-4 p-1 bg-medical-accent rounded-full';
      quoteIcon.innerHTML = '<svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>';
      quote.appendChild(quoteIcon);
    });

    // Enhance code blocks
    const codeBlocks = element.querySelectorAll('pre');
    codeBlocks.forEach(pre => {
      pre.classList.add(
        'bg-gray-900', 'text-gray-100', 'p-6', 'rounded-xl', 
        'my-6', 'overflow-x-auto', 'relative', 'border'
      );
      
      const header = document.createElement('div');
      header.className = 'flex items-center gap-2 mb-4 pb-2 border-b border-gray-700';
      header.innerHTML = `
        <div class="flex gap-1">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span class="text-sm text-gray-400">Code Example</span>
      `;
      pre.insertBefore(header, pre.firstChild);
    });

    // Add special styling for important paragraphs
    const paragraphs = element.querySelectorAll('p');
    paragraphs.forEach(p => {
      const text = p.textContent?.toLowerCase() || '';
      if (text.includes('important') || text.includes('note') || text.includes('warning')) {
        p.classList.add(
          'bg-amber-50', 'border-l-4', 'border-amber-400', 
          'p-4', 'my-4', 'rounded-r-lg'
        );
        
        const icon = document.createElement('span');
        icon.className = 'inline-flex items-center justify-center w-5 h-5 mr-2 bg-amber-400 text-white rounded-full text-xs';
        icon.innerHTML = '⚠️';
        p.insertBefore(icon, p.firstChild);
      }
    });

    // Enhance tables
    const tables = element.querySelectorAll('table');
    tables.forEach(table => {
      const wrapper = document.createElement('div');
      wrapper.className = 'overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      
      table.classList.add('w-full', 'bg-white');
      
      const headers = table.querySelectorAll('th');
      headers.forEach(th => {
        th.classList.add(
          'bg-medical-primary', 'text-white', 'font-semibold', 
          'text-left', 'p-4', 'border-b'
        );
      });
      
      const cells = table.querySelectorAll('td');
      cells.forEach(td => {
        td.classList.add('p-4', 'border-b', 'border-gray-200');
      });
    });
  };

  const createHeadingIcon = (level: number) => {
    const icon = document.createElement('div');
    icon.className = `p-2 bg-gradient-to-br from-medical-primary to-medical-accent rounded-lg flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`;
    
    const iconSvg = document.createElement('div');
    iconSvg.className = 'w-4 h-4 text-white';
    
    switch (level) {
      case 1:
        iconSvg.innerHTML = '📚';
        break;
      case 2:
        iconSvg.innerHTML = '📖';
        break;
      case 3:
        iconSvg.innerHTML = '📄';
        break;
      default:
        iconSvg.innerHTML = '📝';
    }
    
    icon.appendChild(iconSvg);
    return icon;
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-medical-light/10 to-white pointer-events-none" />
      <div 
        ref={contentRef}
        className="relative prose prose-lg max-w-none dark:prose-invert p-8
          prose-headings:text-medical-dark prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-8
          prose-p:text-medical-dark prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-medical-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-medical-dark prose-strong:font-semibold
          prose-em:text-medical-muted prose-em:font-medium
          prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
          prose-pre:bg-transparent prose-pre:p-0
          prose-table:border-collapse
          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};