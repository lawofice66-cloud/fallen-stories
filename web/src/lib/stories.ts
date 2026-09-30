/**
 * Utilitaires de chargement des récits et sagas
 */
import { ALL_STORIES, sakodoSagaData, sakodoEpisodes, SagaEbook, StoryEpisode } from '../data/stories';

export function getStories(): SagaEbook[] {
  return ALL_STORIES;
}

export function loadStories(): SagaEbook[] {
  return ALL_STORIES;
}

export function getAllStories(): SagaEbook[] {
  return ALL_STORIES;
}

export function getStoryBySlug(slug: string): SagaEbook | undefined {
  return ALL_STORIES.find(
    (s) => s.id === slug || (s as any).slug === slug || s.saga.toLowerCase().includes(slug.toLowerCase())
  );
}

export function getEpisodesForStory(storyId: string): StoryEpisode[] {
  const story = getStoryBySlug(storyId);
  return story ? story.episodes : (storyId.includes('sakodo') ? sakodoEpisodes : []);
}

export default {
  getStories,
  loadStories,
  getAllStories,
  getStoryBySlug,
  getEpisodesForStory,
};
