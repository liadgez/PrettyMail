
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface InputPaneProps {
  content: string;
  onContentChange: (content: string) => void;
}

const InputPane = ({ content, onContentChange }: InputPaneProps) => {
  const MAX_CONTENT_LENGTH = 50000; // 50KB limit
  const characterCount = content.length;
  const isOverLimit = characterCount > MAX_CONTENT_LENGTH;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    
    // Allow typing but warn when over limit
    onContentChange(newContent);
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <Label htmlFor="email-input" className="text-sm font-medium">
            Email Content
          </Label>
          <div className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
            {characterCount.toLocaleString()}/{MAX_CONTENT_LENGTH.toLocaleString()} chars
          </div>
        </div>
        {isOverLimit && (
          <p className="text-xs text-red-500 mt-1">
            Content exceeds size limit. Preview may be disabled.
          </p>
        )}
      </div>
      
      <div className="flex-1 p-4">
        <Textarea
          id="email-input"
          placeholder="Paste or write your email content here..."
          value={content}
          onChange={handleContentChange}
          className="h-full resize-none border-0 bg-transparent p-0 focus-visible:ring-0 text-base leading-relaxed"
          style={{ minHeight: '100%' }}
        />
      </div>
    </div>
  );
};

export default InputPane;
