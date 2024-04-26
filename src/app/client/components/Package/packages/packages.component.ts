import { Component, OnInit } from '@angular/core';
import { PackagesResponse } from 'src/app/Models/packages-request';
import { PackageService } from 'src/app/Services/package.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {
  constructor(private service: PackageService) {}
  packages: any;
  showLoader: boolean = true;
  baseUrl: string = environment.baseImagePath;
  ngOnInit(): void {
    this.getPackages();
  }
  getPackages(): void {
    this.service.getpackages().subscribe({
      next: (response) => {
        console.log(response);
        
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
}
