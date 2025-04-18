import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { AuthenticationRequest } from '../../../models/authentication-request.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-partner-auth',
  standalone: false,
  templateUrl: './partner-auth.component.html',
  styleUrl: './partner-auth.component.css'
})
export class PartnerAuthComponent {
  authRequest: AuthenticationRequest = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.authRequest).subscribe({
      next: () =>{},
      error: (err) => console.error('Authentication failed:', err)
    });
  }
}
