import { NextRequest, NextResponse } from 'next/server';
import { curerVoyage } from '@/lib/claude';
import type { ProfilVoyageur } from '@/types';

const VILLES_AUTORISEES = ['amsterdam', 'barcelone', 'lisbonne', 'prague', 'rome'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profil = body.profil as ProfilVoyageur;

    if (!profil || !profil.ville) {
      return NextResponse.json({ error: 'Profil manquant' }, { status: 400 });
    }

    if (!VILLES_AUTORISEES.includes(profil.ville.toLowerCase())) {
      return NextResponse.json(
        { error: 'Ville non disponible. Villes acceptées : ' + VILLES_AUTORISEES.join(', ') },
        { status: 400 }
      );
    }

    const resultat = await curerVoyage(profil);

    return NextResponse.json(resultat);
  } catch (error) {
    console.error('[API /curation] Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération des recommandations' },
      { status: 500 }
    );
  }
}
