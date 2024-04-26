import { Component } from '@angular/core';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.css']
})
export class PaymentsPageComponent {

    handler(response:any){
          console.log(response.razorpay_payment_id);
          console.log(response.razorpay_order_id);
          console.log(response.razorpay_signature);
          //service call to insert payment in database
          alert("success");
          console.log("success")
        }


}
