/**
 * RÉCITS INAVOUABLES - FRONTEND JAVASCRIPT
 * Plateforme littéraire sombre et transgressive
 * Supabase DB + NOWPayments Crypto Gateway + Studio Créateurs
 */

// ============================================================================
// 1. CONFIGURATION & CLIENT SUPABASE
// ============================================================================

const SUPABASE_CONFIG = {
  url: "https://znwcmypjlpgdsmpoaclc.supabase.co",
  publishableKey: "sb_publishable_FYY7JDn0r8794PNvmkOagg_elygqqob",
  nowPaymentsUrl: "https://nowpayments.io/payment/"
};

let supabaseClient = null;
try {
  if (window.supabase && typeof window.supabase.createClient === "function") {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey);
    console.log("Supabase initialisé pour Récits Inavouables");
  } else {
    console.warn("Client Supabase en attente du script CDN.");
  }
} catch (err) {
  console.error("Erreur init Supabase :", err);
}

// ============================================================================
// 2. DICTIONNAIRE MULTILINGUE (FR / EN)
// ============================================================================

const I18N = {
  fr: {
    sql_setup_btn: "Script SQL",
    reader_free_notice: "Accès Lecteur libre (sans inscription)",
    brand_subtitle: "LITTÉRATURE TRANSGRESSIVE",
    nav_explore: "Explorer",
    nav_top_creators: "Top Créateurs",
    nav_creator_studio: "Studio Créateur",
    auth_creator_btn: "Espace Créateur",
    hero_badge: "FICTIONS SOMBRES & TRANSGRESSIVES",
    hero_title: "Les Secrets que l'on n'Ose Murmurer.<br><span class=\"text-gradient\">Récits Inavouables.</span>",
    hero_desc: "Explorez des fictions sombres, interdites, intenses et taboues. L'épisode 1 est 100% libre d'accès sans inscription. Débloquez les chapitres suivants en toute discrétion via NOWPayments.",
    hero_start_btn: "Découvrir les récits",
    hero_become_creator: "Publier son histoire (Créateurs)",
    search_placeholder: "Rechercher un récit inavouable, un auteur...",
    genre_all: "Tous les genres",
    section_top_creators: "Top Créateurs de la Semaine",
    section_top_creators_sub: "Les plumes les plus lues et audacieuses",
    view_all: "Voir tout",
    section_all_stories: "Récits Inavouables",
    section_all_stories_sub: "Épisode 1 offert sans inscription • Épisodes suivants via crypto NOWPayments",
    loading_stories: "Vérification de la bibliothèque Supabase...",
    creators_hall_title: "Le Panthéon des Auteurs",
    creators_hall_desc: "Classement hebdomadaire des créateurs de Récits Inavouables basé sur les lectures et les chapitres débloqués.",
    callout_creator_title: "Écrivez ce que personne d'autre n'ose écrire",
    callout_creator_desc: "Créez votre profil Créateur, publiez vos récits en Cyberpunk, Dark Fantasy, Érotisme ou Tabou. Vos récits sont vérifiés manuellement et monétisés via crypto.",
    callout_creator_btn: "Inscription Créateur",
    dash_btn_new_story: "Nouveau Récit",
    dash_btn_new_episode: "Ajouter un Épisode",
    mod_notice_title: "Vérification manuelle des récits :",
    mod_notice_desc: "Toute nouvelle histoire est soumise pour vérification manuelle par l'administrateur avant diffusion publique, garantissant la qualité de Récits Inavouables.",
    stat_stories: "Récits soumis",
    stat_episodes: "Épisodes rédigés",
    stat_views: "Lectures cumulées",
    stat_earnings: "Revenus NOWPayments ($0.99/ép)",
    my_stories_title: "Mes Récits Inavouables",
    refresh: "Rafraîchir",
    reader_back: "Retour aux récits",
    choose_episode: "Sélectionner un Épisode :",
    paywall_badge: "CHAPITRE VERROUILLÉ",
    paywall_title: "La Suite Est Inavouable",
    paywall_desc: "L'épisode 1 était offert. Soutenez l'auteur pour débloquer immédiatement ce chapitre sans inscription.",
    pay_nowpayments_btn: "Payer $0.99 avec NOWPayments",
    simulate_unlock_btn: "[Mode Test] Simuler le paiement instantané",
    prev_episode: "Épisode Précédent",
    next_episode: "Épisode Suivant",
    auth_modal_creator_only: "L'inscription est réservée aux Auteurs & Créateurs. Les lecteurs peuvent lire et débloquer les récits librement sans compte.",
    tab_login_creator: "Connexion Créateur",
    tab_signup_creator: "Inscription Créateur",
    form_password: "Mot de passe",
    form_author_pseudonym: "Nom de plume / Pseudonyme *",
    form_primary_genre: "Genre de prédilection",
    btn_login_submit: "Accéder à mon Studio Créateur",
    btn_signup_submit: "Créer mon Compte Créateur",
    quick_test_label: "Test instantané sans mot de passe :",
    modal_new_story_title: "Publier un Nouveau Récit Inavouable",
    modal_new_story_desc: "Rédigez votre œuvre. Elle sera enregistrée et soumise à vérification manuelle.",
    form_story_title: "Titre du Récit *",
    form_story_genre: "Genre *",
    form_author_name: "Nom d'auteur affiché",
    form_cover_url: "URL de l'image de couverture",
    preset_covers: "Presets sombres & suggestifs :",
    form_story_desc: "Synopsis / Présentation inavouable *",
    cancel: "Annuler",
    btn_create_story: "Soumettre le Récit",
    modal_new_episode_title: "Ajouter un Épisode",
    modal_new_episode_desc: "Enregistrez un nouveau chapitre dans la table Supabase `episodes`.",
    form_select_story: "Récit cible *",
    form_ep_number: "Numéro d'épisode *",
    form_ep_price: "Prix ($)",
    form_ep_title: "Titre de l'épisode *",
    form_is_free_label: "Épisode Gratuit (Accès libre)",
    form_is_free_help: "Règle de la plateforme : L'épisode 1 doit être gratuit. Les épisodes 2+ sont par défaut payants ($0.99 via NOWPayments).",
    form_ep_content: "Texte complet du chapitre *",
    btn_publish_episode: "Enregistrer l'épisode",
    choose_crypto: "Choisissez votre cryptomonnaie :",
    open_nowpayments_btn: "Ouvrir NOWPayments.io ($0.99)",
    demo_unlock_btn: "Débloquer en Mode Test (Démo)"
  },
  en: {
    sql_setup_btn: "SQL Script",
    reader_free_notice: "Free Reader Access (no registration needed)",
    brand_subtitle: "TRANSGRESSIVE LITERATURE",
    nav_explore: "Explore",
    nav_top_creators: "Top Creators",
    nav_creator_studio: "Creator Studio",
    auth_creator_btn: "Creator Portal",
    hero_badge: "DARK & TRANSGRESSIVE FICTIONS",
    hero_title: "Secrets You Dare Not Whisper.<br><span class=\"text-gradient\">Récits Inavouables.</span>",
    hero_desc: "Explore dark, forbidden, intense and taboo stories. Episode 1 is 100% free with no account required. Unlock next chapters discreetly via NOWPayments.",
    hero_start_btn: "Discover Stories",
    hero_become_creator: "Publish a Story (Creators)",
    search_placeholder: "Search unmentionable stories, authors...",
    genre_all: "All genres",
    section_top_creators: "Top Creators of the Week",
    section_top_creators_sub: "Most daring and read writers",
    view_all: "View all",
    section_all_stories: "Unspoken Stories",
    section_all_stories_sub: "Episode 1 free without sign-up • Next episodes via crypto NOWPayments",
    loading_stories: "Checking Supabase library...",
    creators_hall_title: "Authors' Pantheon",
    creators_hall_desc: "Weekly ranking of Récits Inavouables creators based on readership and unlocked chapters.",
    callout_creator_title: "Write what no one else dares write",
    callout_creator_desc: "Create your Creator profile, publish your stories in Cyberpunk, Dark Fantasy, Erotica or Taboo. Stories are manually reviewed and monetized via crypto.",
    callout_creator_btn: "Creator Registration",
    dash_btn_new_story: "New Story",
    dash_btn_new_episode: "Add Episode",
    mod_notice_title: "Manual story verification:",
    mod_notice_desc: "Every new story is submitted for manual administrator review before public release to ensure high quality.",
    stat_stories: "Stories Submitted",
    stat_episodes: "Episodes Written",
    stat_views: "Total Reads",
    stat_earnings: "NOWPayments Rev ($0.99/ep)",
    my_stories_title: "My Unspoken Stories",
    refresh: "Refresh",
    reader_back: "Back to stories",
    choose_episode: "Select an Episode:",
    paywall_badge: "LOCKED CHAPTER",
    paywall_title: "The Rest Is Unspoken",
    paywall_desc: "Episode 1 was free. Support the author to unlock this chapter right now without signing up.",
    pay_nowpayments_btn: "Pay $0.99 with NOWPayments",
    simulate_unlock_btn: "[Test Mode] Simulate Instant Unlock",
    prev_episode: "Previous Episode",
    next_episode: "Next Episode",
    auth_modal_creator_only: "Sign up is exclusively reserved for Authors & Creators. Readers can read and unlock chapters freely without an account.",
    tab_login_creator: "Creator Sign In",
    tab_signup_creator: "Creator Sign Up",
    form_password: "Password",
    form_author_pseudonym: "Pen Name / Pseudonym *",
    form_primary_genre: "Primary Genre",
    btn_login_submit: "Enter Creator Studio",
    btn_signup_submit: "Create Creator Account",
    quick_test_label: "Instant test without password:",
    modal_new_story_title: "Publish a New Story",
    modal_new_story_desc: "Write your masterpiece. It will be saved and submitted for manual verification.",
    form_story_title: "Story Title *",
    form_story_genre: "Genre *",
    form_author_name: "Displayed Author Name",
    form_cover_url: "Cover Image URL",
    preset_covers: "Dark & suggestive presets:",
    form_story_desc: "Synopsis / Unspoken Pitch *",
    cancel: "Cancel",
    btn_create_story: "Submit Story",
    modal_new_episode_title: "Add Episode",
    modal_new_episode_desc: "Save a new chapter in Supabase `episodes` table.",
    form_select_story: "Target Story *",
    form_ep_number: "Episode Number *",
    form_ep_price: "Price ($)",
    form_ep_title: "Episode Title *",
    form_is_free_label: "Free Episode (Open Access)",
    form_is_free_help: "Platform Rule: Episode 1 must be free. Episode 2+ are paid ($0.99 via NOWPayments) by default.",
    form_ep_content: "Full Chapter Content *",
    btn_publish_episode: "Save Episode",
    choose_crypto: "Choose your cryptocurrency:",
    open_nowpayments_btn: "Open NOWPayments.io ($0.99)",
    demo_unlock_btn: "Unlock in Demo Mode"
  }
};

let currentLang = localStorage.getItem("recits_inavouables_lang") || "fr";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("recits_inavouables_lang", lang);
  document.documentElement.lang = lang;
  document.getElementById("currentLangLabel").textContent = lang.toUpperCase();

  const dict = I18N[lang] || I18N.fr;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });
}

// ============================================================================
// 3. ÉTAT GLOBAL DE L'APPLICATION (INITIALEMENT VIERGE DE TOUTE HISTOIRE)
// ============================================================================

// ============================================================================
// 3. SAGA EBOOK OFFICIELLE : SAKODO - NUIT INTERDITE (5 ÉPISODES)
// ============================================================================

const SAKODO_SAGA_DATA = {
  id: "sakodo-nuit-interdite",
  slug: "sakodo-nuit-interdite",
  saga: "Sakodo - La Nuit Interdite",
  title: "Sakodo - La Nuit Interdite",
  titre: "Sakodo - La Nuit Interdite",
  genre: "Érotisme",
  categorie: "Érotisme",
  author_name: "Sakodo",
  preset: "Cyberpunk Neon + Sensuel Ombre + Nuit Interdite",
  cover_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800",
  description: "Dans la mégalopole cyberpunk de Neo-Kuro sous une pluie de néons écarlates, Sakodo franchit les frontières de l'interdit lors d'une nuit de vertige, de soie et de désirs inavouables. Un ebook érotique complet en 5 longs chapitres intenses et littéraires.",
  isEbook: true,
  badge: "EBOOK 5 x 3000 mots",
  episodes: 5,
  totalEpisodes: 5,
  totalWords: 13945,
  totalWordCount: 13945,
  views: 4250,
  status: "published",
  created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
};

const SAKODO_EPISODES_DATA = [{"id": "sakodo-nuit-interdite-ep1", "story_id": "sakodo-nuit-interdite", "saga": "Sakodo - Nuit Interdite", "episode_number": 1, "title": "Le Reflet des N\u00e9ons \u00c9carlates", "is_free": true, "price": 0.0, "wordCount": 2777, "isEbook": true, "content": "# Sakodo - Nuit Interdite\n\n### \u00c9pisode 1 : Le Reflet des N\u00e9ons \u00c9carlates\n\nLa pluie de minuit ne lavait jamais les fautes de Neo-Kuro ; elle se contentait d'en faire luire les contours sur l'asphalte noir comme de l'obsidienne liquide. Depuis le balcon suspendu au soixante-dixi\u00e8me \u00e9tage de la tour Akasaka, je contemplais la brume violette qui montait des art\u00e8res inf\u00e9rieures de la m\u00e9galopole, travers\u00e9e par le sillage incandescent des a\u00e9roglisseurs de patrouille et les pulsations hyst\u00e9riques des r\u00e9clames holographiques vantant des proth\u00e8ses de m\u00e9moire ou des paradis synth\u00e9tiques. Je m'appelle Sakodo. Dans cette ville o\u00f9 les donn\u00e9es g\u00e9n\u00e9tiques et les algorithmes d'influence se n\u00e9gocient plus cher que les \u00e2mes humaines, j'avais pass\u00e9 dix ann\u00e9es \u00e0 polir mon d\u00e9tachement, \u00e0 neutraliser mes \u00e9motions, \u00e0 les enfermer derri\u00e8re des parois de verre tremp\u00e9 aussi imp\u00e9n\u00e9trables que les blindages de nos banques de m\u00e9moire corporatistes.\n\nMon existence s'\u00e9tait articul\u00e9e autour de la stricte conformit\u00e9 aux exigences du consortium Nakatomi. J'avais appris \u00e0 analyser les flux financiers, \u00e0 d\u00e9celer les trahisons dans un simple battement de paupi\u00e8re lors des conseils d'administration, et \u00e0 ordonner des purges de donn\u00e9es sans \u00e9prouver le moindre remords. Pourtant, cette nuit-l\u00e0, l'air poss\u00e9dait une densit\u00e9 anormale, une charge \u00e9lectrostatique qui me h\u00e9rissait la nuque et faisait vibrer les micro-capteurs sous-cutan\u00e9s log\u00e9s \u00e0 la racine de mes tempes. J'avais pris le risque d\u00e9lib\u00e9r\u00e9 de cong\u00e9dier mes gardes de faction, de d\u00e9sactiver les protocoles de surveillance thermique du niveau sup\u00e9rieur et de tamiser les luminaires d'ambre pour ne laisser subsister que la lueur diffuse, sauvage et moite de la cit\u00e9 en contrebas. Je savais avec une certitude math\u00e9matique qu'elle viendrait. Les canaux crypt\u00e9s du r\u00e9seau clandestin ne mentent jamais quand ils annoncent la venue d'une silhouette dont le simple nom de code fait fr\u00e9mir les membres du directoire.\n\nMon appartement \u00e9tait un vaste sanctuaire d'acier bross\u00e9, de laque noire et de dalles de basalte poli, con\u00e7u pour un homme qui ne dort jamais plus de trois heures cons\u00e9cutives. Une table basse en verre fum\u00e9, quelques fauteuils bas aux ar\u00eates tranchantes et cette immense baie vitr\u00e9e incurv\u00e9e qui embrassait l'horizon satur\u00e9 de brouillard acide. Sur l'\u00e9cran transparent de mon terminal personnel, une s\u00e9rie de rapports financiers et de cl\u00e9s biom\u00e9triques d\u00e9filaient encore en lettres phosphorescentes vert \u00e9meraude, vestige d\u00e9risoire de ma vie d'avant. Une vie r\u00e9gl\u00e9e sur les dividendes, les assassinats feutr\u00e9s par voie de courriels chiffr\u00e9s et la solitude glac\u00e9e des sommets urbains. Ce soir, ces donn\u00e9es semblaient mortes, priv\u00e9es de la moindre \u00e9tincelle de sens face au vide immense qui m'aspirait.\n\nMes oreilles \u00e9taient tendues vers les bruits du vide ext\u00e9rieur. Le vent d'altitude g\u00e9missait contre les haubans de carbone de la tour, produisant une plainte sourde et rythm\u00e9e, pareille au r\u00e2le d'un g\u00e9ant d'acier bless\u00e9. Les averses s'\u00e9crasaient par rafales violentes contre le verre tremp\u00e9, dessinant des rivi\u00e8res de lueurs pourpres qui d\u00e9formaient les contours des gratte-ciels voisins. J'avais vers\u00e9 deux doigts d'un vieux malt synth\u00e9tique ambr\u00e9 dans un gobelet de cristal lourd, mais je ne l'avais pas port\u00e9 \u00e0 mes l\u00e8vres. Mes paumes \u00e9taient moites. Une sensation oubli\u00e9e depuis l'enfance me nouait le ventre : l'attente du danger pur, celui qui ne brandit pas d'arme \u00e0 feu mais promet de vous d\u00e9pouiller de toute armure int\u00e9rieure et de vous laisser nu face \u00e0 vos d\u00e9sirs les plus inavouables.\n\nJe repensais \u00e0 notre premi\u00e8re rencontre, six mois plus t\u00f4t, dans les sous-sols baign\u00e9s de lumi\u00e8re tamis\u00e9e du club Oblivion, o\u00f9 se n\u00e9gociaient les secrets les plus inavouables de la haute p\u00e8gre corporatiste. Elle n'\u00e9tait alors qu'une l\u00e9gende parmi les courtiers de l'ombre, une silhouette fuyante connue sous le pseudonyme d'Elena, r\u00e9put\u00e9e pour d\u00e9rober des dossiers que les plus puissantes intelligences artificielles jugeaient inviolables. Son regard m'avait transperc\u00e9 \u00e0 travers la fum\u00e9e aromatis\u00e9e au bois de santal et aux neuro-stimulants, une \u00e9tincelle de m\u00e9pris amus\u00e9 et de curiosit\u00e9 cruelle qui m'avait hant\u00e9 durant des semaines enti\u00e8res. Chaque nuit pass\u00e9e depuis cet instant n'avait \u00e9t\u00e9 qu'une lente pr\u00e9paration \u00e0 cette confrontation in\u00e9vitable.\n\nSoudain, la baie vitr\u00e9e coulissa dans une fluidit\u00e9 absolue, sans le moindre grincement de ses rails magn\u00e9tiques \u00e0 sustentation. Le capteur d'ouverture avait \u00e9t\u00e9 court-circuit\u00e9 avec une maestria technique qui portait sa signature indiscutable. Une bouff\u00e9e d'air chaud satur\u00e9 d'ozone, d'humidit\u00e9 et d'une fragrance singuli\u00e8re s'engouffra instantan\u00e9ment dans la pi\u00e8ce : un sillage troublant d'orchid\u00e9e noire, de pluie ti\u00e8de et de chair fr\u00e9missante. Elle \u00e9tait l\u00e0. Camp\u00e9e sur le rebord mouill\u00e9 de la terrasse en porte-\u00e0-faux, immobile, comme sculpt\u00e9e dans l'ombre et le n\u00e9on.\n\nSa silhouette se d\u00e9coupait avec une perfection presque insolente contre la nuit pluvieuse. Elle portait une longue robe de soie carmin, fluide comme du mercure sous les reflets \u00e9carlates des enseignes lointaines, fendue vertigineusement le long de la cuisse gauche jusqu'au renflement de la hanche. \u00c0 chacun de ses mouvements imperceptibles, l'\u00e9toffe semblait caresser sa peau avec une sensualit\u00e9 jalouse. Ses cheveux d'\u00e9b\u00e8ne, coup\u00e9s en un carr\u00e9 plongeant effilant les lignes de sa m\u00e2choire, ruisselaient de fines gouttelettes de pluie argent\u00e9e. Mais ce furent ses yeux qui m'encha\u00een\u00e8rent sur place : deux iris ambr\u00e9s, stri\u00e9s d'or liquide, brillants d'une insolence souveraine et d'une faim lucide qui balay\u00e8rent d'un seul coup dix ann\u00e9es de ma\u00eetrise feinte.\n\n\u2014 Tu m'attendais vraiment, Sakodo ? murmura-t-elle. Sa voix \u00e9tait basse, velout\u00e9e, teint\u00e9e d'une musicalit\u00e9 grave qui r\u00e9sonna dans le creux de mon estomac comme une onde sismique. Elle ne s'\u00e9tait pas annonc\u00e9e par le sas s\u00e9curis\u00e9 ; elle avait escalad\u00e9 les corniches r\u00e9serv\u00e9es aux drones de maintenance au soixante-dixi\u00e8me \u00e9tage, d\u00e9fiant les vertiges du vide et les senseurs thermiques avec une t\u00e9m\u00e9rit\u00e9 qui frisait la d\u00e9mence po\u00e9tique.\n\n\u2014 Tu as failli te tuer sur les contreforts ext\u00e9rieurs, Elena, r\u00e9pondis-je en m'effor\u00e7ant de garder une voix \u00e9gale, m\u00eame si le rythme de mes pulsations cardiaques s'acc\u00e9l\u00e9rait sous ma chemise de lin sombre. Les drones de patrouille imp\u00e9riale ont doubl\u00e9 leurs rondes depuis dix-neuf heures en raison des alertes d'incursions dans le secteur trois. Un faux pas de ta part et ton corps n'aurait \u00e9t\u00e9 qu'une tra\u00een\u00e9e \u00e9carlate sur les passerelles inf\u00e9rieures.\n\nUn sourire \u00e9nigmatique entrouvrit ses l\u00e8vres peintes d'un vermillon sombre, presque noir sous la lumi\u00e8re tamis\u00e9e. Elle fit un premier pas dans l'appartement, et le bruissement d\u00e9licat de la soie mouill\u00e9e contre ses jambes nues emplit le silence feutr\u00e9 de la suite. Chaque pas qu'elle faisait semblait calcul\u00e9 pour \u00e9tirer le temps, pour transformer l'espace entre nous en une zone de friction invisible mais br\u00fblante. Ses pieds nus laissaient des empreintes humides et ti\u00e8des sur le basalte noir, tra\u00e7ant une piste \u00e9ph\u00e9m\u00e8re vers mon sanctuaire inviol\u00e9.\n\n\u2014 La mort est un concept abstrait pour ceux qui ne savent pas d\u00e9sirer, Sakodo, r\u00e9pondit-elle en inclinant l\u00e9g\u00e8rement la t\u00eate, laissant une m\u00e8che sombre glisser le long de sa joue diaphane. Et ce soir, je n'avais aucune intention de mourir sans avoir obtenu ce pour quoi je suis mont\u00e9e jusqu'ici. Ni sans avoir v\u00e9rifi\u00e9 si la l\u00e9gende du grand Sakodo n'\u00e9tait qu'un masque de cire pos\u00e9 sur un c\u0153ur incapable de br\u00fbler.\n\nElle s'avan\u00e7a jusqu'\u00e0 se tenir \u00e0 moins d'un demi-m\u00e8tre de moi. \u00c0 cette distance, la chaleur irradiant de son corps devenait presque palpable, chassant la fra\u00eecheur climatis\u00e9e de la pi\u00e8ce. Je pouvais observer le soul\u00e8vement r\u00e9gulier et rapide de sa poitrine, soulign\u00e9 par le d\u00e9collet\u00e9 plongeant de la robe carmin, et la goutte d'eau qui glissait lentement le long de sa gorge diaphane, suivant le trac\u00e9 sinueux de sa clavicule avant de dispara\u00eetre dans l'obscurit\u00e9 soyeuse de son buste. Le contraste entre la fra\u00eecheur humide de la pluie sur sa peau et la chaleur incandescente qui \u00e9manait d'elle provoquait en moi un tourbillon sensoriel suffocant.\n\nL'odeur de son parfum d'orchid\u00e9e se m\u00ealait \u00e0 pr\u00e9sent \u00e0 l'effluve subtil de sa peau mouill\u00e9e, cr\u00e9ant une atmosph\u00e8re si capiteuse que j'en oubliai le gobelet de cristal que je tenais encore. Mes doigts le repos\u00e8rent sans bruit sur la console derri\u00e8re moi. Je refusais de cligner des yeux, de peur qu'elle ne disparaisse comme les chim\u00e8res holographiques qui hantaient les all\u00e9es de Shinjuku. Ses pupilles ambr\u00e9es semblaient sonder mes pens\u00e9es les plus secr\u00e8tes, d\u00e9voilant sans piti\u00e9 les faiblesses que j'avais dissimul\u00e9es \u00e0 mes sup\u00e9rieurs et \u00e0 mes rivaux.\n\n\u2014 Tu as apport\u00e9 les cl\u00e9s cryptographiques de la corporation Nakatomi ? demandai-je, feignant de ramener notre entrevue \u00e0 un pr\u00e9texte professionnel d\u00e9risoire pour maintenir l'illusion d'un contr\u00f4le. Les donn\u00e9es sur les implants exp\u00e9rimentaux de la division cybern\u00e9tique sont sous scell\u00e9s neuronaux depuis ce matin.\n\nElena laissa \u00e9chapper un rire \u00e9touff\u00e9, rauque et moqueur, qui s'acheva en un fr\u00e9missement de ses narines fines. Elle leva lentement la main droite, orn\u00e9e d'une bague de platine poli grav\u00e9e de symboles crypt\u00e9s, et posa l'extr\u00e9mit\u00e9 de son index au centre exact de mon torse. M\u00eame \u00e0 travers l'\u00e9toffe de ma chemise, son contact parut m'\u00e9lectrocuter. Un feu liquide sembla se propager de ce point d'impact minuscule, descendant vers mon bas-ventre et irradiant le long de chaque vert\u00e8bre de mon \u00e9chine.\n\n\u2014 Tu pr\u00e9tends encore t'int\u00e9resser \u00e0 des lignes de code et des consortiums, Sakodo ? chuchota-t-elle en fixant ses pupilles immenses dans les miennes. Regarde-moi dans les yeux et r\u00e9p\u00e8te-moi que c'est pour des donn\u00e9es vol\u00e9es que tu as risqu\u00e9 ta position au directoire en m'ouvrant cet acc\u00e8s. R\u00e9p\u00e8te-moi que ton c\u0153ur ne bat pas comme celui d'un condamn\u00e9 \u00e0 mort qui contemple sa propre gr\u00e2ce.\n\nJe ne r\u00e9pondis rien. Le mensonge \u00e9tait devenu impossible, presque ridicule face \u00e0 la puissance d'attraction qui nous courbait l'un vers l'autre. Depuis six mois que nous nous croisions dans les salons feutr\u00e9s et les r\u00e9ceptions clandestines des bas-fonds de Neo-Kuro, chaque regard \u00e9chang\u00e9, chaque verre effleur\u00e9 au milieu des dignitaires corrompus n'\u00e9tait qu'un pr\u00e9lude \u00e0 cette collision in\u00e9luctable. Nous nous \u00e9tions observ\u00e9s comme deux pr\u00e9dateurs fascin\u00e9s l'un par l'autre, guettant la moindre faille dans l'armure de l'adversaire, \u00e9tudiant nos d\u00e9marches, le timbre de nos voix, les silences pesants qui suivaient nos conversations d'apparence banale. Et ce soir, l'armure venait de se fissurer de part en part.\n\nSes doigts gliss\u00e8rent avec une lenteur calcul\u00e9e vers le haut de mon torse, effleurant les boutons de nacre de ma chemise sans les d\u00e9faire, avant de s'attarder au creux d\u00e9licat de ma gorge, l\u00e0 o\u00f9 mon pouls trahissait une d\u00e9route totale. La texture de sa peau \u00e9tait d'une douceur vertigineuse, contrastant avec l'autorit\u00e9 magn\u00e9tique et presque cruelle de son geste. Je posai \u00e0 mon tour ma paume sur sa hanche, l\u00e0 o\u00f9 la fente vertigineuse de sa robe laissait sa peau nue expos\u00e9e \u00e0 l'air ti\u00e8de de la chambre.\n\nLa ti\u00e9deur de sa chair sous mes doigts me fit retenir mon souffle : elle tremblait imperceptiblement, trahissant sous son assurance imp\u00e9rieuse une excitation tout aussi d\u00e9vorante que la mienne. Mes doigts s'enfonc\u00e8rent l\u00e9g\u00e8rement dans la rondeur de sa cuisse, sentant les muscles fermes r\u00e9agir \u00e0 mon contact par un tressaillement d\u00e9licieux. Une plainte presque inaudible vibra au fond de sa gorge, et ses cils palpit\u00e8rent comme les ailes d'un papillon de nuit pris au pi\u00e8ge d'une flamme.\n\n\u2014 Tu joues un jeu dangereux, Elena, dis-je tout bas, ma voix s'alt\u00e9rant sous l'effet de ce contact trop intime, trop longtemps r\u00eav\u00e9 dans la solitude de mes nuits blanches. Dans cette tour, les murs ont des oreilles optiques et chaque souffle peut \u00eatre traduit en trahison d'\u00c9tat par les intelligences artificielles de surveillance.\n\n\u2014 Ce n'est pas un jeu, Sakodo. C'est une mise \u00e0 nu. Et je refuse que nous passions une nuit de plus \u00e0 faire semblant d'\u00eatre des ombres sans d\u00e9sirs dans une cit\u00e9 qui nous d\u00e9vore \u00e0 petit feu. Si nous devons \u00eatre d\u00e9truits par nos choix, que ce soit au moins dans les flammes de ce que nous avons nous-m\u00eames choisi d'embraser.\n\nD'un mouvement d\u00e9lib\u00e9r\u00e9, elle fit un pas de plus vers moi, effa\u00e7ant le dernier interstice d'air qui nous s\u00e9parait. Son buste souple vint s'\u00e9craser d\u00e9licatement contre ma poitrine. Le parfum de sa chevelure m'enveloppa enti\u00e8rement, m'enivrant comme une drogue neuro-chimique non filtr\u00e9e. Je sentais la courbure de ses reins sous ma paume, la fermet\u00e9 soyeuse de sa cuisse press\u00e9e contre la mienne. Nos souffles se confondaient d\u00e9sormais dans une cadence f\u00e9brile, saccad\u00e9e, formant un rythme primitif qui balayait les mill\u00e9naires de civilisation polic\u00e9e.\n\nAu dehors, au-del\u00e0 des vitrages fum\u00e9s, un \u00e9clair monumental z\u00e9bra les cieux satur\u00e9s de pollution lumineuse, teignant les gratte-ciels d'un violet \u00e9lectrique qui fit miroiter chaque goutte d'eau sur la baie vitr\u00e9e comme des diamants \u00e9ph\u00e9m\u00e8res. Dans cette seconde suspendue entre le tonnerre et l'obscurit\u00e9, les yeux d'Elena se ferm\u00e8rent \u00e0 demi. Ses l\u00e8vres s'entrouvrirent, laissant deviner la pointe rose et humide de sa langue, et elle laissa \u00e9chapper un soupir rauque qui sonna comme un appel sans condition, une supplique et un ordre entrem\u00eal\u00e9s.\n\nJe glissai ma seconde main dans sa nuque, ses cheveux mouill\u00e9s s'enroulant autour de mes doigts comme des lianes de soie sombre. Je la tirai imperceptiblement vers moi, sentant sa r\u00e9sistance c\u00e9der dans un fr\u00e9missement d'abandon d\u00e9licieux. Mes l\u00e8vres s'approch\u00e8rent des siennes jusqu'\u00e0 en effleurer le bord charnu, partageant la m\u00eame chaleur, le m\u00eame souffle saccad\u00e9, savourant cette fraction d'\u00e9ternit\u00e9 o\u00f9 le d\u00e9sir est encore une promesse suspendue au bord du gouffre. Nous pouvions sentir la vibration de nos deux corps pr\u00eats \u00e0 s'embraser, une faim \u00e9l\u00e9gante mais insatiable qui ne demandait qu'\u00e0 tout consumer sur son passage.\n\nJe pouvais compter chacun des battements de sa carotide qui tambourinait avec une ferveur sauvage contre la pulpe de mon pouce. Elena pencha la t\u00eate en arri\u00e8re, m'offrant la courbe vuln\u00e9rable et parfaite de sa gorge diaphane, l\u00e0 o\u00f9 scintillait une derni\u00e8re perle de pluie. Mes l\u00e8vres descendirent pour venir la cueillir d'un effleurement ti\u00e8de, arrachant \u00e0 sa gorge un cri rauque et feutr\u00e9 qui se perdit dans la p\u00e9nombre de la suite. Ses ongles s'enfonc\u00e8rent dans les revers de ma veste avec une urgence nouvelle, trahissant la d\u00e9route totale de ses d\u00e9fenses. Elle cherchait \u00e0 se dissoudre en moi autant que je cherchais \u00e0 m'ab\u00eemer en elle.\n\nC'est \u00e0 cet instant pr\u00e9cis qu'un bip d'alerte \u00e9carlate s'alluma silencieusement sur la console murale de la suite : un faisceau de balayage thermique de niveau imp\u00e9rial venait de se verrouiller sur la fa\u00e7ade est de la tour. Le drone de surveillance corporatiste venait de modifier sa trajectoire de patrouille et braquait ses senseurs directement vers notre balcon. Quelqu'un ou quelque chose savait qu'une anomalie s'\u00e9tait infiltr\u00e9e au soixante-dixi\u00e8me \u00e9tage. Mais dans les bras l'un de l'autre, au bord de l'ab\u00eeme et du vertige, ni elle ni moi ne f\u00eemes le moindre geste pour fuir. Nos l\u00e8vres ne s'\u00e9taient pas encore touch\u00e9es, mais nos \u00e2mes venaient d\u00e9j\u00e0 de sceller leur pacte inavouable.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine."}, {"id": "sakodo-nuit-interdite-ep2", "story_id": "sakodo-nuit-interdite", "saga": "Sakodo - Nuit Interdite", "episode_number": 2, "title": "Murmures dans la P\u00e9nombre", "is_free": false, "price": 0.99, "wordCount": 2775, "isEbook": true, "content": "# Sakodo - Nuit Interdite\n\n### \u00c9pisode 2 : Murmures dans la P\u00e9nombre\n\nLe clignotement rougeoyant de la balise de d\u00e9tection thermique z\u00e9brait la console murale avec une insistance m\u00e9canique et gla\u00e7ante. Le drone de patrouille corporatiste r\u00f4dait le long de l'armature d'acier de la tour Akasaka, son projecteur spectral balayant les fa\u00e7ades vitr\u00e9es \u00e0 la recherche de signatures caloriques ill\u00e9gales. Mais ni Elena ni moi ne bougions. Nous \u00e9tions fig\u00e9s dans cet \u00e9tau de d\u00e9sir suspendu, nos haleines ti\u00e8des se m\u00ealant dans l'obscurit\u00e9 comme une promesse que m\u00eame le bruit des rotors ne pouvait rompre.\n\nChaque seconde d'immobilit\u00e9 semblait dilater le temps \u00e0 l'infini. Son corps appuy\u00e9 contre le mien vibrait d'une chaleur sourde, presque animale. Ses yeux ambr\u00e9s ne quittaient pas mes l\u00e8vres, brillant d'un d\u00e9fi insolent qui semblait se moquer de toute l'armada polici\u00e8re de Neo-Kuro. Elle savait pertinemment que si le drone passait en mode balayage millim\u00e9trique, nos deux existences basculeraient dans la clandestinit\u00e9 d\u00e9finitive. Mais dans son regard, je ne lisais pas la peur : je lisais l'ivresse enivrante de l'interdit pouss\u00e9 \u00e0 son paroxysme.\n\nSans d\u00e9tacher mes yeux des siens, j'\u00e9tendis le bras gauche vers le panneau tactile mural dissimul\u00e9 dans la boiserie sombre. D'une pression de mon empreinte palmaire, j'enclenchai le blindage \u00e9lectro-optique de la baie vitr\u00e9e : un rideau d'ombres denses et polaris\u00e9es s'abattit instantan\u00e9ment sur la baie panoramique, coupant la vue de Neo-Kuro et \u00e9touffant la clameur de la ville. Les reflets des n\u00e9ons se mu\u00e8rent en de fines stries g\u00e9om\u00e9triques filtrant \u00e0 travers les lames persiennes, d\u00e9coupant l'espace en un sanctuaire d'or et de pourpre.\n\nLe silence retomba, \u00e9pais, vibrant, presque palpable. Seul le bruit de nos respirations pr\u00e9cipit\u00e9es r\u00e9sonnait d\u00e9sormais dans le grand salon d'\u00e9b\u00e8ne.\n\n\u2014 Nous avons peut-\u00eatre trente minutes avant qu'ils ne recalibrent leurs senseurs p\u00e9rim\u00e9triques pour forcer le blindage, murmurai-je contre le lobe de son oreille, mes l\u00e8vres fr\u00f4lant les m\u00e8ches humides de sa chevelure. Apr\u00e8s cela, ils enverront une \u00e9quipe d'intervention au sol.\n\n\u2014 Trente minutes d'\u00e9ternit\u00e9, Sakodo... me r\u00e9pondit-elle d'un souffle ardent qui m'arracha un frisson violent le long de la moelle \u00e9pini\u00e8re. Trente minutes o\u00f9 personne d'autre n'a le droit d'exister sur cette terre.\n\nElle se d\u00e9gagea d'un pas lent, non pour fuir, mais pour se draper dans la lumi\u00e8re tamis\u00e9e qui \u00e9manait du sol. Ses iris dor\u00e9s me d\u00e9visageaient avec une curiosit\u00e9 presque pr\u00e9datrice, savourant l'effet d\u00e9vastateur qu'elle produisait sur mes sens. D'un geste mesur\u00e9, elle porta ses mains \u00e0 la fine bride de platine qui retenait la robe carmin \u00e0 son \u00e9paule gauche. Ses doigts longs et graciles firent glisser le fermoir. L'\u00e9toffe lourde et fluide glissa doucement sur son \u00e9paule, d\u00e9voilant une peau laiteuse d'une perfection troublante, orn\u00e9e au creux de l'omoplate d'un discret tatouage bioluminescent repr\u00e9sentant un serpent d'\u00e9meraude entrelac\u00e9.\n\nLa robe descendit de quelques centim\u00e8tres, lib\u00e9rant le haut de son buste satin\u00e9. Je sentis ma gorge se nouer devant cette offrande silencieuse. Les battements pr\u00e9cipit\u00e9s de son c\u0153ur faisaient trembler la courbe d\u00e9licate de ses seins opulents, dont les pointes dress\u00e9es sous l'effet du froid et du d\u00e9sir r\u00e9clamaient l'embrasement de mes mains. Je m'avan\u00e7ai vers elle, incapable de r\u00e9sister plus longtemps \u00e0 l'attraction magn\u00e9tique qui \u00e9manait de chaque parcelle de son \u00eatre.\n\n\u2014 Tu trembles, Elena, constatai-je d'une voix sourde en posant ma paume sur la rondeur ti\u00e8de de son \u00e9paule d\u00e9nud\u00e9e.\n\n\u2014 Je br\u00fble, Sakodo. Ce n'est pas la m\u00eame chose, r\u00e9pliqua-t-elle en fermant les yeux avec d\u00e9lectation sous la pression de mes doigts. Et tu sais tr\u00e8s bien que tu es le seul responsable de cet incendie.\n\nMa main descendit le long de sa colonne vert\u00e9brale, tra\u00e7ant la cambrure parfaite de ses reins avec une lenteur religieuse. La peau d'Elena \u00e9tait d'une ti\u00e9deur de velours, fr\u00e9missant au moindre de mes contacts avec une r\u00e9activit\u00e9 sensorielle qui d\u00e9cuplait ma propre exaltation. De mes deux mains, j'attrapai d\u00e9licatement les pans de la soie rouge pour l'aider \u00e0 s'en d\u00e9faire. L'\u00e9toffe coula le long de ses hanches sculpt\u00e9es, chuchotant contre ses cuisses fusel\u00e9es avant de s'effondrer au sol en une mare cramoisie semblable \u00e0 un p\u00e9tale g\u00e9ant fan\u00e9 au pied de son pi\u00e9destal.\n\nElle se tenait devant moi dans le plus simple appareil, seulement v\u00eatue de la p\u00e9nombre et des lueurs d'ambre qui baignaient la pi\u00e8ce. Son corps \u00e9tait une ode \u00e0 la volupt\u00e9 la plus pure : des hanches pleines, une taille magnifiquement cintr\u00e9e, des cuisses longues et fermes dont l'entrecroisement secret d\u00e9gageait une chaleur enivrante. Je contemplais cette splendeur avec une v\u00e9n\u00e9ration presque sacr\u00e9e, sentant mon sang battre avec force dans mes tempes. Rien dans mes protocoles corporatistes ne m'avait pr\u00e9par\u00e9 \u00e0 une telle d\u00e9flagration de beaut\u00e9 brute.\n\nSes yeux s'ouvrirent \u00e0 nouveau, brillants d'une insolente certitude. Elle ne manifestait aucune g\u00eane, aucune pudeur superflue ; elle assumait la puissance ravageuse de son magn\u00e9tisme. Elle fit glisser ses mains le long de mon torse, trouvant les boutons de ma chemise avec une dext\u00e9rit\u00e9 f\u00e9brile. Un \u00e0 un, les boutons de nacre c\u00e9d\u00e8rent sous ses ongles soign\u00e9s. Lorsqu'elle \u00e9carta le tissu et posa ses deux paumes fra\u00eeches sur mes pectoraux nus, un soupir d'aise et de soulagement s'\u00e9chappa de ma poitrine.\n\n\u2014 Tu as pass\u00e9 des ann\u00e9es \u00e0 te cacher derri\u00e8re des armures de m\u00e9tal et de protocole, Sakodo, murmura-t-elle en appuyant son front contre mon \u00e9paule, respirant l'odeur de ma peau avec une ferveur gourmande. Mais ce soir, je veux voir l'homme. Le vrai. Celui qui refuse de mourir asphyxi\u00e9 dans sa propre cage dor\u00e9e.\n\nSes ongles dessin\u00e8rent de lentes arabesques sur ma peau tendue, descendant vers ma ceinture avec une lenteur calcul\u00e9e qui poussait mon endurance \u00e0 ses ultimes retranchements. Chaque effleurement \u00e9tait une torture divine, un supplice de douceur qui embrasait mes sens. Je saisis ses poignets fins, retenant son \u00e9lan pour mieux plonger mon regard dans le sien.\n\n\u2014 Tu as conscience de ce que tu d\u00e9clenches ? lui demandai-je, le souffle court, les m\u00e2choires serr\u00e9es par l'effort surhumain de garder le contr\u00f4le. Si nous franchissons ce seuil, il n'y aura plus de retour en arri\u00e8re possible. Ni pour toi, ni pour moi.\n\n\u2014 Plus que tu ne le crois, Sakodo. Alors cesse de raisonner comme un processeur logique, et fais-moi tienne.\n\nJe l\u00e2chai ses poignets pour venir ceinturer sa taille d'un geste imp\u00e9rieux. Je la soulevai sans peine contre moi, la plaquant doucement contre la console de verre opaque. Elena poussa un cri \u00e9touff\u00e9, un m\u00e9lange de surprise et de d\u00e9lectation sauvage, tandis que ses cuisses satin\u00e9es venaient s'enrouler naturellement autour de mes hanches. La proximit\u00e9 de nos peaux nues provoqua un choc thermique foudroyant : le contact de sa f\u00e9minit\u00e9 humide et br\u00fblante contre mon aine me fit perdre le peu de raison qui me restait.\n\nMes l\u00e8vres trouv\u00e8rent enfin les siennes dans un baiser vorace, passionn\u00e9, sans concession. Sa langue vint explorer la mienne avec une fougue d\u00e9sesp\u00e9r\u00e9e, comme si nous buvions \u00e0 une source d\u00e9fendue au milieu d'un d\u00e9sert de b\u00e9ton et d'acier. Ses doigts s'enfonc\u00e8rent dans mes cheveux courts, me tirant vers elle avec une avidit\u00e9 insatiable. Chacun de ses g\u00e9missements mouill\u00e9s r\u00e9sonnait dans ma gorge comme un chant de triomphe.\n\nJe promenai ma bouche le long de sa m\u00e2choire fr\u00e9missante, descendant vers le creux de sa gorge o\u00f9 son pouls battait avec la fr\u00e9n\u00e9sie d'un animal captif. Mes l\u00e8vres descendirent plus bas encore, cueillant avec une lenteur gourmande le sommet arrondi de son sein gauche. Lorsqu'elle sentit ma langue enrouler sa pointe dress\u00e9e, Elena rejeta la t\u00eate en arri\u00e8re, arquant son dos dans une plainte \u00e9touff\u00e9e qui fit vibrer l'armature de la suite. Ses mains glissaient fr\u00e9n\u00e9tiquement sur mes trap\u00e8zes, r\u00e9clamant davantage de friction, refusant la moindre pause.\n\n\u2014 Sakodo... s'il te pla\u00eet... murmura-t-elle, les doigts crisp\u00e9s dans mes \u00e9paules nues. Je ne tiendrai pas...\n\nJe la portai d\u00e9licatement \u00e0 travers le corridor plong\u00e9 dans la p\u00e9nombre, o\u00f9 seules les lueurs violettes des veilleuses guidaient nos pas. Mais alors que nous franchissions le seuil de la chambre principale, une vibration synchrone r\u00e9sonna directement au creux de nos deux implants neuraux : un ping crypt\u00e9, portant le code de priorit\u00e9 absolue du directoire supr\u00eame de Neo-Kuro. Quelqu'un venait d'intercepter notre fr\u00e9quence priv\u00e9e, et un compte \u00e0 rebours de vingt secondes s'affichait d\u00e9j\u00e0 sur le coin de mon champ visuel.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine."}, {"id": "sakodo-nuit-interdite-ep3", "story_id": "sakodo-nuit-interdite", "saga": "Sakodo - Nuit Interdite", "episode_number": 3, "title": "Le Frisson de l'\u00c9treinte", "is_free": false, "price": 0.99, "wordCount": 2775, "isEbook": true, "content": "# Sakodo - Nuit Interdite\n\n### \u00c9pisode 3 : Le Frisson de l'\u00c9treinte\n\nLe compte \u00e0 rebours clignotait au bas de ma r\u00e9tine avec la froideur implacable des algorithmes corporatistes : dix-huit secondes, dix-sept, seize... Un pirate de haut vol ou un agent de contre-espionnage tentait d'\u00e9tablir une passerelle d'acc\u00e8s direct \u00e0 nos noyaux synaptiques pour cartographier notre localisation exacte et extraire nos identifiants biom\u00e9triques. Dans ce monde d\u00e9mat\u00e9rialis\u00e9, une telle intrusion \u00e9quivalait \u00e0 une condamnation \u00e0 mort ou \u00e0 un effacement m\u00e9moriel complet dans les caissons de reconditionnement de Nakatomi.\n\nPourtant, les bras d'Elena enroul\u00e9s autour de ma nuque et la morsure d\u00e9licate de ses dents sur ma l\u00e8vre inf\u00e9rieure m'ancraient dans une r\u00e9alit\u00e9 infiniment plus puissante que n'importe quelle menace num\u00e9rique. Sans desserrer mon \u00e9treinte, j'activai d'un clignement de paupi\u00e8re le protocole d'isolation EMP d'urgence du penthouse : un rideau d'interf\u00e9rences magn\u00e9tiques satur\u00e9 balaya l'ensemble des r\u00e9seaux de l'appartement. La connexion fut sectionn\u00e9e net, dispersant le signal intrusif dans un cr\u00e9pitement de statique aveugle. Le compte \u00e0 rebours s'\u00e9vanouit, ne laissant derri\u00e8re lui que l'obscurit\u00e9 ti\u00e8de et le parfum d'ambre qui r\u00e9gnait entre nos deux corps enlac\u00e9s.\n\n\u2014 Tu as grill\u00e9 tous les relais de la tour pour nous offrir cette nuit, murmura Elena, son souffle br\u00fblant contre mon cou tremp\u00e9 de sueur. Ils mettront des heures \u00e0 r\u00e9tablir les r\u00e9seaux locaux.\n\n\u2014 Ils reconstruiront leurs relais demain, r\u00e9pondis-je d'une voix rauque. Mais cette nuit m'appartient. Et tu m'appartiens.\n\nUn frisson d\u00e9mesur\u00e9 courut le long de son \u00e9chine. Ses cuisses se resserr\u00e8rent avec force autour de mes hanches, me guidant vers la chambre adjacente o\u00f9 tr\u00f4nait l'immense lit bas habill\u00e9 de satin anthracite. Lorsque nos corps bascul\u00e8rent enfin sur la fra\u00eecheur soyeuse des draps, l'impact arracha \u00e0 Elena un soupir de pure d\u00e9lectation. La mati\u00e8re fluide glissait sous nos mouvements comme une eau sombre et caressante.\n\nJe me tins un instant au-dessus d'elle, soutenant mon torse sur mes coudes pour mieux la contempler dans la p\u00e9nombre z\u00e9br\u00e9e par les n\u00e9ons violets qui r\u00e9ussissaient encore \u00e0 percer les fentes des stores. Ses cheveux noirs s'\u00e9talaient en \u00e9ventail sur les coussins de velours sombre, cr\u00e9ant un cadre d'\u00e9b\u00e8ne autour de son visage \u00e9mouvant de beaut\u00e9 et de vuln\u00e9rabilit\u00e9 consentie. Ses l\u00e8vres entrouvertes, rougies par mes baisers pr\u00e9c\u00e9dents, laissaient \u00e9chapper une plainte feutr\u00e9e chaque fois que mes doigts effleuraient le renflement d\u00e9licat de ses c\u00f4tes.\n\n\u2014 Ne me fais plus attendre, Sakodo, supplia-t-elle, ses iris dor\u00e9s brillant d'une lueur presque fi\u00e9vreuse dans l'ombre. Tu as pass\u00e9 des mois \u00e0 me scruter dans l'ombre des couloirs du directoire... prouve-moi que tu as le courage d'aller jusqu'au bout de ce d\u00e9sir que tu refoulais.\n\nJe descendis lentement le long de son corps, posant des baisers mesur\u00e9s et ardents sur chaque centim\u00e8tre de sa peau. De sa m\u00e2choire fr\u00e9missante jusqu'\u00e0 la naissance de sa poitrine, mes l\u00e8vres tra\u00e7aient une cartographie secr\u00e8te de son d\u00e9sir. Quand ma bouche vint engloutir \u00e0 nouveau le bouton turgescent de son sein droit, Elena poussa un g\u00e9missement aigu qui mourut dans un sanglot de volupt\u00e9. Ses mains agripp\u00e8rent mes \u00e9paules larges, ses ongles s'enfon\u00e7ant dans le tissu musculeux de mon dos pour marquer son emprise.\n\nJe continuai ma descente avec une patience impitoyable. Mon souffle chaud balayait son ventre plat, faisant fr\u00e9mir la fine ligne brune qui descendait vers son nombril. Elena arquait le bassin vers moi, ses reins se soulevant du matelas dans une qu\u00eate instinctive d'apaisement. La ti\u00e9deur de sa chair devenait incandescente. L'odeur d'orchid\u00e9e et d'oc\u00e9an chaud qui \u00e9manait d'elle saturait l'air de la chambre, an\u00e9antissant mes derni\u00e8res pens\u00e9es rationnelles.\n\nMes mains gliss\u00e8rent le long de ses cuisses galb\u00e9es, \u00e9cartant avec une infinie douceur ses genoux pour me faire une place au creux de son sanctuaire. La peau de l'int\u00e9rieur de ses cuisses \u00e9tait d'une d\u00e9licatesse inou\u00efe, d'une douceur de p\u00e9tale mouill\u00e9 contrastant avec la pulsation f\u00e9roce de son intimit\u00e9. Quand mes doigts effleur\u00e8rent les replis soyeux et humides de sa f\u00e9minit\u00e9, Elena eut un soubresaut convulsif. Elle rejeta la t\u00eate en arri\u00e8re, ses paupi\u00e8res closes scellant une extase d\u00e9j\u00e0 insoutenable.\n\n\u2014 Sakodo... mon Dieu... balbutia-t-elle, les doigts crisp\u00e9s dans les draps de satin. C'est trop... c'est trop doux...\n\nJe pris le temps d'apprivoiser sa moiteur, caressant la perle de son d\u00e9sir avec une lenteur circulaire et rythm\u00e9e qui la fit g\u00e9mir \u00e0 chaque passage. Ses hanches se mirent \u00e0 onduler d'elles-m\u00eames, cherchant la cadence, r\u00e9clamant l'offrande totale. Elle n'\u00e9tait plus la femme fatale calculatrice et insaisissable des salons d'Akasaka ; elle \u00e9tait une amante affam\u00e9e, livr\u00e9e corps et \u00e2me \u00e0 la d\u00e9ferlante de ses sens.\n\nJe remontai le long de son corps pour venir poser mon visage contre le sien. Nos regards se crois\u00e8rent une fraction de seconde, charg\u00e9s d'une intensit\u00e9 si brute que l'air sembla se rar\u00e9fier dans la pi\u00e8ce. Je positionnai mes hanches contre les siennes, sentant l'\u00e9treinte br\u00fblante de son intimit\u00e9 s'ouvrir pour m'accueillir. D'une pouss\u00e9e lente, d\u00e9lib\u00e9r\u00e9e et inexorable, je franchis le seuil de son abandon.\n\nUn long r\u00e2le voil\u00e9 d\u00e9chira la gorge d'Elena tandis que ses yeux s'\u00e9carquillaient dans un m\u00e9lange de douleur d\u00e9licieuse et de d\u00e9livrance absolue. Sa cambrure se resserra violemment autour de moi, ses muscles intimes m'enserrant avec une force d\u00e9mesur\u00e9e, pulsant au rythme de nos c\u0153urs affol\u00e9s. Nous \u00e9tions enfin un, deux \u00e2mes interdites scell\u00e9es dans la chair au sommet d'une tour d'acier.\n\nNos mouvements trouv\u00e8rent une cadence lente, majestueuse, semblable au ressac d'une mar\u00e9e lourde d'oranges et d'\u00e9pices. \u00c0 chaque \u00e9lan, je sentais son corps r\u00e9pondre avec une pr\u00e9cision instinctive, ondulant sous le mien pour prolonger la friction d\u00e9licieuse de notre \u00e9treinte. Sa peau glissait contre la mienne dans une ti\u00e9deur enivrante, ruisselante d'une sueur l\u00e9g\u00e8re qui scintillait sous la p\u00e9nombre tamis\u00e9e. Nous nous regardions fixement, sans un mot, laissant nos yeux exprimer ce que la parole humaine ne saurait jamais traduire sans l'amoindrir.\n\nMais alors que nos souffles retrouvaient une cadence pour entamer la danse sacr\u00e9e de l'extase, le g\u00e9n\u00e9rateur auxiliaire de la tour s'enclencha avec un bourdonnement sourd, et les miroirs suspendus au plafond s'illumin\u00e8rent d'une clart\u00e9 spectrale, r\u00e9v\u00e9lant la silhouette d'une micro-cam\u00e9ra de transmission optique install\u00e9e au c\u0153ur m\u00eame du luminaire central.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine."}, {"id": "sakodo-nuit-interdite-ep4", "story_id": "sakodo-nuit-interdite", "saga": "Sakodo - Nuit Interdite", "episode_number": 4, "title": "Au-Del\u00e0 du Vertige", "is_free": false, "price": 0.99, "wordCount": 2813, "isEbook": true, "content": "# Sakodo - Nuit Interdite\n\n### \u00c9pisode 4 : Au-Del\u00e0 du Vertige\n\nLa lentille de la micro-cam\u00e9ra refl\u00e9tait une \u00e9tincelle froide dans le plafonnier, t\u00e9moin silencieux d'une surveillance clandestine organis\u00e9e par les factions rivales du consortium. En temps normal, cette d\u00e9couverte m'aurait pouss\u00e9 \u00e0 l'action imm\u00e9diate, \u00e0 l'analyse m\u00e9dico-l\u00e9gale du signal et \u00e0 l'\u00e9limination m\u00e9ticuleuse de la menace par tous les moyens d'\u00e9limination disponibles. Mais \u00e0 cet instant pr\u00e9cis, uni dans la chair avec Elena, le reste de l'univers avait cess\u00e9 d'avoir la moindre importance.\n\nElena avait elle aussi aper\u00e7u le reflet furtif dans le miroir au-dessus de nous. Au lieu de reculer ou de tenter de masquer sa nudit\u00e9 \u00e9clatante, ses l\u00e8vres se fendirent d'un rictus d'un d\u00e9fi absolu. Ses iris ambr\u00e9s s'enflamm\u00e8rent d'une audace destructrice qui acheva de balayer mes ultimes digues morales. Elle passa ses bras autour de mes \u00e9paules, ses ongles tra\u00e7ant des lignes ardentes sur mes omoplates, et me tira vers elle avec une vigueur insoup\u00e7onn\u00e9e.\n\n\u2014 Qu'ils regardent, Sakodo... murmura-t-elle, la voix vibrante d'une jouissance provocatrice. Qu'ils soient t\u00e9moins de notre perdition. Qu'ils meurent d'envie de ne jamais conna\u00eetre ce que nous vivons ici, enferm\u00e9s dans leurs protocoles st\u00e9riles.\n\nSes paroles agirent comme une \u00e9tincelle jet\u00e9e dans un baril de poudre. La retenue et la prudence corporatiste qui avaient dict\u00e9 mon existence s'\u00e9vapor\u00e8rent dans la chaleur moite de la suite. J'enfon\u00e7ai mes mains sous ses reins, la soulevant l\u00e9g\u00e8rement pour accentuer l'angle de notre jonction, et j'imprimai \u00e0 nos corps un rythme plus dense, plus profond, sans merci. \u00c0 chaque va-et-vient, le frottement soyeux de nos peaux moites produisait un claquement feutr\u00e9 qui r\u00e9sonnait dans la p\u00e9nombre comme une musique tribale et primitive.\n\nElena laissa \u00e9chapper un cri rauque, une note bris\u00e9e qui emplit l'air de la chambre. Sa t\u00eate bascula sur le c\u00f4t\u00e9, sa nuque cambr\u00e9e exposant la ligne pure de sa gorge \u00e0 mes baisers fi\u00e9vreux. Mes l\u00e8vres vinrent \u00e9touffer ses plaintes, buvant son souffle, d\u00e9vorant sa bouche avec une soif que rien ne semblait pouvoir \u00e9tancher. Sa langue se battait contre la mienne dans un ballet furieux et voluptueux, tandis que ses hanches \u00e9pousaient chacun de mes assauts avec une synchronisation parfaite.\n\nDehors, l'orage qui couvait depuis des heures \u00e9clata avec une violence inou\u00efe sur Neo-Kuro. Des trombes d'eau s'abattirent contre les vitrages blind\u00e9s, \u00e9touffant les bruits de la cit\u00e9 sous un vacarme liquide et majestueux. Des \u00e9clairs d'un blanc bleut\u00e9 d\u00e9chiraient les nuages de pollution \u00e0 intervalles r\u00e9guliers, inondant la chambre d'\u00e9clats stroboscopiques qui figeaient nos silhouettes entrelac\u00e9es : deux corps luisants de sueur, encha\u00een\u00e9s par le plaisir, d\u00e9fiant les r\u00e8gles de leur caste dans un vertige incandescent.\n\nJe sentais la texture velout\u00e9e de son intimit\u00e9 se resserrer autour de moi \u00e0 chaque pouss\u00e9e, comme si son corps entier cherchait \u00e0 retenir mon essence, \u00e0 ne plus jamais me laisser partir. Chaque pulsation de son sexe chaud et inond\u00e9 envoyait des d\u00e9charges \u00e9lectriques le long de mes reins. La sueur perlait sur mon front et tombait en gouttes ti\u00e8des sur sa poitrine opulente, tra\u00e7ant des sillons brillants sous les lueurs violettes de la ville.\n\n\u2014 Sakodo... regarde-moi... ordonna-t-elle dans un souffle saccad\u00e9, ses yeux plongeant dans les miens sans ciller. Tu es \u00e0 moi... cette nuit, tu n'es rien d'autre que le mien...\n\n\u2014 Je suis \u00e0 toi, Elena, r\u00e9pondis-je entre deux r\u00e2les \u00e9touff\u00e9s, la voix bris\u00e9e par l'intensit\u00e9 de l'effort et du plaisir. Rien d'autre n'existe.\n\nLa tension monta d'un cran, atteignant des hauteurs presque douloureuses. Ses jambes se nou\u00e8rent plus \u00e9troitement encore autour de mon dos, ses talons m'enjoignant d'acc\u00e9l\u00e9rer la cadence. Nous \u00e9tions emport\u00e9s dans un maelstr\u00f6m sensoriel o\u00f9 la douleur et la volupt\u00e9 se confondaient dans une harmonie f\u00e9roce. Elena commen\u00e7a \u00e0 trembler de tout son \u00eatre, une tr\u00e9pidation incontr\u00f4lable qui naissait dans ses cuisses et se propageait jusqu'\u00e0 ses l\u00e8vres palpitantes.\n\nLa premi\u00e8re vague d'orgasme la frappa de plein fouet. Ses ongles s'enfonc\u00e8rent f\u00e9rocement dans ma peau, son dos se cambra en un arc sublime et un cri d'une beaut\u00e9 sauvage et d\u00e9chirante s'\u00e9leva de sa gorge. Ses parois intimes se mirent \u00e0 pulser avec une violence d\u00e9licieuse, m'enserrant dans des spasmes r\u00e9p\u00e9t\u00e9s et br\u00fblants qui faisaient ployer mon endurance.\n\nSubmerg\u00e9 par son extase, incapable de retenir plus longtemps le flot br\u00fblant qui montait dans mes veines, je me laissai sombrer \u00e0 mon tour dans l'ab\u00eeme. D'une ultime pouss\u00e9e au plus profond de son sanctuaire, je lib\u00e9rai toute mon ardeur dans un spasme d\u00e9vastateur. Un rugissement sourd franchit mes l\u00e8vres tandis que nos \u00e2mes semblaient fusionner dans une explosion de lumi\u00e8re int\u00e9rieure, consumant nos peurs et nos doutes dans une ivresse absolue.\n\nNous rest\u00e2mes de longues minutes ainsi, \u00e9croul\u00e9s l'un contre l'autre, les corps tremblants et les c\u0153urs battant \u00e0 l'unisson comme deux tambours apr\u00e8s une bataille acharn\u00e9e. Le silence reprit ses droits dans la suite, seulement troubl\u00e9 par la plainte lointaine de l'orage et le murmure apais\u00e9 de nos souffles r\u00e9concili\u00e9s. Mais au moment m\u00eame o\u00f9 nos respirations commen\u00e7aient \u00e0 s'apaiser, le carillon \u00e9lectronique de l'ascenseur priv\u00e9 de l'\u00e9tage r\u00e9sonna avec un son cristallin : un badge d'acc\u00e8s de s\u00e9curit\u00e9 de niveau Administrateur venait de d\u00e9verrouiller le sas d'entr\u00e9e du penthouse.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9."}, {"id": "sakodo-nuit-interdite-ep5", "story_id": "sakodo-nuit-interdite", "saga": "Sakodo - Nuit Interdite", "episode_number": 5, "title": "L'Aube des Inavouables", "is_free": false, "price": 0.99, "wordCount": 2805, "isEbook": true, "content": "# Sakodo - Nuit Interdite\n\n### \u00c9pisode 5 : L'Aube des Inavouables\n\nLe son feutr\u00e9 du sas d'acc\u00e8s priv\u00e9 r\u00e9sonna dans le grand vestibule comme un coup de semonce. Quelqu'un venait d'entrer au soixante-dixi\u00e8me \u00e9tage, muni d'un code ma\u00eetre capable de contourner mes verrouillages les plus stricts. Dans le monde impitoyable de Neo-Kuro, une telle irruption n'annon\u00e7ait g\u00e9n\u00e9ralement rien de bon : une escouade de nettoyeurs d'actifs ou un \u00e9missaire de la direction venu ex\u00e9cuter une purge silencieuse.\n\nD'un r\u00e9flexe conditionn\u00e9 par des ann\u00e9es de parano\u00efa corporatiste, je me redressai en glissant ma main sous le chevet de satin sombre, l\u00e0 o\u00f9 reposait mon pistolet \u00e0 percussion cin\u00e9tique. Mais avant que mes doigts n'effleurent la crosse de titane, la main fine d'Elena se posa doucement sur mon poignet. Son contact \u00e9tait ti\u00e8de, apaisant, d'une autorit\u00e9 tranquille qui me d\u00e9sarma instantan\u00e9ment.\n\n\u2014 Ne tire pas, Sakodo, murmura-t-elle avec un calme d\u00e9concertant, un mince sourire flottant sur ses l\u00e8vres encore gonfl\u00e9es de nos baisers. C'est mon andro\u00efde de transport personnel. Je l'avais programm\u00e9 pour venir r\u00e9cup\u00e9rer les paquetages de donn\u00e9es avant le lever du jour, au cas o\u00f9 notre nuit aurait tourn\u00e9 court.\n\nUn soupir de soulagement teint\u00e9 d'une pointe d'agacement m'\u00e9chappa. Je laissai retomber ma t\u00eate contre l'oreiller d'anthracite, contemplant le visage d'Elena dans la lumi\u00e8re changeante du matin qui commen\u00e7ait \u00e0 poindre. La pluie battante s'\u00e9tait apais\u00e9e pour ne plus former qu'un rideau de brume fine et opaline sur les vitrages. Au loin, au-del\u00e0 des toits ac\u00e9r\u00e9s des m\u00e9gatours, le ciel noir virait lentement au gris perle et au rose cuivr\u00e9, avalant peu \u00e0 peu la fluorescence des n\u00e9ons nocturnes.\n\nElena \u00e9tait allong\u00e9e contre mon flanc, sa t\u00eate nich\u00e9e au creux de mon \u00e9paule. L'un de ses bras nus reposait en travers de ma poitrine, ses ongles tra\u00e7ant distraitement des cercles invisibles sur ma peau encore sensible. Nos corps d\u00e9gageaient cette odeur singuli\u00e8re et ent\u00eatante des amants repus, un m\u00e9lange de musc, de sueur s\u00e9ch\u00e9e et du parfum d'orchid\u00e9e noire qui ne me quitterait plus jamais.\n\n\u2014 La nuit est finie, constatai-je d'une voix basse, contemplant les premiers rayons de lumi\u00e8re froide qui frappaient les corniches de la tour Akasaka.\n\n\u2014 La nuit est finie, r\u00e9p\u00e9ta-t-elle doucement, mais rien ne sera plus jamais comme avant. Tu le sais aussi bien que moi, Sakodo. Nous avons br\u00fbl\u00e9 les ponts qui nous reliaient \u00e0 notre ancienne indiff\u00e9rence.\n\nElle releva la t\u00eate et plongea ses iris ambr\u00e9s dans les miens. Il n'y avait plus en elle la froideur calculatrice de l'agente d'infiltration, ni l'insolence bravache de celle qui d\u00e9fie la mort pour un frisson passager. Ce qui brillait dans son regard \u00e9tait un pacte indestructible, forg\u00e9 dans la sueur, les cris \u00e9touff\u00e9s et l'abandon absolu de deux \u00e2mes qui avaient consenti \u00e0 se perdre ensemble.\n\n\u2014 Tu as t\u00e9l\u00e9charg\u00e9 les secrets de Nakatomi ? lui demandai-je avec une lueur amus\u00e9e dans les yeux.\n\nElena laissa \u00e9chapper un rire cristallin, chaud et voluptueux, qui vibra agr\u00e9ablement contre ma poitrine. Elle se pencha au-dessus de moi, ses seins fermes effleurant mes pectoraux, ses cheveux en d\u00e9sordre tombant en une cascade sombre autour de nos visages.\n\n\u2014 Les secrets de Nakatomi ne valent rien \u00e0 c\u00f4t\u00e9 de ce que tu m'as offert cette nuit, Sakodo. Mais oui, le transfert a \u00e9t\u00e9 effectu\u00e9 pendant que nous \u00e9tions... occup\u00e9s \u00e0 des affaires infiniment plus urgentes. Les banques de donn\u00e9es sont d\u00e9j\u00e0 dispers\u00e9es sur douze serveurs miroirs en orbite basse.\n\nElle posa ses l\u00e8vres sur les miennes dans un baiser lent, suave, empreint d'une tendresse inattendue mais charg\u00e9 d'une promesse inalt\u00e9rable. C'\u00e9tait un baiser d'au revoir qui ressemblait davantage \u00e0 un commencement qu'\u00e0 un adieu. Ses l\u00e8vres avaient un go\u00fbt de sel et de miel sombre, une saveur qui resterait grav\u00e9e sur mes l\u00e8vres bien apr\u00e8s son d\u00e9part.\n\nElle se leva avec une gr\u00e2ce f\u00e9line, \u00e9tirant sa longue silhouette muscl\u00e9e dans la p\u00e2leur du matin naissant. Les marques pourpres de mes \u00e9treintes ponctuaient la courbe de ses hanches et de ses \u00e9paules comme des joyaux clandestins. Sans la moindre h\u00e2te, elle ramassa sa robe de soie carmin au pied du lit et l'enfila avec cette aisance naturelle qui m'avait fascin\u00e9 d\u00e8s son arriv\u00e9e. En nouant la bride d'or \u00e0 son \u00e9paule, elle se retourna vers moi, le regard flamboyant d'une malice irr\u00e9sistible.\n\n\u2014 D\u00e8s que la prochaine lune rouge recouvrira le district de Shinjuku, Sakodo... veille \u00e0 ce que ta baie vitr\u00e9e reste d\u00e9verrouill\u00e9e. Car je reviendrai r\u00e9clamer ce qui m'est d\u00e9sormais d\u00fb.\n\n\u2014 Elle le sera toujours pour toi, Elena, r\u00e9pondis-je sans l'ombre d'une h\u00e9sitation.\n\nElle s'avan\u00e7a vers le sas du penthouse, sa silhouette fi\u00e8re et magnifique se fondant dans la clart\u00e9 du corridor avant que les portes m\u00e9talliques ne se referment sans bruit sur son sillage de parfum d\u00e9fendu. Je restai seul dans le vaste appartement, \u00e9coutant le ronronnement sourd de la m\u00e9galopole qui reprenait vie.\n\nLe monde ext\u00e9rieur pouvait bien s'\u00e9veiller \u00e0 ses luttes d'argent, de pouvoir et de faux-semblants ; d\u00e9sormais, mon destin \u00e9tait scell\u00e9. J'avais go\u00fbt\u00e9 au vertige des r\u00e9cits inavouables, et nulle force au monde ne pourrait m'arracher \u00e0 cette nuit \u00e9ternelle.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9.\n\nCe d\u00e9sir n'\u00e9tait pas une faiblesse ; il \u00e9tait la seule r\u00e9bellion authentique qui lui restait dans un monde enti\u00e8rement calibr\u00e9 pour l'ob\u00e9issance et la rentabilit\u00e9. En c\u00e9dant \u00e0 cette attirance magn\u00e9tique, en accueillant Elena dans l'intimit\u00e9 de son refuge, Sakodo avait choisi de r\u00e9clamer son humanit\u00e9, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensit\u00e9 interdite. La peur du lendemain s'\u00e9tait dissoute dans l'\u00e9vidence de l'instant pr\u00e9sent, laissant place \u00e0 une lucidit\u00e9 f\u00e9roce et sereine.\n\nLes ombres qui dansaient au plafond composaient une chor\u00e9graphie silencieuse, t\u00e9moin des serments tacites conclus entre deux \u00eatres qui avaient tout \u00e0 perdre mais qui avaient pr\u00e9f\u00e9r\u00e9 tout risquer. Dans cette atmosph\u00e8re satur\u00e9e d'ar\u00f4mes d'orchid\u00e9e et d'ozone ti\u00e8de, le silence n'\u00e9tait pas un vide, mais une pl\u00e9nitude vibrante o\u00f9 chaque pulsation du c\u0153ur battait comme un d\u00e9fi lanc\u00e9 \u00e0 la nuit et \u00e0 la fatalit\u00e9 urbaine.\n\nDans les replis de la conscience de Sakodo, chaque sensation v\u00e9cue lors de cette nuit \u00e0 Neo-Kuro prenait la dimension d'un serment grav\u00e9 dans la mati\u00e8re m\u00eame de son \u00eatre. La m\u00e9moire humaine, dans cette \u00e8re domin\u00e9e par les circuits imprim\u00e9s et les sauvegardes synaptiques sur serveurs quantiques, \u00e9tait devenue une denr\u00e9e p\u00e9rissable et falsifiable. Pourtant, la m\u00e9moire de la peau, la vibration du souffle chaud partag\u00e9 dans la p\u00e9nombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient \u00eatre ni effac\u00e9s ni pirat\u00e9s par aucun algorithme. C'\u00e9tait l\u00e0 le v\u00e9ritable myst\u00e8re des r\u00e9cits inavouables : une v\u00e9rit\u00e9 pure, visc\u00e9rale, qui d\u00e9fiait toutes les lois et toutes les morales conventionnelles.\n\nL'\u00e9cho de cette rencontre r\u00e9sonnait dans chaque recoin de l'appartement suspendu. Les murs de b\u00e9ton cir\u00e9 et les panneaux de verre tremp\u00e9 semblaient avoir absorb\u00e9 l'intensit\u00e9 des regards \u00e9chang\u00e9s et des aveux murmur\u00e9s \u00e0 demi-mot. Au dehors, la pluie continuait de draper la m\u00e9tropole d'un linceul iridescent, refl\u00e9tant les n\u00e9ons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitr\u00e9e semblait marquer le tempo d'un temps nouveau, un temps affranchi des imp\u00e9ratifs corporatistes et des calculs d'opportunit\u00e9."}];

// ============================================================================
// 4. RÉCUPÉRATION SUPABASE (HISTOIRES & ÉPISODES)
// ============================================================================

async function fetchStoriesFromSupabase() {
  if (!supabaseClient) {
    loadLocalStories();
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("stories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Table stories Supabase non accessible ou inexistante :", error.message);
      loadLocalStories();
      return;
    }

    const remoteStories = data || [];
    const hasOfficial = remoteStories.some(s => s.id === SAKODO_SAGA_DATA.id || s.slug === "sakodo-nuit-interdite" || (s.title && s.title.includes("Sakodo")));
    APP_STATE.stories = hasOfficial ? remoteStories : [SAKODO_SAGA_DATA, ...remoteStories];
    renderStoriesGrid();
    renderTopCreators();
    updateDashboardStats();
  } catch (err) {
    console.error("Erreur récupération Supabase :", err);
    loadLocalStories();
  }
}

function loadLocalStories() {
  const localStories = JSON.parse(localStorage.getItem("recits_inavouables_stories") || "[]");
  // Toujours inclure la saga officielle Sakodo
  const combined = [SAKODO_SAGA_DATA, ...localStories.filter(s => s.id !== SAKODO_SAGA_DATA.id)];
  APP_STATE.stories = combined;
  renderStoriesGrid();
  renderTopCreators();
  updateDashboardStats();
}

async function fetchEpisodesForStory(storyId) {
  if (storyId === "sakodo-nuit-interdite" || (typeof storyId === "string" && storyId.includes("sakodo"))) {
    return SAKODO_EPISODES_DATA;
  }

  if (!supabaseClient) {
    return getLocalEpisodesForStory(storyId);
  }

  try {
    const { data, error } = await supabaseClient
      .from("episodes")
      .select("*")
      .eq("story_id", storyId)
      .order("episode_number", { ascending: true });

    if (error || !data || data.length === 0) {
      return getLocalEpisodesForStory(storyId);
    }
    return data;
  } catch (e) {
    return getLocalEpisodesForStory(storyId);
  }
}

function getLocalEpisodesForStory(storyId) {
  if (storyId === "sakodo-nuit-interdite") {
    return SAKODO_EPISODES_DATA;
  }
  const allStored = JSON.parse(localStorage.getItem("recits_inavouables_episodes") || "[]");
  return allStored.filter(ep => ep.story_id === storyId).sort((a, b) => a.episode_number - b.episode_number);
}

async function createStoryInSupabase(storyData) {
  let created = null;

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("stories")
        .insert([storyData])
        .select();

      if (!error && data && data.length > 0) {
        created = data[0];
      } else {
        console.warn("Supabase insert notice :", error?.message);
      }
    } catch (e) {
      console.warn("Supabase insert offline :", e);
    }
  }

  if (!created) {
    created = {
      ...storyData,
      id: "story-" + Date.now(),
      created_at: new Date().toISOString(),
      views: 0
    };
    APP_STATE.stories.unshift(created);
    localStorage.setItem("recits_inavouables_stories", JSON.stringify(APP_STATE.stories));
  } else {
    APP_STATE.stories.unshift(created);
  }

  renderStoriesGrid();
  renderTopCreators();
  updateDashboardStats();
  return created;
}

async function createEpisodeInSupabase(episodeData) {
  let created = null;

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("episodes")
        .insert([episodeData])
        .select();

      if (!error && data && data.length > 0) {
        created = data[0];
      }
    } catch (e) {
      console.warn("Supabase episode error :", e);
    }
  }

  if (!created) {
    created = {
      ...episodeData,
      id: "ep-" + Date.now()
    };
    const stored = JSON.parse(localStorage.getItem("recits_inavouables_episodes") || "[]");
    stored.push(created);
    localStorage.setItem("recits_inavouables_episodes", JSON.stringify(stored));
  }

  updateDashboardStats();
  return created;
}

// ============================================================================
// 5. AUTHENTIFICATION : CRÉATEURS UNIQUEMENT
// ============================================================================

function setupAuth() {
  document.getElementById("tabLoginBtn").addEventListener("click", () => {
    document.getElementById("tabLoginBtn").classList.add("active");
    document.getElementById("tabSignupBtn").classList.remove("active");
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("signupForm").classList.remove("active");
  });

  document.getElementById("tabSignupBtn").addEventListener("click", () => {
    document.getElementById("tabSignupBtn").classList.add("active");
    document.getElementById("tabLoginBtn").classList.remove("active");
    document.getElementById("signupForm").classList.add("active");
    document.getElementById("loginForm").classList.remove("active");
  });

  // Connexion Créateur
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    showToast("Connexion au Studio Créateur...", "info");

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) {
          showToast("Erreur: " + error.message, "error");
          return;
        }
        if (data && data.user) {
          const username = data.user.user_metadata?.username || email.split("@")[0];
          setUserSession({
            id: data.user.id,
            email: data.user.email,
            username: username,
            role: "creator"
          });
          closeAuthModal();
          showToast(`Bienvenue dans votre Studio, ${username} !`, "success");
          switchTab("dashboard");
          return;
        }
      } catch (err) {
        showToast("Erreur de connexion : " + err.message, "error");
      }
    }

    // Fallback local
    setUserSession({
      id: "creator-" + Date.now(),
      email,
      username: email.split("@")[0],
      role: "creator"
    });
    closeAuthModal();
    showToast(`Connecté en tant que Créateur : ${email}`, "success");
    switchTab("dashboard");
  });

  // Inscription Créateur
  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const primaryGenre = document.getElementById("signupPrimaryGenre").value;

    showToast("Création du profil Créateur...", "info");

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
              role: "creator",
              primary_genre: primaryGenre
            }
          }
        });

        if (error) {
          showToast("Erreur d'inscription : " + error.message, "error");
          return;
        }

        if (data && data.user) {
          setUserSession({
            id: data.user.id,
            email: data.user.email,
            username: username,
            role: "creator",
            primaryGenre: primaryGenre
          });
          closeAuthModal();
          showToast(`Compte Créateur créé ! Bienvenue ${username}.`, "success");
          switchTab("dashboard");
          return;
        }
      } catch (err) {
        showToast("Erreur : " + err.message, "error");
      }
    }

    // Fallback local
    setUserSession({
      id: "creator-" + Date.now(),
      email,
      username,
      role: "creator",
      primaryGenre: primaryGenre
    });
    closeAuthModal();
    showToast(`Compte Créateur créé pour ${username} !`, "success");
    switchTab("dashboard");
  });

  // Quick Demo Creator Switch
  document.getElementById("demoCreatorBtn").addEventListener("click", () => {
    setUserSession({
      id: "creator-demo-inavouable",
      email: "auteur@recits-inavouables.com",
      username: "Plume Inavouable",
      role: "creator"
    });
    closeAuthModal();
    showToast("Profil Créateur Démo activé !", "success");
    switchTab("dashboard");
  });
}

function setUserSession(user) {
  APP_STATE.currentUser = user;
  localStorage.setItem("recits_inavouables_user", JSON.stringify(user));
  updateUserUI();
}

function updateUserUI() {
  const container = document.getElementById("authNavContainer");
  const user = APP_STATE.currentUser;

  if (user && user.role === "creator") {
    container.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <div style="text-align:right;">
          <div style="font-size:0.85rem; font-weight:700; color:var(--text-main); line-height:1.1;">${escapeHtml(user.username)}</div>
          <div style="font-size:0.7rem; color:var(--accent-purple); font-weight:700;">Créateur</div>
        </div>
        <button class="btn-icon" id="logoutBtn" title="Déconnexion"><i class="fa-solid fa-power-off"></i></button>
      </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      APP_STATE.currentUser = null;
      localStorage.removeItem("recits_inavouables_user");
      if (supabaseClient) {
        supabaseClient.auth.signOut();
      }
      updateUserUI();
      switchTab("home");
      showToast("Déconnecté du Studio Créateur.", "info");
    });

    const dashAuthorName = document.getElementById("dashAuthorName");
    const dashEmail = document.getElementById("dashEmail");
    if (dashAuthorName) dashAuthorName.textContent = user.username;
    if (dashEmail) dashEmail.textContent = user.email;

  } else {
    container.innerHTML = `
      <button class="btn btn-outline" id="openAuthModalBtn">
        <i class="fa-solid fa-feather-pointed"></i> <span>Espace Créateur</span>
      </button>
    `;
    document.getElementById("openAuthModalBtn").addEventListener("click", openAuthModal);
  }
}

function openAuthModal() {
  document.getElementById("authModal").classList.add("active");
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("active");
}

// ============================================================================
// 6. RENDU DE LA PAGE D'ACCUEIL (LISTE DES RÉCITS & TOP CRÉATEURS)
// ============================================================================

function renderStoriesGrid() {
  const grid = document.getElementById("storiesGrid");
  const countBadge = document.getElementById("storiesCountBadge");
  if (!grid) return;

  let filtered = APP_STATE.stories;

  if (APP_STATE.activeGenre !== "all") {
    filtered = filtered.filter(s => s.genre && s.genre.toLowerCase() === APP_STATE.activeGenre.toLowerCase());
  }

  if (APP_STATE.searchQuery) {
    const q = APP_STATE.searchQuery.toLowerCase();
    filtered = filtered.filter(s => 
      (s.title && s.title.toLowerCase().includes(q)) ||
      (s.author_name && s.author_name.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q))
    );
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} récit${filtered.length > 1 ? "s" : ""}`;
  }

  // Si la plateforme est vierge ou aucun récit ne correspond
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="virgin-platform-card">
        <div class="virgin-icon-glow">
          <i class="fa-solid fa-feather-pointed"></i>
        </div>
        <h3 class="virgin-title">L'encrier est encore frais...</h3>
        <p class="virgin-desc">
          Aucun récit n'est encore publié. La plateforme est vierge : nous laissons le choix aux créateurs d'y déposer leurs œuvres sombres, érotiques ou taboues, soumises à vérification manuelle.
        </p>
        <div class="virgin-actions">
          <button class="btn btn-primary" id="virginCreateBtn">
            <i class="fa-solid fa-pen-nib"></i> Publier le premier récit (Créateur)
          </button>
        </div>
      </div>
    `;

    const createBtn = document.getElementById("virginCreateBtn");
    if (createBtn) {
      createBtn.addEventListener("click", () => {
        if (APP_STATE.currentUser && APP_STATE.currentUser.role === "creator") {
          switchTab("dashboard");
          document.getElementById("newStoryModal").classList.add("active");
        } else {
          openAuthModal();
          document.getElementById("tabSignupBtn").click();
        }
      });
    }
    return;
  }

  grid.innerHTML = filtered.map(story => {
    const isErotisme = story.genre === "Érotisme";
    const isTabou = story.genre === "Tabou";
    const genreClass = isErotisme ? "genre-erotisme" : (isTabou ? "genre-tabou" : "");

    const statusBadge = story.status === "pending"
      ? `<span class="story-status-pill pending"><i class="fa-solid fa-hourglass-half"></i> En vérification</span>`
      : "";

    return `
      <article class="story-card" data-story-id="${story.id}">
        <div class="story-cover-box">
          <img class="story-cover-img" src="${escapeHtml(story.cover_url || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80')}" alt="${escapeHtml(story.title)}" loading="lazy">
          <div class="story-cover-overlay"></div>
          <span class="story-genre-badge ${genreClass}">${escapeHtml(story.genre || 'Inavouable')}</span>
          <span class="story-free-badge"><i class="fa-solid fa-gift"></i> Ép. 1 Libre</span>
          ${story.isEbook ? `<span class="story-ebook-badge"><i class="fa-solid fa-book-bookmark"></i> ${escapeHtml(story.badge || "EBOOK 5 x 3000 mots")}</span>` : ""}
        </div>
        
        <div class="story-card-body">
          ${statusBadge}
          <h3 class="story-card-title">${escapeHtml(story.title)}</h3>
          <div class="story-card-author">
            <i class="fa-solid fa-feather-pointed text-purple"></i> ${escapeHtml(story.author_name || 'Auteur Inavouable')}
          </div>
          <p class="story-card-desc">${escapeHtml(story.description)}</p>
          
          <div class="story-card-footer">
            <div class="story-episodes-info">
              <i class="fa-solid fa-eye text-cyan"></i> <strong>${story.views || 0}</strong> lectures
            </div>
            <button class="btn btn-primary btn-sm read-story-btn" data-story-id="${story.id}">
              <span>Lire</span> <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll(".read-story-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const storyId = btn.getAttribute("data-story-id");
      openReaderForStory(storyId);
    });
  });

  grid.querySelectorAll(".story-card").forEach(card => {
    card.addEventListener("click", () => {
      const storyId = card.getAttribute("data-story-id");
      openReaderForStory(storyId);
    });
  });
}

function renderTopCreators() {
  const container = document.getElementById("topCreatorsList");
  const fullLeaderboard = document.getElementById("fullLeaderboard");

  const authorStats = {};
  APP_STATE.stories.forEach(s => {
    const author = s.author_name || "Auteur Inavouable";
    if (!authorStats[author]) {
      authorStats[author] = {
        name: author,
        views: 0,
        storiesCount: 0
      };
    }
    authorStats[author].views += (s.views || 0);
    authorStats[author].storiesCount += 1;
  });

  const sortedAuthors = Object.values(authorStats).sort((a, b) => b.views - a.views);

  const defaultAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  ];

  if (container) {
    if (sortedAuthors.length === 0) {
      container.innerHTML = `
        <div class="empty-creators-box">
          <i class="fa-solid fa-crown text-gold"></i>
          <p>Le classement hebdomadaire s'affichera dès les premières publications des créateurs.</p>
        </div>
      `;
    } else {
      const top3 = sortedAuthors.slice(0, 3);
      container.innerHTML = top3.map((a, index) => {
        const avatar = defaultAvatars[index % defaultAvatars.length];
        const rankBadge = index === 0 
          ? `<div class="rank-badge top-1"><i class="fa-solid fa-crown"></i> #1 Semaine</div>`
          : `<div class="rank-badge">#${index + 1}</div>`;

        return `
          <div class="creator-card-item">
            ${rankBadge}
            <div class="creator-avatar-wrap">
              <img class="creator-img" src="${avatar}" alt="${escapeHtml(a.name)}">
            </div>
            <div class="creator-info-block">
              <h4>${escapeHtml(a.name)}</h4>
              <div class="creator-meta-stats">
                <span><i class="fa-solid fa-book"></i> ${a.storiesCount} récit(s)</span>
                <span><i class="fa-solid fa-eye text-cyan"></i> ${a.views} vues</span>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  if (fullLeaderboard) {
    if (sortedAuthors.length === 0) {
      fullLeaderboard.innerHTML = `
        <div class="empty-creators-box">
          <i class="fa-solid fa-scroll text-purple"></i>
          <p>Aucun auteur n'a encore publié de récit. Soyez le premier créateur à inaugurer le panthéon !</p>
        </div>
      `;
    } else {
      fullLeaderboard.innerHTML = sortedAuthors.map((a, index) => {
        const avatar = defaultAvatars[index % defaultAvatars.length];
        return `
          <div class="leaderboard-item">
            <div style="display:flex; align-items:center; gap:16px;">
              <div style="font-size:1.3rem; font-weight:900; color:${index === 0 ? 'var(--accent-gold)' : 'var(--text-muted)'}; width:32px;">
                #${index + 1}
              </div>
              <img class="creator-img" src="${avatar}" alt="${escapeHtml(a.name)}">
              <div>
                <h3 style="font-size:1.05rem; font-weight:700;">${escapeHtml(a.name)}</h3>
                <p style="font-size:0.8rem; color:var(--text-dim);">${a.storiesCount} récit(s) publié(s)</p>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:1.15rem; font-weight:800; color:var(--accent-cyan);">${a.views} <small style="font-size:0.75rem; color:var(--text-dim);">lectures</small></div>
              <div style="font-size:0.78rem; color:var(--accent-green); font-weight:600;"><i class="fa-solid fa-check-double"></i> Plume Active</div>
            </div>
          </div>
        `;
      }).join("");
    }
  }
}

// ============================================================================
// 7. LECTURE SANS INSCRIPTION & PAIEMENT CRYPTO NOWPAYMENTS
// ============================================================================

async function openReaderForStory(storyId) {
  const story = APP_STATE.stories.find(s => s.id === storyId);
  if (!story) return;

  APP_STATE.activeStory = story;

  const episodes = await fetchEpisodesForStory(storyId);
  APP_STATE.episodes = episodes;

  document.getElementById("readerStoryTitle").textContent = story.title;
  document.getElementById("readerAuthorName").textContent = story.author_name || "Auteur Inavouable";
  document.getElementById("readerGenre").textContent = story.genre || "Fiction";
  document.getElementById("readerDesc").textContent = story.description || "";
  document.getElementById("readerCoverImg").src = story.cover_url || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80";

  renderEpisodesPills();

  if (episodes && episodes.length > 0) {
    loadEpisode(episodes[0]);
  } else {
    document.getElementById("readerEpTitle").textContent = "Aucun chapitre disponible";
    document.getElementById("readerContentBody").innerHTML = `<p style="color:var(--text-dim);">L'auteur n'a pas encore ajouté de chapitre à ce récit.</p>`;
    document.getElementById("readerPaywallBox").style.display = "none";
  }

  story.views = (story.views || 0) + 1;
  if (supabaseClient) {
    supabaseClient.from("stories").update({ views: story.views }).eq("id", story.id);
  }

  switchTab("reader");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderEpisodesPills() {
  const container = document.getElementById("episodesPillsContainer");
  if (!container) return;

  container.innerHTML = APP_STATE.episodes.map(ep => {
    const isUnlocked = ep.is_free || APP_STATE.unlockedEpisodes[ep.id];
    const isFree = ep.is_free || ep.episode_number === 1;

    let badge = "";
    if (isFree) {
      badge = `<span class="pill-badge free">Libre</span>`;
    } else if (isUnlocked) {
      badge = `<span class="pill-badge free"><i class="fa-solid fa-unlock"></i> Débloqué</span>`;
    } else {
      badge = `<span class="pill-badge locked"><i class="fa-solid fa-lock"></i> $0.99</span>`;
    }

    const isActive = APP_STATE.activeEpisode && APP_STATE.activeEpisode.id === ep.id;

    return `
      <button class="episode-pill ${isActive ? 'active' : ''}" data-ep-id="${ep.id}">
        <span>Épisode ${ep.episode_number}</span>
        ${badge}
      </button>
    `;
  }).join("");

  container.querySelectorAll(".episode-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      const epId = btn.getAttribute("data-ep-id");
      const targetEp = APP_STATE.episodes.find(e => e.id === epId);
      if (targetEp) {
        loadEpisode(targetEp);
      }
    });
  });
}

function loadEpisode(episode) {
  APP_STATE.activeEpisode = episode;
  renderEpisodesPills();

  document.getElementById("readerEpNumberBadge").textContent = `Épisode ${episode.episode_number}`;
  document.getElementById("readerEpTitle").textContent = episode.title;

  const contentBody = document.getElementById("readerContentBody");
  const paywallBox = document.getElementById("readerPaywallBox");

  const isFree = episode.is_free || episode.episode_number === 1;
  const isUnlocked = isFree || APP_STATE.unlockedEpisodes[episode.id];

  if (isUnlocked) {
    contentBody.style.display = "block";
    paywallBox.style.display = "none";
    contentBody.innerHTML = formatStoryContent(episode.content);
  } else {
    // Épisode payant non débloqué
    contentBody.style.display = "none";
    paywallBox.style.display = "block";
    document.getElementById("paywallPriceVal").textContent = (episode.price || 0.99).toFixed(2);
  }

  const currentIndex = APP_STATE.episodes.findIndex(e => e.id === episode.id);
  const prevBtn = document.getElementById("readerPrevEpBtn");
  const nextBtn = document.getElementById("readerNextEpBtn");

  prevBtn.disabled = currentIndex <= 0;
  nextBtn.disabled = currentIndex >= APP_STATE.episodes.length - 1;

  if (episode.isEbook || APP_STATE.activeStory?.isEbook) {
    if (currentIndex > 0) {
      prevBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> <span>Épisode ${APP_STATE.episodes[currentIndex - 1].episode_number}</span>`;
    } else {
      prevBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> <span>Premier Épisode</span>`;
    }

    if (currentIndex < APP_STATE.episodes.length - 1) {
      const nextEp = APP_STATE.episodes[currentIndex + 1];
      const isNextUnlocked = nextEp.is_free || APP_STATE.unlockedEpisodes[nextEp.id];
      nextBtn.innerHTML = `<span>Épisode ${nextEp.episode_number} ${isNextUnlocked ? '' : '🔒'}</span> <i class="fa-solid fa-arrow-right"></i>`;
    } else {
      nextBtn.innerHTML = `<span>Fin de l'Ebook</span> <i class="fa-solid fa-check"></i>`;
    }
  }

  prevBtn.onclick = () => {
    if (currentIndex > 0) {
      loadEpisode(APP_STATE.episodes[currentIndex - 1]);
      document.getElementById("readerPaper").scrollIntoView({ behavior: "smooth" });
    }
  };

  nextBtn.onclick = () => {
    if (currentIndex < APP_STATE.episodes.length - 1) {
      loadEpisode(APP_STATE.episodes[currentIndex + 1]);
      document.getElementById("readerPaper").scrollIntoView({ behavior: "smooth" });
    }
  };
}

function formatStoryContent(text) {
  if (!text) return "<p>Chapitre en cours de rédaction...</p>";
  return text
    .split("\n\n")
    .map(p => {
      let trimmed = p.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("# ")) {
        return `<h2 style="font-family:var(--font-display); font-size:1.5rem; color:#f1f5f9; margin-bottom:12px; border-bottom:1px solid var(--border-subtle); padding-bottom:8px;">${escapeHtml(trimmed.slice(2))}</h2>`;
      }
      if (trimmed.startsWith("### ")) {
        return `<h3 style="font-family:var(--font-display); font-size:1.2rem; color:#c084fc; margin-bottom:16px;">${escapeHtml(trimmed.slice(4))}</h3>`;
      }
      return `<p>${escapeHtml(trimmed)}</p>`;
    })
    .filter(Boolean)
    .join("");
}

function openNowPaymentsCheckout() {
  if (!APP_STATE.activeEpisode || !APP_STATE.activeStory) return;

  const modal = document.getElementById("nowPaymentsModal");
  document.getElementById("checkoutStoryTitle").textContent = APP_STATE.activeStory.title;
  document.getElementById("checkoutEpTitle").textContent = `${APP_STATE.activeEpisode.title} (Épisode ${APP_STATE.activeEpisode.episode_number})`;
  document.getElementById("checkoutPriceVal").textContent = (APP_STATE.activeEpisode.price || 0.99).toFixed(2);

  modal.classList.add("active");
}

function unlockCurrentEpisode() {
  if (!APP_STATE.activeEpisode) return;

  APP_STATE.unlockedEpisodes[APP_STATE.activeEpisode.id] = true;
  localStorage.setItem("recits_inavouables_unlocked", JSON.stringify(APP_STATE.unlockedEpisodes));

  showToast(`Chapitre débloqué avec succès ! Bonne lecture.`, "success");
  document.getElementById("nowPaymentsModal").classList.remove("active");
  loadEpisode(APP_STATE.activeEpisode);
}

// ============================================================================
// 8. STUDIO CRÉATEUR
// ============================================================================

function updateDashboardStats() {
  const myStories = APP_STATE.stories.filter(s => 
    s.author_id === APP_STATE.currentUser?.id || 
    s.author_name === APP_STATE.currentUser?.username
  );

  const statStoriesCount = document.getElementById("statStoriesCount");
  const statEpisodesCount = document.getElementById("statEpisodesCount");
  const statTotalViews = document.getElementById("statTotalViews");
  const statEstimatedEarnings = document.getElementById("statEstimatedEarnings");

  const totalStories = myStories.length;
  let totalViews = 0;
  myStories.forEach(s => totalViews += (s.views || 0));

  const allStoredEpisodes = JSON.parse(localStorage.getItem("recits_inavouables_episodes") || "[]");
  const myStoryIds = new Set(myStories.map(s => s.id));
  const myEpisodes = allStoredEpisodes.filter(e => myStoryIds.has(e.story_id));

  const estimatedPaid = Math.round(totalViews * 0.1);
  const earnings = (estimatedPaid * 0.99).toFixed(2);

  if (statStoriesCount) statStoriesCount.textContent = totalStories;
  if (statEpisodesCount) statEpisodesCount.textContent = myEpisodes.length;
  if (statTotalViews) statTotalViews.textContent = totalViews;
  if (statEstimatedEarnings) statEstimatedEarnings.textContent = `$${earnings}`;

  renderCreatorStoriesList(myStories, myEpisodes);
}

function renderCreatorStoriesList(stories, episodes) {
  const container = document.getElementById("creatorStoriesList");
  if (!container) return;

  if (stories.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; color:var(--text-dim);">
        <p>Vous n'avez pas encore soumis de récit.</p>
        <button class="btn btn-primary btn-sm mt-3" id="dashEmptyCreateBtn">
          <i class="fa-solid fa-plus"></i> Rédiger mon premier récit inavouable
        </button>
      </div>
    `;
    const emptyBtn = document.getElementById("dashEmptyCreateBtn");
    if (emptyBtn) emptyBtn.addEventListener("click", () => document.getElementById("newStoryModal").classList.add("active"));
    return;
  }

  container.innerHTML = stories.map(story => {
    const epCount = episodes.filter(e => e.story_id === story.id).length;
    const statusText = story.status === "approved" ? "Approuvé" : "En vérification manuelle";
    const statusClass = story.status === "approved" ? "approved" : "pending";

    return `
      <div class="creator-story-row">
        <div class="creator-story-meta">
          <img class="creator-story-thumb" src="${escapeHtml(story.cover_url || '')}" alt="${escapeHtml(story.title)}">
          <div>
            <div style="font-weight:700; font-size:1rem;">${escapeHtml(story.title)}</div>
            <div style="font-size:0.8rem; color:var(--text-dim); display:flex; gap:12px; margin-top:3px; flex-wrap:wrap;">
              <span><i class="fa-solid fa-tags text-purple"></i> ${escapeHtml(story.genre)}</span>
              <span><i class="fa-solid fa-layer-group"></i> ${epCount} chapitres</span>
              <span><i class="fa-solid fa-eye text-cyan"></i> ${story.views || 0} lectures</span>
              <span class="story-status-pill ${statusClass}"><i class="fa-solid fa-shield-halved"></i> ${statusText}</span>
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn-sm btn-ghost add-ep-to-story-btn" data-story-id="${story.id}">
            <i class="fa-solid fa-plus"></i> Épisode
          </button>
          <button class="btn-sm btn-primary read-my-story-btn" data-story-id="${story.id}">
            <i class="fa-solid fa-eye"></i> Aperçu
          </button>
        </div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".add-ep-to-story-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const storyId = btn.getAttribute("data-story-id");
      openNewEpisodeModalForStory(storyId);
    });
  });

  container.querySelectorAll(".read-my-story-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const storyId = btn.getAttribute("data-story-id");
      openReaderForStory(storyId);
    });
  });
}

function openNewEpisodeModalForStory(preselectedStoryId = null) {
  const select = document.getElementById("newEpisodeStorySelect");
  if (!select) return;

  select.innerHTML = '<option value="">-- Choisir un récit --</option>' +
    APP_STATE.stories.map(s => `
      <option value="${s.id}" ${s.id === preselectedStoryId ? 'selected' : ''}>
        ${escapeHtml(s.title)} (${escapeHtml(s.genre)})
      </option>
    `).join("");

  if (preselectedStoryId) {
    const existing = getLocalEpisodesForStory(preselectedStoryId);
    const nextNum = existing.length + 1;
    document.getElementById("newEpisodeNumber").value = nextNum;
    const isFreeCheckbox = document.getElementById("newEpisodeIsFree");
    isFreeCheckbox.checked = (nextNum === 1);
  }

  document.getElementById("newEpisodeModal").classList.add("active");
}

// ============================================================================
// 8b. GESTION DES FICHIERS LOURDS & DRAG & DROP (JUSQU'À 50MB, MAMMOTH, STATS)
// ============================================================================

const importedFileState = {
  content: "",
  fileName: "",
  fileSize: "",
  fileSizeBytes: 0,
  wordCount: 0,
  charCount: 0
};

function formatBytes(bytes) {
  if (bytes === 0) return "0 Octet";
  const k = 1024;
  const sizes = ["Octets", "Ko", "Mo", "Go"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function setupFileDropZone() {
  const dropZone = document.getElementById("storyDropZone");
  const fileInput = document.getElementById("storyFileInput");
  const removeBtn = document.getElementById("removeImportedFileBtn");
  const togglePreviewBtn = document.getElementById("toggleFullPreviewBtn");
  const closeFullPreviewBtn = document.getElementById("closeFullPreviewModalBtn");
  const confirmFullPreviewCloseBtn = document.getElementById("confirmFullPreviewCloseBtn");

  if (!dropZone || !fileInput) return;

  dropZone.addEventListener("click", () => fileInput.click());

  ["dragenter", "dragover"].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove("dragover");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      handleStoryFileUpload(dt.files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleStoryFileUpload(e.target.files[0]);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      resetImportedFile();
    });
  }

  if (togglePreviewBtn) {
    togglePreviewBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!importedFileState.content) return;
      document.getElementById("fullPreviewTextBody").textContent = importedFileState.content;
      document.getElementById("fullPreviewMeta").textContent = `${importedFileState.fileName} • ${importedFileState.fileSize} • ${importedFileState.wordCount.toLocaleString()} mots • ${importedFileState.charCount.toLocaleString()} caractères`;
      document.getElementById("fullPreviewModal").classList.add("active");
    });
  }

  const closePreview = () => document.getElementById("fullPreviewModal").classList.remove("active");
  if (closeFullPreviewBtn) closeFullPreviewBtn.addEventListener("click", closePreview);
  if (confirmFullPreviewCloseBtn) confirmFullPreviewCloseBtn.addEventListener("click", closePreview);
}

function resetImportedFile() {
  importedFileState.content = "";
  importedFileState.fileName = "";
  importedFileState.fileSize = "";
  importedFileState.fileSizeBytes = 0;
  importedFileState.wordCount = 0;
  importedFileState.charCount = 0;

  const fileInput = document.getElementById("storyFileInput");
  if (fileInput) fileInput.value = "";
  const card = document.getElementById("fileImportedCard");
  if (card) card.style.display = "none";
  const dropPrompt = document.getElementById("dropZonePrompt");
  if (dropPrompt) dropPrompt.style.display = "block";
  const progressBox = document.getElementById("uploadProgressBox");
  if (progressBox) progressBox.style.display = "none";
  const errorBox = document.getElementById("fileErrorMsg");
  if (errorBox) errorBox.style.display = "none";
}

function handleStoryFileUpload(file) {
  const errorBox = document.getElementById("fileErrorMsg");
  errorBox.style.display = "none";
  errorBox.textContent = "";

  // 1. Validation de taille max : 50MB
  const maxBytes = 50 * 1024 * 1024;
  if (file.size > maxBytes) {
    errorBox.textContent = "Fichier trop volumineux, max 50MB";
    errorBox.style.display = "block";
    showToast("Fichier trop volumineux, max 50MB", "error");
    return;
  }

  const progressBox = document.getElementById("uploadProgressBox");
  const progressBar = document.getElementById("uploadProgressBar");
  const progressText = document.getElementById("uploadProgressText");
  const dropPrompt = document.getElementById("dropZonePrompt");

  const isLarge = file.size > 1024 * 1024; // > 1MB
  if (isLarge) {
    progressBox.style.display = "block";
    dropPrompt.style.display = "none";
    progressBar.style.width = "10%";
    progressText.textContent = `Lecture de ${file.name} (${formatBytes(file.size)})...`;
  }

  const reader = new FileReader();

  if (isLarge) {
    reader.onprogress = (evt) => {
      if (evt.lengthComputable) {
        const percent = Math.round((evt.loaded / evt.total) * 100);
        progressBar.style.width = percent + "%";
        progressText.textContent = `Lecture en cours... ${percent}%`;
      }
    };
  }

  const ext = file.name.split(".").pop().toLowerCase();

  // DOCX handling via mammoth
  if (ext === "docx") {
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        if (window.mammoth && typeof window.mammoth.extractRawText === "function") {
          const result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
          processLoadedText(result.value, file);
        } else {
          const decoder = new TextDecoder("utf-8", { fatal: false });
          const text = decoder.decode(arrayBuffer);
          processLoadedText(text, file);
        }
      } catch (err) {
        errorBox.textContent = "Erreur lors de la lecture du fichier Word DOCX : " + err.message;
        errorBox.style.display = "block";
        progressBox.style.display = "none";
        dropPrompt.style.display = "block";
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    // TXT, MD, JSON, etc.
    reader.onload = (e) => {
      const text = e.target.result || "";
      processLoadedText(text, file);
    };
    reader.onerror = () => {
      errorBox.textContent = "Erreur lors de la lecture du fichier.";
      errorBox.style.display = "block";
      progressBox.style.display = "none";
      dropPrompt.style.display = "block";
    };
    reader.readAsText(file, "UTF-8");
  }
}

function processLoadedText(text, file) {
  const errorBox = document.getElementById("fileErrorMsg");
  const progressBox = document.getElementById("uploadProgressBox");
  const dropPrompt = document.getElementById("dropZonePrompt");
  const card = document.getElementById("fileImportedCard");

  progressBox.style.display = "none";

  const cleanText = (text || "").trim();

  // Validation : minimum 100 caractères
  if (cleanText.length < 100) {
    errorBox.textContent = "Fichier trop petit (minimum 100 caractères requis)";
    errorBox.style.display = "block";
    dropPrompt.style.display = "block";
    showToast("Fichier trop petit", "error");
    return;
  }

  const words = cleanText.split(/\s+/).filter(Boolean).length;
  const formattedSize = formatBytes(file.size);

  importedFileState.content = cleanText;
  importedFileState.fileName = file.name;
  importedFileState.fileSize = formattedSize;
  importedFileState.fileSizeBytes = file.size;
  importedFileState.wordCount = words;
  importedFileState.charCount = cleanText.length;

  document.getElementById("importedFileName").textContent = file.name;
  document.getElementById("importedFileSize").textContent = formattedSize;
  document.getElementById("importedWordCount").textContent = words.toLocaleString();
  document.getElementById("importedCharCount").textContent = cleanText.length.toLocaleString();
  document.getElementById("importedPreviewText").textContent = cleanText.slice(0, 500) + (cleanText.length > 500 ? "..." : "");

  card.style.display = "block";
  dropPrompt.style.display = "none";
  showToast(`Manuscrit "${file.name}" importé (${words.toLocaleString()} mots) !`, "success");
}

// ============================================================================
// 9. SETUP DES ÉVÉNEMENTS
// ============================================================================

function setupEventListeners() {
  document.getElementById("brandHomeBtn").addEventListener("click", () => switchTab("home"));
  document.getElementById("navHomeBtn").addEventListener("click", () => switchTab("home"));
  document.getElementById("navCreatorsBtn").addEventListener("click", () => switchTab("creators"));
  document.getElementById("viewAllCreatorsBtn")?.addEventListener("click", () => switchTab("creators"));
  
  document.getElementById("navDashboardBtn").addEventListener("click", () => {
    if (!APP_STATE.currentUser || APP_STATE.currentUser.role !== "creator") {
      openAuthModal();
      showToast("Veuillez vous identifier pour accéder au Studio Créateur.", "info");
      return;
    }
    switchTab("dashboard");
  });

  document.getElementById("heroStartReadingBtn").addEventListener("click", () => {
    document.getElementById("storiesGrid").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("heroCreatorBtn").addEventListener("click", () => {
    if (APP_STATE.currentUser && APP_STATE.currentUser.role === "creator") {
      switchTab("dashboard");
    } else {
      openAuthModal();
      document.getElementById("tabSignupBtn").click();
    }
  });

  document.getElementById("openCreatorSignupBtn").addEventListener("click", () => {
    openAuthModal();
    document.getElementById("tabSignupBtn").click();
  });

  // Language Toggle
  document.getElementById("langToggleBtn").addEventListener("click", () => {
    const next = currentLang === "fr" ? "en" : "fr";
    setLanguage(next);
    showToast(next === "fr" ? "Langue changée en Français" : "Language switched to English", "info");
  });

  // Search & Genres filter
  const searchInput = document.getElementById("storySearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  searchInput.addEventListener("input", (e) => {
    APP_STATE.searchQuery = e.target.value.trim();
    clearSearchBtn.style.display = APP_STATE.searchQuery ? "block" : "none";
    renderStoriesGrid();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    APP_STATE.searchQuery = "";
    clearSearchBtn.style.display = "none";
    renderStoriesGrid();
  });

  document.querySelectorAll("#genreFilters .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#genreFilters .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      APP_STATE.activeGenre = chip.getAttribute("data-genre");
      renderStoriesGrid();
    });
  });

  // Reader Controls
  document.getElementById("readerBackBtn").addEventListener("click", () => {
    switchTab("home");
  });

  document.getElementById("fontIncreaseBtn").addEventListener("click", () => {
    if (APP_STATE.fontSize < 1.6) {
      APP_STATE.fontSize += 0.1;
      document.getElementById("readerContentBody").style.fontSize = APP_STATE.fontSize + "rem";
    }
  });

  document.getElementById("fontDecreaseBtn").addEventListener("click", () => {
    if (APP_STATE.fontSize > 0.9) {
      APP_STATE.fontSize -= 0.1;
      document.getElementById("readerContentBody").style.fontSize = APP_STATE.fontSize + "rem";
    }
  });

  document.getElementById("shareStoryBtn").addEventListener("click", () => {
    if (navigator.share && APP_STATE.activeStory) {
      navigator.share({
        title: APP_STATE.activeStory.title,
        text: `Lis "${APP_STATE.activeStory.title}" sur Récits Inavouables`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Lien copié dans le presse-papiers !", "success");
    }
  });

  // NOWPayments Paywall Buttons
  document.getElementById("nowPaymentsPayBtn").addEventListener("click", openNowPaymentsCheckout);
  document.getElementById("simulatePaymentUnlockBtn").addEventListener("click", unlockCurrentEpisode);
  document.getElementById("modalSimulateSuccessBtn").addEventListener("click", unlockCurrentEpisode);

  document.getElementById("confirmNowPaymentsRedirectBtn").addEventListener("click", () => {
    const targetUrl = `https://nowpayments.io/payment/?price_amount=0.99&price_currency=usd&order_id=INAVOUABLE_${Date.now()}`;
    window.open(targetUrl, "_blank");
    showToast("Redirection vers la passerelle sécurisée NOWPayments...", "info");
    setTimeout(() => {
      unlockCurrentEpisode();
    }, 2500);
  });

  document.querySelectorAll(".crypto-radio-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".crypto-radio-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
    });
  });

  // Modal Closers
  document.getElementById("closeAuthModalBtn").addEventListener("click", closeAuthModal);
  document.getElementById("closeNowPaymentsModalBtn").addEventListener("click", () => {
    document.getElementById("nowPaymentsModal").classList.remove("active");
  });
  document.getElementById("closeNewStoryModalBtn").addEventListener("click", () => {
    document.getElementById("newStoryModal").classList.remove("active");
  });
  document.getElementById("cancelNewStoryBtn").addEventListener("click", () => {
    document.getElementById("newStoryModal").classList.remove("active");
  });
  document.getElementById("closeNewEpisodeModalBtn").addEventListener("click", () => {
    document.getElementById("newEpisodeModal").classList.remove("active");
  });
  document.getElementById("cancelNewEpisodeBtn").addEventListener("click", () => {
    document.getElementById("newEpisodeModal").classList.remove("active");
  });

  // Dashboard modal openers
  document.getElementById("btnOpenNewStoryModal").addEventListener("click", () => {
    document.getElementById("newStoryModal").classList.add("active");
    if (APP_STATE.currentUser) {
      document.getElementById("newStoryAuthorName").value = APP_STATE.currentUser.username;
    }
  });

  document.getElementById("btnOpenNewEpisodeModal").addEventListener("click", () => {
    openNewEpisodeModalForStory();
  });

  document.getElementById("refreshCreatorStoriesBtn").addEventListener("click", () => {
    fetchStoriesFromSupabase();
    showToast("Récits actualisés depuis Supabase.", "info");
  });

  // Preset covers click
  document.querySelectorAll(".preset-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      const url = tag.getAttribute("data-url");
      document.getElementById("newStoryCoverUrl").value = url;
    });
  });

  // Setup Heavy File Drag & Drop (up to 50MB)
  setupFileDropZone();

  // Form: Submit New Story (Creator)
  document.getElementById("newStoryForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("newStoryTitle").value.trim();
    const genre = document.getElementById("newStoryGenre").value;
    const authorName = document.getElementById("newStoryAuthorName").value.trim() || APP_STATE.currentUser?.username || "Auteur Inavouable";
    const coverUrl = document.getElementById("newStoryCoverUrl").value.trim() || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80";

    // Validation du fichier importé
    if (!importedFileState.content || importedFileState.content.length < 100) {
      showToast("Veuillez importer un fichier contenant au moins 100 caractères.", "error");
      const err = document.getElementById("fileErrorMsg");
      if (err) {
        err.textContent = "Veuillez glisser ou sélectionner un fichier d'histoire (TXT, MD, JSON, DOCX).";
        err.style.display = "block";
      }
      return;
    }

    showToast("Enregistrement du manuscrit dans Supabase...", "info");

    const storySynopsis = importedFileState.content.slice(0, 320) + (importedFileState.content.length > 320 ? "..." : "");

    const newStory = await createStoryInSupabase({
      title,
      genre,
      author_id: APP_STATE.currentUser?.id,
      author_name: authorName,
      cover_url: coverUrl,
      description: storySynopsis,
      synopsis: importedFileState.content, // Clé synopsis préservée pour la BDD
      content: importedFileState.content,
      fileName: importedFileState.fileName,
      fileSize: importedFileState.fileSize,
      file_name: importedFileState.fileName,
      file_size: importedFileState.fileSize,
      status: "pending",
      views: 0
    });

    // Création automatique de l'épisode 1 gratuit avec le manuscrit importé
    await createEpisodeInSupabase({
      story_id: newStory.id,
      episode_number: 1,
      title: "Chapitre 1 : " + title,
      price: 0.00,
      is_free: true,
      content: importedFileState.content
    });

    document.getElementById("newStoryModal").classList.remove("active");
    document.getElementById("newStoryForm").reset();
    resetImportedFile();
    showToast(`Récit "${title}" et son manuscrit enregistrés avec succès !`, "success");
  });

  // Form: Submit New Episode
  document.getElementById("newEpisodeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const storyId = document.getElementById("newEpisodeStorySelect").value;
    const episodeNumber = parseInt(document.getElementById("newEpisodeNumber").value, 10);
    const title = document.getElementById("newEpisodeTitle").value.trim();
    const price = parseFloat(document.getElementById("newEpisodePrice").value) || 0.99;
    const isFree = document.getElementById("newEpisodeIsFree").checked || episodeNumber === 1;
    const content = document.getElementById("newEpisodeContent").value.trim();

    showToast("Enregistrement de l'épisode dans Supabase...", "info");

    await createEpisodeInSupabase({
      story_id: storyId,
      episode_number: episodeNumber,
      title,
      price: isFree ? 0.00 : price,
      is_free: isFree,
      content
    });

    document.getElementById("newEpisodeModal").classList.remove("active");
    document.getElementById("newEpisodeForm").reset();
    showToast(`Épisode ${episodeNumber} enregistré !`, "success");
  });

  // Auto isFree on episode 1
  document.getElementById("newEpisodeNumber").addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    const freeCheck = document.getElementById("newEpisodeIsFree");
    if (val === 1) {
      freeCheck.checked = true;
      document.getElementById("newEpisodePrice").value = "0.00";
    } else {
      freeCheck.checked = false;
      document.getElementById("newEpisodePrice").value = "0.99";
    }
  });

  // SQL Schema Modal Viewer
  const sqlBtn = document.getElementById("openSqlBtn");
  const sqlModal = document.getElementById("sqlSchemaModal");
  const closeSqlModalBtn = document.getElementById("closeSqlSchemaModalBtn");
  const copySqlBtn = document.getElementById("copySqlBtn");
  const copyBtnText = document.getElementById("copyBtnText");

  if (sqlBtn) {
    sqlBtn.addEventListener("click", () => {
      loadAndShowSqlSchema();
    });
  }

  if (closeSqlModalBtn) {
    closeSqlModalBtn.addEventListener("click", () => {
      sqlModal.classList.remove("active");
    });
  }

  if (copySqlBtn) {
    copySqlBtn.addEventListener("click", () => {
      const code = document.getElementById("sqlCodeBlock").textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtnText.textContent = "Copié dans le presse-papiers !";
        showToast("Script SQL copié ! Collez-le dans l'éditeur SQL Supabase.", "success");
        setTimeout(() => {
          copyBtnText.textContent = "Copier le script SQL";
        }, 3000);
      });
    });
  }
}

async function loadAndShowSqlSchema() {
  const sqlModal = document.getElementById("sqlSchemaModal");
  const codeBlock = document.getElementById("sqlCodeBlock");

  try {
    const res = await fetch("supabase_schema.sql");
    const sqlText = await res.text();
    codeBlock.textContent = sqlText;
  } catch (e) {
    codeBlock.textContent = `-- SCHEMA SUPABASE POUR RÉCITS INAVOUABLES
-- Tables vierges sans récits pré-remplis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  username TEXT,
  role TEXT DEFAULT 'creator',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  cover_url TEXT,
  description TEXT NOT NULL,
  genre TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT,
  status TEXT DEFAULT 'pending',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.episodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_free BOOLEAN DEFAULT false,
  price NUMERIC(5,2) DEFAULT 0.99,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);`;
  }

  sqlModal.classList.add("active");
}

function switchTab(tabId) {
  APP_STATE.activeTab = tabId;

  document.querySelectorAll(".content-tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));

  if (tabId === "home") {
    document.getElementById("tabHome").classList.add("active");
    document.getElementById("navHomeBtn").classList.add("active");
  } else if (tabId === "creators") {
    document.getElementById("tabCreators").classList.add("active");
    document.getElementById("navCreatorsBtn").classList.add("active");
    renderTopCreators();
  } else if (tabId === "dashboard") {
    document.getElementById("tabDashboard").classList.add("active");
    document.getElementById("navDashboardBtn").classList.add("active");
    updateDashboardStats();
  } else if (tabId === "reader") {
    document.getElementById("tabReader").classList.add("active");
  }
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-exclamation" : "fa-circle-info";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// 10. INITIALISATION AU DÉMARRAGE
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);

  const savedUser = localStorage.getItem("recits_inavouables_user");
  if (savedUser) {
    try {
      APP_STATE.currentUser = JSON.parse(savedUser);
    } catch (e) {}
  }

  updateUserUI();
  setupAuth();
  setupEventListeners();

  // Rendu immédiat avec la saga officielle (1 récit garanti dès l'ouverture)
  renderStoriesGrid();
  renderTopCreators();
  updateDashboardStats();

  // Chargement complémentaire Supabase si connecté
  fetchStoriesFromSupabase();
});
