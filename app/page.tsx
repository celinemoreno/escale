'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const VILLES = [
  { slug: 'amsterdam', label: 'Amsterdam', emoji: '🚲', tag: 'Canaux & vélos' },
  { slug: 'barcelone', label: 'Barcelone', emoji: '🌞', tag: 'Architecture & plages' },
  { slug: 'lisbonne', label: 'Lisbonne', emoji: '🚋', tag: 'Tramways & azulejos' },
  { slug: 'prague', label: 'Prague', emoji: '🏰', tag: 'Architecture & bière' },
  { slug: 'rome', label: 'Rome', emoji: '🏛️', tag: 'Histoire & cuisine' },
];

const ETAPES = [
  {
    num: '01',
    titre: 'Renseignez votre profil',
    detail: '6 questions, 2 minutes. Style, budget, durée, contraintes.',
  },
  {
    num: '02',
    titre: 'Claude analyse & curation',
    detail: "Notre IA sélectionne les lieux vraiment adaptés à votre profil. Pas des listes génériques.",
  },
  {
    num: '03',
    titre: 'Votre starter pack est prêt',
    detail: 'Incontournables, restaurants, tips locaux, itinéraire optimisé.',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const slug = normaliserVille(input.trim());

    if (!slug) {
      setError('Villes disponibles : Amsterdam, Barcelone, Lisbonne, Prague, Rome');
      inputRef.current?.focus();
      return;
    }

    router.push(`/decouverte?ville=${slug}`);
  };

  const handleVilleClick = (slug: string) => {
    router.push(`/decouverte?ville=${slug}`);
  };

  return (
    <div className="min-h-screen bg-fond">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 max-w-7xl mx-auto">
        <span className="font-display text-2xl text-encre">Escale</span>
        <div className="flex items-center gap-6">
          <button className="text-sm text-encre-muted hover:text-encre transition-colors hidden sm:block">
            Comment ça marche
          </button>
          <Button variant="ghost" size="sm">
            Connexion
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 text-xs text-accent font-medium mb-8">
          <span>✦</span>
          <span>5 destinations européennes disponibles</span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-encre leading-[1.05] mb-6 max-w-3xl mx-auto">
          Votre prochain week-end,{' '}
          <em className="text-accent not-italic">sans les heures</em>{' '}
          de recherche.
        </h1>

        <p className="text-encre-muted text-lg sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
          Dites-nous où vous allez et votre profil. On génère votre
          starter&nbsp;pack voyage en 30&nbsp;secondes.
        </p>

        {/* Formulaire destination */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-encre-muted text-lg">
              ✈️
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              placeholder="Amsterdam, Rome, Barcelone…"
              className="w-full h-14 pl-12 pr-36 rounded-full border-2 border-pierre bg-white text-encre placeholder-encre-muted/60 text-base focus:outline-none focus:border-encre transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 rounded-full bg-encre text-fond text-sm font-medium hover:bg-encre/85 transition-colors active:scale-[0.97]"
            >
              Préparer →
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500 text-left pl-4">{error}</p>
          )}
        </form>

        {/* Pills des villes */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {VILLES.map((v) => (
            <button
              key={v.slug}
              onClick={() => handleVilleClick(v.slug)}
              className="group flex items-center gap-2 rounded-full border border-pierre bg-white px-4 py-2 text-sm text-encre hover:border-encre hover:shadow-sm transition-all duration-200"
            >
              <span>{v.emoji}</span>
              <span>{v.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Séparateur */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-pierre" />
      </div>

      {/* Comment ça marche */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl text-encre mb-3">
            Comment ça marche
          </h2>
          <p className="text-encre-muted">De zéro à votre itinéraire en 3 étapes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ETAPES.map((etape) => (
            <div key={etape.num} className="group">
              <div className="font-display text-5xl text-pierre mb-4 group-hover:text-accent transition-colors duration-300">
                {etape.num}
              </div>
              <h3 className="font-display text-xl text-encre mb-2">{etape.titre}</h3>
              <p className="text-sm text-encre-muted leading-relaxed">{etape.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Villes disponibles */}
      <section className="bg-pierre-light py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-encre mb-2">Destinations disponibles</h2>
            <p className="text-encre-muted text-sm">5 villes européennes, contenu expert curé par IA.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VILLES.map((v) => (
              <button
                key={v.slug}
                onClick={() => handleVilleClick(v.slug)}
                className="group bg-white rounded-2xl border border-pierre/60 p-6 text-center hover:border-encre hover:shadow-md transition-all duration-200 active:scale-[0.97]"
              >
                <span className="text-4xl block mb-3">{v.emoji}</span>
                <div className="font-display text-lg text-encre mb-1">{v.label}</div>
                <div className="text-xs text-encre-muted">{v.tag}</div>
                <div className="mt-4 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Préparer ce voyage →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-4xl sm:text-5xl text-encre mb-4 max-w-lg mx-auto leading-tight">
          Fini les 3h de recherche avant de partir.
        </h2>
        <p className="text-encre-muted mb-8 max-w-sm mx-auto">
          Commencez maintenant. Gratuit, sans inscription.
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            inputRef.current?.focus();
          }}
        >
          Préparer mon voyage →
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-pierre px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-encre-muted">
          <span className="font-display text-base text-encre">Escale</span>
          <span>MVP — Amsterdam · Barcelone · Lisbonne · Prague · Rome</span>
        </div>
      </footer>
    </div>
  );
}

function normaliserVille(input: string): string | null {
  const mapping: Record<string, string> = {
    amsterdam: 'amsterdam',
    barcelone: 'barcelone',
    barcelona: 'barcelone',
    lisbonne: 'lisbonne',
    lisbon: 'lisbonne',
    lisboa: 'lisbonne',
    prague: 'prague',
    praha: 'prague',
    rome: 'rome',
    roma: 'rome',
  };
  return mapping[input.toLowerCase()] ?? null;
}
