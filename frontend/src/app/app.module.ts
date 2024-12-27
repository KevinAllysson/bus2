import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsViewComponent } from './components/icons-view/icons-view.component'; // Importe o componente
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    FormularioComponent,
    IconsViewComponent // Declare o componente
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    FontAwesomeModule, // Necessário para <fa-icon>
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [IconsViewComponent]

})
export class AppModule {}
