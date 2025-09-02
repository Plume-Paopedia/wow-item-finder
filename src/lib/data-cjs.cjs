// CommonJS export of mock data for dev-server usage

const mockItems = [
  // Armes légendaires les plus iconiques
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
    id: 51,
    name: "Frostmourne",
    quality: "legendary",
    item_level: 350,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Épée à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_frostmourne.jpg",
    description: "L'épée maudite d'Arthas, qui a corrompu son âme.",
    stats: [
      { name: "Dégâts d'attaque", value: 4200 },
      { name: "Force", value: 210 },
      { name: "Endurance", value: 315 }
    ]
  },
  {
    id: 2,
    name: "Shadowmourne",
    quality: "legendary",
    item_level: 284,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Hache à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_axe_113.jpg",
    description: "Une hache forgée avec les âmes des démons."
  },
  {
    id: 3,
    name: "Épée de mille vérités",
    quality: "legendary",
    item_level: 285,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Épée à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_61.jpg",
    description: "Une épée qui révèle la vérité à son porteur."
  },
  {
    id: 4,
    name: "Marteau de Ragnaros",
    quality: "legendary",
    item_level: 80,
    required_level: 60,
    item_class: "Arme",
    item_subclass: "Marteau à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_hammer_unique_sulfuras.jpg",
    description: "Le marteau du seigneur du feu Ragnaros."
  },
  {
    id: 5,
    name: "Lame du crépuscule",
    quality: "epic",
    item_level: 200,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Épée à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_40.jpg",
    description: "Une épée forgée dans l'obscurité absolue."
  },
  {
    id: 6,
    name: "Arc d'Arcanis",
    quality: "epic",
    item_level: 180,
    required_level: 65,
    item_class: "Arme",
    item_subclass: "Arc",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_weapon_bow_07.jpg",
    description: "Un arc enchanté par la magie arcane."
  },
  {
    id: 7,
    name: "Bâton de puissance",
    quality: "epic",
    item_level: 220,
    required_level: 75,
    item_class: "Arme",
    item_subclass: "Bâton",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_staff_13.jpg",
    description: "Un bâton débordant de puissance magique."
  },
  {
    id: 8,
    name: "Dague de l'ombre",
    quality: "rare",
    item_level: 150,
    required_level: 60,
    item_class: "Arme",
    item_subclass: "Dague",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_weapon_shortblade_05.jpg",
    description: "Une dague qui se fond dans les ombres."
  },
  {
    id: 9,
    name: "Masse sacrée",
    quality: "rare",
    item_level: 140,
    required_level: 58,
    item_class: "Arme",
    item_subclass: "Masse d'armes",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_mace_13.jpg",
    description: "Une masse bénie par la lumière divine."
  },
  {
    id: 10,
    name: "Hache de guerre tribale",
    quality: "uncommon",
    item_level: 100,
    required_level: 45,
    item_class: "Arme",
    item_subclass: "Hache à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_axe_05.jpg",
    description: "Une hache utilisée par les tribus barbares."
  },
  {
    id: 11,
    name: "Casque du roi dragon",
    quality: "legendary",
    item_level: 290,
    required_level: 80,
    item_class: "Armure",
    item_subclass: "Casque de plaques",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_74.jpg",
    description: "Le casque légendaire du roi des dragons."
  },
  {
    id: 12,
    name: "Plastron de l'éternité",
    quality: "epic",
    item_level: 245,
    required_level: 78,
    item_class: "Armure",
    item_subclass: "Torse de plaques",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_plate06.jpg",
    description: "Une armure qui défie le temps lui-même."
  },
  {
    id: 13,
    name: "Gants de maître artisan",
    quality: "epic",
    item_level: 200,
    required_level: 70,
    item_class: "Armure",
    item_subclass: "Gants de cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_05.jpg",
    description: "Des gants parfaits pour l'artisanat de précision."
  },
  {
    id: 14,
    name: "Bottes de marche céleste",
    quality: "rare",
    item_level: 180,
    required_level: 65,
    item_class: "Armure",
    item_subclass: "Bottes de tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_boots_cloth_03.jpg",
    description: "Des bottes qui permettent de marcher sur les nuages."
  },
  {
    id: 15,
    name: "Ceinture du champion",
    quality: "rare",
    item_level: 160,
    required_level: 62,
    item_class: "Armure",
    item_subclass: "Ceinture de mailles",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_belt_03.jpg",
    description: "La ceinture portée par les plus grands champions."
  },
  {
    id: 16,
    name: "Anneau de puissance arcane",
    quality: "epic",
    item_level: 200,
    required_level: 70,
    item_class: "Bijou",
    item_subclass: "Anneau",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_jewelry_ring_05.jpg",
    description: "Un anneau qui amplifie les sorts arcaniques."
  },
  {
    id: 17,
    name: "Collier du gardien",
    quality: "rare",
    item_level: 175,
    required_level: 64,
    item_class: "Bijou",
    item_subclass: "Amulette",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_jewelry_necklace_07.jpg",
    description: "Un collier qui protège des malédictions."
  },
  {
    id: 18,
    name: "Cape de l'invisibilité",
    quality: "epic",
    item_level: 190,
    required_level: 68,
    item_class: "Armure",
    item_subclass: "Dos",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_cape_18.jpg",
    description: "Une cape qui permet de se fondre dans l'environnement."
  },
  {
    id: 19,
    name: "Bouclier du protecteur",
    quality: "rare",
    item_level: 165,
    required_level: 63,
    item_class: "Armure",
    item_subclass: "Bouclier",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_shield_09.jpg",
    description: "Un bouclier gravé de runes protectrices."
  },
  {
    id: 20,
    name: "Potion de soins majeurs",
    quality: "common",
    item_level: 45,
    required_level: 35,
    item_class: "Consommable",
    item_subclass: "Potion",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_54.jpg",
    description: "Restaure une grande quantité de points de vie."
  },
  {
    id: 21,
    name: "Élixir de force de géant",
    quality: "uncommon",
    item_level: 55,
    required_level: 40,
    item_class: "Consommable",
    item_subclass: "Élixir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_61.jpg",
    description: "Augmente considérablement la force pendant 1 heure."
  },
  {
    id: 22,
    name: "Parchemin de téléportation",
    quality: "common",
    item_level: 20,
    required_level: 15,
    item_class: "Consommable",
    item_subclass: "Parchemin",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_scroll_03.jpg",
    description: "Permet de se téléporter instantanément en ville."
  },
  {
    id: 23,
    name: "Gemme de sagesse",
    quality: "rare",
    item_level: 70,
    required_level: 1,
    item_class: "Gemme",
    item_subclass: "Meta",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_01.jpg",
    description: "Une gemme qui augmente l'intellect et la sagesse."
  },
  {
    id: 24,
    name: "Cristal de puissance",
    quality: "epic",
    item_level: 85,
    required_level: 1,
    item_class: "Gemme",
    item_subclass: "Rouge",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_02.jpg",
    description: "Un cristal rouge qui brille d'une puissance mystique."
  },
  {
    id: 25,
    name: "Fluide fluorescent",
    quality: "common",
    item_level: 30,
    required_level: 25,
    item_class: "Article de métier",
    item_subclass: "Réactif",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_05.jpg",
    description: "Un fluide qui brille dans l'obscurité, utilisé en alchimie."
  },
  {
    id: 26,
    name: "Minerai de thorium",
    quality: "uncommon",
    item_level: 50,
    required_level: 1,
    item_class: "Article de métier",
    item_subclass: "Métal et pierre",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_ore_thorium_01.jpg",
    description: "Un minerai rare et précieux utilisé en forge."
  },
  {
    id: 27,
    name: "Cuir draconique",
    quality: "rare",
    item_level: 65,
    required_level: 1,
    item_class: "Article de métier",
    item_subclass: "Travail du cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_leatherscrap_03.jpg",
    description: "La peau écailleuse d'un puissant dragon."
  },
  {
    id: 28,
    name: "Herbe fantôme",
    quality: "uncommon",
    item_level: 40,
    required_level: 1,
    item_class: "Article de métier",
    item_subclass: "Herbe",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_herb_02.jpg",
    description: "Une herbe mystique qui apparaît et disparaît."
  },
  {
    id: 29,
    name: "Épée en mithril",
    quality: "uncommon",
    item_level: 90,
    required_level: 42,
    item_class: "Arme",
    item_subclass: "Épée à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_20.jpg",
    description: "Une épée forgée dans le précieux mithril."
  },
  {
    id: 30,
    name: "Plastron en écailles de dragon",
    quality: "rare",
    item_level: 120,
    required_level: 50,
    item_class: "Armure",
    item_subclass: "Torse de mailles",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_scale_01.jpg",
    description: "Une armure faite des écailles d'un ancien dragon."
  }
];

// Simple search function for fallback
function searchMockItems(query, limit = 100, locale = 'fr_FR') {
  if (!query.trim()) {
    return mockItems.slice(0, limit);
  }

  const searchTerm = query.toLowerCase().trim();
  
  const results = mockItems.filter(item => {
    // Search in item name
    if (item.name.toLowerCase().includes(searchTerm)) return true;
    
    // Search in item class
    if (item.item_class.toLowerCase().includes(searchTerm)) return true;
    
    // Search in item subclass
    if (item.item_subclass.toLowerCase().includes(searchTerm)) return true;
    
    // Search in description
    if (item.description && item.description.toLowerCase().includes(searchTerm)) return true;

    // Enhanced search for French/English terms mapping
    const termMappings = {
      'épée': ['sword', 'épée'],
      'arme': ['weapon', 'arme'],
      'armure': ['armor', 'armure'],
      'bouclier': ['shield', 'bouclier'],
      'bâton': ['staff', 'bâton'],
      'dague': ['dagger', 'dague'],
      'arc': ['bow', 'arc'],
      'masse': ['mace', 'masse'],
      'hache': ['axe', 'hache'],
      'casque': ['helmet', 'casque'],
      'gants': ['gloves', 'gants'],
      'bottes': ['boots', 'bottes'],
      'ceinture': ['belt', 'ceinture'],
      'anneau': ['ring', 'anneau'],
      'collier': ['necklace', 'collier'],
      'cape': ['cloak', 'cape'],
      'potion': ['potion'],
      'élixir': ['elixir'],
      'parchemin': ['scroll', 'parchemin'],
      'gemme': ['gem', 'gemme'],
      'fluide': ['fluid', 'fluide'],
      'fluorescent': ['fluorescent'],
      'sword': ['épée', 'sword'],
      'weapon': ['arme', 'weapon'],
      'armor': ['armure', 'armor'],
      'shield': ['bouclier', 'shield'],
      'staff': ['bâton', 'staff'],
      'dagger': ['dague', 'dagger'],
      'bow': ['arc', 'bow'],
      'mace': ['masse', 'mace'],
      'axe': ['hache', 'axe'],
      'helmet': ['casque', 'helmet'],
      'gloves': ['gants', 'gloves'],
      'boots': ['bottes', 'boots'],
      'belt': ['ceinture', 'belt'],
      'ring': ['anneau', 'ring'],
      'necklace': ['collier', 'necklace'],
      'cloak': ['cape', 'cloak']
    };

    // Check if search term matches any mapped terms
    for (const [key, mappedTerms] of Object.entries(termMappings)) {
      if (searchTerm.includes(key.toLowerCase())) {
        for (const mappedTerm of mappedTerms) {
          if (item.name.toLowerCase().includes(mappedTerm.toLowerCase()) ||
              item.item_class.toLowerCase().includes(mappedTerm.toLowerCase()) ||
              item.item_subclass.toLowerCase().includes(mappedTerm.toLowerCase()) ||
              (item.description && item.description.toLowerCase().includes(mappedTerm.toLowerCase()))) {
            return true;
          }
        }
      }
    }

    return false;
  });

  // Sort by relevance (exact matches first, then partial matches)
  results.sort((a, b) => {
    const aExactName = a.name.toLowerCase() === searchTerm;
    const bExactName = b.name.toLowerCase() === searchTerm;
    
    if (aExactName && !bExactName) return -1;
    if (!aExactName && bExactName) return 1;
    
    const aStartsWithName = a.name.toLowerCase().startsWith(searchTerm);
    const bStartsWithName = b.name.toLowerCase().startsWith(searchTerm);
    
    if (aStartsWithName && !bStartsWithName) return -1;
    if (!aStartsWithName && bStartsWithName) return 1;
    
    // Sort by quality (legendary first)
    const qualityOrder = { legendary: 6, epic: 5, rare: 4, uncommon: 3, common: 2, poor: 1 };
    return (qualityOrder[b.quality] || 0) - (qualityOrder[a.quality] || 0);
  });

  return results.slice(0, limit);
}

module.exports = { mockItems, searchMockItems };