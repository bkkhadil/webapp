export class Responsable {
  id_responsable: number;
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string; // À hacher avant stockage
  date_inscription: Date;
  photo: string;

  constructor(
      id_responsable: number,
      nom: string,
      prenom: string,
      email: string,
      mot_de_passe: string,
      date_inscription: Date,
      photo: string
  ) {
      this.id_responsable = id_responsable;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.mot_de_passe = mot_de_passe;
      this.date_inscription = date_inscription;
      this.photo = photo;
  }
}
