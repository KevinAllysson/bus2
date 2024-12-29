import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root', 
})
export class ParadasService {
    private readonly apiUrl = 'http://localhost:3000/paradas';

    constructor(private http: HttpClient) { }

    getParadas(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getAllParadas(): Observable<{ id: number; nome: string; lat: number; lng: number }[]> {
        return this.http.get<{ id: number; nome: string; lat: number; lng: number }[]>(this.apiUrl);
    }

    // Obtém paradas por ID da viagem
    getParadasByViagemId(viagemId: number): Observable<{ id: number; nome: string; lat: number; lng: number }[]> {
        const endpoint = `${this.apiUrl}/viagem/${viagemId}`;
        return this.http.get<{ id: number; nome: string; lat: number; lng: number }[]>(endpoint).pipe(
            map((paradas) =>
                paradas.filter((parada) => {
                    const isValid = typeof parada.lat === 'number' && typeof parada.lng === 'number';
                    if (!isValid) {
                        console.warn(`Parada inválida encontrada e ignorada:`, parada);
                    }
                    return isValid;
                })
            ),
            catchError((error) => {
                console.error('Erro ao obter paradas:', error);
                return of([]);
            })
        );
    }

    getTodasParadas(): Observable<{ id: number; nome: string; lat: number; lng: number }[]> {
        return this.http.get<{ id: number; nome: string; lat: number; lng: number }[]>(this.apiUrl).pipe(
            map((paradas) =>
                paradas.filter((parada) => {
                    const isValid = typeof parada.lat === 'number' && typeof parada.lng === 'number';
                    if (!isValid) {
                        console.warn(`Parada inválida encontrada e ignorada:`, parada);
                    }
                    return isValid;
                })
            )
        );
    }


}
