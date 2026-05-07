# FinTrack

FinTrack est une petite application de suivi budgétaire construite avec React et Vite.
Elle permet de visualiser un solde, d’ajouter des transactions et d’exporter les données en CSV.
Le projet sert aussi de support d’apprentissage autour de la qualité logicielle, des tests et du refactoring.
Le module `src/transactions-legacy.js` illustre volontairement un code historique à analyser et améliorer.

[![CI](https://github.com/Smiil3/fintrack-starter/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/Smiil3/fintrack-starter/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-lcov%20report-blue)](./coverage/lcov-report/index.html)
[![Version](https://img.shields.io/badge/version-0.1.0-lightgrey)](./package.json)

## Prérequis

- Node.js 18 ou supérieur
- npm 9 ou supérieur

## Installation

```bash
npm ci
```

Cette commande installe toutes les dépendances du projet à partir du fichier `package-lock.json`.

## Lancement

### Mode développement

```bash
npm run dev
```

L’application démarre sur `http://localhost:5173`.

### Build de production

```bash
npm run build
```

### Prévisualiser le build

```bash
npm run preview
```

## Tests

### Tests unitaires

```bash
npm test
```

### Tests E2E

```bash
npx playwright test
```

Les tests Playwright utilisent `playwright.config.js` et lancent les scénarios du dossier `e2e/`.

### Couverture

```bash
npx jest --coverage
```

Le rapport HTML de couverture est disponible dans `coverage/lcov-report/index.html`.

## Structure du projet

- `src/` : code source de l’application React et des modules métiers
  - `App.jsx` : interface principale
  - `calculator.js` : logique de calcul
  - `export-csv.js` : export des transactions
  - `transactions-legacy.js` : module historique à refactorer
  - `seed.js` : données de départ
  - `styles.css` : styles globaux
- `tests/unit/` : tests unitaires Jest
- `e2e/` : tests de bout en bout Playwright
- `docs/` : documentation projet et audits qualité
- `coverage/` : rapport de couverture généré localement

## Documentation

- Audit qualité : [`docs/audit.md`](docs/audit.md)
- Scénarios métier : [`docs/scenarios.md`](docs/scenarios.md)
- Stratégie de tests : [`docs/tests-strategy.md`](docs/tests-strategy.md)

## Ressources

- Projet fil rouge B3 Dev — My Digital School Bordeaux
- Auteur : Baescu Eduard
