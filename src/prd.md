# WoW Item Finder - Product Requirements Document

## Core Purpose & Success
- **Mission Statement**: Créer la ressource la plus complète et intuitive pour explorer et découvrir tous les objets de World of Warcraft avec leurs statistiques détaillées et sources d'obtention.
- **Success Indicators**: 
  - Temps de recherche réduit grâce aux filtres avancés
  - Engagement utilisateur via le système de favoris
  - Satisfaction utilisateur mesurée par l'utilisation répétée des fonctionnalités
- **Experience Qualities**: Immersive, efficace, nostalgique

## Project Classification & Approach
- **Complexity Level**: Light Application (fonctionnalités multiples avec état basique)
- **Primary User Activity**: Recherche et découverte d'informations (Consuming + Acting)

## Thought Process for Feature Selection
- **Core Problem Analysis**: Les joueurs WoW ont besoin d'une interface moderne et rapide pour rechercher les objets du jeu avec des filtres précis et la possibilité de sauvegarder leurs favoris
- **User Context**: Utilisé pendant les sessions de jeu pour planifier l'équipement, ou en navigation casual pour explorer le contenu
- **Critical Path**: Recherche → Filtrage → Consultation détaillée → Ajout aux favoris
- **Key Moments**: 
  1. Première recherche réussie avec résultats pertinents
  2. Découverte d'un objet légendaire et ajout aux favoris
  3. Utilisation efficace des filtres pour affiner la recherche

## Essential Features

### Base de données complète (500+ objets)
- **Functionality**: Collection exhaustive couvrant tous les types d'objets WoW authentiques
- **Purpose**: Fournir une expérience de recherche riche et représentative
- **Success Criteria**: Couverture de toutes les qualités d'objets et catégories principales

### Système de filtres avancés
- **Functionality**: Filtrage par qualité, type d'objet, niveau requis, et niveau d'objet
- **Purpose**: Permettre aux utilisateurs de trouver exactement ce qu'ils cherchent
- **Success Criteria**: Résultats précis et temps de recherche réduit

### Système de favoris persistant
- **Functionality**: Sauvegarde d'objets préférés avec gestion complète (ajout/suppression)
- **Purpose**: Permettre aux utilisateurs de créer leur collection personnelle
- **Success Criteria**: Persistance des données entre sessions, interface intuitive

### Interface à onglets
- **Functionality**: Navigation fluide entre recherche et favoris
- **Purpose**: Organiser l'expérience utilisateur et séparer les contextes d'utilisation
- **Success Criteria**: Transitions smoothes, état persistant par onglet

## Design Direction

### Visual Tone & Identity
- **Emotional Response**: Nostalgie et excitement des joueurs WoW, sensation de découverte épique
- **Design Personality**: Épique mais accessible, moderne tout en respectant l'héritage du jeu
- **Visual Metaphors**: Interfaces des jeux Blizzard, grimoires magiques, interfaces de guild
- **Simplicity Spectrum**: Interface moderne et épurée avec des moments de richesse visuelle

### Color Strategy
- **Color Scheme Type**: Palette personnalisée inspirée de WoW (bleu/or/violet)
- **Primary Color**: Bleu mystique (#6366f1) évoquant la magie arcane
- **Secondary Colors**: Or/ambre (#f59e0b) pour les accents nobles
- **Accent Color**: Or lumineux (#eab308) pour les actions importantes et objets légendaires
- **Color Psychology**: Bleu pour la confiance et la magie, or pour la valeur et le prestige
- **Quality Colors**: Respect strict des couleurs de qualité WoW (gris, blanc, vert, bleu, violet, orange)
- **Color Accessibility**: Contraste WCAG AA respecté, couleurs distinctives pour les daltoniens

### Typography System
- **Font Pairing Strategy**: Inter pour sa lisibilité moderne et sa neutralité élégante
- **Typographic Hierarchy**: 
  - Titres: Bold 24-48px pour l'impact
  - Corps: Regular 14-16px pour la lisibilité
  - Labels: Medium 12-14px pour la structure
- **Font Personality**: Moderne, lisible, légèrement technologique mais chaleureuse
- **Readability Focus**: Espacement généreux, hauteur de ligne 1.5x
- **Typography Consistency**: Échelle harmonieuse basée sur des multiples de 4px
- **Which fonts**: Inter (Google Fonts) - famille complète
- **Legibility Check**: Excellent sur tous les supports, optimisé pour l'écran

### Visual Hierarchy & Layout
- **Attention Direction**: Header imposant → Recherche centrale → Résultats en grille → Détails immersifs
- **White Space Philosophy**: Respiration généreuse autour des éléments, focus sur le contenu
- **Grid System**: Grid responsive 1-2-3 colonnes selon la taille d'écran
- **Responsive Approach**: Mobile-first avec adaptation progressive des fonctionnalités
- **Content Density**: Équilibre entre information riche et clarté visuelle

### Animations
- **Purposeful Meaning**: Transitions fluides évoquant la magie et l'exploration
- **Hierarchy of Movement**: Micro-animations sur hover, transitions de page, chargement des détails
- **Contextual Appropriateness**: Subtiles et fonctionnelles, jamais distrayantes

### UI Elements & Component Selection
- **Component Usage**: 
  - Cards pour les objets avec hover effects
  - Badges pour les qualités avec couleurs authentiques
  - Modals/Sheets pour les détails complets
  - Sliders pour les filtres de niveau
  - Tabs pour l'organisation du contenu
- **Component Customization**: Couleurs WoW, bordures arrondies, effets de glow subtils
- **Component States**: Hover avec scale subtle, active states distinctifs, disabled gracieux
- **Icon Selection**: Phosphor Icons pour cohérence et modernité
- **Spacing System**: Échelle Tailwind (4px base) pour consistance
- **Mobile Adaptation**: Grilles qui se replient, modals en full-screen, touch-friendly

### Visual Consistency Framework
- **Design System Approach**: Component-based avec variants pour les qualités d'objets
- **Style Guide Elements**: Couleurs de qualité, espacements, animations, iconographie
- **Visual Rhythm**: Répétition des patterns de cards, alignements sur grille
- **Brand Alignment**: Évocation de l'univers WoW tout en restant moderne

### Accessibility & Readability
- **Contrast Goal**: WCAG AA respecté pour tous les textes et éléments interactifs
- **Color Independence**: Informations transmises par couleur doublées par du texte/icônes
- **Keyboard Navigation**: Support complet avec focus states visibles
- **Screen Reader**: Labels appropriés, structure sémantique

## Edge Cases & Problem Scenarios
- **Images manquantes**: Fallback vers icône générique WoW
- **Recherches sans résultats**: Message d'aide avec suggestions
- **Filtres trop restrictifs**: Indication du nombre de résultats en temps réel
- **Favoris pleins**: Pas de limite mais performance optimisée

## Implementation Considerations
- **Performance**: Virtualisation pour les grandes listes, recherche optimisée
- **Scalability**: Architecture prête pour l'ajout de nouvelles fonctionnalités
- **Data Persistence**: Utilisation de useKV pour favoris et historique
- **Progressive Enhancement**: Fonctionnalités de base accessibles même en cas d'erreur

## Reflection
Cette approche combine l'authenticité de l'univers WoW avec des patterns d'UX modernes, créant une expérience familière pour les joueurs tout en étant accessible aux nouveaux utilisateurs. Le système de filtres avancés et de favoris transforme une simple recherche en outil de découverte et de collection personnelle.

## Nouvelles fonctionnalités implémentées

### Base de données étendue (500+ objets)
- Armes légendaires iconiques (Frostmourne, Ashbringer, Sulfuras, etc.)
- Sets d'armures complets (Tier 2 Jugement, Nemesis, Bloodfang)
- Consommables variés (potions, élixirs, nourriture, parchemins)
- Matériaux d'artisanat complets (métaux, cuirs, tissus, herbes)
- Gemmes et enchantements
- Montures et objets de quête légendaires
- Objets techniques et livres

### Filtres avancés
- Filtrage par qualité (Pauvre à Légendaire)
- Filtrage par type d'objet (Arme, Armure, Consommable, Divers)
- Sliders pour niveau requis (1-85)
- Sliders pour niveau d'objet (1-350)
- Interface pliable avec compteur de filtres actifs

### Système de favoris complet
- Bouton cœur sur chaque objet
- Onglet dédié aux favoris
- Gestion complète (ajout/suppression individuelle/masse)
- Persistance avec useKV
- Interface dédiée avec actions rapides
- Notifications toast pour feedback

### Améliorations UX
- Interface à onglets (Recherche/Favoris)
- Compteurs en temps réel
- Animations fluides avec framer-motion
- États vides informatifs
- Feedback visuel pour toutes les actions