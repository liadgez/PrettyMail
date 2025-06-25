
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
    onContentChange(newContent);
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-6 border-b border-border/50">
        <div className="flex justify-between items-center">
          <Label htmlFor="email-input" className="text-base font-semibold text-card-foreground">
            Email Content
          </Label>
          <div className={`text-xs font-medium ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
            {characterCount.toLocaleString()}/{MAX_CONTENT_LENGTH.toLocaleString()}
          </div>
        </div>
        {isOverLimit && (
          <p className="text-xs text-destructive mt-2 font-medium">
            Content exceeds size limit. Preview may be disabled.
          </p>
        )}
      </div>
      
      <div className="flex-1 p-6">
        <Textarea
          id="email-input"
          placeholder="Write your email content here... Start typing to see it formatted in real-time."
          value={content}
          onChange={handleContentChange}
          className="h-full resize-none border-0 bg-transparent p-0 focus-visible:ring-0 text-base leading-relaxed placeholder:text-muted-foreground/60"
          style={{ minHeight: '100%' }}
        />
      </div>
    </div>
  );
};

export default InputPane;
