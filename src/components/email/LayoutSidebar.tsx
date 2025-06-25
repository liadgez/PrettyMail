
import React from 'react';
import { Palette } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

interface LayoutStyle {
  id: string;
  name: string;
  description: string;
  cssInline: string;
  supportsDarkMode: boolean;
  thumbnail: React.ReactNode;
  preview: string;
}

interface LayoutSidebarProps {
  layouts: LayoutStyle[];
  selectedLayout: string | null;
  onLayoutSelect: (layoutId: string) => void;
  onLayoutHover: (layoutId: string | null) => void;
  disabled?: boolean;
}

const LayoutSidebar = ({ 
  layouts, 
  selectedLayout, 
  onLayoutSelect, 
  onLayoutHover,
  disabled = false
}: LayoutSidebarProps) => {
  return (
    <Sidebar className="w-80 bg-[#1e1e1e] border-r border-white/10">
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0a84ff]/20 flex items-center justify-center">
            <Palette className="w-4 h-4 text-[#0a84ff]" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-white font-system">Email Layouts</h1>
            <p className="text-sm text-white/60 font-system">Choose your style</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3 font-system">
            Available Layouts
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <TooltipProvider>
              <div className="space-y-3 overflow-y-auto max-h-full pr-2">
                {layouts.map((layout) => (
                  <Tooltip key={layout.id}>
                    <TooltipTrigger asChild>
                      <Card
                        className={`w-full h-20 cursor-pointer transition-all duration-300 hover:shadow-apple border ${
                          selectedLayout === layout.id 
                            ? 'border-[#0a84ff] bg-[#0a84ff]/10 shadow-apple' 
                            : 'border-white/20 hover:border-[#0a84ff]/50 hover:bg-white/5'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} bg-[#2c2c2e]`}
                        onMouseEnter={() => !disabled && onLayoutHover(layout.id)}
                        onMouseLeave={() => !disabled && onLayoutHover(null)}
                        onClick={() => !disabled && onLayoutSelect(layout.id)}
                      >
                        <div className="flex items-center h-full p-4 gap-3">
                          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-lg bg-white/10">
                            {layout.thumbnail}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium leading-tight mb-1 text-white font-system">
                              {layout.name}
                            </div>
                            <div className="text-xs text-white/60 leading-tight line-clamp-2 font-system">
                              {layout.description}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-64 bg-[#2c2c2e] border border-white/20 shadow-apple-lg text-white">
                      <p className="text-sm font-medium text-white font-system">{layout.name}</p>
                      <p className="text-xs text-white/60 mt-1 font-system">{layout.preview}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default LayoutSidebar;
