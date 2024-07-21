import { Component, Input } from '@angular/core';
import { StyleService } from '../service/style.service';
import { Info } from '../model/info';
import { fadeInOut } from '../animation/fadeInOut';
import { ShopService } from '../service/shop.service';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.css',
  animations: [fadeInOut]
})
export class ShopListComponent {
  @Input()
  info!: Info;

  @Input()
  index!: number;

  constructor(private shopSerice: ShopService){}

  select(){
    this.shopSerice.selectShop(this.index);
  }
}
