import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoWorkspace } from '../shared/models/co_workspace.model';
import { Equipment } from '../shared/models/equipment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = '/api/coworkspaces';

  constructor(private http: HttpClient) {}

  search(city: string, searchQuery: string): Observable<any[]> {
    const params = new HttpParams()
      .set('city', city || '')
      .set('searchQuery', searchQuery || '');
  
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
 


  getEspaceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getAllEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiUrl}/equipments`);
  }
  updateCoworkspace(id: string, coWorkspace: CoWorkspace): Observable<CoWorkspace> {
    return this.http.put<CoWorkspace>(`${this.apiUrl}/${id}`, coWorkspace);
  }
}