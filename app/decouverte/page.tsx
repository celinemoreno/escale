'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import QuestionnaireFlow from '@/components/questionnaire/QuestionnaireFlow';

const VILLES: Record<string, string> = {
  amsterdam: 'Amsterdam',
  barcelone: 'Barcelone',
  lisbonne: 'Lisbonne',
  prague: 'Prague',
  rome: 'Rome',
};

function QuestionnaireWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const villeParam = searchParams.get('ville')?.toLowerCase() ?? '';

  if (!villeParam || !VILLES[villeParam]) {
    return (
      <div className="min-h-screen bg-fond flex flex-col items-center justify-center text-center px-6">
        <span className="text-5xl mb-6">🗺️</span>
        <h1 className="font-display text-2xl text-encre mb-3">Destination inconnue</h1>
        <p className="text-encre-muted mb-8">
          Villes disponibles : Amsterdam, Barcelone, Lisbonne, Prague, Rome.
        </p>
        <button
          onClick={() => router.push('/')}
          className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors"
        >
          ← Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  return (
    <QuestionnaireFlow
      ville={villeParam}
      villeLabel={VILLES[villeParam]}
    />
  );
}

export default function DecouvertePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-fond flex items-center justify-center">
          <div className="h-6 w-6 rounded-full border-2 border-encre border-t-transparent animate-spin" />
        </div>
      }
    >
      <QuestionnaireWrapper />
    </Suspense>
  );
}
