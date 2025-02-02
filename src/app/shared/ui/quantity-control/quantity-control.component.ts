import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'es-quantity-control',
	standalone: true,
	imports: [DecimalPipe, ButtonComponent, MatIconModule],
	templateUrl: './quantity-control.component.html',
	styleUrl: './quantity-control.component.scss'
})
export class QuantityControlComponent {
	@Input() quantity = 1;
	@Input() maxQuantity = 0;
	@Output() quantityChange = new EventEmitter<number>();

	ngOnInit() {
		this.quantity = this.maxQuantity < 1 ? 0 : this.quantity;
	}

	increaseQuantity() {
		if (this.quantity < this.maxQuantity) {
			this.quantity++;
			this.quantityChange.emit(this.quantity);
		}
	}

	decreaseQuantity() {
		if (this.quantity > 1) {
			this.quantity--;
			this.quantityChange.emit(this.quantity);
		}
	}

}
