
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
    <div className="flex flex-col h-full bg-[#2c2c2e]">
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="email-input" className="text-lg font-semibold text-white font-system">
            Start writing your email here...
          </Label>
          <div className={`text-sm font-medium font-system ${isOverLimit ? 'text-red-400' : 'text-white/60'}`}>
            {characterCount.toLocaleString()}/{MAX_CONTENT_LENGTH.toLocaleString()}
          </div>
        </div>
        {isOverLimit && (
          <p className="text-sm text-red-400 mt-2 font-medium font-system">
            Content exceeds size limit. Preview may be disabled.
          </p>
        )}
      </div>
      
      <div className="flex-1 px-6 py-4">
        <Textarea
          id="email-input"
          placeholder="Your email content here... Start typing to see it formatted in real-time."
          value={content}
          onChange={handleContentChange}
          className="h-full resize-none border-0 bg-transparent p-4 focus-visible:ring-0 text-base leading-relaxed placeholder:text-white/40 text-white font-system rounded-md"
          style={{ minHeight: '100%' }}
        />
      </div>
    </div>
  );
};

export default InputPane;
