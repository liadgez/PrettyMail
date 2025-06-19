
import React from 'react';
import { Card } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {message.type === 'bot' && (
        <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      
      <Card className={`max-w-[80%] p-4 ${
        message.type === 'user' 
          ? 'bg-primary text-primary-foreground border-primary/20' 
          : 'bg-card border-border'
      }`}>
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        <div className={`text-xs mt-2 ${
          message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
        }`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </Card>

      {message.type === 'user' && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
