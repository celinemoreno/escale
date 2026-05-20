'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const VILLES = [
  { slug: 'paris',     label: 'Paris',     emoji: '🗼' },
  { slug: 'lyon',      label: 'Lyon',      emoji: '🦁' },
  { slug: 'marseille', label: 'Marseille', emoji: '⚓' },
  { slug: 'bordeaux',  label: 'Bordeaux',  emoji: '🍷' },
  { slug: 'nice',      label: 'Nice',      emoji: '🌊' },
];

const ETAPES = [
  {
    num: '01',
    titre: 'Ton profil en 2 min',
    detail: 'Style, budget, durée, heure d\'arrivée. 6 questions, pas de formulaire barbant.',
    bg: 'bg-marron',
    text: 'text-blanc',
  },
  {
    num: '02',
    titre: 'L\'IA curation',
    detail: 'Claude sélectionne les adresses vraiment faites pour toi — pas des listes Wikipedia.',
    bg: 'bg-rouge',
    text: 'text-blanc',
  },
  {
    num: '03',
    titre: 'Ton starter pack',
    detail: 'Lieux, restaurants, tips de locaux, itinéraire optimisé. Prêt à partir.',
    bg: 'bg-jaune',
    text: 'text-marron',
  },
];

function normaliserVille(input: string): string | null {
  const map: Record<string, string> = {
    paris: 'paris', lyon: 'lyon',
    marseille: 'marseille', bordeaux: 'bordeaux',
    nice: 'nice',
  };
  return map[input.toLowerCase().trim()] ?? null;
}

export default function LandingPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const slug = normaliserVille(input);
    if (!slug) {
      setError('Disponible : Paris · Lyon · Marseille · Bordeaux · Nice');
      inputRef.current?.focus();
      return;
    }
    router.push(`/decouverte?ville=${slug}`);
  };

  return (
    <div className="min-h-screen bg-blanc font-body">

      {/* ── NAVBAR ── */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 max-w-7xl mx-auto">
        <span className="font-display text-2xl font-bold text-marron">Escale</span>
        <div className="flex items-center gap-6">
          <span className="text-sm text-marron/50 hidden sm:block cursor-pointer hover:text-marron transition-colors">
            Comment ça marche
          </span>
          <button className="h-9 px-5 rounded-full border border-marron/20 text-sm text-marron hover:bg-marron/5 transition-colors font-medium">
            Connexion
          </button>
        </div>
      </nav>

      {/* ── HERO — grande carte avec image, grain et blur ── */}
      <section className="px-4 sm:px-8 pb-8">
        <div
          className="grain relative w-full overflow-hidden rounded-4xl sm:rounded-5xl"
          style={{ height: 'clamp(480px, 78vh, 820px)' }}
        >
          {/* Image de fond — Rocamadour, Lot */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/14466528/pexels-photo-14466528.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1200&fit=crop"
            alt="Village de Rocamadour, France"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(1px) brightness(0.82)' }}
          />

          {/* Gradient sombre en bas pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-marron/80 via-marron/20 to-transparent z-[1]" />

          {/* Contenu */}
          <div className="relative z-[2] h-full flex flex-col justify-between p-7 sm:p-12">

            {/* Badge */}
            <div className="self-start inline-flex items-center gap-2 rounded-full bg-blanc/15 backdrop-blur-sm border border-blanc/20 px-4 py-1.5 text-xs text-blanc font-medium">
              <span>🇫🇷</span>
              <span>5 villes françaises disponibles</span>
            </div>

            {/* Bas du hero — titre + search */}
            <div className="max-w-2xl">
              <h1 className="font-display font-black text-blanc text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-4">
                La plus belle destination du monde est à 2h de chez toi.
              </h1>
              <p className="text-blanc/70 text-base sm:text-lg mb-7 leading-relaxed font-body max-w-lg">
                Paris, Lyon, Marseille — on cure le meilleur de chaque ville selon ton profil. Comme un local, en 30 secondes.
              </p>

              {/* Barre de recherche */}
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3 bg-blanc/15 backdrop-blur-md border border-blanc/25 rounded-full p-2 max-w-md">
                  <span className="pl-3 text-lg flex-shrink-0">✈️</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => { setInput(e.target.value); setError(''); }}
                    placeholder="Paris, Lyon, Nice…"
                    className="flex-1 bg-transparent text-blanc placeholder:text-blanc/50 text-sm focus:outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 h-10 px-5 rounded-full bg-blanc text-marron text-sm font-semibold hover:bg-jaune transition-colors active:scale-95"
                  >
                    Préparer →
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-jaune pl-4">{error}</p>
                )}
              </form>

              {/* Pills villes */}
              <div className="flex flex-wrap gap-2 mt-4">
                {VILLES.map(v => (
                  <button
                    key={v.slug}
                    onClick={() => router.push(`/decouverte?ville=${v.slug}`)}
                    className="flex items-center gap-1.5 rounded-full bg-blanc/12 backdrop-blur-sm border border-blanc/20 px-3 py-1 text-xs text-blanc hover:bg-blanc/25 transition-all"
                  >
                    <span>{v.emoji}</span>
                    <span>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Crédit photo discret */}
        <p className="text-right text-[10px] text-marron/30 mt-1.5 pr-2">
          Photo : Rocamadour, Lot — Pexels
        </p>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-marron mb-3">
            Comment ça marche ?
          </h2>
          <p className="text-marron/50 font-body">De zéro à ton itinéraire en 3 étapes.</p>
        </div>

        {/* 3 cartes légèrement inclinées */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4">
          {ETAPES.map((e, i) => {
            const rotations = ['-rotate-2', 'rotate-1', '-rotate-1'];
            const translateY = ['sm:translate-y-3', 'sm:-translate-y-2', 'sm:translate-y-5'];
            return (
              <div
                key={e.num}
                className={`${e.bg} ${e.text} ${rotations[i]} ${translateY[i]}
                  rounded-3xl p-7 w-full sm:w-72 flex-shrink-0
                  transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-10
                  cursor-default shadow-lg`}
              >
                <div className={`font-display text-5xl font-black mb-4 opacity-30`}>{e.num}</div>
                <h3 className="font-display font-bold text-xl mb-2">{e.titre}</h3>
                <p className={`font-body text-sm leading-relaxed opacity-75`}>{e.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-marron/10 px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-marron/40 font-body">
          <span className="font-display font-bold text-sm text-marron">Escale</span>
          <span>Paris · Lyon · Marseille · Bordeaux · Nice</span>
        </div>
      </footer>

    </div>
  );
}
