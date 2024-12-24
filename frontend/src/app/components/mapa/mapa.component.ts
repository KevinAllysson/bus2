import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
    standalone: true,
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
    imports: [GoogleMapsModule]
})
export class MapaComponent implements OnInit {
    center!: google.maps.LatLngLiteral;
    zoom = 14;
    options: google.maps.MapOptions = {
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeId: 'roadmap',
    };


    ngOnInit(): void {
        this.loadGoogleMapsApi()
            .then(() => {
                this.center = { lat: -26.91012, lng: -49.08234 };
                this.options = {
                    zoomControl: true,
                    scrollwheel: true,
                    disableDoubleClickZoom: true,
                    mapTypeId: 'roadmap',
                };
            })
            .catch((err) => {
                console.error('Erro ao carregar o Google Maps API:', err);
            });
    }


    private loadGoogleMapsApi(): Promise<void> {
        return new Promise((resolve, reject) => {
            if ((window as any).google && (window as any).google.maps) {
                // O namespace já está carregado
                resolve();
            } else {
                const script = document.createElement('script');
                script.id = 'google-maps';
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA8y8KNmFIGBamRWFWIprDfiGgcmxf9D8Q`;
                script.async = true;
                script.defer = true;
                script.onload = () => resolve();
                script.onerror = (error) => reject(error);
                document.body.appendChild(script);
            }
        });
    }

}
