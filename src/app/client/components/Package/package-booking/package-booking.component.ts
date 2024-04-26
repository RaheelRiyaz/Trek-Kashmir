import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppOrderResponse } from 'src/app/Models/appOrderResponse';
import { PackageService } from 'src/app/Services/package.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var Razorpay: any;
@Component({
  selector: 'app-package-detail',
  templateUrl: './package-booking.component.html',
  styleUrls: ['./package-booking.component.css'],
})
export class PackageBookingComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PackageService
  ) {}
  packageDetails: any;
  packageId!: string;
  showLoader: boolean = true;
  appOrderResponse!:AppOrderResponse;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.packageId = response['id'];
      },
    });
    this.service.getpackageByid(this.packageId).subscribe({
      next: (response) => {
        console.log(response);
        
        this.showLoader = false;
        this.packageDetails = response.result;
      },
      error: (err) => {
        console.log(err);
        this.showLoader = false;
      },
    });
  }


  options = {
    // May Get RazorPayKey from Backend api which is much safer
    key: environment.razorPayKey,
    amount:0,
    currency: 'INR',
    name: 'Trek De Kashmir',
    description:'',
    image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bikatadventures.com%2FHome%2FItinerary%2Fkashmir-great-lakes-trek&psig=AOvVaw3MYSOgV1zj8lwD_Mk8kYfi&ust=1694954929506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMDsuqeVr4EDFQAAAAAdAAAAABAD',
    order_id:  '',

   "handler":function (response:any){
    var event= new CustomEvent("payment.success",{detail:response,bubbles:true,cancelable:true});
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
  bookPackage(){
    this.service.bookPackage(this.packageId).subscribe({
      next: (response) => {
        this.showLoader = false;
       if(!response.isSuccess){
        if(response.statusCode === HttpStatusCode.AlreadyReported){
          this.Toast.fire({
            icon: 'error',
            title: 'Booking already done',
          })
        }
        return;
       }
       this.appOrderResponse=response.result;
        this.options.amount=this.appOrderResponse.amount;
        this.options.description= this.appOrderResponse.description;
        this.options.order_id=this.appOrderResponse.orderId;

        this.options.prefill.name= this.appOrderResponse.name;
        this.options.prefill.email= this.appOrderResponse.email;
        this.options.prefill.contact= this.appOrderResponse.contact;

        this.options.notes.address=this.appOrderResponse.address;

         // May Get RazorPayKey from Backend api which is much safer
        this.payNow();
      },
      error: (err) => {
        console.log(err);
        this.showLoader = false;
      },
    });
  }
  payNow() {
    let rzp1=new Razorpay(this.options);
    rzp1.open()
    rzp1.on('payment.error',function(response:any){
        alert("errrrrrr");
    })
  }


  @HostListener('window:payment.success',['$event'])
  onPaymentSuccess(response:any):void{
    let data=response.detail;
     let paymentOptions={
      razorpay_payment_id : data.razorpay_payment_id,
      razorpay_order_id:   data.razorpay_order_id,
      razorpay_signature:  data.razorpay_signature
     }
     this.service.CapturePaymentDetails(paymentOptions).subscribe(res=>{
      this.Toast.fire({
        icon: 'success',
        title: 'Booking done Successfully',
      })
     })
  }

}
