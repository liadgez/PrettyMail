
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

type Mode = 'analysis' | 'creative' | 'strategy' | '';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  currentMode: Mode;
}

const ChatInput = ({ inputValue, setInputValue, onSendMessage, isLoading, currentMode }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const updatePlaceholder = (mode: Mode) => {
    const placeholders = {
      analysis: 'Ask your analysis question...',
      creative: 'Ask your creative question...',
      strategy: 'Ask your strategy question...',
      '': 'Choose a mode first...'
    };
    return placeholders[mode];
  };

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={updatePlaceholder(currentMode)}
            className="min-h-[120px] max-h-[200px] resize-none bg-input border-border text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />
        </div>
        <Button
          onClick={onSendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="h-[120px] px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-xs text-muted-foreground mt-2 text-center">
        {currentMode ? `${currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} mode selected` : 'Choose a mode'} • Press Enter to send
      </div>
    </div>
  );
};

export default ChatInput;
