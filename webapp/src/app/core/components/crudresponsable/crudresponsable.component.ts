import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoworkspaceService } from '../../../services/co-workspace.service';
import { CoWorkspace } from '../../../shared/models/co_workspace.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crudresponsable',
  templateUrl: './crudresponsable.component.html',
  styleUrls: ['./crudresponsable.component.css'],
  standalone: false,
})
export class CrudresponsableComponent implements OnInit {
  coworkspaces: CoWorkspace[] = []; // Liste complète des coworking spaces
  filteredCoworkspaces: CoWorkspace[] = []; // Liste filtrée des coworking spaces
  searchTerm: string = ''; // Terme de recherche

  constructor(
    private router: Router,
    private coworkspaceService: CoworkspaceService,
    private datePipe: DatePipe
  ) {}

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  ngOnInit(): void {
    this.loadCoworkspaces(); // Charger les coworking spaces au démarrage
  }

  // Charger les coworking spaces
  loadCoworkspaces(): void {
    this.coworkspaceService.getAllCoworkspaces().subscribe(
      (data: CoWorkspace[]) => {
        this.coworkspaces = data;
        this.filteredCoworkspaces = data; // Initialiser la liste filtrée avec la liste complète
      },
      (error) => {
        console.error('Erreur lors du chargement des coworking spaces:', error);
      }
    );
  }

  // Filtrer les coworking spaces en fonction du terme de recherche
  filterCoworkspaces(): void {
    if (!this.searchTerm) {
      this.filteredCoworkspaces = this.coworkspaces; // Si le terme de recherche est vide, afficher tous les coworking spaces
    } else {
      this.filteredCoworkspaces = this.coworkspaces.filter(coworkspace =>
        coworkspace.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        coworkspace.ville.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        coworkspace.adresse.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Navigation vers le formulaire d'ajout de coworking space
  navigateToaddcoworking(): void {
    this.router.navigate(['/partner/coworkspace']);
  }

  // Navigation vers la liste des réservations
  navigateToListeReservation(): void {
    this.router.navigate(['/partner/autorisation']);
  }

  // Navigation vers le formulaire d'ajout d'espace
  addSpace(): void {
    this.router.navigate(['/partner/addspace']);
  }

  // Navigation vers la liste des espaces
  navigateToListe(): void {
    this.router.navigate(['/partner/crudlist']);
  }

  // Navigation vers le formulaire de mise à jour du coworking space
  updatecoworking(): void {
    this.router.navigate(['/partner/updatecoworkzone']);
  }

  deleteCoworkspace(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce coworking space ?')) {
      this.coworkspaceService.deleteCoworkspace(id).subscribe(
        () => {
          this.loadCoworkspaces(); // Recharger la liste après suppression
          alert('Coworking space supprimé avec succès !');
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression. Veuillez réessayer.');
        }
      );
    }
  }
  // crudresponsable.component.ts
updateEspace(idCoworkspace: string, idEspace: string): void {
  this.router.navigate(['/partner/update-espace', idCoworkspace, idEspace]);
}
}