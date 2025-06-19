
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

import ChatSidebar from './chat/ChatSidebar';
import ChatMessage from './chat/ChatMessage';
import LoadingIndicator from './chat/LoadingIndicator';
import ModeSelector from './chat/ModeSelector';
import ChatInput from './chat/ChatInput';
import { useChatState } from '@/hooks/useChatState';
import { useChatHandlers } from '@/hooks/useChatHandlers';

const ChatInterface = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    chatStep,
    setChatStep,
    isLoading,
    setIsLoading,
    currentMode,
    setCurrentMode,
    addMessage
  } = useChatState();

  const { handleSendMessage } = useChatHandlers({
    currentMode,
    chatStep,
    setChatStep,
    setIsLoading,
    addMessage
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const quickInsert = (text: string) => {
    setInputValue(text);
  };

  const onSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;

    addMessage(inputValue, 'user');
    const userInput = inputValue.trim();
    setInputValue('');

    handleSendMessage(userInput);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <ChatSidebar onQuickInsert={quickInsert} />
        
        <SidebarInset>
          <div className="flex flex-col h-screen">
            {/* Header with sidebar trigger */}
            <div className="flex items-center gap-3 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
              <SidebarTrigger />
              <h2 className="text-lg font-semibold">Chat</h2>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {isLoading && <LoadingIndicator />}
              </div>
            </ScrollArea>

            {/* Mode Selector */}
            <ModeSelector currentMode={currentMode} onModeSelect={setCurrentMode} />

            {/* Input Area */}
            <ChatInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSendMessage={onSendMessage}
              isLoading={isLoading}
              currentMode={currentMode}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ChatInterface;
