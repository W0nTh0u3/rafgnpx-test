import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProductModifyComponent } from '../../../../../shared/ui/product-modify/product-modify.component';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { CartItems } from '../../../../../models/cart.model';
import { CartService } from '../../../../../core/services/cart.service';
import { ProductService } from '../../../../../core/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../../../../models/product.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
	selector: 'app-cart-page',
	standalone: true,
	imports: [CommonModule, MatIconModule, ProductModifyComponent, ButtonComponent, DecimalPipe, RouterLink, FormsModule],
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
	totalAmount: number = 95;
	type: 'cart' | 'favorite' = 'cart';
	promoCode: string = '';
	isPromoCodeValid: boolean = false;
	newTotalPrice: number = 0;

	constructor(
		private readonly cartService: CartService,
		private readonly productService: ProductService
	) { }

	updateQuantity(productId: string, quantity: number): void {
		this.cartService.updateQuantity(productId, quantity);
	}

	removeFromCart(productId: string): void {
		this.cartService.removeFromCart(productId);
	}

	applyPromoCode(): void {
		if (/^DISCOUNT\d{2}$/.test(this.promoCode)) {
			this.isPromoCodeValid = true;
			this.totalPrice.subscribe(totalPrice => {
				const discount = parseInt(this.promoCode.slice(8)) / 100;
				this.newTotalPrice = totalPrice - (totalPrice * discount);
			});
		} else {
			this.isPromoCodeValid = false;
		}
	}

	onPromoCodeChange(event: Event): void {
		if (this.isPromoCodeValid) {
			this.applyPromoCode();
		}
	}

	get cart(): CartItems {
		return this.cartService.getCart();
	}

	get totalPrice(): Observable<number> {
		return this.cartService.$totalPrice;
	}

	getProduct(productId: string): Observable<Product | undefined> {
		return this.productService.getProductById(productId);
	}


}
