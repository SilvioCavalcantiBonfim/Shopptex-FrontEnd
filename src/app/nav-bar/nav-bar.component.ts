import { Component } from '@angular/core';
import { DynamicBackgroundDirective } from '../directive/dynamic-background.directive';
import { ShopService } from '../service/shop.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DynamicBackgroundDirective, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private shopService: ShopService) {}

  shopInfo() {
    return this.shopService.currentShop$;
  }

  owner() {
    return this.shopInfo().pipe(
      map((shop) => this.abbreviate(shop.info.owner))
    );
  }

  private abbreviate(name: string): string {
    const parts = name.split(' ');
    if (parts.length <= 2) return name;

    const abbreviatedMiddleNames = parts
      .slice(1, -1)
      .reduce((acc, part) => acc + ` ${part[0]}.`, '');
    return `${parts[0]}${abbreviatedMiddleNames} ${parts[parts.length - 1]}`;
  }
}
