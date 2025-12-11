# Tarot Journal - Master Task List
**Living Document - Last Updated: December 10, 2025**

---

## 🎯 Current Focus: Canvas & Spread System

### Phase 1: Complete Spread Canvas (Foundation)

#### 1.1 Add Cards to Canvas
- [ ] **1.1.1** Create "Add Position" button/UI in canvas toolbar (30 min)
- [ ] **1.1.2** Build modal/dialog for adding new card position (title + description inputs) (45 min)
- [ ] **1.1.3** Implement logic to add new card position to canvas at default location (30 min)
- [ ] **1.1.4** Add visual indicator for newly added positions (highlight/pulse animation) (20 min)
- [ ] **1.1.5** Test adding multiple positions and ensure proper z-index stacking (20 min)

#### 1.2 Card Rotation on Canvas
- [ ] **1.2.1** Add rotation handle/control to selected card position (45 min)
- [ ] **1.2.2** Implement GSAP rotation interaction (drag circular handle to rotate) (60 min)
- [ ] **1.2.3** Display current rotation angle in UI (degrees) (20 min)
- [ ] **1.2.4** Add snap-to-angle feature (0°, 45°, 90°, etc.) with toggle (30 min)
- [ ] **1.2.5** Persist rotation data in spread position object (15 min)

#### 1.3 Canvas Size Options
- [ ] **1.3.1** Design three canvas size presets (Small: 800x600, Medium: 1200x900, Large: 1600x1200) (15 min)
- [ ] **1.3.2** Create canvas size selector UI (dropdown or radio buttons) (30 min)
- [ ] **1.3.3** Implement canvas resize logic with GSAP animation (45 min)
- [ ] **1.3.4** Scale existing card positions proportionally when canvas size changes (60 min)
- [ ] **1.3.5** Add canvas size to spread metadata and persist to storage (20 min)

#### 1.4 Canvas Polish & UX
- [ ] **1.4.1** Add grid/guide overlay option for alignment (45 min)
- [ ] **1.4.2** Implement card position selection state (border/highlight) (20 min)
- [ ] **1.4.3** Add delete position functionality (with confirmation) (30 min)
- [ ] **1.4.4** Create edit position modal (update title/description) (40 min)
- [ ] **1.4.5** Add keyboard shortcuts (Delete key, arrow keys for nudging) (45 min)
- [ ] **1.4.6** Implement undo/redo for canvas actions (90 min)
- [ ] **1.4.7** Add canvas zoom controls (fit to screen, zoom in/out) (60 min)

#### 1.5 Save & Manage Custom Spreads
- [ ] **1.5.1** Add "Save Spread" button and validation (ensure title, at least 1 position) (30 min)
- [ ] **1.5.2** Create spread name/description input modal (20 min)
- [ ] **1.5.3** Update storage.ts to save spread with canvas positioning data (30 min)
- [ ] **1.5.4** Add success feedback (toast notification) after save (15 min)
- [ ] **1.5.5** Implement "Save As" for duplicating/modifying existing spreads (40 min)

---

## 🔄 Phase 2: Refactor Reading System to Use Spread Data

#### 2.1 Update Spread Data Structure
- [ ] **2.1.1** Add canvas positioning fields to Spread type (canvasWidth, canvasHeight) (20 min)
- [ ] **2.1.2** Add positioning fields to SpreadPosition type (x, y, rotation, zIndex) (15 min)
- [ ] **2.1.3** Migrate hardcoded spreads (Three Card, Celtic Cross) to new format (60 min)
- [ ] **2.1.4** Update spread-config.ts with positioned data (45 min)
- [ ] **2.1.5** Create migration utility for any existing localStorage spreads (60 min)

#### 2.2 Create Reading Flow - Spread Visualization
- [ ] **2.2.1** Build SpreadVisualization component that renders spread from positioning data (90 min)
- [ ] **2.2.2** Add responsive scaling for different screen sizes (60 min)
- [ ] **2.2.3** Implement card placement animation when creating reading (45 min)
- [ ] **2.2.4** Show position titles on hover/tap during card selection (30 min)
- [ ] **2.2.5** Add visual feedback for filled vs unfilled positions (20 min)

#### 2.3 Create Reading Flow - Card Selection
- [ ] **2.3.1** Update card picker to work with positioned spreads (45 min)
- [ ] **2.3.2** Implement click-to-assign card to position workflow (60 min)
- [ ] **2.3.3** Add orientation toggle (upright/reversed) during assignment (30 min)
- [ ] **2.3.4** Show preview of card in position before confirming (40 min)
- [ ] **2.3.5** Add "random draw" option for each position (45 min)

#### 2.4 View Existing Reading - Spread Display
- [ ] **2.4.1** Create ReadingSpreadView component using positioning data (90 min)
- [ ] **2.4.2** Display cards in correct positions with rotation (45 min)
- [ ] **2.4.3** Show position titles/descriptions when clicking on cards (30 min)
- [ ] **2.4.4** Add card flip animation to reveal upright/reversed meaning (60 min)
- [ ] **2.4.5** Implement zoom/pan for large spreads on mobile (75 min)

#### 2.5 Testing & Edge Cases
- [ ] **2.5.1** Test with all three canvas sizes (30 min)
- [ ] **2.5.2** Test with spreads of varying position counts (1, 3, 10, 20+ positions) (45 min)
- [ ] **2.5.3** Test reading creation with custom spreads (30 min)
- [ ] **2.5.4** Test backward compatibility with any old readings (45 min)
- [ ] **2.5.5** Test responsive behavior on mobile/tablet (45 min)

---

## 📚 Phase 3: Spreads Route - View & Manage

#### 3.1 Spreads List View
- [ ] **3.1.1** Create /journal/spreads page component (30 min)
- [ ] **3.1.2** Display grid/list of saved spreads (name, thumbnail, position count) (60 min)
- [ ] **3.1.3** Add search/filter functionality (by name, position count) (45 min)
- [ ] **3.1.4** Implement sort options (date created, name, popularity) (30 min)
- [ ] **3.1.5** Add "New Spread" button that routes to canvas (15 min)

#### 3.2 Spread Detail View
- [ ] **3.2.1** Create /journal/spreads/[id] detail page (45 min)
- [ ] **3.2.2** Display spread visualization (read-only canvas view) (60 min)
- [ ] **3.2.3** Show spread metadata (name, description, created date, usage count) (30 min)
- [ ] **3.2.4** List all readings using this spread (with links) (45 min)
- [ ] **3.2.5** Add "Edit Spread" button (route to canvas in edit mode) (20 min)
- [ ] **3.2.6** Add "Delete Spread" with confirmation and dependency check (45 min)
- [ ] **3.2.7** Add "Duplicate Spread" functionality (30 min)
- [ ] **3.2.8** Add "Create Reading" button that pre-selects this spread (20 min)

#### 3.3 Spread Templates & Discovery
- [ ] **3.3.1** Create "Browse Templates" section for pre-built spreads (45 min)
- [ ] **3.3.2** Add category tags to spreads (love, career, decision-making, etc.) (30 min)
- [ ] **3.3.3** Implement tag filtering UI (30 min)
- [ ] **3.3.4** Add "favorite" functionality for spreads (star icon) (45 min)
- [ ] **3.3.5** Create "Recently Used" section (20 min)

---

## 💡 Phase 4: Insights System Architecture

#### 4.1 Define Insights Data Model
- [ ] **4.1.1** Design Insight type structure (id, content, readingIds, tags, date, etc.) (30 min)
- [ ] **4.1.2** Add insights field to Reading type (array of insight IDs) (15 min)
- [ ] **4.1.3** Create insight storage utilities in storage.ts (45 min)
- [ ] **4.1.4** Decide on insight character limits and validation rules (20 min)

#### 4.2 Insights Creation Flow
- [ ] **4.2.1** Add "Extract Insight" button/UI to reading view (30 min)
- [ ] **4.2.2** Create insight creation modal (textarea, tags, related readings) (60 min)
- [ ] **4.2.3** Implement tag input with autocomplete from existing tags (45 min)
- [ ] **4.2.4** Add insight preview with character count (20 min)
- [ ] **4.2.5** Link insight back to source reading automatically (30 min)
- [ ] **4.2.6** Add "Quick Insight" option during reading creation (45 min)

#### 4.3 Insights List View (/journal/insights)
- [ ] **4.3.1** Create insights list page with card-based layout (60 min)
- [ ] **4.3.2** Display insight content, date, linked readings count (30 min)
- [ ] **4.3.3** Add search functionality (by content, tags) (45 min)
- [ ] **4.3.4** Implement tag-based filtering (30 min)
- [ ] **4.3.5** Add sort options (date, number of connections) (30 min)
- [ ] **4.3.6** Create "New Insight" button for standalone insights (20 min)

#### 4.4 Insight Detail & Connections
- [ ] **4.4.1** Create insight detail view/modal (45 min)
- [ ] **4.4.2** Show all linked readings with preview cards (60 min)
- [ ] **4.4.3** Add "Add Connection" to link insight to more readings (45 min)
- [ ] **4.4.4** Implement edit insight functionality (30 min)
- [ ] **4.4.5** Add delete insight with confirmation (20 min)
- [ ] **4.4.6** Show insight evolution timeline if edited (45 min)

#### 4.5 Insights Visualization & Discovery
- [ ] **4.5.1** Create insights graph/network view (showing connections) (90 min)
- [ ] **4.5.2** Add "Related Insights" recommendation system (basic text similarity) (75 min)
- [ ] **4.5.3** Implement tag cloud visualization (45 min)
- [ ] **4.5.4** Add insights calendar view (group by date) (60 min)
- [ ] **4.5.5** Create insights export functionality (JSON, Markdown) (45 min)

---

## 🔐 Phase 5: Backend - Convex Setup

#### 5.1 Initialize Convex
- [ ] **5.1.1** Install Convex dependencies (npx convex dev) (15 min)
- [ ] **5.1.2** Create Convex project and connect to app (20 min)
- [ ] **5.1.3** Set up environment variables (30 min)
- [ ] **5.1.4** Create basic convex folder structure (15 min)

#### 5.2 Define Schema
- [ ] **5.2.1** Create users table schema (60 min)
- [ ] **5.2.2** Create readings table schema with indexes (60 min)
- [ ] **5.2.3** Create spreads table schema with indexes (45 min)
- [ ] **5.2.4** Create insights table schema with indexes (45 min)
- [ ] **5.2.5** Create interpretations table schema (45 min)
- [ ] **5.2.6** Create relationships/connections table for insights (45 min)
- [ ] **5.2.7** Add schema validation and relationships (60 min)

#### 5.3 Core Mutations
- [ ] **5.3.1** Write createReading mutation (45 min)
- [ ] **5.3.2** Write updateReading mutation (30 min)
- [ ] **5.3.3** Write deleteReading mutation (30 min)
- [ ] **5.3.4** Write createSpread mutation (45 min)
- [ ] **5.3.5** Write updateSpread mutation (30 min)
- [ ] **5.3.6** Write deleteSpread mutation with dependency check (45 min)
- [ ] **5.3.7** Write createInsight mutation (45 min)
- [ ] **5.3.8** Write updateInsight mutation (30 min)
- [ ] **5.3.9** Write deleteInsight mutation (30 min)

#### 5.4 Core Queries
- [ ] **5.4.1** Write getUserReadings query with pagination (45 min)
- [ ] **5.4.2** Write getReading query (20 min)
- [ ] **5.4.3** Write getUserSpreads query (30 min)
- [ ] **5.4.4** Write getSpread query (20 min)
- [ ] **5.4.5** Write getUserInsights query with filters (45 min)
- [ ] **5.4.6** Write getInsight query (20 min)
- [ ] **5.4.7** Write searchReadings query (full-text search) (60 min)
- [ ] **5.4.8** Write searchInsights query (45 min)

#### 5.5 Data Migration
- [ ] **5.5.1** Create migration script for localStorage → Convex (90 min)
- [ ] **5.5.2** Add user consent/confirmation UI for migration (45 min)
- [ ] **5.5.3** Test migration with sample data (45 min)
- [ ] **5.5.4** Add rollback functionality if migration fails (60 min)
- [ ] **5.5.5** Create data export from localStorage before migration (30 min)

---

## 🔑 Phase 6: Authentication Setup

### Option A: WorkOS (Recommended for Production)

#### 6A.1 WorkOS Initial Setup
- [ ] **6A.1.1** Create WorkOS account and application (20 min)
- [ ] **6A.1.2** Install WorkOS SDK (@workos-inc/node) (10 min)
- [ ] **6A.1.3** Set up environment variables (API key, client ID) (15 min)
- [ ] **6A.1.4** Configure redirect URIs in WorkOS dashboard (15 min)

#### 6A.2 WorkOS + Convex Integration
- [ ] **6A.2.1** Create auth middleware for Next.js routes (60 min)
- [ ] **6A.2.2** Set up Convex auth config to accept WorkOS tokens (75 min)
- [ ] **6A.2.3** Create auth utilities (getUser, requireAuth) (45 min)
- [ ] **6A.2.4** Add user session management (60 min)
- [ ] **6A.2.5** Test authentication flow end-to-end (45 min)

#### 6A.3 Auth UI Components
- [ ] **6A.3.1** Create login page with WorkOS AuthKit (45 min)
- [ ] **6A.3.2** Create signup flow (30 min)
- [ ] **6A.3.3** Add logout functionality (20 min)
- [ ] **6A.3.4** Create protected route wrapper component (30 min)
- [ ] **6A.3.5** Add user profile dropdown in sidebar (45 min)

### Option B: Convex Auth (Beta, Faster Setup)

#### 6B.1 Convex Auth Setup
- [ ] **6B.1.1** Install Convex Auth package (10 min)
- [ ] **6B.1.2** Configure auth providers (email, OAuth) (45 min)
- [ ] **6B.1.3** Set up auth routes and callbacks (30 min)
- [ ] **6B.1.4** Test basic auth flow (30 min)

#### 6B.2 Auth UI Components
- [ ] **6B.2.1** Create login/signup forms (60 min)
- [ ] **6B.2.2** Add social auth buttons (Google, GitHub) (30 min)
- [ ] **6B.2.3** Create protected route wrapper (20 min)
- [ ] **6B.2.4** Add user profile section (45 min)

#### 6.3 User Profile & Settings (Common to Both)
- [ ] **6.3.1** Create user profile page (60 min)
- [ ] **6.3.2** Add profile editing (name, email, avatar) (60 min)
- [ ] **6.3.3** Create settings page (theme, notifications, privacy) (75 min)
- [ ] **6.3.4** Add account deletion flow (45 min)
- [ ] **6.3.5** Implement email verification (if using email auth) (60 min)

#### 6.4 Authorization & Permissions
- [ ] **6.4.1** Add user ownership checks to all mutations (60 min)
- [ ] **6.4.2** Create isOwner utility function (20 min)
- [ ] **6.4.3** Add row-level security to Convex queries (45 min)
- [ ] **6.4.4** Test unauthorized access attempts (30 min)

---

## 🤝 Phase 7: Sharing - Spreads

#### 7.1 Public Spread Sharing
- [ ] **7.1.1** Add "public" boolean field to spreads schema (15 min)
- [ ] **7.1.2** Create "Make Public" toggle in spread detail view (30 min)
- [ ] **7.1.3** Add privacy confirmation modal when making public (30 min)
- [ ] **7.1.4** Create public spread URL (/spreads/public/[id]) (45 min)
- [ ] **7.1.5** Build public spread view page (read-only, no edit) (60 min)

#### 7.2 Browse Public Spreads
- [ ] **7.2.1** Create /spreads/discover route (30 min)
- [ ] **7.2.2** Write getPublicSpreads query with pagination (45 min)
- [ ] **7.2.3** Display public spreads grid with thumbnails (60 min)
- [ ] **7.2.4** Add search and filter (by tags, position count) (60 min)
- [ ] **7.2.5** Implement sort options (popular, recent, most used) (30 min)

#### 7.3 Star/Save Spreads
- [ ] **7.3.1** Create savedSpreads table in schema (junction table) (30 min)
- [ ] **7.3.2** Add saveSpread mutation (30 min)
- [ ] **7.3.3** Add unsaveSpread mutation (20 min)
- [ ] **7.3.4** Write getUserSavedSpreads query (30 min)
- [ ] **7.3.5** Add star button to spread cards (toggle state) (45 min)
- [ ] **7.3.6** Create "My Saved Spreads" section in spreads page (30 min)
- [ ] **7.3.7** Add star count display to spread cards (20 min)

#### 7.4 Spread Comments (Optional)
- [ ] **7.4.1** Create spreadComments table in schema (45 min)
- [ ] **7.4.2** Write createComment mutation (30 min)
- [ ] **7.4.3** Write getSpreadComments query (30 min)
- [ ] **7.4.4** Build comment section UI (60 min)
- [ ] **7.4.5** Add edit/delete own comments (45 min)
- [ ] **7.4.6** Implement comment moderation/reporting (60 min)

#### 7.5 Spread Analytics
- [ ] **7.5.1** Add usage tracking (increment count when spread used) (30 min)
- [ ] **7.5.2** Track star count efficiently (denormalized field) (30 min)
- [ ] **7.5.3** Show creator their spread stats (views, saves, uses) (45 min)

---

## 📖 Phase 8: Sharing - Readings

#### 8.1 Reading Sharing Model
- [ ] **8.1.1** Design reading privacy levels (private, unlisted, public) (30 min)
- [ ] **8.1.2** Add privacyLevel field to readings schema (15 min)
- [ ] **8.1.3** Add optional custom message when sharing (20 min)
- [ ] **8.1.4** Create share reading modal/dialog (45 min)
- [ ] **8.1.5** Generate shareable link (/readings/shared/[id]) (30 min)

#### 8.2 Shared Reading View
- [ ] **8.2.1** Create public reading view page (60 min)
- [ ] **8.2.2** Display spread visualization and cards (reuse components) (30 min)
- [ ] **8.2.3** Show question, context, and creator's thoughts (conditionally) (30 min)
- [ ] **8.2.4** Add privacy controls (what to show/hide) (45 min)
- [ ] **8.2.5** Implement anonymous viewing (no login required for unlisted) (30 min)

#### 8.3 Reading Interactions
- [ ] **8.3.1** Add "helpful" reaction to shared readings (👍 count) (45 min)
- [ ] **8.3.2** Create readingReactions table (30 min)
- [ ] **8.3.3** Add reaction button and count display (30 min)
- [ ] **8.3.4** Prevent duplicate reactions from same user (20 min)

---

## 🙋 Phase 9: Community Interpretations System

#### 9.1 Request Interpretation Feature
- [ ] **9.1.1** Add "Request Interpretation" button to reading view (30 min)
- [ ] **9.1.2** Create interpretationRequests table in schema (45 min)
- [ ] **9.1.3** Write createInterpretationRequest mutation (45 min)
- [ ] **9.1.4** Add request confirmation with privacy notice (30 min)
- [ ] **9.1.5** Add optional bounty/tip field for future monetization (30 min)

#### 9.2 Browse Interpretation Requests
- [ ] **9.2.1** Create /community/requests route (45 min)
- [ ] **9.2.2** Write getOpenInterpretationRequests query (45 min)
- [ ] **9.2.3** Display requests grid with reading preview (60 min)
- [ ] **9.2.4** Add filter options (unanswered, topic, complexity) (45 min)
- [ ] **9.2.5** Implement search functionality (30 min)
- [ ] **9.2.6** Add "Claim Request" button for readers (30 min)

#### 9.3 Submit Community Interpretation
- [ ] **9.3.1** Create interpretation submission form (60 min)
- [ ] **9.3.2** Add markdown editor with preview (45 min)
- [ ] **9.3.3** Write submitCommunityInterpretation mutation (45 min)
- [ ] **9.3.4** Link interpretation to request and reading (30 min)
- [ ] **9.3.5** Send notification to reading owner (30 min)
- [ ] **9.3.6** Add interpretation guidelines/tips panel (30 min)

#### 9.4 Rate Interpretations
- [ ] **9.4.1** Add rating field (1-5 stars) to interpretations (20 min)
- [ ] **9.4.2** Create rating UI component (star selector) (30 min)
- [ ] **9.4.3** Write rateInterpretation mutation (30 min)
- [ ] **9.4.4** Allow only reading owner to rate their interpretations (20 min)
- [ ] **9.4.5** Calculate and display average reader rating (30 min)

#### 9.5 Select Preferred Interpretation
- [ ] **9.5.1** Add "Mark as Preferred" button for reading owner (30 min)
- [ ] **9.5.2** Add preferredInterpretationId field to readings (15 min)
- [ ] **9.5.3** Write setPreferredInterpretation mutation (30 min)
- [ ] **9.5.4** Display preferred badge on interpretation (20 min)
- [ ] **9.5.5** Show preferred interpretation first in list (20 min)

#### 9.6 Reader Reputation System
- [ ] **9.6.1** Add reputation score to user profile (30 min)
- [ ] **9.6.2** Calculate reputation from ratings and preferred selections (60 min)
- [ ] **9.6.3** Display reputation badge/score on interpretations (30 min)
- [ ] **9.6.4** Create leaderboard page for top readers (60 min)
- [ ] **9.6.5** Add "verified reader" badge after threshold (45 min)

---

## 💼 Phase 10: Professional Reader Features

#### 10.1 Reader Profiles
- [ ] **10.1.1** Add accountType field (free, professional) to users (20 min)
- [ ] **10.1.2** Create reader profile page (/readers/[id]) (90 min)
- [ ] **10.1.3** Add professional bio, experience, specialties fields (45 min)
- [ ] **10.1.4** Add portfolio section (showcase interpretations) (60 min)
- [ ] **10.1.5** Display stats (total readings, avg rating, response time) (45 min)
- [ ] **10.1.6** Add social links and contact info (30 min)

#### 10.2 Subscription System
- [ ] **10.2.1** Research and choose payment provider (Stripe recommended) (60 min)
- [ ] **10.2.2** Set up Stripe account and webhooks (45 min)
- [ ] **10.2.3** Create subscription plans schema (30 min)
- [ ] **10.2.4** Build pricing page (/pricing) (60 min)
- [ ] **10.2.5** Implement subscription checkout flow (90 min)
- [ ] **10.2.6** Add subscription management page (60 min)
- [ ] **10.2.7** Handle subscription webhooks (renewal, cancellation) (75 min)

#### 10.3 Professional Tools
- [ ] **10.3.1** Create analytics dashboard for professional readers (90 min)
- [ ] **10.3.2** Add client management system (list of clients) (60 min)
- [ ] **10.3.3** Build appointment scheduling system (90 min)
- [ ] **10.3.4** Add session notes feature (private reader notes) (45 min)
- [ ] **10.3.5** Create reading history export for professionals (45 min)

#### 10.4 Reader-Client Matching
- [ ] **10.4.1** Create /find-a-reader route with search/filters (75 min)
- [ ] **10.4.2** Add reader availability calendar (90 min)
- [ ] **10.4.3** Build booking request system (90 min)
- [ ] **10.4.4** Add messaging between reader and client (90 min)
- [ ] **10.4.5** Create session confirmation workflow (60 min)

---

## 💰 Phase 11: Monetization & Platform Fees

#### 11.1 Payment Processing
- [ ] **11.1.1** Set up Stripe Connect for reader payouts (90 min)
- [ ] **11.1.2** Create reader onboarding for payments (bank details) (60 min)
- [ ] **11.1.3** Implement payment escrow system (75 min)
- [ ] **11.1.4** Add platform fee calculation (e.g., 10% of reading price) (45 min)
- [ ] **11.1.5** Handle refunds and disputes (90 min)

#### 11.2 Remote Reading Sessions
- [ ] **11.2.1** Research video call integration (Twilio, Daily.co, etc.) (60 min)
- [ ] **11.2.2** Integrate video call SDK (90 min)
- [ ] **11.2.3** Create session room page with video + chat (90 min)
- [ ] **11.2.4** Add session timer and automatic end (45 min)
- [ ] **11.2.5** Implement session recording (optional, with consent) (75 min)
- [ ] **11.2.6** Add session summary/notes post-call (60 min)

#### 11.3 In-Platform Reading Creation
- [ ] **11.3.1** Add shared canvas for reader + client during session (90 min)
- [ ] **11.3.2** Allow reader to control card placement (60 min)
- [ ] **11.3.3** Auto-save reading created during session (45 min)
- [ ] **11.3.4** Add session recording to reading metadata (30 min)
- [ ] **11.3.5** Allow client to save copy of reading to their journal (45 min)

#### 11.4 Financial Tracking & Reporting
- [ ] **11.4.1** Create earnings dashboard for readers (75 min)
- [ ] **11.4.2** Generate tax documents (1099 for US readers) (90 min)
- [ ] **11.4.3** Add transaction history with filters (60 min)
- [ ] **11.4.4** Create payout schedule and automation (75 min)

---

## 🎨 Phase 12: Polish & UX Improvements

#### 12.1 Onboarding
- [ ] **12.1.1** Create welcome/onboarding flow for new users (90 min)
- [ ] **12.1.2** Add guided tour of main features (60 min)
- [ ] **12.1.3** Create sample reading for first-time users (45 min)
- [ ] **12.1.4** Add tooltips for complex UI elements (60 min)

#### 12.2 Mobile Optimization
- [ ] **12.2.1** Test all pages on mobile devices (60 min)
- [ ] **12.2.2** Fix canvas interactions for touch (90 min)
- [ ] **12.2.3** Optimize spread visualization for small screens (75 min)
- [ ] **12.2.4** Add mobile-specific gestures (pinch-zoom, swipe) (60 min)
- [ ] **12.2.5** Test on iOS and Android (45 min)

#### 12.3 Accessibility
- [ ] **12.3.1** Add proper ARIA labels to all interactive elements (60 min)
- [ ] **12.3.2** Ensure keyboard navigation works everywhere (60 min)
- [ ] **12.3.3** Test with screen reader (NVDA/JAWS) (45 min)
- [ ] **12.3.4** Add focus indicators (60 min)
- [ ] **12.3.5** Ensure color contrast meets WCAG AA (45 min)

#### 12.4 Performance
- [ ] **12.4.1** Implement lazy loading for images (45 min)
- [ ] **12.4.2** Add pagination to reading/spread lists (60 min)
- [ ] **12.4.3** Optimize Convex queries with proper indexes (60 min)
- [ ] **12.4.4** Add loading skeletons (45 min)
- [ ] **12.4.5** Run Lighthouse audit and fix issues (90 min)

#### 12.5 Error Handling
- [ ] **12.5.1** Add global error boundary (30 min)
- [ ] **12.5.2** Create error pages (404, 500) (45 min)
- [ ] **12.5.3** Add user-friendly error messages (60 min)
- [ ] **12.5.4** Implement retry logic for failed requests (45 min)
- [ ] **12.5.5** Add error logging/monitoring (Sentry) (60 min)

---

## 🚀 Phase 13: Launch Preparation

#### 13.1 Testing
- [ ] **13.1.1** Write unit tests for critical utilities (90 min)
- [ ] **13.1.2** Add E2E tests for main user flows (90 min)
- [ ] **13.1.3** Perform security audit (90 min)
- [ ] **13.1.4** Test with real users (beta testers) (ongoing)

#### 13.2 Documentation
- [ ] **13.2.1** Create user guide/help center (90 min)
- [ ] **13.2.2** Write API documentation (if exposing API) (90 min)
- [ ] **13.2.3** Create video tutorials for main features (ongoing)
- [ ] **13.2.4** Write terms of service (60 min)
- [ ] **13.2.5** Write privacy policy (60 min)

#### 13.3 Marketing & SEO
- [ ] **13.3.1** Create landing page (90 min)
- [ ] **13.3.2** Add meta tags and OG images (45 min)
- [ ] **13.3.3** Set up analytics (Google Analytics/Plausible) (30 min)
- [ ] **13.3.4** Create social media accounts (30 min)
- [ ] **13.3.5** Write launch announcement (45 min)

---

## 📊 Progress Tracking

### Completed Tasks
*Tasks will be moved here as you complete them*

### Blocked Tasks
*Tasks that are blocked by dependencies will be noted here*

### Notes & Changes
*Log of vision changes, pivots, and important decisions*

---

## 🎯 Next Session Focus
**Recommended starting point:** Phase 1, Task 1.1.1 - Begin completing the spread canvas by adding the ability to add new card positions.

