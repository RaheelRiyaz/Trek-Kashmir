import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HotelsService } from 'src/app/Services/hotels.service';
import { GetHotelsComponent } from '../get-hotels/get-hotels.component';
import { GetHotelsResponse, hotels } from 'src/app/Models/HotelModels/get-hotels-response';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puthotel',
  templateUrl: './puthotel.component.html',
  styleUrls: ['./puthotel.component.css']
})
export class PuthotelComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelsService
  ) { }
  id!: string;
  hotel: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      response => {
        this.id = response['id'];
        console.log(this.id);
      },
      error => {
        console.log("can't retrieve ID");
      }
    );

    this.hotelService.getById(this.id).subscribe(
      response => {
        this.hotel = response.result;
      }
    );
  }

  putHotel() {
    this.hotelService.putHotel(this.hotel).subscribe(
      response => {
        console.log(response);
        console.log("Hotel is updated");
        if (response.isSuccess) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Hotel updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/admin/hotels']);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            // title: response.message,
            title: "Error! Hotel can't be updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      errorResponse => {
        console.log(errorResponse);
        console.log("Hotel can't be updated");
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: errorResponse.error.title,
          // title: "Error! Hotel can't be updated\n Try Again",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }


}
