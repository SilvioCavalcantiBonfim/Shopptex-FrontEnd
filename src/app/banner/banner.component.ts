import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShopService } from '../service/shop.service';
import { ShopListComponent } from "../shop-list/shop-list.component";
import { LoadingComponent } from "../loading/loading.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { DynamicBackgroundDirective } from '../directive/dynamic-background.directive';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    CommonModule,
    ShopListComponent,
    LoadingComponent,
    CarouselComponent,
    DynamicBackgroundDirective
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnInit {
  constructor(private infoShopService: ShopService) {}

  ngOnInit(): void {
    this.infoShopService.ngOnInit();
  }

  getAllShops() {
    return this.infoShopService.info$;
  }
}
