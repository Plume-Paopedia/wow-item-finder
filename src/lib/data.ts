export interface WoWItem {
  id: number;
  name: string;
  quality: 'poor' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  item_level: number;
  required_level: number;
  item_class: string;
  item_subclass: string;
  icon: string;
  description?: string;
  stats?: Array<{ name: string; value: number }>;
}

export interface ItemSource {
  type: 'drop' | 'craft' | 'vendor' | 'quest';
  name: string;
  location?: string;
  difficulty?: string;
}

export const mockItems: WoWItem[] = [
  // Armes légendaires
  {
    id: 1,
    name: "Épée du roi-liche",
    quality: "legendary",
    item_level: 284,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Épée à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_62.jpg",
    description: "Une épée légendaire forgée dans les glaces de Northrend.",
    stats: [
      { name: "Dégâts d'attaque", value: 3568 },
      { name: "Force", value: 198 },
      { name: "Endurance", value: 297 }
    ]
  },
  {
    id: 12,
    name: "Sulfuras, Main de Ragnaros",
    quality: "legendary",
    item_level: 230,
    required_level: 60,
    item_class: "Arme",
    item_subclass: "Masse à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_hammer_unique_sulfuras.jpg",
    description: "Un marteau légendaire forgé dans les flammes du Cœur du Magma.",
    stats: [
      { name: "Dégâts d'attaque", value: 2950 },
      { name: "Force", value: 145 },
      { name: "Endurance", value: 188 }
    ]
  },
  {
    id: 13,
    name: "Ashbringer",
    quality: "legendary",
    item_level: 289,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Épée à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_2h_ashbringer.jpg",
    description: "L'épée légendaire de Tirion Fordring, purifiée de sa corruption.",
    stats: [
      { name: "Dégâts d'attaque", value: 3730 },
      { name: "Force", value: 212 },
      { name: "Endurance", value: 318 }
    ]
  },

  // Armes épiques classiques
  {
    id: 2,
    name: "Baguette d'Arcane",
    quality: "epic",
    item_level: 245,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Baguette",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_wand_01.jpg",
    description: "Une baguette imprégnée de magie des arcanes.",
    stats: [
      { name: "Puissance des sorts", value: 456 },
      { name: "Intellect", value: 89 },
      { name: "Esprit", value: 67 }
    ]
  },
  {
    id: 6,
    name: "Marteau de tonnerre",
    quality: "epic",
    item_level: 264,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Masse à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_hammer_unique_sulfuras.jpg",
    description: "Un marteau qui crépite d'énergie électrique.",
    stats: [
      { name: "Dégâts d'attaque", value: 2890 },
      { name: "Force", value: 156 },
      { name: "Endurance", value: 234 }
    ]
  },
  {
    id: 14,
    name: "Lame de guerre des Orcs",
    quality: "epic",
    item_level: 200,
    required_level: 60,
    item_class: "Arme",
    item_subclass: "Épée à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_39.jpg",
    description: "Une épée forgée par les maîtres forgerons orcs de Draenor.",
    stats: [
      { name: "Dégâts d'attaque", value: 1890 },
      { name: "Force", value: 78 },
      { name: "Endurance", value: 112 }
    ]
  },
  {
    id: 15,
    name: "Arc du chasseur de vent",
    quality: "epic",
    item_level: 226,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Arc",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_weapon_bow_11.jpg",
    description: "Un arc elfe qui siffle dans le vent à chaque tir.",
    stats: [
      { name: "Dégâts d'attaque", value: 2456 },
      { name: "Agilité", value: 134 },
      { name: "Endurance", value: 145 }
    ]
  },

  // Armures de plates
  {
    id: 3,
    name: "Heaume du gardien",
    quality: "rare",
    item_level: 200,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Casque de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_74.jpg",
    description: "Un casque robuste porté par les gardiens de la citadelle.",
    stats: [
      { name: "Armure", value: 1247 },
      { name: "Force", value: 45 },
      { name: "Endurance", value: 78 }
    ]
  },
  {
    id: 16,
    name: "Plastron de la Justice",
    quality: "epic",
    item_level: 245,
    required_level: 70,
    item_class: "Armure",
    item_subclass: "Plastron de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_plate06.jpg",
    description: "Un plastron brillant porté par les paladins de la Lumière.",
    stats: [
      { name: "Armure", value: 1890 },
      { name: "Force", value: 89 },
      { name: "Endurance", value: 134 },
      { name: "Intellect", value: 67 }
    ]
  },
  {
    id: 17,
    name: "Gantelets du conquérant",
    quality: "rare",
    item_level: 180,
    required_level: 55,
    item_class: "Armure",
    item_subclass: "Gantelets de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_30.jpg",
    description: "Des gantelets gravés des exploits de leurs anciens porteurs.",
    stats: [
      { name: "Armure", value: 756 },
      { name: "Force", value: 34 },
      { name: "Endurance", value: 56 }
    ]
  },

  // Armures de cuir
  {
    id: 18,
    name: "Tunique de l'assassin",
    quality: "epic",
    item_level: 213,
    required_level: 70,
    item_class: "Armure",
    item_subclass: "Tunique de cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_leather_03.jpg",
    description: "Une tunique sombre taillée pour les mouvements furtifs.",
    stats: [
      { name: "Armure", value: 945 },
      { name: "Agilité", value: 112 },
      { name: "Endurance", value: 89 },
      { name: "Hâte", value: 67 }
    ]
  },
  {
    id: 19,
    name: "Bottes du coureur de vent",
    quality: "rare",
    item_level: 156,
    required_level: 45,
    item_class: "Armure",
    item_subclass: "Bottes de cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_boots_08.jpg",
    description: "Des bottes légères qui semblent à peine toucher le sol.",
    stats: [
      { name: "Armure", value: 423 },
      { name: "Agilité", value: 45 },
      { name: "Endurance", value: 34 }
    ]
  },

  // Armures de tissu
  {
    id: 20,
    name: "Robe de l'archimage",
    quality: "epic",
    item_level: 264,
    required_level: 80,
    item_class: "Armure",
    item_subclass: "Robe",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_cloth_17.jpg",
    description: "Une robe tissée avec les fils de la magie pure.",
    stats: [
      { name: "Armure", value: 567 },
      { name: "Intellect", value: 145 },
      { name: "Endurance", value: 112 },
      { name: "Puissance des sorts", value: 789 }
    ]
  },
  {
    id: 21,
    name: "Chapeau du sorcier",
    quality: "rare",
    item_level: 134,
    required_level: 40,
    item_class: "Armure",
    item_subclass: "Casque de tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_08.jpg",
    description: "Un chapeau pointu classique, symbole des mages.",
    stats: [
      { name: "Armure", value: 234 },
      { name: "Intellect", value: 56 },
      { name: "Mana", value: 445 }
    ]
  },

  // Bijoux et accessoires
  {
    id: 4,
    name: "Anneau de sagesse",
    quality: "uncommon",
    item_level: 150,
    required_level: 45,
    item_class: "Armure",
    item_subclass: "Anneau",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_jewelry_ring_04.jpg",
    description: "Un anneau simple qui améliore la sagesse de son porteur.",
    stats: [
      { name: "Intellect", value: 25 },
      { name: "Esprit", value: 18 }
    ]
  },
  {
    id: 22,
    name: "Collier du dragon",
    quality: "epic",
    item_level: 245,
    required_level: 70,
    item_class: "Armure",
    item_subclass: "Collier",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_jewelry_necklace_12.jpg",
    description: "Un collier orné d'écailles de dragon rouge authentiques.",
    stats: [
      { name: "Force", value: 89 },
      { name: "Endurance", value: 112 },
      { name: "Critique", value: 67 }
    ]
  },
  {
    id: 23,
    name: "Trinité des éléments",
    quality: "epic",
    item_level: 226,
    required_level: 70,
    item_class: "Armure",
    item_subclass: "Bijou",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_orb_05.jpg",
    description: "Un bijou qui canalise la puissance des trois éléments primaires.",
    stats: [
      { name: "Puissance des sorts", value: 445 },
      { name: "Intellect", value: 78 }
    ]
  },

  // Capes
  {
    id: 7,
    name: "Cape du voyageur",
    quality: "uncommon",
    item_level: 120,
    required_level: 30,
    item_class: "Armure",
    item_subclass: "Cape",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_cape_20.jpg",
    description: "Une cape légère parfaite pour les longs voyages.",
    stats: [
      { name: "Armure", value: 87 },
      { name: "Agilité", value: 22 },
      { name: "Endurance", value: 35 }
    ]
  },
  {
    id: 24,
    name: "Manteau des ombres",
    quality: "epic",
    item_level: 200,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Cape",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_cape_18.jpg",
    description: "Un manteau sombre qui semble absorber la lumière environnante.",
    stats: [
      { name: "Armure", value: 156 },
      { name: "Agilité", value: 67 },
      { name: "Furtivité", value: 45 }
    ]
  },

  // Objets tenus en main gauche
  {
    id: 8,
    name: "Grimoire des sorts oubliés",
    quality: "rare",
    item_level: 180,
    required_level: 55,
    item_class: "Armure",
    item_subclass: "Objet tenu en main gauche",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_book_11.jpg",
    description: "Un grimoire ancien contenant des sorts perdus.",
    stats: [
      { name: "Puissance des sorts", value: 234 },
      { name: "Intellect", value: 67 },
      { name: "Mana", value: 890 }
    ]
  },
  {
    id: 25,
    name: "Bouclier du gardien",
    quality: "epic",
    item_level: 213,
    required_level: 70,
    item_class: "Armure",
    item_subclass: "Bouclier",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_shield_06.jpg",
    description: "Un bouclier magique qui repousse les attaques ennemies.",
    stats: [
      { name: "Armure", value: 1234 },
      { name: "Blocage", value: 89 },
      { name: "Endurance", value: 78 }
    ]
  },

  // Consommables
  {
    id: 5,
    name: "Potion de soins majeure",
    quality: "common",
    item_level: 45,
    required_level: 35,
    item_class: "Consommable",
    item_subclass: "Potion",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_54.jpg",
    description: "Restaure instantanément 1500 points de vie.",
    stats: []
  },
  {
    id: 26,
    name: "Élixir de force de géant",
    quality: "uncommon",
    item_level: 60,
    required_level: 50,
    item_class: "Consommable",
    item_subclass: "Élixir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_61.jpg",
    description: "Augmente la force de 25 pendant 1 heure.",
    stats: []
  },
  {
    id: 27,
    name: "Pain de mage",
    quality: "common",
    item_level: 35,
    required_level: 25,
    item_class: "Consommable",
    item_subclass: "Nourriture",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_food_33.jpg",
    description: "Un pain conjuré qui restaure mana et points de vie.",
    stats: []
  },
  {
    id: 28,
    name: "Parchemin de protection",
    quality: "uncommon",
    item_level: 40,
    required_level: 30,
    item_class: "Consommable",
    item_subclass: "Parchemin",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_scroll_03.jpg",
    description: "Accorde une protection temporaire contre les sorts.",
    stats: []
  },

  // Composants d'artisanat et matériaux
  {
    id: 9,
    name: "Fluide fluorescent",
    quality: "common",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Composant d'artisanat",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_ahnqirajtrinket_02.jpg",
    description: "Un fluide étrange qui émet une lueur verte mystérieuse.",
    stats: []
  },
  {
    id: 29,
    name: "Lingot de thorium",
    quality: "uncommon",
    item_level: 50,
    required_level: 40,
    item_class: "Divers",
    item_subclass: "Métal et pierre",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_ingot_04.jpg",
    description: "Un lingot de thorium pur, essentiel pour la forge avancée.",
    stats: []
  },
  {
    id: 30,
    name: "Cuir épais",
    quality: "common",
    item_level: 30,
    required_level: 20,
    item_class: "Divers",
    item_subclass: "Cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_leatherscrap_08.jpg",
    description: "Un cuir de qualité supérieure provenant de grandes créatures.",
    stats: []
  },
  {
    id: 31,
    name: "Tissu runique",
    quality: "rare",
    item_level: 65,
    required_level: 55,
    item_class: "Divers",
    item_subclass: "Tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_fabric_silk_02.jpg",
    description: "Un tissu imprégné de magie, utilisé pour les robes de mage.",
    stats: []
  },
  {
    id: 32,
    name: "Herbe de Fadeleaf",
    quality: "common",
    item_level: 25,
    required_level: 15,
    item_class: "Divers",
    item_subclass: "Herbe",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_herb_10.jpg",
    description: "Une herbe aux propriétés curatives, recherchée par les alchimistes.",
    stats: []
  },

  // Essences et enchantements
  {
    id: 10,
    name: "Essence lumineuse",
    quality: "uncommon",
    item_level: 35,
    required_level: 25,
    item_class: "Divers",
    item_subclass: "Enchantement",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_enchant_essencearcanelarge.jpg",
    description: "Une essence magique qui pulse d'une lumière dorée.",
    stats: []
  },
  {
    id: 33,
    name: "Poussière d'âme",
    quality: "common",
    item_level: 20,
    required_level: 10,
    item_class: "Divers",
    item_subclass: "Enchantement",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_enchant_duststrange.jpg",
    description: "Une poussière magique obtenue par désenchantement.",
    stats: []
  },
  {
    id: 34,
    name: "Essence d'éternité",
    quality: "rare",
    item_level: 70,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Enchantement",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_enchant_essenceeternallarge.jpg",
    description: "Une essence rare aux propriétés temporelles uniques.",
    stats: []
  },

  // Gemmes et cristaux
  {
    id: 11,
    name: "Cristal de mana",
    quality: "rare",
    item_level: 60,
    required_level: 40,
    item_class: "Divers",
    item_subclass: "Pierre de gemme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_crystal_02.jpg",
    description: "Un cristal bleu translucide qui vibre de pouvoir magique.",
    stats: []
  },
  {
    id: 35,
    name: "Rubis de force",
    quality: "rare",
    item_level: 70,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Pierre de gemme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_ruby_02.jpg",
    description: "Un rubis rouge sang qui augmente la force physique.",
    stats: [
      { name: "Force", value: 12 }
    ]
  },
  {
    id: 36,
    name: "Saphir de sagesse",
    quality: "rare",
    item_level: 70,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Pierre de gemme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_sapphire_02.jpg",
    description: "Un saphir d'un bleu profond qui améliore l'intellect.",
    stats: [
      { name: "Intellect", value: 12 }
    ]
  },
  {
    id: 37,
    name: "Émeraude d'agilité",
    quality: "rare",
    item_level: 70,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Pierre de gemme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_emerald_02.jpg",
    description: "Une émeraude verte qui améliore la dextérité.",
    stats: [
      { name: "Agilité", value: 12 }
    ]
  },

  // Objets de quête
  {
    id: 38,
    name: "Crâne de dragon ancien",
    quality: "epic",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Objet de quête",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bone_dragonskull_01.jpg",
    description: "Le crâne blanchi d'un dragon millénaire, encore chaud au toucher.",
    stats: []
  },
  {
    id: 39,
    name: "Fragment de la Pierre du monde",
    quality: "legendary",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Objet de quête",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_orb_02.jpg",
    description: "Un fragment de la Pierre du monde, vibrant d'une énergie primordiale.",
    stats: []
  },
  {
    id: 40,
    name: "Lettre scellée",
    quality: "poor",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Objet de quête",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_letter_15.jpg",
    description: "Une lettre importante scellée avec de la cire rouge.",
    stats: []
  },

  // Montures (objets)
  {
    id: 41,
    name: "Rênes du destrier de guerre",
    quality: "epic",
    item_level: 40,
    required_level: 40,
    item_class: "Divers",
    item_subclass: "Monture",
    icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_swiftness.jpg",
    description: "Invoque un destrier de guerre loyale et rapide.",
    stats: []
  },
  {
    id: 42,
    name: "Rênes du tigre de Winterspring",
    quality: "epic",
    item_level: 60,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Monture",
    icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_jungletiger.jpg",
    description: "Invoque un tigre blanc des neiges de Winterspring.",
    stats: []
  },

  // Objets techniques et mécaniques (Gnomeregan thème)
  {
    id: 43,
    name: "Engrenage rouillé",
    quality: "poor",
    item_level: 25,
    required_level: 20,
    item_class: "Divers",
    item_subclass: "Composant de mécanisme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gizmo_02.jpg",
    description: "Un engrenage gnome corrodé par les radiations de Gnomeregan.",
    stats: []
  },
  {
    id: 44,
    name: "Cristal d'énergie instable",
    quality: "uncommon",
    item_level: 30,
    required_level: 25,
    item_class: "Divers",
    item_subclass: "Composant technologique",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_battery_02.jpg",
    description: "Un cristal d'énergie gnome qui crépite d'électricité.",
    stats: []
  },
  {
    id: 45,
    name: "Pièce détachée de robot",
    quality: "common",
    item_level: 28,
    required_level: 22,
    item_class: "Divers",
    item_subclass: "Composant de mécanisme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gizmo_04.jpg",
    description: "Une pièce de robot défaillant récupérée dans Gnomeregan.",
    stats: []
  },

  // Livres et parchemins
  {
    id: 46,
    name: "Manuel de combat avancé",
    quality: "uncommon",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Livre",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_book_09.jpg",
    description: "Un manuel qui enseigne des techniques de combat avancées.",
    stats: []
  },
  {
    id: 47,
    name: "Tome de magie noire",
    quality: "rare",
    item_level: 50,
    required_level: 40,
    item_class: "Divers",
    item_subclass: "Livre",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_book_07.jpg",
    description: "Un tome interdit contenant des sorts de magie noire.",
    stats: []
  },

  // Clés et objets spéciaux
  {
    id: 48,
    name: "Clé de la prison",
    quality: "common",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Clé",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_key_03.jpg",
    description: "Une clé rouillée qui ouvre les cellules de prison.",
    stats: []
  },
  {
    id: 49,
    name: "Orbe de divination",
    quality: "epic",
    item_level: 80,
    required_level: 70,
    item_class: "Divers",
    item_subclass: "Objet magique",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_orb_04.jpg",
    description: "Un orbe mystique qui révèle les secrets cachés.",
    stats: []
  },
  {
    id: 50,
    name: "Lanterne de l'âme",
    quality: "rare",
    item_level: 45,
    required_level: 35,
    item_class: "Divers",
    item_subclass: "Objet magique",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_lantern_01.jpg",
    description: "Une lanterne qui brille d'une lumière spectrale apaisante.",
    stats: []
  }
];

export const mockSources: Record<number, ItemSource[]> = {
  1: [
    { type: "drop", name: "Arthas", location: "Citadelle de la Couronne de glace", difficulty: "25 Héroïque" }
  ],
  2: [
    { type: "drop", name: "Kael'thas", location: "Donjon de la Tempête" },
    { type: "vendor", name: "Marchand de badges", location: "Shattrath" }
  ],
  3: [
    { type: "craft", name: "Forgeron", location: "Recette niveau 60" },
    { type: "quest", name: "Le gardien déchu", location: "Maleterres de l'ouest" }
  ],
  4: [
    { type: "drop", name: "Divers monstres", location: "Azshara" },
    { type: "vendor", name: "Marchand PvP", location: "Orgrimmar/Hurlevent" }
  ],
  5: [
    { type: "craft", name: "Alchimiste", location: "Recette niveau 35" },
    { type: "vendor", name: "Tous les alchimistes", location: "Villes principales" }
  ],
  6: [
    { type: "drop", name: "Ragnaros", location: "Cœur du Magma", difficulty: "10/25" }
  ],
  7: [
    { type: "quest", name: "Première mission", location: "Zone de départ" },
    { type: "drop", name: "Monstres élites", location: "Mille pointes" }
  ],
  8: [
    { type: "drop", name: "Boss de donjon", location: "Profondeurs de Rochenoire" },
    { type: "vendor", name: "Bibliothécaire", location: "Dalaran" }
  ],
  9: [
    { type: "drop", name: "Créatures radioactives", location: "Gnomeregan" },
    { type: "craft", name: "Alchimiste", location: "Recette spéciale" }
  ],
  10: [
    { type: "craft", name: "Enchanteur", location: "Désenchantement d'objets magiques" },
    { type: "vendor", name: "Marchand d'enchantement", location: "Dalaran" }
  ],
  11: [
    { type: "drop", name: "Élémentaires d'arcane", location: "Île de Quel'Danas" },
    { type: "craft", name: "Joaillier", location: "Prospection de minerais" }
  ],
  12: [
    { type: "drop", name: "Ragnaros", location: "Cœur du Magma", difficulty: "40 joueurs" },
    { type: "quest", name: "La main gauche de l'exécuteur", location: "Profondeurs de Rochenoire" }
  ],
  13: [
    { type: "drop", name: "Tirion Fordring", location: "Citadelle de la Couronne de glace", difficulty: "25 Héroïque" },
    { type: "quest", name: "La lumière de l'aube", location: "Maleterres de l'est" }
  ],
  14: [
    { type: "drop", name: "Seigneur de guerre Orc", location: "Draenor" },
    { type: "craft", name: "Forgeron", location: "Recette niveau 55" }
  ],
  15: [
    { type: "drop", name: "Chasseur de vent elfe", location: "Teldrassil" },
    { type: "vendor", name: "Maître archer", location: "Darnassus" }
  ],
  16: [
    { type: "drop", name: "Paladin de la Lumière", location: "Cathédrale de la Lumière" },
    { type: "craft", name: "Forgeron", location: "Recette de maître" }
  ],
  17: [
    { type: "drop", name: "Conquérant mort-vivant", location: "Stratholme" },
    { type: "quest", name: "La chute du conquérant", location: "Maleterres de l'est" }
  ],
  18: [
    { type: "drop", name: "Maître assassin", location: "Repaire des Défias" },
    { type: "craft", name: "Travailleur du cuir", location: "Recette niveau 65" }
  ],
  19: [
    { type: "drop", name: "Élémentaire du vent", location: "Silithus" },
    { type: "vendor", name: "Marchand de Gadgetzan", location: "Tanaris" }
  ],
  20: [
    { type: "drop", name: "Archimage Antonidas", location: "Violet Hold" },
    { type: "quest", name: "Le dernier gardien", location: "Dalaran" }
  ],
  21: [
    { type: "vendor", name: "Marchand de magie", location: "Tour des mages" },
    { type: "drop", name: "Apprenti sorcier", location: "Elwynn Forest" }
  ],
  22: [
    { type: "drop", name: "Dragon rouge", location: "Repaire de l'Aile noire", difficulty: "40 joueurs" },
    { type: "craft", name: "Joaillier", location: "Recette de maître" }
  ],
  23: [
    { type: "drop", name: "Seigneur élémentaire", location: "Plan élémentaire" },
    { type: "quest", name: "L'équilibre des éléments", location: "Gangrebois" }
  ],
  24: [
    { type: "drop", name: "Assassin de l'ombre", location: "Stratholme" },
    { type: "vendor", name: "Marchand noir", location: "Gadgetzan" }
  ],
  25: [
    { type: "drop", name: "Gardien du temple", location: "Temple englouti" },
    { type: "craft", name: "Forgeron", location: "Recette épique" }
  ],
  26: [
    { type: "craft", name: "Alchimiste", location: "Recette niveau 50" },
    { type: "vendor", name: "Maître alchimiste", location: "Undercity" }
  ],
  27: [
    { type: "craft", name: "Mage", location: "Sort niveau 25" },
    { type: "vendor", name: "Fournisseur de mana", location: "Toutes les villes" }
  ],
  28: [
    { type: "vendor", name: "Scribe", location: "Bibliothèque de Dalaran" },
    { type: "drop", name: "Mage oublié", location: "Karazhan" }
  ],
  29: [
    { type: "craft", name: "Mineur", location: "Fonderie de thorium" },
    { type: "drop", name: "Élémentaire de terre", location: "Un'Goro Crater" }
  ],
  30: [
    { type: "drop", name: "Grandes créatures", location: "Féralas" },
    { type: "vendor", name: "Marchand de cuir", location: "Orgrimmar" }
  ],
  31: [
    { type: "drop", name: "Mages corrompus", location: "Scholomance" },
    { type: "craft", name: "Tailleur", location: "Recette de maître" }
  ],
  32: [
    { type: "drop", name: "Herboriste", location: "Mille pointes" },
    { type: "vendor", name: "Marchand d'herbes", location: "Thunder Bluff" }
  ],
  33: [
    { type: "craft", name: "Enchanteur", location: "Désenchantement" },
    { type: "vendor", name: "Fournisseur de composants", location: "Ironforge" }
  ],
  34: [
    { type: "drop", name: "Gardien du temps", location: "Cavernes du temps" },
    { type: "craft", name: "Enchanteur", location: "Recette légendaire" }
  ],
  35: [
    { type: "craft", name: "Joaillier", location: "Taille de gemmes niveau 60" },
    { type: "drop", name: "Dragon de rubis", location: "Grim Batol" }
  ],
  36: [
    { type: "craft", name: "Joaillier", location: "Taille de gemmes niveau 60" },
    { type: "drop", name: "Élémentaire de saphir", location: "Winterspring" }
  ],
  37: [
    { type: "craft", name: "Joaillier", location: "Taille de gemmes niveau 60" },
    { type: "drop", name: "Anciens de la nature", location: "Felwood" }
  ],
  38: [
    { type: "drop", name: "Dragon ancestral", location: "Wyrmrest Temple" },
    { type: "quest", name: "Le dernier dragon", location: "Dragonblight" }
  ],
  39: [
    { type: "quest", name: "Le cœur du monde", location: "Silithus" },
    { type: "drop", name: "C'Thun", location: "Temple d'Ahn'Qiraj", difficulty: "40 joueurs" }
  ],
  40: [
    { type: "quest", name: "Message urgent", location: "Toutes les zones" },
    { type: "vendor", name: "Messager royal", location: "Villes principales" }
  ],
  41: [
    { type: "vendor", name: "Maître d'écurie", location: "Hurlevent/Orgrimmar" },
    { type: "quest", name: "La loyauté du destrier", location: "Elwynn Forest" }
  ],
  42: [
    { type: "drop", name: "Seigneur Frostwhisper", location: "Scholomance" },
    { type: "quest", name: "Le tigre de Winterspring", location: "Winterspring" }
  ],
  43: [
    { type: "drop", name: "Robots défaillants", location: "Gnomeregan" },
    { type: "vendor", name: "Ferrailleur gnome", location: "Ironforge" }
  ],
  44: [
    { type: "drop", name: "Générateurs instables", location: "Gnomeregan" },
    { type: "craft", name: "Ingénieur", location: "Recyclage d'appareils" }
  ],
  45: [
    { type: "drop", name: "Tous les robots", location: "Gnomeregan" },
    { type: "vendor", name: "Marchand de pièces", location: "Tinker Town" }
  ],
  46: [
    { type: "vendor", name: "Instructeur d'armes", location: "Toutes les villes" },
    { type: "quest", name: "Entraînement de base", location: "Zones de départ" }
  ],
  47: [
    { type: "drop", name: "Démoniste corrompu", location: "Felwood" },
    { type: "vendor", name: "Marchand interdit", location: "Gadgetzan" }
  ],
  48: [
    { type: "drop", name: "Geôlier", location: "Stockade" },
    { type: "quest", name: "Évasion de prison", location: "Hurlevent" }
  ],
  49: [
    { type: "drop", name: "Oracle aveugle", location: "Azshara" },
    { type: "quest", name: "Visions du futur", location: "Tanaris" }
  ],
  50: [
    { type: "drop", name: "Fantôme errant", location: "Caer Darrow" },
    { type: "vendor", name: "Marchand spectral", location: "Desolace" }
  ]
};