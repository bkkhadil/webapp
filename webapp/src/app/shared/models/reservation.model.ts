export class Reservation {
  id_reservation: number;
  id_utilisateur: number; // Référence à Utilisateur
  id_espace: number; // Référence à Espace
  date_debut: Date;
  date_fin: Date;
  statut: string; // Ex: "en attente", "confirmée", "annulée"

  constructor(
      id_reservation: number,
      id_utilisateur: number,
      id_espace: number,
      date_debut: Date,
      date_fin: Date,
      statut: string
  ) {
      this.id_reservation = id_reservation;
      this.id_utilisateur = id_utilisateur;
      this.id_espace = id_espace;
      this.date_debut = date_debut;
      this.date_fin = date_fin;
      this.statut = statut;
  }
}
