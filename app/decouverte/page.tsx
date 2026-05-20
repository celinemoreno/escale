'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import QuestionnaireFlow from '@/components/questionnaire/QuestionnaireFlow';

const VILLES: Record<string, string> = {
  paris:     'Paris',
  lyon:      'Lyon',
  marseille: 'Marseille',
  bordeaux:  'Bordeaux',
  nice:      'Nice',
};

function QuestionnaireWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const villeParam = searchParams.get('ville')?.toLowerCase() ?? '';

  if (!villeParam || !VILLES[villeParam]) {
    return (
      <div className="min-h-screen bg-blanc flex flex-col items-center justify-center text-center px-6 font-body">
        <span className="text-5xl mb-6">🗺️</span>
        <h1 className="font-display font-bold text-2xl text-marron mb-3">Destination inconnue</h1>
        <p className="text-marron/60 mb-8">Villes disponibles : Paris, Lyon, Marseille, Bordeaux, Nice.</p>
        <button onClick={() => router.push('/')} className="text-rouge underline underline-offset-2 hover:opacity-75 transition-opacity">
          ← Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  return <QuestionnaireFlow ville={villeParam} villeLabel={VILLES[villeParam]} />;
}

export default function DecouvertePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-blanc flex items-center justify-center">
        <div className="h-6 w-6 rounded-full border-2 border-marron border-t-transparent animate-spin" />
      </div>
    }>
      <QuestionnaireWrapper />
    </Suspense>
  );
}
