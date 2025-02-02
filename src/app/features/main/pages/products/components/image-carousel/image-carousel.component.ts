import { Component, Input, HostListener } from '@angular/core';

@Component({
	selector: 'app-image-carousel',
	standalone: true,
	imports: [],
	templateUrl: './image-carousel.component.html',
	styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent {
	@Input() images: string[] = [];
	@Input() alt: string = '';

	currentIndex = 0;
	startX = 0;
	currentX = 0;
	isDragging = false;

	// Touch Events
	@HostListener('touchstart', ['$event'])
	onTouchStart(event: TouchEvent) {
		this.startX = event.touches[0].clientX;
		this.isDragging = true;
	}

	@HostListener('touchmove', ['$event'])
	onTouchMove(event: TouchEvent) {
		if (this.isDragging) {
			this.currentX = event.touches[0].clientX;
		}
	}

	@HostListener('touchend')
	onTouchEnd() {
		if (this.isDragging) {
			this.handleSwipeEnd();
		}
	}

	// Mouse Events
	@HostListener('mousedown', ['$event'])
	onMouseDown(event: MouseEvent) {
		event.preventDefault();
		this.startX = event.clientX;
		this.isDragging = true;
	}

	@HostListener('mousemove', ['$event'])
	onMouseMove(event: MouseEvent) {
		if (this.isDragging) {
			event.preventDefault();
			this.currentX = event.clientX;
		}
	}

	@HostListener('mouseup')
	@HostListener('mouseleave')
	onMouseUp() {
		if (this.isDragging) {
			this.handleSwipeEnd();
		}
	}

	private handleSwipeEnd() {
		const swipeDistance = this.currentX - this.startX;
		const minSwipeDistance = 50;

		if (Math.abs(swipeDistance) >= minSwipeDistance) {
			if (swipeDistance > 0) {
				this.previousImage();
			} else {
				this.nextImage();
			}
		}

		this.isDragging = false;
		this.startX = 0;
		this.currentX = 0;
	}

	nextImage() {
		this.currentIndex = (this.currentIndex + 1) % this.images.length;
	}

	previousImage() {
		this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
	}

	selectImage(index: number) {
		if (!this.isDragging) {
			this.currentIndex = index;
		}
	}
}