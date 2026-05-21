'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionnaireFlow from '@/components/questionnaire/QuestionnaireFlow';

const VILLES = [
  { slug: 'angouleme',    label: 'Angoulême',           emoji: '🏛️', dept: 'Charente' },
  { slug: 'la-rochelle',  label: 'La Rochelle',          emoji: '⚓',  dept: 'Charente-Maritime' },
  { slug: 'brive',        label: 'Brive-la-Gaillarde',   emoji: '🍖',  dept: 'Corrèze' },
  { slug: 'aubusson',     label: 'Aubusson',             emoji: '🧵',  dept: 'Creuse' },
  { slug: 'niort',        label: 'Niort',                emoji: '🦆',  dept: 'Deux-Sèvres' },
  { slug: 'sarlat',       label: 'Sarlat-la-Canéda',    emoji: '🏰',  dept: 'Dordogne' },
  { slug: 'bordeaux',     label: 'Bordeaux',             emoji: '🍷',  dept: 'Gironde' },
  { slug: 'limoges',      label: 'Limoges',              emoji: '🏺',  dept: 'Haute-Vienne' },
  { slug: 'dax',          label: 'Dax',                  emoji: '♨️',  dept: 'Landes' },
  { slug: 'agen',         label: 'Agen',                 emoji: '🌿',  dept: 'Lot-et-Garonne' },
  { slug: 'biarritz',     label: 'Biarritz',             emoji: '🏄',  dept: 'Pyrénées-Atlantiques' },
  { slug: 'poitiers',     label: 'Poitiers',             emoji: '🎡',  dept: 'Vienne' },
];

export default function DecouvertePage() {
  const router = useRouter();
  const [ville, setVille] = useState<{ slug: string; label: string } | null>(null);

  if (ville) {
    return <QuestionnaireFlow ville={ville.slug} villeLabel={ville.label} />;
  }

  return (
    <div className="min-h-screen bg-cremeivoire font-body">
      <header className="flex items-center justify-between px-6 py-5 border-b border-bleuinuit/10">
        <button
          onClick={() => router.push('/')}
          className="font-display text-xl text-bleuinuit hover:opacity-70 transition-opacity"
        >
          ← Escale
        </button>
        <span className="text-sm text-bleuinuit/50">Étape 1 sur 11</span>
      </header>

      <div className="h-0.5 bg-bleuinuit/10">
        <div className="h-full bg-rougebordeaux transition-all duration-500" style={{ width: '9%' }} />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-display font-bold text-3xl text-bleuinuit mb-2">
          Où souhaitez-vous aller ?
        </h1>
        <p className="text-bleuinuit/55 mb-8 font-body">12 destinations en Nouvelle-Aquitaine</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VILLES.map(v => (
            <button
              key={v.slug}
              onClick={() => setVille({ slug: v.slug, label: v.label })}
              className="flex flex-col items-start p-4 rounded-2xl border border-bleuinuit/15 hover:border-rougebordeaux/40 hover:bg-bleuinuit/5 transition-all text-left group"
            >
              <span className="text-2xl mb-2">{v.emoji}</span>
              <span className="font-display font-semibold text-bleuinuit text-sm group-hover:text-rougebordeaux transition-colors">
                {v.label}
              </span>
              <span className="text-bleuinuit/40 text-xs mt-0.5">{v.dept}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
