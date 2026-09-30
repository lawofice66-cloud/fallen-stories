/**
 * Supabase Client & Table Configuration
 * Récits Inavouables / Fallen Stories
 */

export const SUPABASE_URL = process.env.SUPABASE_URL || "https://znwcmypjlpgdsmpoaclc.supabase.co";
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_FYY7JDn0r8794PNvmkOagg_elygqqob";
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Tables disponibles dans Supabase
export const SUPABASE_TABLES = {
  STORIES: "stories",
  EPISODES: "episodes",
  RECITS: "recits",
  EBOOKS: "ebooks",
  PROFILES: "profiles"
} as const;

export type SupabaseTable = typeof SUPABASE_TABLES[keyof typeof SUPABASE_TABLES];

export interface StoryRecord {
  id?: string;
  slug?: string;
  title: string;
  genre?: string;
  totalWords?: number;
  total_words?: number;
  episodes?: number;
  status?: string;
  cover?: string;
  cover_url?: string;
  content?: any;
  is_free_episode_1?: boolean;
  author_name?: string;
  description?: string;
  views?: number;
  created_at?: string;
}
