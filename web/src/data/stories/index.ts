/**
 * RÉCITS INAVOUABLES - CATALOGUE DES HISTOIRES ET SAGAS EBOOKS
 */

import sakodoIndex from './sakodo-nuit-interdite/index.json';
import ep1 from './sakodo-nuit-interdite/episode-1.json';
import ep2 from './sakodo-nuit-interdite/episode-2.json';
import ep3 from './sakodo-nuit-interdite/episode-3.json';
import ep4 from './sakodo-nuit-interdite/episode-4.json';
import ep5 from './sakodo-nuit-interdite/episode-5.json';

export interface StoryEpisode {
  id: string;
  saga: string;
  episode: number;
  titre: string;
  categorie: string;
  preset: string;
  personnage: string;
  coverUrl: string;
  contenu: string;
  isEbook: boolean;
  wordCount?: number;
  isFree?: boolean;
  price?: number;
}

export interface SagaEbook {
  id: string;
  saga: string;
  titre: string;
  categorie: string;
  genre: string;
  personnage: string;
  author_name: string;
  preset: string;
  coverUrl: string;
  description: string;
  isEbook: boolean;
  badge: string;
  totalEpisodes: number;
  totalWordCount?: number;
  views: number;
  episodes: StoryEpisode[];
}

export const sakodoEpisodes: StoryEpisode[] = [
  { ...ep1, isFree: true, price: 0.00 },
  { ...ep2, isFree: false, price: 0.99 },
  { ...ep3, isFree: false, price: 0.99 },
  { ...ep4, isFree: false, price: 0.99 },
  { ...ep5, isFree: false, price: 0.99 },
];

export const sakodoSagaData: SagaEbook = {
  ...sakodoIndex,
  badge: "EBOOK 5 x 3000 mots",
  episodes: sakodoEpisodes,
};

// Liste de toutes les histoires et sagas disponibles
export const ALL_STORIES: SagaEbook[] = [
  sakodoSagaData,
];

// Helper : récupérer une saga par son identifiant
export function getSagaById(id: string): SagaEbook | undefined {
  return ALL_STORIES.find((s) => s.id === id || s.saga.toLowerCase() === id.toLowerCase());
}

// Helper : récupérer un épisode par ID
export function getEpisodeById(episodeId: string): StoryEpisode | undefined {
  for (const saga of ALL_STORIES) {
    const found = saga.episodes.find((ep) => ep.id === episodeId);
    if (found) return found;
  }
  return undefined;
}

// Helper : navigation suivant / précédent pour ebooks
export function getAdjacentEpisodes(currentEpisodeId: string) {
  for (const saga of ALL_STORIES) {
    const index = saga.episodes.findIndex((ep) => ep.id === currentEpisodeId);
    if (index !== -1) {
      return {
        saga,
        current: saga.episodes[index],
        prev: index > 0 ? saga.episodes[index - 1] : null,
        next: index < saga.episodes.length - 1 ? saga.episodes[index + 1] : null,
        total: saga.episodes.length,
        currentIndex: index + 1,
      };
    }
  }
  return { saga: null, current: null, prev: null, next: null, total: 0, currentIndex: 0 };
}

export default ALL_STORIES;
