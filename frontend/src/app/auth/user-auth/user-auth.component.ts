import { Component } from '@angular/core';


import { AuthService } from '../../services/auth.service';
import { AuthenticationRequest } from '../../../models/authentication-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  standalone: false,
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})



export class UserAuthComponent {
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
      next: () => {},
      error: (err) => console.error('Authentication failed:', err)
    });
  }
}