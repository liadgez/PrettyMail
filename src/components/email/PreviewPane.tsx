
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
    if (!text.trim()) return '<p style="color: #64748b; font-style: italic;">Your email preview will appear here...</p>';
    
    // Validate content length
    if (text.length > MAX_CONTENT_LENGTH) {
      return '<p style="color: #ef4444; font-style: italic;">Content too long. Please reduce to under 50KB.</p>';
    }
    
    // Simple paragraph formatting
    const formatted = text
      .split('\n\n')
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
    
    // Sanitize HTML to prevent XSS attacks - using only valid DOMPurify options
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
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border">
        <Label className="text-sm font-medium">Live Preview</Label>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <Card className="h-full min-h-96 bg-white border border-border/20 shadow-sm">
          <div className="p-6">
            <div 
              style={{ 
                ...parseCssString(previewStyle),
                transition: 'all 120ms ease-out'
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
