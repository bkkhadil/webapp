import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoginDropdownVisible = false;
  isUserDropdownVisible = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}
// Navigation conditionnelle pour l'accueil
navigateHome(): void {
  if (this.authService.currentUser?.role === 'PARTNER') {
    this.router.navigate(['/partner/crud']);
  } else {
    this.router.navigate(['/']); 
  }
  this.closeDropdowns();
}
  // Fermer tous les dropdowns
  closeDropdowns(): void {
    this.isLoginDropdownVisible = false;
    this.isUserDropdownVisible = false;
  }

  // Toggle login dropdown
  toggleLoginDropdown(): void {
    this.isLoginDropdownVisible = !this.isLoginDropdownVisible;
    this.isUserDropdownVisible = false; // Fermer l'autre dropdown
  }

  // Toggle user dropdown
  toggleUserDropdown(): void {
    this.isUserDropdownVisible = !this.isUserDropdownVisible;
    this.isLoginDropdownVisible = false; // Fermer l'autre dropdown
  }

  // Navigation to login for User
  navigateToLoginUtilisateur(): void {
    this.router.navigate(['/login/user']);
    this.closeDropdowns(); // Fermer le dropdown après la navigation
  }

  // Navigation to login for Partner
  navigateToLoginPartenaire(): void {
    this.router.navigate(['/login/partner']);
    this.closeDropdowns(); // Fermer le dropdown après la navigation
  }

  // Navigation to Profile
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeDropdowns(); // Fermer le dropdown après la navigation
  }

  // Logout
  logout(): void {
    const userRole = this.authService.currentUser?.role;
    this.authService.logout();
    this.closeDropdowns(); // Fermer le dropdown après la déconnexion

    if (userRole === 'USER') {
      this.router.navigate(['/login/user']);
    } else if (userRole === 'PARTNER') {
      this.router.navigate(['/login/partner']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}