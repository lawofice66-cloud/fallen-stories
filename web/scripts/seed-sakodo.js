#!/usr/bin/env node
/**
 * SEED SAKODO - INGESTION DANS SUPABASE
 * Récits Inavouables / Fallen Stories
 * 5 épisodes = 13 945 mots
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Détection des clés depuis .env, wrangler.toml ou l'environnement
function loadEnv() {
  const envPaths = [
    path.resolve(__dirname, "../.env"),
    path.resolve(__dirname, "../../.env"),
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "web/.env")
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || "";
          value = value.trim().replace(/^['"](.*)['"]$/, "$1");
          if (!process.env[key] && value) {
            process.env[key] = value;
          }
        }
      });
    }
  }

  // Vérifier aussi wrangler.toml
  const wranglerPaths = [
    path.resolve(__dirname, "../wrangler.toml"),
    path.resolve(__dirname, "../../wrangler.toml"),
    path.resolve(process.cwd(), "wrangler.toml"),
    path.resolve(process.cwd(), "web/wrangler.toml")
  ];
  for (const wp of wranglerPaths) {
    if (fs.existsSync(wp)) {
      const txt = fs.readFileSync(wp, "utf-8");
      const urlMatch = txt.match(/SUPABASE_URL\s*=\s*["']([^"']+)["']/);
      const anonMatch = txt.match(/SUPABASE_ANON_KEY\s*=\s*["']([^"']+)["']/);
      const serviceMatch = txt.match(/SUPABASE_SERVICE_ROLE_KEY\s*=\s*["']([^"']+)["']/);
      if (urlMatch && !process.env.SUPABASE_URL) process.env.SUPABASE_URL = urlMatch[1];
      if (anonMatch && !process.env.SUPABASE_ANON_KEY) process.env.SUPABASE_ANON_KEY = anonMatch[1];
      if (serviceMatch && !process.env.SUPABASE_SERVICE_ROLE_KEY && serviceMatch[1]) {
        process.env.SUPABASE_SERVICE_ROLE_KEY = serviceMatch[1];
      }
    }
  }
}

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL || "https://znwcmypjlpgdsmpoaclc.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_FYY7JDn0r8794PNvmkOagg_elygqqob";
const API_KEY = (SERVICE_KEY && SERVICE_KEY.trim().length > 0) ? SERVICE_KEY : ANON_KEY;

console.log("==================================================");
console.log("🔮 SEED SAKODO - SUPABASE");
console.log("URL:", SUPABASE_URL);
console.log("Mode:", SERVICE_KEY ? "🔑 SERVICE_ROLE_KEY (droits admin complets, RLS bypass)" : "🛡️ ANON/PUBLISHABLE_KEY");
console.log("==================================================");

// 2. Lecture des 5 épisodes
const possibleStoriesDirs = [
  path.resolve(__dirname, "../src/data/stories/sakodo-nuit-interdite"),
  path.resolve(__dirname, "../web/src/data/stories/sakodo-nuit-interdite"),
  path.resolve(process.cwd(), "web/src/data/stories/sakodo-nuit-interdite"),
  path.resolve(process.cwd(), "src/data/stories/sakodo-nuit-interdite")
];
const storiesDir = possibleStoriesDirs.find(d => fs.existsSync(d)) || possibleStoriesDirs[0];
const episodeFiles = ["episode-1.json", "episode-2.json", "episode-3.json", "episode-4.json", "episode-5.json"];

let totalWords = 0;
const episodesData = [];

for (let i = 0; i < episodeFiles.length; i++) {
  const filePath = path.join(storiesDir, episodeFiles[i]);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Fichier introuvable : ${filePath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw);
  const textContent = parsed.contenu || parsed.content || "";
  const words = parsed.wordCount || textContent.split(/\s+/).filter(Boolean).length;
  totalWords += words;

  episodesData.push({
    episode_number: i + 1,
    title: parsed.titre || `Épisode ${i + 1} - Sakodo`,
    content: textContent,
    is_free: i === 0,
    price: i === 0 ? 0 : 0.99,
    word_count: words
  });
  console.log(`✓ Épisode ${i + 1} (${parsed.titre || 'Sans titre'}) : ${words} mots`);
}

console.log(`\n📊 Total vérifié : ${totalWords} mots (5 épisodes)`);

// 3. Préparation des objets d'insertion
const storyPayload = {
  slug: "sakodo-nuit-interdite",
  title: "Sakodo - La Nuit Interdite",
  genre: "Cyberpunk",
  totalWords: totalWords,
  episodes: 5,
  status: "published",
  cover: "/covers/sakodo.jpg",
  cover_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800",
  description: "Dans la mégalopole cyberpunk de Neo-Kuro sous une pluie de néons écarlates, Sakodo franchit les frontières de l'interdit lors d'une nuit de vertige, de soie et de désirs inavouables. Un ebook érotique complet en 5 longs chapitres intenses et littéraires.",
  author_name: "Sakodo",
  content: episodesData,
  is_free_episode_1: true
};

async function insertIntoSupabase() {
  const headers = {
    "apikey": API_KEY,
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  };

  // 1. Table 'stories'
  console.log("\n📡 Insertion dans la table 'stories'...");
  let storyInserted = false;
  let storyId = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

  const columnsPayloadStandard = {
    id: storyId,
    title: storyPayload.title,
    description: storyPayload.description,
    genre: storyPayload.genre,
    cover_url: storyPayload.cover_url,
    author_name: storyPayload.author_name,
    views: 4250
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stories`, {
      method: "POST",
      headers,
      body: JSON.stringify(columnsPayloadStandard)
    });

    const resText = await res.text();
    if (res.ok) {
      const data = JSON.parse(resText);
      storyId = data[0]?.id || storyId;
      storyInserted = true;
      console.log("✅ Récit inséré avec succès dans 'stories' ! ID:", storyId);
    } else {
      console.warn(`⚠️ Réponse table 'stories' (${res.status}):`, resText);
      if (res.status === 401 && resText.includes("row-level security")) {
        console.warn("\n👉 RLS (Row Level Security) est actif sur Supabase.");
        console.warn("Pour insérer sans restriction RLS via ce script :");
        console.warn("  SUPABASE_SERVICE_ROLE_KEY=votre_cle_secrete node scripts/seed-sakodo.js");
        console.warn("OU copiez-collez le script SQL : web/scripts/seed-sakodo.sql dans Supabase SQL Editor !");
      }
    }
  } catch (err) {
    console.error("❌ Erreur réseau stories:", err.message);
  }

  // 2. Table 'episodes'
  if (storyInserted) {
    console.log("\n📡 Insertion des 5 épisodes dans la table 'episodes'...");
    for (const ep of episodesData) {
      try {
        const epPayload = {
          story_id: storyId,
          episode_number: ep.episode_number,
          title: ep.title,
          content: ep.content,
          is_free: ep.is_free,
          price: ep.price
        };
        const epRes = await fetch(`${SUPABASE_URL}/rest/v1/episodes`, {
          method: "POST",
          headers,
          body: JSON.stringify(epPayload)
        });
        if (epRes.ok) {
          console.log(`  ✓ Épisode ${ep.episode_number} inséré dans 'episodes'`);
        } else {
          console.warn(`  ⚠️ Épisode ${ep.episode_number}:`, await epRes.text());
        }
      } catch (err) {
        console.error(`  ❌ Erreur épisode ${ep.episode_number}:`, err.message);
      }
    }
  }

  // 3. Table alternative 'recits' (si créée pour fallen-stories)
  console.log("\n📡 Test d'insertion dans la table 'recits'...");
  try {
    const recitsPayload = {
      slug: storyPayload.slug,
      title: storyPayload.title,
      genre: storyPayload.genre,
      totalWords: storyPayload.totalWords,
      episodes: storyPayload.episodes,
      status: storyPayload.status,
      cover: storyPayload.cover,
      content: storyPayload.content,
      is_free_episode_1: storyPayload.is_free_episode_1
    };

    const resRecits = await fetch(`${SUPABASE_URL}/rest/v1/recits`, {
      method: "POST",
      headers,
      body: JSON.stringify(recitsPayload)
    });
    if (resRecits.ok) {
      console.log("✅ Récit inséré avec succès dans la table 'recits' !");
    } else {
      const txt = await resRecits.text();
      if (!txt.includes("Could not find the table")) {
        console.log("Info table 'recits':", txt);
      }
    }
  } catch (err) {}

  console.log("\n==================================================");
  console.log("🚀 VÉRIFICATION TERMINÉE");
  console.log("==================================================");
}

insertIntoSupabase();
