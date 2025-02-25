export class Espace {
  id_espace: string; // Changé en string
  id_co_workspace: string; // Changé en string
  type: string;
  nbretype: number;
  capacite: number;
  prix_par_mois: number;
  images: string[];

  constructor(
    id_espace: string,
    id_co_workspace: string,
    type: string,
    nbretype: number,
    capacite: number,
    prix_par_mois: number,
    images: string[] = []
  ) {
    this.id_espace = id_espace;
    this.id_co_workspace = id_co_workspace;
    this.type = type;
    this.nbretype = nbretype;
    this.capacite = capacite;
    this.prix_par_mois = prix_par_mois;
    this.images = images;
  }
}