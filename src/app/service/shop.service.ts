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
export class ShopService implements OnInit, OnDestroy{

  private sub$ :Subscription | undefined;

  private apiList: string[] = [
    // 'http://localhost:8080',
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
      lastValueFrom(this.requestData(url))
    );
    this.sub$ = forkJoin(shopRequests).subscribe((responses) => {
      const allShops = responses.flat();
      this.shopSubject.next(allShops);

      this.infoSubject.next(allShops.flat().map((a) => a.info));
    });
  }

  private requestData(url: string): Observable<Shop> {
    return combineLatest([
      this.httpClient.get<Info>(`${url}/info`).pipe(
        catchError((error) => {
          console.error(`Failed to fetch shop info in ${url}.`);
          return of(new Info(url,'#FF0000','Error','Error')); // retorna um objeto Info vazio em caso de erro
        })
      ),
      this.httpClient.get<Product[]>(`${url}/products`).pipe(
        catchError((error) => {
          console.error('Products request failed');
          return of([]); // retorna uma lista de produtos vazia em caso de erro
        })
      ),
    ]).pipe(
      map(([info, products]) => {
        let shop = {
          info: info as Info,
          products: products as Product[],
        } as Shop;
        this.currentShop.next(shop);
        return shop;
      })
    );
  }

  selectShop(index: number): void {
    const shops = this.shopSubject.value;
    if (shops.length > index) {
      this.currentShop.next(shops[index]);
    }
  }
}
