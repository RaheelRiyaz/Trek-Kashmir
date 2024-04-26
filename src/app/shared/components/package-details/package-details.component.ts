import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/userRole';
import { PackageService } from 'src/app/Services/package.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css'],
})
export class PackageDetailsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PackageService,
    private route: Router
  ) { }
  buyPackage: boolean = true;
  packageDetails: any;
  packageId!: string;
  showLoader: boolean = true;
  token: any;
  ngOnInit(): void {
    this.token = environment.getToken();
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.packageId = response['id'];
      },
    });
    this.service.getpackageByid(this.packageId).subscribe({
      next: (response) => {
        console.log(response);

        this.showLoader = false;
        this.packageDetails = response.result;
      },
      error: (err) => {
        this.showLoader = false;
        console.log(err);
      },
    });

    if (location.href.startsWith("http://localhost:4200/guide") || location.href.startsWith("http://localhost:4200/admin")) {
      this.buyPackage = false;
    }


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
