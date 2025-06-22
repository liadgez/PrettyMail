
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Mail, Settings } from 'lucide-react';

import ChatSidebar from './chat/ChatSidebar';
import InputPane from './email/InputPane';
import PreviewPane from './email/PreviewPane';
import LayoutGallery from './email/LayoutGallery';
import ModeSelector from './chat/ModeSelector';
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

  const quickInsert = (text: string) => {
    setInputContent(text);
  };

  const handleCreateDraft = async () => {
    if (!inputContent.trim() || isCreatingDraft) return;
    await createGmailDraft();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <ChatSidebar onQuickInsert={quickInsert} />
        
        <SidebarInset>
          <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <Mail className="w-5 h-5 text-primary" />
                <h1 className="text-lg font-semibold">The Gmail Drafter</h1>
              </div>
              
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
              {/* Input Pane */}
              <InputPane 
                content={inputContent}
                onContentChange={setInputContent}
              />
              
              {/* Preview Pane */}
              <PreviewPane 
                content={inputContent}
                previewStyle={getPreviewStyle()}
              />
            </div>

            {/* Layout Gallery */}
            <LayoutGallery
              layouts={layoutStyles}
              selectedLayout={selectedLayout}
              onLayoutSelect={setSelectedLayout}
              onLayoutHover={setHoveredLayout}
              disabled={!inputContent.trim()}
            />

            {/* Action Bar */}
            <div className="flex items-center justify-between p-4 border-t border-border bg-background">
              <div className="text-sm text-muted-foreground">
                {inputContent.trim() ? `${inputContent.trim().split(' ').length} words` : 'Start typing to enable layouts'}
              </div>
              
              <Button 
                onClick={handleCreateDraft}
                disabled={!inputContent.trim() || isCreatingDraft}
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                {isCreatingDraft ? 'Creating Draft...' : 'Create Gmail Draft'}
              </Button>
            </div>

            {/* Hidden Mode Selector for Future Use */}
            <div className="hidden">
              <ModeSelector currentMode="" onModeSelect={() => {}} />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EmailDrafterInterface;
