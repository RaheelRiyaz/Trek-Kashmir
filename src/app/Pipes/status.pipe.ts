import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingStatus'
})
export class BookingStatusPipe implements PipeTransform {

  transform(bookingStatus: number): string {
    if(bookingStatus == 1) return 'Pending';
    else if(bookingStatus == 2) return 'Accepted';
    else if(bookingStatus == 3) return 'Rejected';
    else if(bookingStatus == 4) return 'Cancelled';
    else if(bookingStatus == 5) return 'Waiting';
    else return 'Completed';
  }

}

@Pipe({
  name: 'appPaymentStatus'
})
export class AppPaymentStatusPipe implements PipeTransform {

  transform(appPaymentStatus: number): string {
    if(appPaymentStatus == 1) return 'Created';
    else if(appPaymentStatus == 2) return 'Authorized';
    else if(appPaymentStatus == 3) return 'Captured';
    else if(appPaymentStatus == 4) return 'Refunded';
    else return 'Failed';
    
  }
}

@Pipe({
  name: 'paymentMethod'
})
export class PaymentMethodPipe implements PipeTransform {

  transform(paymentMethod: number): string {
    if(paymentMethod == 1) return 'Card';
    else if(paymentMethod == 2) return 'UPI';
    else if(paymentMethod == 3) return 'NetBanking';
    else return 'Wallet'
     
  }
}

// public enum PaymentMethod
// {
//     Card = 1,
//     UPI = 2,
//     NetBanking = 3,
//     Wallet = 4,
//     //EMI = 5
// }

// public enum AppPaymentStatus
// {
//     Created = 1,
//     Authorized = 2,
//     Captured = 3,
//     Refunded = 4,
//     Failed = 5
// }

// public enum BookingStatus
// {
//     Pending = 1,
//     Accepted = 2,
//     Rejected = 3,
//     Cancelled = 4,
//     Waiting = 5,
//     Completed = 6
// }
