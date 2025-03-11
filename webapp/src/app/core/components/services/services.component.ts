import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
   constructor(
      public authService: AuthService,
      private router: Router
    ) {}
  navigateToPartnerCrud(): void {
    if (this.authService.isAuthenticated()) {
      if (this.authService.currentUser?.role === 'PARTNER') {
        this.router.navigate(['/partner/crud']);
      } else {
        this.router.navigate(['/login/partner']); // Redirige si mauvais rôle
      }
    } else {
      this.router.navigate(['/login/partner']); // Redirige si non authentifié
    }
  }

}
