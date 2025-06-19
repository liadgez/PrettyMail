
import { useState } from 'react';

interface ChatStep {
  step: 'initial' | 'sheet-selection' | 'searching';
  availableSheets?: string[];
  currentPrompt?: string;
}

type Mode = 'analysis' | 'creative' | 'strategy' | '';

interface UseChatHandlersProps {
  currentMode: Mode;
  chatStep: ChatStep;
  setChatStep: (step: ChatStep) => void;
  setIsLoading: (loading: boolean) => void;
  addMessage: (content: string, type: 'user' | 'bot') => void;
}

export const useChatHandlers = ({
  currentMode,
  chatStep,
  setChatStep,
  setIsLoading,
  addMessage
}: UseChatHandlersProps) => {
  
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

  const handleSendMessage = (userInput: string) => {
    if (!currentMode) {
      addMessage('Please select a mode first (Analysis, Creative, or Strategy).', 'bot');
      return;
    }

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

  return { handleSendMessage };
};
