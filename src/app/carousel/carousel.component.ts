import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { fadeInOut } from '../animation/fadeInOut';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  animations: [fadeInOut],
})
export class CarouselComponent implements OnInit, OnDestroy {
  images: string[] = ['sale-1.png', 'sale-2.png', 'sale-3.png'];
  currentIndex: number = 0;
  private autoSlideSub: Subscription | undefined;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideSub = interval(5000).subscribe(() => {
      this.next();
    });
  }

  stopAutoSlide() {
    this.autoSlideSub?.unsubscribe();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
