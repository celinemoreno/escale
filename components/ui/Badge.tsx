interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'pierre';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-pierre-light text-encre-muted',
    accent: 'bg-accent-light text-accent',
    pierre: 'bg-pierre text-encre-muted',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
