  import { User } from '../../../models/user.model';
import { Espace } from '../models/espace.model';
  import { Equipment } from './equipment';

  export interface CoWorkspace {
    idCoWorkspace?: number;
    nom: string;
    ville: string;
    adresse: string;
    dateCreation: string; // Utiliser camelCase pour correspondre au backend
    description: string;
    image?: string;
    equipments: Equipment[]; // Liste des noms d'équipements
    espaces: Espace[]; 
    partner:User// Liste des espaces
  }


