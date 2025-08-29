# WoW Item Finder App

A beautiful and immersive World of Warcraft item search application that helps players discover items and their sources with authentic WoW styling and smooth animations.

**Experience Qualities**: 
1. **Immersive** - Feels like navigating within the World of Warcraft universe with authentic colors and styling
2. **Fluid** - Smooth animations and transitions that make interactions feel natural and responsive  
3. **Informative** - Clear presentation of item data with organized tabs and visual hierarchy

**Complexity Level**: Light Application (multiple features with basic state)
- Multiple search and detail views with tabbed interface, persistent search history, and responsive design patterns

## Essential Features

**Item Search**
- Functionality: Real-time search through WoW items database with instant results
- Purpose: Primary entry point for discovering items quickly
- Trigger: User types in search input field
- Progression: Type query → View filtered results → Select item → View details
- Success criteria: Results appear within 500ms, minimum 50 searchable items

**Item Details Panel**
- Functionality: Comprehensive item information display with tabbed organization
- Purpose: Provide all relevant item data in an organized, scannable format
- Trigger: Click on any item from search results
- Progression: Click item → Panel slides in → Browse tabs (Stats/Sources/Links) → Close or search new item
- Success criteria: Panel loads smoothly, all tabs functional, mobile responsive

**Search History**
- Functionality: Persist and display recently viewed items for quick re-access
- Purpose: Improve user workflow by enabling quick return to previously searched items
- Trigger: View any item detail (automatically saves)
- Progression: View item → Auto-save to history → Access via history section → Quick re-open
- Success criteria: Saves last 10 items, persists between sessions, clear history option

## Edge Case Handling

- **Empty Search Results**: Display helpful message with search tips and popular item suggestions
- **Long Item Names**: Truncate with ellipsis and show full name in tooltip
- **Mobile Navigation**: Collapsible panels and touch-friendly hit areas
- **No History**: Show onboarding message encouraging exploration
- **Slow Loading**: Skeleton loading states and graceful fallbacks

## Design Direction

The design should evoke the epic, mystical atmosphere of World of Warcraft while maintaining modern usability - combining rich blues and golds with smooth animations that feel both magical and professional.

## Color Selection

Triadic color scheme using WoW's signature blue, gold, and deep purple to create an authentic game-inspired palette that conveys both power and elegance.

- **Primary Color**: Deep WoW Blue (oklch(0.35 0.15 240)) - Communicates trust, depth, and the iconic WoW brand identity
- **Secondary Colors**: Rich Gold (oklch(0.75 0.12 85)) for highlights and accents, Dark Purple (oklch(0.25 0.08 280)) for epic quality items
- **Accent Color**: Bright Gold (oklch(0.85 0.15 90)) - Attention-grabbing highlight for CTAs and legendary items
- **Foreground/Background Pairings**: 
  - Background (Dark Blue #1a1d29): Light text (oklch(0.95 0.02 240)) - Ratio 12.1:1 ✓
  - Card (Deep Blue #252938): White text (oklch(1 0 0)) - Ratio 8.9:1 ✓  
  - Primary (WoW Blue #2563eb): White text (oklch(1 0 0)) - Ratio 5.2:1 ✓
  - Secondary (Gold #d97706): Dark text (oklch(0.15 0 0)) - Ratio 7.8:1 ✓
  - Accent (Bright Gold #f59e0b): Dark text (oklch(0.15 0 0)) - Ratio 9.2:1 ✓

## Font Selection

Typography should feel both heroic and readable, conveying the epic fantasy atmosphere while ensuring excellent legibility for item stats and descriptions.

- **Typographic Hierarchy**: 
  - H1 (App Title): Inter Bold/32px/tight letter spacing - commanding presence
  - H2 (Item Names): Inter SemiBold/24px/normal spacing - clear hierarchy  
  - H3 (Section Headers): Inter Medium/18px/wide spacing - organized sections
  - Body (Item Details): Inter Regular/16px/relaxed line height - maximum readability
  - Caption (Meta Info): Inter Regular/14px/normal spacing - supporting information

## Animations

Animations should feel mystical and fluid, like magical interfaces within the WoW universe, balancing functional feedback with moments of wonder that enhance the fantasy experience.

- **Purposeful Meaning**: Motion reinforces the magical, otherworldly nature of WoW while guiding user attention through smooth, physics-based transitions
- **Hierarchy of Movement**: Item reveals and panel transitions receive primary animation focus, with subtle hover effects on secondary elements

## Component Selection

- **Components**: Dialog for item details, Card for search results, Tabs for detail organization, Input with search icon, Button for actions, Badge for item quality, Skeleton for loading states
- **Customizations**: Custom quality color system (Poor/Common/Uncommon/Rare/Epic/Legendary), WoW-inspired hover effects with glow, custom search result cards with item icons
- **States**: Hover states with subtle glow effects, active tabs with gold underlines, disabled states with reduced opacity, loading states with shimmer animations
- **Icon Selection**: Search, X for close, ChevronRight for navigation, Star for favorites, Clock for history
- **Spacing**: Generous padding (p-6/p-8) for cards, consistent gaps (gap-4/gap-6) for layouts, breathing room around interactive elements
- **Mobile**: Slide-up detail panel on mobile, collapsible search filters, touch-friendly 48px minimum targets, simplified navigation with bottom-up drawer pattern