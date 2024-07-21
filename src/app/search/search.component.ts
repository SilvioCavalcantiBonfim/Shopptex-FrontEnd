import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicBackgroundDirective } from '../directive/dynamic-background.directive';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Subscription } from 'rxjs';
import { SearchService } from '../service/search.service';
import { ShopService } from '../service/shop.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DynamicBackgroundDirective, ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, OnDestroy {

  private sub$: Subscription | undefined;

  searchControl = new FormControl('');

  constructor(private searchService: SearchService, private shopService: ShopService){}

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map((v) => (v === null ? '' : v))
    ).subscribe(v => this.searchService.updateSearch(v));
  }

  placeholderShopName(){
    return this.shopService.currentShop$.pipe(
      map((shop) => `Buscar produtos em ${shop.info.name}...`)
    );
  }
}
