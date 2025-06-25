
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Mail, Settings } from 'lucide-react';

import InputPane from './email/InputPane';
import PreviewPane from './email/PreviewPane';
import LayoutSidebar from './email/LayoutSidebar';
import { useEmailDrafter } from '@/hooks/useEmailDrafter';

const EmailDrafterInterface = () => {
  const {
    inputContent,
    setInputContent,
    selectedLayout,
    setSelectedLayout,
    hoveredLayout,
    setHoveredLayout,
    isCreatingDraft,
    layoutStyles,
    createGmailDraft,
    getPreviewStyle
  } = useEmailDrafter();

  const handleCreateDraft = async () => {
    if (!inputContent.trim() || isCreatingDraft) return;
    await createGmailDraft();
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <LayoutSidebar
          layouts={layoutStyles}
          selectedLayout={selectedLayout}
          onLayoutSelect={setSelectedLayout}
          onLayoutHover={setHoveredLayout}
          disabled={!inputContent.trim()}
        />
        
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          {/* Header with Apple-style blur */}
          <div className="flex items-center justify-between gap-3 p-4 border-b border-border/50 bg-background/80 backdrop-blur-apple flex-shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="hover:bg-accent/80 transition-colors" />
              <Mail className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-semibold text-foreground">Gmail Drafter</h1>
            </div>
            
            <Button variant="ghost" size="sm" className="hover:bg-accent/80 transition-colors">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Main Content Grid - Two column layout */}
          <div className="flex-1 grid grid-cols-2 min-h-0">
            {/* Input Pane - Left Column */}
            <div className="border-r border-border/50">
              <InputPane 
                content={inputContent}
                onContentChange={setInputContent}
              />
            </div>
            
            {/* Preview Pane - Right Column */}
            <div>
              <PreviewPane 
                content={inputContent}
                previewStyle={getPreviewStyle()}
              />
            </div>
          </div>

          {/* Action Bar with Apple-style styling */}
          <div className="flex items-center justify-between p-4 border-t border-border/50 bg-background/80 backdrop-blur-apple flex-shrink-0">
            <div className="text-sm text-muted-foreground font-medium">
              {inputContent.trim() ? `${inputContent.trim().split(' ').length} words` : 'Select a layout and start typing...'}
            </div>
            
            <Button 
              onClick={handleCreateDraft}
              disabled={!inputContent.trim() || isCreatingDraft}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-apple transition-all duration-200 disabled:opacity-50"
            >
              <Mail className="w-4 h-4" />
              {isCreatingDraft ? 'Creating Draft...' : 'Create Gmail Draft'}
            </Button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EmailDrafterInterface;
