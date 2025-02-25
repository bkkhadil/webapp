import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Espace } from '../shared/models/espace.model';

@Injectable({
  providedIn: 'root',
})
export class EspaceService {
  private apiUrl = 'http://localhost:3000'; // JSON Server URL

  constructor(private http: HttpClient) {}

  // Créez un espace
  createEspace(espace: Espace): Observable<Espace> {
    return this.http.post<Espace>(`${this.apiUrl}/espaces`, espace);
  }
  ///////
  updateEspace(espace: Espace): Observable<Espace> {
    return this.http.put<Espace>(`${this.apiUrl}/${espace.id_espace}`, espace);
  }
}