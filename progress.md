# Progress

## 2026-03-29
- Added 3-state dark mode toggle (Light / System / Dark) to floating island control bar
- Created CSS custom properties system for theming across all components
- Updated all components (BentoCard, ListView, WelcomeCard, InfoPopup, Header, GridUI) to use CSS variables
- Toggle cycles: Light -> System -> Dark -> Light
- System mode respects `prefers-color-scheme` media query
- Build passes successfully

### Run 2
- Replaced all project data with 15 real CV-based projects (was 11 with some fictional entries)
- Renamed portfolio from "Marcus" to "Osied Shawahin" across all files (Header, WelcomeCard, SEO meta, about)
- Removed Research collection entirely (was 3rd tab)
- Created new AboutPage.jsx — article-style layout with narrative intro, career timeline, education, contact
- Updated about.json from bento card array to single article data object
- Reduced collection tabs from 3 to 2 (Projects, About)
- Build passes successfully
