
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
    <div className="flex flex-col h-full bg-[#2c2c2e]">
      <div className="p-6 border-b border-white/10">
        <Label className="text-base font-medium text-white font-system">Preview</Label>
        <p className="text-xs text-white/60 mt-1 font-system">Your email preview will appear below</p>
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        <Card className="h-full min-h-96 bg-white border border-white/20 shadow-apple">
          <div className="p-8">
            <div 
              style={{ 
                ...parseCssString(previewStyle),
                transition: 'all 200ms ease-out',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
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
