    import { Injectable } from '@angular/core';
    import { Observable, of } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class SearchService {
      constructor() {}

      search(city: string, type: string, query: string): Observable<any[]> {
        const fakeResults = [
          {
            id: 1,
            nom: 'espace work',
            ville: 'Sousse',
            type: 'espacevert',
            localisation: 'Cité Nouvelle, Rue Moncef Bay',
            description: 'Un environnement stimulant avec Wi-Fi haut débit, écrans connectés, vidéoconférence, imprimantes professionnelles et bien plus encore. Profitez également d’une ambiance conviviale, d’un café en libre-service et d’espaces verts pour des pauses ressourçantes.',
            image: './assets/images/espace-b.png',
            images: [
              './assets/images/espace-h.png',
              './assets/images/espace-b.png',
              './assets/images/espace-b.png',
              './assets/images/espace-b.png',
              './assets/images/espace-b.png'
            ],
            espace_disponible: {
              'salle de réunion': {
                nbredesalledispo: 4,
                capacite: 8,
                prix: 150, image: './assets/images/espace-b.png',
              },
              'salle de formation': {
                nbredesalledispo: 4,
                capacite: 8,
                prixparjour: 150, 
                image: './assets/images/espace-b.png',
              },
              'bureau privé': {
                nbredesalledispo: 4,
                capacite: 8,
                prixparjour: 150,
                 image: './assets/images/espace-b.png',
              }
            },
            option: [
              'Wi-Fi haut débit',
              'Prises électriques multiples',
              'Écran de projection',
              'Télévision ou écran connecté',
              'Vidéoconférence',
              'Imprimante et scanner'
            ]
          },

          {
            id: 2,
            nom: 'Espace B',
            ville: 'Sousse',
            type: 'espacevert',
            localisation: 'Cité Nouvelle, Rue Moncef Bay',
            description: 'Un environnement stimulant avec Wi-Fi haut débit, écrans connectés, vidéoconférence, imprimantes professionnelles et bien plus encore. Profitez également d’une ambiance conviviale, d’un café en libre-service et d’espaces verts pour des pauses ressourçantes.',
            image: './assets/images/espace-b.png',
            images: [
              './assets/images/espace-b.png',
              './assets/images/espace-b.png',
              './assets/images/espace-b.png',
              './assets/images/espace-b.png',
              './assets/images/espace-b.png'
            ],
            espace_disponible: {
              'salle de réunion': {
                nbredesalledispo: 4,
                capacite: 8,
                prix: 150, 
                image: './assets/images/espace-b.png',
              },
              'salle de formation': {
                nbredesalledispo: 4,
                capacite: 8,
                prixparjour: 150, 
                image: './assets/images/espace-b.png',
              },
              'bureau privé': {
                nbredesalledispo: 4,
                capacite: 8,
                prixparjour: 150, 
                image: './assets/images/espace-b.png',
              }
            },
            option: [
              'Wi-Fi haut débit',
              'Prises électriques multiples',
              'Écran de projection',
              'Télévision ou écran connecté',
              'Vidéoconférence',
              'Imprimante et scanner'
            ]
          },
          
          {
            id: 3,
            nom: 'Espace k',
            ville: 'Sousse',
            type: 'espacevert',
            localisation: 'Cité Nouvelle, Rue Moncef Bay',
            description: 'Un environnement stimulant avec Wi-Fi haut débit, écrans connectés, vidéoconférence, imprimantes professionnelles et bien plus encore. Profitez également d’une ambiance conviviale, d’un café en libre-service et d’espaces verts pour des pauses ressourçantes.',
            image: './assets/images/espace-b.png',
            images: [
              './assets/images/espace-b.png',
              './assets/images/espace-b.png',
              './assets/images/espace-b.png',
              './assets/images/espace-b.png',
              './assets/images/espace-b.png'
            ],
            espace_disponible: {
              'salle de réunion': {
                nbredesalledispo: 4,
                capacite: 8,
                prixparjour: 150, 
                image: './assets/images/espace-b.png',
              },
              'salle de formation': {
                nbredesalledispo: 4,
                capacite: 8,
                prixparjour: 150, 
                image: './assets/images/espace-b.png',
              },
              'bureau privé': {
                nbredesalledispo: 4,
                capacite: 8,
                prixparjour: 150,
                image: './assets/images/espace-b.png',

              }
            },
            option: [
              'Wi-Fi haut débit',
              'Prises électriques multiples',
              'Écran de projection',
              'Télévision ou écran connecté',
              'Vidéoconférence',
              'Imprimante et scanner'
            ]
          },
          
        ];

        console.log("Filtres reçus :", { city, type, query });

        const filteredResults = fakeResults.filter(item => {
          const matchesCity = !city || item.ville.toLowerCase().trim() === city.toLowerCase().trim();
          const matchesType = !type || item.type.toLowerCase().trim() === type.toLowerCase().trim();
          const matchesQuery = !query || item.nom.toLowerCase().includes(query.toLowerCase().trim());

          return matchesCity && matchesType && matchesQuery;
        });

        console.log("Résultats après filtrage :", filteredResults);
        return of(filteredResults);
      }
      


      
    }
