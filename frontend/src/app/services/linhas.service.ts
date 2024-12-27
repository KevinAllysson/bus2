import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinhasService {
  private baseUrl = 'http://localhost:3000'; // URL base da API
  private linhasEndpoint = `${this.baseUrl}/linhas`; // Endpoint para linhas

  constructor(private http: HttpClient) {}

  // Busca todas as linhas da API
  getLinhas(): Observable<any[]> {
    return this.http.get<any[]>(this.linhasEndpoint);
  }

  // Busca linha específica por ID (caso necessário)
  getLinhaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.linhasEndpoint}/linhas/${id}/detalhes`);
  }
}
