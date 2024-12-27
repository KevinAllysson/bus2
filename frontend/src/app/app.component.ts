import { Component, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './components/mapa/mapa.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IconsViewComponent } from './components/icons-view/icons-view.component';


@Component({
  standalone: true, 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, FormularioComponent, CommonModule, MapaComponent, FontAwesomeModule, IconsViewComponent], 
})
export class AppComponent {
  title = 'CityLink';
  showForm = true;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  viagem: any = null;

  constructor(private titleService: Title, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const routeTitle = 'BusFinder ';
      this.titleService.setTitle(routeTitle);
      this.title = routeTitle;
    });
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}