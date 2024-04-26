import { Component } from '@angular/core';
import { TrekinggearsService } from 'src/app/Services/trekinggears.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class GearsListComponent {
  constructor(private service: TrekinggearsService) {}
  gears: any;
  showLoader: boolean = true;
  baseUrl: string = environment.baseImagePath;
  ngOnInit(): void {
    this.getTrekkingGears();
  }
  getTrekkingGears(): void {
    this.service.getTrekingGears().subscribe({
      next: (response) => {
        this.showLoader = false;
        this.gears = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  filterTrek(e: any) {
    this.showLoader = true;
    this.service.searchTrek(e.target.value).subscribe({
      next: (response) => {
        this.showLoader = false;
        if (response.isSuccess) {
          this.gears = response.result;
        } else {
          environment.Toast.fire({
            icon: 'error',
            title: response.message,
            timer: 800,
          });
        }
      },
      error: (err) => {
        this.showLoader = false;
        this.getTrekkingGears();
      },
    });
  }

  deleteGear(id: string): void {
    Swal.fire({
      title: 'Are you sure you want to delete this gear?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteGear(id).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              Swal.fire('Trek deleted successfully', '', 'info');
              this.getTrekkingGears();
            } else {
              Swal.fire('There is some issue please try again later', '', 'error');
            }
          },
        });
      }
    });
  }
}
