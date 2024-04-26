// shared.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartItemEmitterService {
  cartItemCountEmitter: EventEmitter<number> = new EventEmitter<number>();
  profileChanged: EventEmitter<any> = new EventEmitter<any>();
}
