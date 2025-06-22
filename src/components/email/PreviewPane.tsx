
import React from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface PreviewPaneProps {
  content: string;
  previewStyle: string;
}

const PreviewPane = ({ content, previewStyle }: PreviewPaneProps) => {
  const formatContent = (text: string) => {
    if (!text.trim()) return '<p style="color: #64748b; font-style: italic;">Your email preview will appear here...</p>';
    
    // Simple paragraph formatting
    return text
      .split('\n\n')
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
  };

  const parseCssString = (cssString: string) => {
    const styleObject: React.CSSProperties = {};
    
    // Split by semicolon and parse each CSS property
    cssString.split(';').forEach(rule => {
      const [property, value] = rule.split(':').map(s => s.trim());
      if (property && value) {
        // Convert kebab-case to camelCase for React
        const camelProperty = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        styleObject[camelProperty as keyof React.CSSProperties] = value;
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
