import { Routes } from '@angular/router';
import { MapaComponent } from './components/mapa/mapa.component';

export const routes: Routes = [
  { path: '', redirectTo: '/mapa', pathMatch: 'full' }, // Redireciona para /mapa
  { path: 'mapa', component: MapaComponent } // Define a rota para o MapaComponent
];
