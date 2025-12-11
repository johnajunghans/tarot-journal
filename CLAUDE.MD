# Tarot Journal - Project Context

## Project Overview

Tarot Journal is a Next.js-based web application for tracking and interpreting tarot readings. The app allows users to create custom spreads, record readings, and generate AI-powered interpretations.

## Tech Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **Runtime**: React 19.2.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + Radix UI components
- **Animations**: GSAP 3.13
- **AI Integration**: OpenRouter API (currently using amazon/nova-2-lite-v1:free model)
- **State Management**: React hooks + localStorage (client-side only currently)

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── journal/                  # Main journal interface
│   │   ├── readings/            # Reading list and detail pages
│   │   ├── spreads/             # Spread creation and management
│   │   └── insights/            # Insights from readings
│   ├── api/
│   │   └── interpret/           # AI interpretation endpoint
│   └── layout.tsx               # Root layout with sidebar
├── components/
│   ├── ui/                      # Radix UI component library
│   ├── canvas/                  # Spread creation canvas components
│   ├── app-sidebar.tsx          # Main navigation sidebar
│   ├── card-picker.tsx          # Card selection interface
│   ├── interpretation-dialog.tsx
│   └── reading-card.tsx
├── lib/
│   ├── types.ts                 # Core TypeScript definitions
│   ├── tarot-data.ts           # 78-card tarot deck data
│   ├── openrouter.ts           # OpenRouter API integration
│   ├── storage.ts              # LocalStorage utilities
│   ├── spread-config.ts        # Spread template configurations
│   └── card-search.ts          # Card filtering/search
└── context/
    └── theme-provider.tsx       # Dark/light theme support
```

## Core Domain Models

### TarotCard
78 cards (22 Major Arcana + 56 Minor Arcana) with:
- `id`: Unique identifier (e.g., "major-0", "minor-cups-1")
- `name`: Card name (e.g., "The Fool", "Ace of Cups")
- `arcana`: "major" or "minor"
- `suit`: For minor arcana - "cups", "wands", "pentacles", "swords"
- `number`: 0-21 for major, 1-14 for minor (Ace=1, Page=11, Knight=12, Queen=13, King=14)
- `uprightMeaning` & `reversedMeaning`: Interpretation text
- `keywords`: Search/categorization tags
- `imageUrl`: Rider-Waite-Smith card images from steve-p.org

### Spread
Custom spread templates with draggable card positions:
- `positions`: Array of SpreadPosition (id, title, description, x, y, rotation, zIndex)
- Stored in localStorage as JSON
- Default spreads: Three Card (Past/Present/Future), Celtic Cross

### Reading
A complete tarot reading session:
- References a `spreadId` and `spreadName`
- `question` + optional `context`
- `cards`: Array of ReadingCard (positionId, cardId, cardName, orientation)
- `thoughts`: User's personal reflections
- `insights`: Key takeaways (array of Insight objects)
- `interpretations`: AI or community interpretations
- `relatedReadings`: Links to other readings

### Interpretation
AI or human-generated reading analysis:
- `source`: "ai" or "community"
- `content`: Markdown-formatted interpretation text
- `metadata`: AIInterpretationMetadata (model, tier, systemPrompt) or CommunityInterpretationMetadata (authorId, authorName)
- `focus`: Optional interpretation focus area
- Legacy fields maintained for backward compatibility

## Key Features

### 1. Custom Spread Creation
- Interactive canvas using GSAP for drag-and-drop
- Users can position cards anywhere on a 1200x900 viewBox
- Positions have titles, descriptions, and rotation
- Pre-built templates: Three Card, Celtic Cross

### 2. Reading Recording
- Select a spread template
- Draw cards (random or manual selection)
- Set orientation (upright/reversed)
- Add question, context, thoughts
- Upload optional photo of physical reading
- Extract key insights

### 3. AI Interpretations
- OpenRouter API integration (src/app/api/interpret/route.ts)
- System prompt customization support
- Users can provide their own API key
- Currently using free tier model (amazon/nova-2-lite-v1:free)
- Can include user's thoughts and insights in AI prompt
- Markdown-formatted responses

### 4. Insights & Connections
- Extract key insights from readings
- Link related readings together
- Tag-based categorization (planned)

## Data Storage

Currently **client-side only** using localStorage (see src/lib/storage.ts):
- Readings stored as JSON
- Spreads stored as JSON
- No backend database yet (future enhancement)
- All data keyed by user-generated IDs (currently no auth)

## Current Branch Context

**Branch**: `refactor/update-types-architecture`

Recent work has focused on:
- Restructuring sidebar navigation
- Replacing "interpretations" with "insights" terminology
- Moving from interpretation-focused to insights-focused architecture
- Adding dropdown button for creating readings/spreads/insights
- UI polish on sidebar (inset variant) and canvas

## Development Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Environment Variables

Required in `.env.local`:
- `OPENROUTER_API_KEY`: API key for OpenRouter (optional - users can provide their own)

## UI Component Library

Using shadcn/ui patterns with Radix UI primitives:
- Badge, Button, Card, Dialog, Dropdown Menu, Input, Label
- Popover, Select, Separator, Sheet, Switch, Textarea, Tooltip
- Calendar (react-day-picker), Command (cmdk)
- Sidebar with collapsible navigation
- Dark/light theme toggle (next-themes)

## Known Limitations & Future Work

1. **No Authentication**: Currently no user accounts or auth
2. **LocalStorage Only**: No backend persistence
3. **Card Meanings**: Using placeholder meanings for most cards (need full data)
4. **Community Features**: Community interpretation system not implemented
5. **Image Upload**: Reading photo upload UI exists but not fully wired
6. **Search**: Basic card search implemented, needs improvement
7. **Export**: No export functionality yet
8. **Mobile**: Responsive design needs testing on mobile devices

## Code Style & Conventions

- TypeScript strict mode
- Functional components with hooks
- JSDoc comments on types and complex functions
- File-level docstrings explaining purpose
- "use client" directive for client components
- Legacy compatibility fields marked with @deprecated

## Testing Notes

- No test suite currently (future enhancement)
- Manual testing via development server
- Browser: Chrome, Safari, Firefox supported

## AI Interpretation Flow

1. User completes reading in UI
2. Clicks "Get AI Interpretation" button
3. Frontend POSTs to `/api/interpret`:
   - Reading data (cards, positions, question, context)
   - Optional: user thoughts, insights, related readings
   - Optional: custom system prompt
4. API constructs prompt with:
   - System role: Expert tarot reader instructions
   - User role: Structured reading data
5. OpenRouter API call with selected model
6. Response parsed and stored as Interpretation object
7. Displayed in reading view with markdown rendering

## Helper Functions & Utilities

- `getCardById(id)`: Lookup card by ID
- `formatCardName(card)`: Convert "2 of Cups" to "Two of Cups"
- Type guards: `isAIInterpretation()`, `isCommunityInterpretation()`
- Card search: Filter by name, keywords, arcana type
- Storage: `saveReading()`, `loadReadings()`, `saveSpread()`, `loadSpreads()`

## Contributing Guidelines

When working on this project:
1. Maintain backward compatibility with legacy fields
2. Update types.ts for any new data structures
3. Add JSDoc comments for public APIs
4. Test on both light and dark themes
5. Consider mobile responsiveness
6. Keep spread canvas coordinates in viewBox units (1200x900)
7. Use GSAP for animations (consistency)
8. Follow existing component patterns (shadcn/ui style)

## Glossary

- **Arcana**: Division of tarot deck (Major = 22 trump cards, Minor = 56 suit cards)
- **Spread**: Pattern/layout for card positions in a reading
- **Position**: Specific location in a spread with assigned meaning
- **Orientation**: Card can be upright or reversed (inverted)
- **Reading**: Instance of using a spread to answer a question
- **Insight**: Key takeaway or revelation from a reading
- **Interpretation**: Detailed analysis of a reading (AI or human)
