'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';
import type { Lieu } from '@/types';

interface LieuxGridProps {
  lieux: Lieu[];
  onToggleSauvegarde?: (nom: string) => void;
  sauvegardes?: Set<string>;
}

export default function LieuxGrid({ lieux, onToggleSauvegarde, sauvegardes = new Set() }: LieuxGridProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lieux.map((lieu) => {
        const isSaved = sauvegardes.has(lieu.nom);
        const isExpanded = expanded === lieu.nom;

        return (
          <div
            key={lieu.nom}
            className="group bg-white rounded-2xl border border-pierre/60 overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Placeholder image coloré par hash du nom */}
            <div
              className="h-40 bg-gradient-to-br from-pierre-light to-pierre flex items-center justify-center relative"
              style={{
                background: generateGradient(lieu.nom),
              }}
            >
              <span className="text-4xl opacity-80">{getCityIcon(lieu.nom)}</span>

              {/* Bouton sauvegarder */}
              <button
                onClick={() => onToggleSauvegarde?.(lieu.nom)}
                className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                  isSaved
                    ? 'bg-accent text-white scale-110'
                    : 'bg-white/90 text-encre-muted hover:text-accent hover:scale-110'
                }`}
                title={isSaved ? 'Retirer des favoris' : 'Sauvegarder'}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-display text-lg text-encre leading-tight">{lieu.nom}</h3>
                <Badge variant="pierre">{lieu.duree_visite}</Badge>
              </div>

              <p className="text-sm text-encre-muted mb-3 leading-relaxed">
                {lieu.description_courte}
              </p>

              <div className="flex items-center gap-3 text-xs text-encre-muted mb-3">
                {lieu.prix_entree && (
                  <span className="flex items-center gap-1">
                    <span>💶</span> {lieu.prix_entree}
                  </span>
                )}
                {lieu.horaires && (
                  <span className="flex items-center gap-1 truncate">
                    <span>🕐</span>
                    <span className="truncate">{lieu.horaires}</span>
                  </span>
                )}
              </div>

              {/* Pourquoi ce profil */}
              <div className="bg-accent-light rounded-xl p-3 mb-3">
                <p className="text-xs text-accent font-medium leading-relaxed">
                  ✦ {lieu.pourquoi_ce_profil}
                </p>
              </div>

              {/* Tip local — masqué/affiché */}
              <button
                onClick={() => setExpanded(isExpanded ? null : lieu.nom)}
                className="flex items-center gap-1.5 text-xs text-encre-muted hover:text-encre transition-colors"
              >
                <span>💡</span>
                <span className="underline underline-offset-2">
                  {isExpanded ? 'Masquer le tip local' : 'Voir le tip local'}
                </span>
              </button>

              {isExpanded && (
                <div className="mt-2 text-xs text-encre bg-pierre-light rounded-lg p-3 leading-relaxed">
                  {lieu.tip_local}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Génère un gradient cohérent à partir du nom du lieu
function generateGradient(name: string): string {
  const gradients = [
    'linear-gradient(135deg, #FEF0EA 0%, #F5EDE3 100%)',
    'linear-gradient(135deg, #EDE8E3 0%, #D6CEC5 100%)',
    'linear-gradient(135deg, #F0EDE8 0%, #E0D8CF 100%)',
    'linear-gradient(135deg, #FAFAF8 0%, #EDE8E3 100%)',
    'linear-gradient(135deg, #F5F0EC 0%, #E7E0D8 100%)',
  ];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

// Icône générique par contexte
function getCityIcon(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('musée') || lower.includes('museum') || lower.includes('rijks')) return '🏛️';
  if (lower.includes('marché') || lower.includes('market')) return '🛒';
  if (lower.includes('parc') || lower.includes('jardin') || lower.includes('park')) return '🌿';
  if (lower.includes('église') || lower.includes('cathédrale') || lower.includes('basilique')) return '⛪';
  if (lower.includes('canal') || lower.includes('pont')) return '🌉';
  if (lower.includes('plage') || lower.includes('beach')) return '🏖️';
  return '📍';
}
