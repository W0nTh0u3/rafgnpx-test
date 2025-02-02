import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ButtonComponent } from "../button/button.component";
import { MatIconModule } from '@angular/material/icon';
import { QuantityControlComponent } from "../quantity-control/quantity-control.component";

@Component({
	selector: 'es-product-modify',
	standalone: true,
	imports: [DecimalPipe, ButtonComponent, MatIconModule, QuantityControlComponent],
	templateUrl: './product-modify.component.html',
	styleUrl: './product-modify.component.scss'
})
export class ProductModifyComponent {

	@Input() product: Product | undefined | null;
	@Input() quantity: number = 1;
	@Input() type: 'favorite' | 'cart' = 'cart';
	@Input() maxQuantity: number = 1;

	@Output() close = new EventEmitter<void>();
	@Output() addToCart = new EventEmitter<Product | undefined | null>();
	@Output() quantityChange = new EventEmitter<number>();

	onClose(): void {
		this.close.emit();
	}

	onAddToCart(product: Product | undefined | null): void {
		this.addToCart.emit(product);
	}

	onQuantityChange($event: number) {
		this.quantityChange.emit($event);
	}
}
