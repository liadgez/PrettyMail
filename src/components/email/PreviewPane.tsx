
import React from 'react';
import DOMPurify from 'dompurify';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface PreviewPaneProps {
  content: string;
  previewStyle: string;
}

const PreviewPane = ({ content, previewStyle }: PreviewPaneProps) => {
  const MAX_CONTENT_LENGTH = 50000; // 50KB limit

  const formatContent = (text: string) => {
    if (!text.trim()) return '<p style="color: #9ca3af; font-style: italic;">Your email preview will appear below...</p>';
    
    // Validate content length
    if (text.length > MAX_CONTENT_LENGTH) {
      return '<p style="color: #f87171; font-style: italic;">Content too long. Please reduce to under 50KB.</p>';
    }
    
    // Simple paragraph formatting
    const formatted = text
      .split('\n\n')
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
    
    // Sanitize HTML to prevent XSS attacks
    return DOMPurify.sanitize(formatted, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'span'],
      ALLOWED_ATTR: ['style'],
      ALLOW_DATA_ATTR: false
    });
  };

  const parseCssString = (cssString: string) => {
    const styleObject: React.CSSProperties = {};
    
    // Split by semicolon and parse each CSS property
    cssString.split(';').forEach(rule => {
      const [property, value] = rule.split(':').map(s => s.trim());
      if (property && value) {
        // Convert kebab-case to camelCase for React
        const camelProperty = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        
        // Whitelist of safe CSS properties
        const validProperties = [
          'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
          'lineHeight', 'color', 'backgroundColor', 'background',
          'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
          'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
          'border', 'borderLeft', 'borderRight', 'borderTop', 'borderBottom',
          'borderRadius', 'textAlign', 'textDecoration',
          'maxWidth', 'width', 'height', 'minHeight'
        ];
        
        if (validProperties.includes(camelProperty)) {
          // Sanitize CSS values to prevent CSS injection
          const sanitizedValue = value.replace(/[<>'"]/g, '');
          (styleObject as any)[camelProperty] = sanitizedValue;
        }
      }
    });
    
    return styleObject;
  };

  return (
    <div className="flex flex-col h-full bg-[#2c2c2e] border-t-2 border-[#0a84ff]/20">
      <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-[#2c2c2e] to-[#2a2a2c]">
        <Label className="text-lg font-semibold text-white font-system">Preview</Label>
        <p className="text-sm text-white/60 mt-1 font-system">Your email preview will appear below</p>
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        <Card className="h-full min-h-96 bg-white border-2 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] transition-shadow duration-300">
          <div className="p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-lg"></div>
            <div 
              style={{ 
                ...parseCssString(previewStyle),
                transition: 'all 200ms ease-out',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                position: 'relative',
                zIndex: 1
              }}
              dangerouslySetInnerHTML={{ 
                __html: formatContent(content)
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PreviewPane;
