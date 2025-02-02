import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { Product } from '../../../../../models/product.model';
import { ProductService } from '../../../../../core/services/product.service';
import { ImageCarouselComponent } from '../components/image-carousel/image-carousel.component';
import { QuantityControlComponent } from '../../../../../shared/ui/quantity-control/quantity-control.component';
import { FavoritesService } from '../../../../../core/services/favorites.service';
import { CartService } from '../../../../../core/services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-product-detail',
	standalone: true,
	imports: [AsyncPipe, NgIf, MatIconModule, ButtonComponent, DecimalPipe, ImageCarouselComponent, QuantityControlComponent],
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
	product$: Observable<Product | undefined>;
	quantity = 1;
	private destroyRef = inject(DestroyRef);

	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private favoritesService: FavoritesService,
		private cartService: CartService,
		private router: Router
	) {
		this.product$ = this.route.params.pipe(
			switchMap(params => this.productService.getProductById(params['id']))
		);
	}

	ngOnInit() { }

	setQuantity($event: number) {
		this.quantity = $event;
	}

	goBack() {
		this.router.navigate(['/main/products']);
	}

	addToCart(productId: string) {
		this.cartService.addToCart(productId, this.quantity).pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(success => {
			if (success) {
				this.router.navigate(['/main']);
			} else {
				console.warn('Failed to add to cart');
			}
		});
	}


	toggleFavorite(productId: string) {
		this.favoritesService.toggleFavorite(productId);
	}

	isFavorite(productId: string) {
		return this.favoritesService.isFavorite(productId);
	}

	variantCheck(productId: string) {
		return this.isFavorite(productId) ? 'primary' : 'secondary';
	}
}
