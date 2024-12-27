import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './components/mapa/mapa.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IconsViewComponent } from './components/icons-view/icons-view.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, FormularioComponent, CommonModule, MapaComponent, FontAwesomeModule, IconsViewComponent, LoginComponent],
})
export class AppComponent implements OnInit {
  @ViewChild('mapa') mapaComponent!: MapaComponent; 

  title = 'BusFinder';
  isLoggedIn = false;
  showForm = true;
  viagem: any = null;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  listaDeParadas: any = null;

  constructor(private titleService: Title, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeTitle = this.isLoggedIn ? 'BusFinder - Mapa' : 'BusFinder - Login';
        this.titleService.setTitle(routeTitle);
        this.title = routeTitle;
      }
    });

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }
  onResetMapa(): void {
    if (this.mapaComponent) {
      this.mapaComponent.resetMapa();
    }
  }

  onLoginSuccess(): void {
    this.isLoggedIn = true; 
    this.router.navigate(['/mapa']); 
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
