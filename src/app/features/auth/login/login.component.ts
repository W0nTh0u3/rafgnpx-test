import { Component } from '@angular/core';
import { AuthHeadingComponent } from "../auth-heading/auth-heading.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, interval, takeWhile } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [AuthHeadingComponent, InputComponent, ButtonComponent, ReactiveFormsModule, AsyncPipe],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	loginForm: FormGroup;
	incorrectAttempts: number = 0;
	isLocked = false;
	remainingTime = 0;
	private timerId?: number;
	private readonly MAX_ATTEMPTS = 3;
	private readonly LOCKOUT_TIME = 60;

	constructor(
		private fb: FormBuilder,
		private router: Router,
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}

	startLockoutTimer(): void {
		this.isLocked = true;
		this.remainingTime = this.LOCKOUT_TIME;

		this.timerId = window.setInterval(() => {
			this.remainingTime--;

			if (this.remainingTime <= 0) {
				this.isLocked = false;
				this.incorrectAttempts = 0;
				this.remainingTime = 0;
				clearInterval(this.timerId);
			}
		}, 1000);
	}


	onSubmit() {
		if (this.loginForm.valid && !this.isLocked) {
			if (this.loginForm.get('password')?.value === 'Testpassw0rd!') {
				this.incorrectAttempts = 0;
				this.router.navigate(['/main']);
			} else {
				this.incorrectAttempts++;
				if (this.incorrectAttempts >= this.MAX_ATTEMPTS) {
					this.startLockoutTimer();
				}
			}
		}
	}

	ngOnDestroy(): void {
		if (this.timerId) {
			clearInterval(this.timerId);
		}
	}
}
