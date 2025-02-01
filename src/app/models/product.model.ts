export interface Product {
    type: string;
    name: string;
    price: string | number;
    main_image: string;
    product_images: string[];
    priority: number;
    product_id: string;
    description: string;
    rating: number;
    review_count: number;
    stock: number;
}

export type Products = Product[];