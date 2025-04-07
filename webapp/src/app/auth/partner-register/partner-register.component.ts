import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../../models/register-request.model';
import { Router } from '@angular/router';
import { Role } from '../../../models/role.model';
@Component({
  selector: 'app-partner-register',
  standalone: false,
  templateUrl: './partner-register.component.html',
  styleUrl: './partner-register.component.css'
})
export class PartnerRegisterComponent {
  errorMessage: string = ''; 
  registerRequest: RegisterRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: Role.PARTNER, // <-- S'assurer que le rôle est bien PARTNER
    companyName: '',
    taxIdentificationNumber: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  onTaxIdInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.registerRequest.taxIdentificationNumber = input.value.toUpperCase();
}
formatTaxId() {
  if (this.registerRequest.taxIdentificationNumber) {
    this.registerRequest.taxIdentificationNumber = this.registerRequest.taxIdentificationNumber
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '') // Supprimer les caractères non alphanumériques
      .slice(0, 13); // Limiter à 13 caractères
  }
}
onSubmit() {
  // Forcer le rôle PARTNER
  this.registerRequest.role = Role.PARTNER;
  
  this.authService.register(this.registerRequest).subscribe({
    next: () => this.router.navigate(['/login/partner']),
    error: (err) => {
      if (err.error?.fieldErrors) {
        this.errorMessage = err.error.fieldErrors
          .map((e: any) => `${e.field}: ${e.message}`)
          .join('\n');
      }
    }
  });
}
}