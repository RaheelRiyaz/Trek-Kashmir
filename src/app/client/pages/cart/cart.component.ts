import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/Models/api-response';
import { Cart } from 'src/app/Models/cart';
import { CartItemEmitterService } from 'src/app/Services/cartItemEmitterService';
import { TrekinggearsService } from 'src/app/Services/trekinggears.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(
    private service: TrekinggearsService,
    private cartEmitterService: CartItemEmitterService
  ) {}
  showErrorMessage: boolean = false;
  mycart!: Cart[];
  baseUrl: string = environment.baseImagePath;
  ngOnInit(): void {
    this.mycart = localStorage.getItem('gear-cart')
      ? JSON.parse(localStorage['gear-cart'])
      : [];
  }

  removeFromCart(i: number): void {
    this.mycart.splice(i, 1);
    localStorage.setItem('gear-cart', JSON.stringify(this.mycart));
    this.cartEmitterService.cartItemCountEmitter.emit(this.mycart.length);
    this.ngOnInit();
  }

  changeQuantity(i: number, e: any) {
    if (e.target.value && e.target.value > 0 && e.target.value <= 10) {
      this.showErrorMessage = false;
      this.mycart[i].quantity = Number(e.target.value);
      localStorage.setItem('gear-cart', JSON.stringify(this.mycart));
      this.subTotal();
    } else {
      this.showErrorMessage = true;
    }
  }
  subTotal(): number {
    let total = 0;
    this.mycart.map((x) => (total += x.pricePerDay * x.quantity));
    return total;
  }
}
