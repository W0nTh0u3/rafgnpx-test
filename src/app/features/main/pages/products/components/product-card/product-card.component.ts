import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../models/product.model';
import { DecimalPipe } from '@angular/common';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'product-card',
	standalone: true,
	imports: [DecimalPipe, ButtonComponent, MatIconModule],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
	@Input() product: Partial<Product> = {};
	addToCart(product: Partial<Product>) {
		console.log('add to cart', product);
	}
}
