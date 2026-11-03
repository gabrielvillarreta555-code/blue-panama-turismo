import coiba from '../assets/photos/coiba.jpg';
import panama from '../assets/photos/panama.jpg';
import boquete from '../assets/photos/boquete.jpg';
import portobelo from '../assets/photos/portobelo.jpg';
import valle from '../assets/photos/valle.jpg';
export const photos = {
 coiba: { src: coiba, alt: 'Playa de la isla Coiba junto al bosque y el océano Pacífico', author: 'dronepicr', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Insel_Coiba_Strand_(26217644893).jpg', date: '2016-03-25' },
 panama: { src: panama, alt: 'Edificios de Ciudad de Panamá frente a la bahía', author: 'Marissa Strniste', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Panama_City_Skyline.jpg', date: '2012-03-03' },
 boquete: { src: boquete, alt: 'Vista de Boquete entre las montañas de Chiriquí', author: 'Ayaita', license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Mirador_Boquete.jpg', date: 'fecha de toma sin confirmar' },
 portobelo: { src: portobelo, alt: 'Ruinas de las fortificaciones junto a la bahía de Portobelo', author: 'Tedder', license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Portobelo_Ruins_and_bay.jpg', date: '2009-02' },
 valle: { src: valle, alt: 'Relieve del cráter de El Valle de Antón', author: 'Lee Siebert / Smithsonian Institution', license: 'Dominio público', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', source: 'https://commons.wikimedia.org/wiki/File:El_valle.jpg', date: '1998' },
} as const;
export type PhotoId = keyof typeof photos;
