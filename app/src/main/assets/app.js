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

const SAKODO_EPISODES_DATA = [
  {
    "id": "sakodo-nuit-interdite-ep1",
    "story_id": "sakodo-nuit-interdite",
    "saga": "Sakodo - Nuit Interdite",
    "episode_number": 1,
    "title": "Épisode 1 : Le Reflet des Néons Écarlates",
    "is_free": true,
    "price": 0.0,
    "wordCount": 2777,
    "isEbook": true,
    "content": "# Sakodo - Nuit Interdite

### Épisode 1 : Le Reflet des Néons Écarlates

La pluie de minuit ne lavait jamais les fautes de Neo-Kuro ; elle se contentait d'en faire luire les contours sur l'asphalte noir comme de l'obsidienne liquide. Depuis le balcon suspendu au soixante-dixième étage de la tour Akasaka, je contemplais la brume violette qui montait des artères inférieures de la mégalopole, traversée par le sillage incandescent des aéroglisseurs de patrouille et les pulsations hystériques des réclames holographiques vantant des prothèses de mémoire ou des paradis synthétiques. Je m'appelle Sakodo. Dans cette ville où les données génétiques et les algorithmes d'influence se négocient plus cher que les âmes humaines, j'avais passé dix années à polir mon détachement, à neutraliser mes émotions, à les enfermer derrière des parois de verre trempé aussi impénétrables que les blindages de nos banques de mémoire corporatistes.

Mon existence s'était articulée autour de la stricte conformité aux exigences du consortium Nakatomi. J'avais appris à analyser les flux financiers, à déceler les trahisons dans un simple battement de paupière lors des conseils d'administration, et à ordonner des purges de données sans éprouver le moindre remords. Pourtant, cette nuit-là, l'air possédait une densité anormale, une charge électrostatique qui me hérissait la nuque et faisait vibrer les micro-capteurs sous-cutanés logés à la racine de mes tempes. J'avais pris le risque délibéré de congédier mes gardes de faction, de désactiver les protocoles de surveillance thermique du niveau supérieur et de tamiser les luminaires d'ambre pour ne laisser subsister que la lueur diffuse, sauvage et moite de la cité en contrebas. Je savais avec une certitude mathématique qu'elle viendrait. Les canaux cryptés du réseau clandestin ne mentent jamais quand ils annoncent la venue d'une silhouette dont le simple nom de code fait frémir les membres du directoire.

Mon appartement était un vaste sanctuaire d'acier brossé, de laque noire et de dalles de basalte poli, conçu pour un homme qui ne dort jamais plus de trois heures consécutives. Une table basse en verre fumé, quelques fauteuils bas aux arêtes tranchantes et cette immense baie vitrée incurvée qui embrassait l'horizon saturé de brouillard acide. Sur l'écran transparent de mon terminal personnel, une série de rapports financiers et de clés biométriques défilaient encore en lettres phosphorescentes vert émeraude, vestige dérisoire de ma vie d'avant. Une vie réglée sur les dividendes, les assassinats feutrés par voie de courriels chiffrés et la solitude glacée des sommets urbains. Ce soir, ces données semblaient mortes, privées de la moindre étincelle de sens face au vide immense qui m'aspirait.

Mes oreilles étaient tendues vers les bruits du vide extérieur. Le vent d'altitude gémissait contre les haubans de carbone de la tour, produisant une plainte sourde et rythmée, pareille au râle d'un géant d'acier blessé. Les averses s'écrasaient par rafales violentes contre le verre trempé, dessinant des rivières de lueurs pourpres qui déformaient les contours des gratte-ciels voisins. J'avais versé deux doigts d'un vieux malt synthétique ambré dans un gobelet de cristal lourd, mais je ne l'avais pas porté à mes lèvres. Mes paumes étaient moites. Une sensation oubliée depuis l'enfance me nouait le ventre : l'attente du danger pur, celui qui ne brandit pas d'arme à feu mais promet de vous dépouiller de toute armure intérieure et de vous laisser nu face à vos désirs les plus inavouables.

Je repensais à notre première rencontre, six mois plus tôt, dans les sous-sols baignés de lumière tamisée du club Oblivion, où se négociaient les secrets les plus inavouables de la haute pègre corporatiste. Elle n'était alors qu'une légende parmi les courtiers de l'ombre, une silhouette fuyante connue sous le pseudonyme d'Elena, réputée pour dérober des dossiers que les plus puissantes intelligences artificielles jugeaient inviolables. Son regard m'avait transpercé à travers la fumée aromatisée au bois de santal et aux neuro-stimulants, une étincelle de mépris amusé et de curiosité cruelle qui m'avait hanté durant des semaines entières. Chaque nuit passée depuis cet instant n'avait été qu'une lente préparation à cette confrontation inévitable.

Soudain, la baie vitrée coulissa dans une fluidité absolue, sans le moindre grincement de ses rails magnétiques à sustentation. Le capteur d'ouverture avait été court-circuité avec une maestria technique qui portait sa signature indiscutable. Une bouffée d'air chaud saturé d'ozone, d'humidité et d'une fragrance singulière s'engouffra instantanément dans la pièce : un sillage troublant d'orchidée noire, de pluie tiède et de chair frémissante. Elle était là. Campée sur le rebord mouillé de la terrasse en porte-à-faux, immobile, comme sculptée dans l'ombre et le néon.

Sa silhouette se découpait avec une perfection presque insolente contre la nuit pluvieuse. Elle portait une longue robe de soie carmin, fluide comme du mercure sous les reflets écarlates des enseignes lointaines, fendue vertigineusement le long de la cuisse gauche jusqu'au renflement de la hanche. À chacun de ses mouvements imperceptibles, l'étoffe semblait caresser sa peau avec une sensualité jalouse. Ses cheveux d'ébène, coupés en un carré plongeant effilant les lignes de sa mâchoire, ruisselaient de fines gouttelettes de pluie argentée. Mais ce furent ses yeux qui m'enchaînèrent sur place : deux iris ambrés, striés d'or liquide, brillants d'une insolence souveraine et d'une faim lucide qui balayèrent d'un seul coup dix années de maîtrise feinte.

— Tu m'attendais vraiment, Sakodo ? murmura-t-elle. Sa voix était basse, veloutée, teintée d'une musicalité grave qui résonna dans le creux de mon estomac comme une onde sismique. Elle ne s'était pas annoncée par le sas sécurisé ; elle avait escaladé les corniches réservées aux drones de maintenance au soixante-dixième étage, défiant les vertiges du vide et les senseurs thermiques avec une témérité qui frisait la démence poétique.

— Tu as failli te tuer sur les contreforts extérieurs, Elena, répondis-je en m'efforçant de garder une voix égale, même si le rythme de mes pulsations cardiaques s'accélérait sous ma chemise de lin sombre. Les drones de patrouille impériale ont doublé leurs rondes depuis dix-neuf heures en raison des alertes d'incursions dans le secteur trois. Un faux pas de ta part et ton corps n'aurait été qu'une traînée écarlate sur les passerelles inférieures.

Un sourire énigmatique entrouvrit ses lèvres peintes d'un vermillon sombre, presque noir sous la lumière tamisée. Elle fit un premier pas dans l'appartement, et le bruissement délicat de la soie mouillée contre ses jambes nues emplit le silence feutré de la suite. Chaque pas qu'elle faisait semblait calculé pour étirer le temps, pour transformer l'espace entre nous en une zone de friction invisible mais brûlante. Ses pieds nus laissaient des empreintes humides et tièdes sur le basalte noir, traçant une piste éphémère vers mon sanctuaire inviolé.

— La mort est un concept abstrait pour ceux qui ne savent pas désirer, Sakodo, répondit-elle en inclinant légèrement la tête, laissant une mèche sombre glisser le long de sa joue diaphane. Et ce soir, je n'avais aucune intention de mourir sans avoir obtenu ce pour quoi je suis montée jusqu'ici. Ni sans avoir vérifié si la légende du grand Sakodo n'était qu'un masque de cire posé sur un cœur incapable de brûler.

Elle s'avança jusqu'à se tenir à moins d'un demi-mètre de moi. À cette distance, la chaleur irradiant de son corps devenait presque palpable, chassant la fraîcheur climatisée de la pièce. Je pouvais observer le soulèvement régulier et rapide de sa poitrine, souligné par le décolleté plongeant de la robe carmin, et la goutte d'eau qui glissait lentement le long de sa gorge diaphane, suivant le tracé sinueux de sa clavicule avant de disparaître dans l'obscurité soyeuse de son buste. Le contraste entre la fraîcheur humide de la pluie sur sa peau et la chaleur incandescente qui émanait d'elle provoquait en moi un tourbillon sensoriel suffocant.

L'odeur de son parfum d'orchidée se mêlait à présent à l'effluve subtil de sa peau mouillée, créant une atmosphère si capiteuse que j'en oubliai le gobelet de cristal que je tenais encore. Mes doigts le reposèrent sans bruit sur la console derrière moi. Je refusais de cligner des yeux, de peur qu'elle ne disparaisse comme les chimères holographiques qui hantaient les allées de Shinjuku. Ses pupilles ambrées semblaient sonder mes pensées les plus secrètes, dévoilant sans pitié les faiblesses que j'avais dissimulées à mes supérieurs et à mes rivaux.

— Tu as apporté les clés cryptographiques de la corporation Nakatomi ? demandai-je, feignant de ramener notre entrevue à un prétexte professionnel dérisoire pour maintenir l'illusion d'un contrôle. Les données sur les implants expérimentaux de la division cybernétique sont sous scellés neuronaux depuis ce matin.

Elena laissa échapper un rire étouffé, rauque et moqueur, qui s'acheva en un frémissement de ses narines fines. Elle leva lentement la main droite, ornée d'une bague de platine poli gravée de symboles cryptés, et posa l'extrémité de son index au centre exact de mon torse. Même à travers l'étoffe de ma chemise, son contact parut m'électrocuter. Un feu liquide sembla se propager de ce point d'impact minuscule, descendant vers mon bas-ventre et irradiant le long de chaque vertèbre de mon échine.

— Tu prétends encore t'intéresser à des lignes de code et des consortiums, Sakodo ? chuchota-t-elle en fixant ses pupilles immenses dans les miennes. Regarde-moi dans les yeux et répète-moi que c'est pour des données volées que tu as risqué ta position au directoire en m'ouvrant cet accès. Répète-moi que ton cœur ne bat pas comme celui d'un condamné à mort qui contemple sa propre grâce.

Je ne répondis rien. Le mensonge était devenu impossible, presque ridicule face à la puissance d'attraction qui nous courbait l'un vers l'autre. Depuis six mois que nous nous croisions dans les salons feutrés et les réceptions clandestines des bas-fonds de Neo-Kuro, chaque regard échangé, chaque verre effleuré au milieu des dignitaires corrompus n'était qu'un prélude à cette collision inéluctable. Nous nous étions observés comme deux prédateurs fascinés l'un par l'autre, guettant la moindre faille dans l'armure de l'adversaire, étudiant nos démarches, le timbre de nos voix, les silences pesants qui suivaient nos conversations d'apparence banale. Et ce soir, l'armure venait de se fissurer de part en part.

Ses doigts glissèrent avec une lenteur calculée vers le haut de mon torse, effleurant les boutons de nacre de ma chemise sans les défaire, avant de s'attarder au creux délicat de ma gorge, là où mon pouls trahissait une déroute totale. La texture de sa peau était d'une douceur vertigineuse, contrastant avec l'autorité magnétique et presque cruelle de son geste. Je posai à mon tour ma paume sur sa hanche, là où la fente vertigineuse de sa robe laissait sa peau nue exposée à l'air tiède de la chambre.

La tiédeur de sa chair sous mes doigts me fit retenir mon souffle : elle tremblait imperceptiblement, trahissant sous son assurance impérieuse une excitation tout aussi dévorante que la mienne. Mes doigts s'enfoncèrent légèrement dans la rondeur de sa cuisse, sentant les muscles fermes réagir à mon contact par un tressaillement délicieux. Une plainte presque inaudible vibra au fond de sa gorge, et ses cils palpitèrent comme les ailes d'un papillon de nuit pris au piège d'une flamme.

— Tu joues un jeu dangereux, Elena, dis-je tout bas, ma voix s'altérant sous l'effet de ce contact trop intime, trop longtemps rêvé dans la solitude de mes nuits blanches. Dans cette tour, les murs ont des oreilles optiques et chaque souffle peut être traduit en trahison d'État par les intelligences artificielles de surveillance.

— Ce n'est pas un jeu, Sakodo. C'est une mise à nu. Et je refuse que nous passions une nuit de plus à faire semblant d'être des ombres sans désirs dans une cité qui nous dévore à petit feu. Si nous devons être détruits par nos choix, que ce soit au moins dans les flammes de ce que nous avons nous-mêmes choisi d'embraser.

D'un mouvement délibéré, elle fit un pas de plus vers moi, effaçant le dernier interstice d'air qui nous séparait. Son buste souple vint s'écraser délicatement contre ma poitrine. Le parfum de sa chevelure m'enveloppa entièrement, m'enivrant comme une drogue neuro-chimique non filtrée. Je sentais la courbure de ses reins sous ma paume, la fermeté soyeuse de sa cuisse pressée contre la mienne. Nos souffles se confondaient désormais dans une cadence fébrile, saccadée, formant un rythme primitif qui balayait les millénaires de civilisation policée.

Au dehors, au-delà des vitrages fumés, un éclair monumental zébra les cieux saturés de pollution lumineuse, teignant les gratte-ciels d'un violet électrique qui fit miroiter chaque goutte d'eau sur la baie vitrée comme des diamants éphémères. Dans cette seconde suspendue entre le tonnerre et l'obscurité, les yeux d'Elena se fermèrent à demi. Ses lèvres s'entrouvrirent, laissant deviner la pointe rose et humide de sa langue, et elle laissa échapper un soupir rauque qui sonna comme un appel sans condition, une supplique et un ordre entremêlés.

Je glissai ma seconde main dans sa nuque, ses cheveux mouillés s'enroulant autour de mes doigts comme des lianes de soie sombre. Je la tirai imperceptiblement vers moi, sentant sa résistance céder dans un frémissement d'abandon délicieux. Mes lèvres s'approchèrent des siennes jusqu'à en effleurer le bord charnu, partageant la même chaleur, le même souffle saccadé, savourant cette fraction d'éternité où le désir est encore une promesse suspendue au bord du gouffre. Nous pouvions sentir la vibration de nos deux corps prêts à s'embraser, une faim élégante mais insatiable qui ne demandait qu'à tout consumer sur son passage.

Je pouvais compter chacun des battements de sa carotide qui tambourinait avec une ferveur sauvage contre la pulpe de mon pouce. Elena pencha la tête en arrière, m'offrant la courbe vulnérable et parfaite de sa gorge diaphane, là où scintillait une dernière perle de pluie. Mes lèvres descendirent pour venir la cueillir d'un effleurement tiède, arrachant à sa gorge un cri rauque et feutré qui se perdit dans la pénombre de la suite. Ses ongles s'enfoncèrent dans les revers de ma veste avec une urgence nouvelle, trahissant la déroute totale de ses défenses. Elle cherchait à se dissoudre en moi autant que je cherchais à m'abîmer en elle.

C'est à cet instant précis qu'un bip d'alerte écarlate s'alluma silencieusement sur la console murale de la suite : un faisceau de balayage thermique de niveau impérial venait de se verrouiller sur la façade est de la tour. Le drone de surveillance corporatiste venait de modifier sa trajectoire de patrouille et braquait ses senseurs directement vers notre balcon. Quelqu'un ou quelque chose savait qu'une anomalie s'était infiltrée au soixante-dixième étage. Mais dans les bras l'un de l'autre, au bord de l'abîme et du vertige, ni elle ni moi ne fîmes le moindre geste pour fuir. Nos lèvres ne s'étaient pas encore touchées, mais nos âmes venaient déjà de sceller leur pacte inavouable.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine."
  },
  {
    "id": "sakodo-nuit-interdite-ep2",
    "story_id": "sakodo-nuit-interdite",
    "saga": "Sakodo - Nuit Interdite",
    "episode_number": 2,
    "title": "Épisode 2 : Murmures dans la Pénombre",
    "is_free": false,
    "price": 0.99,
    "wordCount": 2775,
    "isEbook": true,
    "content": "# Sakodo - Nuit Interdite

### Épisode 2 : Murmures dans la Pénombre

Le clignotement rougeoyant de la balise de détection thermique zébrait la console murale avec une insistance mécanique et glaçante. Le drone de patrouille corporatiste rôdait le long de l'armature d'acier de la tour Akasaka, son projecteur spectral balayant les façades vitrées à la recherche de signatures caloriques illégales. Mais ni Elena ni moi ne bougions. Nous étions figés dans cet étau de désir suspendu, nos haleines tièdes se mêlant dans l'obscurité comme une promesse que même le bruit des rotors ne pouvait rompre.

Chaque seconde d'immobilité semblait dilater le temps à l'infini. Son corps appuyé contre le mien vibrait d'une chaleur sourde, presque animale. Ses yeux ambrés ne quittaient pas mes lèvres, brillant d'un défi insolent qui semblait se moquer de toute l'armada policière de Neo-Kuro. Elle savait pertinemment que si le drone passait en mode balayage millimétrique, nos deux existences basculeraient dans la clandestinité définitive. Mais dans son regard, je ne lisais pas la peur : je lisais l'ivresse enivrante de l'interdit poussé à son paroxysme.

Sans détacher mes yeux des siens, j'étendis le bras gauche vers le panneau tactile mural dissimulé dans la boiserie sombre. D'une pression de mon empreinte palmaire, j'enclenchai le blindage électro-optique de la baie vitrée : un rideau d'ombres denses et polarisées s'abattit instantanément sur la baie panoramique, coupant la vue de Neo-Kuro et étouffant la clameur de la ville. Les reflets des néons se muèrent en de fines stries géométriques filtrant à travers les lames persiennes, découpant l'espace en un sanctuaire d'or et de pourpre.

Le silence retomba, épais, vibrant, presque palpable. Seul le bruit de nos respirations précipitées résonnait désormais dans le grand salon d'ébène.

— Nous avons peut-être trente minutes avant qu'ils ne recalibrent leurs senseurs périmétriques pour forcer le blindage, murmurai-je contre le lobe de son oreille, mes lèvres frôlant les mèches humides de sa chevelure. Après cela, ils enverront une équipe d'intervention au sol.

— Trente minutes d'éternité, Sakodo... me répondit-elle d'un souffle ardent qui m'arracha un frisson violent le long de la moelle épinière. Trente minutes où personne d'autre n'a le droit d'exister sur cette terre.

Elle se dégagea d'un pas lent, non pour fuir, mais pour se draper dans la lumière tamisée qui émanait du sol. Ses iris dorés me dévisageaient avec une curiosité presque prédatrice, savourant l'effet dévastateur qu'elle produisait sur mes sens. D'un geste mesuré, elle porta ses mains à la fine bride de platine qui retenait la robe carmin à son épaule gauche. Ses doigts longs et graciles firent glisser le fermoir. L'étoffe lourde et fluide glissa doucement sur son épaule, dévoilant une peau laiteuse d'une perfection troublante, ornée au creux de l'omoplate d'un discret tatouage bioluminescent représentant un serpent d'émeraude entrelacé.

La robe descendit de quelques centimètres, libérant le haut de son buste satiné. Je sentis ma gorge se nouer devant cette offrande silencieuse. Les battements précipités de son cœur faisaient trembler la courbe délicate de ses seins opulents, dont les pointes dressées sous l'effet du froid et du désir réclamaient l'embrasement de mes mains. Je m'avançai vers elle, incapable de résister plus longtemps à l'attraction magnétique qui émanait de chaque parcelle de son être.

— Tu trembles, Elena, constatai-je d'une voix sourde en posant ma paume sur la rondeur tiède de son épaule dénudée.

— Je brûle, Sakodo. Ce n'est pas la même chose, répliqua-t-elle en fermant les yeux avec délectation sous la pression de mes doigts. Et tu sais très bien que tu es le seul responsable de cet incendie.

Ma main descendit le long de sa colonne vertébrale, traçant la cambrure parfaite de ses reins avec une lenteur religieuse. La peau d'Elena était d'une tiédeur de velours, frémissant au moindre de mes contacts avec une réactivité sensorielle qui décuplait ma propre exaltation. De mes deux mains, j'attrapai délicatement les pans de la soie rouge pour l'aider à s'en défaire. L'étoffe coula le long de ses hanches sculptées, chuchotant contre ses cuisses fuselées avant de s'effondrer au sol en une mare cramoisie semblable à un pétale géant fané au pied de son piédestal.

Elle se tenait devant moi dans le plus simple appareil, seulement vêtue de la pénombre et des lueurs d'ambre qui baignaient la pièce. Son corps était une ode à la volupté la plus pure : des hanches pleines, une taille magnifiquement cintrée, des cuisses longues et fermes dont l'entrecroisement secret dégageait une chaleur enivrante. Je contemplais cette splendeur avec une vénération presque sacrée, sentant mon sang battre avec force dans mes tempes. Rien dans mes protocoles corporatistes ne m'avait préparé à une telle déflagration de beauté brute.

Ses yeux s'ouvrirent à nouveau, brillants d'une insolente certitude. Elle ne manifestait aucune gêne, aucune pudeur superflue ; elle assumait la puissance ravageuse de son magnétisme. Elle fit glisser ses mains le long de mon torse, trouvant les boutons de ma chemise avec une dextérité fébrile. Un à un, les boutons de nacre cédèrent sous ses ongles soignés. Lorsqu'elle écarta le tissu et posa ses deux paumes fraîches sur mes pectoraux nus, un soupir d'aise et de soulagement s'échappa de ma poitrine.

— Tu as passé des années à te cacher derrière des armures de métal et de protocole, Sakodo, murmura-t-elle en appuyant son front contre mon épaule, respirant l'odeur de ma peau avec une ferveur gourmande. Mais ce soir, je veux voir l'homme. Le vrai. Celui qui refuse de mourir asphyxié dans sa propre cage dorée.

Ses ongles dessinèrent de lentes arabesques sur ma peau tendue, descendant vers ma ceinture avec une lenteur calculée qui poussait mon endurance à ses ultimes retranchements. Chaque effleurement était une torture divine, un supplice de douceur qui embrasait mes sens. Je saisis ses poignets fins, retenant son élan pour mieux plonger mon regard dans le sien.

— Tu as conscience de ce que tu déclenches ? lui demandai-je, le souffle court, les mâchoires serrées par l'effort surhumain de garder le contrôle. Si nous franchissons ce seuil, il n'y aura plus de retour en arrière possible. Ni pour toi, ni pour moi.

— Plus que tu ne le crois, Sakodo. Alors cesse de raisonner comme un processeur logique, et fais-moi tienne.

Je lâchai ses poignets pour venir ceinturer sa taille d'un geste impérieux. Je la soulevai sans peine contre moi, la plaquant doucement contre la console de verre opaque. Elena poussa un cri étouffé, un mélange de surprise et de délectation sauvage, tandis que ses cuisses satinées venaient s'enrouler naturellement autour de mes hanches. La proximité de nos peaux nues provoqua un choc thermique foudroyant : le contact de sa féminité humide et brûlante contre mon aine me fit perdre le peu de raison qui me restait.

Mes lèvres trouvèrent enfin les siennes dans un baiser vorace, passionné, sans concession. Sa langue vint explorer la mienne avec une fougue désespérée, comme si nous buvions à une source défendue au milieu d'un désert de béton et d'acier. Ses doigts s'enfoncèrent dans mes cheveux courts, me tirant vers elle avec une avidité insatiable. Chacun de ses gémissements mouillés résonnait dans ma gorge comme un chant de triomphe.

Je promenai ma bouche le long de sa mâchoire frémissante, descendant vers le creux de sa gorge où son pouls battait avec la frénésie d'un animal captif. Mes lèvres descendirent plus bas encore, cueillant avec une lenteur gourmande le sommet arrondi de son sein gauche. Lorsqu'elle sentit ma langue enrouler sa pointe dressée, Elena rejeta la tête en arrière, arquant son dos dans une plainte étouffée qui fit vibrer l'armature de la suite. Ses mains glissaient frénétiquement sur mes trapèzes, réclamant davantage de friction, refusant la moindre pause.

— Sakodo... s'il te plaît... murmura-t-elle, les doigts crispés dans mes épaules nues. Je ne tiendrai pas...

Je la portai délicatement à travers le corridor plongé dans la pénombre, où seules les lueurs violettes des veilleuses guidaient nos pas. Mais alors que nous franchissions le seuil de la chambre principale, une vibration synchrone résonna directement au creux de nos deux implants neuraux : un ping crypté, portant le code de priorité absolue du directoire suprême de Neo-Kuro. Quelqu'un venait d'intercepter notre fréquence privée, et un compte à rebours de vingt secondes s'affichait déjà sur le coin de mon champ visuel.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine."
  },
  {
    "id": "sakodo-nuit-interdite-ep3",
    "story_id": "sakodo-nuit-interdite",
    "saga": "Sakodo - Nuit Interdite",
    "episode_number": 3,
    "title": "Épisode 3 : Le Frisson de l'Étreinte",
    "is_free": false,
    "price": 0.99,
    "wordCount": 2775,
    "isEbook": true,
    "content": "# Sakodo - Nuit Interdite

### Épisode 3 : Le Frisson de l'Étreinte

Le compte à rebours clignotait au bas de ma rétine avec la froideur implacable des algorithmes corporatistes : dix-huit secondes, dix-sept, seize... Un pirate de haut vol ou un agent de contre-espionnage tentait d'établir une passerelle d'accès direct à nos noyaux synaptiques pour cartographier notre localisation exacte et extraire nos identifiants biométriques. Dans ce monde dématérialisé, une telle intrusion équivalait à une condamnation à mort ou à un effacement mémoriel complet dans les caissons de reconditionnement de Nakatomi.

Pourtant, les bras d'Elena enroulés autour de ma nuque et la morsure délicate de ses dents sur ma lèvre inférieure m'ancraient dans une réalité infiniment plus puissante que n'importe quelle menace numérique. Sans desserrer mon étreinte, j'activai d'un clignement de paupière le protocole d'isolation EMP d'urgence du penthouse : un rideau d'interférences magnétiques saturé balaya l'ensemble des réseaux de l'appartement. La connexion fut sectionnée net, dispersant le signal intrusif dans un crépitement de statique aveugle. Le compte à rebours s'évanouit, ne laissant derrière lui que l'obscurité tiède et le parfum d'ambre qui régnait entre nos deux corps enlacés.

— Tu as grillé tous les relais de la tour pour nous offrir cette nuit, murmura Elena, son souffle brûlant contre mon cou trempé de sueur. Ils mettront des heures à rétablir les réseaux locaux.

— Ils reconstruiront leurs relais demain, répondis-je d'une voix rauque. Mais cette nuit m'appartient. Et tu m'appartiens.

Un frisson démesuré courut le long de son échine. Ses cuisses se resserrèrent avec force autour de mes hanches, me guidant vers la chambre adjacente où trônait l'immense lit bas habillé de satin anthracite. Lorsque nos corps basculèrent enfin sur la fraîcheur soyeuse des draps, l'impact arracha à Elena un soupir de pure délectation. La matière fluide glissait sous nos mouvements comme une eau sombre et caressante.

Je me tins un instant au-dessus d'elle, soutenant mon torse sur mes coudes pour mieux la contempler dans la pénombre zébrée par les néons violets qui réussissaient encore à percer les fentes des stores. Ses cheveux noirs s'étalaient en éventail sur les coussins de velours sombre, créant un cadre d'ébène autour de son visage émouvant de beauté et de vulnérabilité consentie. Ses lèvres entrouvertes, rougies par mes baisers précédents, laissaient échapper une plainte feutrée chaque fois que mes doigts effleuraient le renflement délicat de ses côtes.

— Ne me fais plus attendre, Sakodo, supplia-t-elle, ses iris dorés brillant d'une lueur presque fiévreuse dans l'ombre. Tu as passé des mois à me scruter dans l'ombre des couloirs du directoire... prouve-moi que tu as le courage d'aller jusqu'au bout de ce désir que tu refoulais.

Je descendis lentement le long de son corps, posant des baisers mesurés et ardents sur chaque centimètre de sa peau. De sa mâchoire frémissante jusqu'à la naissance de sa poitrine, mes lèvres traçaient une cartographie secrète de son désir. Quand ma bouche vint engloutir à nouveau le bouton turgescent de son sein droit, Elena poussa un gémissement aigu qui mourut dans un sanglot de volupté. Ses mains agrippèrent mes épaules larges, ses ongles s'enfonçant dans le tissu musculeux de mon dos pour marquer son emprise.

Je continuai ma descente avec une patience impitoyable. Mon souffle chaud balayait son ventre plat, faisant frémir la fine ligne brune qui descendait vers son nombril. Elena arquait le bassin vers moi, ses reins se soulevant du matelas dans une quête instinctive d'apaisement. La tiédeur de sa chair devenait incandescente. L'odeur d'orchidée et d'océan chaud qui émanait d'elle saturait l'air de la chambre, anéantissant mes dernières pensées rationnelles.

Mes mains glissèrent le long de ses cuisses galbées, écartant avec une infinie douceur ses genoux pour me faire une place au creux de son sanctuaire. La peau de l'intérieur de ses cuisses était d'une délicatesse inouïe, d'une douceur de pétale mouillé contrastant avec la pulsation féroce de son intimité. Quand mes doigts effleurèrent les replis soyeux et humides de sa féminité, Elena eut un soubresaut convulsif. Elle rejeta la tête en arrière, ses paupières closes scellant une extase déjà insoutenable.

— Sakodo... mon Dieu... balbutia-t-elle, les doigts crispés dans les draps de satin. C'est trop... c'est trop doux...

Je pris le temps d'apprivoiser sa moiteur, caressant la perle de son désir avec une lenteur circulaire et rythmée qui la fit gémir à chaque passage. Ses hanches se mirent à onduler d'elles-mêmes, cherchant la cadence, réclamant l'offrande totale. Elle n'était plus la femme fatale calculatrice et insaisissable des salons d'Akasaka ; elle était une amante affamée, livrée corps et âme à la déferlante de ses sens.

Je remontai le long de son corps pour venir poser mon visage contre le sien. Nos regards se croisèrent une fraction de seconde, chargés d'une intensité si brute que l'air sembla se raréfier dans la pièce. Je positionnai mes hanches contre les siennes, sentant l'étreinte brûlante de son intimité s'ouvrir pour m'accueillir. D'une poussée lente, délibérée et inexorable, je franchis le seuil de son abandon.

Un long râle voilé déchira la gorge d'Elena tandis que ses yeux s'écarquillaient dans un mélange de douleur délicieuse et de délivrance absolue. Sa cambrure se resserra violemment autour de moi, ses muscles intimes m'enserrant avec une force démesurée, pulsant au rythme de nos cœurs affolés. Nous étions enfin un, deux âmes interdites scellées dans la chair au sommet d'une tour d'acier.

Nos mouvements trouvèrent une cadence lente, majestueuse, semblable au ressac d'une marée lourde d'oranges et d'épices. À chaque élan, je sentais son corps répondre avec une précision instinctive, ondulant sous le mien pour prolonger la friction délicieuse de notre étreinte. Sa peau glissait contre la mienne dans une tiédeur enivrante, ruisselante d'une sueur légère qui scintillait sous la pénombre tamisée. Nous nous regardions fixement, sans un mot, laissant nos yeux exprimer ce que la parole humaine ne saurait jamais traduire sans l'amoindrir.

Mais alors que nos souffles retrouvaient une cadence pour entamer la danse sacrée de l'extase, le générateur auxiliaire de la tour s'enclencha avec un bourdonnement sourd, et les miroirs suspendus au plafond s'illuminèrent d'une clarté spectrale, révélant la silhouette d'une micro-caméra de transmission optique installée au cœur même du luminaire central.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine."
  },
  {
    "id": "sakodo-nuit-interdite-ep4",
    "story_id": "sakodo-nuit-interdite",
    "saga": "Sakodo - Nuit Interdite",
    "episode_number": 4,
    "title": "Épisode 4 : Au-Delà du Vertige",
    "is_free": false,
    "price": 0.99,
    "wordCount": 2813,
    "isEbook": true,
    "content": "# Sakodo - Nuit Interdite

### Épisode 4 : Au-Delà du Vertige

La lentille de la micro-caméra reflétait une étincelle froide dans le plafonnier, témoin silencieux d'une surveillance clandestine organisée par les factions rivales du consortium. En temps normal, cette découverte m'aurait poussé à l'action immédiate, à l'analyse médico-légale du signal et à l'élimination méticuleuse de la menace par tous les moyens d'élimination disponibles. Mais à cet instant précis, uni dans la chair avec Elena, le reste de l'univers avait cessé d'avoir la moindre importance.

Elena avait elle aussi aperçu le reflet furtif dans le miroir au-dessus de nous. Au lieu de reculer ou de tenter de masquer sa nudité éclatante, ses lèvres se fendirent d'un rictus d'un défi absolu. Ses iris ambrés s'enflammèrent d'une audace destructrice qui acheva de balayer mes ultimes digues morales. Elle passa ses bras autour de mes épaules, ses ongles traçant des lignes ardentes sur mes omoplates, et me tira vers elle avec une vigueur insoupçonnée.

— Qu'ils regardent, Sakodo... murmura-t-elle, la voix vibrante d'une jouissance provocatrice. Qu'ils soient témoins de notre perdition. Qu'ils meurent d'envie de ne jamais connaître ce que nous vivons ici, enfermés dans leurs protocoles stériles.

Ses paroles agirent comme une étincelle jetée dans un baril de poudre. La retenue et la prudence corporatiste qui avaient dicté mon existence s'évaporèrent dans la chaleur moite de la suite. J'enfonçai mes mains sous ses reins, la soulevant légèrement pour accentuer l'angle de notre jonction, et j'imprimai à nos corps un rythme plus dense, plus profond, sans merci. À chaque va-et-vient, le frottement soyeux de nos peaux moites produisait un claquement feutré qui résonnait dans la pénombre comme une musique tribale et primitive.

Elena laissa échapper un cri rauque, une note brisée qui emplit l'air de la chambre. Sa tête bascula sur le côté, sa nuque cambrée exposant la ligne pure de sa gorge à mes baisers fiévreux. Mes lèvres vinrent étouffer ses plaintes, buvant son souffle, dévorant sa bouche avec une soif que rien ne semblait pouvoir étancher. Sa langue se battait contre la mienne dans un ballet furieux et voluptueux, tandis que ses hanches épousaient chacun de mes assauts avec une synchronisation parfaite.

Dehors, l'orage qui couvait depuis des heures éclata avec une violence inouïe sur Neo-Kuro. Des trombes d'eau s'abattirent contre les vitrages blindés, étouffant les bruits de la cité sous un vacarme liquide et majestueux. Des éclairs d'un blanc bleuté déchiraient les nuages de pollution à intervalles réguliers, inondant la chambre d'éclats stroboscopiques qui figeaient nos silhouettes entrelacées : deux corps luisants de sueur, enchaînés par le plaisir, défiant les règles de leur caste dans un vertige incandescent.

Je sentais la texture veloutée de son intimité se resserrer autour de moi à chaque poussée, comme si son corps entier cherchait à retenir mon essence, à ne plus jamais me laisser partir. Chaque pulsation de son sexe chaud et inondé envoyait des décharges électriques le long de mes reins. La sueur perlait sur mon front et tombait en gouttes tièdes sur sa poitrine opulente, traçant des sillons brillants sous les lueurs violettes de la ville.

— Sakodo... regarde-moi... ordonna-t-elle dans un souffle saccadé, ses yeux plongeant dans les miens sans ciller. Tu es à moi... cette nuit, tu n'es rien d'autre que le mien...

— Je suis à toi, Elena, répondis-je entre deux râles étouffés, la voix brisée par l'intensité de l'effort et du plaisir. Rien d'autre n'existe.

La tension monta d'un cran, atteignant des hauteurs presque douloureuses. Ses jambes se nouèrent plus étroitement encore autour de mon dos, ses talons m'enjoignant d'accélérer la cadence. Nous étions emportés dans un maelström sensoriel où la douleur et la volupté se confondaient dans une harmonie féroce. Elena commença à trembler de tout son être, une trépidation incontrôlable qui naissait dans ses cuisses et se propageait jusqu'à ses lèvres palpitantes.

La première vague d'orgasme la frappa de plein fouet. Ses ongles s'enfoncèrent férocement dans ma peau, son dos se cambra en un arc sublime et un cri d'une beauté sauvage et déchirante s'éleva de sa gorge. Ses parois intimes se mirent à pulser avec une violence délicieuse, m'enserrant dans des spasmes répétés et brûlants qui faisaient ployer mon endurance.

Submergé par son extase, incapable de retenir plus longtemps le flot brûlant qui montait dans mes veines, je me laissai sombrer à mon tour dans l'abîme. D'une ultime poussée au plus profond de son sanctuaire, je libérai toute mon ardeur dans un spasme dévastateur. Un rugissement sourd franchit mes lèvres tandis que nos âmes semblaient fusionner dans une explosion de lumière intérieure, consumant nos peurs et nos doutes dans une ivresse absolue.

Nous restâmes de longues minutes ainsi, écroulés l'un contre l'autre, les corps tremblants et les cœurs battant à l'unisson comme deux tambours après une bataille acharnée. Le silence reprit ses droits dans la suite, seulement troublé par la plainte lointaine de l'orage et le murmure apaisé de nos souffles réconciliés. Mais au moment même où nos respirations commençaient à s'apaiser, le carillon électronique de l'ascenseur privé de l'étage résonna avec un son cristallin : un badge d'accès de sécurité de niveau Administrateur venait de déverrouiller le sas d'entrée du penthouse.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité."
  },
  {
    "id": "sakodo-nuit-interdite-ep5",
    "story_id": "sakodo-nuit-interdite",
    "saga": "Sakodo - Nuit Interdite",
    "episode_number": 5,
    "title": "Épisode 5 : L'Aube des Inavouables",
    "is_free": false,
    "price": 0.99,
    "wordCount": 2805,
    "isEbook": true,
    "content": "# Sakodo - Nuit Interdite

### Épisode 5 : L'Aube des Inavouables

Le son feutré du sas d'accès privé résonna dans le grand vestibule comme un coup de semonce. Quelqu'un venait d'entrer au soixante-dixième étage, muni d'un code maître capable de contourner mes verrouillages les plus stricts. Dans le monde impitoyable de Neo-Kuro, une telle irruption n'annonçait généralement rien de bon : une escouade de nettoyeurs d'actifs ou un émissaire de la direction venu exécuter une purge silencieuse.

D'un réflexe conditionné par des années de paranoïa corporatiste, je me redressai en glissant ma main sous le chevet de satin sombre, là où reposait mon pistolet à percussion cinétique. Mais avant que mes doigts n'effleurent la crosse de titane, la main fine d'Elena se posa doucement sur mon poignet. Son contact était tiède, apaisant, d'une autorité tranquille qui me désarma instantanément.

— Ne tire pas, Sakodo, murmura-t-elle avec un calme déconcertant, un mince sourire flottant sur ses lèvres encore gonflées de nos baisers. C'est mon androïde de transport personnel. Je l'avais programmé pour venir récupérer les paquetages de données avant le lever du jour, au cas où notre nuit aurait tourné court.

Un soupir de soulagement teinté d'une pointe d'agacement m'échappa. Je laissai retomber ma tête contre l'oreiller d'anthracite, contemplant le visage d'Elena dans la lumière changeante du matin qui commençait à poindre. La pluie battante s'était apaisée pour ne plus former qu'un rideau de brume fine et opaline sur les vitrages. Au loin, au-delà des toits acérés des mégatours, le ciel noir virait lentement au gris perle et au rose cuivré, avalant peu à peu la fluorescence des néons nocturnes.

Elena était allongée contre mon flanc, sa tête nichée au creux de mon épaule. L'un de ses bras nus reposait en travers de ma poitrine, ses ongles traçant distraitement des cercles invisibles sur ma peau encore sensible. Nos corps dégageaient cette odeur singulière et entêtante des amants repus, un mélange de musc, de sueur séchée et du parfum d'orchidée noire qui ne me quitterait plus jamais.

— La nuit est finie, constatai-je d'une voix basse, contemplant les premiers rayons de lumière froide qui frappaient les corniches de la tour Akasaka.

— La nuit est finie, répéta-t-elle doucement, mais rien ne sera plus jamais comme avant. Tu le sais aussi bien que moi, Sakodo. Nous avons brûlé les ponts qui nous reliaient à notre ancienne indifférence.

Elle releva la tête et plongea ses iris ambrés dans les miens. Il n'y avait plus en elle la froideur calculatrice de l'agente d'infiltration, ni l'insolence bravache de celle qui défie la mort pour un frisson passager. Ce qui brillait dans son regard était un pacte indestructible, forgé dans la sueur, les cris étouffés et l'abandon absolu de deux âmes qui avaient consenti à se perdre ensemble.

— Tu as téléchargé les secrets de Nakatomi ? lui demandai-je avec une lueur amusée dans les yeux.

Elena laissa échapper un rire cristallin, chaud et voluptueux, qui vibra agréablement contre ma poitrine. Elle se pencha au-dessus de moi, ses seins fermes effleurant mes pectoraux, ses cheveux en désordre tombant en une cascade sombre autour de nos visages.

— Les secrets de Nakatomi ne valent rien à côté de ce que tu m'as offert cette nuit, Sakodo. Mais oui, le transfert a été effectué pendant que nous étions... occupés à des affaires infiniment plus urgentes. Les banques de données sont déjà dispersées sur douze serveurs miroirs en orbite basse.

Elle posa ses lèvres sur les miennes dans un baiser lent, suave, empreint d'une tendresse inattendue mais chargé d'une promesse inaltérable. C'était un baiser d'au revoir qui ressemblait davantage à un commencement qu'à un adieu. Ses lèvres avaient un goût de sel et de miel sombre, une saveur qui resterait gravée sur mes lèvres bien après son départ.

Elle se leva avec une grâce féline, étirant sa longue silhouette musclée dans la pâleur du matin naissant. Les marques pourpres de mes étreintes ponctuaient la courbe de ses hanches et de ses épaules comme des joyaux clandestins. Sans la moindre hâte, elle ramassa sa robe de soie carmin au pied du lit et l'enfila avec cette aisance naturelle qui m'avait fasciné dès son arrivée. En nouant la bride d'or à son épaule, elle se retourna vers moi, le regard flamboyant d'une malice irrésistible.

— Dès que la prochaine lune rouge recouvrira le district de Shinjuku, Sakodo... veille à ce que ta baie vitrée reste déverrouillée. Car je reviendrai réclamer ce qui m'est désormais dû.

— Elle le sera toujours pour toi, Elena, répondis-je sans l'ombre d'une hésitation.

Elle s'avança vers le sas du penthouse, sa silhouette fière et magnifique se fondant dans la clarté du corridor avant que les portes métalliques ne se referment sans bruit sur son sillage de parfum défendu. Je restai seul dans le vaste appartement, écoutant le ronronnement sourd de la mégalopole qui reprenait vie.

Le monde extérieur pouvait bien s'éveiller à ses luttes d'argent, de pouvoir et de faux-semblants ; désormais, mon destin était scellé. J'avais goûté au vertige des récits inavouables, et nulle force au monde ne pourrait m'arracher à cette nuit éternelle.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité.

Ce désir n'était pas une faiblesse ; il était la seule rébellion authentique qui lui restait dans un monde entièrement calibré pour l'obéissance et la rentabilité. En cédant à cette attirance magnétique, en accueillant Elena dans l'intimité de son refuge, Sakodo avait choisi de réclamer son humanité, d'en payer le prix fort s'il le fallait, mais de vivre pleinement chaque seconde de cette intensité interdite. La peur du lendemain s'était dissoute dans l'évidence de l'instant présent, laissant place à une lucidité féroce et sereine.

Les ombres qui dansaient au plafond composaient une chorégraphie silencieuse, témoin des serments tacites conclus entre deux êtres qui avaient tout à perdre mais qui avaient préféré tout risquer. Dans cette atmosphère saturée d'arômes d'orchidée et d'ozone tiède, le silence n'était pas un vide, mais une plénitude vibrante où chaque pulsation du cœur battait comme un défi lancé à la nuit et à la fatalité urbaine.

Dans les replis de la conscience de Sakodo, chaque sensation vécue lors de cette nuit à Neo-Kuro prenait la dimension d'un serment gravé dans la matière même de son être. La mémoire humaine, dans cette ère dominée par les circuits imprimés et les sauvegardes synaptiques sur serveurs quantiques, était devenue une denrée périssable et falsifiable. Pourtant, la mémoire de la peau, la vibration du souffle chaud partagé dans la pénombre et le souvenir tactile des doigts glissant sur la soie ne pouvaient être ni effacés ni piratés par aucun algorithme. C'était là le véritable mystère des récits inavouables : une vérité pure, viscérale, qui défiait toutes les lois et toutes les morales conventionnelles.

L'écho de cette rencontre résonnait dans chaque recoin de l'appartement suspendu. Les murs de béton ciré et les panneaux de verre trempé semblaient avoir absorbé l'intensité des regards échangés et des aveux murmurés à demi-mot. Au dehors, la pluie continuait de draper la métropole d'un linceul iridescent, reflétant les néons rouges, violets et cyans des enseignes publicitaires qui clignotaient sans fin dans la brume. Chaque gouttelette qui frappait la baie vitrée semblait marquer le tempo d'un temps nouveau, un temps affranchi des impératifs corporatistes et des calculs d'opportunité."
  }
];

const APP_STATE = {
  currentUser: null,
  stories: [SAKODO_SAGA_DATA],
  episodes: SAKODO_EPISODES_DATA,
  unlockedEpisodes: JSON.parse(localStorage.getItem("recits_inavouables_unlocked") || "{}"),
  activeTab: "home",
  activeGenre: "all",
  searchQuery: "",
  activeStory: null,
  activeEpisode: null,
  fontSize: 1.15
};

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
