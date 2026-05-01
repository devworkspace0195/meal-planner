# Meal Planner — Project Guide

## Stack
- React 19 (JSX), plain CSS, HTML
- Vite as bundler
- TheMealDB API — `https://www.themealdb.com/api/json/v1/1/` (free, no key)
- No TypeScript — all files use `.js` / `.jsx`
- No UI libraries, no CSS frameworks

---

## Folder Structure

```
src/
  components/       # Reusable UI components (one file per component)
  templates/        # Page-level layout wrappers / route shells
  pages/            # Route pages — thin, compose components
  hooks/            # Custom React hooks (useFetch, etc.)
  context/          # React context providers (RecipeContext)
  utils/            # Pure helper functions (localStorage, formatters)
  locales/          # Localisation string files (en.js, etc.)
  styles/           # Global and shared CSS files
  App.jsx           # Router setup only
  main.jsx          # Entry point
```

---

## Pages (Routes)

| Route           | Page component       | Purpose                    |
|-----------------|----------------------|----------------------------|
| `/search`       | `SearchPage`         | Search recipes              |
| `/recipe/:id`   | `RecipeDetailPage`   | Full recipe detail          |
| `/saved`        | `SavedPage`          | User's saved recipes        |
| `/planner`      | `PlannerPage`        | 7-day meal planner          |

---

## Components

| Component    | Location                       | Responsibility                  |
|--------------|--------------------------------|---------------------------------|
| `Navbar`     | `components/Navbar/`           | Shared navigation, route links  |
| `SearchBar`  | `components/SearchBar/`        | Text input + category filter    |
| `RecipeCard` | `components/RecipeCard/`       | Meal thumbnail + save button    |
| `WeekGrid`   | `components/WeekGrid/`         | 7-day slot grid for planner     |

Each component lives in its own folder: `ComponentName/index.jsx` + `ComponentName.css`.

---

## Data Layer

- **`useFetch`** (`hooks/useFetch.js`) — generic fetch hook, returns `{ data, loading, error }`
- **`RecipeContext`** (`context/RecipeContext.jsx`) — global state for saved recipes and planner slots
- **`storage`** (`utils/storage.js`) — localStorage read/write helpers, keyed constants

---

## Localisation

- All user-facing strings live in `src/locales/en.js` — **never hardcode UI text in components**
- Import the locale object and reference keys: `import t from '../../locales/en.js'`
- When adding a new string: add it to `en.js` first, then use `t.keyName` in the component
- Keys use camelCase grouped by feature: `search.placeholder`, `nav.saved`, etc.

---

## Conventions

### Language
- JavaScript only — no TypeScript, no `.ts`/`.tsx` files
- Files use `.js` for logic/hooks/utils and `.jsx` for files containing JSX

### Components
- One component per file; named exports for components, default export for pages
- No inline styles — use component-scoped CSS files

### Hooks
- Prefix with `use`
- Return plain objects `{ data, loading, error }`, not arrays

### State
- Local UI state → `useState`
- Shared app state (saved, planner) → `RecipeContext`
- Derived values → compute inline, no redundant state

### CSS
- Component CSS lives next to the component file
- Global reset + variables in `styles/global.css`
- CSS custom properties for colors/spacing — no magic numbers

---

## Security & Quality

- Never interpolate user input into `innerHTML` — use React's JSX rendering only
- Sanitize/validate all API responses before rendering (check for nulls/undefined)
- No `eval`, no `dangerouslySetInnerHTML`
- All external links use `rel="noopener noreferrer"`
- No secrets or API keys in source — TheMealDB is keyless by design
- Escape user-controlled values before using in URL query strings (`encodeURIComponent`)

---

## Modules (Build Order)

1. **Module 1 — Foundation**: routing, Navbar, layout template, global CSS ✅
2. **Module 2 — Search**: `useFetch`, `SearchBar`, `RecipeCard`, `SearchPage` ✅
3. **Module 3 — Recipe Detail**: `RecipeDetailPage`, full meal data display
4. **Module 4 — Saved Recipes**: `RecipeContext`, `localStorage`, `SavedPage`
5. **Module 5 — Meal Planner**: `WeekGrid`, `PlannerPage`, drag-to-assign slots

---

## TheMealDB API Reference

```
Search by name:       /search.php?s={name}
Search by ingredient: /filter.php?i={ingredient}
Filter by category:   /filter.php?c={category}
Get categories:       /categories.php
Lookup by ID:         /lookup.php?i={id}
Random meal:          /random.php
```
