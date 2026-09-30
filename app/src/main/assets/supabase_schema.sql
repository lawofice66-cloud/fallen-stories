-- ====================================================================
-- RÉCITS INAVOUABLES - SCHEMA SUPABASE
-- URL: https://znwcmypjlpgdsmpoaclc.supabase.co
-- Copiez et collez ce script dans l'éditeur SQL de votre tableau de bord Supabase :
-- Dashboard Supabase -> SQL Editor -> New Query -> Run
-- ====================================================================

-- 1. Extension pour génération d'UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE PROFILES (Inscription réservée exclusivement aux créateurs)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    username TEXT,
    role TEXT DEFAULT 'creator',
    bio TEXT,
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLE STORIES (Genres : Cyberpunk, Dark Fantasy, Sci-Fi Thriller, Horreur / Occulte, Dystopie, Érotisme, Tabou)
CREATE TABLE IF NOT EXISTS public.stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    cover_url TEXT DEFAULT 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description TEXT NOT NULL,
    genre TEXT NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT DEFAULT 'Auteur Inavouable',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLE EPISODES
-- Règle : Épisode 1 gratuit (is_free = true), Épisode 2+ payant (0.99$ via NOWPayments)
CREATE TABLE IF NOT EXISTS public.episodes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
    episode_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_free BOOLEAN DEFAULT false NOT NULL,
    price NUMERIC(5,2) DEFAULT 0.99 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_story_episode UNIQUE (story_id, episode_number)
);

-- 5. POLITIQUES RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour tous les lecteurs (sans besoin d'inscription)
DROP POLICY IF EXISTS "Stories are viewable by everyone" ON public.stories;
CREATE POLICY "Stories are viewable by everyone" 
ON public.stories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Episodes are viewable by everyone" ON public.episodes;
CREATE POLICY "Episodes are viewable by everyone" 
ON public.episodes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

-- Insertion et modification par les créateurs authentifiés
DROP POLICY IF EXISTS "Creators can insert their stories" ON public.stories;
CREATE POLICY "Creators can insert their stories" 
ON public.stories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Creators can update their stories" ON public.stories;
CREATE POLICY "Creators can update their stories" 
ON public.stories FOR UPDATE USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Creators can insert episodes" ON public.episodes;
CREATE POLICY "Creators can insert episodes" 
ON public.episodes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Creators can manage profile" ON public.profiles;
CREATE POLICY "Creators can manage profile" 
ON public.profiles FOR ALL USING (auth.uid() = id);

-- 6. Trigger pour créer automatiquement un profil de créateur lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_creator()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    'creator'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_creator();

-- REMARQUE : AUCUNE HISTOIRE FACTICE PAR DÉFAUT.
-- La plateforme est vierge. Seuls les créateurs inscrits peuvent soumettre leurs récits,
-- vérifiés manuellement par l'administrateur via le champ status ('pending' / 'approved').
