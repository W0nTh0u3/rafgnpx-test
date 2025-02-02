import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() { }

	login(email: string, password: string): Observable<boolean> {
		return of(true);
	}

	register(email: string, password: string): Observable<boolean> {
		return of(true);
	}

}
