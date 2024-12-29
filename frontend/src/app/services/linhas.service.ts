import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinhasService {
  private apiUrl = 'http://localhost:3000'; // Base URL do backend

  constructor(private http: HttpClient) { }

  getLinhas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/linhas`);
  }

  getViagensByLinhaId(linhaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/viagens/linha/${linhaId}`);
  }
  getParadasByViagemId(viagemId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paradas`).pipe(
      map((paradas) => paradas.filter((parada) => parada.viagem_id === viagemId))
    );
  }
}