import { Injectable } from '@angular/core';
import { CartItems } from '../../models/cart.model';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	private cartItems = new BehaviorSubject<CartItems>([]);

	$cartItemsCount = this.cartItems.pipe(
		map((cartItems) => cartItems.reduce((total, item) => total + item.quantity, 0))
	);

	$totalPrice!: Observable<number>;

	constructor(private productService: ProductService) {
		this.$totalPrice = combineLatest([this.cartItems, this.productService.getProducts()]).pipe(
			map(([cartItems, products]) => {
				return cartItems.reduce((total, cartItem) => {
					const product = products.find(p => p.product_id === cartItem.product_id);
					return total + (cartItem.quantity * Number(product?.price ?? 0));
				}, 0);
			})
		);
	}

	addToCart(productId: string, quantity: number): Observable<boolean> {
		return this.productService.getProductById(productId).pipe(
			switchMap((product) => {
				if (!product) {
					return of(false);
				}

				const currentItems = this.cartItems.getValue();
				const existingItem = currentItems.find(item => item.product_id === productId);

				if (!existingItem) {
					this.cartItems.next([...currentItems, { product_id: productId, quantity }]);
					return of(true);
				}

				if ((existingItem.quantity + quantity) > product.stock) {
					return of(false); // Cannot add more than available stock
				}
				const updatedItems = currentItems.map(item =>
					item.product_id === productId ? { ...item, quantity: item.quantity + quantity } : item
				);
				this.cartItems.next(updatedItems);

				return of(true);
			})
		)
	}

	updateQuantity(productId: string, quantity: number): void {
		const currentItems = this.cartItems.getValue();
		const updatedItems = currentItems.map(item =>
			item.product_id === productId ? { ...item, quantity } : item
		);
		this.cartItems.next(updatedItems);
	}

	removeFromCart(productId: string): void {
		const currentItems = this.cartItems.getValue();
		const updatedItems = currentItems.filter(item => item.product_id !== productId);
		this.cartItems.next(updatedItems);
	}

	getCart(): CartItems {
		return this.cartItems.getValue();
	}

	getCartTotal(): number {
		return this.cartItems.getValue().reduce((total, item) => total + item.quantity, 0);
	}
}

