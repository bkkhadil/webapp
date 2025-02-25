import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoworkspaceService } from '../../../services/co-workspace.service';
import { CoWorkspace } from '../../../shared/models/co_workspace.model';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-coworkspace-form',
  templateUrl: './coworkspace-form.component.html',
  styleUrls: ['./coworkspace-form.component.css'],
  standalone: false,
  
})
export class CoworkspaceFormComponent implements OnInit {
  coworkspaceForm!: FormGroup; // ✅ Now TypeScript understands it will be initialized
 // <-- Formulaire réactif
  equipmentOptions = [
    { name: 'Wi-Fi haut débit 📶', selected: false },
    { name: 'Prises électriques multiples 🔌', selected: false },
    { name: 'Écran de projection 📽️', selected: false },
    { name: 'Imprimante et scanner 🖨️', selected: false },
    { name: 'Vidéoconférences 🎥', selected: false },
  ];

  constructor(
    private fb: FormBuilder,
    private coworkspaceService: CoworkspaceService,
    private router: Router
  ) {
    this.coworkspaceForm = this.fb.group({ // ✅ Initialize it directly
      nom: ['', Validators.required],
      ville: ['', Validators.required],
      adresse: ['', Validators.required],
      date_creation: ['', Validators.required],
      description: ['', Validators.required],
      equipments: [[]], 
    });
  }
  

  ngOnInit(): void {
    this.initForm();
    this.loadCurrentCoworkspace();
  }

  // Initialisation du formulaire réactif
  initForm(): void {
    this.coworkspaceForm = this.fb.group({
      nom: ['', Validators.required],
      ville: ['', Validators.required],
      adresse: ['', Validators.required],
      date_creation: ['', Validators.required],
      description: ['', Validators.required],
      equipments: [[]], // Équipements sélectionnés
    });
  }

  // Charger les données existantes (si applicable)
  loadCurrentCoworkspace(): void {
    try {
      const currentCoworkspace = this.coworkspaceService.getCurrentCoworkspace();
      this.coworkspaceForm.patchValue(currentCoworkspace);
      this.equipmentOptions.forEach((eq) => {
        eq.selected = currentCoworkspace.equipments.includes(eq.name);
      });
    } catch (error) {
      console.log('Aucun coworking space actuel. Création d\'un nouveau.');
    }
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.coworkspaceForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formValue = this.coworkspaceForm.value;
    const coworkspace: CoWorkspace = {
      id_co_workspace: uuidv4(),
      id_responsable: 1,
      nom: formValue.nom,
      ville: formValue.ville,
      adresse: formValue.adresse,
      date_creation: new Date(formValue.date_creation),
      description: formValue.description,
      equipments: this.getSelectedEquipments(),
      espaces: [], // À remplir via une autre logique
    };

    this.coworkspaceService.createCoworkspace(coworkspace).subscribe({
      next: (response) => {
        console.log('Coworkspace créé:', response);
        alert('Coworking space créé avec succès !');
        this.router.navigate(['/partner/crud']);
      },
      error: (error) => {
        console.error('Erreur lors de la création du coworking space:', error);
        alert('Erreur lors de la création du coworking space. Veuillez réessayer.');
      },
    });
  }

  // Récupérer les équipements sélectionnés
  getSelectedEquipments(): string[] {
    return this.equipmentOptions
      .filter((eq) => eq.selected)
      .map((eq) => eq.name);
  }

  // Ajouter un espace
  onAddSpace(): void {
    this.coworkspaceService.setCurrentCoworkspace(this.coworkspaceForm.value);
    this.router.navigate(['/partner/espace']);
  }
}