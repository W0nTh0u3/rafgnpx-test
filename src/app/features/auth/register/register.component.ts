import { Component } from '@angular/core';
import { InputComponent } from "../../../shared/ui/input/input.component";
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthHeadingComponent } from '../auth-heading/auth-heading.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [AuthHeadingComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	registerForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router
	) {
		this.registerForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
			confirmPassword: ['', [Validators.required]],
		}, { validators: this.passwordMatchValidator });
	}

	private passwordValidator() {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value;

			if (!value) {
				return null;
			}

			const hasUpperCase = /[A-Z]/.test(value);
			const hasNumber = /[0-9]/.test(value);
			const hasSpecialChar = /[!@#$%^&()_+\-=\[\]{};':"\\|,.<>?/]/.test(value);
			const hasAsterisk = /[*]/.test(value);
			const hasMinLength = value.length >= 8;

			const passwordValid = hasUpperCase &&
				hasNumber &&
				hasSpecialChar &&
				!hasAsterisk &&
				hasMinLength;

			return !passwordValid ? {
				passwordRequirements: {
					hasUpperCase,
					hasNumber,
					hasSpecialChar,
					hasAsterisk,
					hasMinLength
				}
			} : null;
		};
	}

	private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
		const password = control.get('password');
		const confirmPassword = control.get('confirmPassword');

		if (password && confirmPassword && password.value !== confirmPassword.value) {
			confirmPassword.setErrors({ passwordMismatch: true });
			return { passwordMismatch: true };
		}

		return null;
	}


	onSubmit() {
		if (this.registerForm.valid) {
			this.router.navigate(['/main']);
		}
	}
}
