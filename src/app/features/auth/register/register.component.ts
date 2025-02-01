import { Component } from '@angular/core';
import { InputComponent } from "../../../shared/ui/input/input.component";
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthHeadingComponent } from '../auth-heading/auth-heading.component';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [AuthHeadingComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	registerForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.registerForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	onSubmit() {
		if (this.registerForm.valid) {
			console.log(this.registerForm.value);
			// Handle login logic
		}
	}
}
