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
  registerRequest: RegisterRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: Role.PARTNER // Utilisez l'enum directement
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.register(this.registerRequest).subscribe({
      next: () => this.router.navigate(['/login/partner']),
      error: (err) => console.error('Registration failed:', err)
    });
  }
}