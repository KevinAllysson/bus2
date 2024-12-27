import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // URL base da API

  constructor(private http: HttpClient) {}

  getLinhas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/linhas`);
  }

  // Novo método para buscar viagens por linha
  getViagensByLinha(linhaId: number): Observable<any[]> { 
    return this.http.get<any[]>(`${this.baseUrl}/linhas/${linhaId}/detalhes`);
  }

  getParadas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/paradas`);
  }
}
