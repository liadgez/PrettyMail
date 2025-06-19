
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Lightbulb, Target } from 'lucide-react';

type Mode = 'analysis' | 'creative' | 'strategy' | '';

interface ModeSelectorProps {
  currentMode: Mode;
  onModeSelect: (mode: Mode) => void;
}

const ModeSelector = ({ currentMode, onModeSelect }: ModeSelectorProps) => {
  const modes = [
    { mode: 'analysis' as Mode, label: 'Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { mode: 'creative' as Mode, label: 'Creative', icon: <Lightbulb className="w-4 h-4" /> },
    { mode: 'strategy' as Mode, label: 'Strategy', icon: <Target className="w-4 h-4" /> }
  ];

  return (
    <div className="flex gap-2 px-4 py-3 bg-background border-t border-border/50">
      {modes.map(({ mode, label, icon }) => (
        <Button
          key={mode}
          variant={currentMode === mode ? "default" : "outline"}
          size="sm"
          onClick={() => onModeSelect(mode)}
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
  );
};

export default ModeSelector;
