import { Component } from '@angular/core';
import { TrekinggearsService } from 'src/app/Services/trekinggears.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-treking-gears',
  templateUrl: './treking-gears.component.html',
  styleUrls: ['./treking-gears.component.css']
})
export class TrekingGearsComponent {
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
        if (response.isSuccess) {
          this.gears = response.result;
        } else {
          environment.Toast.fire({
            icon: 'error',
            title: response.message,
            timer: 800,
          });
        }
        this.showLoader = false;
      },
      error: (err) => {
        this.getTrekkingGears();
        this.showLoader = false;
      },
    });
  }
}
