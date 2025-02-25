import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-utilisateur',
  standalone: false,
  templateUrl: './login-utilisateur.component.html',
  styleUrl: './login-utilisateur.component.css'
})
export class LoginUtilisateurComponent {
 constructor(private router: Router) {}

  navigateToEnregistrement() {
    this.router.navigate(['/user-sign-up']);
  }

  goToEnregistrement() {
    this.router.navigate(['/user-sign-up']);
  }
}
