import { Component } from '@angular/core';
import { BookingResponse } from 'src/app/Models/BookingsModel/BookingResponse';
import { PackagesResponse } from 'src/app/Models/packages-request';
import { BookingsService } from 'src/app/Services/bookings.service';
import { PackageService } from 'src/app/Services/package.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  constructor(private service: BookingsService, private packageService: PackageService) {}
  bookingResponse : BookingResponse = new BookingResponse();
  bookings! : BookingResponse[];
  packageName!: string;
  packageId!: string;
  // packages! : PackagesResponse[];
  ngOnInit(): void {
    this.service.getMyBookings().subscribe({
      next: (response) => {
        console.log(response);
        this.bookings = response.result;
        console.log(this.bookings);
        for(let booking of this.bookings)
        {
          this.packageId = booking.packageId;
        }
        this.packageService.getpackageByid(this.packageId).subscribe({
          next: (packageResponse) => {
            // console.log(packageResponse);
            // this.packages = packageResponse.result;
            this.packageName = packageResponse.result.name;
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
