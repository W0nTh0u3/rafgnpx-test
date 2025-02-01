import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categories, Products } from '../../../../../models/product.model';
import { ProductCardComponent } from "../components/product-card/product-card.component";
import { PRODUCTS_MOCK } from '../../../../../mock/products.mock';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../../../../core/services/product.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-product-list',
	standalone: true,
	imports: [RouterLink, ProductCardComponent, MatIconModule, CommonModule],
	templateUrl: './product-list.component.html',
	styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
	products: Products = PRODUCTS_MOCK;
	activeCategory: string = 'popular';

	categories: Categories = [
		{ id: 'popular', icon: 'star', name: 'Popular' },
		{ id: 'chair', icon: 'chair', name: 'Chair' },
		{ id: 'table', icon: 'table', name: 'Table' },
		{ id: 'armchair', icon: 'sofa', name: 'Armchair' },
		{ id: 'bed', icon: 'bed', name: 'Bed' }
	];

	constructor(
		private productService: ProductService
	) { }

	$products: Observable<Products> = of([]);

	ngOnInit(): void {
		this.loadProducts();
	}

	loadProducts() {
		this.$products = this.productService.getProductsByCategory(this.activeCategory);
	}

	setActiveCategory(categoryId: string) {
		this.activeCategory = categoryId;
	}
}
