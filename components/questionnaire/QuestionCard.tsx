'use client';

import type { QuestionOption } from '@/types';

interface QuestionCardProps {
  question: string;
  subtitle?: string;
  options: QuestionOption[];
  selected: string | string[];
  multiSelect?: boolean;
  onSelect: (value: string) => void;
}

export default function QuestionCard({
  question, subtitle, options, selected, multiSelect = false, onSelect,
}: QuestionCardProps) {
  const isSelected = (value: string): boolean =>
    multiSelect ? Array.isArray(selected) && selected.includes(value) : selected === value;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-marron mb-3 leading-tight">{question}</h2>
        {subtitle && <p className="text-marron/60 text-base">{subtitle}</p>}
      </div>

      <div className={`grid gap-3 ${options.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
        {options.map((option) => {
          const active = isSelected(option.value);
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`
                group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center
                transition-all duration-200 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-rouge focus-visible:ring-offset-2 active:scale-[0.97]
                ${active
                  ? 'border-marron bg-marron text-blanc shadow-md'
                  : 'border-marron/15 bg-blanc text-marron hover:border-marron/40 hover:shadow-sm'}
              `}
            >
              <span className="text-3xl leading-none">{option.icon}</span>
              <div>
                <div className={`font-medium text-base leading-tight ${active ? 'text-blanc' : 'text-marron'}`}>
                  {option.label}
                </div>
                <div className={`mt-1 text-xs leading-snug ${active ? 'text-blanc/70' : 'text-marron/60'}`}>
                  {option.description}
                </div>
              </div>
              {multiSelect && active && (
                <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blanc">
                  <svg className="h-3 w-3 text-marron" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
