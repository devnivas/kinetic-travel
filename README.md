# Kinetic Travel – Production‑Ready Travel Companion

A modern, highly polished travel‑assistant web app built with **React 19**, **TypeScript**, **Vite 6**, **Tailwind CSS**, **Framer Motion**, **date‑fns**, and **Recharts**. It provides a dynamic timeline, weather forecasts, boarding‑pass view, offline caching, and more.

## Table of Contents
1. [Features](#features)
2. [Demo](#demo)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Setup & Development](#setup--development)
6. [Building for Production](#building-for-production)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

## Features
- Centralized state with `TripContext` (React Context + reducer) – persisted to `localStorage` for offline use.
- Timeline stepper with animated expansion (Framer Motion).
- Live countdown to departure using `date-fns`.
- Current weather + 3‑day forecast (mocked in dev).
- Flight‑progress visualization with Recharts.
- Caching layer – itinerary and boarding‑pass survive network loss.
- Responsive UI – mobile‑first, accessible (WCAG AA).
- Developer banner to switch preset mock scenarios.
- Subtle micro‑interactions (hover lifts, fade‑ins, smooth transitions).

## Demo
A live demo will be available after deployment (see *Deployment* below).

## Tech Stack
| Category | Library / Tool |
|---|---|
| **Framework** | React 19 |
| **Bundler** | Vite 6 |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS 4 + custom design tokens (`src/theme/tokens.css`) |
| **Animations** | Framer Motion |
| **Date utilities** | date‑fns |
| **Charts** | Recharts |
| **Server** (optional) | Express (for API stubs) |
| **Testing** | Jest + React Testing Library (optional) |
| **Version control** | Git |

## Project Structure
```
src/
├─ components/            # UI components (TimelineStepper, HeroCountdownCard, etc.)
├─ context/               # TripContext & provider
├─ data/                  # Mock data & service layer
├─ services/              # API helpers (weather, mock scenarios)
├─ theme/                 # Design tokens (tokens.css)
├─ utils/                 # Helper utilities (localStorage sync)
├─ App.tsx                # Root component (wrapped with TripProvider)
├─ index.css              # Global Tailwind imports + token import
├─ main.tsx               # ReactDOM.createRoot entrypoint
└─ types.ts               # TypeScript interfaces (TripItinerary, WeatherForecast, …)

public/
    index.html            # HTML entry point

package.json
tsconfig.json
vite.config.ts
README.md
```

## Setup & Development
1. **Prerequisites**
   - Node ≥ 20 (LTS)
   - npm (the project uses npm scripts)
2. **Clone the repository**
   ```bash
   git clone https://github.com/devnivas/kinetic-travel.git
   cd kinetic-travel
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the URL printed in the console).
5. **Environment variables**
   Copy `.env.example` to `.env` and provide any required keys (e.g., `GEMINI_API_KEY`).

## Building for Production
```bash
npm run build
```
The compiled assets appear in the `dist/` folder, ready to be served by any static web server.

## Testing
*(Optional – placeholder)*
```bash
npm run test
```
Add unit tests under `src/__tests__/` using React Testing Library.

## Deployment
### Quick static hosting (Vite preview)
```bash
npm run preview
```
### Deploy to GitHub Pages (example)
```bash
git checkout -b gh-pages
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```
### Deploy to Firebase App Hosting
1. Install the Firebase CLI:
   ```bash
   npx -y firebase-tools@latest
   ```
2. Initialise:
   ```bash
   firebase init hosting
   ```
3. Deploy:
   ```bash
   firebase deploy
   ```

## Contributing
- Fork the repo and create a feature branch.
- Follow the existing code style (Prettier + TypeScript).
- Ensure the app runs lint (`npm run lint`) and passes any existing tests.
- Open a Pull Request with a clear description of changes.

## License
MIT – see `LICENSE` file.
