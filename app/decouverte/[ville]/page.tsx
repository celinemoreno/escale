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
  paris: 'Paris', lyon: 'Lyon', marseille: 'Marseille', bordeaux: 'Bordeaux', nice: 'Nice',
};

const VILLE_GRADIENTS: Record<string, string> = {
  paris:     'linear-gradient(135deg, #1F0C06 0%, #75BBE8 100%)',
  lyon:      'linear-gradient(135deg, #F44839 0%, #F9DE76 100%)',
  marseille: 'linear-gradient(135deg, #75BBE8 0%, #A4A85A 100%)',
  bordeaux:  'linear-gradient(135deg, #A4A85A 0%, #F44839 100%)',
  nice:      'linear-gradient(135deg, #75BBE8 0%, #F9DE76 100%)',
  default:   'linear-gradient(135deg, #F9DE76 0%, #75BBE8 100%)',
};

const SECTIONS = [
  { id: 'incontournables', label: 'Incontournables', icon: '📍' },
  { id: 'restaurants',     label: 'Restaurants',    icon: '🍽️' },
  { id: 'tips',            label: 'Tips locaux',    icon: '💡' },
  { id: 'itineraire',      label: 'Itinéraire',     icon: '🗓️' },
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
  const [loadingItineraire, setLoadingItineraire] = useState(false);

  useEffect(() => {
    const r = sessionStorage.getItem(`resultat_${ville}`);
    const p = sessionStorage.getItem(`profil_${ville}`);
    if (r) setResultat(JSON.parse(r));
    if (p) setProfil(JSON.parse(p));
    const s = localStorage.getItem(`sauvegardes_${ville}`);
    if (s) setSauvegardes(new Set(JSON.parse(s)));
  }, [ville]);

  const handleToggleSauvegarde = (nom: string) => {
    setSauvegardes(prev => {
      const next = new Set(prev);
      next.has(nom) ? next.delete(nom) : next.add(nom);
      localStorage.setItem(`sauvegardes_${ville}`, JSON.stringify([...next]));
      return next;
    });
  };

  const handleGenererItineraire = async () => {
    if (!resultat || !profil) return;
    setLoadingItineraire(true);
    try {
      const lieux = sauvegardes.size > 0
        ? [...sauvegardes]
        : resultat.incontournables.slice(0, 6).map(l => l.nom);
      const res = await fetch('/api/itineraire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lieux, profil }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const updated = { ...resultat, itineraire: data.jours };
      setResultat(updated);
      sessionStorage.setItem(`resultat_${ville}`, JSON.stringify(updated));
      setActiveSection('itineraire');
    } catch (e) { console.error(e); }
    finally { setLoadingItineraire(false); }
  };

  const handleExportMaps = () => {
    if (!resultat) return;
    const lieux = sauvegardes.size > 0
      ? [...sauvegardes]
      : resultat.incontournables.slice(0, 5).map(l => l.nom);
    window.open(buildGoogleMapsUrl(lieux, villeLabel), '_blank');
  };

  if (!resultat) {
    return (
      <div className="min-h-screen bg-blanc flex flex-col items-center justify-center text-center px-6 font-body">
        <span className="text-5xl mb-6">✈️</span>
        <h1 className="font-display font-bold text-2xl text-marron mb-3">Pas encore de résultats</h1>
        <p className="text-marron/60 mb-8">Complète le questionnaire pour obtenir tes recommandations.</p>
        <Button onClick={() => router.push(`/decouverte?ville=${ville}`)}>Commencer →</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blanc font-body">
      <header className="sticky top-0 z-30 bg-blanc/95 backdrop-blur-sm border-b border-marron/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display font-bold text-xl text-marron hover:text-rouge transition-colors">Escale</Link>
            <span className="text-marron/30">·</span>
            <h1 className="font-display font-bold text-xl text-marron">{villeLabel}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push(`/decouverte?ville=${ville}`)} className="text-sm text-marron/50 hover:text-marron transition-colors hidden sm:block">
              Modifier mon profil
            </button>
            <Button variant="secondary" size="sm" onClick={handleExportMaps}>📍 Exporter Maps</Button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-6 flex gap-1 pb-3 overflow-x-auto">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeSection === section.id ? 'bg-marron text-blanc' : 'text-marron/50 hover:text-marron hover:bg-marron/5'
              }`}
            >
              <span>{section.icon}</span><span>{section.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <div className="relative h-60 sm:h-72 overflow-hidden">
        <div className="absolute inset-0" style={{ background: VILLE_GRADIENTS[ville] ?? VILLE_GRADIENTS.default }} />
        <div className="absolute inset-0 bg-gradient-to-t from-marron/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-6xl mx-auto">
          <p className="text-blanc/70 text-sm mb-2">{sauvegardes.size} lieu{sauvegardes.size > 1 ? 'x' : ''} sauvegardé{sauvegardes.size > 1 ? 's' : ''}</p>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-blanc">Votre {villeLabel}</h2>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <section id="incontournables">
          <SectionHeader icon="📍" title="Les incontournables" subtitle={`${resultat.incontournables.length} lieux curatés pour ton profil`} />
          <LieuxGrid lieux={resultat.incontournables} onToggleSauvegarde={handleToggleSauvegarde} sauvegardes={sauvegardes} />
        </section>

        <section id="restaurants">
          <SectionHeader icon="🍽️" title="Où manger" subtitle={`${resultat.restaurants.length} restaurants sélectionnés`} />
          <RestaurantsGrid restaurants={resultat.restaurants} onToggleSauvegarde={handleToggleSauvegarde} sauvegardes={sauvegardes} />
        </section>

        <section id="tips">
          <SectionHeader icon="💡" title="Tips locaux" subtitle="Ce que les guides ne te disent pas" />
          <TipsBlock tips={resultat.tips_locaux} />
        </section>

        <section id="itineraire">
          <SectionHeader icon="🗓️" title="Itinéraire suggéré" subtitle="Optimisé géographiquement selon tes favoris" />
          {resultat.itineraire ? (
            <ItineraireView jours={resultat.itineraire} />
          ) : (
            <div className="bg-blanc rounded-2xl border border-marron/10 p-8 text-center">
              <span className="text-4xl mb-4 block">🗺️</span>
              <p className="text-marron/60 mb-2 text-sm">
                {sauvegardes.size > 0 ? `Génère un itinéraire à partir de tes ${sauvegardes.size} lieux sauvegardés` : 'Sauvegarde des lieux ou génère un itinéraire directement'}
              </p>
              <p className="text-marron/40 text-xs mb-6">Claude organisera tes lieux par journée en optimisant les trajets</p>
              <Button variant="primary" onClick={handleGenererItineraire} loading={loadingItineraire}>Générer mon itinéraire</Button>
            </div>
          )}
        </section>

        <div className="border-t border-marron/10 pt-12 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <p className="text-sm text-marron/50"><span className="text-rouge font-medium">{sauvegardes.size}</span> lieu{sauvegardes.size > 1 ? 'x' : ''} dans tes favoris</p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={handleExportMaps}>📍 Exporter vers Maps</Button>
            <Button variant="primary" onClick={() => router.push(`/decouverte?ville=${ville}`)}>Recommencer</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function SectionHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <h2 className="font-display font-bold text-2xl text-marron">{title}</h2>
      </div>
      <p className="text-sm text-marron/50 pl-7">{subtitle}</p>
    </div>
  );
}
