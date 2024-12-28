import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root', // Disponível globalmente como um provider
})
export class ParadasService {
    private readonly apiUrl = 'http://localhost:3000/paradas';

    constructor(private http: HttpClient) { }

    getParadas(): Observable<{ id: number; nome: string; lat: number; lng: number }[]> {
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
    
    getParadasByViagemId(viagemId: number): Observable<any[]> {
        return this.http.get<any[]>(`/api/paradas`, { params: { viagemId: viagemId.toString() } });
    }
}
