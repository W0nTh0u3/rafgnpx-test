import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { ProductModifyComponent } from '../../../../../shared/ui/product-modify/product-modify.component';
import { ProductService } from '../../../../../core/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../../../../models/product.model';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../../../core/services/favorites.service';
import { CartService } from '../../../../../core/services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-favorites-page',
	standalone: true,
	imports: [ButtonComponent, ProductModifyComponent, CommonModule],
	templateUrl: './favorites-page.component.html',
	styleUrl: './favorites-page.component.scss'
})
export class FavoritesPageComponent implements OnInit {
	type: 'favorite' | 'cart' = 'favorite';
	$product!: Observable<Product | undefined>;
	private destroyRef = inject(DestroyRef);

	constructor(
		private readonly productService: ProductService,
		private readonly favoritesService: FavoritesService,
		private readonly cartService: CartService,
	) { }

	ngOnInit(): void {

	}

	getProduct(productId: string): Observable<Product | undefined> {
		return this.productService.getProductById(productId);
	}

	get favorites(): string[] {
		return this.favoritesService.getFavorites();
	}

	removeFavorite(favorite: string) {
		this.favoritesService.toggleFavorite(favorite);
	}

	addToCart(productId: string) {
		this.cartService.addToCart(productId, 1).pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(success => {
			if (!success) {
				console.warn('Failed to add to cart');
			}
		});
	}

	addAllToCart() {
		this.favorites.forEach(favorite => {
			this.addToCart(favorite);
		});
	}
}
