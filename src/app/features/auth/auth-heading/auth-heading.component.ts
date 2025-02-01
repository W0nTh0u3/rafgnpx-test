import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-auth-heading',
	standalone: true,
	imports: [],
	templateUrl: './auth-heading.component.html',
	styleUrl: './auth-heading.component.scss'
})
export class AuthHeadingComponent {
	@Input() page: 'login' | 'register' = 'login';
}
