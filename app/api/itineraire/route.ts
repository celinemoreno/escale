import { NextRequest, NextResponse } from 'next/server';
import { genererItineraire } from '@/lib/claude';
import type { ProfilVoyageur } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lieux, profil } = body as { lieux: string[]; profil: ProfilVoyageur };

    if (!lieux?.length || !profil) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const jours = await genererItineraire(lieux, profil);
    return NextResponse.json({ jours });
  } catch (error) {
    console.error('[API /itineraire] Erreur:', error);
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 });
  }
}
