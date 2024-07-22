import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  forkJoin,
  lastValueFrom,
  map,
  Observable,
  of,
  Subscription
} from 'rxjs';
import { nullShop, Shop } from '../model/shop';
import { HttpClient } from '@angular/common/http';
import { Info } from '../model/info';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService implements OnInit, OnDestroy {
  private sub$: Subscription | undefined;

  private apiList: string[] = [
    'http://localhost:8080',
    'http://localhost:3000',
  ];

  private shopSubject = new BehaviorSubject<Shop[]>([]);
  private currentShop = new BehaviorSubject<Shop>(nullShop);
  currentShop$ = this.currentShop.asObservable();

  private infoSubject = new BehaviorSubject<Info[]>([]);
  info$ = this.infoSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadShops();
  }

  private loadShops(): void {
    const shopRequests = this.apiList.map((url) =>
      this.requestData(url)
    );

    shopRequests.forEach(requestObservable => {
      requestObservable.subscribe(shop => this.addShop(shop))
    })
  }

  private addShop(shop: Shop): void{
    if(this.currentShop.value === nullShop)
      this.currentShop.next(shop);
    let infos: Info[] = [shop.info, ...this.infoSubject.value];
    this.infoSubject.next(infos);
    let shops: Shop[] = [shop, ...this.shopSubject.value];
    this.shopSubject.next(shops);
  }

  private requestData(url: string): Observable<Shop> {
    return combineLatest([
      this.httpClient.get<Info>(`${url}/info`).pipe(
        catchError((error) => {
          console.error(`Failed to fetch shop info in ${url}.`);
          return of(new Info(url, '#FF0000', 'Error', 'Error')); // retorna um objeto Info vazio em caso de erro
        })
      ),
      this.httpClient.get<Product[]>(`${url}/products`).pipe(
        catchError((error) => {
          console.error('Products request failed');
          return of([]); // retorna uma lista de produtos vazia em caso de erro
        })
      ),
    ]).pipe(
      map(([info, products]) => ({info, products}))
    );
  }

  selectShop(index: number): void {
    const shops = this.shopSubject.value;
    if (shops.length > index) {
      this.currentShop.next(shops[index]);
    }
  }
}
