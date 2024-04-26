import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsService } from 'src/app/Services/hotels.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-hotel',
  templateUrl: './post-hotel.component.html',
  styleUrls: ['./post-hotel.component.css']
})
export class PostHotelComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hotelsService: HotelsService
  ) {
  }

  name!: string;
  star!: Number;
  description!: string;
  file!: File;

  getName(name: string) {
    this.name = name;
  }
  getStar(star: string) {
    this.star = star as unknown as Number;
  }
  getDescription(description: string) {
    this.description = description;
  }

  getFile(event: any) {
    this.file = event.target.Files[0];
  }


  ngOnInit(): void {

  }

  addHotel() {
    let hotelForm = new FormData();
    hotelForm.append("name", this.name);
    // hotelForm.append("star", this.star);
    hotelForm.append("description", this.description);
    hotelForm.append("file", this.file);
    this.hotelsService.postHotel(hotelForm).subscribe(
      response => {
        console.log(response);
        if (response.isSuccess) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Hotel added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/admin/hotels']);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}


