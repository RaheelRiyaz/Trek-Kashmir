import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type } from 'jquery';
import { Cart } from 'src/app/Models/cart';
import { CartItemEmitterService } from 'src/app/Services/cartItemEmitterService';
import { TrekinggearsService } from 'src/app/Services/trekinggears.service';
import { environment } from 'src/environments/environment';
declare var Razorpay: any;
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TrekinggearsService,
    private cartService: CartItemEmitterService
  ) {}
  id!: string;
  mycart: any = localStorage.getItem('gear-cart')
    ? JSON.parse(localStorage['gear-cart'])
    : [];
  baseUrl: string = environment.baseImagePath;
  isInCart: boolean = false;
  product: any;
  quantity: number = 1;
  addItemToCart() {
    if (!this.isInCart) {
      let myItem = new Cart(
        this.product.id,
        this.quantity,
        this.product.filePath,
        this.product.pricePerDay,
        this.product.name
      );
      this.mycart.push(myItem);
    } else {
      let index = this.mycart.findIndex((x: any) => x.id === this.product.id);
      this.mycart.splice(index, 1);
    }
    localStorage.setItem('gear-cart', JSON.stringify(this.mycart));
    this.cartService.cartItemCountEmitter.emit(this.mycart.length); // Send data to the service
    this.getGear();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      },
    });
    this.getGear();
  }

  getGear(): void {
    this.service.getTrekingGearsById(this.id).subscribe({
      next: (response) => {
        console.log(response);

        this.product = response.result;
        this.isInCart = this.isProductAlreadyInCart(response.result.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  changeImage(e: any, main: any) {
    main.src = e.target.src;
  }
  isProductAlreadyInCart(id: string) {
    return this.mycart.some((cart: any) => cart.id === id);
  }
  changeQuantity(e: any) {
    this.quantity = Number(e.target.value);
  }
  options = {
    // May Get RazorPayKey from Backend api which is much safer
    key: environment.razorPayKey,
    amount: 0,
    currency: 'INR',
    name: 'Trek De Kashmir',
    description: '',
    image:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bikatadventures.com%2FHome%2FItinerary%2Fkashmir-great-lakes-trek&psig=AOvVaw3MYSOgV1zj8lwD_Mk8kYfi&ust=1694954929506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMDsuqeVr4EDFQAAAAAdAAAAABAD',
    order_id: '',

    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },

    prefill: {
      //using the prefill parameter to auto-fill customer's contact information, especially their phone number
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };
  payNow() {
    let rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.error', function (response: any) {
      alert('errrrrrr');
    });
  }
}
