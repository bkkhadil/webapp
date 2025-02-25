export class Utilisateur {
  id_utilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string; // À hacher avant stockage
  date_inscription: Date;
  cin: string;  
  statut: string; // actif, inactif, etc.
  photo: string;

  constructor(
      id_utilisateur: number,
      nom: string,
      prenom: string,
      email: string,
      mot_de_passe: string,
      date_inscription: Date,
      cin: string,
      statut: string,
      photo: string
  ) {
      this.id_utilisateur = id_utilisateur;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.mot_de_passe = mot_de_passe;
      this.date_inscription = date_inscription;
      this.cin = cin;
      this.statut = statut;
      this.photo = photo;
  }
}
