export interface ProfilVoyageur {
  ville: string;
  typeVoyage: 'solo' | 'couple' | 'amis' | 'famille';
  duree: '1jour' | 'weekend' | 'semaine';
  heureArrivee: 'matin' | 'apres-midi' | 'soir';
  style: 'culturel' | 'gastronomique' | 'nature' | 'festif' | 'melange';
  budget: 'petit' | 'moyen' | 'confortable';
  contraintes: string[];
}

export interface Lieu {
  nom: string;
  description_courte: string;
  pourquoi_ce_profil: string;
  duree_visite: string;
  prix_entree: string;
  horaires: string;
  tip_local: string;
  sauvegarde?: boolean;
}

export interface Restaurant {
  nom: string;
  cuisine: string;
  budget_moyen: string;
  ambiance: string;
  adresse: string;
  tip_reservation: string;
  sauvegarde?: boolean;
}

export interface EtapeItineraire {
  heure: string;
  lieu: string;
  duree: string;
  note: string;
}

export interface JourItineraire {
  jour: number;
  titre: string;
  etapes: EtapeItineraire[];
}

export interface ResultatCuration {
  incontournables: Lieu[];
  restaurants: Restaurant[];
  tips_locaux: string[];
  itineraire?: JourItineraire[];
}

export interface QuestionOption {
  value: string;
  label: string;
  icon: string;
  description: string;
}

export interface Question {
  id: keyof ProfilVoyageur | 'contraintes';
  question: string;
  subtitle?: string;
  multiSelect?: boolean;
  options: QuestionOption[];
}
