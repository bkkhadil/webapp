import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { CoworkspaceService } from '../../../services/co-workspace.service';
  import { Equipment } from '../../../shared/models/equipment';
import { CoWorkspace } from '../../../shared/models/co_workspace.model';
import { Espace } from '../../../shared/models/espace.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-update-coworkzone',
  standalone: false,
  templateUrl: './update-coworkzone.component.html',
  styleUrl: './update-coworkzone.component.css'
})
export class UpdateCoworkzoneComponent implements OnInit {
  currentCoworkspace?: CoWorkspace;
  coworkspaceForm: FormGroup; // Déclaration explicite
  equipmentOptions: { name: string; selected: boolean }[] = [];
  currentCoworkspaceId!: number;
  espaces: Espace[] = [];

  constructor(
     public authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coworkspaceService: CoworkspaceService
  ) {
    // Initialisation du formulaire
    this.coworkspaceForm = this.fb.group({
      nom: ['', Validators.required],
      ville: ['', Validators.required],
      adresse: ['', Validators.required],
      dateCreation: ['', Validators.required],
      description: ['', Validators.required],
      image: [null], 
      equipments: [[]]
      
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.coworkspaceForm.patchValue({ image: file });
      this.coworkspaceForm.get('image')?.updateValueAndValidity();
    }
  }
  ngOnInit(): void {
    this.loadEquipments();
    this.loadCoworkspaceData();
  }


  
  private loadEquipments(): void {
    this.coworkspaceService.getAllEquipments().subscribe((equipments: Equipment[]) => {
      this.equipmentOptions = equipments.map(eq => ({
        name: eq.nom,
        selected: false
      }));
    });
  }

  private loadCoworkspaceData(): void {
    this.currentCoworkspaceId = +this.route.snapshot.params['id'];
    
    this.coworkspaceService.getCoworkspaceById(this.currentCoworkspaceId.toString())
      .subscribe((data: CoWorkspace) => {
        this.coworkspaceForm.patchValue({
          ...data,
          dateCreation: this.formatDateForInput(data.dateCreation.toString())
        });
        
        this.equipmentOptions.forEach(eq => {
          eq.selected = data.equipments?.some(e => e.nom === eq.name) || false;
        });
        
        this.espaces = data.espaces || [];
      });
  }
  private formatDateForInput(dateString: string): string {
    // Handle potential parsing issues
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return ''; // Fallback or handle error
    }
    return date.toISOString().split('T')[0];
  }
  onSubmit(): void {
    const formData = new FormData();
    const formValue = this.coworkspaceForm.value;
  
    // Inclure l'ID existant et le partenaire
    const coWorkspaceData = {
      idCoWorkspace: this.currentCoworkspaceId, // Ajoutez l'ID existant
      nom: formValue.nom,
      ville: formValue.ville,
      adresse: formValue.adresse,
      dateCreation: formValue.dateCreation,
      description: formValue.description,
      equipments: this.equipmentOptions.filter(eq => eq.selected).map(eq => ({ nom: eq.name })),
      partner: this.currentCoworkspace?.partner // Conservez le partenaire existant
    };
  
    // Créer le Blob avec le bon Content-Type
    const coWorkspaceBlob = new Blob([JSON.stringify(coWorkspaceData)], {
      type: 'application/json'
    });
  
    formData.append('coWorkspace', coWorkspaceBlob, 'coWorkspace.json');
  
    // Ajouter l'image
    const imageFile = this.coworkspaceForm.get('image')?.value;
    if (imageFile instanceof File) {
      formData.append('image', imageFile, imageFile.name);
    }
  
    this.coworkspaceService.updateCoworkspace(
      this.currentCoworkspaceId.toString(),
      formData
    ).subscribe({
      next: () => this.router.navigate(['/partner/crud']),
      error: (err) => console.error('Erreur de mise à jour:', err)
    });
  }

  
  onDeleteEspace(espaceId: number): void {
    if (confirm('Supprimer cet espace définitivement ?')) {
      this.coworkspaceService.deleteEspace(espaceId.toString()).subscribe({
        next: () => {
          this.espaces = this.espaces.filter(e => e.idEspace !== espaceId); // <-- Utiliser idEspace
          this.coworkspaceService.getCoworkspaceById(this.currentCoworkspaceId.toString())
            .subscribe(data => this.espaces = data.espaces || []);
        },
        error: (err) => console.error('Erreur de suppression :', err)
      });
    }
  }

  onAddSpace(): void {
    if (this.currentCoworkspaceId) {
      // Passer l'ID au service ET dans la navigation
      this.coworkspaceService.setCurrentCoworkspaceId(this.currentCoworkspaceId.toString());
      this.router.navigate(['/partner/espace', this.currentCoworkspaceId]);
    } else {
      alert('Aucun coworking space sélectionné.');
    }
  }
}