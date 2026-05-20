'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';
import type { Lieu } from '@/types';

interface LieuxGridProps {
  lieux: Lieu[];
  onToggleSauvegarde?: (nom: string) => void;
  sauvegardes?: Set<string>;
}

const GRADIENTS = [
  'linear-gradient(135deg, #F9DE7640 0%, #F9DE7620 100%)',
  'linear-gradient(135deg, #75BBE840 0%, #75BBE820 100%)',
  'linear-gradient(135deg, #A4A85A30 0%, #A4A85A15 100%)',
  'linear-gradient(135deg, #F4483920 0%, #F4483910 100%)',
  'linear-gradient(135deg, #F9DE7630 0%, #75BBE820 100%)',
];

function getCityIcon(name: string): string {
  const l = name.toLowerCase();
  if (l.includes('musée') || l.includes('museum') || l.includes('rijks')) return '🏛️';
  if (l.includes('marché') || l.includes('market')) return '🛒';
  if (l.includes('parc') || l.includes('jardin') || l.includes('park')) return '🌿';
  if (l.includes('église') || l.includes('cathédrale') || l.includes('basilique')) return '⛪';
  if (l.includes('canal') || l.includes('pont')) return '🌉';
  if (l.includes('plage') || l.includes('beach')) return '🏖️';
  return '📍';
}

export default function LieuxGrid({ lieux, onToggleSauvegarde, sauvegardes = new Set() }: LieuxGridProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lieux.map((lieu, idx) => {
        const isSaved = sauvegardes.has(lieu.nom);
        const isExpanded = expanded === lieu.nom;

        return (
          <div key={lieu.nom} className="group bg-blanc rounded-2xl border border-marron/10 overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <div className="h-40 relative flex items-center justify-center" style={{ background: GRADIENTS[idx % GRADIENTS.length] }}>
              <span className="text-4xl opacity-80">{getCityIcon(lieu.nom)}</span>
              <button
                onClick={() => onToggleSauvegarde?.(lieu.nom)}
                className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                  isSaved ? 'bg-rouge text-blanc scale-110' : 'bg-blanc/90 text-marron/40 hover:text-rouge hover:scale-110'
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-display text-lg text-marron leading-tight">{lieu.nom}</h3>
                <Badge variant="default">{lieu.duree_visite}</Badge>
              </div>
              <p className="text-sm text-marron/60 mb-3 leading-relaxed">{lieu.description_courte}</p>
              <div className="flex items-center gap-3 text-xs text-marron/50 mb-3">
                {lieu.prix_entree && <span>💶 {lieu.prix_entree}</span>}
                {lieu.horaires && <span className="truncate">🕐 {lieu.horaires}</span>}
              </div>
              <div className="bg-jaune/30 rounded-xl p-3 mb-3">
                <p className="text-xs text-marron font-medium leading-relaxed">✦ {lieu.pourquoi_ce_profil}</p>
              </div>
              <button onClick={() => setExpanded(isExpanded ? null : lieu.nom)} className="flex items-center gap-1.5 text-xs text-marron/50 hover:text-marron transition-colors">
                <span>💡</span>
                <span className="underline underline-offset-2">{isExpanded ? 'Masquer le tip local' : 'Voir le tip local'}</span>
              </button>
              {isExpanded && (
                <div className="mt-2 text-xs text-marron bg-bleu/10 rounded-lg p-3 leading-relaxed">{lieu.tip_local}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
