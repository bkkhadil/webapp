import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  standalone: false,
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  reservationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire réactif
    this.reservationForm = this.fb.group({
      dateStart: ['', Validators.required], // Champ obligatoire
      dateEnd: ['', Validators.required], // Champ obligatoire
      nbrePlaces: ['', [Validators.required, Validators.min(1)]] // Champ obligatoire et valeur minimale de 1
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.reservationForm.valid) {
      console.log('Formulaire soumis avec succès !', this.reservationForm.value);
      // Vous pouvez envoyer les données au serveur ici
    } else {
      console.log('Formulaire invalide !');
    }
  }
}