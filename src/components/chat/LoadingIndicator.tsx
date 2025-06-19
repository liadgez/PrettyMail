
import React from 'react';
import { Card } from '@/components/ui/card';
import { Bot } from 'lucide-react';

const LoadingIndicator = () => {
  return (
    <div className="flex gap-3 justify-start">
      <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
        <Bot className="w-4 h-4 text-muted-foreground" />
      </div>
      <Card className="bg-card border-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-muted-foreground">Processing...</span>
        </div>
      </Card>
    </div>
  );
};

export default LoadingIndicator;
