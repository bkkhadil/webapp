import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspaceService } from '../../../services/espace.service';
import { Espace } from '../../../shared/models/espace.model';
import { Router } from '@angular/router';
import { CoworkspaceService } from '../../../services/co-workspace.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-espace-form',
  templateUrl: './espace-form.component.html',
  styleUrls: ['./espace-form.component.css'],
  standalone: false,
})
export class EspaceFormComponent implements OnInit {
  espaceForm: FormGroup; // <-- Formulaire réactif
  spaceTypes = [
    'Salle de réunion',
    'Bureau privé',
    'Salle de formation',
    'Espace vert',
    'Bureau ouvert',
  ];

  constructor(
    private fb: FormBuilder, // <-- Injection de FormBuilder
    private espaceService: EspaceService,
    private router: Router,
    private coworkspaceService: CoworkspaceService
  ) {
    // Initialisation du formulaire dans le constructeur
    this.espaceForm = this.fb.group({
      type: ['', Validators.required],
      nbretype: [0, [Validators.required, Validators.min(1)]],
      capacite: [0, [Validators.required, Validators.min(1)]],
      prix_par_mois: [0, [Validators.required, Validators.min(1)]],
      images: [[]], // Images sélectionnées
    });
  }

  ngOnInit(): void {
    this.loadCurrentCoworkspace();
  }

  // Charger les données existantes (si applicable)
  loadCurrentCoworkspace(): void {
    const currentCoworkspace = this.coworkspaceService.getCurrentCoworkspace();
    if (!currentCoworkspace) {
      alert('Aucun coworking space sélectionné. Veuillez créer un coworking space d\'abord.');
      this.router.navigate(['/partner/coworkspace']);
      return;
    }
    this.espaceForm.patchValue({ id_co_workspace: currentCoworkspace.id_co_workspace });
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.espaceForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formValue = this.espaceForm.value;
    const espace: Espace = {
      id_espace: uuidv4(),
      id_co_workspace: formValue.id_co_workspace,
      type: formValue.type,
      nbretype: formValue.nbretype,
      capacite: formValue.capacite,
      prix_par_mois: formValue.prix_par_mois,
      images: formValue.images,
    };

    this.espaceService.createEspace(espace).subscribe(
      (response) => {
        console.log('Espace créé avec succès:', response);

        const currentCoworkspace = this.coworkspaceService.getCurrentCoworkspace();
        currentCoworkspace.espaces.push(response);

        alert('Espace créé avec succès !');
        this.router.navigate(['/partner/coworkspace']);
      },
      (error) => {
        console.error('Erreur lors de la création de l\'espace:', error);
        alert('Erreur lors de la création de l\'espace. Veuillez réessayer.');
      }
    );
  }

  // Gestion des fichiers d'images
  onFileChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.espaceForm.get('images')?.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}