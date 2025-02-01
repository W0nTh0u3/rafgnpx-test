import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../../../../../models/product.model';
import { ProductCardComponent } from "../components/product-card/product-card.component";

@Component({
	selector: 'app-product-list',
	standalone: true,
	imports: [RouterLink, ProductCardComponent],
	templateUrl: './product-list.component.html',
	styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
	products: Products = [
		{
			"type": "chair",
			"name": "Black Simple Lamp",
			"price": 12.00,
			"main_image": 'https://uratex.com.ph/cdn/shop/files/Classic101beigefront_1200x1200.jpg?v=1705391339',
			"product_images": ['url', 'url', 'url'],
			"priority": 1,
			"product_id": "00000001",
			"description": "Lorem Ipsum...",
			"rating": 4.75,
			"review_count": 50,
			"stock": 5

		},
		{
			"type": "table",
			"name": "Black Simple Table",
			"price": 12.61,
			"main_image": 'https://www.officewarehouse.com.ph/__resources/_web_data_/products/products/images/6885.jpg',
			"product_images": ['url', 'url', 'url'],
			"priority": 1,
			"product_id": "00000002",
			"description": "Lorem Ipsum...",
			"rating": 4.1,
			"review_count": 10,
			"stock": 50
		},
		{
			"type": "armchair",
			"name": "Black Simple Armchair",
			"price": 1.61,
			"main_image": 'url',
			"product_images": ['url', 'url', 'url'],
			"priority": 0,
			"product_id": "00000003",
			"description": "Lorem Ipsum...",
			"rating": 1.1,
			"review_count": 100,
			"stock": 0
		},
		{
			"type": "bed",
			"name": "Black Simple Bed",
			"price": 2.61,
			"main_image": 'url',
			"product_images": ['url', 'url', 'url'],
			"priority": 10,
			"product_id": "00000004",
			"description": "Lorem Ipsum...",
			"rating": 0,
			"review_count": 0,
			"stock": 2
		},
		{
			"type": "chair",
			"name": "White Simple Chair",
			"price": 99.0,
			"main_image": 'url',
			"product_images": ['url', 'url', 'url'],
			"priority": 12,
			"product_id": "00000005",
			"description": "Lorem Ipsum...",
			"rating": 0,
			"review_count": 0,
			"stock": 0
		},
		{
			"type": "table",
			"name": "White Simple Table",
			"price": 80.0,
			"main_image": 'url',
			"product_images": ['url', 'url', 'url'],
			"priority": 0,
			"product_id": "00000006",
			"description": "Lorem Ipsum...",
			"rating": 5.0,
			"review_count": 1000,
			"stock": 2
		},
		{
			"type": "armchair",
			"name": "White Simple Armchair",
			"price": 1000000.50,
			"main_image": 'url',
			"product_images": ['url', 'url', 'url'],
			"priority": 0,
			"product_id": "00000007",
			"description": "Lorem Ipsum...",
			"rating": 3.0,
			"review_count": 1,
			"stock": 1
		},
		{
			"type": "armchair",
			"name": "White Simple Armchair",
			"price": 1000000.50,
			"main_image": 'url',
			"product_images": ['url', 'url', 'url'],
			"priority": 0,
			"product_id": "00000008",
			"description": "Lorem Ipsum...",
			"rating": 3.0,
			"review_count": 1,
			"stock": 1
		},
		{
			"type": "armchair",
			"name": "White Simple Armchair",
			"price": 1000000.50,
			"main_image": 'url',
			"product_images": ['url', 'url', 'url'],
			"priority": 0,
			"product_id": "00000009",
			"description": "Lorem Ipsum...",
			"rating": 3.0,
			"review_count": 1,
			"stock": 1
		},
		{
			"type": "armchair",
			"name": "White Simple Armchair",
			"price": 1000000.50,
			"main_image": 'url',
			"product_images": ['url', 'url', 'url'],
			"priority": 0,
			"product_id": "00000010",
			"description": "Lorem Ipsum...",
			"rating": 3.0,
			"review_count": 1,
			"stock": 1
		}

	];
}
