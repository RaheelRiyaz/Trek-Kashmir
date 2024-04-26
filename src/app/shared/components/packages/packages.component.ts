import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/userRole';
import { PackageService } from 'src/app/Services/package.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit {
  constructor(private route: Router, private service: PackageService) {}
  packages: any;
  ngOnInit(): void {
    this.service.getpackages().subscribe({
      next: (response) => {
        console.log(response);
        this.packages = response.result.slice(0, response.result.length / 2);
      },
      error: (err) => {
        console.log(err);
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
