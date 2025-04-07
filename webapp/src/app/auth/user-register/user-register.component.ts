import { Component } from '@angular/core';


import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../../models/register-request.model';
import { Router } from '@angular/router'
import { Role } from '../../../models/role.model';
@Component({
  selector: 'app-user-register',
  standalone: false,
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  registerRequest: RegisterRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: Role.USER 
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const request: RegisterRequest = { 
        ...this.registerRequest,
        companyName: undefined,
        taxIdentificationNumber: undefined
    };

    this.authService.register(request).subscribe({
        next: () => this.router.navigate(['/login/user']),
        error: (err) => console.error('Erreur:', err)
    });
}
}