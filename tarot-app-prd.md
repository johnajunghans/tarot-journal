# Product Requirements Document: AI Tarot Reading Web App

**Version:** 1.0  
**Date:** December 5, 2025  
**Status:** Draft

---

## Executive Summary

An AI-powered web application that allows users to record, store, visualize, and interpret tarot card readings. The app bridges physical tarot practice with digital analysis by providing a fast input system for card readings and AI-generated interpretations while maintaining a simple, user-friendly interface.

---

## Problem Statement

Tarot practitioners currently lack a dedicated digital tool that:
1. Provides a quick and intuitive way to record physical tarot readings for future reference
2. Offers AI-powered interpretation and analysis of readings with the ability to save these insights
3. Maintains the visual and experiential aspects of traditional tarot layouts in digital form

The app aims to complement, not replace, the practice of laying out physical cards by focusing on documentation and AI-assisted interpretation.

---

## Goals and Objectives

### Primary Goals
- Create a fast, frictionless input system for recording tarot readings
- Provide meaningful, poetic AI interpretations of readings
- Build a simple storage and retrieval system for past readings

### Success Metrics
- Average time to input a complete reading: < 2 minutes
- User returns to reference past readings regularly
- Users generate and save AI interpretations for their readings
- Clean, intuitive interface that requires minimal learning curve

---

## Target Audience

- Tarot practitioners (beginners to experienced) who use physical cards
- Users who want to maintain a digital journal of their readings
- Individuals interested in AI-assisted interpretation of tarot readings
- People seeking a simple tool without complex features or authentication barriers

---

## Technical Stack

- **Framework:** Next.js (React-based)
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Theme:** Light/dark mode using shadcn's recommended approach
- **Data Storage:** localStorage (prototype phase, no backend)
- **AI Integration:** OpenRouter API
- **Tarot Deck:** Rider-Waite deck imagery and naming conventions

---

## Functional Requirements

### 1. Reading Types (Supported Spreads)

The app supports three reading types in the prototype:

#### 1.1 Three Card Reading (Past, Present, Future)
- Three cards laid out horizontally
- Position labels: "Past," "Present," "Future"

#### 1.2 Four Card Reading
- One card at top (overall/theme)
- Three cards below in a row (details)
- Position labels: "Overall" (top), "Detail 1," "Detail 2," "Detail 3" (bottom row)

#### 1.3 Celtic Cross (Ten Card Reading)
- Traditional Celtic Cross layout with 10 positions
- Position labels:
  1. Present Situation
  2. Challenge/Crossing
  3. Foundation/Past
  4. Recent Past
  5. Crown/Best Outcome
  6. Near Future
  7. Self
  8. Environment
  9. Hopes/Fears
  10. Outcome

### 2. Card Input System

#### 2.1 Card Database
- Full 78-card Rider-Waite deck
- 22 Major Arcana cards (numbered 0-21)
- 56 Minor Arcana cards (4 suits: Cups, Wands, Pentacles, Swords)
- Each card supports upright and reversed orientations

#### 2.2 Search Functionality
- Real-time search initiated when user begins typing
- Search matches on:
  - Card number (e.g., "4" shows Four of Cups, Four of Wands, Four of Pentacles, Four of Swords, and The Emperor)
  - Card name (e.g., "death" shows Death card)
  - Suit name (e.g., "cups" shows all Cups cards)
- Fast, responsive autocomplete interface
- Users can select orientation (upright/reversed) for each card during input

#### 2.3 Input Flow
1. User selects reading type (3-card, 4-card, or Celtic Cross)
2. User is prompted to input cards sequentially based on reading type
3. For each card position, search interface appears
4. User types to search and selects card + orientation
5. Once all cards are entered, reading is saved with timestamp

### 3. Reading Visualization

#### 3.1 Visual Layout
- Cards displayed in their traditional spread positions
- Card images from Rider-Waite deck
- Reversed cards displayed upside-down
- Position labels shown in small text below each card
- Clean, uncluttered layout with appropriate spacing

#### 3.2 Card Interaction (Hover State)
- Card slightly increases in scale on hover
- Drop shadow effect applied
- Popover appears displaying:
  - Card name
  - Orientation (Upright/Reversed)
  - Arcana type (Major or Minor)
  - Brief meaning description (different text for upright vs. reversed)

### 4. AI Interpretation System

#### 4.1 Interpretation Request Flow
1. User clicks prominent "Get Interpretation" button while viewing a reading
2. Large dialog opens showing:
   - Basic reading details (date, card count)
   - Required field: "Question" (text input)
   - Optional field: "Context" (larger textarea)
   - "Generate Interpretation" button

#### 4.2 AI System Prompt
The AI model receives:
- System prompt establishing it as an experienced tarot reader
- Instructions to provide meaningful, deep, poetic interpretations
- Instructions to return response in markdown format
- All card information (names, positions, orientations)
- User's question and optional context

**System Prompt Template:**
```
You are an experienced and insightful tarot reader providing a meaningful interpretation. Your readings should be deep, poetic, and thoughtful in tone. Consider the symbolism of each card, their positions in the spread, and their orientations (upright or reversed). Weave these elements together with the querent's question and context to provide guidance and insight.

Return your interpretation in well-formatted markdown.
```

#### 4.3 Interpretation Dialog Features
- Display AI-generated interpretation in rendered markdown
- Action buttons:
  - "Save Interpretation" - Saves interpretation to the reading
  - "Regenerate" - Creates new interpretation with same inputs
  - "Delete" - Discards current interpretation
- Multiple interpretations can be saved per reading
- Each interpretation stores: question, context, AI response, timestamp

### 5. Data Storage (localStorage)

#### 5.1 Reading Object Structure
```javascript
{
  id: string (UUID),
  date: timestamp,
  type: "three-card" | "four-card" | "celtic-cross",
  cards: [
    {
      position: number,
      cardName: string,
      orientation: "upright" | "reversed",
      positionLabel: string
    }
  ],
  interpretations: [
    {
      id: string (UUID),
      date: timestamp,
      question: string,
      context?: string,
      aiResponse: string (markdown)
    }
  ]
}
```

### 6. Export Functionality

#### 6.1 Download as Markdown
- Users can download saved readings as `.md` files
- Downloaded file includes:
  - Reading date
  - Reading type
  - Question asked
  - Context provided (if any)
  - List of cards drawn with positions and orientations
  - AI interpretation(s) in chronological order
- Filename format: `tarot-reading-[date].md`

### 7. Navigation and Layout

#### 7.1 Home Page
- Simple, clean interface
- Vertical list of saved readings displayed as cards
- Each reading card shows:
  - Date
  - Question (truncated if long)
  - Reading type
  - Number of interpretations
  - Preview of card spread (small thumbnails)
- Top right: Large, bright "New Reading" button
- Top left: App name/logo (clickable, returns to home)
- Readings sorted by date (newest first)

#### 7.2 Reading Detail Page
- Full visual spread of the reading
- All cards displayed with hover interactions
- List of saved interpretations (expandable/collapsible)
- "Get New Interpretation" button
- "Download as Markdown" button
- "Delete Reading" option
- Back button to return to home page

### 8. Theme Support

#### 8.1 Light/Dark Mode
- Implemented using shadcn/ui's recommended approach
- Toggle available in UI (likely in header)
- User preference persisted in localStorage
- All components styled appropriately for both modes
- Card images and layouts remain legible in both themes

---

## Non-Functional Requirements

### Performance
- Page load time: < 2 seconds
- Card search results appear: < 200ms after keystroke
- Smooth animations and transitions (60fps)
- AI interpretation generation: Display loading state, complete within 30 seconds

### Usability
- Intuitive interface requiring minimal instructions
- Mobile-responsive design
- Accessible keyboard navigation
- Clear visual feedback for all interactions

### Reliability
- Data persists in localStorage between sessions
- Graceful error handling for AI API failures
- No data loss during input process

### Security & Privacy
- No authentication in prototype phase
- All data stored locally on user's device
- OpenRouter API key stored securely (environment variable)
- No tracking or analytics in prototype

---

## User Stories

### Core Workflows

**Story 1: Recording a New Reading**
> As a tarot practitioner, I want to quickly input the cards from my physical reading so that I can save it for later reference.

**Acceptance Criteria:**
- User can select from three reading types
- Search system allows fast card selection with < 5 characters typed
- Can specify reversed cards during input
- Reading is saved with timestamp automatically

---

**Story 2: Getting an AI Interpretation**
> As a user, I want to receive an AI-generated interpretation of my reading so that I can gain additional insights beyond my own understanding.

**Acceptance Criteria:**
- User can input question and context for the reading
- AI returns poetic, meaningful interpretation in markdown
- Interpretation is displayed in readable format
- User can regenerate if unsatisfied
- Multiple interpretations can be saved for the same reading

---

**Story 3: Reviewing Past Readings**
> As a user, I want to see a list of my past readings and access them easily so that I can track patterns and revisit old questions.

**Acceptance Criteria:**
- Home page displays all saved readings
- Readings show date, question, and type
- Clicking a reading opens detail view
- All saved interpretations are accessible

---

**Story 4: Exporting a Reading**
> As a user, I want to download my reading and its interpretation as a markdown file so that I can keep it in my personal notes system.

**Acceptance Criteria:**
- Download button available on reading detail page
- File includes all reading details and interpretations
- Markdown format is clean and readable
- Filename includes date for organization

---

**Story 5: Viewing Card Meanings**
> As a beginner, I want to see brief meanings when hovering over cards so that I can learn while reviewing my readings.

**Acceptance Criteria:**
- Hovering over any card shows popover
- Popover includes card name, arcana type, and brief meaning
- Different meanings shown for reversed cards
- Popover doesn't obstruct the reading layout

---

## Design Specifications

### Visual Design Principles
- **Simplicity:** Minimal UI elements, focus on content
- **Speed:** Fast input is the priority
- **Clarity:** Clear visual hierarchy and navigation
- **Atmosphere:** Respectful of tarot's mystical nature without being overly decorative
- **Accessibility:** Readable text, sufficient contrast, clear interaction states

### Component Requirements (shadcn/ui)
- Button (primary action, secondary action, destructive)
- Card (for reading list items)
- Dialog (for AI interpretation flow)
- Input (for search and text entry)
- Textarea (for context field)
- Popover (for card meanings)
- Toggle (for dark mode)
- Badge (for tags/labels)

### Color Scheme Considerations
- Dark mode should use deep, rich colors (not pure black)
- Light mode should use soft, comfortable backgrounds
- Accent colors should be vibrant but not harsh
- Card images should remain prominent in both themes

---

## Technical Specifications

### API Integration (OpenRouter)

#### Configuration
```javascript
// Environment variables required
OPENROUTER_API_KEY=xxx
OPENROUTER_MODEL=anthropic/claude-sonnet-4-5 // or preferred model
```

#### API Call Structure
```javascript
POST https://openrouter.ai/api/v1/chat/completions
{
  "model": "anthropic/claude-sonnet-4-5",
  "messages": [
    {
      "role": "system",
      "content": "[Tarot reader system prompt]"
    },
    {
      "role": "user",
      "content": "[Reading details + question + context]"
    }
  ]
}
```

### Data Models

#### Card Model
```typescript
interface Card {
  id: string;
  name: string;
  number?: number; // For Major Arcana
  suit?: "cups" | "wands" | "pentacles" | "swords"; // For Minor Arcana
  arcana: "major" | "minor";
  uprightMeaning: string;
  reversedMeaning: string;
  imageUrl: string;
  keywords: string[];
}
```

#### Reading Model
```typescript
interface Reading {
  id: string;
  date: Date;
  type: "three-card" | "four-card" | "celtic-cross";
  cards: ReadingCard[];
  interpretations: Interpretation[];
}

interface ReadingCard {
  position: number;
  cardId: string;
  cardName: string;
  orientation: "upright" | "reversed";
  positionLabel: string;
}

interface Interpretation {
  id: string;
  date: Date;
  question: string;
  context?: string;
  aiResponse: string; // markdown
  model: string; // AI model used
}
```

### File Structure (Next.js)
```
/app
  /page.tsx                    # Home page (reading list)
  /reading/[id]/page.tsx       # Reading detail page
  /new-reading/page.tsx        # New reading creation flow
  /components
    /reading-card.tsx          # Reading list item component
    /spread-layout.tsx         # Visual card layout component
    /card-search.tsx           # Card search/input component
    /interpretation-dialog.tsx # AI interpretation dialog
    /card-popover.tsx          # Card hover popover
  /lib
    /tarot-data.ts            # Card database
    /storage.ts               # localStorage utilities
    /openrouter.ts            # API integration
    /utils.ts                 # Helper functions
```

---

## Constraints and Assumptions

### Constraints
- No backend or database in prototype phase
- Limited to localStorage capacity (~5-10MB depending on browser)
- No user authentication or multi-device sync
- Dependent on OpenRouter API availability
- Requires internet connection for AI interpretations
- Limited to three specific reading types initially

### Assumptions
- Users have basic familiarity with tarot readings
- Users will perform readings with physical cards separately
- Users have modern browsers supporting localStorage and ES6+
- Users understand AI interpretations are supplementary, not authoritative
- Rider-Waite deck imagery is available for use (public domain considerations)

---

## Future Enhancements (Out of Scope for Prototype)

### Phase 2 Considerations
- User authentication and cloud storage
- Additional spread types (custom spreads)
- Journal/notes feature for each reading
- Search and filter saved readings
- Export to PDF with card images
- Social features (share readings, anonymously)
- Reading statistics and insights
- Custom card deck support
- Mobile app versions (iOS/Android)
- Offline mode for AI interpretations (cached responses)
- Integration with calendar/journal apps
- Reading reminders and habits tracking

---

## Open Questions

1. **AI Model Selection:** Which OpenRouter model should be default? Consider cost vs. quality trade-offs.
2. **Card Image Licensing:** Confirm Rider-Waite images can be used freely or identify alternative source.
3. **localStorage Limits:** What happens when storage is full? Implement warning system?
4. **Error States:** How should app handle OpenRouter API failures? Retry logic? Cached fallback?
5. **Reading Deletion:** Should there be confirmation before deleting readings with saved interpretations?

---

## Success Criteria

The prototype will be considered successful if:

1. **Input Speed:** Users can input a complete Celtic Cross reading in under 2 minutes
2. **Interpretation Quality:** AI interpretations are coherent, relevant, and poetic in tone
3. **Usability:** First-time users can complete a full workflow without instructions
4. **Performance:** App feels fast and responsive on desktop and mobile browsers
5. **Reliability:** No data loss in localStorage across sessions
6. **Adoption:** Users return to reference past readings and generate multiple interpretations

---

## Timeline and Milestones

### Phase 1: Core Development (Prototype)
- **Week 1-2:** Project setup, card database, basic UI structure
- **Week 3:** Card input system with search functionality
- **Week 4:** Reading visualization and layout components
- **Week 5:** AI integration and interpretation dialog
- **Week 6:** Export functionality, polish, and testing

### Phase 2: Review and Iteration
- User testing with 5-10 tarot practitioners
- Bug fixes and UX improvements
- Performance optimization
- Documentation

---

## Appendix

### A. Tarot Card Reference

**Major Arcana (22 cards):**
0. The Fool
1. The Magician
2. The High Priestess
3. The Empress
4. The Emperor
5. The Hierophant
6. The Lovers
7. The Chariot
8. Strength
9. The Hermit
10. Wheel of Fortune
11. Justice
12. The Hanged Man
13. Death
14. Temperance
15. The Devil
16. The Tower
17. The Star
18. The Moon
19. The Sun
20. Judgement
21. The World

**Minor Arcana (56 cards):**
- Cups: Ace through King (14 cards)
- Wands: Ace through King (14 cards)
- Pentacles: Ace through King (14 cards)
- Swords: Ace through King (14 cards)

Each suit contains: Ace, 2-10, Page, Knight, Queen, King

### B. Celtic Cross Position Meanings

1. **Present Situation:** The heart of the matter, current state
2. **Challenge/Crossing:** Obstacle or opposing force
3. **Foundation/Past:** Root cause, past influences
4. **Recent Past:** What is passing, recent events
5. **Crown/Best Outcome:** Conscious goals, best possible outcome
6. **Near Future:** What is approaching, upcoming influences
7. **Self:** Querent's attitude, how they see themselves
8. **Environment:** External influences, others' perspectives
9. **Hopes/Fears:** Inner emotions, subconscious influences
10. **Outcome:** Final result, synthesis of all factors

### C. Example AI Prompt (Detailed)

```
System: You are an experienced and insightful tarot reader with deep knowledge of the Rider-Waite deck. You provide meaningful, poetic interpretations that help querents find guidance and clarity. Your readings weave together the symbolism of each card, their positions in the spread, and whether they appear upright or reversed. You speak with wisdom, compassion, and depth.

When providing an interpretation:
- Consider each card's traditional symbolism and how it relates to the question
- Pay attention to reversed cards, which often indicate blockages, internalized energy, or reversed meanings
- Connect the cards to create a cohesive narrative
- Be poetic but clear in your language
- Offer insight without being prescriptive
- Format your response in markdown with clear sections

User: 
Reading Type: Celtic Cross
Question: Should I pursue this new career opportunity?
Context: I've been in my current role for 5 years and feel stagnant. A new position opened up that excites me but requires relocation.

Cards:
1. Present Situation: Three of Cups (Upright)
2. Challenge: Five of Pentacles (Reversed)
3. Foundation: The Hermit (Upright)
4. Recent Past: Eight of Wands (Upright)
5. Crown: The Sun (Upright)
6. Near Future: Two of Swords (Upright)
7. Self: Knight of Wands (Upright)
8. Environment: King of Pentacles (Upright)
9. Hopes/Fears: The Tower (Reversed)
10. Outcome: Ace of Wands (Upright)

Please provide your interpretation.
```

---

**Document End**

*This PRD is a living document and should be updated as requirements evolve during development.*