
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
  thumbnail: string;
}

export const useEmailDrafter = () => {
  const [inputContent, setInputContent] = useState('');
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [hoveredLayout, setHoveredLayout] = useState<string | null>(null);
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);
  const [drafts, setDrafts] = useState<EmailDraft[]>([]);

  // Mock layout styles for MVP
  const layoutStyles: LayoutStyle[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and simple',
      cssInline: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px;',
      supportsDarkMode: true,
      thumbnail: '📄'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Business formal',
      cssInline: 'font-family: Georgia, serif; line-height: 1.8; color: #2c3e50; max-width: 650px; padding: 20px; border-left: 4px solid #3498db;',
      supportsDarkMode: false,
      thumbnail: '💼'
    },
    {
      id: 'friendly',
      name: 'Friendly',
      description: 'Warm and approachable',
      cssInline: 'font-family: "Comic Sans MS", cursive, sans-serif; line-height: 1.7; color: #e67e22; max-width: 580px; background: #fef9e7; padding: 15px; border-radius: 8px;',
      supportsDarkMode: false,
      thumbnail: '😊'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary style',
      cssInline: 'font-family: "Helvetica Neue", Arial, sans-serif; line-height: 1.5; color: #34495e; max-width: 620px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 12px;',
      supportsDarkMode: true,
      thumbnail: '🎨'
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
