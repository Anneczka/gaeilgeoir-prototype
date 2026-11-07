# GO Prototype · Test flows T1–T4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (native, in this session). Steps use checkbox syntax.

**Goal:** Clickable mobile prototype covering test flows T1–T4, with bottom navigation, ready for the 11 Nov pilot.

**Architecture:** Single-page React app inside a 375×812 phone frame. One in-memory store (React context + reducer) holds level, dialect, saved words, progress, conversation step. Screens are route components; reusable `UI/*` components mirror Figma. Voice is scripted.

**Tech Stack:** Vite, React 18, TypeScript, react-router-dom (HashRouter), plain CSS variables, Vitest (logic only).

**Spec:** `docs/superpowers/specs/2026-11-07-go-prototype-design.md` and `CLAUDE.md`

## Global Constraints
- Font Roboto 300–700; frame 375×812, centred on neutral background on desktop.
- Colours/type/spacing/radius only from the CLAUDE.md tokens; no new tokens.
- Touch targets ≥ 44×44; real `<button>`/`<a>`; visible focus ring `border/focus`; `aria-label` on icon buttons; never colour alone for right/wrong.
- Never call a real speech API. Any non-empty email+password logs in.
- Copy only in `src/data/content.ts`; fake numbers only in `src/data/fake.ts`; fictional nicknames only.
- "Reset prototype" in Settings returns to Welcome and clears the store.
- Run commands with `PATH=".tools/node-v22.23.4-darwin-x64/bin:$PATH"`.

## Review Focus
- Back/X on every screen never dead-ends (goes to a sensible parent).
- Empty email or password on Log in shows an error and does not advance.
- Browser refresh mid-flow lands on a valid screen (unknown route → Welcome or Home).
- Hold-to-speak released too early / tapped, not held: still shows a usable state.
- Reset during a conversation clears step progress.

## File Structure
- `src/styles/tokens.css`, `global.css` – tokens and base styles
- `src/data/content.ts`, `fake.ts` – copy, fake data
- `src/state/store.tsx` – context, reducer, `useStore()`; `store.test.ts`
- `src/components/*` – one file per `UI/*` component
- `src/icons/*` – SVG icons from Figma
- `src/screens/*` – one file per Figma screen
- `src/App.tsx`, `src/main.tsx` – frame and routes

### Task 1: Project, tokens, phone frame
**Files:** Create Vite scaffold, `tokens.css`, `global.css`, `App.tsx`; update `LEIA-ME.md`.
**Produces:** `npm run dev` shows empty app in a centred 375×812 frame with Roboto.
- [ ] Scaffold Vite React-TS in the project folder; add react-router-dom, vitest.
- [ ] Put all CLAUDE.md tokens in `tokens.css` as CSS variables (primitives + semantic).
- [ ] Verify in browser: frame centred, font loads. Commit (when Git works).

### Task 2: Store and navigation logic (tested)
**Files:** `src/state/store.tsx`, `src/state/store.test.ts`
**Produces:** `type State = { loggedIn: boolean; level: string|null; dialect: string|null; savedWords: string[]; convStep: number; wordStep: number }`; actions `login`, `setLevel(l)`, `setDialect(d)`, `completeConvStep`, `completeWordStep`, `saveWord(w)`, `reset`.
- [ ] Write tests: reset returns initial state; completeConvStep increments; saveWord is idempotent.
- [ ] Run (fail) → implement reducer → run (pass).

### Task 3: Shared components (from Figma)
**Files:** `src/components/{Button,IconButton,AppBar,ActivityHeader,BottomNav,OptionCard,TextInput,ProgressBar,TutorVideo,TutorMessage,UserMessage,FeedbackCard,SuggestionCard,MicBar,Dialog,BottomSheet,Toast,Chip}.tsx`, icons.
- [ ] Read each from Figma (`get_design_context`), build, render a temporary gallery route, compare to Figma screenshots.

### Task 4: T1 Start learning
Screens: 00 Welcome `156:2009`, 00b Log in `156:2034`, 01 Level `62:1308`, 02 Dialect `62:1310`, 03 Home `62:1312`.
- [ ] Build screens and routes; empty-field login error; Continue disabled until a choice.
- [ ] Click through in browser: Welcome → Log in → Level → Dialect → Home.

### Task 5: T2 Conversation
Screens: 07 `62:1321`, 08 `62:1323`, 09 `62:1325`, 09b `138:3207`, 07b `156:2120`, 07c `157:2142`; entry from Home "Start talking".
- [ ] Scripted recognised text in `content.ts`; hold mic → recording state → What we heard → Send → Correction → try again → Step complete → next step.
- [ ] X → Exit dialog (stay / leave); settings icon → Voice settings sheet.

### Task 6: T3 Words and T4 Navigation
Screens: 10 Practice `62:1328`, 13 `62:1334`, 14 `62:1336` (same chat layout as 08).
- [ ] Practice → 1000 Word Way → Word lesson → step complete.
- [ ] Bottom nav Home/Courses/Practice/Profile with active state (Courses and Profile as simple placeholders until later); back/X from every screen.

### Task 7: Reset and final check
- [ ] Minimal Settings screen with "Reset prototype"; update `LEIA-ME.md`; run T1→T4 end to end and screenshot.
