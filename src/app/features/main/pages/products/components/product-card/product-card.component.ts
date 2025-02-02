import { Component, DestroyRef, inject, Input } from '@angular/core';
import { Product } from '../../../../../../models/product.model';
import { DecimalPipe } from '@angular/common';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CartService } from '../../../../../../core/services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'product-card',
	standalone: true,
	imports: [DecimalPipe, ButtonComponent, MatIconModule],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
	@Input() product: Partial<Product> = {};
	private destroyRef = inject(DestroyRef);

	constructor(private router: Router,
		private cartService: CartService,
	) { }

	addToCart(product: Partial<Product>) {
		this.cartService.addToCart(product.product_id ?? '', 1).pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(success => {
			if (success) {
				this.router.navigate(['/main']);
			} else {
				console.warn('Failed to add to cart');
			}
		});
	}

	navigateToProduct(product: Partial<Product>) {
		this.router.navigate(['/main/product', product.product_id]);
	}
}

