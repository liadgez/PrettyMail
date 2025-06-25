
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
      <div className="flex h-screen w-full overflow-hidden bg-[#1e1e1e]">
        <LayoutSidebar
          layouts={layoutStyles}
          selectedLayout={selectedLayout}
          onLayoutSelect={setSelectedLayout}
          onLayoutHover={setHoveredLayout}
          disabled={!inputContent.trim()}
        />
        
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          {/* Header with macOS-style blur */}
          <div className="flex items-center justify-between gap-3 p-4 border-b border-white/10 bg-[#2c2c2e]/80 backdrop-blur-apple flex-shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="hover:bg-white/10 transition-colors text-white" />
              <Mail className="w-5 h-5 text-[#0a84ff]" />
              <h1 className="text-lg font-medium text-white font-system">Gmail Drafter</h1>
            </div>
            
            <Button variant="ghost" size="sm" className="hover:bg-white/10 transition-colors text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Main Content Grid - Two column layout with proper spacing */}
          <div className="flex-1 grid grid-cols-2 min-h-0 gap-0">
            {/* Input Pane - Left Column */}
            <div className="border-r border-white/10 bg-[#2c2c2e]">
              <InputPane 
                content={inputContent}
                onContentChange={setInputContent}
              />
            </div>
            
            {/* Preview Pane - Right Column */}
            <div className="bg-[#2c2c2e]">
              <PreviewPane 
                content={inputContent}
                previewStyle={getPreviewStyle()}
              />
            </div>
          </div>

          {/* Action Bar with macOS-style styling */}
          <div className="flex items-center justify-between p-4 border-t border-white/10 bg-[#2c2c2e]/80 backdrop-blur-apple flex-shrink-0">
            <div className="text-sm text-white/60 font-medium font-system">
              {inputContent.trim() ? `${inputContent.trim().split(' ').length} words` : 'Select a layout and start typing...'}
            </div>
            
            <Button 
              onClick={handleCreateDraft}
              disabled={!inputContent.trim() || isCreatingDraft}
              className="gap-2 bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white shadow-apple transition-all duration-200 disabled:opacity-50 font-system"
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
