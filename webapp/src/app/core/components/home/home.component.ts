import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedCity: string = '';
  searchQuery: string = '';
  coworkspaces: any[] = [];

  constructor(private searchService: SearchService,private router: Router) {}

  
  search() {
    console.log('Méthode search() appelée'); // Vérifiez ce message dans la console
    this.router.navigate(['/search'], {
      queryParams: {
        city: this.selectedCity,
        searchQuery: this.searchQuery,
      }
    });
  }

}
