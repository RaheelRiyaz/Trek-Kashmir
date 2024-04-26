import { Component } from '@angular/core';
import { UpdateBookingStatus } from 'src/app/Models/updateBookingStatus';
import { PackageService } from 'src/app/Services/package.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent {
  constructor(private service: PackageService) {}
  packages: any;
  showLoader: boolean = true;
  basePath: string = environment.baseImagePath;
  changeStatusModel: UpdateBookingStatus = new UpdateBookingStatus();
  ngOnInit(): void {
    this.getPackages();
  }
  getPackages(): void {
    this.service.getpackages().subscribe({
      next: (response) => {
        this.showLoader = false;
        this.packages = response.result;
      },
      error: (err) => {
        console.log(err);
        this.showLoader = false;
      },
    });
  }
  filterPackage(e: any) {
    this.showLoader = true;
    this.service.searchPackage(e.target.value).subscribe({
      next: (response) => {
        this.showLoader = false;
        if (response.isSuccess && response.result.length > 0) {
          this.packages = response.result;
        } else {
          environment.Toast.fire({
            icon: 'error',
            title: 'No package found',
            timer: 700,
          });
          this.getPackages();
        }
      },
      error: (err) => {
        this.showLoader = false;
        this.getPackages();
      },
    });
  }
  changeBookingStatus(status: number, id: string, val: number) {
    Swal.fire({
      title: `Are you sure you want to ${
        status === 2 ? 'Open' : 'Close'
      } this package`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeStatusModel.id = id;
        this.changeStatusModel.packageBookingStatus = val;
        this.service
          .updatepackageBookingStatus(this.changeStatusModel)
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                environment.Toast.fire({
                  icon: 'success',
                  title: 'Status changed successfully',
                });
              } else {
                environment.Toast.fire({
                  icon: 'error',
                  title: 'There is something issue please try again later',
                });
              }
              this.getPackages();
            },
            error: (err) => [],
          });
      }
    });
  }
}
