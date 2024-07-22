import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { StyleService } from './service/style.service';
import { DynamicColorDirective } from './directive/dynamic-color.directive';
import { DynamicBackgroundDirective } from './directive/dynamic-background.directive';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShopService } from './service/shop.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BannerComponent } from './banner/banner.component';
import { BackgroundButtonDirective } from './directive/background-button.directive';
import { CardComponent } from './card/card.component';
import { Product } from './model/product';
import { BehaviorSubject, combineLatest, map, Observable, Subscription } from 'rxjs';
import { fadeInOut } from './animation/fadeInOut';
import { filters } from './filter/filters';
import { Order } from './order/order';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchComponent,
    DynamicColorDirective,
    DynamicBackgroundDirective,
    NavBarComponent,
    CommonModule,
    LoadingComponent,
    ShopListComponent,
    CarouselComponent,
    BannerComponent,
    BackgroundButtonDirective,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInOut],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Shopptex';

  subTitle$: Subscription | undefined;

  filter$ = new BehaviorSubject<string[]>([]);

  sorted$ = new BehaviorSubject<string>('none');

  constructor(
    private styleService: StyleService,
    private shopService: ShopService,
    private searchService: SearchService
  ) {}

  ngOnDestroy(): void {
    this.subTitle$?.unsubscribe();
  }

  ngOnInit(): void {
    this.styleService.ngOnInit();
    this.subTitle$ = this.shopService.currentShop$.subscribe(
      (shop) => (document.title = `Shopptex | ${shop.info.name}`)
    );
  }

  getAllShops() {
    return this.shopService.info$;
  }

  toogleFilter(filterName: string) {
    let filters = this.filter$.value.flat();
    if (filters.includes(filterName)) {
      filters = filters.filter((flt) => flt !== filterName);
    } else {
      filters.push(filterName);
    }
    this.filter$.next(filters);
  }

  enabledFilter(filterName: string): boolean {
    return this.filter$.value.includes(filterName);
  }

  toggleOrderMode(acs: string, dec: string){
    let sorts = ['none', acs, dec];
    let currentSort = acs
    if(sorts.includes(this.sorted$.value)){
      let index = sorts.indexOf(this.sorted$.value);
      currentSort = sorts[(index+1)%sorts.length];
    }
    this.sorted$.next(currentSort);
  }

  products(): Observable<Product[]> {
    return combineLatest([
      this.shopService.currentShop$.pipe(map((shop) => shop.products)),
      this.filter$,
      this.sorted$,
      this.searchService.search$
    ]).pipe(
      map(([products, ftl, ord, label]) =>
        products
          .filter((product) =>
            ftl.every((filterName) => filters[filterName](product)) && product.name.toLowerCase().includes(label.toLowerCase())
          )
          .sort(Order[ord])
      )
    );
  }
}
