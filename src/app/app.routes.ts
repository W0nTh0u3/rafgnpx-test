import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./landing/landing.routes').then((m) => m.LANDING_ROUTES),
	},
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES)
	},
	{
		path: 'main',
		loadChildren: () => import('./features/main/main.routes').then((m) => m.MAIN_ROUTES)
	},
];
