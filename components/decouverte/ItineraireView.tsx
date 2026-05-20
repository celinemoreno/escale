import type { JourItineraire } from '@/types';

interface ItineraireViewProps {
  jours: JourItineraire[];
}

export default function ItineraireView({ jours }: ItineraireViewProps) {
  return (
    <div className="space-y-8">
      {jours.map((jour) => (
        <div key={jour.jour}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-marron text-blanc text-sm font-medium flex-shrink-0">
              {jour.jour}
            </div>
            <h3 className="font-display text-xl text-marron">{jour.titre}</h3>
          </div>
          <div className="relative pl-10">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-marron/15" />
            <div className="space-y-3">
              {jour.etapes.map((etape, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-6 top-3 h-2 w-2 rounded-full bg-rouge border-2 border-blanc" />
                  <div className="bg-blanc rounded-xl border border-marron/10 p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-right min-w-[52px] flex-shrink-0">
                        <span className="text-sm font-medium text-marron">{etape.heure}</span>
                        <div className="text-xs text-marron/50">{etape.duree}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-marron text-sm">{etape.lieu}</div>
                        {etape.note && <p className="text-xs text-marron/60 mt-1 leading-relaxed">{etape.note}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
