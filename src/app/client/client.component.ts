import { Component } from '@angular/core';
import { CartItemEmitterService } from '../Services/cartItemEmitterService';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent {
  mycart: any = localStorage.getItem('gear-cart')
    ? JSON.parse(localStorage['gear-cart'])
    : [];
  // cartItemCount: number = this.mycart.length;
  constructor(private cartService: CartItemEmitterService) {}
  ngOnInit(): void {
    // this.cartService.cartItemCountEmitter.subscribe((count) => {
    //   console.log(count);
    //   this.cartItemCount = count;
    // });
  }
}
