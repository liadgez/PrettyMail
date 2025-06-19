
import { useState } from 'react';

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

export const useChatState = () => {
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

  const addMessage = (content: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return {
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
  };
};
