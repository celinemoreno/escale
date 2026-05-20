'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import QuestionCard from './QuestionCard';
import Button from '@/components/ui/Button';
import type { ProfilVoyageur, Question } from '@/types';

const QUESTIONS: Question[] = [
  {
    id: 'typeVoyage',
    question: 'Vous partez comment ?',
    options: [
      { value: 'solo', label: 'Solo', icon: '🧳', description: 'Liberté totale' },
      { value: 'couple', label: 'En couple', icon: '❤️', description: 'En amoureux' },
      { value: 'amis', label: 'Entre amis', icon: '🥂', description: 'Bonne ambiance' },
      { value: 'famille', label: 'En famille', icon: '👨‍👩‍👧', description: 'Avec enfants' },
    ],
  },
  {
    id: 'duree',
    question: 'Combien de temps ?',
    options: [
      { value: '1jour', label: '1 journée', icon: '☀️', description: 'Sprint découverte' },
      { value: 'weekend', label: 'Week-end', icon: '📅', description: '2 à 3 jours' },
      { value: 'semaine', label: 'Une semaine', icon: '🗓️', description: '5 à 7 jours' },
    ],
  },
  {
    id: 'heureArrivee',
    question: 'Vous arrivez quand ?',
    subtitle: 'Le premier jour du séjour',
    options: [
      { value: 'matin', label: 'Le matin', icon: '🌅', description: 'Avant 12h' },
      { value: 'apres-midi', label: "L'après-midi", icon: '🌤️', description: 'Entre 12h et 18h' },
      { value: 'soir', label: 'Le soir', icon: '🌆', description: 'Après 18h' },
    ],
  },
  {
    id: 'style',
    question: 'Quel est votre style ?',
    options: [
      { value: 'culturel', label: 'Culturel', icon: '🏛️', description: 'Musées & architecture' },
      { value: 'gastronomique', label: 'Gastro', icon: '🍽️', description: 'Restaurants & marchés' },
      { value: 'nature', label: 'Nature', icon: '🌿', description: 'Parcs & balades' },
      { value: 'festif', label: 'Festif', icon: '🎉', description: 'Bars & vie nocturne' },
    ],
  },
  {
    id: 'budget',
    question: 'Votre budget par jour ?',
    options: [
      { value: 'petit', label: 'Petit budget', icon: '💶', description: 'Moins de 50€' },
      { value: 'moyen', label: 'Moyen', icon: '💳', description: '50 à 150€' },
      { value: 'confortable', label: 'Confortable', icon: '✨', description: 'Plus de 150€' },
    ],
  },
  {
    id: 'contraintes',
    question: 'Des contraintes ?',
    subtitle: 'Sélectionnez tout ce qui vous concerne',
    multiSelect: true,
    options: [
      { value: 'enfants', label: 'Avec enfants', icon: '🧒', description: 'Kids-friendly' },
      { value: 'mobilite', label: 'Mobilité réduite', icon: '♿', description: 'Accessibilité' },
      { value: 'vegetarien', label: 'Végétarien', icon: '🥗', description: 'Options végé' },
      { value: 'aucune', label: 'Aucune', icon: '✓', description: 'Tout me convient' },
    ],
  },
];

interface QuestionnaireFlowProps {
  ville: string;
  villeLabel: string;
}

type Direction = 1 | -1;

export default function QuestionnaireFlow({ ville, villeLabel }: QuestionnaireFlowProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reponses, setReponses] = useState<Partial<ProfilVoyageur>>({
    ville,
    contraintes: [],
  });

  const question = QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const progression = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const valeurActuelle = question.multiSelect
    ? (reponses.contraintes ?? [])
    : (reponses[question.id as keyof ProfilVoyageur] as string | undefined) ?? '';

  const handleSelect = useCallback(
    (value: string) => {
      if (question.multiSelect) {
        setReponses((prev) => {
          const current = prev.contraintes ?? [];
          // "Aucune" désélectionne tout le reste
          if (value === 'aucune') return { ...prev, contraintes: ['aucune'] };
          const sans_aucune = current.filter((v) => v !== 'aucune');
          const next = sans_aucune.includes(value)
            ? sans_aucune.filter((v) => v !== value)
            : [...sans_aucune, value];
          return { ...prev, contraintes: next };
        });
      } else {
        setReponses((prev) => ({
          ...prev,
          [question.id]: value,
        }));
        // Auto-avance sur les questions à sélection unique
        setTimeout(() => {
          if (!isLastQuestion) {
            setDirection(1);
            setCurrentIndex((i) => i + 1);
          }
        }, 220);
      }
    },
    [question, isLastQuestion]
  );

  const handlePrecedent = () => {
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
  };

  const handleSuivant = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const profil = reponses as ProfilVoyageur;
      const res = await fetch('/api/curation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profil }),
      });

      if (!res.ok) throw new Error('Erreur lors de la génération');

      const resultat = await res.json();
      sessionStorage.setItem(`resultat_${ville}`, JSON.stringify(resultat));
      sessionStorage.setItem(`profil_${ville}`, JSON.stringify(profil));

      router.push(`/decouverte/${ville}`);
    } catch {
      setError('Une erreur est survenue. Réessayez dans quelques secondes.');
      setLoading(false);
    }
  };

  const questionComplete = question.multiSelect
    ? (reponses.contraintes?.length ?? 0) > 0
    : !!(reponses[question.id as keyof ProfilVoyageur]);

  const variants = {
    enter: (dir: Direction) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: Direction) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-fond flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-pierre/40">
        <span className="font-display text-xl text-encre">Escale</span>
        <span className="text-sm text-encre-muted">
          {villeLabel} · {currentIndex + 1}/{QUESTIONS.length}
        </span>
      </header>

      {/* Barre de progression */}
      <div className="h-0.5 bg-pierre">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progression}%` }}
        />
      </div>

      {/* Zone question */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            <QuestionCard
              question={question.question}
              subtitle={question.subtitle}
              options={question.options}
              selected={valeurActuelle}
              multiSelect={question.multiSelect}
              onSelect={handleSelect}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 flex items-center justify-between max-w-2xl mx-auto w-full">
        <Button
          variant="ghost"
          onClick={handlePrecedent}
          disabled={currentIndex === 0 || loading}
          className={currentIndex === 0 ? 'invisible' : ''}
        >
          ← Précédent
        </Button>

        <div className="flex gap-1.5">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-6 bg-encre'
                  : i < currentIndex
                  ? 'w-1.5 bg-accent'
                  : 'w-1.5 bg-pierre'
              }`}
            />
          ))}
        </div>

        {(question.multiSelect || isLastQuestion) && (
          <Button
            variant="primary"
            onClick={handleSuivant}
            disabled={!questionComplete}
            loading={loading}
          >
            {isLastQuestion ? 'Découvrir →' : 'Suivant →'}
          </Button>
        )}
        {!question.multiSelect && !isLastQuestion && <div className="w-24" />}
      </div>

      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 text-sm shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}
