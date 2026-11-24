// All site content lives here. The UI is rendered from this file,
// so adding a destination means adding one object to `destinations`.
// This module has no DOM code, so it can be imported by the tests in Node.

export const TAGS = ['History', 'Beaches', 'Nature', 'Culture', 'Mountains'];

// Photos come from two places:
// - Wikimedia Commons (`file`). `license: null` means "see the file page".
// - The site's own /images folder (`local` + the widths saved there).
export const photos = {
    citadelleAerial: {
        file: 'Citadelle_Laferrière_Aerial_View.jpg',
        caption: 'Citadelle Laferrière from the air',
        author: 'United States Army',
        license: 'Public domain'
    },
    citadelleWall: {
        file: 'Citadelle_Laferrière_back_wall.jpg',
        caption: 'The back wall of the Citadelle',
        author: 'Rémi Kaupp',
        license: 'CC BY-SA 3.0'
    },
    sansSouci: {
        file: 'Sans-Souci_Palace,_National_History_Park,_Haiti.jpg',
        caption: 'Sans-Souci Palace, Milot',
        author: null,
        license: null
    },
    labadee: {
        file: 'Labadee,_Haiti_II.jpg',
        caption: 'The bay at Labadee',
        author: null,
        license: null
    },
    capHaitien: {
        file: 'Cross_above_Cap-Haitien.jpg',
        caption: 'Cap-Haïtien seen from the hills above the city',
        author: 'Rémi Kaupp',
        license: 'CC BY-SA 3.0'
    },
    bassinBleu: {
        file: 'Bassin_Bleu,_Haiti.jpg',
        caption: 'Bassin Bleu',
        author: null,
        license: null
    },
    landscape: {
        file: 'View_of_Haitian_Landscape_hispaniola.jpg',
        caption: 'Hills near Les Cayes',
        author: 'Michelle Walz Eriksson',
        license: 'CC BY 2.0'
    },
    portAuPrinceBay: {
        file: 'Port_au_prince-haiti.JPG',
        caption: 'The bay of Port-au-Prince',
        author: 'Ketounette',
        license: 'CC BY-SA 3.0'
    },
    portAuPrinceAerial: {
        file: 'Port-au-Prince_Haiti_2008.JPG',
        caption: 'Port-au-Prince from the air, 2008',
        author: 'U.S. Government',
        license: 'Public domain'
    },
    kenscoff: {
        file: 'Amid_rows_of_cabbage,_Haiti.jpg',
        caption: 'Farm terraces near Kenscoff',
        author: null,
        license: null
    },
    labadeeAmiga: {
        local: 'labadee-amiga', widths: [480, 960, 1440],
        caption: 'Amiga Island, off the coast near Labadee',
        author: null, license: null
    },
    jacmelStreet: {
        local: 'jacmel-street', widths: [480, 960, 1600],
        caption: 'A street in Jacmel',
        author: null, license: null
    },
    gonaveCove: {
        local: 'gonave-cove', widths: [480, 594],
        caption: 'A cove on La Gonâve',
        author: null, license: null
    },
    portSalutCoast: {
        local: 'port-salut-coast', widths: [480, 960, 1170],
        caption: 'The coast near Port-Salut',
        author: null, license: null
    },
    artiboniteRiver: {
        local: 'artibonite-river', widths: [480, 948],
        caption: 'The Artibonite River near Petite-Rivière',
        author: null, license: null
    }
};

export const destinations = [
    {
        id: 'citadelle',
        name: 'Citadelle Laferrière',
        region: 'North',
        coords: { lat: 19.5737, lng: -72.2438 },
        tags: ['History', 'Mountains'],
        summary: 'A mountaintop fortress built after independence, and the symbol of a free nation.',
        title: 'The largest fortress in the Americas',
        body: [
            'Perched on Bonnet à l\'Evêque mountain above Milot, the Citadelle was commissioned by Henri Christophe and built between 1805 and 1820 to defend the young nation against a French return.',
            'Together with Sans-Souci Palace and the Ramiers site, it forms the National History Park, a UNESCO World Heritage Site since 1982.'
        ],
        highlights: [
            'About 900 meters above sea level',
            'Hundreds of cannons still on site',
            'Views across the northern plain to the sea',
            'Pairs naturally with Sans-Souci Palace'
        ],
        facts: {
            time: 'Half a day to a full day',
            bestFor: 'History, views, a good climb',
            gettingThere: 'From Milot, a steep walk or a ride on horseback up the mountain road.'
        },
        days: 1,
        image: 'citadelleAerial',
        gallery: ['citadelleAerial', 'citadelleWall']
    },
    {
        id: 'sans-souci',
        name: 'Sans-Souci Palace',
        region: 'North',
        coords: { lat: 19.6047, lng: -72.2186 },
        tags: ['History', 'Culture'],
        summary: 'The ruined royal palace of Henri Christophe at the foot of the Citadelle road.',
        title: 'The palace of Haiti\'s only king',
        body: [
            'Built between 1810 and 1813, Sans-Souci was the main residence of Henri Christophe, who ruled the north of Haiti as King Henry I.',
            'Its grand staircases and arches still stand in Milot, about five kilometers from the Citadelle, and it is part of the same World Heritage Site.'
        ],
        highlights: [
            'Royal residence of King Henry I',
            'Part of the National History Park',
            'The starting point for the Citadelle',
            'Easy to combine in one day'
        ],
        facts: {
            time: 'One to two hours',
            bestFor: 'History, architecture, photography',
            gettingThere: 'In the town of Milot, a short drive south of Cap-Haïtien.'
        },
        days: 0.5,
        image: 'sansSouci',
        gallery: ['sansSouci']
    },
    {
        id: 'cap-haitien',
        name: 'Cap-Haïtien',
        region: 'North',
        coords: { lat: 19.7578, lng: -72.2042 },
        tags: ['Culture', 'History', 'Beaches'],
        summary: 'Haiti\'s second city and gateway to the north, nicknamed the "Paris of the Antilles".',
        title: 'The historic capital of the north',
        body: [
            'Le Cap was once the capital of the French colony of Saint-Domingue. Its colonial streets, waterfront and markets make it the natural base for exploring the north.',
            'The Citadelle, Sans-Souci Palace and the beaches of the north coast are all within reach for day trips.'
        ],
        highlights: [
            'Colonial architecture in the old town',
            'Base for the Citadelle and Sans-Souci',
            'Lively markets and northern cooking',
            'Beaches along the coast to the west'
        ],
        facts: {
            time: 'Two days or more',
            bestFor: 'A base for the north, food, walking',
            gettingThere: 'Served by Cap-Haïtien International Airport.'
        },
        days: 2,
        image: 'capHaitien',
        gallery: ['capHaitien']
    },
    {
        id: 'labadee',
        name: 'Labadee',
        region: 'North',
        coords: { lat: 19.7814, lng: -72.2464 },
        tags: ['Beaches', 'Nature'],
        summary: 'A private resort peninsula on the north coast with calm bays and clear water.',
        title: 'A quiet peninsula on the north coast',
        body: [
            'Labadee is a private resort near Cap-Haïtien leased to Royal Caribbean, and it is mainly visited by the line\'s cruise passengers.',
            'It offers beaches, water sports and a long zip line over the water.'
        ],
        highlights: [
            'White-sand beaches and calm bays',
            'Zip line over the water',
            'Artisan market with Haitian crafts',
            'Snorkeling and water sports'
        ],
        facts: {
            time: 'One day',
            bestFor: 'Beach time, water sports',
            gettingThere: 'Mainly by cruise ship; access from land is limited.'
        },
        days: 1,
        image: 'labadeeAmiga',
        gallery: ['labadeeAmiga', 'labadee']
    },
    {
        id: 'port-au-prince',
        name: 'Pétion-Ville & Kenscoff',
        region: 'West',
        coords: { lat: 18.5125, lng: -72.2853 },
        tags: ['Mountains', 'Culture'],
        summary: 'The hills above Port-au-Prince, with Fort Jacques and the cool air of Kenscoff.',
        title: 'The hills above the capital',
        body: [
            'Pétion-Ville sits in the hills southeast of Port-au-Prince and leads up to Kenscoff, known for its cooler climate and farm terraces.',
            'Nearby Fort Jacques, built after independence and named for Jean-Jacques Dessalines, looks out over the bay.'
        ],
        highlights: [
            'Fort Jacques and Fort Alexandre',
            'Cool mountain climate in Kenscoff',
            'Restaurants, galleries and nightlife',
            'Views over the bay of Port-au-Prince'
        ],
        facts: {
            time: 'One day',
            bestFor: 'Art, food, cooler weather',
            gettingThere: 'Near Toussaint Louverture International Airport in Port-au-Prince.'
        },
        days: 1,
        image: 'portAuPrinceBay',
        gallery: ['portAuPrinceBay', 'kenscoff', 'portAuPrinceAerial']
    },
    {
        id: 'jacmel',
        name: 'Jacmel',
        region: 'South-East',
        coords: { lat: 18.2353, lng: -72.5375 },
        tags: ['Culture', 'Beaches', 'History'],
        summary: 'A seaside town of artists, colonial-era buildings and a famous carnival.',
        title: 'The cultural capital of Haiti',
        body: [
            'Jacmel sits on Jacmel Bay on the south coast. Known as a city of artists, it has a historic district of colonial-era buildings, galleries and workshops where artisans make papier-mâché crafts.',
            'A mosaic-tiled boardwalk runs along the waterfront, and beaches line the coast to the east.'
        ],
        highlights: [
            'Historic district and waterfront boardwalk',
            'Galleries and artisan workshops',
            'A carnival that draws visitors from across the country',
            'About 12 km from Bassin Bleu'
        ],
        facts: {
            time: 'Two days',
            bestFor: 'Art, architecture, the beach',
            gettingThere: 'By road over the mountains from Port-au-Prince.'
        },
        days: 2,
        image: 'jacmelStreet',
        gallery: ['jacmelStreet']
    },
    {
        id: 'bassin-bleu',
        name: 'Bassin Bleu',
        region: 'South-East',
        coords: { lat: 18.2862, lng: -72.6136 },
        tags: ['Nature'],
        summary: 'A chain of deep blue pools and waterfalls in the hills near Jacmel.',
        title: 'Haiti\'s natural blue oasis',
        body: [
            'Bassin Bleu is a series of pools linked by waterfalls on the Petite Rivière de Jacmel, northwest of the town.',
            'The water takes its deep blue color from the limestone around it, and the pools are a favorite spot for a swim.'
        ],
        highlights: [
            'Pools linked by waterfalls',
            'Deep blue water over limestone',
            'Surrounded by tropical forest',
            'Best after a few dry days'
        ],
        facts: {
            time: 'Half a day',
            bestFor: 'Swimming, nature, photography',
            gettingThere: 'By road from Jacmel, then a short hike with a local guide.'
        },
        days: 0.5,
        image: 'bassinBleu',
        gallery: ['bassinBleu']
    },
    {
        id: 'artibonite',
        name: 'Petite-Rivière & Marchand-Dessalines',
        region: 'Artibonite',
        coords: { lat: 19.13, lng: -72.48 },
        tags: ['History', 'Nature'],
        summary: 'The Artibonite valley, where Dessalines held Crête-à-Pierrot and built Haiti\'s first capital.',
        title: 'Dessalines\' country',
        body: [
            'The Artibonite River, the longest on the island, winds through a wide green valley known as Haiti\'s rice bowl. Petite-Rivière-de-l\'Artibonite sits above it, home to the Crête-à-Pierrot fort, where Dessalines\' troops held out against a French siege in March 1802.',
            'A short drive north, Marchand-Dessalines was made the capital of the new nation in 1804. A ring of forts on the hills around the town, including Fort Décidé, Fort Madame and Fort Innocent, still looks out over the valley.'
        ],
        highlights: [
            'Crête-à-Pierrot fort and its 1802 battle',
            'The Palais aux 365 Portes in Petite-Rivière',
            'The forts around Marchand-Dessalines',
            'River views across the rice fields'
        ],
        facts: {
            time: 'One day',
            bestFor: 'History, landscapes, a road trip north',
            gettingThere: 'By road north from Port-au-Prince through Saint-Marc; allow a few hours each way.'
        },
        days: 1,
        image: 'artiboniteRiver',
        gallery: ['artiboniteRiver']
    },
    {
        id: 'la-gonave',
        name: 'La Gonâve',
        region: 'West',
        coords: { lat: 18.85, lng: -73.05 },
        tags: ['Beaches', 'Nature'],
        summary: 'Haiti\'s largest island, with quiet coves and fishing villages in the gulf west of the capital.',
        title: 'The island in the gulf',
        body: [
            'La Gonâve lies in the Gulf of Gonâve, west of Port-au-Prince. At about 60 kilometers long, it is the largest of Haiti\'s islands, and life there moves at the pace of its fishing villages.',
            'Its coves and clear water make it a calm escape from the mainland, best enjoyed slowly with a local host.'
        ],
        highlights: [
            'Quiet coves and clear water',
            'Fishing villages along the coast',
            'Boat crossing across the gulf',
            'Anse-à-Galets, the main town'
        ],
        facts: {
            time: 'Two days',
            bestFor: 'Slow travel, the sea, getting off the beaten path',
            gettingThere: 'By boat from the coast near Montrouis or Port-au-Prince to Anse-à-Galets.'
        },
        days: 2,
        image: 'gonaveCove',
        gallery: ['gonaveCove']
    },
    {
        id: 'port-salut',
        name: 'Port-Salut',
        region: 'South',
        coords: { lat: 18.08, lng: -73.92 },
        tags: ['Beaches', 'Nature'],
        summary: 'A relaxed beach town on the south coast, with long sandy beaches lined with palms.',
        title: 'The beaches of the south',
        body: [
            'Port-Salut sits on Haiti\'s southern coast, west of Les Cayes. It is known for long beaches of soft sand backed by coconut palms, and for fresh seafood served right on the shore.',
            'It makes an easy base for exploring the south, from Les Cayes to the green hills inland.'
        ],
        highlights: [
            'Long palm-lined beaches',
            'Fresh seafood by the water',
            'Calm, uncrowded coastline',
            'A short drive from Les Cayes'
        ],
        facts: {
            time: 'Two days',
            bestFor: 'Beach time, seafood, slowing down',
            gettingThere: 'By road from Les Cayes, west along the coast.'
        },
        days: 2,
        image: 'portSalutCoast',
        gallery: ['portSalutCoast', 'landscape']
    }
];

// A simplified outline of Haiti as [longitude, latitude] pairs, for the map.
export const haitiOutline = [
    [-73.42, 19.83], [-73.18, 19.93], [-72.80, 19.95], [-72.55, 19.86], [-72.28, 19.80],
    [-72.15, 19.77], [-71.95, 19.73], [-71.75, 19.70], [-71.72, 19.55], [-71.76, 19.35],
    [-71.70, 19.15], [-71.78, 18.95], [-71.90, 18.75], [-71.82, 18.55], [-71.73, 18.35],
    [-71.76, 18.05], [-72.05, 18.12], [-72.35, 18.20], [-72.55, 18.22], [-72.85, 18.15],
    [-73.20, 18.20], [-73.55, 18.10], [-73.80, 18.03], [-73.97, 18.05], [-74.10, 18.30], [-74.45, 18.37],
    [-74.42, 18.55], [-74.20, 18.66], [-73.85, 18.60], [-73.50, 18.52], [-73.10, 18.45],
    [-72.80, 18.47], [-72.55, 18.53], [-72.35, 18.58], [-72.45, 18.85], [-72.75, 19.05],
    [-72.70, 19.20], [-72.75, 19.42], [-72.70, 19.47], [-72.95, 19.62], [-73.25, 19.65],
    [-73.45, 19.70]
];

export const islands = {
    gonave: [[-73.38, 18.82], [-73.10, 18.95], [-72.80, 18.92], [-72.70, 18.80], [-73.00, 18.72], [-73.30, 18.74]],
    tortuga: [[-72.95, 20.06], [-72.75, 20.10], [-72.60, 20.05], [-72.80, 20.00]]
};

// The western edge of the Dominican Republic, drawn in grey so Haiti's shape reads at a glance.
export const dominicanEdge = [
    [-71.75, 19.70], [-71.40, 19.86], [-71.05, 19.86], [-71.05, 17.95], [-71.40, 17.80],
    [-71.76, 18.05], [-71.73, 18.35], [-71.82, 18.55], [-71.90, 18.75], [-71.78, 18.95],
    [-71.70, 19.15], [-71.76, 19.35], [-71.72, 19.55]
];

export const cities = [
    { name: 'Port-au-Prince', coords: { lat: 18.5944, lng: -72.3074 }, capital: true }
];

export const commonsUrl = (file, width = 1280) =>
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export const localUrl = (name, width) => `/images/${name}-${width}.jpg`;

export const commonsPage = file =>
    `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
