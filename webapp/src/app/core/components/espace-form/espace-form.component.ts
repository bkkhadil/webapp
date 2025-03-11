import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoworkspaceService } from '../../../services/co-workspace.service';
import { Espace } from '../../../shared/models/espace.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espace-form',
  templateUrl: './espace-form.component.html',
  styleUrls: ['./espace-form.component.css'],
  standalone: false,
})

export class EspaceFormComponent implements OnInit {
  espaceForm: FormGroup;
  spaceTypes = ['Bureau privé', 'Espace ouvert', 'Salle de réunion', 'Espace détente'];
  currentCoworkspaceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private coworkspaceService: CoworkspaceService,
    private router: Router
  ) {
    this.espaceForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      nbretype: ['', [Validators.required, Validators.min(1)]],
      capacite: ['', [Validators.required, Validators.min(1)]],
      prix_par_mois: ['', [Validators.required, Validators.min(0)]],
      imageData: [''], // Contrôle pour l'image en base64
    });
  }

  ngOnInit(): void {
    const coworkspaceId = this.coworkspaceService.getCurrentCoworkspaceId();
    if (coworkspaceId) {
      this.currentCoworkspaceId = Number(coworkspaceId); // Convertir en nombre
    } else {
      alert('Aucun coworking space sélectionné. Veuillez créer un coworking space d\'abord.');
      this.router.navigate(['/partner/coworkspace']);
    }
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.espaceForm.get('imageData')?.setValue(file); // Stocker le fichier directement
    }
  }
  onSubmit(): void {
    if (this.espaceForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
  
    const formValue = this.espaceForm.value;
    const formData = new FormData();
  
    // Ajouter les champs du formulaire
    formData.append('type', formValue.type);
    formData.append('description', formValue.description);
    formData.append('nbretype', formValue.nbretype.toString());
    formData.append('capacite', formValue.capacite.toString());
    formData.append('prix_par_mois', formValue.prix_par_mois.toString());
    formData.append('coWorkspace', JSON.stringify({ idCoWorkspace: this.currentCoworkspaceId }));
  
    // Ajouter l'image si elle existe
    const imageFile = this.espaceForm.get('imageData')?.value;
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name); // Ajouter le fichier avec un nom
    }
  
    // Log pour vérifier le contenu de FormData
    console.log('FormData:', formData);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    // Envoyer les données au backend
    this.coworkspaceService.createEspace(formData).subscribe(
      (response) => {
        console.log('Espace créé avec succès:', response);
        alert('Espace créé avec succès !');
        this.router.navigate(['/partner/crud']);
      },
      (error) => {
        console.error('Erreur lors de la création de l\'espace:', error);
        alert('Erreur lors de la création de l\'espace. Veuillez réessayer.');
      }
    );
  } 
}