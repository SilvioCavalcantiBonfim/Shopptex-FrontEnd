import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StyleService } from '../service/style.service';

@Directive({
  selector: '[dynamicBackground]',
  standalone: true,
})
export class DynamicBackgroundDirective implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  private subscription_color: Subscription | undefined;

  constructor(private el: ElementRef, private styleService: StyleService) {}

  ngOnInit(): void {
    this.subscription = this.styleService.style$.subscribe(
      this.apply.bind(this)
    );
    this.subscription_color = this.styleService.color$.subscribe(
      this.applyText.bind(this)
    );
  }

  private apply(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  private applyText(color: string) {
    this.el.nativeElement.style.color = color;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription_color?.unsubscribe();
  }
}
