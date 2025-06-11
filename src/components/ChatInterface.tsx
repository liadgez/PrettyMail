
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, FileSpreadsheet, BarChart3, Lightbulb, Target } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

interface ChatStep {
  step: 'initial' | 'sheet-selection' | 'searching';
  availableSheets?: string[];
  currentPrompt?: string;
}

type Mode = 'analysis' | 'creative' | 'strategy' | '';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Select a mode above, then ask me to search or analyze your A/B test data.",
      type: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [chatStep, setChatStep] = useState<ChatStep>({ step: 'initial' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<Mode>('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (content: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const selectMode = (mode: Mode) => {
    setCurrentMode(mode);
    updatePlaceholder(mode);
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

  const quickInsert = (text: string) => {
    setInputValue(text);
  };

  const simulateSheetSearch = (prompt: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockSheets = ['Test Results Q4', 'Campaign Data', 'User Analytics', 'Performance Metrics'];
      setChatStep({ 
        step: 'sheet-selection', 
        availableSheets: mockSheets,
        currentPrompt: prompt 
      });
      
      addMessage(
        `I found ${mockSheets.length} available sheets:\n\n${mockSheets.map((sheet, index) => `${index + 1}. ${sheet}`).join('\n')}\n\nPlease tell me which sheet you'd like me to search in. You can use the sheet name or number.`,
        'bot'
      );
      setIsLoading(false);
    }, 1500);
  };

  const simulateSheetDataSearch = (sheetName: string, prompt: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockResults = [
        { test_name: 'Button Color Test', impressions: 1250, conversion_rate: '3.2%' },
        { test_name: 'Header Layout A/B', impressions: 890, conversion_rate: '2.8%' },
        { test_name: 'CTA Position Test', impressions: 1567, conversion_rate: '4.1%' }
      ];

      const resultText = `✅ Search Results from "${sheetName}":\n\nFound ${mockResults.length} matching tests:\n\n${mockResults.map((result, index) => 
        `${index + 1}. ${result.test_name}\n   • Impressions: ${result.impressions}\n   • Conversion Rate: ${result.conversion_rate}`
      ).join('\n\n')}\n\nWould you like to search for something else?`;

      addMessage(resultText, 'bot');
      setChatStep({ step: 'initial' });
      setIsLoading(false);
    }, 2000);
  };

  const handleAiPrompt = (prompt: string, mode: Mode) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const responses = {
        creative: `🎨 Creative Response: Here are some innovative ideas for your A/B test:\n\n• Try bold, contrasting colors for your CTA buttons\n• Experiment with personalized headlines using user data\n• Test emotional vs. rational messaging approaches\n• Consider using urgency indicators like countdown timers\n\nWould you like me to elaborate on any of these creative strategies?`,
        strategy: `🎯 Strategic Analysis: Based on best practices, here's my strategic recommendation:\n\n• Focus on high-impact elements first (headlines, CTAs)\n• Run tests for at least 2 weeks to account for weekly patterns\n• Ensure statistical significance (95% confidence level)\n• Consider seasonal factors in your test timing\n• Document all learnings for future reference\n\nWould you like specific strategic guidance for your current tests?`
      };
      
      addMessage(responses[mode as keyof typeof responses] || 'I can help with that!', 'bot');
      setIsLoading(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;

    if (!currentMode) {
      addMessage('Please select a mode first (Analysis, Creative, or Strategy).', 'bot');
      return;
    }

    addMessage(inputValue, 'user');
    const userInput = inputValue.trim();
    setInputValue('');

    if (currentMode === 'analysis') {
      if (chatStep.step === 'initial') {
        simulateSheetSearch(userInput);
      } else if (chatStep.step === 'sheet-selection') {
        const { availableSheets, currentPrompt } = chatStep;
        const sheetIndex = parseInt(userInput) - 1;
        
        let selectedSheet: string;
        if (!isNaN(sheetIndex) && sheetIndex >= 0 && sheetIndex < (availableSheets?.length || 0)) {
          selectedSheet = availableSheets![sheetIndex];
        } else if (availableSheets?.includes(userInput)) {
          selectedSheet = userInput;
        } else {
          addMessage("I couldn't find that sheet. Please try again with a valid sheet name or number.", 'bot');
          return;
        }

        addMessage(`Great! Searching in "${selectedSheet}" for: "${currentPrompt}"`, 'bot');
        setChatStep({ step: 'searching' });
        simulateSheetDataSearch(selectedSheet, currentPrompt!);
      }
    } else {
      handleAiPrompt(userInput, currentMode);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getModeIcon = (mode: Mode) => {
    switch (mode) {
      case 'analysis': return <BarChart3 className="w-4 h-4" />;
      case 'creative': return <Lightbulb className="w-4 h-4" />;
      case 'strategy': return <Target className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">A/B Test Sheet Assistant</h1>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 p-4 bg-background border-b border-border/50">
        {[
          { mode: 'analysis' as Mode, label: 'Analysis', icon: <BarChart3 className="w-4 h-4" /> },
          { mode: 'creative' as Mode, label: 'Creative', icon: <Lightbulb className="w-4 h-4" /> },
          { mode: 'strategy' as Mode, label: 'Strategy', icon: <Target className="w-4 h-4" /> }
        ].map(({ mode, label, icon }) => (
          <Button
            key={mode}
            variant={currentMode === mode ? "default" : "outline"}
            size="sm"
            onClick={() => selectMode(mode)}
            className={`flex-1 gap-2 ${
              currentMode === mode 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background hover:bg-accent border-border'
            }`}
          >
            {icon}
            {label}
          </Button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 bg-background">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => quickInsert('What can you do for me?')}
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          💡 General capabilities
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
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
          ))}
          
          {isLoading && (
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
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={updatePlaceholder(currentMode)}
              className="min-h-[60px] max-h-[120px] resize-none bg-input border-border text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="h-[60px] px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-center">
          {currentMode ? `${currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} mode selected` : 'Choose a mode'} • Press Enter to send
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
