// Content for the site. Edit this file to add or change destinations.
// Photos come from Wikimedia Commons; credits are in README.md.

const commons = (file, width = 1600) =>
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export const photos = {
    landscape: 'View_of_Haitian_Landscape_hispaniola.jpg',
    citadelleAerial: 'Citadelle_Laferrière_Aerial_View.jpg',
    citadelleWall: 'Citadelle_Laferrière_back_wall.jpg',
    labadee: 'Labadee,_Haiti_II.jpg',
    capHaitien: 'Cross_above_Cap-Haitien.jpg',
    bassinBleu: 'Bassin_Bleu,_Haiti.jpg',
    kenscoff: 'Amid_rows_of_cabbage,_Haiti.jpg',
    portAuPrinceBay: 'Port_au_prince-haiti.JPG',
    portAuPrinceAerial: 'Port-au-Prince_Haiti_2008.JPG'
};

export const photoUrl = commons;

export const heroImages = [
    commons(photos.landscape, 2000),
    commons(photos.citadelleAerial, 2000),
    commons(photos.bassinBleu, 2000),
    commons(photos.portAuPrinceBay, 2000)
];

// image: null shows a styled placeholder until a real photo is added.
export const destinations = [
    {
        id: 'citadelle',
        name: 'Citadelle Laferrière',
        description: 'A massive mountaintop fortress and UNESCO World Heritage Site.',
        image: commons(photos.citadelleAerial),
        details: {
            title: 'The Largest Fortress in the Americas',
            description: 'Perched on Bonnet à l\'Evêque mountain near Milot, the Citadelle Laferrière was commissioned by Henri Christophe after independence and built between 1805 and 1820 to defend the new nation against a French return. Together with the nearby Sans-Souci Palace, it is a UNESCO World Heritage Site.',
            features: [
                'Commissioned by Henri Christophe',
                'About 900 meters above sea level',
                'Hundreds of cannons still on site',
                'Panoramic views over northern Haiti',
                'Short drive from Sans-Souci Palace in Milot'
            ],
            gallery: [commons(photos.citadelleAerial, 800), commons(photos.citadelleWall, 800)]
        }
    },
    {
        id: 'labadee',
        name: 'Labadee',
        description: 'A private resort peninsula with beaches and clear water on the north coast.',
        image: commons(photos.labadee),
        details: {
            title: 'Tropical Escape on the Northern Coast',
            description: 'Labadee is a private resort on Haiti\'s northern coast near Cap-Haïtien, leased to Royal Caribbean for its cruise passengers. It offers beaches, water sports and one of the longest zip lines over water in the world.',
            features: [
                'Private resort leased by Royal Caribbean',
                'White-sand beaches and calm bays',
                'Zip line over the water',
                'Artisan market with Haitian crafts',
                'Water sports and snorkeling'
            ],
            gallery: [commons(photos.labadee, 800)]
        }
    },
    {
        id: 'jacmel',
        name: 'Jacmel',
        description: 'A historic coastal town known for its carnival, crafts and French colonial architecture.',
        image: null,
        details: {
            title: 'The Cultural Capital of Haiti',
            description: 'Jacmel sits on Jacmel Bay on the south coast. Known as a city of artists, it has well-preserved colonial-era buildings, galleries and workshops where artisans make papier-mâché crafts, and a carnival that draws visitors from across the country.',
            features: [
                'Famous annual carnival',
                'Colonial-era architecture in the historic district',
                'Galleries and artisan workshops',
                'Beaches along Jacmel Bay',
                'About 12 km from the Bassin Bleu pools'
            ],
            gallery: []
        }
    },
    {
        id: 'cap-haitien',
        name: 'Cap-Haïtien',
        description: 'Haiti\'s second largest city, nicknamed the "Paris of the Antilles".',
        image: commons(photos.capHaitien),
        details: {
            title: 'The Historic Capital of the North',
            description: 'Cap-Haïtien, often called Le Cap, was once the capital of the French colony of Saint-Domingue. Known for its colonial architecture and its waterfront, the city is the gateway to the Citadelle Laferrière, Sans-Souci Palace and the beaches of the north coast.',
            features: [
                'Historic colonial architecture',
                'Gateway to the Citadelle and Sans-Souci Palace',
                'Lively markets and northern cuisine',
                'Close to Labadee and Cormier beaches',
                'Views from Morne Jean above the city'
            ],
            gallery: [commons(photos.capHaitien, 800), commons(photos.citadelleWall, 800)]
        }
    },
    {
        id: 'bassin-bleu',
        name: 'Bassin Bleu',
        description: 'A series of natural blue pools and waterfalls in the hills near Jacmel.',
        image: commons(photos.bassinBleu),
        details: {
            title: 'Haiti\'s Natural Blue Oasis',
            description: 'Bassin Bleu is a chain of pools linked by waterfalls on the Petite Rivière de Jacmel, about 12 km northwest of Jacmel. The water gets its deep blue color from the limestone around it, and the pools are a favorite spot for swimming.',
            features: [
                'Pools linked by waterfalls',
                'Deep blue water over limestone',
                'Surrounded by tropical forest',
                'Swimming and rock jumping',
                'Best visited in the dry season'
            ],
            gallery: [commons(photos.bassinBleu, 800)]
        }
    },
    {
        id: 'port-au-prince',
        name: 'Pétion-Ville & Mountains',
        description: 'The hills above Port-au-Prince, with Fort Jacques and the cool air of Kenscoff.',
        image: commons(photos.portAuPrinceBay),
        details: {
            title: 'The Hills Above the Capital',
            description: 'Pétion-Ville sits in the hills southeast of Port-au-Prince and is the gateway to the mountains of Kenscoff, known for their cooler climate and farm terraces. Nearby Fort Jacques, built after independence and named for Jean-Jacques Dessalines, looks out over the bay.',
            features: [
                'Fort Jacques and Fort Alexandre',
                'Cool mountain climate in Kenscoff',
                'Restaurants, galleries and nightlife',
                'Farm terraces and hiking trails',
                'Views over the bay of Port-au-Prince'
            ],
            gallery: [commons(photos.portAuPrinceBay, 800), commons(photos.kenscoff, 800), commons(photos.portAuPrinceAerial, 800)]
        }
    }
];
