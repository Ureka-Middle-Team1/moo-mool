'use client';

import { Button } from "@/components/ui/button";

interface PlanModeToggleProps {
  mode: 'basic' | 'compare';
  onChange: (mode: 'basic' | 'compare') => void;
}

export default function PlanModeToggle({ mode, onChange }: PlanModeToggleProps) {
  return (
    <div className="relative flex bg-gray-400 p-0.5 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-white rounded-lg transition-transform duration-500"
        style={{
          transform: mode === 'basic' ? 'translateX(0%)' : 'translateX(100%)',
        }}
      />
      <Button
        variant="ghost"
        className={`flex-1 py-0.5 text-sm z-10 hover:bg-transparent ${mode === 'basic' ? 'text-gray-700 font-semibold' : 'text-black'}`}
        onClick={() => onChange('basic')}
      >
        기본
      </Button>
      <Button
        variant="ghost"
        className={`flex-1 py-0.5 text-sm z-10 hover:bg-transparent ${mode === 'compare' ? 'text-gray-700 font-semibold' : 'text-black'}`}
        onClick={() => onChange('compare')}
      >
        내 요금제와 비교
      </Button>
    </div>
  );
}
