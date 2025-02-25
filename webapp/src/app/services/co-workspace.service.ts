import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoWorkspace } from '../shared/models/co_workspace.model';

@Injectable({
  providedIn: 'root',
})
export class CoworkspaceService {
  private apiUrl = 'http://localhost:3000'; // JSON Server URL
  private currentCoworkspace: CoWorkspace | null = null;

  constructor(private http: HttpClient) {}

  // Créez un coworking space
  createCoworkspace(coworkspace: CoWorkspace): Observable<CoWorkspace> {
    return this.http.post<CoWorkspace>(`${this.apiUrl}/coworkspaces`, coworkspace);
  }

  // Définissez le coworking space actuel
  setCurrentCoworkspace(coworkspace: CoWorkspace): void {
    this.currentCoworkspace = coworkspace;
  }

  // Récupérez le coworking space actuel
  getCurrentCoworkspace(): CoWorkspace {
    if (!this.currentCoworkspace) {
      throw new Error('Aucun coworking space actuel n\'est défini.');
    }
    return this.currentCoworkspace;
  }
  getAllCoworkspaces(): Observable<CoWorkspace[]> {
    return this.http.get<CoWorkspace[]>(`${this.apiUrl}/coworkspaces`);
  }
   // Supprimer un coworking space
   deleteCoworkspace(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/coworkspaces/${id}`);
  }
}