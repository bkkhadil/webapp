import { CoWorkspace } from "./co_workspace.model";

export interface Espace {
  idEspace?: number;
  type: string;
  nbretype: number;
  capacite: number;
  description: string;
  prix_par_mois: number;
  imageData: string; // Stocker l'image sous forme de chaîne base64
  coWorkspace: CoWorkspace;
  }