import { Component } from '@angular/core';
import { faHome, faUser, faCog, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-icons-view',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './icons-view.component.html',
  styleUrls: ['./icons-view.component.scss']
})
export class IconsViewComponent {
  icons = [
    { icon: faHome, label: 'Home' },
    { icon: faUser, label: 'Profile' },
    { icon: faCog, label: 'Settings' },
    { icon: faInfoCircle, label: 'Info' }
  ];
}
