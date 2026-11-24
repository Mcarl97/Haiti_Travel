# Haiti Travel

A travel guide to seven places in Haiti, with an interactive map, search and filters, and a trip planner that saves your route and shares it as a link. Built with plain HTML, CSS and JavaScript (ES modules): no framework and no build step.

**Live site:** https://haiti-travel-carl.netlify.app

![Tests](https://github.com/Mcarl97/Haiti_Travel/actions/workflows/test.yml/badge.svg)

## Features

- **Interactive SVG map** drawn from latitude/longitude data. Map pins and cards are linked: hover one and the other highlights.
- **Search and theme filters** (History, Beaches, Nature, Culture, Mountains), accent-insensitive, with the state kept in the URL.
- **Trip planner.** Add places, reorder them, and see days and distances. "Shortest order" sorts stops with a nearest-neighbour route. The trip is saved in `localStorage`, synced across tabs, and shareable as `/trip?stops=…`.
- **"Nearby" suggestions** on every destination, computed with the haversine formula.
- **Clean URLs** (`/destinations/jacmel`) with a small History API router, plus a 404 page.
- **Photo lightbox** using the native `<dialog>` element, with keyboard controls.
- **Accessible:** skip link, focus moved to the page heading on navigation, `aria-pressed` toggles, live result counts, visible focus styles, reduced-motion support.
- **Fast and resilient:** responsive `srcset` images, lazy loading, an inline SVG icon sprite instead of an icon font, and a drawn illustration if a photo can't load.
- **Secure defaults:** strict Content Security Policy and security headers via Netlify `_headers`.
- **Tested:** unit tests for the data and the geography helpers run on every push with GitHub Actions.

## Project structure

```
├── index.html          App shell, icon sprite, lightbox
├── css/styles.css      All styles
├── js/
│   ├── app.js          Router, views, map, lightbox, events
│   ├── data.js         Destinations, photos and map outline (no DOM)
│   ├── geo.js          Haversine distance, nearest places, route ordering, map projection (no DOM)
│   └── trip.js         Trip state: localStorage, cross-tab sync, share links
├── tests/              node:test unit tests
├── _redirects          Netlify: serve index.html for app routes
└── _headers            Netlify: CSP and security headers
```

`data.js` and `geo.js` have no DOM code, so the same modules run in the browser and in the Node tests.

## Run it locally

```bash
npx serve -s .      # -s serves index.html for app routes like /trip
```

Then open http://localhost:3000.

## Tests

```bash
npm test            # runs node --test (Node 20+), no dependencies to install
```

## Deploy

Connected to Netlify: every push to `main` deploys automatically. There is no build command.

## Photo credits

Photos come from [Wikimedia Commons](https://commons.wikimedia.org) and keep their original licenses. The full list with authors and licenses is on the site's [Photo credits](https://haiti-travel-carl.netlify.app/credits) page and in `js/data.js`. Jacmel is shown with an original illustration until a free photo is added.

## License

Code is released under the [MIT License](LICENSE). Photos are not covered by this license.

## Author

Built by [Carl Mesidor](https://carlmesidor.com).
