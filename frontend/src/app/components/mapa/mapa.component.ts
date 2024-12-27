import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importar FontAwesomeModule
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
    constructor(private paradasService: ParadasService) {}

    @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap; // Referência ao GoogleMap do Angular
    @Input() viagem!: any;
    @Input() showForm: boolean = true;
    @Input() paradas: { lat: number; lng: number; nome: string }[] = [];

    // Ícones FontAwesome
    faAngleRight = faAngleRight;
    faAngleLeft = faAngleLeft;

    center: google.maps.LatLngLiteral = { lat: -26.91012, lng: -49.08234 };
    zoom = 14;
    mapWidth = '75vw'; // Largura inicial do mapa
    options: google.maps.MapOptions = {
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeId: 'roadmap',
    };

    polyline!: google.maps.Polyline;
    markers: google.maps.Marker[] = []; // Lista de marcadores

    ngOnInit(): void {
        this.paradasService.getParadas().subscribe((paradas) => {
            this.addMarkers(paradas); 
        });
    
        console.log('MapaComponent inicializado. Centro padrão configurado:', this.center);
    }

    toggleForm(): void {
        this.showForm = !this.showForm; // Alterna o estado do formulário
    }

    ngAfterViewInit(): void {
        if (!this.googleMap.googleMap) {
            console.error('Componente GoogleMap não está inicializado ainda.');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Atualiza dimensões do mapa ao alterar showForm
        if (changes['showForm']) {
            this.updateMapDimensions();
        }
    
        // Renderiza rota e paradas da viagem selecionada
        if (changes['viagem'] && this.viagem) {
            if (Array.isArray(this.viagem.caminho)) {
                this.renderRouteFromArray(this.viagem.caminho, this.viagem.paradas || []);
            } else if (typeof this.viagem.caminho === 'string') {
                this.renderRoute(this.viagem.caminho, this.viagem.paradas || []);
            } else {
                console.error('Caminho da viagem está em formato inválido.', this.viagem.caminho);
            }
        }
    
        // Adiciona marcadores das paradas
        if (changes['paradas'] && changes['paradas'].currentValue) {
            const paradas = changes['paradas'].currentValue;
            this.addMarkers(paradas);
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

    private addMarkers(paradas: { nome: string; lat: number; lng: number }[]): void {
        const googleMapInstance = this.googleMap.googleMap;
        if (!googleMapInstance) {
            console.error('Google Map não está inicializado. Não é possível adicionar marcadores.');
            return;
        }
    
        // Limpa marcadores existentes
        this.markers.forEach((marker) => marker.setMap(null));
        this.markers = [];
    
        // Adiciona novos marcadores com validação
        paradas.forEach((parada) => {
            if (typeof parada.lat !== 'number' || typeof parada.lng !== 'number') {
                console.warn(`Parada inválida ignorada:`, parada);
                return; // Ignora entradas inválidas
            }
    
            const marker = new google.maps.Marker({
                position: { lat: parada.lat, lng: parada.lng },
                title: parada.nome,
                icon: {
                    url: '../../img/bus-stop.png', // Ícone personalizado
                    scaledSize: new google.maps.Size(32, 32),
                },
            });
    
            // Adiciona evento de clique no marcador
            marker.addListener('click', () => {
                const infoWindow = new google.maps.InfoWindow({
                    content: `<div><strong>${parada.nome}</strong></div>`,
                });
                infoWindow.open(googleMapInstance, marker);
            });
    
            marker.setMap(googleMapInstance);
            this.markers.push(marker);
        });
    }
}
