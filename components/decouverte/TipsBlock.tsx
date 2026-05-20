interface TipsBlockProps {
  tips: string[];
}

const TIP_ICONS = ['🗝️', '⚡', '💬', '🚇', '🎯', '🌟', '💰', '📱'];

export default function TipsBlock({ tips }: TipsBlockProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {tips.map((tip, i) => (
        <div key={i} className="bg-blanc rounded-2xl border border-marron/10 p-4 flex items-start gap-3 hover:shadow-sm transition-shadow duration-200">
          <span className="text-xl flex-shrink-0 mt-0.5">{TIP_ICONS[i % TIP_ICONS.length]}</span>
          <p className="text-sm text-marron leading-relaxed">{tip}</p>
        </div>
      ))}
    </div>
  );
}
