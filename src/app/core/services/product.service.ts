import { Injectable } from '@angular/core';
import { Product, Products } from '../../models/product.model';
import { Observable, of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../mock/products.mock';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private readonly products: Products = PRODUCTS_MOCK;
	private readonly POPULAR_RATING_THRESHOLD = 4;

	constructor() { }
	getProducts(): Observable<Products> {
		return of(this.products);
	}

	getProductsByCategory(category: string): Observable<Products> {
		const filteredProducts = this.products.filter(product => {
			//? Filter by category (popular, chair, table, armchair, bed, lamp)
			if (category === 'popular') {
				return (product.rating || 0) >= this.POPULAR_RATING_THRESHOLD;
			}
			return product.type === category;
		});
		return of(this.sortProducts(filteredProducts));
	}

	private sortProducts(products: Product[]): Product[] {
		return products.sort((a, b) => {
			//? First sort by priority (lower first)
			const priorityDiff = (a.priority || 0) - (b.priority || 0);
			if (priorityDiff !== 0) return priorityDiff;

			//? Then sort alphabetically by name
			return a.name.localeCompare(b.name);
		});
	}

	getProductById(id: string): Observable<Product | undefined> {
		const product = this.products.find(p => p.product_id === id);
		return of(product);
	}

	// TODO: search products will remove if not implemented
	searchProducts(query: string): Observable<Product[]> {
		const searchResults = this.products.filter(product =>
			product.name.toLowerCase().includes(query.toLowerCase()) ||
			product.description?.toLowerCase().includes(query.toLowerCase())
		);
		return of(searchResults);
	}

}
