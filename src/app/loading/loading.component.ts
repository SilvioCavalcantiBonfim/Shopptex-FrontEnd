import { Component } from '@angular/core';
import { StyleService } from '../service/style.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  constructor(private styleService: StyleService){}

  color(){
    return this.styleService.style$;
  }
}
