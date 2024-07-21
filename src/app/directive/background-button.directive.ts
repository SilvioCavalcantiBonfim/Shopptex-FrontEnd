import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { StyleService } from '../service/style.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[backgroundButton]',
  standalone: true,
})
export class BackgroundButtonDirective implements OnInit, OnDestroy {
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
  apply(color: string) {
    this.el.nativeElement.style.setProperty('--button-background', color);
  }

  applyText(color: string) {
    this.el.nativeElement.style.setProperty('--button-color', color);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription_color?.unsubscribe();
  }
}
