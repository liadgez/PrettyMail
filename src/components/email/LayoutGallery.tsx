
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LayoutStyle {
  id: string;
  name: string;
  description: string;
  cssInline: string;
  supportsDarkMode: boolean;
  thumbnail: React.ReactNode;
  preview: string;
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
      
      <TooltipProvider>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {layouts.map((layout) => (
            <Tooltip key={layout.id}>
              <TooltipTrigger asChild>
                <Card
                  className={`flex-shrink-0 w-32 h-20 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                    selectedLayout === layout.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onMouseEnter={() => !disabled && onLayoutHover(layout.id)}
                  onMouseLeave={() => !disabled && onLayoutHover(null)}
                  onClick={() => !disabled && onLayoutSelect(layout.id)}
                >
                  <div className="flex flex-col items-center justify-center h-full p-3 gap-2">
                    <div className="flex items-center justify-center w-8 h-6">
                      {layout.thumbnail}
                    </div>
                    <div className="text-xs font-medium text-center leading-tight">
                      {layout.name}
                    </div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-48">
                <p className="text-sm font-medium">{layout.name}</p>
                <p className="text-xs text-muted-foreground">{layout.preview}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default LayoutGallery;
