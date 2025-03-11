import { CoWorkspace } from './co_workspace.model';
// equipment.model.ts
export class Equipment {
  idEquipment?: number; // Correspond à Long dans le backend
  nom: string; // Correspond à String dans le backend
  coWorkspaces?: CoWorkspace[]; // Optionnel, si vous avez besoin de cette relation

  constructor(nom: string) {
    this.nom = nom;
  }
}