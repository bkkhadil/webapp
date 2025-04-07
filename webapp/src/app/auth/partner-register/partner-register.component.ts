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
// Variable temporaire pour le formatage
formattedTaxId: string = '';


onTaxIdInput(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.toUpperCase().replace(/[^A-Z0-9/]/g, '');
  
  // Nettoyage de la valeur brute (sans séparateurs)
  const rawValue = value.replace(/\//g, '').slice(0, 13);
  
  // Découpage des parties selon le format réglementaire
  const parts = [
    rawValue.slice(0, 7),  // 7 chiffres (numéro d'identification)
    rawValue.slice(7, 8),  // 1 lettre (clé de contrôle)
    rawValue.slice(8, 9),  // 1 lettre (situation TVA: A/B/P/F/N)
    rawValue.slice(9, 10), // 1 lettre (catégorie: M/C/P/N)
    rawValue.slice(10, 13) // 3 chiffres (numéro de série)
  ];

  // Formatage avec séparateurs
  this.formattedTaxId = parts.filter(p => p).join('/');
  
  // Mise à jour de la valeur brute pour le backend
  this.registerRequest.taxIdentificationNumber = rawValue;
  
  // Mise à jour de l'affichage
  input.value = this.formattedTaxId;
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