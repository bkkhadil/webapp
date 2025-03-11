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
  selectedCity: string = '';
  searchQuery: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private searchService: SearchService) {}

// search.component.ts (corrigé)
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.selectedCity = params['city'] || '';
    this.searchQuery = params['searchQuery'] || '';
    this.fetchResults();
  });
}

fetchResults(): void {
  this.searchService.search(this.selectedCity, this.searchQuery).subscribe(
    (results) => {
      console.log('Résultats API:', results);
      this.results = results.map((coworspace) => ({
        ...coworspace,
        id: coworspace.idCoWorkspace, // Mapper idCoWorkspace vers id
      }));
      // Vérifiez que chaque coworspace a un ID
      this.results.forEach((coworspace) => {
        console.log('Coworkspace ID:', coworspace.id);
      });
    },
    (error) => {
      console.error('Erreur API:', error);
    }
  );
}

  search() {
    this.router.navigate(['/search'], {
      queryParams: {
        city: this.selectedCity,
        searchQuery: this.searchQuery // Remplacez "query" par "searchQuery"
      }
    });
  } 



  trackByNom(index: number, item: any): string {
    return item.id; // Utilisez une propriété unique comme "id" au lieu de "nom"
  }
  goToDetails(espaceId: number) {
    console.log('ID du coworking space:', espaceId); // Vérifiez la valeur dans la console
    if (espaceId === undefined) {
      console.error('ID du coworking space non défini.');
      return;
    }
    this.router.navigate(['user/details', espaceId.toString()]);
  }
}