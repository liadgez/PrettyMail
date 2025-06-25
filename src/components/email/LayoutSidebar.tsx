
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
    <Sidebar className="w-80">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Palette className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">Email Layouts</h1>
        </div>
        <p className="text-sm text-muted-foreground">Hover to preview, click to select</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Available Layouts</SidebarGroupLabel>
          <SidebarGroupContent>
            <TooltipProvider>
              <div className="space-y-3 overflow-y-auto max-h-full pr-2">
                {layouts.map((layout) => (
                  <Tooltip key={layout.id}>
                    <TooltipTrigger asChild>
                      <Card
                        className={`w-full h-24 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                          selectedLayout === layout.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onMouseEnter={() => !disabled && onLayoutHover(layout.id)}
                        onMouseLeave={() => !disabled && onLayoutHover(null)}
                        onClick={() => !disabled && onLayoutSelect(layout.id)}
                      >
                        <div className="flex items-center h-full p-4 gap-3">
                          <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
                            {layout.thumbnail}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium leading-tight mb-1">
                              {layout.name}
                            </div>
                            <div className="text-xs text-muted-foreground leading-tight">
                              {layout.description}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-64">
                      <p className="text-sm font-medium">{layout.name}</p>
                      <p className="text-xs text-muted-foreground">{layout.preview}</p>
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
