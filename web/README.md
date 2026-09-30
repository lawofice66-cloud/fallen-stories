# DÉPLOIEMENT DE RÉCITS INAVOUABLES

Ce dossier contient l'intégralité du frontend prêt à être déployé pour votre site **Récits Inavouables**.

## 1. Architecture & Stack
- **Frontend** : HTML5, CSS3 (Dark Luxury & Néo-Gothique), Vanilla JavaScript ES6+
- **Database & Auth** : Supabase (`https://znwcmypjlpgdsmpoaclc.supabase.co`)
- **Paiements Crypto** : NOWPayments Gateway ($0.99 / épisode payant)
- **Genres littéraires** : Cyberpunk, Dark Fantasy, Sci-Fi Thriller, Horreur / Occulte, Dystopie, Érotisme, Tabou
- **Modèle Utilisateurs** :
  - **Lecteurs** : Accès direct, libre et anonyme sans inscription. Épisode 1 100% gratuit, chapitres suivants déblocables via crypto NOWPayments.
  - **Créateurs** : Inscription requise (Studio d'écriture, publication d'histoires et chapitres, soumission à vérification manuelle de l'administrateur).

## 2. Déploiement du schéma Supabase
1. Rendez-vous sur votre tableau de bord Supabase : https://supabase.com/dashboard/project/znwcmypjlpgdsmpoaclc
2. Ouvrez le **SQL Editor** dans le menu latéral.
3. Cliquez sur **New query** (Nouvelle requête).
4. Ouvrez le fichier `supabase_schema.sql` fourni dans ce dossier, copiez l'intégralité de son contenu et collez-le dans l'éditeur.
5. Cliquez sur **Run** (Exécuter).
6. Les tables `profiles`, `stories`, `episodes` et les politiques RLS sont créées. La plateforme est vierge de toute histoire par défaut pour laisser vos créateurs publier.

## 3. Déploiement Web

### Option A : Vercel / Netlify / Cloudflare Pages
Glissez-déposez le contenu du dossier `web/` sur [Netlify Drop](https://app.netlify.com/drop) ou connectez votre repo GitHub.

### Option B : Serveur Nginx / Apache
Copiez les fichiers `index.html`, `style.css`, `app.js`, `supabase_schema.sql` sur votre serveur web.
