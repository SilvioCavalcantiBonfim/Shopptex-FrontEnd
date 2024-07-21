import { Component } from '@angular/core';
import { DynamicBackgroundDirective } from '../directive/dynamic-background.directive';
import { ShopService } from '../service/shop.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DynamicBackgroundDirective, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private shopService: ShopService){}

  shopInfo(){
    return this.shopService.currentShop$;
  }
}
