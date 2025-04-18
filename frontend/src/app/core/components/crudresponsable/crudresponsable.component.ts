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

  ngOnInit(): void {
    this.loadCoworkspaces(); // Charge les coworking spaces au démarrage
  }
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string | null = null;
  
  selectLetter(letter: string | null): void {
    this.selectedLetter = letter;
    this.filterCoworkspaces();
  }
  
  filterCoworkspaces() {
    this.filteredCoworkspaces = this.coworkspaces.filter(c => {
      // Filtre par recherche
      const searchLower = this.searchTerm.toLowerCase();
      const matchesSearch = c.nom.toLowerCase().includes(searchLower) ||
                            c.ville.toLowerCase().includes(searchLower) ||
                            c.adresse.toLowerCase().includes(searchLower);
  
      // Filtre par lettre sélectionnée
      const matchesLetter = !this.selectedLetter || 
                            c.nom.toLowerCase().startsWith(this.selectedLetter.toLowerCase());
  
      return matchesSearch && matchesLetter;
    });
  }
  loadCoworkspaces(): void {
    this.coworkspaceService.getCoworkspacesForPartner().subscribe(
      (data) => {
        console.log('Données reçues:', data);
        // Convertir dateCreation en string si nécessaire
        this.coworkspaces = data.map(coworkspace => ({
          ...coworkspace,
          dateCreation: coworkspace.dateCreation.toString(), // Conversion en string
        }));
        this.filteredCoworkspaces = this.coworkspaces; // Initialiser filteredCoworkspaces
      },
      (error) => {
        console.error('Erreur lors du chargement des coworking spaces:', error);
        console.error('Détails de l\'erreur:', error.error);
      }
    );
  }



  filterrCoworkspaces(): void {
    if (!this.searchTerm) {
      this.filteredCoworkspaces = this.coworkspaces;
    } else {
      this.filteredCoworkspaces = this.coworkspaces.filter((coworkspace) =>
        coworkspace.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        coworkspace.ville.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  // crudresponsable.component.ts
updateEspace(idCoworkspace: string, idEspace: string): void {
  this.router.navigate(['/partner/update-espace', idCoworkspace, idEspace]);
}








deleteCoworkspace(id: number): void {
  console.log('ID du coworking space à supprimer :', id); // Afficher l'ID dans la console
  if (confirm('Êtes-vous sûr de vouloir supprimer ce coworking space ?')) {
    this.coworkspaceService.deleteCoworkspace(id.toString()).subscribe(
      () => {
        console.log('Coworking space supprimé avec succès');
        this.loadCoworkspaces(); // Recharger la liste après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression du coworking space:', error);
      }
    );
  }
}

updateCoworkspace(id: number): void {
  this.router.navigate(['/partner/updatecoworkzone', id]); // Rediriger vers le formulaire de modification
}

formatDate(date: string): string {
  const dateObj = new Date(date); // Convertir la chaîne en objet Date
  return this.datePipe.transform(dateObj, 'dd/MM/yyyy') || ''; // Formater la date
}
}