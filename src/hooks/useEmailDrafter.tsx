import React, { useState } from 'react';

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

  // Expanded layout styles with many more options
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
    },
    {
      id: 'modern-minimal',
      name: 'Modern Minimal',
      description: 'Clean and contemporary',
      cssInline: 'font-family: "Inter", "Segoe UI", sans-serif; line-height: 1.7; color: #1a1a1a; max-width: 560px; font-size: 15px; letter-spacing: 0.3px;',
      supportsDarkMode: true,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-1 bg-gray-300 rounded"></div>
          <div className="w-8 h-1 bg-gray-600 rounded"></div>
          <div className="w-5 h-1 bg-gray-300 rounded"></div>
        </div>
      ),
      preview: 'Minimalist design with perfect spacing'
    },
    {
      id: 'newsletter-style',
      name: 'Newsletter Style',
      description: 'Professional newsletter format',
      cssInline: 'font-family: "Roboto", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 680px; font-size: 16px; background: #f8f9fa; padding: 30px; border-radius: 8px;',
      supportsDarkMode: false,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-4 bg-gray-100 border border-gray-300 rounded"></div>
          <div className="w-7 h-1 bg-gray-700 rounded"></div>
          <div className="w-6 h-1 bg-gray-500 rounded"></div>
        </div>
      ),
      preview: 'Newsletter-style with background and padding'
    },
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      description: 'Formal business communication',
      cssInline: 'font-family: "Calibri", "Trebuchet MS", sans-serif; line-height: 1.5; color: #2c2c2c; max-width: 700px; font-size: 16px; font-weight: 400; text-align: justify;',
      supportsDarkMode: true,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-1.5 bg-gray-800 rounded"></div>
          <div className="w-7 h-1 bg-gray-600 rounded"></div>
          <div className="w-8 h-1 bg-gray-600 rounded"></div>
          <div className="w-6 h-1 bg-gray-600 rounded"></div>
        </div>
      ),
      preview: 'Formal business style with justified text'
    },
    {
      id: 'creative-bold',
      name: 'Creative Bold',
      description: 'Eye-catching and dynamic',
      cssInline: 'font-family: "Montserrat", "Arial Black", sans-serif; line-height: 1.4; color: #1a1a1a; max-width: 620px; font-size: 17px; font-weight: 500; border-left: 6px solid #ff6b35;',
      supportsDarkMode: false,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-1 h-4 bg-orange-500 rounded"></div>
          <div className="w-8 h-1.5 bg-gray-800 rounded"></div>
          <div className="w-6 h-1 bg-gray-600 rounded"></div>
        </div>
      ),
      preview: 'Bold design with vibrant accent colors'
    },
    {
      id: 'handwritten-style',
      name: 'Handwritten Style',
      description: 'Personal and warm',
      cssInline: 'font-family: "Comic Sans MS", "Marker Felt", cursive; line-height: 1.8; color: #2c3e50; max-width: 580px; font-size: 15px; letter-spacing: 0.5px;',
      supportsDarkMode: true,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-1 bg-blue-400 rounded-full"></div>
          <div className="w-6 h-1 bg-blue-600 rounded-full"></div>
          <div className="w-8 h-1 bg-blue-400 rounded-full"></div>
        </div>
      ),
      preview: 'Casual handwritten feel for personal touch'
    },
    {
      id: 'tech-monospace',
      name: 'Tech Monospace',
      description: 'Developer and tech-focused',
      cssInline: 'font-family: "Fira Code", "Monaco", "Consolas", monospace; line-height: 1.6; color: #24292e; max-width: 640px; font-size: 14px; background: #f6f8fa; padding: 20px;',
      supportsDarkMode: true,
      thumbnail: (
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-2 h-1 bg-green-500"></div>
          <div className="w-8 h-1 bg-gray-700"></div>
          <div className="w-7 h-1 bg-gray-700"></div>
          <div className="w-6 h-1 bg-gray-700"></div>
        </div>
      ),
      preview: 'Monospace font perfect for technical content'
    },
    {
      id: 'elegant-serif',
      name: 'Elegant Serif',
      description: 'Sophisticated and refined',
      cssInline: 'font-family: "Playfair Display", "Times New Roman", serif; line-height: 1.7; color: #2c2c2c; max-width: 600px; font-size: 17px; font-weight: 400;',
      supportsDarkMode: true,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-2 bg-purple-700 rounded"></div>
          <div className="w-6 h-1 bg-gray-600 rounded"></div>
          <div className="w-7 h-1 bg-gray-600 rounded"></div>
        </div>
      ),
      preview: 'Elegant serif typography for refined communication'
    },
    {
      id: 'startup-pitch',
      name: 'Startup Pitch',
      description: 'Modern startup communication',
      cssInline: 'font-family: "SF Pro Display", "Helvetica Neue", sans-serif; line-height: 1.5; color: #1d1d1f; max-width: 600px; font-size: 16px; font-weight: 400; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 12px;',
      supportsDarkMode: false,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
          <div className="w-6 h-1 bg-white rounded"></div>
          <div className="w-7 h-1 bg-white rounded"></div>
        </div>
      ),
      preview: 'Eye-catching gradient design for pitches'
    },
    {
      id: 'academic-paper',
      name: 'Academic Paper',
      description: 'Scholarly and professional',
      cssInline: 'font-family: "Linux Libertine", "Times New Roman", serif; line-height: 1.8; color: #000; max-width: 720px; font-size: 16px; text-align: justify; margin: 0 auto;',
      supportsDarkMode: false,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-1 bg-black rounded"></div>
          <div className="w-7 h-1 bg-black rounded"></div>
          <div className="w-8 h-1 bg-black rounded"></div>
          <div className="w-6 h-1 bg-black rounded"></div>
        </div>
      ),
      preview: 'Academic formatting with justified text'
    },
    {
      id: 'sales-letter',
      name: 'Sales Letter',
      description: 'Persuasive and compelling',
      cssInline: 'font-family: "Open Sans", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; font-size: 16px; padding: 20px; border: 2px solid #e74c3c; background: #fff;',
      supportsDarkMode: false,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-3 bg-white border-2 border-red-500 rounded"></div>
          <div className="w-6 h-1 bg-gray-700 rounded"></div>
          <div className="w-7 h-1 bg-gray-700 rounded"></div>
        </div>
      ),
      preview: 'Sales-focused design with attention-grabbing border'
    },
    {
      id: 'magazine-article',
      name: 'Magazine Article',
      description: 'Editorial and engaging',
      cssInline: 'font-family: "Merriweather", Georgia, serif; line-height: 1.8; color: #2c2c2c; max-width: 680px; font-size: 16px; column-count: 1; text-indent: 1.5em;',
      supportsDarkMode: true,
      thumbnail: (
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-1.5 bg-gray-800 rounded"></div>
          <div className="w-7 h-1 bg-gray-600 rounded ml-2"></div>
          <div className="w-6 h-1 bg-gray-600 rounded ml-2"></div>
        </div>
      ),
      preview: 'Magazine-style with indented paragraphs'
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
