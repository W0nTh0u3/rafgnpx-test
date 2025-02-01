import { Component } from '@angular/core';
import { AuthHeadingComponent } from "../auth-heading/auth-heading.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { InputComponent } from '../../../shared/ui/input/input.component';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [AuthHeadingComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	onSubmit() {
		if (this.loginForm.valid) {
			console.log(this.loginForm.value);
			// Handle login logic
		}
	}
}
