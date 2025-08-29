# WoW Item Finder

Une application web moderne pour rechercher et explorer les objets de World of Warcraft avec leurs statistiques, sources et liens vers les ressources externes.

## Fonctionnalités

- **Recherche en temps réel** : Trouvez rapidement des objets par nom, classe ou sous-classe
- **Interface immersive** : Design inspiré de l'univers WoW avec animations fluides
- **Détails complets** : Statistiques, descriptions et informations détaillées sur chaque objet
- **Sources multiples** : Visualisez les drops, crafts, vendeurs et quêtes
- **Historique** : Accès rapide aux derniers objets consultés
- **Responsive** : Interface adaptée mobile et desktop

## Technologies utilisées

- **React 19** avec TypeScript
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants
- **Framer Motion** pour les animations
- **Phosphor Icons** pour l'iconographie
- **Spark KV** pour la persistance des données

## Structure de l'application

```
src/
├── components/
│   ├── ItemCard.tsx       # Carte d'objet dans les résultats
│   ├── ItemDetail.tsx     # Modal détaillé avec onglets
│   ├── SearchBar.tsx      # Barre de recherche avec icône
│   └── SearchHistory.tsx  # Historique des recherches
├── lib/
│   ├── data.ts           # Données mock des objets WoW
│   └── wow-utils.ts      # Utilitaires pour les couleurs et badges
└── App.tsx               # Composant principal
```

## Utilisation

1. **Recherche** : Tapez dans la barre de recherche pour filtrer les objets
2. **Sélection** : Cliquez sur un objet pour voir ses détails
3. **Navigation** : Utilisez les onglets pour explorer les différentes informations
4. **Historique** : Accédez rapidement aux objets récemment consultés

## Qualités d'objet

L'application respecte le système de qualité de WoW avec des couleurs authentiques :

- **Médiocre** (Poor) - Gris
- **Commun** (Common) - Blanc  
- **Peu commun** (Uncommon) - Vert
- **Rare** (Rare) - Bleu
- **Épique** (Epic) - Violet
- **Légendaire** (Legendary) - Orange

## Types de sources

- **Drop** 🗡️ - Butin de boss ou monstres
- **Craft** 🔨 - Créé par artisanat
- **Vendor** 🛒 - Vendu par des PNJ
- **Quest** 📜 - Récompense de quête

## Extensions possibles

Cette application peut être étendue avec :

- Intégration de l'API Battle.net officielle
- Base de données complète des objets WoW
- Système de favoris et collections
- Comparateur d'objets
- Filtres avancés (niveau, qualité, classe)
- Mode sombre/clair
- Support multilingue

## Prompts d'utilisation Spark

Exemples de demandes pour personnaliser l'application :

- "Ajoute un système de favoris avec étoiles dorées"
- "Crée un comparateur d'objets côte à côte"
- "Implémente des filtres par niveau et qualité"
- "Ajoute un mode sombre avec couleurs WoW"
- "Crée une page de statistiques utilisateur"

## Limites actuelles

- Données limitées aux objets de démonstration
- Pas de connexion à l'API Battle.net
- Sources basées sur des données mock
- Pas de système d'authentification

L'application sert de proof-of-concept pour une interface WoW moderne et peut être étendue avec de vraies données et fonctionnalités avancées.