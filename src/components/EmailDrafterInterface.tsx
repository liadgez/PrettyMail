
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Settings } from 'lucide-react';

import InputPane from './email/InputPane';
import PreviewPane from './email/PreviewPane';
import LayoutNavigation from './email/LayoutNavigation';
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
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#1e1e1e]">
      {/* Header with macOS-style blur */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-[#2c2c2e]/80 backdrop-blur-apple flex-shrink-0 h-[72px]">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-[#0a84ff]" />
          <h1 className="text-xl font-semibold text-white font-system">Gmail Drafter</h1>
        </div>
        
        <Button variant="ghost" size="sm" className="hover:bg-white/10 transition-colors text-white p-2">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content Grid - Fixed Height Layout with proper spacing */}
      <div className="flex-1 grid grid-rows-[35%_140px_1fr] min-h-0 overflow-hidden gap-0">
        {/* Input Pane - Top Section (35%) */}
        <div className="bg-[#2c2c2e] border-b border-white/10 min-h-0">
          <InputPane 
            content={inputContent}
            onContentChange={setInputContent}
          />
        </div>
        
        {/* Layout Navigation - Middle Section (140px height) */}
        <LayoutNavigation
          layouts={layoutStyles}
          selectedLayout={selectedLayout}
          onLayoutSelect={setSelectedLayout}
          onLayoutHover={setHoveredLayout}
          disabled={!inputContent.trim()}
        />
        
        {/* Preview Pane - Bottom Section (remaining space) */}
        <div className="bg-[#2c2c2e] min-h-0">
          <PreviewPane 
            content={inputContent}
            previewStyle={getPreviewStyle()}
          />
        </div>
      </div>

      {/* Action Bar with macOS-style styling */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#2c2c2e]/80 backdrop-blur-apple flex-shrink-0 h-[72px]">
        <div className="text-sm text-white/60 font-medium font-system">
          {inputContent.trim() ? `${inputContent.trim().split(' ').length} words` : 'Select a layout and start typing...'}
        </div>
        
        <Button 
          onClick={handleCreateDraft}
          disabled={!inputContent.trim() || isCreatingDraft}
          className="gap-2 px-6 py-2.5 bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white shadow-apple transition-all duration-200 disabled:opacity-50 font-system"
        >
          <Mail className="w-4 h-4" />
          {isCreatingDraft ? 'Creating Draft...' : 'Create Gmail Draft'}
        </Button>
      </div>
    </div>
  );
};

export default EmailDrafterInterface;
