
import React from 'react';
import { Palette } from 'lucide-react';
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

interface LayoutNavigationProps {
  layouts: LayoutStyle[];
  selectedLayout: string | null;
  onLayoutSelect: (layoutId: string) => void;
  onLayoutHover: (layoutId: string | null) => void;
  disabled?: boolean;
}

const LayoutNavigation = ({ 
  layouts, 
  selectedLayout, 
  onLayoutSelect, 
  onLayoutHover,
  disabled = false
}: LayoutNavigationProps) => {
  return (
    <div className="h-[120px] bg-[#2c2c2e] border-b border-white/10 flex-shrink-0 mb-6 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0a84ff]/20 flex items-center justify-center">
            <Palette className="w-4 h-4 text-[#0a84ff]" />
          </div>
          <h3 className="text-base font-semibold text-white font-system">Email Layouts</h3>
        </div>
        <div className="text-sm text-white/60 font-system">
          Choose your style
        </div>
      </div>
      
      <div className="flex-1 px-6 py-4">
        <TooltipProvider>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
            {layouts.map((layout) => (
              <Tooltip key={layout.id}>
                <TooltipTrigger asChild>
                  <Card
                    className={`min-w-[160px] h-16 cursor-pointer transition-all duration-300 border flex items-center gap-4 px-4 py-3 transform ${
                      selectedLayout === layout.id 
                        ? 'border-[#0a84ff] bg-[#0a84ff]/15 shadow-[0_0_0_2px_rgba(10,132,255,0.3)] scale-105 ring-2 ring-[#0a84ff]/30' 
                        : 'border-white/20 hover:border-[#0a84ff]/50 hover:bg-white/5 hover:scale-102 hover:shadow-apple'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} bg-[#2a2a2c] active:scale-95`}
                    onMouseEnter={() => !disabled && onLayoutHover(layout.id)}
                    onMouseLeave={() => !disabled && onLayoutHover(null)}
                    onClick={() => !disabled && onLayoutSelect(layout.id)}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-md transition-colors ${
                      selectedLayout === layout.id ? 'bg-[#0a84ff]/20' : 'bg-white/10'
                    }`}>
                      {layout.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold leading-tight truncate font-system transition-colors ${
                        selectedLayout === layout.id ? 'text-[#0a84ff]' : 'text-white'
                      }`}>
                        {layout.name}
                      </div>
                      <div className="text-xs text-white/60 leading-tight truncate font-system mt-1">
                        {layout.description}
                      </div>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-64 bg-[#2c2c2e] border border-white/20 shadow-apple-lg text-white p-3">
                  <p className="text-sm font-semibold text-white font-system">{layout.name}</p>
                  <p className="text-xs text-white/60 mt-2 font-system">{layout.preview}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default LayoutNavigation;
