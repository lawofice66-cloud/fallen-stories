import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chargement automatique des variables d'environnement
function loadEnv() {
  const envPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'web/.env'),
    path.resolve(__dirname, '../.env')
  ];
  for (const ep of envPaths) {
    if (fs.existsSync(ep)) {
      const lines = fs.readFileSync(ep, 'utf8').split('\n');
      for (const line of lines) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let val = (match[2] || '').trim().replace(/^['"](.*)['"]$/, '$1');
          if (!process.env[key] && val) process.env[key] = val;
        }
      }
    }
  }
}
loadEnv();

const supabaseUrl = process.env.SUPABASE_URL || 'https://znwcmypjlpgdsmpoaclc.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_FYY7JDn0r8794PNvmkOagg_elygqqob';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔮 Connexion Supabase URL:', supabaseUrl);
console.log('🔑 Clé active:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SERVICE_ROLE_KEY' : 'ANON_KEY');

// Résolution du chemin des épisodes
const basePath = fs.existsSync('./src/data/stories/sakodo-nuit-interdite/episode-1.json')
  ? './src/data/stories/sakodo-nuit-interdite'
  : (fs.existsSync('./web/src/data/stories/sakodo-nuit-interdite/episode-1.json')
    ? './web/src/data/stories/sakodo-nuit-interdite'
    : path.resolve(__dirname, '../src/data/stories/sakodo-nuit-interdite'));

const ep1 = JSON.parse(fs.readFileSync(path.join(basePath, 'episode-1.json'), 'utf8'));
const ep2 = JSON.parse(fs.readFileSync(path.join(basePath, 'episode-2.json'), 'utf8'));
const ep3 = JSON.parse(fs.readFileSync(path.join(basePath, 'episode-3.json'), 'utf8'));
const ep4 = JSON.parse(fs.readFileSync(path.join(basePath, 'episode-4.json'), 'utf8'));
const ep5 = JSON.parse(fs.readFileSync(path.join(basePath, 'episode-5.json'), 'utf8'));

console.log('✓ 5 épisodes chargés avec succès (13 945 mots).');

// 1. Insertion demandée dans 'recits'
console.log('\n📡 Tentative d\'insertion dans la table "recits"...');
const recitPayload = {
  slug: 'sakodo-nuit-interdite',
  title: 'Sakodo - La Nuit Interdite',
  author: 'Sakodo',
  genre: 'Cyberpunk',
  description: 'Épisode 1 offert sans inscription. Épisodes suivants via crypto NOWPayments',
  total_words: 13945,
  episodes_count: 5,
  status: 'published',
  is_free_first_episode: true,
  episodes: [ep1, ep2, ep3, ep4, ep5]
};

const { data: dataRecits, error: errorRecits } = await supabase.from('recits').insert(recitPayload).select();
console.log('Résultat table recits:', dataRecits, errorRecits?.message || errorRecits || 'OK');

// 2. Insertion dans la table existante 'stories' & 'episodes'
console.log('\n📡 Tentative d\'insertion dans la table existante "stories"...');
const storyPayload = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  title: 'Sakodo - La Nuit Interdite',
  genre: 'Cyberpunk',
  cover_url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800',
  description: 'Dans la mégalopole cyberpunk de Neo-Kuro sous une pluie de néons écarlates, Sakodo franchit les frontières de l\'interdit lors d\'une nuit de vertige, de soie et de désirs inavouables. Ebook complet 5 chapitres.',
  author_name: 'Sakodo',
  views: 4250
};

const { data: dataStories, error: errorStories } = await supabase.from('stories').upsert(storyPayload).select();
console.log('Résultat table stories:', dataStories, errorStories?.message || errorStories || 'OK');

if (!errorStories) {
  console.log('📡 Insertion des 5 épisodes dans la table "episodes"...');
  const episodesList = [ep1, ep2, ep3, ep4, ep5].map((ep, idx) => ({
    story_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    episode_number: idx + 1,
    title: ep.titre || `Épisode ${idx + 1}`,
    content: ep.contenu || ep.content || '',
    is_free: idx === 0,
    price: idx === 0 ? 0.0 : 0.99
  }));
  const { data: dataEps, error: errorEps } = await supabase.from('episodes').upsert(episodesList).select();
  console.log('Résultat table episodes:', dataEps ? `${dataEps.length} épisodes enregistrés` : null, errorEps?.message || errorEps || 'OK');
}

console.log('\nSeed terminé.');
