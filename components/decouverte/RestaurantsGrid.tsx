'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';
import type { Restaurant } from '@/types';

interface RestaurantsGridProps {
  restaurants: Restaurant[];
  onToggleSauvegarde?: (nom: string) => void;
  sauvegardes?: Set<string>;
}

export default function RestaurantsGrid({
  restaurants,
  onToggleSauvegarde,
  sauvegardes = new Set(),
}: RestaurantsGridProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {restaurants.map((resto) => {
        const isSaved = sauvegardes.has(resto.nom);
        const isExpanded = expanded === resto.nom;

        return (
          <div
            key={resto.nom}
            className="bg-white rounded-2xl border border-pierre/60 p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg text-encre leading-tight mb-1">
                  {resto.nom}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="accent">{resto.cuisine}</Badge>
                  <Badge variant="pierre">{resto.budget_moyen}</Badge>
                </div>
              </div>

              <button
                onClick={() => onToggleSauvegarde?.(resto.nom)}
                className={`ml-3 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  isSaved
                    ? 'bg-accent text-white scale-110'
                    : 'bg-pierre-light text-encre-muted hover:text-accent hover:scale-110'
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-encre-muted mb-3 leading-relaxed">{resto.ambiance}</p>

            {resto.adresse && (
              <p className="text-xs text-encre-muted flex items-center gap-1.5 mb-3">
                <span>📍</span> {resto.adresse}
              </p>
            )}

            <button
              onClick={() => setExpanded(isExpanded ? null : resto.nom)}
              className="flex items-center gap-1.5 text-xs text-encre-muted hover:text-encre transition-colors"
            >
              <span>💡</span>
              <span className="underline underline-offset-2">
                {isExpanded ? 'Masquer' : 'Astuce réservation'}
              </span>
            </button>

            {isExpanded && (
              <div className="mt-2 text-xs text-encre bg-pierre-light rounded-lg p-3 leading-relaxed">
                {resto.tip_reservation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
