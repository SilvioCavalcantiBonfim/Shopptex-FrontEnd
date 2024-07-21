import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StyleService } from '../service/style.service';

@Directive({
  selector: '[dynamicColor]',
  standalone: true,
})
export class DynamicColorDirective implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;

  constructor(private el: ElementRef, private styleService: StyleService) {}

  ngOnInit(): void {
    this.subscription = this.styleService.style$.subscribe(
      this.apply.bind(this)
    );
  }

  private apply(color: string) {
    this.el.nativeElement.style.color = color;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
