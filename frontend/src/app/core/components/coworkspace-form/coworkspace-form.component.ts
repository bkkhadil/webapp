import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoworkspaceService } from '../../../services/co-workspace.service';
import { CoWorkspace } from '../../../shared/models/co_workspace.model';
import { Router } from '@angular/router';
import { Espace } from '../../../shared/models/espace.model';
import { Equipment } from '../../../shared/models/equipment';

@Component({
  selector: 'app-coworkspace-form',
  templateUrl: './coworkspace-form.component.html',
  styleUrls: ['./coworkspace-form.component.css'],
  standalone: false,
})
export class CoworkspaceFormComponent implements OnInit {
  coworkspaceForm: FormGroup;
  equipmentOptions = [
    { name: 'Wi-Fi haut débit ', selected: false },
    { name: 'Prises électriques multiples ', selected: false },
    { name: 'Écran de projection ', selected: false },
    { name: 'Imprimante et scanner ', selected: false },
    { name: 'Vidéoconférences ', selected: false },
  ];

  constructor(
    private fb: FormBuilder,
    private coworkspaceService: CoworkspaceService,
    private router: Router
  ) {
    this.coworkspaceForm = this.fb.group({
      nom: ['', Validators.required],
      ville: ['', Validators.required],
      adresse: ['', Validators.required],
      date_creation: ['', Validators.required],
      description: ['', Validators.required],
      equipments: [[]],
    });
  }

  ngOnInit(): void {
    this.coworkspaceForm = this.fb.group({
      nom: ['', Validators.required],
      ville: ['', Validators.required],
      adresse: ['', Validators.required],
      date_creation: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required], // Ajouter le contrôle pour l'image
      equipments: [[]],
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.coworkspaceForm.get('image')?.setValue(file); // Mettre à jour le contrôle du formulaire avec le fichier
    }
  }

  initForm(): void {
    this.coworkspaceForm = this.fb.group({
      nom: ['', Validators.required],
      ville: ['', Validators.required],
      adresse: ['', Validators.required],
      date_creation: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required], // Ajouter cette ligne pour rendre l'image obligatoire
      equipments: [[]],
    });
  }onSubmit(): void {
    if (this.coworkspaceForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
  
    const formValue = this.coworkspaceForm.value;
  
    // Formater la date au format ISO
    const formattedDate = new Date(formValue.date_creation).toISOString();
  
    // Créer un FormData pour envoyer l'image
    const formData = new FormData();
    formData.append('nom', formValue.nom);
    formData.append('ville', formValue.ville);
    formData.append('adresse', formValue.adresse);
    formData.append('dateCreation', formattedDate);
    formData.append('description', formValue.description);
  
    // Ajouter l'image si elle existe
    const imageFile = this.coworkspaceForm.get('image')?.value;
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name); // Ajouter le fichier avec un nom
    } else {
      console.error('Aucune image sélectionnée.');
      alert('Veuillez sélectionner une image.');
      return;
    }
  
    // Convertir les noms d'équipements en objets Equipment
    const equipmentNames = this.equipmentOptions
      .filter(eq => eq.selected)
      .map(eq => new Equipment(eq.name)); // Crée des objets Equipment
  
    // Ajouter les équipements au FormData
    formData.append('equipmentNames', JSON.stringify(equipmentNames));
  
    console.log('Données envoyées au backend:', formData);
  
    this.coworkspaceService.createCoworkspace(formData).subscribe(
      (response) => {
        console.log('CoWorkspace créé avec succès:', response);
        alert('CoWorkspace créé avec succès !');
        if (response.idCoWorkspace !== undefined) {
          this.coworkspaceService.setCurrentCoworkspaceId(response.idCoWorkspace.toString()); // Convertir en string
        } else {
          console.error('ID du CoWorkspace non défini dans la réponse.');
        }
        this.router.navigate(['/partner/espace']);
      },
      (error) => {
        console.error('Erreur lors de la création du coworking space:', error);
        console.error('Détails de l\'erreur:', error.error); // Affiche le corps de la réponse d'erreur
        alert('Erreur lors de la création du coworking space. Veuillez réessayer.');
      }
    );
  }
}