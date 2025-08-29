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
      { name: "Force", value: 250 },
      { name: "Endurance", value: 350 },
      { name: "Critique", value: 180 }
    ]
  },
  {
    id: 52,
    name: "Doomhammer",
    quality: "legendary",
    item_level: 300,
    required_level: 85,
    item_class: "Arme",
    item_subclass: "Masse à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_hammer_unique_doomhammer.jpg",
    description: "Le marteau ancestral de Thrall, symbole du Frostwolf.",
    stats: [
      { name: "Dégâts d'attaque", value: 2890 },
      { name: "Agilité", value: 145 },
      { name: "Endurance", value: 234 },
      { name: "Hâte", value: 156 }
    ]
  },
  {
    id: 53,
    name: "Gorehowl",
    quality: "legendary",
    item_level: 290,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Hache à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_axe_104.jpg",
    description: "La hache légendaire de Grom Hellscream, père de Garrosh.",
    stats: [
      { name: "Dégâts d'attaque", value: 3450 },
      { name: "Force", value: 189 },
      { name: "Endurance", value: 267 },
      { name: "Critique", value: 134 }
    ]
  },
  {
    id: 54,
    name: "Atiesh, Grand bâton du gardien",
    quality: "legendary",
    item_level: 233,
    required_level: 60,
    item_class: "Arme",
    item_subclass: "Bâton",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_staff_medivh.jpg",
    description: "Le bâton de Medivh, dernier gardien de Tirisfal.",
    stats: [
      { name: "Puissance des sorts", value: 567 },
      { name: "Intellect", value: 156 },
      { name: "Endurance", value: 189 },
      { name: "Esprit", value: 123 }
    ]
  },
  {
    id: 55,
    name: "Les Jumeaux Maudits",
    quality: "legendary",
    item_level: 310,
    required_level: 85,
    item_class: "Arme",
    item_subclass: "Dague",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_weapon_glave_01.jpg",
    description: "Les glaives jumeaux d'Illidan Stormrage.",
    stats: [
      { name: "Dégâts d'attaque", value: 2134 },
      { name: "Agilité", value: 234 },
      { name: "Endurance", value: 178 },
      { name: "Critique", value: 189 }
    ]
  },
  {
    id: 56,
    name: "Thori'dal, les Étoiles de la Fureur",
    quality: "legendary",
    item_level: 275,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Arc",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_weapon_bow_thori_dal.jpg",
    description: "L'arc légendaire qui n'a jamais besoin de munitions.",
    stats: [
      { name: "Dégâts d'attaque", value: 3012 },
      { name: "Agilité", value: 198 },
      { name: "Endurance", value: 156 },
      { name: "Hâte", value: 134 }
    ]
  },
  {
    id: 57,
    name: "Thunderfury, Lame bénie du Très-Père du vent",
    quality: "legendary",
    item_level: 230,
    required_level: 60,
    item_class: "Arme",
    item_subclass: "Épée à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_39.jpg",
    description: "L'épée légendaire forgée avec l'essence du Prince du tonnerre.",
    stats: [
      { name: "Dégâts d'attaque", value: 2567 },
      { name: "Agilité", value: 134 },
      { name: "Force", value: 123 },
      { name: "Endurance", value: 189 }
    ]
  },
  {
    id: 58,
    name: "Val'anyr, Marteau des Rois anciens",
    quality: "legendary",
    item_level: 290,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Masse à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_hammer_94.jpg",
    description: "Le marteau légendaire d'Ulduar, forgé par les Titans.",
    stats: [
      { name: "Puissance des sorts", value: 634 },
      { name: "Intellect", value: 178 },
      { name: "Endurance", value: 234 },
      { name: "Esprit", value: 145 }
    ]
  },
  {
    id: 59,
    name: "Shadowmourne",
    quality: "legendary",
    item_level: 294,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Hache à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_axe_113.jpg",
    description: "Une hache forgée avec l'âme de mille ennemis vaincus.",
    stats: [
      { name: "Dégâts d'attaque", value: 3789 },
      { name: "Force", value: 234 },
      { name: "Endurance", value: 312 },
      { name: "Critique", value: 167 }
    ]
  },
  // Plus d'armes épiques classiques et icônes de WoW
  {
    id: 60,
    name: "Épée de mille vérités",
    quality: "epic",
    item_level: 264,
    required_level: 85,
    item_class: "Arme",
    item_subclass: "Épée à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_48.jpg",
    description: "Une épée qui révèle la vérité par la lame.",
    stats: [
      { name: "Dégâts d'attaque", value: 2456 },
      { name: "Force", value: 145 },
      { name: "Endurance", value: 189 },
      { name: "Toucher", value: 89 }
    ]
  },
  {
    id: 61,
    name: "Maître-lame de la Mer intérieure",
    quality: "epic",
    item_level: 245,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Épée à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_35.jpg",
    description: "Une épée trempée dans les eaux sacrées du lac Elune'ara.",
    stats: [
      { name: "Dégâts d'attaque", value: 2234 },
      { name: "Intellect", value: 123 },
      { name: "Endurance", value: 167 },
      { name: "Puissance des sorts", value: 345 }
    ]
  },
  {
    id: 62,
    name: "Lame de la Horde noire",
    quality: "epic",
    item_level: 226,
    required_level: 60,
    item_class: "Arme",
    item_subclass: "Épée à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_50.jpg",
    description: "Forgée dans les forges de la Horde sous le commandement de Blackhand.",
    stats: [
      { name: "Dégâts d'attaque", value: 2890 },
      { name: "Force", value: 134 },
      { name: "Endurance", value: 178 },
      { name: "Critique", value: 89 }
    ]
  },
  {
    id: 63,
    name: "Tueuse de dragons",
    quality: "epic",
    item_level: 280,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Lance",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_spear_08.jpg",
    description: "Une lance bénie spécialement conçue pour percer les écailles de dragon.",
    stats: [
      { name: "Dégâts d'attaque", value: 3245 },
      { name: "Force", value: 189 },
      { name: "Endurance", value: 234 },
      { name: "Pénétration d'armure", value: 156 }
    ]
  },
  {
    id: 64,
    name: "Hache barbare de Dragonmaw",
    quality: "epic",
    item_level: 213,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Hache à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_axe_09.jpg",
    description: "Hache de guerre traditionnelle du clan Dragonmaw.",
    stats: [
      { name: "Dégâts d'attaque", value: 1967 },
      { name: "Force", value: 112 },
      { name: "Endurance", value: 145 },
      { name: "Hâte", value: 67 }
    ]
  },
  {
    id: 65,
    name: "Bâton de l'Archimage Antonidas",
    quality: "epic",
    item_level: 264,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Bâton",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_staff_30.jpg",
    description: "Le bâton personnel d'Antonidas, leader de Dalaran.",
    stats: [
      { name: "Puissance des sorts", value: 578 },
      { name: "Intellect", value: 178 },
      { name: "Endurance", value: 189 },
      { name: "Esprit", value: 134 }
    ]
  },
  {
    id: 66,
    name: "Arc des gardiens de la lune",
    quality: "epic",
    item_level: 245,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Arc",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_weapon_bow_17.jpg",
    description: "Un arc elfe de nuit béni par Elune elle-même.",
    stats: [
      { name: "Dégâts d'attaque", value: 2678 },
      { name: "Agilité", value: 156 },
      { name: "Endurance", value: 134 },
      { name: "Critique", value: 89 }
    ]
  },
  {
    id: 67,
    name: "Dague du Tisserand d'ombres",
    quality: "epic",
    item_level: 226,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Dague",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_weapon_shortblade_25.jpg",
    description: "Une dague qui semble absorber la lumière autour d'elle.",
    stats: [
      { name: "Dégâts d'attaque", value: 1567 },
      { name: "Agilité", value: 134 },
      { name: "Endurance", value: 89 },
      { name: "Énergie", value: 245 }
    ]
  },
  {
    id: 68,
    name: "Marteau de guerre de Bronzebeard",
    quality: "epic",
    item_level: 200,
    required_level: 60,
    item_class: "Arme",
    item_subclass: "Masse à deux mains",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_hammer_17.jpg",
    description: "Le marteau de guerre traditionnel des nains Bronzebeard.",
    stats: [
      { name: "Dégâts d'attaque", value: 2456 },
      { name: "Force", value: 123 },
      { name: "Endurance", value: 156 },
      { name: "Blocage", value: 45 }
    ]
  },
  {
    id: 69,
    name: "Sceptre du Grand prêtre",
    quality: "epic",
    item_level: 239,
    required_level: 70,
    item_class: "Arme",
    item_subclass: "Masse à une main",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_mace_27.jpg",
    description: "Un sceptre béni par la Lumière sainte.",
    stats: [
      { name: "Puissance des sorts", value: 456 },
      { name: "Intellect", value: 134 },
      { name: "Endurance", value: 112 },
      { name: "Esprit", value: 89 }
    ]
  },
  {
    id: 70,
    name: "Gantelet de puissance titan",
    quality: "epic",
    item_level: 284,
    required_level: 80,
    item_class: "Arme",
    item_subclass: "Arme de poing",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_04.jpg",
    description: "Un gantelet forgé avec la technologie des Titans.",
    stats: [
      { name: "Dégâts d'attaque", value: 1789 },
      { name: "Force", value: 156 },
      { name: "Endurance", value: 189 },
      { name: "Hâte", value: 123 }
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

  // Sets d'armures épiques complets - Tier Sets iconiques
  {
    id: 100,
    name: "Casque de Jugement",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Casque de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_74.jpg",
    description: "Casque du set Tier 2 des Paladins, forgé dans la justice divine.",
    stats: [
      { name: "Armure", value: 1456 },
      { name: "Force", value: 89 },
      { name: "Endurance", value: 123 },
      { name: "Intellect", value: 67 }
    ]
  },
  {
    id: 101,
    name: "Plastron de Jugement",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Plastron de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_plate06.jpg",
    description: "Plastron du set Tier 2 des Paladins, orné des symboles de la Lumière.",
    stats: [
      { name: "Armure", value: 2134 },
      { name: "Force", value: 134 },
      { name: "Endurance", value: 189 },
      { name: "Intellect", value: 89 }
    ]
  },
  {
    id: 102,
    name: "Jambières de Jugement",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Jambières de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_pants_04.jpg",
    description: "Jambières du set Tier 2 des Paladins.",
    stats: [
      { name: "Armure", value: 1789 },
      { name: "Force", value: 112 },
      { name: "Endurance", value: 156 },
      { name: "Intellect", value: 78 }
    ]
  },
  {
    id: 103,
    name: "Gantelets de Jugement",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Gantelets de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_30.jpg",
    description: "Gantelets du set Tier 2 des Paladins.",
    stats: [
      { name: "Armure", value: 1234 },
      { name: "Force", value: 78 },
      { name: "Endurance", value: 112 },
      { name: "Intellect", value: 56 }
    ]
  },
  {
    id: 104,
    name: "Sabatons de Jugement",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Bottes de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_boots_plate_09.jpg",
    description: "Sabatons du set Tier 2 des Paladins.",
    stats: [
      { name: "Armure", value: 1123 },
      { name: "Force", value: 67 },
      { name: "Endurance", value: 89 },
      { name: "Intellect", value: 45 }
    ]
  },
  {
    id: 105,
    name: "Spaulières de Jugement",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Épaulières de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_shoulder_23.jpg",
    description: "Épaulières du set Tier 2 des Paladins.",
    stats: [
      { name: "Armure", value: 1012 },
      { name: "Force", value: 56 },
      { name: "Endurance", value: 78 },
      { name: "Intellect", value: 34 }
    ]
  },
  {
    id: 106,
    name: "Ceinture de Jugement",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Ceinture de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_belt_34.jpg",
    description: "Ceinture du set Tier 2 des Paladins.",
    stats: [
      { name: "Armure", value: 890 },
      { name: "Force", value: 45 },
      { name: "Endurance", value: 67 },
      { name: "Intellect", value: 23 }
    ]
  },
  {
    id: 107,
    name: "Brassards de Jugement",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Brassards de plates",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_bracer_07.jpg",
    description: "Brassards du set Tier 2 des Paladins.",
    stats: [
      { name: "Armure", value: 756 },
      { name: "Force", value: 34 },
      { name: "Endurance", value: 56 },
      { name: "Intellect", value: 12 }
    ]
  },
  // Set Nemesis (Démoniste T2)
  {
    id: 108,
    name: "Capuche de Nemesis",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Casque de tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_08.jpg",
    description: "Capuche du set Tier 2 des Démonistes, imprégnée de magie noire.",
    stats: [
      { name: "Armure", value: 456 },
      { name: "Intellect", value: 134 },
      { name: "Endurance", value: 89 },
      { name: "Puissance des sorts", value: 567 }
    ]
  },
  {
    id: 109,
    name: "Robe de Nemesis",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Robe",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_cloth_17.jpg",
    description: "Robe du set Tier 2 des Démonistes.",
    stats: [
      { name: "Armure", value: 678 },
      { name: "Intellect", value: 189 },
      { name: "Endurance", value: 123 },
      { name: "Puissance des sorts", value: 789 }
    ]
  },
  {
    id: 110,
    name: "Jambières de Nemesis",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Jambières de tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_pants_cloth_14.jpg",
    description: "Jambières du set Tier 2 des Démonistes.",
    stats: [
      { name: "Armure", value: 567 },
      { name: "Intellect", value: 156 },
      { name: "Endurance", value: 112 },
      { name: "Puissance des sorts", value: 678 }
    ]
  },
  {
    id: 111,
    name: "Gantelets de Nemesis",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Gantelets de tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_14.jpg",
    description: "Gantelets du set Tier 2 des Démonistes.",
    stats: [
      { name: "Armure", value: 345 },
      { name: "Intellect", value: 89 },
      { name: "Endurance", value: 67 },
      { name: "Puissance des sorts", value: 456 }
    ]
  },
  {
    id: 112,
    name: "Bottes de Nemesis",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Bottes de tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_boots_cloth_05.jpg",
    description: "Bottes du set Tier 2 des Démonistes.",
    stats: [
      { name: "Armure", value: 312 },
      { name: "Intellect", value: 78 },
      { name: "Endurance", value: 56 },
      { name: "Puissance des sorts", value: 389 }
    ]
  },
  {
    id: 113,
    name: "Spaulières de Nemesis",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Épaulières de tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_shoulder_25.jpg",
    description: "Épaulières du set Tier 2 des Démonistes.",
    stats: [
      { name: "Armure", value: 278 },
      { name: "Intellect", value: 67 },
      { name: "Endurance", value: 45 },
      { name: "Puissance des sorts", value: 334 }
    ]
  },
  {
    id: 114,
    name: "Ceinture de Nemesis",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Ceinture de tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_belt_06.jpg",
    description: "Ceinture du set Tier 2 des Démonistes.",
    stats: [
      { name: "Armure", value: 234 },
      { name: "Intellect", value: 56 },
      { name: "Endurance", value: 34 },
      { name: "Puissance des sorts", value: 278 }
    ]
  },
  {
    id: 115,
    name: "Brassards de Nemesis",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Brassards de tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_bracer_07.jpg",
    description: "Brassards du set Tier 2 des Démonistes.",
    stats: [
      { name: "Armure", value: 189 },
      { name: "Intellect", value: 45 },
      { name: "Endurance", value: 23 },
      { name: "Puissance des sorts", value: 223 }
    ]
  },
  // Set Bloodfang (Voleur T2)
  {
    id: 116,
    name: "Capuche de Croc-de-sang",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Casque de cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_41.jpg",
    description: "Capuche du set Tier 2 des Voleurs, taillée dans l'ombre.",
    stats: [
      { name: "Armure", value: 789 },
      { name: "Agilité", value: 134 },
      { name: "Endurance", value: 89 },
      { name: "Énergie", value: 456 }
    ]
  },
  {
    id: 117,
    name: "Tunique de Croc-de-sang",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Tunique de cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_leather_03.jpg",
    description: "Tunique du set Tier 2 des Voleurs.",
    stats: [
      { name: "Armure", value: 1156 },
      { name: "Agilité", value: 189 },
      { name: "Endurance", value: 123 },
      { name: "Énergie", value: 634 }
    ]
  },
  {
    id: 118,
    name: "Jambières de Croc-de-sang",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Jambières de cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_pants_leather_13.jpg",
    description: "Jambières du set Tier 2 des Voleurs.",
    stats: [
      { name: "Armure", value: 967 },
      { name: "Agilité", value: 156 },
      { name: "Endurance", value: 112 },
      { name: "Énergie", value: 534 }
    ]
  },
  {
    id: 119,
    name: "Gantelets de Croc-de-sang",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Gantelets de cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_19.jpg",
    description: "Gantelets du set Tier 2 des Voleurs.",
    stats: [
      { name: "Armure", value: 567 },
      { name: "Agilité", value: 89 },
      { name: "Endurance", value: 67 },
      { name: "Énergie", value: 345 }
    ]
  },
  {
    id: 120,
    name: "Bottes de Croc-de-sang",
    quality: "epic",
    item_level: 232,
    required_level: 60,
    item_class: "Armure",
    item_subclass: "Bottes de cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_boots_08.jpg",
    description: "Bottes du set Tier 2 des Voleurs.",
    stats: [
      { name: "Armure", value: 489 },
      { name: "Agilité", value: 78 },
      { name: "Endurance", value: 56 },
      { name: "Énergie", value: 289 }
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

  // Plus de consommables et potions variées
  {
    id: 200,
    name: "Grande potion de mana",
    quality: "common",
    item_level: 55,
    required_level: 45,
    item_class: "Consommable",
    item_subclass: "Potion",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_76.jpg",
    description: "Restaure instantanément 2000 points de mana.",
    stats: []
  },
  {
    id: 201,
    name: "Potion de soins supérieure",
    quality: "uncommon",
    item_level: 60,
    required_level: 50,
    item_class: "Consommable",
    item_subclass: "Potion",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_54.jpg",
    description: "Restaure instantanément 2500 points de vie.",
    stats: []
  },
  {
    id: 202,
    name: "Élixir d'agilité de Mongoose",
    quality: "rare",
    item_level: 70,
    required_level: 60,
    item_class: "Consommable",
    item_subclass: "Élixir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_32.jpg",
    description: "Augmente l'agilité de 25 et la chance critique de 2% pendant 1 heure.",
    stats: []
  },
  {
    id: 203,
    name: "Flask of the Titans",
    quality: "rare",
    item_level: 75,
    required_level: 60,
    item_class: "Consommable",
    item_subclass: "Flacon",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_62.jpg",
    description: "Augmente les points de vie de 1200 pendant 2 heures. Persiste à travers la mort.",
    stats: []
  },
  {
    id: 204,
    name: "Nourriture de Noël du Chef",
    quality: "rare",
    item_level: 65,
    required_level: 55,
    item_class: "Consommable",
    item_subclass: "Nourriture",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_food_64.jpg",
    description: "Régénère 2148 points de vie et 4410 mana sur 30 sec. Augmente l'endurance de 20 pendant 15 min.",
    stats: []
  },
  {
    id: 205,
    name: "Parchemin d'agilité V",
    quality: "uncommon",
    item_level: 50,
    required_level: 40,
    item_class: "Consommable",
    item_subclass: "Parchemin",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_scroll_03.jpg",
    description: "Augmente l'agilité de 17 pendant 30 minutes.",
    stats: []
  },
  {
    id: 206,
    name: "Huile de sorcier mineure",
    quality: "common",
    item_level: 30,
    required_level: 20,
    item_class: "Consommable",
    item_subclass: "Huile d'arme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_25.jpg",
    description: "Imbibe l'arme d'une magie qui augmente les dégâts des sorts de 8 pendant 30 minutes.",
    stats: []
  },
  {
    id: 207,
    name: "Pierre d'affûtage dense",
    quality: "common",
    item_level: 55,
    required_level: 45,
    item_class: "Consommable",
    item_subclass: "Pierre d'affûtage",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_stone_sharpeningstone_02.jpg",
    description: "Augmente les dégâts de l'arme de 8 pendant 30 minutes.",
    stats: []
  },
  {
    id: 208,
    name: "Bandage de laine lourde",
    quality: "common",
    item_level: 25,
    required_level: 15,
    item_class: "Consommable",
    item_subclass: "Bandage",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_12.jpg",
    description: "Soigne 640 points de vie sur 8 sec.",
    stats: []
  },
  {
    id: 209,
    name: "Antidote puissant",
    quality: "uncommon",
    item_level: 45,
    required_level: 35,
    item_class: "Consommable",
    item_subclass: "Antidote",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_17.jpg",
    description: "Guérit les poisons et confère une immunité temporaire.",
    stats: []
  },
  {
    id: 210,
    name: "Bombe de gobelin",
    quality: "uncommon",
    item_level: 40,
    required_level: 30,
    item_class: "Consommable",
    item_subclass: "Explosif",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bomb_04.jpg",
    description: "Inflige entre 315 et 385 points de dégâts de feu dans un rayon de 3 mètres.",
    stats: []
  },
  // Matériaux d'artisanat étendus
  {
    id: 250,
    name: "Barre d'arcanite",
    quality: "epic",
    item_level: 60,
    required_level: 50,
    item_class: "Divers",
    item_subclass: "Métal et pierre",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_ingot_08.jpg",
    description: "Un métal rare et précieux, résultat de l'alchimie avancée.",
    stats: []
  },
  {
    id: 251,
    name: "Cuir de dragon noir",
    quality: "epic",
    item_level: 65,
    required_level: 55,
    item_class: "Divers",
    item_subclass: "Cuir",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_leatherscrap_10.jpg",
    description: "Cuir extrêmement résistant provenant des dragons noirs d'Azeroth.",
    stats: []
  },
  {
    id: 252,
    name: "Tissu de néant-étoffe",
    quality: "epic",
    item_level: 70,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Tissu",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_fabric_netherweave.jpg",
    description: "Tissu mystique tissé avec les énergies du Néant.",
    stats: []
  },
  {
    id: 253,
    name: "Or de sang",
    quality: "rare",
    item_level: 55,
    required_level: 45,
    item_class: "Divers",
    item_subclass: "Herbe",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_herb_bloodthistle.jpg",
    description: "Une herbe rare qui pousse dans les zones corrompues.",
    stats: []
  },
  {
    id: 254,
    name: "Rêverêves",
    quality: "rare",
    item_level: 50,
    required_level: 40,
    item_class: "Divers",
    item_subclass: "Herbe",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_herb_dreamfoil.jpg",
    description: "Une herbe éthérée qui ne pousse que dans les rêves.",
    stats: []
  },
  {
    id: 255,
    name: "Minerai de thorium riche",
    quality: "uncommon",
    item_level: 50,
    required_level: 40,
    item_class: "Divers",
    item_subclass: "Métal et pierre",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_ore_thorium_01.jpg",
    description: "Un minerai de thorium particulièrement pur et dense.",
    stats: []
  },
  {
    id: 256,
    name: "Cœur ardent",
    quality: "epic",
    item_level: 60,
    required_level: 50,
    item_class: "Divers",
    item_subclass: "Composant d'artisanat",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_flame_01.jpg",
    description: "Le cœur encore palpitant d'un élémentaire de feu majeur.",
    stats: []
  },
  {
    id: 257,
    name: "Écaille de dragon bleu mature",
    quality: "rare",
    item_level: 55,
    required_level: 45,
    item_class: "Divers",
    item_subclass: "Composant d'artisanat",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_monsterscales_14.jpg",
    description: "Une écaille brillante d'un dragon bleu adulte.",
    stats: []
  },
  {
    id: 258,
    name: "Sève d'arbre-monde",
    quality: "epic",
    item_level: 70,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Composant d'artisanat",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_herb_ancientmoss.jpg",
    description: "La sève sacrée de Teldrassil, l'arbre-monde des elfes de la nuit.",
    stats: []
  },
  {
    id: 259,
    name: "Poudre de marche-rêve",
    quality: "rare",
    item_level: 45,
    required_level: 35,
    item_class: "Divers",
    item_subclass: "Réactif",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_powder_purple.jpg",
    description: "Une poudre mystique qui permet d'accéder au Rêve d'émeraude.",
    stats: []
  },
  // Gemmes et enchantements étendus
  {
    id: 300,
    name: "Diamant étoilé de Elune",
    quality: "epic",
    item_level: 80,
    required_level: 70,
    item_class: "Divers",
    item_subclass: "Pierre de gemme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_diamond_03.jpg",
    description: "Un diamant rare béni par la déesse Elune elle-même.",
    stats: [
      { name: "Toutes les statistiques", value: 8 }
    ]
  },
  {
    id: 301,
    name: "Topaze du roi",
    quality: "rare",
    item_level: 70,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Pierre de gemme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_topaz_02.jpg",
    description: "Une topaze dorée digne d'orner la couronne d'un roi.",
    stats: [
      { name: "Force", value: 12 },
      { name: "Endurance", value: 8 }
    ]
  },
  {
    id: 302,
    name: "Éclat de néant",
    quality: "epic",
    item_level: 75,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Enchantement",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_enchant_shardprismaticsmall.jpg",
    description: "Un fragment cristallisé du Néant torturé.",
    stats: []
  },
  {
    id: 303,
    name: "Essence cosmique",
    quality: "rare",
    item_level: 65,
    required_level: 55,
    item_class: "Divers",
    item_subclass: "Enchantement",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_enchant_essencecosmicgreater.jpg",
    description: "Une essence pure provenant des confins de l'univers.",
    stats: []
  },
  {
    id: 304,
    name: "Poussière planaire",
    quality: "uncommon",
    item_level: 60,
    required_level: 50,
    item_class: "Divers",
    item_subclass: "Enchantement",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_enchant_dustillusion.jpg",
    description: "Poussière magique obtenue par désenchantement d'objets planaires.",
    stats: []
  },
  // Montures étendues
  {
    id: 350,
    name: "Rênes du destrier de la mort",
    quality: "epic",
    item_level: 100,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Monture",
    icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_undeadhorse.jpg",
    description: "Invoque un destrier mort-vivant qui galope dans l'ombre.",
    stats: []
  },
  {
    id: 351,
    name: "Rênes du drake de bronze",
    quality: "epic",
    item_level: 100,
    required_level: 70,
    item_class: "Divers",
    item_subclass: "Monture",
    icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_bronzedrake.jpg",
    description: "Invoque un drake de bronze, gardien du temps.",
    stats: []
  },
  {
    id: 352,
    name: "Rênes de l'ours de guerre",
    quality: "rare",
    item_level: 60,
    required_level: 40,
    item_class: "Divers",
    item_subclass: "Monture",
    icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_blackpanther.jpg",
    description: "Invoque un ours de guerre fidèle et puissant.",
    stats: []
  },
  {
    id: 353,
    name: "Rênes du loup de givre",
    quality: "epic",
    item_level: 80,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Monture",
    icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_whitewolf.jpg",
    description: "Invoque un loup de givre des terres gelées de Northrend.",
    stats: []
  },
  {
    id: 354,
    name: "Rênes du proto-drake rouge",
    quality: "epic",
    item_level: 100,
    required_level: 80,
    item_class: "Divers",
    item_subclass: "Monture",
    icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_protodrake_red.jpg",
    description: "Invoque un proto-drake rouge, ancêtre des dragons.",
    stats: []
  },
  // Objets de quête étendus
  {
    id: 400,
    name: "Œil de Sargeras",
    quality: "legendary",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Objet de quête",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_eye_02.jpg",
    description: "L'œil ardent de Sargeras, seigneur de la Légion ardente.",
    stats: []
  },
  {
    id: 401,
    name: "Livre de Medivh",
    quality: "epic",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Objet de quête",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_book_12.jpg",
    description: "Le grimoire personnel de Medivh, dernier gardien de Tirisfal.",
    stats: []
  },
  {
    id: 402,
    name: "Fragment de Deathwing",
    quality: "epic",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Objet de quête",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bone_10.jpg",
    description: "Un fragment de l'armure adamantine de Deathwing l'Apporteur de fin.",
    stats: []
  },
  {
    id: 403,
    name: "Corne de guerre de Doomhammer",
    quality: "epic",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Objet de quête",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_horn_03.jpg",
    description: "La corne de guerre personnelle d'Orgrim Doomhammer.",
    stats: []
  },
  {
    id: 404,
    name: "Larme d'Elune",
    quality: "legendary",
    item_level: 1,
    required_level: 1,
    item_class: "Divers",
    item_subclass: "Objet de quête",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_pearl_05.jpg",
    description: "Une larme cristallisée de la déesse de la lune.",
    stats: []
  },
  // Objets techniques et mécaniques étendus
  {
    id: 450,
    name: "Processeur gyroscopique",
    quality: "rare",
    item_level: 40,
    required_level: 30,
    item_class: "Divers",
    item_subclass: "Composant technologique",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gizmo_khoriumpowercore.jpg",
    description: "Un processeur complexe de technologie gnome avancée.",
    stats: []
  },
  {
    id: 451,
    name: "Cellule d'énergie instable",
    quality: "epic",
    item_level: 65,
    required_level: 55,
    item_class: "Divers",
    item_subclass: "Composant technologique",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_battery_02.jpg",
    description: "Une cellule d'énergie expérimentale de puissance immense.",
    stats: []
  },
  {
    id: 452,
    name: "Servo-moteur de précision",
    quality: "uncommon",
    item_level: 35,
    required_level: 25,
    item_class: "Divers",
    item_subclass: "Composant de mécanisme",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_gizmo_02.jpg",
    description: "Un moteur de précision utilisé dans les automates gnomes.",
    stats: []
  },
  {
    id: 453,
    name: "Cristal de résonance",
    quality: "rare",
    item_level: 50,
    required_level: 40,
    item_class: "Divers",
    item_subclass: "Composant technologique",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_crystal_02.jpg",
    description: "Un cristal qui résonne aux fréquences magiques.",
    stats: []
  },
  // Livres et parchemins étendus
  {
    id: 500,
    name: "Codex de sorts élémentaires",
    quality: "rare",
    item_level: 60,
    required_level: 50,
    item_class: "Divers",
    item_subclass: "Livre",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_book_11.jpg",
    description: "Un codex détaillant les sorts de magie élémentaire.",
    stats: []
  },
  {
    id: 501,
    name: "Manuel de tactiques de siège",
    quality: "uncommon",
    item_level: 45,
    required_level: 35,
    item_class: "Divers",
    item_subclass: "Livre",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_book_09.jpg",
    description: "Un manuel militaire détaillant les tactiques de siège.",
    stats: []
  },
  {
    id: 502,
    name: "Grimoire de nécromancie interdite",
    quality: "epic",
    item_level: 70,
    required_level: 60,
    item_class: "Divers",
    item_subclass: "Livre",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_book_07.jpg",
    description: "Un grimoire maudit contenant les secrets de la nécromancie.",
    stats: []
  },
  {
    id: 503,
    name: "Atlas des royaumes perdus",
    quality: "rare",
    item_level: 50,
    required_level: 40,
    item_class: "Divers",
    item_subclass: "Carte",
    icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_map_01.jpg",
    description: "Un atlas détaillant les royaumes oubliés d'Azeroth.",
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