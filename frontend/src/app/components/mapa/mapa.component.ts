import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { ParadasService } from '../../services/paradas.service';


@Component({
    standalone: true,
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
    imports: [
        GoogleMap,
        CommonModule,
        FontAwesomeModule,
    ],
})
export class MapaComponent implements OnInit, OnChanges, AfterViewInit {
    constructor(private paradasService: ParadasService) { }

    @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;
    @Input() viagem!: any;
    @Input() showForm: boolean = true;
    @Input() paradas: { lat: number; lng: number; nome: string }[] = [];
    @Output() paradasCarregadas = new EventEmitter<any[]>();
    @Input() selectedViagem!: number | string;

    faAngleRight = faAngleRight;
    faAngleLeft = faAngleLeft;

    center: google.maps.LatLngLiteral = { lat: -26.91012, lng: -49.08234 };
    zoom = 14;
    mapWidth = '75vw'; 
    options: google.maps.MapOptions = {
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeId: 'roadmap',
    };

    polyline: google.maps.Polyline | null = null;
    markers: google.maps.Marker[] = [];

    resetMapa(): void {
        if (this.googleMap?.googleMap) {
            this.googleMap.googleMap.setCenter(this.center);
            this.googleMap.googleMap.setZoom(this.zoom);
            if (this.polyline) {
                this.polyline.setMap(null);
                this.polyline = null; 
            }
        }
    }

    ngOnInit(): void { }

    toggleForm(): void {
        this.showForm = !this.showForm;
    }

    ngAfterViewInit(): void {
        if (!this.googleMap || !this.googleMap.googleMap) {
            console.warn('Google Map não está inicializado. Aguardando...');
            setTimeout(() => this.ngAfterViewInit(), 500); 
            return;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['showForm']) {
            this.updateMapDimensions();
        }

        if (changes['paradas'] && changes['paradas'].currentValue) {
            if (!this.googleMap || !this.googleMap.googleMap) {
                console.warn('Google Map não inicializado. Tentando novamente após atraso.');
                setTimeout(() => this.ngOnChanges(changes), 500); 
                return;
            }

            this.addMarkers(changes['paradas'].currentValue);
        }

        if (changes['viagem'] && this.viagem) {
            if (!this.googleMap || !this.googleMap.googleMap) {
                console.warn('Google Map não inicializado. Tentando novamente após atraso.');
                setTimeout(() => this.ngOnChanges(changes), 500);
                return;
            }

            if (Array.isArray(this.viagem.caminho)) {
                this.renderRouteFromArray(this.viagem.caminho, this.viagem.paradas || []);
            } else if (typeof this.viagem.caminho === 'string') {
                this.renderRoute(this.viagem.caminho, this.viagem.paradas || []);
            } else {
                console.error('Caminho da viagem está em formato inválido.', this.viagem.caminho);
            }
        }
    }


    private updateMapDimensions(): void {
        this.mapWidth = this.showForm ? '75vw' : '95vw';
        if (this.googleMap && this.googleMap.googleMap) {
            google.maps.event.trigger(this.googleMap.googleMap, 'resize');
            this.googleMap.googleMap.setCenter(this.center);
        }
    }

    private renderRouteFromArray(path: { lat: number; lng: number }[], paradas: any[]): void {
        if (path.length === 0) {
            console.error('Caminho decodificado está vazio.');
            return;
        }

        if (this.polyline) {
            this.polyline.setMap(null);
        }

        if (this.googleMap.googleMap) {
            this.polyline = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
            this.polyline.setMap(this.googleMap.googleMap);

            const bounds = new google.maps.LatLngBounds();
            path.forEach((point) => bounds.extend(point));
            this.googleMap.googleMap.fitBounds(bounds);

            this.addMarkers(paradas);
        } else {
            console.error('Google Map não está inicializado. Não é possível renderizar a rota.');
        }
    }

    private renderRoute(encodedPath: any, paradas: any[]): void {
        if (!(google.maps && google.maps.geometry && google.maps.geometry.encoding)) {
            console.error('A biblioteca de geometria do Google Maps não está disponível.');
            return;
        }

        if (typeof encodedPath !== 'string') {
            console.error('Caminho codificado inválido. Esperado uma string.', encodedPath);
            return;
        }

        const decodedPath = google.maps.geometry.encoding.decodePath(encodedPath);

        if (decodedPath.length === 0) {
            console.error('Caminho decodificado está vazio.');
            return;
        }

        if (this.polyline) {
            this.polyline.setMap(null);
        }

        if (this.googleMap.googleMap) {
            this.polyline = new google.maps.Polyline({
                path: decodedPath,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
            this.polyline.setMap(this.googleMap.googleMap);

            const bounds = new google.maps.LatLngBounds();
            decodedPath.forEach((point: any) => bounds.extend(point));
            this.googleMap.googleMap.fitBounds(bounds);
        } else {
            console.error('Google Map não está inicializado. Não é possível adicionar a rota.');
        }

        this.addMarkers(paradas);
    }

    onViagemChange(viagemId: number): void {
        if (!viagemId) {
            console.error('ID da viagem é inválido.');
            return;
        }

        this.paradasService.getParadasByViagemId(viagemId).subscribe({
            next: (paradas) => {
                this.addMarkers(paradas);
            },
            error: (error) => {
                console.error('Erro ao carregar paradas:', error);
            },
        });
    }

    onParadasCarregadas(paradas: any[]): void {
        const paradasFormatadas = paradas
            .filter((parada) => !isNaN(parseFloat(parada.latitude)) && !isNaN(parseFloat(parada.longitude)))
            .map((parada) => ({
                nome: parada.nome_parada,
                lat: parseFloat(parada.latitude),
                lng: parseFloat(parada.longitude),
            }));

        this.addMarkers(paradasFormatadas);
    }

    private addMarkers(paradas: { nome: string; lat: number; lng: number }[]): void {
        if (!this.googleMap || !this.googleMap.googleMap) {
            return;
        }

        this.markers.forEach((marker) => marker.setMap(null));
        this.markers = [];

        const googleMapInstance = this.googleMap.googleMap;

        paradas.forEach((parada) => {

            if (isNaN(parada.lat) || isNaN(parada.lng)) {
                console.warn('Parada com coordenadas inválidas ignorada:', parada);
                return;
            }

            const marker = new google.maps.Marker({
                position: { lat: parada.lat, lng: parada.lng },
                title: parada.nome,
                icon: {
                    url: '../../img/bus-stop.png', 
                    scaledSize: new google.maps.Size(32, 32),
                },
            });

            marker.setMap(googleMapInstance);
            this.markers.push(marker);
        });
    }

}
