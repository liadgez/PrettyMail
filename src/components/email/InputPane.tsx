
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface InputPaneProps {
  content: string;
  onContentChange: (content: string) => void;
}

const InputPane = ({ content, onContentChange }: InputPaneProps) => {
  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <Label htmlFor="email-input" className="text-sm font-medium">
          Email Content
        </Label>
      </div>
      
      <div className="flex-1 p-4">
        <Textarea
          id="email-input"
          placeholder="Paste or write your email content here..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="h-full resize-none border-0 bg-transparent p-0 focus-visible:ring-0 text-base leading-relaxed"
          style={{ minHeight: '100%' }}
        />
      </div>
    </div>
  );
};

export default InputPane;
