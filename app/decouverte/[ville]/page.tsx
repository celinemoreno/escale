'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import LieuxGrid from '@/components/decouverte/LieuxGrid';
import RestaurantsGrid from '@/components/decouverte/RestaurantsGrid';
import TipsBlock from '@/components/decouverte/TipsBlock';
import ItineraireView from '@/components/decouverte/ItineraireView';
import Button from '@/components/ui/Button';
import type { ResultatCuration, ProfilVoyageur } from '@/types';
import { buildGoogleMapsUrl } from '@/lib/places';

const VILLES_LABELS: Record<string, string> = {
  amsterdam: 'Amsterdam',
  barcelone: 'Barcelone',
  lisbonne: 'Lisbonne',
  prague: 'Prague',
  rome: 'Rome',
};

const SECTIONS = [
  { id: 'incontournables', label: 'Incontournables', icon: '📍' },
  { id: 'restaurants', label: 'Restaurants', icon: '🍽️' },
  { id: 'tips', label: 'Tips locaux', icon: '💡' },
  { id: 'itineraire', label: 'Itinéraire', icon: '🗓️' },
];

export default function ResultatsPage() {
  const params = useParams();
  const router = useRouter();
  const ville = (params.ville as string).toLowerCase();
  const villeLabel = VILLES_LABELS[ville] ?? ville;

  const [resultat, setResultat] = useState<ResultatCuration | null>(null);
  const [profil, setProfil] = useState<ProfilVoyageur | null>(null);
  const [sauvegardes, setSauvegardes] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState('incontournables');
  const [generateItineraire, setGenerateItineraire] = useState(false);
  const [loadingItineraire, setLoadingItineraire] = useState(false);

  useEffect(() => {
    const storedResultat = sessionStorage.getItem(`resultat_${ville}`);
    const storedProfil = sessionStorage.getItem(`profil_${ville}`);

    if (storedResultat) {
      setResultat(JSON.parse(storedResultat));
    }
    if (storedProfil) {
      setProfil(JSON.parse(storedProfil));
    }

    // Restaure les sauvegardes depuis localStorage
    const stored = localStorage.getItem(`sauvegardes_${ville}`);
    if (stored) setSauvegardes(new Set(JSON.parse(stored)));
  }, [ville]);

  const handleToggleSauvegarde = (nom: string) => {
    setSauvegardes((prev) => {
      const next = new Set(prev);
      if (next.has(nom)) next.delete(nom);
      else next.add(nom);
      localStorage.setItem(`sauvegardes_${ville}`, JSON.stringify([...next]));
      return next;
    });
  };

  const handleGenererItineraire = async () => {
    if (!resultat || !profil) return;
    setLoadingItineraire(true);
    try {
      const lieuxSauvegardes = resultat.incontournables
        .filter((l) => sauvegardes.has(l.nom))
        .map((l) => l.nom);

      const lieux =
        lieuxSauvegardes.length > 0
          ? lieuxSauvegardes
          : resultat.incontournables.slice(0, 6).map((l) => l.nom);

      const res = await fetch('/api/itineraire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lieux, profil }),
      });

      if (!res.ok) throw new Error('Erreur');
      const data = await res.json();

      const updated = { ...resultat, itineraire: data.jours };
      setResultat(updated);
      sessionStorage.setItem(`resultat_${ville}`, JSON.stringify(updated));
      setGenerateItineraire(true);
      setActiveSection('itineraire');
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingItineraire(false);
    }
  };

  const handleExportMaps = () => {
    if (!resultat) return;
    const lieux = [...sauvegardes].length > 0
      ? [...sauvegardes]
      : resultat.incontournables.slice(0, 5).map((l) => l.nom);
    const url = buildGoogleMapsUrl(lieux, villeLabel);
    window.open(url, '_blank');
  };

  if (!resultat) {
    return (
      <div className="min-h-screen bg-fond flex flex-col items-center justify-center text-center px-6">
        <span className="text-5xl mb-6">✈️</span>
        <h1 className="font-display text-2xl text-encre mb-3">Pas encore de résultats</h1>
        <p className="text-encre-muted mb-8">
          Complétez le questionnaire pour obtenir vos recommandations.
        </p>
        <Button onClick={() => router.push(`/decouverte?ville=${ville}`)}>
          Commencer →
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fond">
      {/* Header sticky */}
      <header className="sticky top-0 z-30 bg-fond/95 backdrop-blur-sm border-b border-pierre/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-xl text-encre">
              Escale
            </Link>
            <span className="text-encre-muted">·</span>
            <h1 className="font-display text-xl text-encre">{villeLabel}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/decouverte?ville=${ville}`)}
              className="text-sm text-encre-muted hover:text-encre transition-colors hidden sm:block"
            >
              Modifier mon profil
            </button>
            <Button variant="secondary" size="sm" onClick={handleExportMaps}>
              📍 Exporter Maps
            </Button>
          </div>
        </div>

        {/* Navigation sections */}
        <nav className="max-w-6xl mx-auto px-6 flex gap-1 pb-3 overflow-x-auto scrollbar-none">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-encre text-fond'
                  : 'text-encre-muted hover:text-encre hover:bg-pierre-light'
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
              {section.id === 'incontournables' && (
                <span className="ml-1 text-xs opacity-70">{resultat.incontournables.length}</span>
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Hero de la ville */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: VILLE_GRADIENTS[ville] ?? VILLE_GRADIENTS.default }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-encre/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-6xl mx-auto">
          <p className="text-fond/80 text-sm mb-2 font-body">
            {sauvegardes.size} lieu{sauvegardes.size > 1 ? 'x' : ''} sauvegardé{sauvegardes.size > 1 ? 's' : ''}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-fond">
            Votre {villeLabel}
          </h2>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">

        {/* Section incontournables */}
        <section id="incontournables">
          <SectionHeader
            title="Les incontournables"
            subtitle={`${resultat.incontournables.length} lieux curatés pour votre profil`}
            icon="📍"
          />
          <LieuxGrid
            lieux={resultat.incontournables}
            onToggleSauvegarde={handleToggleSauvegarde}
            sauvegardes={sauvegardes}
          />
        </section>

        {/* Section restaurants */}
        <section id="restaurants">
          <SectionHeader
            title="Où manger"
            subtitle={`${resultat.restaurants.length} restaurants sélectionnés`}
            icon="🍽️"
          />
          <RestaurantsGrid
            restaurants={resultat.restaurants}
            onToggleSauvegarde={handleToggleSauvegarde}
            sauvegardes={sauvegardes}
          />
        </section>

        {/* Section tips locaux */}
        <section id="tips">
          <SectionHeader
            title="Tips locaux"
            subtitle="Ce que les guides ne vous disent pas"
            icon="💡"
          />
          <TipsBlock tips={resultat.tips_locaux} />
        </section>

        {/* Section itinéraire */}
        <section id="itineraire">
          <SectionHeader
            title="Itinéraire suggéré"
            subtitle="Optimisé géographiquement selon vos favoris"
            icon="🗓️"
          />

          {resultat.itineraire ? (
            <ItineraireView jours={resultat.itineraire} />
          ) : (
            <div className="bg-white rounded-2xl border border-pierre/60 p-8 text-center">
              <span className="text-4xl mb-4 block">🗺️</span>
              <p className="text-encre-muted mb-2 text-sm">
                {sauvegardes.size > 0
                  ? `Générez un itinéraire à partir de vos ${sauvegardes.size} lieux sauvegardés`
                  : "Sauvegardez des lieux pour un itinéraire personnalisé, ou générez-en un maintenant"}
              </p>
              <p className="text-encre-muted/60 text-xs mb-6">
                Claude organisera vos lieux par journée en optimisant les trajets
              </p>
              <Button
                variant="primary"
                onClick={handleGenererItineraire}
                loading={loadingItineraire}
              >
                Générer mon itinéraire
              </Button>
            </div>
          )}
        </section>

        {/* Footer actions */}
        <div className="border-t border-pierre pt-12 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <p className="text-sm text-encre-muted">
            <span className="text-accent font-medium">{sauvegardes.size}</span> lieu{sauvegardes.size > 1 ? 'x' : ''} dans vos favoris
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={handleExportMaps}>
              📍 Exporter vers Maps
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push(`/decouverte?ville=${ville}`)}
            >
              Recommencer
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <h2 className="font-display text-2xl text-encre">{title}</h2>
      </div>
      <p className="text-sm text-encre-muted pl-7">{subtitle}</p>
    </div>
  );
}

const VILLE_GRADIENTS: Record<string, string> = {
  amsterdam: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #D9541E 100%)',
  barcelone: 'linear-gradient(135deg, #F093FB 0%, #F5576C 50%, #FDB99B 100%)',
  lisbonne: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 50%, #43E97B 100%)',
  prague: 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
  rome: 'linear-gradient(135deg, #F6D365 0%, #FDA085 50%, #D9541E 100%)',
  default: 'linear-gradient(135deg, #E7E0D8 0%, #F5F0EC 100%)',
};
