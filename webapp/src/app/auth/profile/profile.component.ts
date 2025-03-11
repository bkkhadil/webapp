import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = true;
  userId!: number;
  errorMessage: string | null = null;
  successMessage: string | null = null;
 

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Formulaire simplifié sans email
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      currentPassword: [''],
      newPassword: ['']
    }, { validator: this.passwordValidator });
  }


  ngOnInit() {
    this.loadUserData();
  }
  private loadUserData() {
    this.authService.getCurrentUserDetails().subscribe({
      next: (user) => {
        this.userId = user.id;
        this.profileForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname
        });
        this.isLoading = false; // <-- Ajoutez cette ligne
      },
      error: () => {
        this.router.navigate(['/login']);
        this.isLoading = false; // Optionnel en cas d'erreur
      }
    });
  }
private passwordValidator(group: FormGroup) {
  const newPassword = group.get('newPassword')?.value;
  const currentPassword = group.get('currentPassword')?.value;
  
  // Si nouveau mot de passe non vide
  if (newPassword) {
    if (!currentPassword) {
      return { passwordMismatch: 'Le mot de passe actuel est requis' };
    }
    if (newPassword.length < 6) {
      return { passwordMismatch: 'Le nouveau mot de passe doit faire 6 caractères minimum' };
    }
  }
  return null;
}

  onSubmit() {
    const formData = this.profileForm.value;
  
    // Ajouter une validation
    if (!this.userId) {
      this.errorMessage = 'ID utilisateur non trouvé';
      return;
    }
    if (this.profileForm.invalid || this.isLoading) return;

    this.isLoading = true;
   

    this.authService.updateUser(this.userId, {
      firstname: formData.firstname,
      lastname: formData.lastname,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    }).subscribe({
      next: (updatedUser) => {
        this.handleSuccess(updatedUser);
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  private handleSuccess(updatedUser: any) {
    this.successMessage = 'Profil mis à jour avec succès!';
    this.authService.updateLocalUser(updatedUser);
    this.profileForm.markAsPristine();
    this.isLoading = false;
    
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  private handleError(err: any) {
    console.error('Erreur de mise à jour:', err);
    this.errorMessage = err.error?.message || 'Erreur technique - Veuillez réessayer';
    this.isLoading = false;
    
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000);
  }
}