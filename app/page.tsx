'use client';

import { useRouter } from 'next/navigation';

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
    bg: 'bg-rougebordeaux',
    text: 'text-bleuciel',
  },
  {
    num: '03',
    titre: 'Votre starter pack',
    detail: 'Lieux, restaurants, tips locaux, itinéraire. Prêt à partir en Nouvelle-Aquitaine.',
    bg: 'bg-beigesable',
    text: 'text-bleuinuit',
  },
];

const TICKER = 'Nouvelle-Aquitaine · Bordeaux · Biarritz · Sarlat-la-Canéda · La Rochelle · Angoulême · Limoges · Dax · Niort · Poitiers · Agen · Aubusson · Brive-la-Gaillarde · ';

export default function LandingPage() {
  const router = useRouter();

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/14466528/pexels-photo-14466528.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1200&fit=crop"
            alt="Village de Rocamadour"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(1px) brightness(0.82)' }}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{ background: 'linear-gradient(to top, rgba(15,65,74,0.88) 0%, rgba(15,65,74,0.2) 55%, transparent 100%)' }}
          />

          <div className="relative z-[2] h-full flex flex-col justify-between p-7 sm:p-12">

            {/* Badge */}
            <div
              className="self-start inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
              style={{ background: 'rgba(216,186,152,0.18)', border: '1px solid rgba(216,186,152,0.35)', color: '#d8ba98' }}
            >
              <span>🌿</span>
              <span>12 destinations · Nouvelle-Aquitaine</span>
            </div>

            {/* Bas du hero */}
            <div className="max-w-2xl">
              <h1 className="font-display font-black text-cremeivoire text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-4">
                La plus belle destination du monde est à 2h de chez vous.
              </h1>
              <p className="text-cremeivoire/70 text-base sm:text-lg mb-8 leading-relaxed font-body max-w-lg">
                On cure le meilleur de la Nouvelle-Aquitaine selon votre profil. Comme un ami bien renseigné, en 2 minutes.
              </p>

              {/* 2 CTAs côte à côte */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <button
                  onClick={() => router.push('/decouverte')}
                  className="flex-1 px-6 py-3.5 rounded-full bg-beigesable text-bleuinuit text-sm font-semibold hover:brightness-105 active:scale-95 transition-all text-center"
                >
                  Je sais où je vais →
                </button>
                <button
                  disabled
                  title="Bientôt disponible"
                  className="flex-1 px-6 py-3.5 rounded-full text-sm font-medium cursor-not-allowed text-center flex items-center justify-center gap-2"
                  style={{ border: '1px solid rgba(239,232,223,0.2)', color: 'rgba(239,232,223,0.35)' }}
                >
                  <span>Quelle destination me correspondrait ?</span>
                  <span className="text-xs opacity-60 shrink-0">Bientôt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-right text-[10px] text-bleuinuit/30 mt-1.5 pr-2">
          Photo : Rocamadour, Lot · Pexels
        </p>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-bleuinuit mb-3">
            Comment ça marche ?
          </h2>
          <p className="text-bleuinuit/50 font-body">De zéro à votre itinéraire en 3 étapes.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4">
          {ETAPES.map((e, i) => {
            const rotations = ['-rotate-2', 'rotate-1', '-rotate-1'];
            const translateY = ['sm:translate-y-3', 'sm:-translate-y-2', 'sm:translate-y-5'];
            return (
              <div
                key={e.num}
                className={`${e.bg} ${e.text} ${rotations[i]} ${translateY[i]} rounded-3xl p-7 w-full sm:w-72 flex-shrink-0 transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-10 cursor-default shadow-lg`}
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
      <div className="bg-bleuinuit py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-beigesable font-body text-sm tracking-wide px-6">{TICKER}</span>
          <span className="text-beigesable font-body text-sm tracking-wide px-6">{TICKER}</span>
        </div>
      </div>

      {/* ── SECTION CARTE POSTALE ── */}
      <section
        className="px-4 sm:px-8 py-16"
        style={{
          background: 'repeating-linear-gradient(-45deg, #efe8df 0px, #efe8df 18px, #96c0ce 18px, #96c0ce 22px)',
        }}
      >
        <div className="max-w-2xl mx-auto bg-white rounded-4xl shadow-xl p-10 sm:p-14">
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
      </section>

    </div>
  );
}
