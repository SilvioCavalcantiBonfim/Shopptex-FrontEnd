import { Component, Input } from '@angular/core';
import { Product } from '../model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() product!: Product;

  currentPrice(){
    return this.product.is_promotion ? this.product.price * 0.8 : this.product.price;
  }
}
