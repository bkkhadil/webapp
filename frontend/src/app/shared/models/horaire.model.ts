// models/horaire.model.ts
export class Horaire {
  id_horaire: number;
  id_co_workspace: number; // Référence à CoWorkspace
  jour: string; // Ex: "Lundi"
  heure_ouverture: string; // Format HH:mm
  heure_fermeture: string; // Format HH:mm

  constructor(
      id_horaire: number,
      id_co_workspace: number,
      jour: string,
      heure_ouverture: string,
      heure_fermeture: string
  ) {
      this.id_horaire = id_horaire;
      this.id_co_workspace = id_co_workspace;
      this.jour = jour;
      this.heure_ouverture = heure_ouverture;
      this.heure_fermeture = heure_fermeture;
  }
}
