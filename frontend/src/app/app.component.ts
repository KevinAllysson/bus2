import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true, // Especifica que este componente é standalone
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule], // Importa o RouterModule explicitamente para standalone
  
})
export class AppComponent {
  title = 'Sistema de Transporte';

  constructor(private titleService: Title, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const routeTitle = this.router.url === '/mapa' ? 'Mapa Interativo' : this.title;
      this.titleService.setTitle(routeTitle);
      this.title = routeTitle;
    });
  }
}
