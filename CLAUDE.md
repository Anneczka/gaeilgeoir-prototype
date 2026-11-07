# Gaeilgeoir (GO) · Coded prototype

Read this whole file before writing code. It is the brief for this project.

## Who and why
- **Owner:** Ana Paula Umbelino, UX/UI designer doing a volunteer UX review of **Gaeilgeoir ("GO")**, an AI app for learning Irish (contact at GO: David). She is **new to coding**: explain what you do in plain words, show results in the browser, avoid jargon, and ask before big decisions. She writes in Portuguese or English; answer in the language she uses.
- **Goal:** a clickable, high-fidelity **mobile prototype** of the redesigned GO app, used in **moderated usability tests** (online, 45 min, participant on a computer sharing the screen) that compare the **current app** with this prototype.
- **Dates:** prototype ready **10 Nov 2026** · pilot test **11 Nov** · sessions **12, 13 and 16 Nov** · final delivery **27 Nov**.
- **Scope decided by Ana:** build the **whole app** (all screens below), so navigation between Home, Courses, Practice and Profile is real. Build the **test flows first**, then the rest.

## Source of truth: Figma
- Design file: https://www.figma.com/design/ZSn3jdIJpQgCVT8SAvN00l (file key `ZSn3jdIJpQgCVT8SAvN00l`)
  - Page **📱 UI · Alta fidelidade** = the screens (node IDs below).
  - Page **🎨 Design System** = Foundations (colours, type, spacing, radius) + **GO Design System · Components** (all `UI/*` components and icons).
  - Page **Wireframes** = old black-and-white wireframes (reference only, do not copy).
- User flow draft (FigJam): https://www.figma.com/board/IM0xFxXjrNU4nk64i1mhS0 (right of the benchmark board). It does not yet include the Flow 4 and Flow 5 screens.
- If the Figma MCP is connected, read screens with `get_design_context` / `get_screenshot` using the node IDs below, and follow the figma-design-to-code skill. Match spacing, type and colours to the tokens; do not invent new ones.

## Screens (Figma node IDs)
**Flow 1 · Onboarding, Home, Courses:** 01 Onboarding: level `62:1308` · 02 Onboarding: dialect `62:1310` · 03 Home `62:1312` · 04 Courses `62:1314` · 05 Change level (pop-up) `62:1316` · 06 Course detail `62:1318`
**Flow 2 · Voice conversation:** 07 Conversation `62:1321` · 08 Correction `62:1323` · 09 What we heard `62:1325` · 09b Voice settings (sheet) `138:3207`
**Flow 3 · Practice and Profile:** 10 Practice `62:1328` · 11 Songs `62:1330` · 12 Quizzes `62:1332` · 13 1000 Word Way `62:1334` · 14 Word lesson `62:1336` · 15 Profile `62:1338` · 16 Settings `62:1340`
**Flow 4 · Access, states, support:** 00 Welcome `156:2009` · 00b Log in `156:2034` · 00c Free trial `156:2072` · 07b Exit conversation (dialog) `156:2120` · 07c Step complete `157:2142` · 15b My words `157:2194` · 12b Quiz results `157:2266` · 10b Podcast error `157:2308`
**Flow 5 · Leaderboard:** 15c Leaderboard `178:2272` · 15d Leaderboard (new user) `178:2448` · 15e How XP works (sheet) `178:2556`

## Build order
1. **Test flows (must work for the pilot on 11 Nov):**
   - T1 Start learning: Welcome → Log in (temporary login) → 01 Level → 02 Dialect → 03 Home.
   - T2 Have a conversation: Home "Start talking" (or 06 Course detail "Continue") → 07 → hold mic → 09 What we heard → Send → 08 Correction → try again → 07c Step complete → next step. X button → 07b Exit dialog. Settings icon → 09b Voice settings.
   - T3 Learn new words: 10 Practice → 13 1000 Word Way → 14 Word lesson (same chat layout as 08) → step complete.
   - T4 Go back home: bottom nav and back/X from every screen.
2. Bottom nav tabs: Home · Courses · Practice · Profile, with correct active state.
3. Everything else: Courses + Change level pop-up + Course detail, Songs, Quizzes + results, Profile, Settings, My words (toast "Word saved"), Podcast error, Free trial, Leaderboard (+ empty state + How XP sheet + Settings toggle).

## Behaviour decisions
- **Voice is simulated** ("Wizard of Oz"): browsers do not reliably recognise Irish. "Hold to speak" shows a short recording state, then the scripted recognised text appears in "What we heard". "Type" opens a text field as an alternative. Never call a real speech API in this prototype.
- **Login:** participants get a temporary email + password from GO. In the prototype any non-empty email/password logs in, and the user then goes through onboarding (level, dialect).
- **Screen 14 (Word lesson) intentionally uses the same chat layout as 08**: the 1000 Word Way is also a conversation today.
- **Tutor:** Pádraig · Munster dialect (voice provider ABAIR). Speakers in voice settings: Pádraig (Male), Sibéal (Female).
- **Progress, XP, leaderboard data are fake** and kept in one data file so they are easy to change. Use fictional nicknames only (never real user names or emails).
- **State:** keep choices (level, dialect, saved words, progress) in memory during a session; add a visible "Reset prototype" option (e.g. in Settings) so each test participant starts from the Welcome screen.
- **Irish text** comes from the Figma screens; it still needs checking by David. Keep all copy in one content file.

## Design system (tokens)
Font: **Roboto** (Google Fonts), weights 300/400/500/600/700. Mobile frame **375 × 812**; on a computer, show the app centred in a phone-sized frame on a neutral background.

**Text styles** (size/line-height, letter-spacing): Display Bold 32/40 −0.6px · Heading 1 Bold 26/32 −0.4px · Heading 2 SemiBold 20/28 −0.2px · Heading 3 SemiBold 17/24 −0.1px · Body Large Regular 17/26 · Body Large Strong Medium 17/26 · Body Regular 15/22 · Body Strong Medium 15/22 · Small Light 13/18 · Caption Medium 12/16 · Overline Bold 11/16 +0.8px uppercase · Button SemiBold 16/24.

**Primitives:** green 50 #EFFAF4 · 100 #D9F3E7 · 200 #B5E5CB · 300 #8DD5AE · 400 #70C894 · 500 #59BF7F (brand accent) · 600 #3E9F63 · 700 #1E7F4C · 800 #17633B · 900 #0F3F26 · gray 0 #FFFFFF · 50 #F7F8FA · 100 #F2F3F5 · 200 #E4E6EA · 300 #CBD0D6 · 400 #9AA1AB · 500 #6B7280 · 600 #4B5563 · 700 #374151 · 800 #1F2937 · 900 #111827 · amber 50 #FFF6E0 · 600 #B26B00 · 700 #8A5300 · red 50 #FDECEC · 600 #C53030 · orange 700 #B34C00 · yellow 700 #7D5C00 · blue 700 #1565C0 · purple 700 #5E517A.

**Semantic colours (use these in code):** bg/app gray50 · bg/surface white · bg/subtle gray100 · bg/brand green700 · bg/brand-hover green800 · bg/brand-accent green500 · bg/brand-subtle green50 · bg/success-subtle green100 · bg/warning-subtle amber50 · bg/error-subtle red50 · bg/inverse gray900 · text/primary gray900 · text/secondary gray600 · text/tertiary gray500 · text/on-brand white · text/brand green700 · text/success green800 · text/warning amber700 · text/error red600 · icon/default gray700 · icon/muted gray500 · icon/brand green700 · icon/on-brand white · border/default gray200 · border/strong gray300 · border/brand green600 · border/focus green700 · border/error red600.
**Accent (practice tiles):** orange 50 #FCF3E9 / 500 #F57B00 · purple 50 #F2EEFA / 500 #73668E · mint 50 #EAF7F1 / 500 #5BC687 · yellow 50 #FEF8DD / 500 #DCA300 · blue 50 #E8F3FD / 500 #2196F2. Use the 700 shades for white text on coloured buttons (500 shades fail contrast with white).

**Spacing:** 0, 4, 8, 12, 16, 20, 24, 32, 40, 48 (4-pt grid; screen side margin 20). **Radius:** sm 8 · md 12 · lg 16 · xl 24 · full 999.
**Elevation:** E1 (featured cards) `0 1px 2px rgba(17,24,39,.04), 0 4px 16px rgba(17,24,39,.06)` · E2 (bottom nav, sheets, dialogs) `0 -2px 16px rgba(17,24,39,.08)`. List cards use a 1px border/default and no shadow. Buttons have no shadow.

**Components** (build one reusable component for each `UI/*` in Figma): App bar · Title header · Activity header (X + progress + settings) · Step header · Bottom nav (Active = Home/Courses/Practice/Profile; active tab = light green pill behind the icon, label in text/success) · Button (Primary/Secondary/Ghost, height 52, radius md) · Icon button (44×44 hit area) · Chip · Word chip · Progress bar (with a value prop!) · Option card (Default/Selected) · Level row · Course row · Current course card · Module step (Done/Current/Todo) · Settings row · Practice tile · Stat · Path node (Done/Current/Locked) · Quiz option (Default/Correct/Wrong) · Step goal · Tutor video · Tutor message · User message · Feedback card · Suggestion card · Mic bar · Avatar (S/M/L, initials) · Segmented control · Text input (Default/Focus/Error) · Toggle · Toast · Dialog · Bottom sheet · Empty state · Leaderboard row (You true/false) · Podium. Icons: export the SVGs from the Figma Icons section (24px line icons).

## Quality bar
- **Accessibility (WCAG 2.1 AA):** all text ≥ 4.5:1 (the design already passes; keep the same colour pairs). Touch targets ≥ 44×44. Real `<button>` and `<a>` elements, visible focus ring (border/focus), labels on inputs, `aria-label` on icon buttons, never colour alone for right/wrong.
- Pixel-close to Figma; when unsure, check the Figma screen instead of guessing.
- After each flow: run it in the browser, click through it, and show Ana. Do not claim something works without checking it.

## Tech and running
- Recommended: **Vite + React + TypeScript**, plain CSS with CSS variables for the tokens (no UI library), React Router (or simple state) for navigation. Keep data and copy in `src/data/`.
- Before starting, check that Node.js (LTS) is installed on this Mac (`node -v`); if not, explain to Ana how to install it and wait.
- Use Git from the start (commit after each working step, with clear messages) so Ana can go back to any version.
- Ana should be able to run it with: `npm install` once, then `npm run dev`, and open the address it prints. Write these steps in `LEIA-ME.md` (Portuguese) as you go.
- For the test sessions, the prototype will need a shareable link (e.g. a static host like Netlify or GitHub Pages). Ask Ana before publishing anything.

## Do not
- Do not publish, deploy or share anything without asking Ana.
- Do not use real participant data, emails or real leaderboard names.
- Do not change the Figma file from here unless Ana asks.
