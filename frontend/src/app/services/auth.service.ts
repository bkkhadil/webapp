
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Adaptez ces chemins selon votre structure de projet
import { AuthenticationRequest } from '../../models/authentication-request.model';
import { AuthenticationResponse } from '../../models/authentication-response.model';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../models/register-request.model';
import { Reservation } from '../shared/models/reservation.model';
import { User } from '../../models/user.model';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'api/v1/auth'; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.API_URL}/authenticate`, credentials)
      .pipe(
        tap(response => {
          this.handleAuthentication(response);
          this.redirectBasedOnRole(); // Rediriger après l'authentification
        })
      );
  }
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
  public handleAuthentication(response: AuthenticationResponse): void {
    // Stocker le token d'accès
    sessionStorage.setItem('access_token', response.access_token);
  
    // Stocker le token de rafraîchissement (si utilisé)
    sessionStorage.setItem('refresh_token', response.refresh_token);
  
    // Décoder le token JWT pour obtenir les informations utilisateur
    const payload = this.parseJwt(response.access_token);
    const user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role.toUpperCase()  // Assurez-vous que le rôle est en minuscules
    };
  
    // Stocker les informations utilisateur
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  
    // Vérifier le stockage
    console.log('Access Token:', sessionStorage.getItem('access_token'));
    console.log('Current User:', JSON.parse(sessionStorage.getItem('currentUser') ?? '{}'));
  }


  logout(): void {
    sessionStorage.clear(); // Supprime toutes les données de session
    this.router.navigate(['/login/user']); // Redirige vers la page de login USER par défaut
  }
  get currentUser(): any {
    const user = sessionStorage.getItem('currentUser');
    const parsedUser = user ? JSON.parse(user) : null;
    console.log('Current User:', parsedUser); // Ajoutez ce log pour vérifier
    return parsedUser;
  }



  getAccessToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
  register(userData: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, userData);
  }
  redirectBasedOnRole(): void {
    const user = this.currentUser;
    console.log('User:', user); // Log pour vérifier les informations utilisateur
  
    if (user) {
      console.log('User Role:', user.role); // Log pour vérifier le rôle
      if (user.role === 'USER') {
        console.log('Redirecting to /user/');
        this.router.navigate(['']);
      } else if (user.role === 'PARTNER') {
        console.log('Redirecting to /partner/crud');
        this.router.navigate(['/partner/crud']);
      }
    } else {
      console.log('No user found, redirecting to /login');
      this.router.navigate(['/login']);
    }
  }
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(
        this.API_URL, 
        reservation, 
        { headers: this.getAuthHeaders() }
    );
}

private getAuthHeaders() {
    return new HttpHeaders({
        'Authorization': `Bearer ${this.getAccessToken()}`
    });
}



updateLocalUser(updatedUser: User): void {
  const currentUser = this.currentUser;
  const mergedUser = { ...currentUser, ...updatedUser };
  sessionStorage.setItem('currentUser', JSON.stringify(mergedUser));
}





updateUser(userId: number, updateData: any): Observable<User> {
  return this.http.put<User>(`/api/users/${userId}`, updateData);
}

getCurrentUserDetails(): Observable<User> {
  return this.http.get<User>('/api/users/me'); // Endpoint à créer dans le backend
}
private parseJwt(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));
  return {
      id: payload.id, // Utilisez 'id' au lieu de 'sub'
      email: payload.sub,
      role: payload.role
  };
}





}


