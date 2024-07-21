import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root',
})
export class StyleService implements OnInit, OnDestroy {
  private sub$: Subscription | undefined;

  private styleSubject = new BehaviorSubject<string>('#DE7B29');
  private colorSubject = new BehaviorSubject<string>('#ffffff');
  style$ = this.styleSubject.asObservable();
  color$ = this.colorSubject.asObservable();

  constructor(private shopService: ShopService) {}

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub$ = this.shopService.currentShop$.subscribe((shop) => {
      this.updateStyle(shop.info.color);
    });
  }

  private updateStyle(newStyle: string) {
    this.styleSubject.next(newStyle);
    this.colorSubject.next(this.textColor(newStyle));
  }

  private textColor(color: string) {
    const rgb = this.hexToRgb(color);
    var lum = 0;
    if (rgb) {
      lum = this.luminance(rgb.r, rgb.g, rgb.b);
    }
    return lum > 0.5 ? '#000000' : '#ffffff';
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  }

  private luminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map((value) => {
      value /= 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
}
