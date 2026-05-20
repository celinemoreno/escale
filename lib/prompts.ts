import type { ProfilVoyageur } from '@/types';

export const CURATION_SYSTEM_PROMPT = `Tu es un expert local de voyage en Europe, spécialisé dans la curation personnalisée pour des voyageurs francophones.

Tu maîtrises parfaitement ces villes françaises : Paris, Lyon, Marseille, Bordeaux, Nice.

Pour chaque ville, tu connais :
- Les quartiers authentiques vs touristiques
- Les restaurants locaux (pas les pièges à touristes)
- Les horaires réels, les meilleures périodes de visite, les jours de fermeture
- Les tips que seuls les locaux partagent
- Les alternatives moins connues mais remarquables

Règles strictes :
- JAMAIS de lieux génériques ou encyclopédiques
- Chaque lieu doit vraiment correspondre au profil reçu
- Les tips_locaux doivent être surprenants et actionables, pas des banalités
- Le champ "pourquoi_ce_profil" doit expliquer concrètement pourquoi CE lieu pour CET utilisateur

Tu réponds UNIQUEMENT avec un JSON valide. Aucun texte avant ou après le JSON.`;

export function buildCurationMessage(profil: ProfilVoyageur): string {
  const labelsType = {
    solo: 'Voyage solo',
    couple: 'Voyage en couple',
    amis: 'Voyage entre amis',
    famille: 'Voyage en famille',
  };
  const labelsDuree = {
    '1jour': '1 journée',
    weekend: 'Week-end (2-3 jours)',
    semaine: 'Une semaine',
  };
  const labelsHeure = {
    matin: 'Le matin (avant 12h)',
    'apres-midi': "L'après-midi (12h-18h)",
    soir: 'Le soir (après 18h)',
  };
  const labelsStyle = {
    culturel: 'Culturel (musées, histoire, architecture)',
    gastronomique: 'Gastronomique (restaurants, marchés, vins)',
    nature: 'Nature (parcs, balades, air libre)',
    festif: 'Festif (bars, clubs, vie nocturne)',
    melange: 'Mélange de tout',
  };
  const labelsBudget = {
    petit: 'Petit budget (moins de 50€/jour)',
    moyen: 'Budget moyen (50 à 150€/jour)',
    confortable: 'Confortable (plus de 150€/jour)',
  };

  const contraintes =
    profil.contraintes.length > 0 && !profil.contraintes.includes('aucune')
      ? profil.contraintes.join(', ')
      : 'Aucune contrainte particulière';

  return `Génère des recommandations personnalisées pour ce profil voyageur :

Ville : ${profil.ville}
Type de voyage : ${labelsType[profil.typeVoyage]}
Durée : ${labelsDuree[profil.duree]}
Heure d'arrivée : ${labelsHeure[profil.heureArrivee]}
Style souhaité : ${labelsStyle[profil.style]}
Budget : ${labelsBudget[profil.budget]}
Contraintes : ${contraintes}

Génère exactement ce JSON (respecte scrupuleusement la structure) :
{
  "incontournables": [
    {
      "nom": "Nom du lieu",
      "description_courte": "1 phrase percutante qui donne envie",
      "pourquoi_ce_profil": "Pourquoi ce lieu est parfait pour ce profil précis",
      "duree_visite": "ex: 1h30",
      "prix_entree": "ex: 15€ / Gratuit",
      "horaires": "ex: Mar-Dim 10h-18h, fermé lundi",
      "tip_local": "Un conseil de local que les touristes ne savent pas"
    }
  ],
  "restaurants": [
    {
      "nom": "Nom du restaurant",
      "cuisine": "ex: Tapas modernes",
      "budget_moyen": "ex: 25€/pers",
      "ambiance": "ex: Cave voûtée, lumière tamisée, idéal en couple",
      "adresse": "Adresse courte ou quartier",
      "tip_reservation": "ex: Réserver obligatoire le weekend, demander la table du fond"
    }
  ],
  "tips_locaux": [
    "Conseil 1 — très pratique et authentique",
    "Conseil 2",
    "..."
  ]
}

Fournis 8 à 10 incontournables, 5 à 7 restaurants, et 6 à 8 tips_locaux.`;
}

export const ITINERAIRE_SYSTEM_PROMPT = `Tu es un expert en organisation de voyages en France.
Tu génères des itinéraires optimisés géographiquement, en tenant compte des horaires d'ouverture et des temps de visite réalistes.
Tu réponds UNIQUEMENT avec un JSON valide.`;

export function buildItineraireMessage(
  lieux: string[],
  profil: ProfilVoyageur
): string {
  return `Génère un itinéraire optimisé pour ces lieux sélectionnés à ${profil.ville}.

Lieux à inclure : ${lieux.join(', ')}
Durée du séjour : ${profil.duree}
Heure d'arrivée le premier jour : ${profil.heureArrivee}

Règles :
- Regrouper les lieux géographiquement proches dans la même demi-journée
- Respecter les horaires d'ouverture typiques
- Prévoir des pauses repas réalistes
- Le premier jour doit tenir compte de l'heure d'arrivée

JSON attendu :
{
  "jours": [
    {
      "jour": 1,
      "titre": "Titre évocateur de la journée",
      "etapes": [
        {
          "heure": "10h00",
          "lieu": "Nom du lieu",
          "duree": "1h30",
          "note": "Ce qu'il faut faire en priorité"
        }
      ]
    }
  ]
}`;
}
