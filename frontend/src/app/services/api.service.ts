import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // URL do back-end

  constructor(private http: HttpClient) {}

  getLinhas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/linhas`);
  }

  getParadas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/paradas`);
  }

  getViagens(): Observable<any> {
    return this.http.get(`${this.baseUrl}/viagens`);
  }
}
