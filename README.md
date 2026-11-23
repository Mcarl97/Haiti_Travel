# Haiti Travel

A responsive travel guide to six destinations in Haiti, built with plain HTML, CSS and JavaScript (no framework, no build step).

**Live demo:** _add your Netlify link here_

## Features

- **Data-driven pages.** Every destination card, detail page, footer link and form option is rendered from one data file (`js/data.js`). Adding a destination means adding one object.
- **Hash-based routing.** Each destination has its own URL (`#destination/jacmel`), so pages can be shared and the browser back button works.
- **Responsive layout** from phone to desktop, with a mobile menu.
- **Accessible by default:** labelled form fields, keyboard focus styles, an Escape-to-close dialog that returns focus, `aria` attributes on the menu and modal, and reduced motion for users who ask for it.
- **Resilient images.** Photos lazy-load, and any photo that is missing or fails to load is replaced with a styled placeholder instead of a broken image.
- **Demo booking form** with client-side validation and an in-page confirmation. Nothing is sent or stored.

## Project structure

```
haiti-travel/
├── index.html      Page shell and static sections
├── css/
│   └── styles.css  All styles
└── js/
    ├── data.js     Destinations, photos and hero images
    └── app.js      Rendering, routing, navigation, modal, animations
```

## Run it locally

The scripts are ES modules, so open the site through a local server rather than double-clicking the file:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy

Drag the folder into [Netlify Drop](https://app.netlify.com/drop), or connect this repo to Netlify or GitHub Pages. There is no build step.

## Photo credits

Photos are loaded from [Wikimedia Commons](https://commons.wikimedia.org) and remain under their original licenses.

| Photo | Author | License |
|---|---|---|
| [Citadelle Laferrière Aerial View](https://commons.wikimedia.org/wiki/File:Citadelle_Laferri%C3%A8re_Aerial_View.jpg) | United States Army | Public domain |
| [Citadelle Laferrière back wall](https://commons.wikimedia.org/wiki/File:Citadelle_Laferri%C3%A8re_back_wall.jpg) | Rémi Kaupp | CC BY-SA 3.0 |
| [Cross above Cap-Haitien](https://commons.wikimedia.org/wiki/File:Cross_above_Cap-Haitien.jpg) | Rémi Kaupp | CC BY-SA 3.0 |
| [View of Haitian Landscape (Les Cayes)](https://commons.wikimedia.org/wiki/File:View_of_Haitian_Landscape_hispaniola.jpg) | Michelle Walz Eriksson | CC BY 2.0 |
| [Port-au-Prince bay from the Oloffson](https://commons.wikimedia.org/wiki/File:Port_au_prince-haiti.JPG) | Ketounette | CC BY-SA 3.0 |
| [Port-au-Prince aerial, 2008](https://commons.wikimedia.org/wiki/File:Port-au-Prince_Haiti_2008.JPG) | U.S. Government | Public domain |
| [Bassin Bleu, Haiti](https://commons.wikimedia.org/wiki/File:Bassin_Bleu,_Haiti.jpg) | See file page | See file page |
| [Labadee, Haiti II](https://commons.wikimedia.org/wiki/File:Labadee,_Haiti_II.jpg) | See file page | See file page |
| [Amid rows of cabbage (Kenscoff)](https://commons.wikimedia.org/wiki/File:Amid_rows_of_cabbage,_Haiti.jpg) | See file page | See file page |

The Jacmel page uses a placeholder until a photo is added.

## License

Code is released under the [MIT License](LICENSE). Photos are not covered by this license; see the credits above.

## Author

Built by [Carl Mesidor](https://carlmesidor.com).
