# Architectural Decisions

## 2026-03-29 — Dark mode via CSS custom properties + data-theme attribute

**Decision:** Use `data-theme` attribute on `<html>` element with CSS custom properties for theming, rather than a React context or class-based approach.

**Rationale:**
- CSS variables cascade naturally, no need to pass theme prop through every component
- `data-theme="system"` with `@media (prefers-color-scheme)` lets the browser handle system preference detection
- 3 states (light/system/dark) give users control while respecting OS preference by default
- Theme state lives in ProjectGrid and is applied via `useEffect` to `document.documentElement`
- Toggle placed in floating island next to filter for easy access

## 2026-03-29 — About page as article instead of bento cards

**Decision:** Replace the About collection (array of bento cards) with a single article-style page rendered by a dedicated `AboutPage.jsx` component.

**Rationale:**
- About content is narrative, not a grid of items — article layout is a better fit
- Data structure changed from array of card objects to a single object with intro, experience, education, contact
- Component renders when `activeCollectionIdx === 1`, replacing the grid/list views
- Uses same CSS variables for dark mode compatibility

## 2026-03-29 — Remove Research collection

**Decision:** Remove the Research tab and `research.json` import entirely.

**Rationale:**
- User requested removal
- Simplified collections from 3 tabs to 2 (Projects, About)
- `research.json` file left on disk but no longer imported
