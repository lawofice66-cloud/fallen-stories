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
  saga: "Sakodo - Nuit Interdite",
  title: "Sakodo - Nuit Interdite",
  genre: "Érotisme",
  author_name: "Sakodo",
  preset: "Cyberpunk Neon + Sensuel Ombre + Nuit Interdite",
  cover_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800",
  description: "Dans la mégalopole cyberpunk sous une pluie de néons, Sakodo franchit les frontières de l'interdit lors d'une nuit de vertige, de soie et de désirs inavouables. Un ebook érotique en 5 épisodes intenses et littéraires.",
  isEbook: true,
  badge: "EBOOK 5 ÉPISODES",
  totalEpisodes: 5,
  views: 4250,
  status: "approved",
  created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
};

const SAKODO_EPISODES_DATA = [
  {
    id: "sakodo-nuit-interdite-ep1",
    story_id: "sakodo-nuit-interdite",
    saga: "Sakodo - Nuit Interdite",
    episode_number: 1,
    title: "Épisode 1 : Le Reflet des Néons Écarlates",
    is_free: true,
    price: 0.00,
    isEbook: true,
    content: `# Sakodo - Nuit Interdite\n\n### Épisode 1 : Le Reflet des Néons Écarlates\n\nLa pluie de minuit ne lavait jamais les fautes de Neo-Kuro ; elle se contentait d'en faire luire les contours sur l'asphalte noir. Depuis le balcon suspendu au soixante-dixième étage de la tour Akasaka, je contemplais la brume violette qui montait des artères inférieures. Je m'appelle Sakodo. Dans cette ville où les données se négocient plus cher que les âmes, j'avais appris à neutraliser mes émotions, à les enfermer derrière des parois de verre trempé. Pourtant, cette nuit-là, tout ce que j'avais cru maîtriser allait s'effondrer d'un simple frôlement.\n\nLa baie vitrée coulissa sans un bruit, laissant s'engouffrer une brise saturée d'humidité tiède et une fragrance entêtante : un mélange d'orchidée noire, de pluie chaude et de peau fraîche. Elle était là. Sa silhouette découpait l'obscurité, drapée dans une robe de soie carmin fendue jusqu'à la hanche, fluide comme du mercure sous les reflets écarlates des enseignes holographiques. Ses yeux ambrés captèrent les miens avec une intensité presque douloureuse.\n\n— Tu m'attendais, Sakodo ? murmura-t-elle, d'une voix basse qui résonna dans le creux de mon estomac comme une onde sismique.\n\nJe ne répondis pas immédiatement. Mon regard descendit le long de sa gorge diaphane, là où pulsait la veine délicate de sa carotide, rythmée par une excitation contenue. Chaque seconde d'attente épaississait l'air entre nous, le rendant lourd, électrique, irrespirable. Elle fit trois pas mesurés, le bruissement du tissu contre ses cuisses produisant un chuchotement hypnotique. L'odeur de son parfum devint un piège sensoriel dont je n'avais nulle intention de m'échapper.\n\n— Tu sais que ta présence ici est un risque absolu, dis-je en sentant ma voix légèrement altérée par une chaleur soudaine.\n\nUn sourire insaisissable étira ses lèvres peintes d'un vermillon sombre. Elle s'arrêta à quelques millimètres de moi, si près que la chaleur de son souffle vint mourir sur ma mâchoire. Je pouvais sentir le rayonnement de son corps à travers mon manteau noir. Sans un mot, elle leva une main aux ongles nacrés et posa l'index sur ma poitrine, juste au-dessus de mon cœur. Son contact, même à travers le lin fin de ma chemise, fit naître une étincelle brûlante qui se propagea le long de ma colonne vertébrale.\n\n— Les règles n'ont de valeur que pour ceux qui ont peur de brûler, Sakodo. Et ni toi ni moi n'avons jamais craint les flammes.\n\nSes doigts glissèrent lentement vers le haut, effleurant la courbe de mon cou pour venir se lover dans la nuque. Ce geste, à la fois d'une douceur infinie et d'une autorité troublante, me fit retenir ma respiration. Ses yeux plongeaient dans les miens sans ciller, dévoilant un abîme de désirs inavouables, une faim élégante mais insatiable. Je posai à mon tour ma main sur sa taille fine ; sous la soie liquide, sa peau était chaude, frémissante, vivante avec une férocité qui démentait la froideur métallique de la ville en contrebas.\n\nUn grondement d'orage lointain fit vibrer l'armature de verre. Les lumières de la ville vacillèrent une fraction de seconde, baignant la pièce d'une lueur bleutée. Dans cette pénombre éphémère, nos respirations se synchronisèrent. Je sentis la cambrure de ses reins répondre à la pression de mes doigts. Elle ferma les paupières en poussant un soupir imperceptible, un son guttural et voilé qui balaya mes derniers remparts.\n\nLa nuit ne faisait que commencer, et déjà, nous avions franchi la frontière invisible qui sépare la curiosité de la perdition.`
  },
  {
    id: "sakodo-nuit-interdite-ep2",
    story_id: "sakodo-nuit-interdite",
    saga: "Sakodo - Nuit Interdite",
    episode_number: 2,
    title: "Épisode 2 : Murmures dans la Pénombre",
    is_free: false,
    price: 0.99,
    isEbook: true,
    content: `# Sakodo - Nuit Interdite\n\n### Épisode 2 : Murmures dans la Pénombre\n\nLe cliquetis feutré du loquet électronique scella notre isolement du reste du monde. Dans le grand salon obscurci, les seules clartés provenaient désormais des néons pourpres et ambres filtrant à travers les immenses stores persiennes. Les ombres zébrées découpaient la pièce en un sanctuaire secret où chaque geste prenait une dimension sacrilège.\n\nJe sentais encore l'empreinte de ses doigts sur ma nuque. Elle ne s'était pas écartée ; au contraire, elle fit peser un peu plus son buste contre le mien. Son parfum s'épanouissait dans la chaleur de l'appartement, dense, capiteux, provoquant un étourdissement délicieux dans mes tempes.\n\n— Tu hésites encore, Sakodo ? murmura-t-elle, ses lèvres frôlant le lobe de mon oreille.\n\nSon souffle chaud fit courir un frisson incontrôlable sur toute la surface de ma peau. Pour toute réponse, j'avançai la main vers l'attache de sa robe. Le tissu glissa entre mes doigts avec la docilité de l'eau. D'un mouvement lent, délibéré, je dénouai le fin ruban d'or qui retenait l'étoffe à son épaule gauche. La soie s'affaissa doucement, dévoilant la rondeur satinée de son épaule nue, d'une pâleur lunaire contrastant avec l'obscurité de la nuit.\n\nElle laissa échapper un frémissement à peine perceptible, mais sous mes doigts, sa peau réagit instantanément : une chair de poule délicate, trahissant un abandon qu'elle feignait de dominer. J'effleurai la ligne pure de sa clavicule de la pulpe de mon pouce. Son pouls y battait follement, rapide, sauvage, comme un oiseau captif.\n\n— Je n'hésite pas, dis-je tout bas, la voix rauque d'un désir qui n'acceptait plus aucun compromis. Je savoure l'instant où nous cessons d'appartenir à la raison.\n\nElle inclina la tête sur le côté, m'offrant la courbe vulnérable de son cou. Je m'y penchai lentement. Quand mes lèvres effleurèrent sa peau, là où le parfum était le plus ardent, elle poussa un gémissement étouffé et ses ongles s'enfoncèrent dans le drap de ma veste. C'était un baiser à peine posé, presque un souffle, mais l'effet fut foudroyant. Un tremblement traversa son corps tout entier, et je sentis ses hanches chercher instinctivement le contact des miennes.\n\nSa main descendit le long de mon torse, déboutonnant ma chemise d'un geste d'une habileté troublante. Ses paumes fraîches vinrent se poser sur ma poitrine brûlante. Le contraste thermique m'arracha un soupir sourd. Elle caressait mes pectoraux avec une curiosité fébrile, guidant mes mouvements autant qu'elle s'y soumettait. Ses yeux ne me quittaient pas ; dans l'obscurité zébrée de violet, ses iris dorés brillaient d'une promesse ardente, d'une audace qui défiait tous les interdits de notre caste.\n\n— Tu as les mains brûlantes, Sakodo... susurra-t-elle, tandis que sa seconde épaule se libérait de la soie.\n\nLa robe glissa le long de ses hanches dans un chuchotement fluide pour venir s'échouer au sol en un cercle cramoisi. Dans la lueur filtrée des néons, sa silhouette apparut dans toute sa perfection voluptueuse et sombre. Chaque ligne de son corps semblait taillée pour éveiller le trouble, un alliage envoûtant de grâce et de tentation absolue. Mes mains trouvèrent la cambrure de ses reins, l'attirant contre moi sans ménagement.\n\nLe contact direct de sa peau tiède contre la mienne fit voler en éclats le dernier lambeau de retenue. Son ventre frémit contre le mien, et lorsqu'elle leva les yeux vers moi, ses lèvres entrouvertes laissaient deviner une soif que seule la nuit pouvait étancher.`
  },
  {
    id: "sakodo-nuit-interdite-ep3",
    story_id: "sakodo-nuit-interdite",
    saga: "Sakodo - Nuit Interdite",
    episode_number: 3,
    title: "Épisode 3 : Le Frisson de l'Étreinte",
    is_free: false,
    price: 0.99,
    isEbook: true,
    content: `# Sakodo - Nuit Interdite\n\n### Épisode 3 : Le Frisson de l'Étreinte\n\nLe lit bas aux draps de satin anthracite semblait un gouffre d'ombres attendant nos vertiges. Lorsque nos corps basculèrent sur la matière fraîche, un frisson d'une intensité nouvelle nous enveloppa tous deux. La pluie dehors redoublait de violence, martelant les vitres fumées d'un battement sourd qui servait de métronome à notre abandon.\n\nJe me tins au-dessus d'elle, soutenant mon poids sur mes avant-bras pour ne pas briser la délicatesse de l'instant. Dans la pénombre, ses cheveux d'ébène s'étalaient sur les coussins sombres, formant un halo nocturne autour de son visage émouvant de tension. Ses lèvres, humides et entrouvertes, laissaient échapper une plainte ravie lorsque mes doigts dessinèrent la courbe de ses côtes jusqu'au creux de sa taille.\n\n— Regarde-moi, Sakodo, ordonna-t-elle doucement, presque dans un souffle.\n\nJe plongeai mes yeux dans les siens. Rien n'était dissimulé. Pas de faux-fuyants, pas de jeux d'ombres pour cacher ce désir impétueux qui nous consumait. Mes lèvres trouvèrent enfin les siennes. Ce fut une déflagration silencieuse : un baiser profond, langoureux, d'une gourmandise dévastatrice. Sa langue vint caresser la mienne avec une audace fiévreuse, goûtant à la fois l'urgence et la volupté. Un râle étouffé franchit sa gorge tandis que ses mains agrippaient mes épaules, ses ongles traçant des sillons invisibles mais brûlants sur mes muscles tendus.\n\nChaque effleurement éveillait un écho dans les replis les plus secrets de mon être. Je descendis lentement le long de son menton, de sa gorge battante, pour venir cueillir le grain de beauté niché au creux de sa poitrine. Sa cambrure se fit plus prononcée sous mes lèvres ; ses cuisses frémissantes se refermèrent doucement autour de mes hanches, m'emprisonnant dans un étau de douceur et de chaleur enivrante.\n\n— Tu es insatiable... murmura-t-elle, la voix brisée par une vague de plaisir qui montait en elle.\n\n— Tu as éveillé ce que je gardais sous silence depuis trop longtemps, répondis-je contre le velours de son ventre.\n\nLe contact de ma bouche sur sa peau la faisait tressaillir par saccades. Je sentais la tiédeur intime de son corps m'appeler, un magnétisme irrésistible qui défiait toute retenue. Mes mains remontèrent le long de ses cuisses galbées, mes pouces explorant la peau tendre de l'intérieur de ses jambes. À chaque centimètre gagné, son souffle se faisait plus court, entrecoupé de soupirs rauques qui résonnaient comme de délicieuses offrandes dans le silence capitonné de la suite.\n\nElle enlaça ses jambes autour de moi, me guidant avec une autorité troublante vers le cœur de notre vertige. Il n'y avait plus d'hésitation possible. La pénombre de la chambre vibrait de cette tension érotique pure, sublimée par l'élégance de nos mouvements lents et accordés. Nous étions deux fauves nocturnes apprenant à s'apprivoiser sans jamais renoncer à leur part sauvage.\n\nLorsque la fusion s'amorça, ce fut dans une lenteur presque religieuse. Un frisson démesuré nous foudroya ensemble, et le monde extérieur disparut définitivement sous les vagues successives d'une ivresse partagée.`
  },
  {
    id: "sakodo-nuit-interdite-ep4",
    story_id: "sakodo-nuit-interdite",
    saga: "Sakodo - Nuit Interdite",
    episode_number: 4,
    title: "Épisode 4 : Au-Delà du Vertige",
    is_free: false,
    price: 0.99,
    isEbook: true,
    content: `# Sakodo - Nuit Interdite\n\n### Épisode 4 : Au-Delà du Vertige\n\nLe temps avait perdu toute substance mesurable. Dans l'écrin de velours et d'ombres de cette chambre haut perchée, il n'existait plus d'heures, plus d'alertes réseau, plus de passé ni d'avenir. Il n'y avait que le rythme syncopé de nos souffles mêlés, la cadence envoûtante de deux corps cherchant l'un dans l'autre une transcendance inavouable.\n\nSous les caresses répétées, nos peaux brillaient d'une fine pellicule de sueur satinée qui accrochait les éclats changeants des néons violets traversant les persiennes. Chaque mouvement était empreint d'une fluidité animale et hypnotique. Je me mouvais en elle avec une lenteur calculée, sentant chaque frémissement de ses parois intimes se resserrer autour de moi en d'irrésistibles pulsations.\n\nSes mains s'agrippaient à mes reins, guidant la profondeur de notre étreinte avec une exigence qui balayait toute fausse pudeur. Ses yeux, assombris par la transe du désir, ne quittaient pas les miens. Nous partagions ce regard brut, vertigineux, où l'âme semble se dénuder bien plus encore que la chair.\n\n— Plus fort, Sakodo... ne retiens rien, supplia-t-elle dans un souffle rauque, presque douloureux de délice.\n\nSa voix brisée agit comme un électrochoc sur mes sens. J'accentuai la cadence de nos hanches, répondant à son appel avec une intensité renouvelée. Ses jambes se nouèrent plus fermement encore autour de mon dos, m'attirant au plus profond de son sanctuaire. À chaque poussée, un cri étouffé s'échappait de ses lèvres carmin, vibrant contre ma joue, contre mon cou trempé de sueur.\n\nL'érotisme de cet instant n'avait rien d'un simple plaisir mécanique : c'était une communion transgressive, un pacte de sang et de feu conclu au nez et à la barbe des puissants qui régissaient la cité d'acier. En cet instant précis, elle et moi étions les seuls maîtres de notre destin. La brûlure délicieuse montait dans mes veines, une marée incandescente qui menaçait de tout emporter.\n\nJe sentis la vague la submerger en premier. Ses doigts se crispèrent férocement dans ma chair, son dos se cambra dans un arc gracieux et convulsif, et un long gémissement de volupté pure s'éleva dans la pièce. Ses paupières papillotèrent, ses pupilles dilatées se perdant dans l'extase tandis qu'une série de spasmes intimes et voluptueux m'enveloppait d'une chaleur suffocante.\n\nEmporté par son abandon total, je franchis à mon tour le point de non-retour. Une onde foudroyante jaillit de mes reins, libérant une jouissance si dense, si profonde qu'elle m'arracha un cri sourd contre sa gorge. Mes muscles se tendirent à l'extrême avant de s'effondrer contre elle dans un spasme libérateur, nos cœurs cognant l'un contre l'autre comme deux tambours de guerre s'apaisant enfin après la bataille.`
  },
  {
    id: "sakodo-nuit-interdite-ep5",
    story_id: "sakodo-nuit-interdite",
    saga: "Sakodo - Nuit Interdite",
    episode_number: 5,
    title: "Épisode 5 : L'Aube des Inavouables",
    is_free: false,
    price: 0.99,
    isEbook: true,
    content: `# Sakodo - Nuit Interdite\n\n### Épisode 5 : L'Aube des Inavouables\n\nL'obscurité totale avait peu à peu cédé la place à une clarté blafarde et bleutée. L'aube se levait sur Neo-Kuro, étalant un voile de nacre froide sur les sommets acérés des mégatours corporatistes. Mais à l'intérieur de notre cocon, la tiédeur des corps et la rémanence du désir maintenaient l'illusion d'une nuit éternelle.\n\nElle était allongée contre mon flanc, sa tête nichée au creux de mon épaule. L'un de ses bras reposait en travers de ma poitrine, ses doigts dessinant paresseusement des arabesques invisibles sur ma peau encore sensible. Nos respirations avaient retrouvé leur calme, mais chaque contact résonnait encore de l'écho des heures interdites que nous venions de traverser ensemble.\n\n— La ville se réveille, murmura-t-elle, sans pour autant ouvrir les yeux. Les masques vont devoir être remis.\n\nJe passai ma main dans sa chevelure soyeuse, démêlant avec lenteur les mèches sombres qui tombaient sur son front. Son visage au repos possédait une sérénité troublante, comme si l'ouragan nocturne avait purgé en elle toutes les angoisses du jour.\n\n— Les masques ne protègent que les apparences, dis-je en inclinant mon visage vers le sien. Ce qui a brûlé entre nous cette nuit ne pourra plus jamais être effacé.\n\nElle ouvrit alors ses paupières. Dans la lumière argentée du matin naissant, ses yeux ambrés brillaient d'une complicité nouvelle, empreinte d'une gravité sensuelle. Elle se redressa lentement, glissant le drap de satin sur ses hanches, dévoilant sans fausse pudeur la courbe lascive de son dos et la cambrure fière de sa silhouette. Les marques roses de nos baisers ponctuaient sa peau claire comme les stigmates secrets d'un culte nocturne.\n\nElle se pencha vers moi, ses seins effleurant mon torse, et posa ses lèvres sur les miennes dans un baiser lent, presque doux, mais lourd d'une promesse inaltérable. C'était le baiser du pacte, celui qui transforme deux complices en conjurés du désir.\n\n— Tu m'appelleras dès que la nuit recouvrira les toits, Sakodo ? demanda-t-elle, un éclat joueur au coin de ses lèvres encore mordues.\n\n— Tu sais déjà que je ne pourrai pas attendre que le soleil disparaisse complètement.\n\nUn rire cristallin, teinté d'une sensualité canaille, vibra dans sa gorge. Elle se leva avec une grâce féline pour ramasser sa robe de soie au pied du lit. En la regardant glisser l'étoffe carmin sur son corps galbé, je savais que mon univers venait de basculer définitivement. L'homme méthodique et froid que j'avais été s'était dissous dans les vertiges de cette nuit interdite.\n\nEn franchissant le seuil du sas, elle se retourna une dernière fois, posant son regard de feu sur moi avant que les portes ne se referment.\n\nLe jour pouvait bien renaître sur les gratte-ciels de néon ; mon cœur et mon corps, eux, appartenaient désormais à jamais aux ombres enivrantes de nos récits inavouables.`
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

    APP_STATE.stories = data || [];
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
  if (storyId === "sakodo-nuit-interdite") {
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
          ${story.isEbook ? `<span class="story-ebook-badge"><i class="fa-solid fa-book-bookmark"></i> ${escapeHtml(story.badge || "EBOOK 5 ÉPISODES")}</span>` : ""}
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

  // Chargement initial des histoires (la plateforme démarre vierge si aucune histoire n'a été insérée)
  fetchStoriesFromSupabase();
});
