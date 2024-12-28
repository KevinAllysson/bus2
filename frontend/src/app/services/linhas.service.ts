import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinhasService {
  private apiUrl = 'http://localhost:3000'; // Base URL do backend

  constructor(private http: HttpClient) {}

  // Consulta todas as linhas
  getLinhas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/linhas`);
  }

  // Consulta viagens associadas a uma linha pelo ID
  getViagensByLinhaId(linhaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/linhas/${linhaId}/viagens`);
  }
}
