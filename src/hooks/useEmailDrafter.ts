
import { useState } from 'react';

interface EmailDraft {
  id: string;
  content: string;
  selectedLayout: string | null;
  timestamp: Date;
}

interface LayoutStyle {
  id: string;
  name: string;
  description: string;
  cssInline: string;
  supportsDarkMode: boolean;
  thumbnail: React.ReactNode;
  preview: string;
}

export const useEmailDrafter = () => {
  const [inputContent, setInputContent] = useState('');
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [hoveredLayout, setHoveredLayout] = useState<string | null>(null);
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);
  const [drafts, setDrafts] = useState<EmailDraft[]>([]);

  // Improved layout styles with better names and visual indicators
  const layoutStyles: LayoutStyle[] = [
    {
      id: 'big-title',
      name: 'Big Title',
      description: 'Large header with emphasis',
      cssInline: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; font-size: 18px; font-weight: 600;',
      supportsDarkMode: true,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-2 bg-gray-800 rounded"></div>
          <div className="w-6 h-1 bg-gray-400 rounded"></div>
          <div className="w-7 h-1 bg-gray-400 rounded"></div>
        </div>
      ),
      preview: 'Bold header style with larger text'
    },
    {
      id: 'underlined-sections',
      name: 'Underlined Sections',
      description: 'Clean sections with dividers',
      cssInline: 'font-family: Georgia, serif; line-height: 1.8; color: #2c3e50; max-width: 650px; padding: 20px; border-left: 4px solid #3498db;',
      supportsDarkMode: false,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-1 bg-blue-600 rounded"></div>
          <div className="w-8 h-1 bg-gray-600 rounded"></div>
          <div className="w-6 h-0.5 bg-blue-300 rounded"></div>
          <div className="w-7 h-1 bg-gray-600 rounded"></div>
        </div>
      ),
      preview: 'Professional sections with accent borders'
    },
    {
      id: 'compact',
      name: 'Compact',
      description: 'Dense, space-efficient layout',
      cssInline: 'font-family: "Helvetica Neue", Arial, sans-serif; line-height: 1.4; color: #444; max-width: 580px; font-size: 14px;',
      supportsDarkMode: true,
      thumbnail: (
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-1 bg-gray-700 rounded"></div>
          <div className="w-7 h-1 bg-gray-700 rounded"></div>
          <div className="w-6 h-1 bg-gray-700 rounded"></div>
          <div className="w-8 h-1 bg-gray-700 rounded"></div>
        </div>
      ),
      preview: 'Tight spacing for concise emails'
    },
    {
      id: 'classic-block',
      name: 'Classic Block',
      description: 'Traditional email formatting',
      cssInline: 'font-family: "Times New Roman", serif; line-height: 1.6; color: #333; max-width: 600px; font-size: 16px;',
      supportsDarkMode: true,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-3 bg-gray-200 border border-gray-400 rounded"></div>
          <div className="w-6 h-1 bg-gray-600 rounded"></div>
          <div className="w-7 h-1 bg-gray-600 rounded"></div>
        </div>
      ),
      preview: 'Standard block format with serif font'
    }
  ];

  const createGmailDraft = async () => {
    setIsCreatingDraft(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDraft: EmailDraft = {
      id: Date.now().toString(),
      content: inputContent,
      selectedLayout: selectedLayout,
      timestamp: new Date()
    };
    
    setDrafts(prev => [...prev, newDraft]);
    setIsCreatingDraft(false);
    
    // Show success message
    console.log('Draft created successfully:', newDraft);
  };

  const getPreviewStyle = () => {
    const activeLayout = hoveredLayout || selectedLayout;
    return layoutStyles.find(layout => layout.id === activeLayout)?.cssInline || layoutStyles[0].cssInline;
  };

  return {
    inputContent,
    setInputContent,
    selectedLayout,
    setSelectedLayout,
    hoveredLayout,
    setHoveredLayout,
    isCreatingDraft,
    layoutStyles,
    createGmailDraft,
    getPreviewStyle,
    drafts
  };
};
