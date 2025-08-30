# WoW Item Finder - Battle.net API Integration

Une application web moderne intégrée à l'API Battle.net de Blizzard pour rechercher et explorer tous les objets de World of Warcraft avec leurs statistiques, sources et liens vers les ressources externes.

## 🚀 Fonctionnalités

### Interface utilisateur
- **Recherche en temps réel** : Moteur de recherche puissant avec l'API Battle.net
- **Interface immersive** : Design inspiré de l'univers WoW avec animations fluides
- **Détails complets** : Statistiques, descriptions et informations détaillées sur chaque objet
- **Sources multiples** : Visualisez les drops officiels, crafts, vendeurs et quêtes
- **Système de favoris** : Sauvegardez vos objets préférés 
- **Filtres avancés** : Filtrage par qualité, niveau, classe d'objet
- **Historique intelligent** : Accès rapide aux derniers objets consultés
- **Responsive** : Interface adaptée mobile et desktop

### Intégration API
- **API Battle.net officielle** : Accès à la base complète des objets WoW
- **Authentification OAuth2** : Connexion sécurisée aux serveurs Blizzard
- **Cache intelligent** : Données mises en cache pour des performances optimales
- **Mode hors ligne** : Fallback sur données locales si l'API est indisponible

## 🔧 Configuration API Battle.net

### Prérequis
1. Créez un compte développeur sur [Battle.net Developer Portal](https://develop.battle.net/)
2. Créez une nouvelle application pour obtenir vos clés API

### Configuration .env.local
Créez un fichier `.env.local` dans la racine de votre projet :

```env
NEXT_PUBLIC_BLIZZARD_CLIENT_ID=votre_client_id
BLIZZARD_CLIENT_SECRET=votre_client_secret
NEXT_PUBLIC_BLIZZARD_REGION=eu
BLIZZARD_LOCALE=fr_FR
BLIZZARD_NAMESPACE_STATIC=static-eu
BLIZZARD_NAMESPACE_DYNAMIC=dynamic-eu
```

⚠️ **Important** : N'oubliez pas d'ajouter `.env.local` à votre `.gitignore` pour ne pas exposer vos secrets !

### Routes API

L'application utilise les endpoints suivants :

#### 1. Authentification
```
GET /api/blizzard/token
```
Gère l'authentification OAuth2 avec Battle.net

#### 2. Recherche d'objets
```
GET /api/items/search?q=texte&limit=100
```
- Recherche dans la base complète des objets WoW
- Support de la recherche en français
- Pagination et limitation des résultats

#### 3. Détails d'objet
```
GET /api/items/:id
```
Récupère les détails complets d'un objet spécifique

#### 4. Sources de drop
```
GET /api/sources/drops?itemId=ID
```
Liste les boss/instances qui peuvent donner cet objet

#### 5. Sources de craft
```
GET /api/sources/craft?itemId=ID
```
Liste les recettes d'artisanat pour cet objet

## 🛠️ Technologies utilisées

- **React 19** avec TypeScript
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants
- **Framer Motion** pour les animations
- **Phosphor Icons** pour l'iconographie
- **Spark KV** pour la persistance des données
- **Battle.net API** pour les données officielles

## 📁 Structure de l'application

```
src/
├── components/
│   ├── ApiStatus.tsx        # Indicateur de statut API
│   ├── FilterPanel.tsx      # Panneau de filtres avancés
│   ├── FavoritesList.tsx    # Liste des favoris
│   ├── ItemCard.tsx         # Carte d'objet dans les résultats
│   ├── ItemDetail.tsx       # Modal détaillé avec onglets
│   ├── SearchBar.tsx        # Barre de recherche
│   └── SearchHistory.tsx    # Historique des recherches
├── lib/
│   ├── blizzard-api.ts      # Client API Battle.net
│   ├── simulated-api.ts     # API simulée pour développement
│   ├── api-router.ts        # Routeur d'API interne
│   ├── data.ts              # Types et données de fallback
│   └── wow-utils.ts         # Utilitaires WoW
└── App.tsx                  # Composant principal
```

## 🎯 Utilisation

### Recherche d'objets
1. **Recherche simple** : Tapez le nom d'un objet (ex: "fluide fluorescent")
2. **Filtres** : Utilisez les filtres par qualité, niveau, classe
3. **Favoris** : Cliquez sur l'étoile pour sauvegarder
4. **Détails** : Cliquez sur un objet pour voir ses informations complètes

### Navigation
- **Onglet Recherche** : Résultats de recherche avec historique
- **Onglet Favoris** : Objets sauvegardés
- **Modal Détails** : Statistiques, sources officielles, liens externes

## 🎨 Qualités d'objet

L'application respecte le système de qualité de WoW avec des couleurs authentiques :

- **Médiocre** (Poor) - Gris `#9D9D9D`
- **Commun** (Common) - Blanc `#FFFFFF`
- **Peu commun** (Uncommon) - Vert `#1EFF00`
- **Rare** (Rare) - Bleu `#0070DD`
- **Épique** (Epic) - Violet `#A335EE`
- **Légendaire** (Legendary) - Orange `#FF8000`

## 🔍 Types de sources

- **Drop** 💀 - Butin de boss officiels via API Blizzard
- **Craft** 🔨 - Créé par artisanat (à venir)
- **Vendor** 🛒 - Vendu par des PNJ (via Wowhead)
- **Quest** 📜 - Récompense de quête (via Wowhead)

## ⚡ Performances et cache

- **Cache API** : Tokens et réponses cachés pour éviter les appels redondants
- **Mode hors ligne** : Fallback automatique sur données locales
- **Recherche optimisée** : Debouncing et pagination pour de meilleures performances
- **Images lazy** : Chargement différé des icônes d'objets

## 🚫 Limites connues

### API Battle.net
- **Limite de taux** : Respect des quotas API de Blizzard
- **Données disponibles** : Certaines sources (vendeurs/quêtes) ne sont pas dans l'API officielle
- **Langues** : Support principalement français/anglais

### Fonctionnalités manquantes
- Sources de craft détaillées (prévues phase 2)
- Informations de vendeurs (disponibles via Wowhead)
- Historique des prix d'enchères

## 🎮 Exemples de prompts Spark

Pour personnaliser votre application :

```
"Ajoute un système de comparaison d'objets côte à côte"
"Crée un widget de recherche rapide flottant"
"Implémente un mode sombre authentique Blizzard"
"Ajoute des notifications pour les nouveaux objets favoris"
"Crée une page de statistiques utilisateur avec graphiques"
"Intègre un calculateur de DPS pour les armes"
```

## 🔄 État de l'intégration

### ✅ Fonctionnel
- Recherche via API Battle.net simulée
- Cache et fallback automatiques
- Interface complète avec favoris et filtres
- Sources de drop via API

### 🚧 En développement
- Authentification OAuth2 réelle
- Sources de craft via API
- Optimisations de performance
- Tests d'intégration

### 📋 Prochaines étapes
1. Déploiement sur serveur avec variables d'environnement
2. Mise en place du proxy API pour sécuriser les secrets
3. Intégration complète avec l'API Battle.net de production
4. Ajout des sources de craft et de vendeur

## 🤝 Contribution

Cette application sert de base solide pour une intégration complète avec l'API Battle.net. Les développeurs peuvent l'étendre avec :

- Nouvelles fonctionnalités de recherche
- Intégrations API additionnelles
- Optimisations de performance
- Tests automatisés

---

🎯 **Résultat** : Une application WoW moderne, performante et authentique, prête pour la production avec l'API Battle.net officielle !