import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Fixed styleUrls
})
export class NavbarComponent {
  // State for dropdown visibility
  isLoginDropdownVisible = false;

  constructor(private router: Router) {}

  // Navigation to login for User
  navigateToLoginUtilisateur() {
    this.router.navigate(['/user-sigin-in']);
    this.toggleLoginDropdown();  // Close dropdown after navigation
  }

  // Navigation to login for Partner
  navigateToLoginPartenaire() {
    this.router.navigate(['/partner-sign-in']);
    this.toggleLoginDropdown();  // Close dropdown after navigation
  }

  // Navigation to Historique
  navigateToHistorique() {
    this.router.navigate(['/historique/historique']);
    this.toggleLoginDropdown();  // Close dropdown after navigation
  }

  // Dropdown toggle logic
  toggleLoginDropdown() {
    this.isLoginDropdownVisible = !this.isLoginDropdownVisible;
  }
}
