import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout.component";

export const MAIN_ROUTES: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				path: '',
				redirectTo: 'products',
				pathMatch: 'full'
			},
			{
				path: 'products',
				loadChildren: () => 
					import('./pages/products/products.routes').then(m => m.PRODUCTS_ROUTES)
			},
			{
				path: 'favorites',
				loadComponent: () => 
					import('./pages/favorites/favorites-page/favorites-page.component').then(m => m.FavoritesPageComponent)
			},
		]
	},
	{
		path: 'product/:id',
		loadComponent: () => 
			import('./pages/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
	},
	{
		path: 'cart',
		loadChildren: () => 
			import('./pages/cart/cart.routes').then(m => m.CART_ROUTES)
	}
];
