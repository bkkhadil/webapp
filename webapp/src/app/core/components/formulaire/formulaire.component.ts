import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Espace } from '../../../shared/models/espace.model';
import { CoworkspaceService } from '../../../services/co-workspace.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
  standalone:false,
  providers: [DatePipe]
})
export class FormulaireComponent implements OnInit {
  reservationForm!: FormGroup;
  espaceId!: number;
  total: number = 0;
  espace!: Espace;
  today: Date = new Date();
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private coworkspaceService: CoworkspaceService,
    private reservationService: ReservationService,
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.today.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.initializeForm();
    this.getEspaceId();
    this.loadEspaceDetails();
  }

  private initializeForm(): void {
    this.reservationForm = this.fb.group({
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]],
      nbrePlaces: ['', [Validators.required, Validators.min(1)]]
    }, { validators: this.dateValidator.bind(this) });

    // Écoute les changements pour calculer le total
    this.reservationForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }
  private dateValidator(group: FormGroup): ValidationErrors | null {
    const start = group.get('dateStart')?.value;
    const end = group.get('dateEnd')?.value;
    
    // Réinitialisation sécurisée
    group.get('dateStart')?.setErrors(null, { emitEvent: false });
    group.get('dateEnd')?.setErrors(null, { emitEvent: false });
  
    if (!start || !end) return null;
  
    const errors: ValidationErrors = {};
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Normalisation des dates
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
  
    if (startDate < this.today) {
      errors['dateError'] = "La date de début est invalide";
      group.get('dateStart')?.setErrors({ pastDate: true }, { emitEvent: false });
    }
  
    if (endDate < startDate) {
      errors['dateError'] = "La date de fin est antérieure au début";
      group.get('dateEnd')?.setErrors({ invalidEndDate: true }, { emitEvent: false });
    }
  
    return Object.keys(errors).length ? errors : null;
  }

  private calculateTotal(): void {
    if (!this.espace) return;

    const { dateStart, dateEnd, nbrePlaces } = this.reservationForm.value;
    const places = Number(nbrePlaces) || 0;

    if (dateStart && dateEnd && places >= 1) {
      const start = new Date(dateStart);
      const end = new Date(dateEnd);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      const diffTime = Math.max(0, end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24))+1 || 1;
      
      this.total = diffDays * this.espace.prix_par_mois * places;
    } else {
      this.total = 0;
    }
  }

  calculateDuration(): number {
    const { dateStart, dateEnd } = this.reservationForm.value;
    if (!dateStart || !dateEnd) return 0;

    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const diffTime = Math.max(0, end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 3600 * 24)) || 1;
  }

  private getEspaceId(): void {
    const idParam = this.route.snapshot.params['espaceId'];
    this.espaceId = Number(idParam);
  }

// formulaire.component.ts

private loadEspaceDetails(): void {
  this.coworkspaceService.getEspaceById(this.espaceId.toString()).subscribe({
    next: (espace) => {
      this.espace = espace;
      
      // Ajout du validateur max après récupération de la capacité
      this.reservationForm.get('nbrePlaces')?.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(this.espace.capacite) // Nouveau validateur
      ]);
      this.reservationForm.get('nbrePlaces')?.updateValueAndValidity();
      
      this.calculateTotal();
    },
    error: (err) => console.error('Erreur:', err)
  });
}

  onSubmit(): void {
    console.log('Submitting...', this.reservationForm.value);
    
    if (this.reservationForm.valid && !this.isSubmitting) {
      console.log('Form is valid');
      
      this.isSubmitting = true;
  
      const formattedStart = this.datePipe.transform(this.reservationForm.value.dateStart, 'yyyy-MM-dd');
      const formattedEnd = this.datePipe.transform(this.reservationForm.value.dateEnd, 'yyyy-MM-dd');
  
      console.log('Formatted dates:', { formattedStart, formattedEnd });
  
      const reservationData = {
        dateStart: formattedStart,
        dateEnd: formattedEnd,
        nbrePlaces: this.reservationForm.value.nbrePlaces,
        espaceId: this.espaceId,
        
      };
  
      console.log('Sending data:', reservationData);
  
      this.reservationService.createReservation(reservationData).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/user/historique']);
        },
        error: (err) => {
          console.error('Full error:', err);
          this.isSubmitting = false;
          const errorMessage = err.error?.message 
            || err.error?.error?.message 
            || err.message 
            || 'Erreur serveur';
          alert(`Erreur: ${errorMessage}`);
        },
        complete: () => {
          console.log('Request completed');
          this.isSubmitting = false;
        }
      });
    } else {
      console.warn('Form invalid', this.reservationForm.errors);
      this.reservationForm.markAllAsTouched();
    }
  }
    }
  
  