import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GetHotelsResponse,
  hotels,
} from 'src/app/Models/HotelModels/get-hotels-response';
import { HotelsService } from 'src/app/Services/hotels.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-hotels',
  templateUrl: './get-hotels.component.html',
  styleUrls: ['./get-hotels.component.css'],
})
export class GetHotelsComponent implements OnInit {
  constructor(
    private hotelService: HotelsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  hotelsResponse: GetHotelsResponse = new GetHotelsResponse();
  hotels: hotels[] = [];
  showLoader: boolean = true;
  ngOnInit(): void {
    $(document).ready(function () {
      $('#left').click(function () {
        var tmp = $('.active');
        $(tmp).removeClass('active');
        if ($(tmp).is(':first-child')) {
          $('#last').addClass('active');
        } else {
          $(tmp).prev().addClass('active');
        }
      });

      $('#right').click(function () {
        var tmp = $('.active');
        $(tmp).removeClass('active');
        if ($(tmp).is(':last-child')) {
          $('#first').addClass('active');
        } else {
          $(tmp).next().addClass('active');
        }
      });
    });
    this.getHotelsFun();
  }
  getHotelsFun() {
    this.hotelService.getHotels().subscribe(
      (response) => {
        this.showLoader = false;
        console.log(response);
        this.hotelsResponse = response;
        this.hotels = response.result!;
        console.log(this.hotelsResponse);
        console.log(this.hotels);
      },
      (error) => {
        console.log(error);
        console.log("can't retrieve hotels");
      }
    );
  }
  // Delete Hotel Confirmation Swal

  deleteHotel(id: any) {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelService.deleteHotel(id).subscribe(
          (response) => {
            console.log(response);
            console.log('Hotel is deleted');
            if (response.message == 'Success') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Hotel deleted',
                showConfirmButton: false,
                timer: 1500,
              });
              this.router.navigate(['/admin/hotels']);
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Some error occured\nHotel can't be deleted",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          },
          (error) => {
            console.log("Hotel can't be deleted because of the error below");
            console.log(error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: "Hotel can't be deleted\nThere is some error",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }
  filterHotel(e: any) {
    this.showLoader = true;
    this.hotelService.searchHotel(e.target.value).subscribe({
      next: (response) => {
        this.showLoader = false;
        console.log(response);
        
        if (response.result?.length > 0) {
          this.hotelsResponse = response.result;
        } else {
          this.getHotelsFun();
        }
      },
      error: (err) => {
        console.log(err);
        this.showLoader = false;
      },
    });
  }
}
