import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "../../../../../shared/ui/button/button.component";

@Component({
	selector: 'app-success-page',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './success-page.component.html',
	styleUrl: './success-page.component.scss'
})
export class SuccessPageComponent {
	constructor(private router: Router) { }

	onBackToHome(): void {
		this.router.navigate(['/main']);
	}
}
