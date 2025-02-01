import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [
		RouterLink,
		RouterLinkActive,
		RouterOutlet,
		MatIconModule
	],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
