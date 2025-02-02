import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FavoritesService {
	private favorites$ = new BehaviorSubject<string[]>([]);

	constructor() { }

	toggleFavorite(productId: string): void {
		const currentFavorites = this.favorites$.getValue();
		const isFavorite = this.isFavorite(productId);

		const updatedFavorites = isFavorite
			? currentFavorites.filter(id => id !== productId)
			: [...currentFavorites, productId];

		this.favorites$.next(updatedFavorites);
	}

	isFavorite(productId: string): boolean {
		return this.favorites$.getValue().includes(productId);
	}

	getFavorites(): string[] {
		return this.favorites$.getValue();
	}
}
