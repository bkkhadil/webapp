import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedCity: string = '';
  selectedType: string = '';
  searchQuery: string = '';

  constructor(private router: Router) {}

  search(): void {
    this.router.navigate(['user-search'], {
      queryParams: {
        city: this.selectedCity,
        type: this.selectedType,
        query: this.searchQuery
      }
    });
  }
}

