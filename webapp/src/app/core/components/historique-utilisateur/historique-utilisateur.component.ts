import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { Reservation } from '../../../shared/models/reservation.model';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-historique-utilisateur',
  standalone: false,
  templateUrl: './historique-utilisateur.component.html',
  styleUrl: './historique-utilisateur.component.css'
})
export class HistoriqueUtilisateurComponent {
  reservations: Reservation[] = [];
  loading = true;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getUserReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement', err);
        this.loading = false;
      }
    });
  }
}
