import { Injectable } from '@angular/core';
import { Product, Products } from '../../models/product.model';
import { Observable, of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../mock/products.mock';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private products: Products = PRODUCTS_MOCK;

	constructor() { }
	getProducts(): Observable<Products> {
		return of(this.products);
	}

	getProductsByCategory(category: string): Observable<Products> {
		// const filteredProducts = this.products.filter(product => 
		//   category === 'popular' ? product.category === 'popular' : product.category === category
		// );
		const filteredProducts = this.products; // TODO: filter by category
		return of(filteredProducts);
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
