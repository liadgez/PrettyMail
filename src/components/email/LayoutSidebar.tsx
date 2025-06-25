
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
    <Sidebar className="w-80 bg-sidebar border-r border-sidebar-border/50">
      <SidebarHeader className="p-6 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Palette className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">Email Layouts</h1>
            <p className="text-sm text-sidebar-foreground/60">Choose your style</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-medium uppercase tracking-wider mb-3">
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
                            ? 'border-primary bg-primary/5 shadow-apple' 
                            : 'border-sidebar-border hover:border-primary/50 hover:bg-sidebar-accent/50'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onMouseEnter={() => !disabled && onLayoutHover(layout.id)}
                        onMouseLeave={() => !disabled && onLayoutHover(null)}
                        onClick={() => !disabled && onLayoutSelect(layout.id)}
                      >
                        <div className="flex items-center h-full p-4 gap-3">
                          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-lg bg-sidebar-accent">
                            {layout.thumbnail}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium leading-tight mb-1 text-sidebar-foreground">
                              {layout.name}
                            </div>
                            <div className="text-xs text-sidebar-foreground/60 leading-tight line-clamp-2">
                              {layout.description}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-64 bg-popover border border-border shadow-apple-lg">
                      <p className="text-sm font-medium text-popover-foreground">{layout.name}</p>
                      <p className="text-xs text-popover-foreground/60 mt-1">{layout.preview}</p>
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
