'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PHOTOS = [
  { url: '/images/biarritz.jpg', credit: 'Biarritz' },
  { url: '/images/bordeaux.jpg', credit: 'Bordeaux' },
  { url: '/images/niort.jpg',    credit: 'Niort' },
  { url: '/images/domme.jpg',    credit: 'Domme · Dordogne' },
];

const CYCLING_PHRASES = [
  'votre week-end en amoureux',
  'vos vacances en famille',
  'votre virée improvisée entre amis',
];

const ETAPES = [
  {
    num: '01',
    titre: 'Votre profil en 2 min',
    detail: 'État d\'esprit, budget, rythme, envies. 11 questions pour cerner ce qui vous correspond vraiment.',
    bg: 'bg-bleuinuit',
    text: 'text-beigesable',
  },
  {
    num: '02',
    titre: 'La sélection IA',
    detail: 'Claude choisit les adresses vraiment faites pour vous — pas des listes Wikipedia.',
    bg: 'bg-bleuciel',
    text: 'text-bleuinuit',
  },
  {
    num: '03',
    titre: 'Votre starter pack',
    detail: 'Lieux, restaurants, tips locaux, itinéraire. Prêt à partir en Nouvelle-Aquitaine.',
    bg: 'bg-beigesable',
    text: 'text-bleuinuit',
  },
];

const TICKER = '— Préparez votre escapade parmi 12 villes de France : Angoulême, La Rochelle, Brive-la-Gaillarde, Aubusson, Niort, Sarlat-la-Canéda, Bordeaux, Limoges, Dax, Agen, Biarritz, Poitiers ';

export default function LandingPage() {
  const router = useRouter();

  // ── Slideshow ──
  const [currentPhoto, setCurrentPhoto] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCurrentPhoto(p => (p + 1) % PHOTOS.length), 8000);
    return () => clearInterval(id);
  }, []);

  // ── Typewriter ──
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const phrase = CYCLING_PHRASES[phraseIndex];
    if (typing) {
      if (displayed.length < phrase.length) {
        const t = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyping(false), 2000);
      return () => clearTimeout(t);
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 30);
        return () => clearTimeout(t);
      }
      setPhraseIndex(i => (i + 1) % CYCLING_PHRASES.length);
      setTyping(true);
    }
  }, [displayed, typing, phraseIndex]);

  return (
    <div className="min-h-screen bg-cremeivoire font-body">

      {/* ── NAVBAR ── */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 max-w-7xl mx-auto">
        <span className="font-display text-2xl font-bold text-bleuinuit">Escale</span>
        <div className="flex items-center gap-6">
          <span className="text-sm text-bleuinuit/50 hidden sm:block cursor-pointer hover:text-bleuinuit transition-colors">
            Comment ça marche
          </span>
          <button className="h-9 px-5 rounded-full border border-bleuinuit/20 text-sm text-bleuinuit hover:bg-bleuinuit/5 transition-colors font-medium">
            Connexion
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-4 sm:px-8 pb-8">
        <div
          className="grain relative w-full overflow-hidden rounded-4xl sm:rounded-5xl"
          style={{ height: 'clamp(480px, 78vh, 820px)' }}
        >
          {/* Slideshow photos */}
          {PHOTOS.map((photo, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={photo.url}
              src={photo.url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: idx === currentPhoto ? 1 : 0 }}
            />
          ))}

          {/* Overlay crème légère */}
          <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(239,232,223,0.62)' }} />

          {/* Crédit photo — bas droite */}
          <div className="absolute bottom-4 right-5 z-[3]">
            <span
              className="text-[10px] font-body px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(15,65,74,0.35)', color: '#efe8df' }}
            >
              {PHOTOS[currentPhoto].credit}
            </span>
          </div>

          {/* Contenu */}
          <div className="relative z-[2] h-full flex flex-col justify-end p-7 sm:p-12">
            <div className="max-w-3xl">
              <h1 className="font-display font-black text-rougebordeaux text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-5 max-w-2xl">
                La plus belle destination du monde est à 2h de chez vous.
              </h1>

              {/* Sous-titre avec typewriter */}
              <p className="text-base sm:text-lg mb-8 leading-relaxed font-body" style={{ color: 'rgba(127,3,3,0.8)' }}>
                Créez votre itinéraire idéal selon vos envies pour{' '}
                <span className="font-semibold">
                  {displayed}
                  <span className="cursor-blink inline-block w-[2px] h-[0.9em] bg-rougebordeaux ml-0.5 align-middle" />
                </span>
              </p>

              {/* 2 CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <button
                  onClick={() => router.push('/decouverte')}
                  className="flex-1 px-6 py-3.5 rounded-full bg-bleuinuit text-beigesable text-sm font-semibold hover:brightness-110 active:scale-95 transition-all text-center"
                >
                  Je sais où je vais →
                </button>
                <button
                  disabled
                  title="Bientôt disponible"
                  className="flex-1 px-6 py-3.5 rounded-full text-sm font-medium cursor-not-allowed text-center flex items-center justify-center gap-2"
                  style={{ border: '1px solid rgba(15,65,74,0.2)', color: 'rgba(15,65,74,0.3)' }}
                >
                  <span>Quelle destination me correspondrait ?</span>
                  <span className="text-xs opacity-60 shrink-0">Bientôt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-rougebordeaux mb-3">
            Prêt.e à partir ?
          </h2>
          <p className="text-rougebordeaux/60 font-body">Votre itinéraire sur mesure en 3 étapes.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4">
          {ETAPES.map((e, i) => {
            const rotations = ['-rotate-2', 'rotate-1', '-rotate-1'];
            const translateY = ['sm:translate-y-3', 'sm:-translate-y-2', 'sm:translate-y-5'];
            return (
              <div
                key={e.num}
                className={`${e.bg} ${e.text} ${rotations[i]} ${translateY[i]} rounded-3xl p-9 w-full sm:w-80 flex-shrink-0 transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-10 cursor-default shadow-lg`}
              >
                <div className="font-display text-5xl font-black mb-4 opacity-30">{e.num}</div>
                <h3 className="font-display font-bold text-xl mb-2">{e.titre}</h3>
                <p className="font-body text-sm leading-relaxed opacity-75">{e.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TICKER DÉFILANT ── */}
      <div className="bg-bleuinuit py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-display text-3xl font-bold text-beigesable px-8">{TICKER}</span>
          <span className="font-display text-3xl font-bold text-beigesable px-8">{TICKER}</span>
          <span className="font-display text-3xl font-bold text-beigesable px-8">{TICKER}</span>
          <span className="font-display text-3xl font-bold text-beigesable px-8">{TICKER}</span>
        </div>
      </div>

      {/* ── SECTION CARTE POSTALE ── */}
      <section
        className="p-4 sm:p-8"
        style={{
          background: 'repeating-linear-gradient(-45deg, #efe8df 0px, #efe8df 35px, #96c0ce 35px, #96c0ce 65px)',
        }}
      >
        <div className="w-full bg-white rounded-2xl p-10 sm:p-14">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-display text-2xl font-bold text-bleuinuit">Escale</span>
              <p className="text-bleuinuit/50 text-sm mt-1 font-body">L'ami bien renseigné pour la Nouvelle-Aquitaine</p>
            </div>

            {/* Newsletter */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-lg text-bleuinuit mb-1">Restez dans la boucle</h3>
              <p className="text-bleuinuit/55 text-sm mb-4 font-body">
                Nouvelles destinations, tips locaux, coulisses du projet.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 h-11 px-4 rounded-full border border-bleuinuit/20 text-sm text-bleuinuit placeholder:text-bleuinuit/30 focus:outline-none focus:border-bleuinuit/50 font-body"
                />
                <button className="h-11 px-5 rounded-full bg-rougebordeaux text-bleuciel text-sm font-semibold hover:brightness-110 active:scale-95 transition-all whitespace-nowrap">
                  S'inscrire
                </button>
              </div>
            </div>

            <hr className="border-bleuinuit/10 mb-8" />

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-bleuinuit/50 font-body mb-8">
              <a href="#" className="hover:text-bleuinuit transition-colors">Une suggestion ?</a>
              <a href="#" className="hover:text-bleuinuit transition-colors">Nous contacter</a>
              <a href="#" className="hover:text-bleuinuit transition-colors">Mentions légales</a>
            </div>

            <p className="text-center text-xs text-bleuinuit/30 font-body">
              © 2026 Escale — fait avec passion par Céline
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
