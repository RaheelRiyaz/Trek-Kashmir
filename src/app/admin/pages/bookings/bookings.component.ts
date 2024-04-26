import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageBookingResponse } from 'src/app/Models/BookingsModel/PackageBookingResponse';
import { ClientResponse } from 'src/app/Models/ClientResponse';
import { AccountsService } from 'src/app/Services/accounts.service';
import { BookingsService } from 'src/app/Services/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit 
{
  constructor(
    private service: BookingsService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountsService
  ) {}
  client : ClientResponse = new ClientResponse();
  userId! : string;
  packageId!: string;
  packageBookings!: PackageBookingResponse[];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.packageId = response['id'];
      },
    });
    this.service.getBookingBypackageId(this.packageId).subscribe({
      next: (response) => {
        console.log(response);
        if(response.isSuccess)
        {
          this.packageBookings = response.result;
          console.log(this.packageBookings);
          this.userId = response.result[0].userId;
          // console.log(this.userId);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });   
  }
  
  getClient(id:string)
  {
    this.accountService.accountById(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.isSuccess)
        {
          this.client = res.result;
          console.log(this.client);
        }
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
}
