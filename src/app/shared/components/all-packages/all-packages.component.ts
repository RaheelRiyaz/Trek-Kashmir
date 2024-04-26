import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/userRole';
import { UpdateBookingStatus } from 'src/app/Models/updateBookingStatus';
import { PackageService } from 'src/app/Services/package.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-packages',
  templateUrl: './all-packages.component.html',
  styleUrls: ['./all-packages.component.scss'],
})
export class AllPackagesComponent {
  constructor(private service: PackageService, private route: Router) {}
  packages: any;
  token: any;
  showLoader = true;
  basePath: string = environment.baseImagePath;
  ngOnInit(): void {
    this.token = environment.getToken();
    this.getPackages();
  }
  getPackages(): void {
    this.service.getpackages().subscribe({
      next: (response) => {
        this.showLoader = false;
        console.log(response);
        this.packages = response.result;
      },
      error: (err) => {
        this.showLoader = false;
        console.log(err);
      },
    });
  }
  filterPackage(e: any) {
    this.service.searchPackage(e.target.value).subscribe({
      next: (response) => {
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
        this.getPackages();
      },
    });
  }
  bookPackage(id: string) {
    if (
      environment.getToken() &&
      environment.getToken().token &&
      environment.getToken().userRole === UserRole.Client
    ) {
      this.route.navigate(['/client/packages/' + id]);
    } else {
      sessionStorage.setItem('packageId', id);
      this.route.navigate(['/login']);
    }
  }
}
