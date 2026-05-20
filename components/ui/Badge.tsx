interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'rouge' | 'bleu' | 'jaune' | 'vert';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-marron/8 text-marron/70',
    rouge:   'bg-rouge/10 text-rouge',
    bleu:    'bg-bleu/20 text-bleu',
    jaune:   'bg-jaune/40 text-marron',
    vert:    'bg-vert/20 text-vert',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
