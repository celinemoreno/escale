// YouTube Data API v3 — recherche de vidéos de voyage pour une ville
// Utilisé en Phase 1 (pas dans le MVP v0)

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface VideoYoutube {
  id: string;
  titre: string;
  miniature: string;
  chaine: string;
  vues: string;
  duree: string;
  url: string;
}

export async function rechercherVideosVoyage(ville: string): Promise<VideoYoutube[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error('YOUTUBE_API_KEY manquante');

  const query = encodeURIComponent(`${ville} voyage guide francais`);
  const url = `${YOUTUBE_API_BASE}/search?part=snippet&q=${query}&type=video&relevanceLanguage=fr&maxResults=8&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API erreur: ${res.status}`);

  const data = await res.json();

  return data.items.map((item: Record<string, unknown>) => {
    const snippet = item.snippet as Record<string, unknown>;
    const id = (item.id as Record<string, string>).videoId;
    const thumbnails = snippet.thumbnails as Record<string, Record<string, string>>;
    return {
      id,
      titre: snippet.title as string,
      miniature: thumbnails.medium?.url || thumbnails.default?.url || '',
      chaine: snippet.channelTitle as string,
      vues: '',
      duree: '',
      url: `https://www.youtube.com/watch?v=${id}`,
    };
  });
}
