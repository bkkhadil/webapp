import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: false,
})
export class SearchComponent implements OnInit {
  results: any[] = [];
  espaces: any[] = [];  // Propriété ajoutée pour éviter l'erreur dans le template
  selectedCity: string = '';
  selectedType: string = '';
  searchQuery: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCity = params['city'] || '';
      this.selectedType = params['type'] || '';
      this.searchQuery = params['query'] || '';

      this.fetchResults();
    });
  }

  fetchResults(): void {
    this.searchService.search(this.selectedCity, this.selectedType, this.searchQuery)
      .subscribe(results => {
        this.results = results;
        this.espaces = results;  // Correction pour que `espaces` soit assigné
      });
  }

  search(): void {
    this.router.navigate(['partner/search'], {
      queryParams: {
        city: this.selectedCity,
        type: this.selectedType,
        query: this.searchQuery
      }
    });
  }

  // Optimisation de la boucle *ngFor
  trackByNom(index: number, item: any): string {
    return item.nom;
  }
  






  
  
    goToDetails(espaceId: string) {
      this.router.navigate(['partner/details', espaceId]);
    }
  
  


  

 




    fetchResultss(): void {
      this.searchService.search(this.selectedCity, this.selectedType, this.searchQuery)
        .subscribe(results => {
          this.results = results;
          this.espaces = results;  // Correction pour que `espaces` soit assigné
        });
    }
    









}
