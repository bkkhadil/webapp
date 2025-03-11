import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CoWorkspace } from '../shared/models/co_workspace.model';
import { Espace } from '../shared/models/espace.model';
import { Equipment } from '../shared/models/equipment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CoworkspaceService {
  
  private apiUrl = '/api/coworkspaces';
  private currentCoworkspaceId: string | null = null;
  private espaces: Espace[] = []; // Liste temporaire des espaces

  constructor(private http: HttpClient,
     private authService: AuthService,
  ) {}
  createCoworkspace(formData: FormData): Observable<CoWorkspace> {
    return this.http.post<CoWorkspace>(`${this.apiUrl}/create`, formData);
  }
 
  deleteCoworkspace(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  deleteEspace(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/espaces/${id}`);
  }

// Dans coworkspace.service.ts
getCoworkspacesForPartner(): Observable<CoWorkspace[]> {
  return this.http.get<CoWorkspace[]>(`${this.apiUrl}/me`); 
}
 
  createEspace(formData: FormData): Observable<Espace> {
    return this.http.post<Espace>(`${this.apiUrl}/espaces/create`, formData);
}

  // Définir l'ID du CoWorkspace actuel
  setCurrentCoworkspaceId(id: string): void {
    this.currentCoworkspaceId = id;
  }

  // Récupérer l'ID du CoWorkspace actuel
  getCurrentCoworkspaceId(): string | null {
    return this.currentCoworkspaceId;
  }

  // Ajouter un Espace à la liste temporaire
  addEspace(espace: Espace): void {
    this.espaces.push(espace);
  }
  // coworkspace.service.ts

 // Ajoutez cette méthode
 getAllEquipments(): Observable<Equipment[]> {
  return this.http.get<Equipment[]>(`${this.apiUrl}/equipments`);
}

  // Récupérer la liste des Espaces temporaires
  getEspaces(): Espace[] {
    return this.espaces;
  }

  // Réinitialiser la liste des Espaces
  clearEspaces(): void {
    this.espaces = [];
  }

  

getEspaceById(id: string): Observable<Espace> {
  return this.http.get<Espace>(`${this.apiUrl}/espaces/${id}`).pipe(
    catchError(error => {
      let errorMessage = 'Erreur lors de la récupération de l\'espace';
      if (error.status === 404) errorMessage = `Espace ${id} introuvable`;
      return throwError(() => new Error(errorMessage));
    })
  );
}









  // Dans CoworkspaceService
getCoworkspaceById(id: string): Observable<CoWorkspace> {
  return this.http.get<CoWorkspace>(`${this.apiUrl}/${id}`);
}

updateCoworkspace(id: string, formData: FormData): Observable<CoWorkspace> {
  return this.http.put<CoWorkspace>(
      `${this.apiUrl}/${id}`, 
      formData, 
      { 
          headers: { 
              // Assurez-vous que le Content-Type est correct
              'Authorization': `Bearer ${this.authService.getAccessToken()}`
          }
      }
  );
}


// coworkspace.service.ts
updateEspaceWithImage(id: string, formData: FormData): Observable<Espace> {
  return this.http.put<Espace>(`${this.apiUrl}/espaces/${id}`, formData).pipe(
    catchError(error => {
      let errorMsg = 'Échec de la mise à jour';
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Erreur: ${error.error.message}`;
      } else {
        errorMsg = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => new Error(errorMsg));
    })
  );
}
}