import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoworkspaceService } from '../../../services/co-workspace.service';
import { Espace } from '../../../shared/models/espace.model';


@Component({
  selector: 'app-update-espace',
  standalone: false,
  templateUrl: './update-espace.component.html',
  styleUrl: './update-espace.component.css'
})
export class UpdateEspaceComponent {
  espaceForm: FormGroup;
  spaceTypes = ['Bureau privé', 'Espace ouvert', 'Salle de réunion', 'Espace détente'];
  coworkspaceId!: number;
  espaceId!: number;
  selectedFile?: File;
  currentImage?: string;
  validationError?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coworkspaceService: CoworkspaceService
  ) {
    this.espaceForm = this.fb.group({
      type: ['', [Validators.required]],
      nbretype: ['', [Validators.required, Validators.min(1)]],
      capacite: ['', [Validators.required, Validators.min(1)]],
      prix_par_mois: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      imageData: ['']
    });
  }

  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const coworkspaceId = params.get('coworkspaceId');
      const espaceId = params.get('espaceId');
  
      if (coworkspaceId && espaceId) {
        this.coworkspaceId = +coworkspaceId;
        this.espaceId = +espaceId;
  
        this.loadEspaceData();
      }
    });
  }
  
  loadEspaceData(): void {
    this.coworkspaceService.getEspaceById(this.espaceId.toString()).subscribe({
      next: (espace: Espace) => {
        this.currentImage = espace.imageData;
        this.espaceForm.patchValue({
          type: espace.type,
          nbretype: espace.nbretype,
          capacite: espace.capacite,
          prix_par_mois: espace.prix_par_mois,
          description: espace.description,
          imageData: espace.imageData
        });
        this.validationError = undefined;
      },
      error: (error) => {
        this.showValidationError('Erreur de chargement des données');
        console.error('Détails:', error);
      }
    });
  }
    
private showError(message: string): void {
  console.error('Erreur:', message);
  alert(message + '\nRedirection...');
  this.router.navigate(['/partner/crud']);
}

  private isValidId(id: string): boolean {
    return /^\d+$/.test(id);
  }

  private showValidationError(message: string): void {
    this.validationError = message;
    setTimeout(() => {
      this.router.navigate(['/partner/crud']);
    }, 3000);
  }

  

 















  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.espaceForm.patchValue({ imageData: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.espaceForm.invalid) {
      this.markFormGroupTouched(this.espaceForm);
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
  
    const formData = new FormData();
    const espaceData = {
      ...this.espaceForm.value,
      idEspace: this.espaceId,
      coWorkspace: { idCoWorkspace: this.coworkspaceId }
    };
  
    formData.append('espace', JSON.stringify(espaceData));
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    this.coworkspaceService.updateEspaceWithImage(this.espaceId.toString(), formData).subscribe({
      next: () => {
        alert('Espace mis à jour avec succès');
        this.router.navigate(['/partner/updatecoworkzone', this.coworkspaceId]);
      },
      error: (err) => {
        console.error("Erreur de mise à jour :", err);
        alert('Erreur lors de la mise à jour de l\'espace');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/partner/updatecoworkzone', this.coworkspaceId]);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}