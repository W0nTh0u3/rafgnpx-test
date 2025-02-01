import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
	selector: 'app-main-layout',
	standalone: true,
	imports: [
		RouterLink,
		RouterOutlet,
		NavbarComponent
	],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
