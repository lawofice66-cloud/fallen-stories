/**
 * Supabase Client & Configuration
 * Fallen Stories / Récits Inavouables
 */

import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = process.env.SUPABASE_URL || "https://znwcmypjlpgdsmpoaclc.supabase.co";
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_FYY7JDn0r8794PNvmkOagg_elygqqob";
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Tables identifiées dans la base Supabase
export const TABLES = {
  RECITS: 'recits',
  STORIES: 'stories',
  EPISODES: 'episodes',
  EBOOKS: 'ebooks',
  PUBLICATIONS: 'publications'
} as const;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
