import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageResponse } from 'src/app/Models/Package/PackageResponse';
import { BookingsService } from 'src/app/Services/bookings.service';
import { PackageService } from 'src/app/Services/package.service';

@Component({
  selector: 'app-g-bookings',
  templateUrl: './g-bookings.component.html',
  styleUrls: ['./g-bookings.component.css']
})
export class GBookingsComponent implements OnInit {
  constructor(
    private service: BookingsService,
    private activatedRoute: ActivatedRoute,
    private packageService: PackageService
  ) { }
  package! : PackageResponse; // package reponse model
  packageId!: string;
  bookings: any;
  userName! : string;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.packageId = response['id'];
      },
    });
    this.service.getBookingBypackageId(this.packageId).subscribe({
      next: (response) => {
        console.log(response);
        this.userName = response.result[0].userName;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.packageService.getpackageByid(this.packageId).subscribe({
      next: (res) => {
        console.log(res);
        this.package = res.result;
        console.log(this.package);
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
}
