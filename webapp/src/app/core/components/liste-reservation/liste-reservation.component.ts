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
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getPartnerReservations().subscribe(data => {
      this.reservations = data;
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