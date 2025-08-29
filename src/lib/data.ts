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
  ]
};