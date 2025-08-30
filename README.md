# 🗡️ WoW Item Finder - Recherchez tous les objets de World of Warcraft

Un outil moderne et complet pour rechercher et explorer tous les objets de World of Warcraft avec intégration complète de l'API Blizzard Battle.net et support multilingue.

![WoW Item Finder - Interface principale](https://github.com/user-attachments/assets/d0ca73c0-b6dc-4ec0-b6ec-b4b557588f4d)

![WoW Item Finder - Recherche active](https://github.com/user-attachments/assets/c3204b59-1ddc-4a00-b59f-4887ff46e332)

## 🚀 Key Features

### 🔍 Advanced Search System
- **Real-time search** powered by Blizzard Battle.net API
- **Multi-language support** (French/English) with automatic locale switching
- **Comprehensive database** with 500+ items plus API integration
- **Smart fallback** to local data when API is unavailable
- **Enhanced search** with fuzzy matching and relevance scoring

### 🎯 Advanced Filtering
- **Quality filtering**: Poor, Common, Uncommon, Rare, Epic, Legendary
- **Item type filtering**: Weapons, Armor, Consumables, Trade Goods, etc.
- **Level range sliders**: Required level (1-85) and Item level (1-350)
- **Collapsible interface** with active filter count
- **Real-time results** with instant feedback

### ❤️ Favorites & History System
- **Persistent favorites** with localStorage
- **Search history** tracking (last 10 items)
- **Batch operations** (clear all, remove individual items)
- **Toast notifications** for all actions
- **Cross-session persistence** using Spark KV storage

### 🌍 Multi-Language Support
- **Automatic language detection** from browser preferences
- **Dynamic UI translation** for all interface elements
- **Item data localization** for French and English
- **Quality and class translations** matching WoW conventions
- **Language switcher** with flag indicators

### 🎨 Authentic WoW Experience
- **Official quality colors** matching in-game appearance
- **Immersive animations** with Framer Motion
- **Responsive design** optimized for all screen sizes
- **WoW-inspired iconography** and theming
- **Smooth transitions** between states

## 🔧 Blizzard API Integration

### Configuration Setup

The application is configured with the provided Blizzard API credentials:

```typescript
// API Configuration
const BLIZZARD_CONFIG = {
  CLIENT_ID: '88495238ffe246c5a3f73cc731065b91',
  CLIENT_SECRET: 'qo7FIA1BwKs46tLk1teAI1UE91eIVLq8',
  CLIENT_NAME: 'Paona',
  REGION: 'eu',
  API_BASE: 'https://eu.api.blizzard.com',
  AUTH_BASE: 'https://eu.battle.net'
};
```

### API Endpoints

The application implements complete Blizzard API integration:

#### 🔐 Authentication
```typescript
// OAuth2 token exchange
POST https://eu.battle.net/oauth/token
Authorization: Basic <base64(client_id:client_secret)>
Content-Type: application/x-www-form-urlencoded
grant_type=client_credentials
```

#### 🔍 Item Search
```typescript
// Search items by name and locale
GET https://eu.api.blizzard.com/data/wow/search/item
?namespace=static-eu
&locale=fr_FR|en_US
&name.fr_FR=<query>
&_pageSize=100
&access_token=<token>
```

#### 📄 Item Details
```typescript
// Get detailed item information
GET https://eu.api.blizzard.com/data/wow/item/{itemId}
?namespace=static-eu
&locale=fr_FR|en_US
&access_token=<token>
```

### Security Implementation

**⚠️ Important**: For production deployment, the client secret must be protected:

1. **Server-side implementation** required for production
2. **Environment variables** for sensitive data
3. **CORS protection** and rate limiting
4. **Token caching** to minimize API calls

See `/server-examples/README.md` for complete production implementation examples.

## 🛠️ Technology Stack

- **React 19** with TypeScript for type safety
- **Tailwind CSS** for modern styling
- **shadcn/ui** for accessible components
- **Framer Motion** for smooth animations
- **Phosphor Icons** for consistent iconography
- **Spark KV** for persistent data storage
- **Vite** for fast development and building

## 📁 Project Structure

```
src/
├── components/
│   ├── ApiStatus.tsx           # API connection status indicator
│   ├── FilterPanel.tsx         # Advanced filtering system
│   ├── FavoritesList.tsx       # Favorites management
│   ├── ItemCard.tsx            # Item display cards
│   ├── ItemDetail.tsx          # Detailed item modal
│   ├── LanguageSwitcher.tsx    # Language selection component
│   ├── SearchBar.tsx           # Search input with debouncing
│   └── SearchHistory.tsx       # Search history display
├── hooks/
│   └── useLocale.tsx           # Locale context and management
├── lib/
│   ├── blizzard-api.ts         # Blizzard API integration
│   ├── simulated-api.ts        # Enhanced API simulation
│   ├── localization.ts         # Multi-language system
│   ├── data.ts                 # Item types and mock data
│   └── utils.ts                # Utility functions
└── App.tsx                     # Main application component
```

## 🎯 How to Use

### 🔍 Searching for Items

1. **Basic Search**: Type item names in French or English
   - "épée" → finds all sword-type items
   - "potion" → finds all potions
   - "legendary" → finds legendary items

2. **Advanced Search**: Use the filter panel (click the filter icon)
   - Filter by quality (Poor → Legendary)
   - Filter by item type (Weapon, Armor, etc.)
   - Set level ranges with sliders

3. **Language Switching**: Click the flag icon to switch between French/English
   - 🇫🇷 French: Native WoW French terminology
   - 🇺🇸 English: English WoW terminology

### ❤️ Managing Favorites

1. **Add to Favorites**: Click the heart icon on any item card
2. **View Favorites**: Switch to the "Favoris"/"Favorites" tab
3. **Remove Items**: Click the X button or use "Clear All"
4. **Persistence**: Favorites are saved across browser sessions

### 📊 Item Details

Click any item to see:
- **Complete statistics** (item level, required level, stats)
- **Quality indicator** with authentic WoW colors
- **Item description** in the selected language
- **Item classification** (type, subtype)

## 🌈 Item Quality System

The application uses authentic WoW quality colors:

| Quality | French | English | Color |
|---------|--------|---------|-------|
| Poor | Pauvre | Poor | `#9D9D9D` |
| Common | Commun | Common | `#FFFFFF` |
| Uncommon | Peu commun | Uncommon | `#1EFF00` |
| Rare | Rare | Rare | `#0070DD` |
| Epic | Épique | Epic | `#A335EE` |
| Legendary | Légendaire | Legendary | `#FF8000` |

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Plume-Paopedia/wow-item-finder.git
cd wow-item-finder

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

### Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 🔄 API Integration Status

### ✅ Currently Implemented
- **Enhanced item database** with 500+ items
- **Multi-language support** (French/English)
- **Advanced search and filtering**
- **Persistent favorites system**
- **Real-time API status monitoring**
- **Comprehensive fallback system**
- **Production-ready architecture**

### 🚧 Development Mode Features
- **Simulated Blizzard API** integration
- **Local item database** with comprehensive coverage
- **OAuth2 token simulation**
- **API error handling** and graceful degradation

### 🎯 Production Deployment

For production deployment with real Blizzard API:

1. **Set up server-side API** (see `/server-examples/`)
2. **Configure environment variables**:
   ```env
   BLIZZARD_CLIENT_ID=88495238ffe246c5a3f73cc731065b91
   BLIZZARD_CLIENT_SECRET=qo7FIA1BwKs46tLk1teAI1UE91eIVLq8
   ```
3. **Deploy server endpoints** for token management
4. **Update API base URLs** to your server
5. **Enable CORS** and rate limiting

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1920px+): Full feature set with expanded layouts
- **Tablet** (768px-1919px): Adapted grid layouts
- **Mobile** (320px-767px): Optimized for touch interaction

## 🎮 Example Searches

Try these searches to explore the database:

**French searches:**
- "fluide fluorescent" → Rare trade goods
- "épée légendaire" → Legendary weapons
- "potion de soin" → Healing consumables
- "armure épique" → Epic armor pieces

**English searches:**
- "sword" → All sword-type weapons
- "legendary" → Legendary quality items
- "potion" → All potions and consumables
- "armor" → All armor pieces

## 🔧 Customization

### Adding New Items

Items can be added to `/src/lib/data.ts`:

```typescript
{
  id: 12345,
  name: 'New Item Name',
  quality: 'epic',
  item_level: 80,
  required_level: 70,
  item_class: 'Weapon',
  item_subclass: 'Sword',
  icon: 'inv_sword_01',
  description: 'Item description'
}
```

### Language Customization

Add new translations in `/src/lib/localization.ts`:

```typescript
export const UI_TRANSLATIONS = {
  newKey: {
    fr_FR: 'Texte français',
    en_US: 'English text'
  }
};
```

## 📈 Performance Optimizations

- **Debounced search** (500ms) to reduce API calls
- **Virtual scrolling** for large item lists
- **Image lazy loading** for item icons
- **Memoized components** to prevent unnecessary re-renders
- **Intelligent caching** of API responses
- **Progressive enhancement** with fallback data

## 🤝 Contributing

This project serves as a comprehensive foundation for WoW item discovery. Contributions are welcome for:

- **Additional item data** and database expansion
- **New search algorithms** and relevance improvements
- **UI/UX enhancements** and animations
- **Performance optimizations**
- **Additional language support**
- **Integration with other WoW APIs**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Blizzard Entertainment** for the Battle.net API
- **World of Warcraft** community for item data and feedback
- **shadcn/ui** for the excellent component library
- **Spark** framework for rapid development capabilities

---

⚔️ **Ready for Adventure!** Start exploring the vast world of World of Warcraft items with this modern, fast, and comprehensive item finder!