
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LayoutStyle {
  id: string;
  name: string;
  description: string;
  cssInline: string;
  supportsDarkMode: boolean;
  thumbnail: string;
}

interface LayoutGalleryProps {
  layouts: LayoutStyle[];
  selectedLayout: string | null;
  onLayoutSelect: (layoutId: string) => void;
  onLayoutHover: (layoutId: string | null) => void;
  disabled?: boolean;
}

const LayoutGallery = ({ 
  layouts, 
  selectedLayout, 
  onLayoutSelect, 
  onLayoutHover,
  disabled = false
}: LayoutGalleryProps) => {
  return (
    <div className="px-4 py-3 border-t border-border bg-card/50">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-foreground">Email Layouts</h3>
        <p className="text-xs text-muted-foreground">Hover to preview, click to select</p>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2">
        {layouts.map((layout) => (
          <Card
            key={layout.id}
            className={`flex-shrink-0 w-24 h-20 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
              selectedLayout === layout.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onMouseEnter={() => !disabled && onLayoutHover(layout.id)}
            onMouseLeave={() => !disabled && onLayoutHover(null)}
            onClick={() => !disabled && onLayoutSelect(layout.id)}
          >
            <div className="flex flex-col items-center justify-center h-full p-2">
              <div className="text-lg mb-1">{layout.thumbnail}</div>
              <div className="text-xs font-medium text-center leading-tight">
                {layout.name}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LayoutGallery;
