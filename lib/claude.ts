import Anthropic from '@anthropic-ai/sdk';
import {
  CURATION_SYSTEM_PROMPT,
  buildCurationMessage,
  ITINERAIRE_SYSTEM_PROMPT,
  buildItineraireMessage,
} from './prompts';
import type { ProfilVoyageur, ResultatCuration, JourItineraire } from '@/types';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function curerVoyage(profil: ProfilVoyageur): Promise<ResultatCuration> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: [
      {
        type: 'text',
        text: CURATION_SYSTEM_PROMPT,
        // Cache le system prompt — économise des tokens sur les appels répétés
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: buildCurationMessage(profil),
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error('Réponse Claude inattendue');
  }

  // Extrait le JSON même si Claude ajoute du texte autour
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Format JSON invalide dans la réponse Claude');
  }

  return JSON.parse(jsonMatch[0]) as ResultatCuration;
}

export async function genererItineraire(
  lieux: string[],
  profil: ProfilVoyageur
): Promise<JourItineraire[]> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: [
      {
        type: 'text',
        text: ITINERAIRE_SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: buildItineraireMessage(lieux, profil),
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Réponse Claude inattendue');

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Format JSON invalide');

  const parsed = JSON.parse(jsonMatch[0]) as { jours: JourItineraire[] };
  return parsed.jours;
}
