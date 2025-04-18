import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../shared/models/reservation.model';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
// reservation.service.ts
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(
    private http: HttpClient,
    private authService: AuthService // Injection du service d'authentification
) {}

createReservation(reservationData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getAccessToken()}`
  });

  return this.http.post(`${this.apiUrl}/create`, reservationData, { headers }).pipe(
    catchError(error => {
      // Extraction du message depuis la réponse JSON du backend
      const errorMsg = error.error?.message || 'Erreur inconnue lors de la réservation';
      return throwError(() => new Error(errorMsg));
    })
  );
}

  getPartnerReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/partner`);
  }

  updateReservationStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }

updateStatus(id: number, status: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}/status`, { status }); // Ajouter /status
}

getUserReservations(): Observable<Reservation[]> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getAccessToken()}`
  });
  
  return this.http.get<Reservation[]>(`${this.apiUrl}/my-reservations`, { headers });
}
}