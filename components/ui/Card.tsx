import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  hoverable = false,
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) {
  const base = 'bg-white rounded-2xl border border-pierre/60';
  const hover = hoverable
    ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
    : '';
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`${base} ${hover} ${paddings[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
}
