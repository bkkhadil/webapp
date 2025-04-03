import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../../shared/models/reservation.model';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-liste-reservation',
  standalone: false,
  templateUrl: './liste-reservation.component.html',
  styleUrl: './liste-reservation.component.css'
})
export class ListeReservationComponent implements OnInit {
  selectedSort: string = 'dateAsc';
  reservations: (Reservation & { hasOverlap?: boolean })[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadReservations();
  }
  // Dans ListeReservationComponent
calculateDuration(start: Date, end: Date): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure le jour de début
}

  loadReservations() {
    this.reservationService.getPartnerReservations().subscribe(data => {
      // Ajouter la détection de chevauchement
      this.reservations = data.map(res => ({
        ...res,
        hasOverlap: this.checkOverlap(res, data)
      }));
      this.sortReservations();
    });
  }
  sortReservations() {
    this.reservations.sort((a, b) => {
      const dateA = new Date(a.dateStart).getTime();
      const dateB = new Date(b.dateStart).getTime();
      
      if (this.selectedSort === 'dateAsc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }
  private checkOverlap(currentRes: Reservation, allReservations: Reservation[]): boolean {
    return allReservations.some(otherRes => {
      // Vérifier le même espace et type
      const sameSpace = currentRes.espace.coWorkspace.nom === otherRes.espace.coWorkspace.nom;
      const sameType = currentRes.espace.type === otherRes.espace.type;
      
      // Exclure la réservation actuelle
      if (currentRes.id === otherRes.id) return false;
      
      // Vérifier le chevauchement de dates
      const start1 = new Date(currentRes.dateStart);
      const end1 = new Date(currentRes.dateEnd);
      const start2 = new Date(otherRes.dateStart);
      const end2 = new Date(otherRes.dateEnd);

      return sameSpace && sameType && (
        (start1 <= end2 && end1 >= start2) || 
        (start2 <= end1 && end2 >= start1)
      );
    });
  }
  updateStatus(id: number, status: string) {
    this.reservationService.updateStatus(id, status).subscribe({
      next: () => {
        // Actualiser la liste après mise à jour
        this.reservations = this.reservations.map(res => 
          res.id === id ? {...res, status} : res
        );
      },
      error: (err) => console.error('Erreur', err)
    });
  }

 
}