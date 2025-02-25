import { Espace } from '../models/espace.model';

export class CoWorkspace {
  id_co_workspace: string; // Changé en string
  id_responsable: number;
  nom: string;
  ville: string;
  adresse: string;
  date_creation: Date;
  description: string;
  equipments: string[];
  espaces: Espace[];

  constructor(
    id_co_workspace: string,
    id_responsable: number,
    nom: string,
    ville: string,
    adresse: string,
    date_creation: Date,
    description: string,
    equipments: string[] = [],
    espaces: Espace[] = []
  ) {
    this.id_co_workspace = id_co_workspace;
    this.id_responsable = id_responsable;
    this.nom = nom;
    this.ville = ville;
    this.adresse = adresse;
    this.date_creation = date_creation;
    this.description = description;
    this.equipments = equipments;
    this.espaces = espaces;
  }
}