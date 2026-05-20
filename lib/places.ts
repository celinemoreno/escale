// Google Places API — enrichissement des lieux avec photos et notes
// Utilisé en Phase 1 (pas dans le MVP v0)

const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

export interface PlaceDetails {
  place_id: string;
  nom: string;
  photo_url?: string;
  note?: number;
  nb_avis?: number;
  adresse?: string;
  site_web?: string;
  telephone?: string;
}

export async function rechercherLieu(
  nom: string,
  ville: string
): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_PLACES_API_KEY manquante');

  const query = encodeURIComponent(`${nom} ${ville}`);
  const searchUrl = `${PLACES_API_BASE}/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name,photos,rating,user_ratings_total,formatted_address&key=${apiKey}`;

  const res = await fetch(searchUrl);
  if (!res.ok) return null;

  const data = await res.json();
  const candidate = data.candidates?.[0];
  if (!candidate) return null;

  let photo_url: string | undefined;
  if (candidate.photos?.[0]?.photo_reference) {
    photo_url = `${PLACES_API_BASE}/photo?maxwidth=800&photoreference=${candidate.photos[0].photo_reference}&key=${apiKey}`;
  }

  return {
    place_id: candidate.place_id,
    nom: candidate.name,
    photo_url,
    note: candidate.rating,
    nb_avis: candidate.user_ratings_total,
    adresse: candidate.formatted_address,
  };
}

export function buildGoogleMapsUrl(lieux: string[], ville: string): string {
  const encoded = lieux.map(l => encodeURIComponent(`${l}, ${ville}`)).join('/');
  return `https://www.google.com/maps/dir/${encoded}`;
}
